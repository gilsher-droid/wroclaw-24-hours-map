import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";
import { runInNewContext } from "node:vm";

const root = resolve(import.meta.dirname, "..");
const productionPath = "/products/interactive-maps/cultural.html";
const expected = {
  he: "israel",
  en: "international",
  pl: "poland",
  de: "germany",
  cs: "czechia",
};

function loadCampaigns() {
  const window = {};
  runInNewContext(readFileSync(resolve(root, "data/cultural-instagram-campaigns.js"), "utf8"), { window, URL });
  return window.WROC_CULTURAL_INSTAGRAM_CAMPAIGNS;
}

test("Cultural Adventure exposes five language-specific Instagram campaign URLs", () => {
  const config = loadCampaigns();
  assert.equal(config.id, "cultural-adventure-instagram");
  assert.equal(config.product, "cultural-adventure");
  assert.equal(config.campaigns.length, 5);

  for (const [language, market] of Object.entries(expected)) {
    const record = config.getCampaign(language);
    assert.ok(record, language);
    assert.equal(record.id, `cultural-instagram-${language}`);
    assert.equal(record.market, market);
    assert.equal(record.source, "instagram");
    assert.equal(record.medium, "social");
    assert.equal(record.campaign, "cultural_adventure");

    const url = new URL(record.destinationUrl);
    assert.equal(url.origin, "https://wroc-love.com");
    assert.equal(url.pathname, productionPath);
    assert.equal(url.searchParams.get("lang"), language);
    assert.equal(url.searchParams.get("utm_source"), "instagram");
    assert.equal(url.searchParams.get("utm_medium"), "social");
    assert.equal(url.searchParams.get("utm_campaign"), "cultural_adventure");
    assert.equal(url.searchParams.get("utm_content"), language);
    assert.equal(config.readUrl(url)?.language, language);
  }
});

test("utm_content supports future creative-level measurement without development", () => {
  const config = loadCampaigns();
  for (const language of Object.keys(expected)) {
    for (const creative of ["launch_reel", "carousel", "story", "wuwa", "opera", "nfm"]) {
      const url = new URL(config.buildUrl(language, creative));
      assert.equal(url.searchParams.get("utm_content"), `${language}_${creative}`);
      assert.equal(config.readUrl(url)?.content, `${language}_${creative}`);
    }
  }
  assert.throws(() => config.buildUrl("fr", "launch_reel"), /Unsupported/);
});

test("Cultural Adventure keeps campaign parameters when visitors switch language", () => {
  const config = loadCampaigns();
  const url = new URL(config.buildUrl("he", "launch_reel"));
  url.searchParams.set("lang", "en");
  assert.equal(url.searchParams.get("utm_source"), "instagram");
  assert.equal(url.searchParams.get("utm_medium"), "social");
  assert.equal(url.searchParams.get("utm_campaign"), "cultural_adventure");
  assert.equal(url.searchParams.get("utm_content"), "he_launch_reel");

  const source = readFileSync(resolve(root, "cultural.js"), "utf8");
  assert.match(source, /new URL\(location\.href\)/);
  assert.match(source, /searchParams\.set\("lang",language\)/);
  assert.match(source, /history\.replaceState/);
});

test("Cultural Adventure declares one clean canonical URL and ships the campaign reference", () => {
  const html = readFileSync(resolve(root, "cultural.html"), "utf8");
  assert.match(html, /<link rel="canonical" href="https:\/\/wroc-love\.com\/products\/interactive-maps\/cultural\.html" \/>/);
  assert.match(html, /\/data\/cultural-instagram-campaigns\.js\?v=20260903-1/);
  assert.doesNotMatch(html, /rel="canonical"[^>]+utm_/);
});
