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

test("server-renders the Wroc-love public-launch product", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Wroc-love/);
  assert.match(html, /24 שעות בוורוצלב/);
  assert.match(html, /המסלול המלא ל־4 ימים/);
  assert.match(html, /וורוצלב בכריסמס – מסלול רגוע ל־3 ימים/);
  assert.match(html, /products\/interactive-maps\/moshe\.html/);
  assert.match(html, /לאכול, לשתות, לקנות ולישון בוורוצלב/);
  assert.match(html, /products\/interactive-maps\/lifestyle\.html/);
  assert.match(html, /<strong>גישה חופשית<\/strong><span>בתקופת ההשקה<\/span>/);
  assert.match(html, /כל המסלולים והמפות פתוחים כרגע ללא תשלום/);
  assert.doesNotMatch(html, /<strong>0<\/strong><span>PLN<\/span>/);
  assert.doesNotMatch(html, /checkout\.html|כניסה עם קוד|מקבלים קוד למייל|PayPal/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/);
});

test("launch-access wording replaces 0 PLN in all five languages", () => {
  const source = readFileSync(resolve(root, "campaign-access.js"), "utf8");
  const expected = {
    he: ["גישה חופשית", "בתקופת ההשקה", "כל המסלולים והמפות פתוחים כרגע ללא תשלום."],
    en: ["Open access", "during the launch phase", "All routes and maps are currently open at no charge."],
    pl: ["Bezpłatny dostęp", "w okresie premiery", "Wszystkie trasy i mapy są obecnie dostępne bez opłat."],
    de: ["Freier Zugang", "während der Startphase", "Alle Routen und Karten sind derzeit kostenlos zugänglich."],
    cs: ["Volný přístup", "během zaváděcí fáze", "Všechny trasy a mapy jsou nyní přístupné bez poplatku."],
  };
  const elements = new Map(["campaign-price", "campaign-terms"].map((id) => [id, { innerHTML: "", textContent: "" }]));
  const window = { location: { search: "" } };
  const document = {
    documentElement: { lang: "he" },
    addEventListener() {},
    getElementById(id) { return elements.get(id) ?? null; },
  };
  const localStorage = { getItem() { return null; } };
  runInNewContext(source, { window, document, localStorage, URLSearchParams });

  for (const [language, [headline, phase, secondary]] of Object.entries(expected)) {
    window.WROC_CAMPAIGN_ACCESS.updateHomePromotion(language);
    assert.equal(elements.get("campaign-price").innerHTML, `<strong>${headline}</strong><span>${phase}</span>`);
    assert.equal(elements.get("campaign-terms").textContent, secondary);
    assert.doesNotMatch(elements.get("campaign-price").innerHTML, /0\s*PLN/i);
  }
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
  assert.doesNotMatch(html, /freeUntil/);
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

test("all itinerary products and public access fallback pages are present", () => {
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

  assert.match(access, /כל המסלולים והמפות פתוחים לכולם/);
  assert.doesNotMatch(access, /<form|access-code|access\.js/);
  assert.match(premium, /המסלול המלא ל־4 ימים/);
  assert.match(premiumRoute, /Hydropolis/);
  assert.match(premium, /premium-map/);
  assert.match(premium, /recommendation-grid/);
  assert.match(premiumRoute, /PREMIUM_DAYS/);
  assert.match(premiumRoute, /PREMIUM_STOPS/);
  assert.match(premiumRoute, /PREMIUM_RECOMMENDATIONS/);
  assert.match(premiumApp, /googleDayUrl/);
  assert.match(premiumApp, /renderRecommendations/);
  assert.match(campaignAccess, /phase: "public-launch"/);
  assert.doesNotMatch(campaignAccess, /fetch\(|location\.replace|FREE_UNTIL/);
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
  assert.match(mosheRoute, /מסלול חורפי רגוע/);
  assert.doesNotMatch(mosheRoute, /זוג פנסיונרים/);
  assert.match(premium, /הורים וילדים מתבגרים/);
  assert.match(dayRoute, /campaign-access\.js/);
  assert.match(dayRoute, /data-i18n="homeLink"/);
  assert.match(premium, /data-ui="homeLink"/);
  assert.match(moshe, /data-ui="homeLink"/);
  assert.match(legacyDayRoute, /products\/interactive-maps\/map\.html/);
  assert.match(worker, /ACCESS_TOKEN_SECRET/);
  assert.match(worker, /\/api\/access\/verify/);
  assert.match(checkout, /אין צורך בתשלום/);
  assert.doesNotMatch(checkout, /paypal-button-container|checkout\.js|49 ₪/);
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
  assert.match(app, /brand-icon media[^>]*>↗/);
  assert.match(app, /brand-icon media[^>]*>▣/);
  assert.match(app, /brand-icon media[^>]*>▶/);
  assert.match(app, /compactActionLabels/);
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
  assert.match(premiumApp, /brand-icon media[^>]*>↗/);
  assert.match(premiumApp, /brand-icon media[^>]*>▣/);
  assert.match(premiumApp, /brand-icon media[^>]*>▶/);
  assert.match(premiumApp, /compactActionLabels/);
  assert.match(media, /stulecia: \[/);
  assert.match(media, /gallery-stulecia-02\.jpg/);
  assert.doesNotMatch(media, /stulecia: \[[\s\S]*?gallery-stulecia-01\.jpg[\s\S]*?\]/);
  assert.match(media, /wroclavia: gallery\("wroclavia"/);
  assert.match(media, /renoma: gallery\("renoma"/);
  assert.match(media, /ossolineum: \[/);
  assert.match(media, /ossolineum-cover\.jpg/);
  assert.match(media, /ossolineum-dwarf\.jpg/);
  assert.match(media, /gallery: galleries\.ossolineum/);
  assert.match(media, /japanese: gallery\("japanese", 6\)/);
  assert.match(media, /facebook\.com\/61591964083308\/posts\/122109906747398802/);
  assert.match(media, /instagram\.com\/p\/DbgCVSbnL0Q/);
  assert.match(media, /japanese: \{ facebook: facebook\.japanese, instagram: instagram\.japanese, gallery: galleries\.japanese \}/);
  assert.match(media, /facebook\.com\/61591964083308\/posts\/122109914649398802/);
  assert.match(media, /instagram\.com\/p\/DbgEDzmnDcY/);
  assert.match(media, /university: \{ facebook: facebook\.university, instagram: instagram\.university, gallery: galleries\.university \}/);
  assert.match(media, /facebook\.com\/61591964083308\/posts\/122109921771398802/);
  assert.match(media, /instagram\.com\/p\/DbgE00LnOKH/);
  assert.match(media, /ostrow: \{ facebook: facebook\.ostrow, instagram: instagram\.ostrow, gallery: galleries\.ostrow \}/);
  assert.match(media, /"ostrow-cathedral": \{ facebook: facebook\.ostrow, instagram: instagram\.ostrow, gallery: galleries\.ostrow \}/);
  assert.equal(existsSync(resolve(root, "dist/client/assets/gallery-japanese-01.jpg")), true);
  assert.equal(existsSync(resolve(root, "dist/client/assets/gallery-japanese-06.jpg")), true);
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

test("island crossings and galleries use the corrected route and media", () => {
  const media = readFileSync(resolve(root, "dist/client/data/location-media.js"), "utf8");
  const locations = readFileSync(resolve(root, "dist/client/data/locations.js"), "utf8");
  const premiumRoute = readFileSync(resolve(root, "dist/client/data/premium-route.js"), "utf8");
  const mosheRoute = readFileSync(resolve(root, "dist/client/data/moshe-route.js"), "utf8");

  assert.match(media, /cathedral: \["\/assets\/gallery-cathedral-01\.jpg"\]/);
  assert.match(media, /ostrow: \[[\s\S]*gallery-cathedral-02\.jpg[\s\S]*gallery-cathedral-01\.jpg[\s\S]*\]/);
  assert.doesNotMatch(media, /"wyspa-piasek": \{ gallery:/);
  assert.match(media, /"most-tumski": \{ gallery: galleries\.tumskiBridge \}/);
  assert.match(locations, /id: "most-piaskowy"[\s\S]*coordinates: \[51\.113559, 17\.039816\]/);
  assert.match(locations, /id: "wyspa-piasek"[\s\S]*coordinates: \[51\.11453, 17\.040199\]/);
  assert.match(locations, /id: "most-tumski"[\s\S]*coordinates: \[51\.114714, 17\.042248\]/);
  assert.match(premiumRoute, /stop\("tumski-bridge",2,5,\[51\.114714,17\.042248\]/);
  assert.match(mosheRoute, /stop\("wyspa-piasek",2,6,\[51\.11453,17\.040199\]/);
});

test("all routes remain public regardless of date during Phase 1", async () => {
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
  assert.equal(campaign.isFreeNow(Date.parse("2035-01-01T00:00:00+01:00")), true);
  const authorization = await campaign.authorize();
  assert.equal(authorization.allowed, true);
  assert.equal(authorization.free, true);
  assert.equal(authorization.phase, "public-launch");
});

test("premium itinerary opens directly for a new visitor", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("access-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request("https://wroc-love.com/products/interactive-maps/premium.html"),
    { ASSETS: { fetch: async () => new Response("premium itinerary") } },
  );

  assert.equal(response.status, 200);
  assert.equal(await response.text(), "premium itinerary");
});

test("access-code verification is dormant during public launch", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("owner-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const login = await worker.fetch(
    new Request("https://wroc-love.com/api/access/verify", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ code: "WROC-OWNR-ABCD-EFGH" }),
    }),
    { ASSETS: { fetch: async () => new Response("premium itinerary") } },
  );
  assert.equal(login.status, 410);
  assert.equal(login.headers.get("set-cookie"), null);
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

test("PayPal endpoints are dormant and cannot create new orders", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("paypal-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const originalFetch = globalThis.fetch;
  let externalFetches = 0;
  globalThis.fetch = async () => { externalFetches += 1; throw new Error("Unexpected external request"); };
  try {
    const response = await worker.fetch(
      new Request("https://wroc-love.com/api/paypal/orders", { method: "POST", headers: { origin: "https://wroc-love.com" } }),
      { PAYPAL_CLIENT_ID: "client", PAYPAL_CLIENT_SECRET: "secret" },
    );
    assert.equal(response.status, 410);
    assert.equal(externalFetches, 0);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("canonical place catalog registers every current product without changing its legacy records", () => {
  const catalogSource = readFileSync(resolve(root, "data/place-catalog.js"), "utf8");
  const extraLanguages = readFileSync(resolve(root, "data/extra-languages.js"), "utf8");
  const scenarios = [
    { productId: "wroclaw-24-hours", file: "data/locations.js", arrays: ["LOCATIONS", "EVENING_LOCATIONS"], extra: true },
    { productId: "wroclaw-four-days", file: "data/premium-route.js", arrays: ["PREMIUM_STOPS", "PREMIUM_RECOMMENDATIONS"], extra: true },
    { productId: "wroclaw-christmas", file: "data/moshe-route.js", arrays: ["PREMIUM_STOPS", "PREMIUM_RECOMMENDATIONS"], extra: true },
    { productId: "lifestyle-guide", file: "data/lifestyle-places.js", arrays: ["WROC_LIFESTYLE_PLACES"], extra: false },
  ];

  for (const scenario of scenarios) {
    const window = {};
    const context = { window, console };
    if (scenario.extra) runInNewContext(extraLanguages, context);
    runInNewContext(catalogSource, context);
    runInNewContext(readFileSync(resolve(root, scenario.file), "utf8"), context);

    const records = scenario.arrays.flatMap((key) => window[key] || []);
    assert.ok(records.length > 0, `${scenario.productId} should keep its existing records`);
    assert.ok(window.WROC_CATALOG.products[scenario.productId], `${scenario.productId} should be registered`);
    for (const record of records) {
      if (record.id === "culture-evening") {
        assert.equal(record.canonicalPlaceId, null);
      } else {
        assert.ok(record.canonicalPlaceId, `${record.id} should reference a canonical place`);
        assert.ok(window.WROC_CATALOG.getPlace(record.canonicalPlaceId), `${record.id} should resolve in the catalog`);
      }
    }
  }
});

test("canonical catalog keeps stable aliases and personalization-ready metadata", () => {
  const window = {};
  runInNewContext(readFileSync(resolve(root, "data/place-catalog.js"), "utf8"), { window, console });
  const catalog = window.WROC_CATALOG;

  assert.ok(Object.keys(catalog.places).length >= 80);
  assert.equal(catalog.resolveId("tumski-bridge"), "most-tumski");
  assert.equal(catalog.resolveId("market-hall"), "hala-targowa");
  assert.equal(catalog.resolveId("wroclavia-rec"), "wroclavia");
  assert.ok(Array.isArray(catalog.coordinateConflicts));

  const ossolineum = catalog.getPlace("ossolineum");
  assert.deepEqual(Array.from(ossolineum.languages), ["he", "en", "pl", "de", "cs"]);
  assert.ok(ossolineum.location.coordinates.lat);
  assert.ok(ossolineum.taxonomy);
  assert.ok(ossolineum.suitability);
  assert.ok(ossolineum.visit);
  assert.ok(ossolineum.transport);
  assert.ok(Array.isArray(ossolineum.media.photos));
  assert.ok(Array.isArray(ossolineum.socialPosts));
});

test("all map pages load the canonical catalog before product data", () => {
  for (const file of ["map.html", "premium.html", "moshe.html", "lifestyle.html", "excursions.html"]) {
    const html = readFileSync(resolve(root, file), "utf8");
    const catalogIndex = html.indexOf("/data/place-catalog.js");
    const productIndex = Math.max(
      html.indexOf("/data/locations.js"),
      html.indexOf("/data/premium-route.js"),
      html.indexOf("/data/moshe-route.js"),
      html.indexOf("/data/lifestyle-places.js"),
      html.indexOf("/data/lower-silesia-excursions.js"),
    );
    assert.ok(catalogIndex >= 0, `${file} should load the canonical catalog`);
    assert.ok(productIndex > catalogIndex, `${file} should load product data after the catalog`);
  }
});

test("four-day and Christmas mobile controls contain overflow locally", () => {
  const css = readFileSync(resolve(root, "dist/client/premium.css"), "utf8");
  const premium = readFileSync(resolve(root, "dist/client/products/interactive-maps/premium.html"), "utf8");
  const christmas = readFileSync(resolve(root, "dist/client/products/interactive-maps/moshe.html"), "utf8");

  assert.match(css, /\.premium-header\s*\{[\s\S]*?flex-wrap:\s*wrap;/);
  assert.match(css, /\.premium-tools\s*\{[\s\S]*?width:\s*100%;[\s\S]*?flex-wrap:\s*wrap;/);
  assert.match(css, /\.premium-languages\s*\{[\s\S]*?max-width:\s*100%;[\s\S]*?overflow-x:\s*auto;/);
  assert.match(css, /\.day-nav\s*\{[\s\S]*?max-width:\s*calc\(100% - 36px\);[\s\S]*?overflow-x:\s*auto;/);
  assert.doesNotMatch(css, /(?:html|body|\*)\s*\{[^}]*overflow-x:\s*hidden/);
  assert.match(premium, /premium\.css\?v=20260811-1/);
  assert.match(christmas, /premium\.css\?v=20260811-1/);
});
