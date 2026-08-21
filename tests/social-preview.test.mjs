import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";
import { runInNewContext } from "node:vm";

const root = resolve(import.meta.dirname, "..");
const languages = ["he", "en", "pl", "de", "cs"];
const refs = {
  facebook: "hala-stulecia-facebook-2026-08-21",
  instagram: "hala-stulecia-instagram-2026-08-21",
};

function loadCatalog() {
  const window = {};
  runInNewContext(readFileSync(resolve(root, "data/place-catalog.js"), "utf8"), { window, console });
  return window.WROC_CATALOG;
}

test("only the two Hala Stulecia pilot posts are enriched", () => {
  const catalog = loadCatalog();
  const hala = catalog.getPlace("hala");
  const enriched = Object.values(catalog.places).flatMap((place) =>
    place.socialPosts.filter((post) => post.contentRef).map((post) => ({ placeId: place.id, ...post })),
  );

  assert.deepEqual(enriched.map(({ placeId, platform, originalLanguage, contentRef }) =>
    [placeId, platform, originalLanguage, contentRef]), [
    ["hala", "facebook", "he", refs.facebook],
    ["hala", "instagram", "he", refs.instagram],
  ]);
  assert.equal(hala.socialPosts.find((post) => post.platform === "facebook").url, "https://www.facebook.com/61591964083308/posts/122115263553398802/");
  assert.equal(hala.socialPosts.find((post) => post.platform === "instagram").url, "https://www.instagram.com/wroclaw.lowersilesia/p/DcTdbhVjM1Y/");
  assert.equal(catalog.getPlace("zoo-wroclaw").socialPosts.some((post) => post.contentRef), false);
});

test("each Hala pilot resource contains Hebrew plus four complete translations", () => {
  for (const [platform, contentRef] of Object.entries(refs)) {
    const resource = JSON.parse(readFileSync(resolve(root, `data/social-content/${contentRef}.json`), "utf8"));
    assert.equal(resource.originalLanguage, "he", `${platform} original language`);
    assert.deepEqual(Object.keys(resource.content).sort(), [...languages].sort());
    for (const language of languages) {
      assert.ok(resource.content[language].length > 500, `${platform}.${language} should contain the complete post`);
    }
    assert.match(resource.content.he, /Hala Stulecia/);
    assert.match(resource.content.he, /#WrocLove$/);
  }
});

test("shared helper decorates enriched posts while leaving legacy links unchanged", () => {
  const catalog = loadCatalog();
  const document = { addEventListener() {}, documentElement: { lang: "en" } };
  const window = { WROC_CATALOG: catalog };
  runInNewContext(readFileSync(resolve(root, "social-preview.js"), "utf8"), { window, document, console, Map, Set });

  const halaInstagram = catalog.getPlace("hala").socialPosts.find((post) => post.platform === "instagram");
  const attributes = window.WROC_SOCIAL_PREVIEW.linkAttributes("hala", "instagram", halaInstagram.url);
  assert.match(attributes, /data-social-original-language="he"/);
  assert.match(attributes, new RegExp(`data-social-content-ref="${refs.instagram}"`));

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
