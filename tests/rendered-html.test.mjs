import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import test from "node:test";
import { runInNewContext } from "node:vm";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const homeHtml = readFileSync(resolve(root, "dist/client/index.html"), "utf8");
  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async (request) => {
          const pathname = new URL(request.url).pathname;
          if (pathname === "/index.html") {
            return new Response(homeHtml, { headers: { "content-type": "text/html; charset=utf-8" } });
          }
          return new Response("Not found", { status: 404 });
        },
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Wroc-love prelaunch product", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Wroc-love/);
  assert.match(html, /24 שעות בוורוצלב/);
  assert.match(html, /המסלול המלא ל־4 ימים/);
  assert.match(html, /וורוצלב בכריסמס – 3 ימים לזוג פנסיונרים/);
  assert.match(html, /products\/interactive-maps\/moshe\.html/);
  assert.match(html, /לאכול, לשתות, לקנות ולישון בוורוצלב/);
  assert.match(html, /products\/interactive-maps\/lifestyle\.html/);
  assert.match(html, />49</);
  assert.match(html, /30 ימי גישה/);
  assert.match(html, /ללא מנוי וללא חידוש אוטומטי/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/);
});

test("lifestyle guide publishes all sourced places in five languages", () => {
  const html = readFileSync(resolve(root, "dist/client/products/interactive-maps/lifestyle.html"), "utf8");
  const app = readFileSync(resolve(root, "dist/client/lifestyle.js"), "utf8");
  const data = readFileSync(resolve(root, "dist/client/data/lifestyle-places.js"), "utf8");
  const legacy = readFileSync(resolve(root, "dist/client/lifestyle.html"), "utf8");

  assert.match(html, /data-category="eat"/);
  assert.match(html, /data-category="drink"/);
  assert.match(html, /data-category="buy"/);
  assert.match(html, /data-category="sleep"/);
  assert.match(html, /data-lang="de"/);
  assert.match(html, /data-lang="cs"/);
  assert.match(html, /חינם עד 31 בדצמבר 2026/);
  assert.match(html, /data-i18n="homeReturn"/);
  assert.match(html, /campaign-access\.js/);
  assert.match(app, /fitBounds/);
  assert.match(app, /WROC_CAMPAIGN_ACCESS.*authorize/);
  assert.match(app, /sourceUrl/);
  assert.match(app, /data-gallery/);
  assert.match(app, /data-video/);
  assert.match(data, /PURO Wrocław Stare Miasto/);
  assert.match(data, /Wroclavia/);
  assert.match(data, /Konspira/);
  assert.match(data, /facebook\.com\/61591964083308\/posts/);
  assert.match(legacy, /products\/interactive-maps\/lifestyle\.html/);
});

test("paid access pages and protected itinerary are present", () => {
  const access = readFileSync(resolve(root, "dist/client/access.html"), "utf8");
  const premium = readFileSync(resolve(root, "dist/client/products/interactive-maps/premium.html"), "utf8");
  const moshe = readFileSync(resolve(root, "dist/client/products/interactive-maps/moshe.html"), "utf8");
  const mosheRoute = readFileSync(resolve(root, "dist/client/data/moshe-route.js"), "utf8");
  const premiumRoute = readFileSync(resolve(root, "dist/client/data/premium-route.js"), "utf8");
  const premiumApp = readFileSync(resolve(root, "dist/client/premium.js"), "utf8");
  const campaignAccess = readFileSync(resolve(root, "dist/client/campaign-access.js"), "utf8");
  const dayRoute = readFileSync(resolve(root, "dist/client/products/interactive-maps/map.html"), "utf8");
  const legacyDayRoute = readFileSync(resolve(root, "dist/client/map.html"), "utf8");
  const checkout = readFileSync(resolve(root, "dist/client/checkout.html"), "utf8");
  const worker = readFileSync(resolve(root, "dist/server/index.js"), "utf8");

  assert.match(access, /WROC-XXXX-XXXX/);
  assert.match(premium, /המסלול המלא ל־4 ימים/);
  assert.match(premiumRoute, /Hydropolis/);
  assert.match(premium, /premium-map/);
  assert.match(premium, /recommendation-grid/);
  assert.match(premiumRoute, /PREMIUM_DAYS/);
  assert.match(premiumRoute, /PREMIUM_STOPS/);
  assert.match(premiumRoute, /PREMIUM_RECOMMENDATIONS/);
  assert.match(premiumApp, /googleDayUrl/);
  assert.match(premiumApp, /renderRecommendations/);
  assert.match(campaignAccess, /2027-01-01T00:00:00\+01:00/);
  assert.match(campaignAccess, /31 בדצמבר 2026/);
  assert.match(premium, /campaign-access\.js/);
  assert.match(moshe, /data\/moshe-route\.js/);
  assert.match(moshe, /campaign-access\.js/);
  assert.match(moshe, /data-premium-lang="he"/);
  assert.match(moshe, /data-premium-lang="en"/);
  assert.match(moshe, /data-premium-lang="pl"/);
  assert.match(mosheRoute, /PREMIUM_ROUTE_CONFIG/);
  assert.match(mosheRoute, /PREMIUM_DAYS/);
  assert.match(mosheRoute, /PREMIUM_STOPS/);
  assert.match(mosheRoute, /PREMIUM_RECOMMENDATIONS/);
  assert.match(mosheRoute, /זוג פנסיונרים/);
  assert.match(dayRoute, /campaign-access\.js/);
  assert.match(dayRoute, /data-i18n="homeLink"/);
  assert.match(premium, /data-ui="homeLink"/);
  assert.match(moshe, /data-ui="homeLink"/);
  assert.match(legacyDayRoute, /products\/interactive-maps\/map\.html/);
  assert.match(worker, /ACCESS_TOKEN_SECRET/);
  assert.match(worker, /\/api\/access\/verify/);
  assert.match(checkout, /49 ₪/);
  assert.match(worker, /\/api\/paypal\/orders/);
  assert.match(worker, /OWNER_ACCESS_CODE_HASH/);
});

