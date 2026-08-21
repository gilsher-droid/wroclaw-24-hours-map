import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";
import { runInNewContext } from "node:vm";

const root = resolve(import.meta.dirname, "..");
const languages = ["he", "en", "pl", "de", "cs"];
const expectedEnriched = [
  ["boguslawskiego", "facebook", "he", "boguslawskiego-facebook-122109385623398802"],
  ["hala", "facebook", "he", "hala-stulecia-facebook-2026-08-21"],
  ["hala", "instagram", "he", "hala-stulecia-instagram-2026-08-21"],
  ["hala-targowa", "facebook", "he", "hala-targowa-facebook-122110916907398802"],
  ["hala-targowa", "instagram", "he", "hala-targowa-instagram-DbpTgt_HFkH"],
  ["ossolineum", "facebook", "he", "ossolineum-facebook-122111795823398802"],
  ["ossolineum", "instagram", "he", "ossolineum-instagram-DbxOsQ_nEQt"],
];

function loadCatalog() {
  const window = {};
  runInNewContext(readFileSync(resolve(root, "data/place-catalog.js"), "utf8"), { window, console });
  return window.WROC_CATALOG;
}

test("the source-driven rollout enriches exactly seven verified posts", () => {
  const catalog = loadCatalog();
  const hala = catalog.getPlace("hala");
  const enriched = Object.values(catalog.places).flatMap((place) =>
    place.socialPosts.filter((post) => post.contentRef).map((post) => ({ placeId: place.id, ...post })),
  );

  assert.deepEqual(enriched.map(({ placeId, platform, originalLanguage, contentRef }) =>
    [placeId, platform, originalLanguage, contentRef]), expectedEnriched);
  assert.equal(hala.socialPosts.find((post) => post.platform === "facebook").url, "https://www.facebook.com/61591964083308/posts/122115263553398802/");
  assert.equal(hala.socialPosts.find((post) => post.platform === "instagram").url, "https://www.instagram.com/wroclaw.lowersilesia/p/DcTdbhVjM1Y/");
  assert.equal(catalog.getPlace("zoo-wroclaw").socialPosts.some((post) => post.contentRef), false);
});

test("the audit covers 35 social URLs while leaving 27 source-unavailable posts direct", () => {
  const catalog = loadCatalog();
  const byUrl = new Map();
  for (const place of Object.values(catalog.places)) {
    for (const post of place.socialPosts) {
      const entry = byUrl.get(post.url) || { post, placeIds: [] };
      entry.placeIds.push(place.id);
      byUrl.set(post.url, entry);
    }
  }
  assert.equal(byUrl.size, 35);
  const socialPosts = [...byUrl.values()].filter(({ post }) => post.url !== "https://www.instagram.com/wroclaw.lowersilesia/");
  assert.equal(socialPosts.length, 34);
  assert.equal(socialPosts.filter(({ post }) => post.contentRef).length, 7);
  assert.equal(socialPosts.filter(({ post }) => !post.contentRef).length, 27);

  const familiar = byUrl.get("https://www.facebook.com/61591964083308/posts/122111800983398802/");
  assert.ok(familiar.placeIds.length > 1);
  assert.equal(familiar.post.contentRef, undefined);
});

test("every enriched post contains Hebrew plus four complete translations", () => {
  for (const [, platform, , contentRef] of expectedEnriched) {
    const resource = JSON.parse(readFileSync(resolve(root, `data/social-content/${contentRef}.json`), "utf8"));
    assert.equal(resource.originalLanguage, "he", `${platform} original language`);
    assert.deepEqual(Object.keys(resource.content).sort(), [...languages].sort());
    for (const language of languages) {
      assert.ok(resource.content[language].length > 300, `${contentRef}.${language} should contain the complete post`);
    }
  }
});

test("Hala pilot metadata remains unchanged and partial enrichment preserves direct links", () => {
  const catalog = loadCatalog();
  const hala = catalog.getPlace("hala");
  assert.deepEqual(Array.from(hala.socialPosts, ({ platform, contentRef }) => [platform, contentRef]), [
    ["facebook", "hala-stulecia-facebook-2026-08-21"],
    ["instagram", "hala-stulecia-instagram-2026-08-21"],
  ]);
  const boguslawskiego = catalog.getPlace("boguslawskiego");
  assert.equal(boguslawskiego.socialPosts.find((post) => post.platform === "facebook")?.contentRef, "boguslawskiego-facebook-122109385623398802");
  assert.equal(boguslawskiego.socialPosts.find((post) => post.platform === "instagram")?.contentRef, undefined);
});

test("shared helper decorates enriched posts while leaving legacy links unchanged", () => {
  const catalog = loadCatalog();
  const document = { addEventListener() {}, documentElement: { lang: "en" } };
  const window = { WROC_CATALOG: catalog };
  runInNewContext(readFileSync(resolve(root, "social-preview.js"), "utf8"), { window, document, console, Map, Set });

  const halaInstagram = catalog.getPlace("hala").socialPosts.find((post) => post.platform === "instagram");
  const attributes = window.WROC_SOCIAL_PREVIEW.linkAttributes("hala", "instagram", halaInstagram.url);
  assert.match(attributes, /data-social-original-language="he"/);
  assert.match(attributes, /data-social-content-ref="hala-stulecia-instagram-2026-08-21"/);

  const zooInstagram = catalog.getPlace("zoo-wroclaw").socialPosts.find((post) => post.platform === "instagram");
  assert.equal(window.WROC_SOCIAL_PREVIEW.linkAttributes("zoo-wroclaw", "instagram", zooInstagram.url), "");
  assert.equal(window.WROC_SOCIAL_PREVIEW.directionForLanguage("he"), "rtl");
  for (const language of ["en", "pl", "de", "cs"]) {
    assert.equal(window.WROC_SOCIAL_PREVIEW.directionForLanguage(language), "ltr");
  }
});

test("all five social-link products load the one shared component", () => {
  for (const file of ["map.html", "premium.html", "moshe.html", "lifestyle.html", "excursions.html"]) {
    const html = readFileSync(resolve(root, file), "utf8");
    assert.match(html, /\/social-preview\.css\?v=/, `${file} CSS`);
    assert.match(html, /\/social-preview\.js\?v=/, `${file} JS`);
    assert.equal((html.match(/\/social-preview\.js\?v=/g) || []).length, 1, `${file} loads one shared JS file`);
  }
});
