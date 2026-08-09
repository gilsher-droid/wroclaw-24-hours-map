const COOKIE_NAME = "wroc_love_access";
const encoder = new TextEncoder();

function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...headers },
  });
}

function redirect(request, pathname) {
  return Response.redirect(new URL(pathname, request.url).toString(), 302);
}

function normalizeCode(value) {
  return String(value || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
}

async function sha256(value) {
  const digest = await crypto.subtle.digest("SHA-256", encoder.encode(value));
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function bytesToBase64Url(bytes) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlToBytes(value) {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((value.length + 3) % 4);
  const binary = atob(padded);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

async function hmacKey(secret) {
  return crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}

async function createSession(id, expiresAt, secret) {
  const expires = new Date(`${expiresAt.replace(" ", "T")}Z`).getTime();
  const payload = `${id}.${expires}`;
  const signature = await crypto.subtle.sign("HMAC", await hmacKey(secret), encoder.encode(payload));
  return { token: `${payload}.${bytesToBase64Url(new Uint8Array(signature))}`, expires };
}

async function decodeSession(token, secret) {
  const parts = String(token || "").split(".");
  if (parts.length !== 3 || !secret) return null;
  const [id, expires, signature] = parts;
  if (!(id === "owner" || /^\d+$/.test(id)) || !/^\d+$/.test(expires) || Number(expires) <= Date.now()) return null;
  try {
    const valid = await crypto.subtle.verify("HMAC", await hmacKey(secret), base64UrlToBytes(signature), encoder.encode(`${id}.${expires}`));
    return valid ? { id: id === "owner" ? "owner" : Number(id), expires: Number(expires) } : null;
  } catch {
    return null;
  }
}

function readCookie(request, name) {
  const cookie = request.headers.get("cookie") || "";
  const match = cookie.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : "";
}

async function ensureSchema(db) {
  await db.batch([
    db.prepare(`CREATE TABLE IF NOT EXISTS access_codes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code_hash TEXT NOT NULL,
      customer_label TEXT NOT NULL DEFAULT '',
      valid_days INTEGER NOT NULL DEFAULT 30,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      activated_at TEXT,
      expires_at TEXT,
      last_used_at TEXT,
      revoked_at TEXT
    )`),
    db.prepare("CREATE UNIQUE INDEX IF NOT EXISTS idx_access_codes_code_hash ON access_codes(code_hash)"),
    db.prepare(`CREATE TABLE IF NOT EXISTS paypal_purchases (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      paypal_order_id TEXT NOT NULL,
      paypal_capture_id TEXT NOT NULL,
      access_code_id INTEGER NOT NULL,
      amount TEXT NOT NULL,
      currency TEXT NOT NULL,
      payer_email TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (access_code_id) REFERENCES access_codes(id)
    )`),
    db.prepare("CREATE UNIQUE INDEX IF NOT EXISTS idx_paypal_purchases_order_id ON paypal_purchases(paypal_order_id)"),
    db.prepare("CREATE UNIQUE INDEX IF NOT EXISTS idx_paypal_purchases_capture_id ON paypal_purchases(paypal_capture_id)"),
  ]);
}

async function activeAccess(request, env) {
  if (!env.ACCESS_TOKEN_SECRET) return null;
  const session = await decodeSession(readCookie(request, COOKIE_NAME), env.ACCESS_TOKEN_SECRET);
  if (!session) return null;
  if (session.id === "owner") return { id: "owner", expiresAt: new Date(session.expires).toISOString().replace("T", " ").replace("Z", "") };
  if (!env.DB) return null;
  await ensureSchema(env.DB);
  return env.DB.prepare(
    "SELECT id, expires_at AS expiresAt FROM access_codes WHERE id = ? AND revoked_at IS NULL AND expires_at > CURRENT_TIMESTAMP",
  ).bind(session.id).first();
}

function generateCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = crypto.getRandomValues(new Uint8Array(8));
  const chars = [...bytes].map((byte) => alphabet[byte % alphabet.length]);
  return `WROC-${chars.slice(0, 4).join("")}-${chars.slice(4).join("")}`;
}

async function verifyCode(request, env) {
  if (!env.ACCESS_TOKEN_SECRET) return json({ error: "מערכת הגישה עדיין אינה מחוברת." }, 503);
  const payload = await request.json().catch(() => ({}));
  const code = normalizeCode(payload.code);
  if (env.OWNER_ACCESS_CODE_HASH && code.startsWith("WROCOWNR") && await sha256(code) === env.OWNER_ACCESS_CODE_HASH) {
    const ownerExpiry = new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000).toISOString().replace("T", " ").replace("Z", "");
    const ownerSession = await createSession("owner", ownerExpiry, env.ACCESS_TOKEN_SECRET);
    return json(
      { active: true, owner: true, expiresAt: new Date(ownerSession.expires).toISOString() },
      200,
      { "set-cookie": `${COOKIE_NAME}=${encodeURIComponent(ownerSession.token)}; Path=/; Max-Age=31536000; HttpOnly; Secure; SameSite=Lax` },
    );
  }
  if (code.length !== 12 || !code.startsWith("WROC")) return json({ error: "קוד הגישה אינו בפורמט הנכון." }, 400);
  if (!env.DB) return json({ error: "מערכת הגישה עדיין אינה מחוברת." }, 503);
  await ensureSchema(env.DB);
  const codeHash = await sha256(code);
  let row = await env.DB.prepare(
    "SELECT id, activated_at AS activatedAt, expires_at AS expiresAt, revoked_at AS revokedAt FROM access_codes WHERE code_hash = ?",
  ).bind(codeHash).first();
  if (!row || row.revokedAt) return json({ error: "הקוד אינו תקף. בדקו אותו ונסו שוב." }, 401);

  if (!row.activatedAt) {
    await env.DB.prepare(
      "UPDATE access_codes SET activated_at = CURRENT_TIMESTAMP, expires_at = datetime('now', '+' || valid_days || ' days'), last_used_at = CURRENT_TIMESTAMP WHERE id = ? AND activated_at IS NULL",
    ).bind(row.id).run();
  } else {
    await env.DB.prepare("UPDATE access_codes SET last_used_at = CURRENT_TIMESTAMP WHERE id = ?").bind(row.id).run();
  }
  row = await env.DB.prepare(
    "SELECT id, expires_at AS expiresAt FROM access_codes WHERE id = ? AND revoked_at IS NULL AND expires_at > CURRENT_TIMESTAMP",
  ).bind(row.id).first();
  if (!row) return json({ error: "תקופת הגישה של הקוד הסתיימה." }, 403);

  const session = await createSession(row.id, row.expiresAt, env.ACCESS_TOKEN_SECRET);
  const maxAge = Math.max(0, Math.floor((session.expires - Date.now()) / 1000));
  return json(
    { active: true, expiresAt: `${row.expiresAt.replace(" ", "T")}Z` },
    200,
    { "set-cookie": `${COOKIE_NAME}=${encodeURIComponent(session.token)}; Path=/; Max-Age=${maxAge}; HttpOnly; Secure; SameSite=Lax` },
  );
}

function paypalBase(env) {
  return env.PAYPAL_MODE === "sandbox" ? "https://api-m.sandbox.paypal.com" : "https://api-m.paypal.com";
}

async function paypalAccessToken(env) {
  if (!env.PAYPAL_CLIENT_ID || !env.PAYPAL_CLIENT_SECRET) throw new Error("PAYPAL_NOT_CONFIGURED");
  const response = await fetch(`${paypalBase(env)}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      authorization: `Basic ${btoa(`${env.PAYPAL_CLIENT_ID}:${env.PAYPAL_CLIENT_SECRET}`)}`,
      "content-type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  if (!response.ok) throw new Error("PAYPAL_AUTH_FAILED");
  const result = await response.json();
  return result.access_token;
}

async function paypalRequest(env, pathname, options = {}) {
  const token = await paypalAccessToken(env);
  const response = await fetch(`${paypalBase(env)}${pathname}`, {
    ...options,
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
      ...(options.headers || {}),
    },
  });
  const result = await response.json().catch(() => ({}));
  return { response, result };
}

function sameOrigin(request) {
  const origin = request.headers.get("origin");
  return !origin || origin === new URL(request.url).origin;
}

async function createPaypalOrder(request, env) {
  if (!sameOrigin(request)) return json({ error: "בקשה לא מורשית." }, 403);
  try {
    const { response, result } = await paypalRequest(env, "/v2/checkout/orders", {
      method: "POST",
      headers: { "PayPal-Request-Id": crypto.randomUUID() },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [{
          reference_id: "wroc-love-30-day-access",
          description: "Wroc-love – 30-day access",
          amount: { currency_code: "ILS", value: "49.00" },
        }],
      }),
    });
    if (!response.ok || !result.id) return json({ error: "לא הצלחנו לפתוח את התשלום ב־PayPal." }, 502);
    return json({ id: result.id }, 201);
  } catch {
    return json({ error: "שירות התשלום אינו זמין כרגע." }, 503);
  }
}

function completedCapture(order) {
  const captures = order?.purchase_units?.flatMap((unit) => unit?.payments?.captures || []) || [];
  return captures.find((capture) => capture?.status === "COMPLETED" && capture?.amount?.currency_code === "ILS" && capture?.amount?.value === "49.00");
}

async function capturePaypalOrder(request, env, orderId) {
  if (!sameOrigin(request)) return json({ error: "בקשה לא מורשית." }, 403);
  if (!env.DB || !env.ACCESS_TOKEN_SECRET) return json({ error: "מערכת הגישה עדיין אינה מחוברת." }, 503);
  if (!/^[A-Z0-9]{10,32}$/.test(orderId)) return json({ error: "מזהה התשלום אינו תקין." }, 400);
  await ensureSchema(env.DB);

  const existing = await env.DB.prepare(
    `SELECT p.access_code_id AS accessId, a.expires_at AS expiresAt
     FROM paypal_purchases p JOIN access_codes a ON a.id = p.access_code_id
     WHERE p.paypal_order_id = ?`,
  ).bind(orderId).first();
  if (existing) {
    const session = await createSession(existing.accessId, existing.expiresAt, env.ACCESS_TOKEN_SECRET);
    return json({ active: true, expiresAt: `${existing.expiresAt.replace(" ", "T")}Z` }, 200, {
      "set-cookie": `${COOKIE_NAME}=${encodeURIComponent(session.token)}; Path=/; Max-Age=${Math.max(0, Math.floor((session.expires - Date.now()) / 1000))}; HttpOnly; Secure; SameSite=Lax`,
    });
  }

  try {
    let { response, result } = await paypalRequest(env, `/v2/checkout/orders/${orderId}/capture`, {
      method: "POST",
      headers: { "PayPal-Request-Id": `capture-${orderId}` },
      body: "{}",
    });
    if (!response.ok && response.status === 422) {
      ({ response, result } = await paypalRequest(env, `/v2/checkout/orders/${orderId}`, { method: "GET" }));
    }
    const capture = completedCapture(result);
    if (!response.ok || !capture) return json({ error: "התשלום לא הושלם. לא בוצע חיוב נוסף." }, 502);

    const payerEmail = String(result?.payer?.email_address || "PayPal customer").slice(0, 160);
    const codeHash = await sha256(`PAY-${orderId}-${crypto.randomUUID()}`);
    const inserted = await env.DB.prepare(
      `INSERT INTO access_codes (code_hash, customer_label, valid_days, activated_at, expires_at, last_used_at)
       VALUES (?, ?, 30, CURRENT_TIMESTAMP, datetime('now', '+30 days'), CURRENT_TIMESTAMP)`,
    ).bind(codeHash, payerEmail).run();
    const accessId = inserted.meta.last_row_id;
    await env.DB.prepare(
      `INSERT INTO paypal_purchases (paypal_order_id, paypal_capture_id, access_code_id, amount, currency, payer_email)
       VALUES (?, ?, ?, '49.00', 'ILS', ?)`,
    ).bind(orderId, capture.id, accessId, payerEmail).run();
    const access = await env.DB.prepare("SELECT expires_at AS expiresAt FROM access_codes WHERE id = ?").bind(accessId).first();
    const session = await createSession(accessId, access.expiresAt, env.ACCESS_TOKEN_SECRET);
    return json({ active: true, expiresAt: `${access.expiresAt.replace(" ", "T")}Z` }, 200, {
      "set-cookie": `${COOKIE_NAME}=${encodeURIComponent(session.token)}; Path=/; Max-Age=${Math.max(0, Math.floor((session.expires - Date.now()) / 1000))}; HttpOnly; Secure; SameSite=Lax`,
    });
  } catch {
    return json({ error: "לא הצלחנו לאשר את התשלום. אם חויבתם, פנו אלינו לבדיקה." }, 503);
  }
}

async function createAccessCode(request, env) {
  if (!env.ADMIN_SECRET || request.headers.get("authorization") !== `Bearer ${env.ADMIN_SECRET}`) {
    return json({ error: "מפתח המנהל אינו נכון." }, 401);
  }
  if (!env.DB) return json({ error: "מסד הנתונים עדיין אינו מחובר." }, 503);
  const payload = await request.json().catch(() => ({}));
  const label = String(payload.label || "").trim().slice(0, 160);
  const validDays = Math.min(90, Math.max(1, Number(payload.validDays) || 30));
  if (!label) return json({ error: "יש להזין שם או אימייל של הלקוח." }, 400);
  await ensureSchema(env.DB);

  for (let attempt = 0; attempt < 4; attempt += 1) {
    const code = generateCode();
    try {
      await env.DB.prepare("INSERT INTO access_codes (code_hash, customer_label, valid_days) VALUES (?, ?, ?)")
        .bind(await sha256(normalizeCode(code)), label, validDays).run();
      return json({ code, validDays }, 201);
    } catch (error) {
      if (attempt === 3) throw error;
    }
  }
  return json({ error: "לא ניתן להפיק קוד כרגע." }, 500);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    // Phase 1 public launch. Historical payment/access functions and tables are
    // intentionally retained below, but normal visitors never execute them.
    if (url.pathname === "/buy") {
      return redirect(request, "/products/interactive-maps/premium.html");
    }
    if (url.pathname === "/api/paypal/config" && request.method === "GET") {
      return json({ error: "Payments are disabled during the public launch phase." }, 410);
    }
    if (url.pathname === "/api/paypal/orders" && request.method === "POST") return json({ error: "Payments are disabled during the public launch phase." }, 410);
    const captureMatch = url.pathname.match(/^\/api\/paypal\/orders\/([A-Z0-9]{10,32})\/capture$/);
    if (captureMatch && request.method === "POST") return json({ error: "Payments are disabled during the public launch phase." }, 410);
    if (url.pathname === "/api/access/verify" && request.method === "POST") return json({ error: "Access codes are not required during the public launch phase." }, 410);
    if (url.pathname === "/api/access/status" && request.method === "GET") {
      return json({ active: true, free: true, phase: "public-launch", expiresAt: null });
    }
    if (url.pathname === "/api/access/logout" && request.method === "POST") {
      return json({ active: false }, 200, { "set-cookie": `${COOKIE_NAME}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax` });
    }
    if (url.pathname === "/api/admin/codes" && request.method === "POST") return createAccessCode(request, env);
    const legacyMapTargets = {
      "/map.html": "/products/interactive-maps/map.html",
      "/premium": "/products/interactive-maps/premium.html",
      "/premium.html": "/products/interactive-maps/premium.html",
      "/moshe.html": "/products/interactive-maps/moshe.html",
    };
    if (legacyMapTargets[url.pathname]) {
      return redirect(request, `${legacyMapTargets[url.pathname]}${url.search}`);
    }
    if (url.pathname === "/products/interactive-maps/premium.html") {
      return env.ASSETS.fetch(new Request(url, request));
    }

    const response = await env.ASSETS.fetch(request);
    if (response.status !== 404) return response;
    url.pathname = "/index.html";
    return env.ASSETS.fetch(new Request(url, request));
  },
};