test("24-hour map exposes verified social posts and local photo galleries", () => {
  const mapHtml = readFileSync(resolve(root, "dist/client/products/interactive-maps/map.html"), "utf8");
  const app = readFileSync(resolve(root, "dist/client/app.js"), "utf8");
  const media = readFileSync(resolve(root, "dist/client/data/location-media.js"), "utf8");
  const translations = readFileSync(resolve(root, "dist/client/data/translations.js"), "utf8");

  assert.match(mapHtml, /id="gallery-modal"/);
  assert.match(mapHtml, /id="video-modal"/);
  assert.match(app, /resourceActionsHtml/);
  assert.match(app, /openGallery/);
  assert.match(app, /openVideo/);
  assert.match(app, /brand-icon instagram/);
  assert.match(app, /video-mark/);
  assert.match(media, /facebook\.com\/61591964083308\/posts/);
  assert.match(media, /instagram\.com\/wroclaw\.lowersilesia\/p/);
  assert.match(translations, /photoGallery/);
  assert.match(translations, /videoGallery/);
  assert.equal(existsSync(resolve(root, "dist/client/assets/gallery-hala-01.jpg")), true);
  assert.equal(existsSync(resolve(root, "dist/client/assets/gallery-boguslawskiego-06.jpg")), true);
  assert.match(media, /hydropolis:\s*\{/);
  assert.match(media, /panorama:\s*\{/);
  assert.match(media, /assets\/hydropolis-/);
  assert.equal(existsSync(resolve(root, "dist/client/assets/hydropolis-01.jpg")), true);
  assert.equal(existsSync(resolve(root, "dist/client/assets/gallery-panorama-01.jpg")), true);
  assert.match(media, /"town-hall":\s*\{ gallery: galleries\.townHall \}/);
  assert.match(media, /old-town-hall-wroclaw\.jpg/);
  assert.equal(existsSync(resolve(root, "dist/client/assets/old-town-hall-wroclaw.jpg")), true);
  assert.equal(existsSync(resolve(root, "dist/client/assets/video-rynek-fountains.mp4")), true);
  assert.equal(existsSync(resolve(root, "dist/client/assets/video-ossolineum-garden.mp4")), true);
});

test("every interactive map product exposes relevant social, photo and video resources", () => {
  const premiumHtml = readFileSync(resolve(root, "dist/client/products/interactive-maps/premium.html"), "utf8");
  const mosheHtml = readFileSync(resolve(root, "dist/client/products/interactive-maps/moshe.html"), "utf8");
  const premiumApp = readFileSync(resolve(root, "dist/client/premium.js"), "utf8");
  const media = readFileSync(resolve(root, "dist/client/data/location-media.js"), "utf8");
  const locations = readFileSync(resolve(root, "dist/client/data/locations.js"), "utf8");
  const premiumRoute = readFileSync(resolve(root, "dist/client/data/premium-route.js"), "utf8");
  const mosheRoute = readFileSync(resolve(root, "dist/client/data/moshe-route.js"), "utf8");
  const extraLanguages = readFileSync(resolve(root, "dist/client/data/extra-languages.js"), "utf8");

  assert.match(premiumHtml, /data\/location-media\.js/);
  assert.match(mosheHtml, /data\/location-media\.js/);
  assert.match(premiumApp, /resourceActionsHtml/);
  assert.match(premiumApp, /data-open-gallery/);
  assert.match(premiumApp, /data-open-video/);
  assert.match(media, /stulecia: \[/);
  assert.match(media, /gallery-stulecia-02\.jpg/);
  assert.doesNotMatch(media, /stulecia: \[[\s\S]*?gallery-stulecia-01\.jpg[\s\S]*?\]/);
  assert.match(media, /wroclavia: gallery\("wroclavia"/);
  assert.match(media, /renoma: gallery\("renoma"/);
  assert.match(media, /ossolineum: \[/);
  assert.match(media, /ossolineum-cover\.jpg/);
  assert.match(media, /ossolineum-dwarf\.jpg/);
  assert.match(media, /gallery: galleries\.ossolineum/);
  assert.match(locations, /founded in Lviv in 1817/);
  assert.match(premiumRoute, /founded in Lviv in 1817/);
  assert.match(mosheRoute, /founded in Lviv in 1817/);
  assert.match(premiumRoute, /\[51\.11343,17\.03657\]/);
  assert.match(mosheRoute, /\[51\.11343,17\.03657\]/);
  assert.match(extraLanguages, /Eine 1817 in Lwiw gegründete nationale Institution/);
  assert.match(extraLanguages, /Národní instituce založená ve Lvově roku 1817/);
  assert.equal(existsSync(resolve(root, "dist/client/assets/video-stulecia-fountain.mp4")), true);
  assert.equal(existsSync(resolve(root, "dist/client/assets/ossolineum-cover.jpg")), true);
  assert.equal(existsSync(resolve(root, "dist/client/assets/gallery-wroclavia-05.jpg")), true);
  assert.equal(existsSync(resolve(root, "dist/client/assets/gallery-renoma-05.jpg")), true);
});

test("Ofir and Merav routes are free only through 31 December 2026 in Wrocław", () => {
  const source = readFileSync(resolve(root, "campaign-access.js"), "utf8");
  const window = { location: { search: "?lang=he", replace() {} } };
  const document = {
    documentElement: { lang: "he" },
    addEventListener() {},
    getElementById() { return null; },
  };
  const localStorage = { getItem() { return null; } };
  runInNewContext(source, { window, document, localStorage, URLSearchParams, Date, fetch: async () => ({ json: async () => ({ active: false }) }) });

  const campaign = window.WROC_CAMPAIGN_ACCESS;
  assert.equal(campaign.isFreeNow(Date.parse("2026-12-31T23:59:59+01:00")), true);
  assert.equal(campaign.isFreeNow(Date.parse("2027-01-01T00:00:00+01:00")), false);
});

test("premium itinerary redirects visitors without an active code", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("access-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request("https://wroc-love.com/products/interactive-maps/premium.html"),
    { ASSETS: { fetch: async () => new Response("not found", { status: 404 }) } },
  );

  assert.equal(response.status, 302);
  assert.equal(response.headers.get("location"), "https://wroc-love.com/access.html");
});

test("owner code opens the protected itinerary without payment", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("owner-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const ownerCode = "WROCOWNRABCDEFGH";
  const hashBytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(ownerCode));
  const ownerHash = [...new Uint8Array(hashBytes)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
  const assets = { fetch: async () => new Response("premium itinerary") };

  const login = await worker.fetch(
    new Request("https://wroc-love.com/api/access/verify", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ code: "WROC-OWNR-ABCD-EFGH" }),
    }),
    { ASSETS: assets, ACCESS_TOKEN_SECRET: "test-session-secret", OWNER_ACCESS_CODE_HASH: ownerHash },
  );
  assert.equal(login.status, 200);
  const cookie = login.headers.get("set-cookie");
  assert.match(cookie ?? "", /wroc_love_access=/);

  const premium = await worker.fetch(
    new Request("https://wroc-love.com/products/interactive-maps/premium.html", { headers: { cookie: cookie.split(";", 1)[0] } }),
    { ASSETS: assets, ACCESS_TOKEN_SECRET: "test-session-secret", OWNER_ACCESS_CODE_HASH: ownerHash },
  );
  assert.equal(premium.status, 200);
  assert.equal(await premium.text(), "premium itinerary");
});

test("legacy map URLs redirect to the products catalog", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("legacy-route-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request("https://wroc-love.com/map.html?lang=pl"),
    { ASSETS: { fetch: async () => new Response("not found", { status: 404 }) } },
  );

  assert.equal(response.status, 302);
  assert.equal(response.headers.get("location"), "https://wroc-love.com/products/interactive-maps/map.html?lang=pl");
});

test("PayPal orders are created server-side for exactly 49 ILS", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("paypal-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const originalFetch = globalThis.fetch;
  let orderBody;
  globalThis.fetch = async (url, options = {}) => {
    if (String(url).endsWith("/v1/oauth2/token")) return Response.json({ access_token: "test-token" });
    if (String(url).endsWith("/v2/checkout/orders")) {
      orderBody = JSON.parse(options.body);
      return Response.json({ id: "PAYPALORDER12345" }, { status: 201 });
    }
    throw new Error(`Unexpected URL: ${url}`);
  };
  try {
    const response = await worker.fetch(
      new Request("https://wroc-love.com/api/paypal/orders", { method: "POST", headers: { origin: "https://wroc-love.com" } }),
      { PAYPAL_CLIENT_ID: "client", PAYPAL_CLIENT_SECRET: "secret" },
    );
    assert.equal(response.status, 201);
    assert.deepEqual(orderBody.purchase_units[0].amount, { currency_code: "ILS", value: "49.00" });
  } finally {
    globalThis.fetch = originalFetch;
  }
});
