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

test("weekly news includes six localized and dated items", () => {
  const { window } = loadTicker();
  const items = window.WROC_NOW_IN_WROCLAW_ITEMS;
  assert.equal(items.length, 6);
  assert.equal(new Set(items.map((item) => item.id)).size, items.length);
  for (const item of items) {
    assert.deepEqual(Object.keys(item.title).sort(), ["cs", "de", "en", "he", "pl"]);
    assert.doesNotThrow(() => new URL(item.url));
    assert.match(item.startDate, /^2026-/);
    assert.match(item.endDate, /^2026-/);
  }
  assert.equal(items.every((item) => item.startDate === "2026-10-05"), true);
  for (const language of ["he", "en", "pl", "de", "cs"]) {
    const suffix = language === "he" ? "" : `-${language}`;
    const article = readFileSync(resolve(root, `news/2026-10-05${suffix}.html`), "utf8");
    assert.match(article, new RegExp(`<html lang="${language}"`));
    for (const item of items) {
      assert.match(item.articleUrl, /^\/news\/2026-10-05\.html#/);
      assert.ok(article.includes(`id="${item.articleUrl.split("#")[1]}"`));
    }
  }
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

test("October farm remains seasonal and the new bulletin excludes recycled stories", () => {
  const { window } = loadTicker();
  const api = window.WROC_NOW_IN_WROCLAW;
  const items = window.WROC_NOW_IN_WROCLAW_ITEMS;
  const farm = items.find((item) => item.id === "dyniowa-farma-season-2026-10");
  assert.equal(farm.category, "event");
  assert.equal(api.isActive(farm, new Date(2026, 9, 31, 23, 59)), true);
  assert.equal(api.isActive(farm, new Date(2026, 10, 1)), false);
  assert.deepEqual(Array.from(api.activeItems(items, new Date(2026, 9, 13)), (item) => item.id), [farm.id]);
  assert.equal(api.activeItems(items, new Date(2026, 10, 1)).length, 0);
  assert.equal(items.some((item) => /ryanair|prize|coffee-planet|pixel-rush|piwnica/.test(item.id)), false);
  const klodzko = items.find((item) => item.id === "przy-klodzkiej-opening-2026-10");
  assert.match(klodzko.title.en, /now open/);
  assert.doesNotMatch(klodzko.title.en, /scheduled/);
});

test("ticker is shared across the homepage and every main product page", () => {
  for (const page of ["index.html", "map.html", "premium.html", "moshe.html", "lifestyle.html", "cultural.html", "excursions.html"]) {
    const html = readFileSync(resolve(root, page), "utf8");
    assert.equal((html.match(/now-in-wroclaw\.js/g) || []).length, 2, `${page} should load data and component once`);
    assert.equal((html.match(/now-in-wroclaw\.css/g) || []).length, 1, `${page} should load ticker styles once`);
  }
});

test("ticker rotates without arrows, can pause, and offers static reduced-motion news", () => {
  const source = readFileSync(resolve(root, "now-in-wroclaw.js"), "utf8");
  const styles = readFileSync(resolve(root, "now-in-wroclaw.css"), "utf8");
  for (const title of ["עכשיו בוורוצלב", "Now in Wrocław", "Teraz we Wrocławiu", "Jetzt in Wrocław", "Právě ve Vratislavi"]) {
    assert.match(source, new RegExp(title));
  }
  assert.match(source, /language === "he"/);
  assert.match(source, /"rtl" : "ltr"/);
  assert.match(source, /setInterval/);
  assert.match(source, /6000/);
  assert.match(source, /item\.articleUrl\.replace\("\.html#"/);
  assert.match(source, /data-now-pause/);
  assert.match(source, /hovering \|\| focused \|\| motion.matches/);
  assert.doesNotMatch(source, /data-now-previous|data-now-next|ArrowLeft|ArrowRight/);
  assert.match(source, /wroc-now__reduced-list/);
  assert.match(source, /getElementById\("wroc-now-in-wroclaw"\)/);
  assert.match(styles, /@media \(max-width: 720px\)/);
  assert.match(styles, /prefers-reduced-motion: reduce/);
});
