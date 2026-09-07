import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";
import { runInNewContext } from "node:vm";

const root = resolve(import.meta.dirname, "..");

function loadTicker() {
  const window = { location: { search: "" } };
  const context = { window, console, URLSearchParams };
  runInNewContext(readFileSync(resolve(root, "data/now-in-wroclaw.js"), "utf8"), context);
  runInNewContext(readFileSync(resolve(root, "now-in-wroclaw.js"), "utf8"), context);
  return { window, context };
}

test("weekly news includes four localized and dated items", () => {
  const { window } = loadTicker();
  const items = window.WROC_NOW_IN_WROCLAW_ITEMS;
  assert.equal(items.length, 4);
  assert.equal(new Set(items.map((item) => item.id)).size, 4);
  for (const item of items) {
    assert.deepEqual(Object.keys(item.title).sort(), ["cs", "de", "en", "he", "pl"]);
    assert.doesNotThrow(() => new URL(item.url));
    assert.match(item.startDate, /^2026-/);
    assert.match(item.endDate, /^2026-/);
  }
  assert.equal(items.find((item) => item.id === "westfield-wroclavia-rebrand-2026").relatedCanonicalPlaceId, "wroclavia");
  assert.equal(items.find((item) => item.id === "kinomural-nadodrze-2026").relatedCanonicalExperienceId, "street-art-nadodrze-olbin");
});

test("expiry uses inclusive local calendar dates and empty active sets stay empty", () => {
  const { window } = loadTicker();
  const api = window.WROC_NOW_IN_WROCLAW;
  const item = { startDate: "2026-09-07", endDate: "2026-09-17" };
  assert.equal(api.isActive(item, new Date(2026, 8, 7, 23, 59)), true);
  assert.equal(api.isActive(item, new Date(2026, 8, 17, 23, 59)), true);
  assert.equal(api.isActive(item, new Date(2026, 8, 18, 0, 1)), false);
  assert.equal(api.activeItems([item], new Date(2026, 8, 18)).length, 0);
});

test("ticker is shared across the homepage and every main product page", () => {
  for (const page of ["index.html", "map.html", "premium.html", "moshe.html", "lifestyle.html", "cultural.html", "excursions.html"]) {
    const html = readFileSync(resolve(root, page), "utf8");
    assert.equal((html.match(/now-in-wroclaw\.js/g) || []).length, 2, `${page} should load data and component once`);
    assert.equal((html.match(/now-in-wroclaw\.css/g) || []).length, 1, `${page} should load ticker styles once`);
  }
});

test("ticker supports five languages, RTL/LTR, keyboard controls and responsive layout", () => {
  const source = readFileSync(resolve(root, "now-in-wroclaw.js"), "utf8");
  const styles = readFileSync(resolve(root, "now-in-wroclaw.css"), "utf8");
  for (const title of ["עכשיו בוורוצלב", "Now in Wrocław", "Teraz we Wrocławiu", "Jetzt in Wrocław", "Právě ve Vratislavi"]) {
    assert.match(source, new RegExp(title));
  }
  assert.match(source, /language === "he"/);
  assert.match(source, /"rtl" : "ltr"/);
  assert.match(source, /ArrowLeft/);
  assert.match(source, /ArrowRight/);
  assert.match(source, /aria-live="polite"/);
  assert.match(source, /getElementById\("wroc-now-in-wroclaw"\)/);
  assert.match(styles, /@media \(max-width: 720px\)/);
  assert.doesNotMatch(source, /setInterval|setTimeout/);
});
