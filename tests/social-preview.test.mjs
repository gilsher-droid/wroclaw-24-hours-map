import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";
import { runInNewContext } from "node:vm";

const root = resolve(import.meta.dirname, "..");
const languages = ["he", "en", "pl", "de", "cs"];
const expectedEnriched = [
  ["boguslawskiego", "facebook", "he", "boguslawskiego-facebook-122109385623398802"],
  ["boguslawskiego", "instagram", "he", "boguslawskiego-facebook-122109385623398802"],
  ["church-of-peace-swidnica", "facebook", "he", "church-of-peace-swidnica-social-Dbf-bApnAo5"],
  ["church-of-peace-swidnica", "instagram", "he", "church-of-peace-swidnica-social-Dbf-bApnAo5"],
  ["glowny", "facebook", "he", "wroclaw-glowny-social-DcEIRe9DA_7"],
  ["glowny", "instagram", "he", "wroclaw-glowny-social-DcEIRe9DA_7"],
  ["hala", "facebook", "he", "hala-stulecia-facebook-2026-08-21"],
  ["hala", "instagram", "he", "hala-stulecia-instagram-2026-08-21"],
  ["hala-targowa", "facebook", "he", "hala-targowa-facebook-122110916907398802"],
  ["hala-targowa", "instagram", "he", "hala-targowa-instagram-DbpTgt_HFkH"],
  ["kaplica-czaszek-czermna", "facebook", "he", "kaplica-czaszek-social-Dbf9RSWnOB8"],
  ["kaplica-czaszek-czermna", "instagram", "he", "kaplica-czaszek-social-Dbf9RSWnOB8"],
  ["ksiaz-castle", "facebook", "he", "ksiaz-castle-social-Dbhy7ROHMi"],
  ["ksiaz-castle", "instagram", "he", "ksiaz-castle-social-Dbhy7ROHMi"],
  ["ossolineum", "facebook", "he", "ossolineum-facebook-122111795823398802"],
  ["ossolineum", "instagram", "he", "ossolineum-instagram-DbxOsQ_nEQt"],
  ["zoo-wroclaw", "facebook", "he", "zoo-wroclaw-social-DcTZronDED"],
  ["zoo-wroclaw", "instagram", "he", "zoo-wroclaw-social-DcTZronDED"],
];

function loadCatalog() {
  const window = {};
  runInNewContext(readFileSync(resolve(root, "data/place-catalog.js"), "utf8"), { window, console });
  return window.WROC_CATALOG;
}

test("the source-driven rollout enriches exactly eighteen verified posts", () => {
  const catalog = loadCatalog();
  const hala = catalog.getPlace("hala");
  const enriched = Object.values(catalog.places).flatMap((place) =>
    place.socialPosts.filter((post) => post.contentRef).map((post) => ({ placeId: place.id, ...post })),
  );

  assert.deepEqual(enriched.map(({ placeId, platform, originalLanguage, contentRef }) =>
    [placeId, platform, originalLanguage, contentRef]), expectedEnriched);
  assert.equal(hala.socialPosts.find((post) => post.platform === "facebook").url, "https://www.facebook.com/61591964083308/posts/122115263553398802/");
  assert.equal(hala.socialPosts.find((post) => post.platform === "instagram").url, "https://www.instagram.com/wroclaw.lowersilesia/p/DcTdbhVjM1Y/");
  assert.equal(catalog.getPlace("zoo-wroclaw").socialPosts.filter((post) => post.contentRef).length, 2);
});

test("the audit covers 38 social posts while leaving 20 source-unavailable posts direct", () => {
  const catalog = loadCatalog();
  const byUrl = new Map();
  for (const place of Object.values(catalog.places)) {
    for (const post of place.socialPosts) {
      const entry = byUrl.get(post.url) || { post, placeIds: [] };
      entry.placeIds.push(place.id);
      byUrl.set(post.url, entry);
    }
  }
  assert.equal(byUrl.size, 38);
  assert.equal(byUrl.has("https://www.instagram.com/wroclaw.lowersilesia/"), false);
  const socialPosts = [...byUrl.values()];
  assert.equal(socialPosts.filter(({ post }) => post.contentRef).length, 18);
  assert.equal(socialPosts.filter(({ post }) => !post.contentRef).length, 20);

  const familiar = byUrl.get("https://www.facebook.com/61591964083308/posts/122111800983398802/");
  assert.ok(familiar.placeIds.length > 1);
  assert.equal(familiar.post.contentRef, undefined);
});

test("every enriched post contains Hebrew plus four complete translations", () => {
  const uniqueResources = new Map(expectedEnriched.map(([, platform, , contentRef]) => [contentRef, platform]));
  assert.equal(uniqueResources.size, 12);
  for (const [contentRef, platform] of uniqueResources) {
    const resource = JSON.parse(readFileSync(resolve(root, `data/social-content/${contentRef}.json`), "utf8"));
    assert.equal(resource.originalLanguage, "he", `${platform} original language`);
    assert.deepEqual(Object.keys(resource.content).sort(), [...languages].sort());
    for (const language of languages) {
      assert.ok(resource.content[language].length > 300, `${contentRef}.${language} should contain the complete post`);
    }
  }
});

test("Hala pilot remains unchanged while verified cross-platform copy reuses one resource", () => {
  const catalog = loadCatalog();
  const hala = catalog.getPlace("hala");
  assert.deepEqual(Array.from(hala.socialPosts, ({ platform, contentRef }) => [platform, contentRef]), [
    ["facebook", "hala-stulecia-facebook-2026-08-21"],
    ["instagram", "hala-stulecia-instagram-2026-08-21"],
  ]);
  const boguslawskiego = catalog.getPlace("boguslawskiego");
  assert.equal(boguslawskiego.socialPosts.find((post) => post.platform === "facebook")?.contentRef, "boguslawskiego-facebook-122109385623398802");
  assert.equal(boguslawskiego.socialPosts.find((post) => post.platform === "instagram")?.contentRef, "boguslawskiego-facebook-122109385623398802");
  const zoo = catalog.getPlace("zoo-wroclaw");
  assert.equal(zoo.socialPosts.find((post) => post.url.includes("/groups/"))?.contentRef, undefined);
  assert.equal(new Set(zoo.socialPosts.filter((post) => post.contentRef).map((post) => post.contentRef)).size, 1);
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

  const directFacebook = catalog.getPlace("chatka").socialPosts.find((post) => post.platform === "facebook");
  assert.equal(window.WROC_SOCIAL_PREVIEW.linkAttributes("chatka", "facebook", directFacebook.url), "");
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
