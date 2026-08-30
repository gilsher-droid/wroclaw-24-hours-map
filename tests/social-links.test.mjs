import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";
import { runInNewContext } from "node:vm";

const root = resolve(import.meta.dirname, "..");

function loadCatalog() {
  const window = {};
  runInNewContext(readFileSync(resolve(root, "data/place-catalog.js"), "utf8"), { window, console });
  return window.WROC_CATALOG;
}

test("every canonical social item remains a direct Facebook or Instagram link", () => {
  const catalog = loadCatalog();
  const uniqueUrls = new Set();

  for (const place of Object.values(catalog.places)) {
    for (const post of place.socialPosts) {
      assert.ok(["facebook", "instagram"].includes(post.platform), `${place.id}: supported platform`);
      assert.match(post.url, /^https:\/\/(?:www\.)?(?:facebook\.com|instagram\.com)\//, `${place.id}: public social URL`);
      assert.equal(post.contentRef, undefined, `${place.id}: direct link must not carry contentRef`);
      assert.equal(post.originalLanguage, undefined, `${place.id}: direct link must not carry preview metadata`);
      uniqueUrls.add(post.url);
    }
  }

  assert.equal(uniqueUrls.size, 44);
});

test("the supplied priority links stay on their existing canonical places", () => {
  const catalog = loadCatalog();
  const urls = (placeId) => catalog.getPlace(placeId).socialPosts.map((post) => post.url);

  assert.ok(urls("ksiaz-castle").includes("https://www.facebook.com/share/p/19UBPN184V/"));
  assert.ok(urls("church-of-peace-swidnica").includes("https://www.instagram.com/p/Dbf-bApnAo5/?img_index=1"));
  assert.ok(urls("kaplica-czaszek-czermna").includes("https://www.instagram.com/p/Dbf9RSWnOB8/?img_index=1"));
  assert.ok(urls("glowny").includes("https://www.facebook.com/share/r/1Kx6Fvn9c2/"));
  assert.ok(urls("zoo-wroclaw").includes("https://www.instagram.com/wroclaw.lowersilesia/p/DcTZronDED-/"));
  assert.ok(urls("pergola").includes("https://www.facebook.com/share/p/1CHRnrqLwQ/"));
  assert.ok(urls("pergola").includes("https://www.instagram.com/p/Dcn4ySrisOr/?img_index=1"));
});

test("all products render plain social anchors without a preview interceptor", () => {
  for (const file of ["map.html", "premium.html", "moshe.html", "lifestyle.html", "excursions.html"]) {
    const html = readFileSync(resolve(root, file), "utf8");
    assert.doesNotMatch(html, /social-preview\.(?:js|css)/, `${file}: no preview assets`);
  }

  for (const file of ["app.js", "premium.js", "lifestyle.js", "excursions.js"]) {
    const script = readFileSync(resolve(root, file), "utf8");
    assert.doesNotMatch(script, /WROC_SOCIAL_PREVIEW|data-social-content-ref/, `${file}: no click interception`);
  }
});
