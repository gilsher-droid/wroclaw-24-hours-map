import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import vm from "node:vm";

const source = readFileSync(new URL("../analytics.js", import.meta.url), "utf8");

function page(url, config = {}, storage = new Map()) {
  const location = new URL(url);
  const scripts = [];
  const listeners = new Map();
  const document = {
    readyState: "complete",
    documentElement: { lang: location.searchParams.get("lang") || "he" },
    head: { appendChild: (script) => scripts.push(script) },
    createElement: () => ({}),
    addEventListener: (name, handler) => listeners.set(name, handler),
  };
  const sessionStorage = {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, value),
  };
  const window = { WROC_ANALYTICS_CONFIG: config };
  vm.runInNewContext(source, { window, document, location, sessionStorage, URL, URLSearchParams, Date, console });
  const calls = () => Array.from(window.dataLayer || [], (entry) => Array.from(entry));
  return { window, document, scripts, listeners, calls, storage };
}

test("no scripts, storage, or events run without consent and verified IDs", () => {
  const state = page("https://wroc-love.com/?lang=he&utm_source=facebook&utm_campaign=test");
  state.window.WROC_ANALYTICS.track("interactive_maps_click", { target_product: "wroclaw-24-hours" });
  assert.equal(state.scripts.length, 0);
  assert.equal(state.storage.size, 0);
  assert.equal(state.calls().length, 0);
  state.window.WROC_ANALYTICS.setConsent({ analytics: true, marketing: true });
  assert.equal(state.scripts.length, 0);
  assert.equal(state.calls().length, 0);
});

test("consent starts one page view and one map_open per provider", () => {
  const state = page("https://wroc-love.com/products/interactive-maps/map.html?lang=pl&utm_source=instagram&utm_medium=paid_social&utm_campaign=water-tower&private=omit", {
    ga4MeasurementId: "G-ABC123", metaPixelId: "1234567890",
  });
  assert.equal(state.scripts.length, 0);
  state.window.WROC_ANALYTICS.setConsent({ analytics: true, marketing: false });
  state.window.WROC_ANALYTICS.setConsent({ analytics: true, marketing: false });
  assert.deepEqual(state.scripts.map((item) => item.src), ["https://www.googletagmanager.com/gtag/js?id=G-ABC123"]);
  const events = state.calls().filter((item) => item[0] === "event");
  assert.deepEqual(events.map((item) => item[1]), ["page_view", "map_open"]);
  assert.equal(events[1][2].product_id, "wroclaw-24-hours");
  assert.equal(events[1][2].language, "pl");
  assert.equal(events[1][2].utm_source, "instagram");
  assert.equal(events[0][2].page_location.includes("private=omit"), false);
  assert.equal(state.calls().find((item) => item[0] === "config")[2].page_location.includes("private=omit"), false);
  state.window.WROC_ANALYTICS.setConsent({ analytics: true, marketing: true });
  state.window.WROC_ANALYTICS.setConsent({ analytics: true, marketing: true });
  assert.equal(state.scripts.length, 2);
  assert.deepEqual(Array.from(state.window.fbq.queue, (item) => Array.from(item)).filter((item) => item[0] === "track").map((item) => item[1]), ["PageView", "ViewContent"]);
});

test("attribution survives internal navigation and events use current language", () => {
  const storage = new Map();
  const landing = page("https://wroc-love.com/?lang=he&utm_source=facebook&utm_medium=paid_social&utm_campaign=water-tower&utm_content=water-tower-he", { ga4MeasurementId: "G-ABC123" }, storage);
  landing.window.WROC_ANALYTICS.setConsent({ analytics: true, marketing: false });
  const map = page("https://wroc-love.com/products/interactive-maps/premium.html?lang=de", { ga4MeasurementId: "G-ABC123" }, storage);
  map.window.WROC_ANALYTICS.setConsent({ analytics: true, marketing: false });
  map.document.documentElement.lang = "cs";
  map.window.WROC_ANALYTICS.track("place_open", { canonical_place_id: "opera" });
  const event = map.calls().filter((item) => item[1] === "place_open")[0][2];
  assert.equal(event.language, "cs");
  assert.equal(event.product_id, "wroclaw-four-days");
  assert.equal(event.utm_source, "facebook");
  assert.equal(event.utm_campaign, "water-tower");
  assert.equal(event.utm_content, "water-tower-he");
});

test("all five supported languages are included in map events", () => {
  for (const language of ["he", "en", "pl", "de", "cs"]) {
    const state = page(`https://wroc-love.com/products/interactive-maps/map.html?lang=${language}`, { ga4MeasurementId: "G-ABC123" });
    state.window.WROC_ANALYTICS.setConsent({ analytics: true, marketing: false });
    const events = state.calls().filter((item) => item[0] === "event");
    assert.deepEqual(events.map((item) => item[1]), ["page_view", "map_open"]);
    assert.equal(events[1][2].language, language);
  }
});

test("link events use product IDs, ticker IDs, and domains without query strings", () => {
  const state = page("https://wroc-love.com/?lang=en", { ga4MeasurementId: "G-ABC123" });
  state.window.WROC_ANALYTICS.setConsent({ analytics: true, marketing: false });
  const click = state.listeners.get("click");
  const product = { href: "https://wroc-love.com/products/interactive-maps/cultural.html?lang=en", closest: () => null };
  click({ target: { closest: () => product } });
  const ticker = {};
  const news = {
    href: "https://example.com/story?secret=omit",
    dataset: { newsId: "update-1", newsCategory: "event", canonicalPlaceId: "opera", canonicalExperienceId: "" },
    closest: (selector) => selector === "#wroc-now-in-wroclaw" ? ticker : null,
  };
  click({ target: { closest: () => news } });
  const events = state.calls().filter((item) => item[0] === "event").slice(1);
  assert.deepEqual(events.map((item) => item[1]), ["interactive_maps_click", "news_ticker_click", "outbound_link_click"]);
  assert.equal(events[0][2].target_product, "cultural-adventure");
  assert.equal(events[1][2].news_id, "update-1");
  assert.equal(events[2][2].destination_domain, "example.com");
  assert.equal(JSON.stringify(events).includes("secret=omit"), false);
});
