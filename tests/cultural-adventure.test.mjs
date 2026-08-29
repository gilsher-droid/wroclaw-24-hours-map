import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { runInNewContext } from "node:vm";

const root = resolve(import.meta.dirname, "..");

test("Cultural Adventure reuses canonical Places and keeps area experiences unpinned", () => {
  const window = {};
  const context = { window, console, URLSearchParams };
  runInNewContext(readFileSync(resolve(root, "data/place-catalog.js"), "utf8"), context);
  runInNewContext(readFileSync(resolve(root, "data/cultural-places.js"), "utf8"), context);

  assert.equal(window.WROC_CULTURAL_PLACES.length, 26);
  assert.equal(window.WROC_CULTURAL_EXPERIENCES.length, 1);
  assert.equal(window.WROC_CULTURAL_EXPERIENCES[0].id, "street-art-nadodrze-olbin");
  assert.equal(window.WROC_CULTURAL_EXPERIENCES[0].coordinates, undefined);
  assert.ok(window.WROC_CATALOG.products["cultural-adventure"]);

  for (const record of window.WROC_CULTURAL_PLACES) {
    const place = window.WROC_CATALOG.getPlace(record.canonicalPlaceId);
    assert.ok(place, `missing ${record.canonicalPlaceId}`);
    assert.ok(place.links.website, `${place.id} needs an official website`);
    assert.deepEqual(Object.keys(place.name), ["he", "en", "pl", "de", "cs"]);
    assert.deepEqual(Object.keys(place.description), ["he", "en", "pl", "de", "cs"]);
  }

  assert.notEqual(window.WROC_CATALOG.resolveId("wuwa-estate"), window.WROC_CATALOG.resolveId("wuwa"));
  const wuwaEstate = window.WROC_CATALOG.getPlace("wuwa-estate");
  assert.equal(wuwaEstate.media.photos.length, 10);
  assert.equal(wuwaEstate.media.videos.length, 0);
  assert.deepEqual(Array.from(wuwaEstate.socialPosts, (post) => post.platform), ["facebook"]);
  assert.equal(wuwaEstate.socialPosts[0].url, "https://www.facebook.com/share/p/19G81XL7j2/");
  wuwaEstate.media.photos.forEach((photo) => assert.ok(existsSync(resolve(root, photo.replace(/^\//, ""))), `missing ${photo}`));
  assert.equal(window.WROC_CATALOG.resolveId("galeria-dizajn"), "zyjnia-bwa-wroclaw");
  assert.ok(window.WROC_CATALOG.getPlace("glowny").experiences.some((item) => item.id === "bwa-wroclaw-glowny-gallery"));
});
