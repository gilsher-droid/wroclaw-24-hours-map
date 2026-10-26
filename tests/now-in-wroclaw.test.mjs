import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";
import { runInNewContext } from "node:vm";

const root = resolve(import.meta.dirname, "..");

function loadTicker(historical = false) {
  const window = { location: { search: "" } };
  const context = { window, console, URLSearchParams };
  runInNewContext(readFileSync(resolve(root, historical === "oct19" ? "tests/fixtures/news-2026-10-19.js" : historical ? "tests/fixtures/news-2026-10-12.js" : "data/now-in-wroclaw.js"), "utf8"), context);
  runInNewContext(readFileSync(resolve(root, "now-in-wroclaw.js"), "utf8"), context);
  return { window, context };
}

test("weekly news includes five localized and dated items", () => {
  const { window } = loadTicker();
  const items = window.WROC_NOW_IN_WROCLAW_ITEMS;
  assert.equal(items.length, 5);
  assert.equal(new Set(items.map((item) => item.id)).size, items.length);
  for (const item of items) {
    assert.deepEqual(Object.keys(item.title).sort(), ["cs", "de", "en", "he", "pl"]);
    assert.doesNotThrow(() => new URL(item.url));
    assert.match(item.startDate, /^2026-/);
    assert.match(item.endDate, /^2026-/);
  }
  assert.equal(items.every((item) => item.startDate === "2026-10-26"), true);
  for (const language of ["he", "en", "pl", "de", "cs"]) {
    const suffix = language === "he" ? "" : `-${language}`;
    const article = readFileSync(resolve(root, `news/2026-10-26${suffix}.html`), "utf8");
    assert.match(article, new RegExp(`<html lang="${language}"`));
    for (const item of items) {
      assert.match(item.articleUrl, /^\/news\/2026-10-26\.html#/);
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

test("announcements expire before stale opening claims and temporary events have separate dates", () => {
  const { window } = loadTicker(true); const items=window.WROC_NOW_IN_WROCLAW_ITEMS; const api=window.WROC_NOW_IN_WROCLAW;
  assert.equal(api.activeItems(items, new Date(2026,9,12)).length,4);
  assert.equal(items[0].status,"announced"); assert.equal(items[0].eventStartDate,"2026-10-16");
  assert.equal(api.isActive(items[0],new Date(2026,9,16)),false);
  assert.equal(items[2].status,"announced"); assert.equal(items[2].eventStartDate,"2026-10-13");
  assert.equal(api.isActive(items[2],new Date(2026,9,18,23,59)),true);
  assert.equal(api.isActive(items[2],new Date(2026,9,19)),false);
  assert.equal(items[1].eventEndDate,"2026-12-30"); assert.equal(items[3].eventEndDate,"2026-11-25");
  assert.equal(items[1].status,"confirmed"); assert.equal(items[3].status,"confirmed");
  assert.equal(api.activeItems(items,new Date(2026,9,20)).length,0);
  assert.equal(items.some(x=>/dyniowa-farma|klodzkiej|schody|100-bridges/.test(x.id)),false);
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


test("October 19 replaces stale announcements while preserving seasonal identities", () => {
 const { window } = loadTicker("oct19"); const items = window.WROC_NOW_IN_WROCLAW_ITEMS; const api=window.WROC_NOW_IN_WROCLAW;
 const finale=items.find(x=>x.id==="fountain-finale-2026-10");
 assert.equal(finale.status,"announced"); assert.equal(finale.eventStartDate,"2026-10-24");
 assert.equal(api.isActive(finale,new Date(2026,9,24,23,59)),true);
 assert.equal(api.isActive(finale,new Date(2026,9,25)),false);
 const lumina=items.find(x=>x.id==="lumina-park-2026-10");
 assert.equal(lumina.status,"confirmed"); assert.equal(lumina.eventEndDate,"2027-02-14");
 assert.ok(items.every(x=>!/(pumpkin|restaurantweek|peace-churches)/.test(x.id)));
 assert.equal(api.activeItems(items,new Date(2026,9,26)).length,0);
 assert.equal(items.find(x=>x.id==="ruska-works-2026-10").eventEndDate,undefined);
 const source=readFileSync(resolve(root,"data/canonical-experiences.js"),"utf8");
 assert.match(source,/seasonEndDate: "2026-10-24"/);
});

test("October 26 distinguishes ended seasons, upcoming events and two castle evenings", () => {
 const {window}=loadTicker(); const items=window.WROC_NOW_IN_WROCLAW_ITEMS; const api=window.WROC_NOW_IN_WROCLAW;
 const fountain=items.find(x=>x.id==="fountain-finale-2026-10");
 assert.equal(fountain.status,"confirmed"); assert.equal(fountain.eventEndDate,"2026-10-24");
 const holiday=items.find(x=>x.id==="all-saints-2026-11"); assert.equal(holiday.status,"announced");
 const castle=items.find(x=>x.id==="lesnica-halloween-2026-10");
 assert.equal(castle.status,"announced"); assert.equal(castle.events.length,2);
 assert.equal(castle.events[0].startDate,"2026-10-30"); assert.equal(castle.events[1].startDate,"2026-10-31");
 assert.equal(api.isActive(castle,new Date(2026,10,1)),false);
 assert.equal(api.activeItems(items,new Date(2026,10,2)).length,0);
 for(const language of ["he","en","pl","de","cs"]){
  const article=readFileSync(resolve(root,`news/2026-10-26${language==="he"?"":"-"+language}.html`),"utf8");
  for(const id of ["folta","sniezka","airport"])assert.ok(article.includes(`id="${id}"`));
  assert.ok(article.includes("2027")); assert.doesNotMatch(article,/:chatgpt-content-reference/);
 }
});
