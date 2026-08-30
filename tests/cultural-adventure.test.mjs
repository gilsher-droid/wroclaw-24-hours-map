import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { runInNewContext } from "node:vm";

const root = resolve(import.meta.dirname, "..");

test("Cultural Adventure reuses canonical Places and gives street art two area pins", () => {
  const window = {};
  const context = { window, console, URLSearchParams };
  runInNewContext(readFileSync(resolve(root, "data/place-catalog.js"), "utf8"), context);
  runInNewContext(readFileSync(resolve(root, "data/cultural-places.js"), "utf8"), context);

  assert.equal(window.WROC_CULTURAL_PLACES.length, 26);
  assert.equal(window.WROC_CULTURAL_EXPERIENCES.length, 1);
  assert.equal(window.WROC_CULTURAL_EXPERIENCES[0].id, "street-art-nadodrze-olbin");
  assert.equal(window.WROC_CULTURAL_EXPERIENCES[0].coordinates, undefined);
  assert.deepEqual(
    Array.from(window.WROC_CULTURAL_EXPERIENCES[0].mapPoints, ({ label }) => label),
    ["Nadodrze", "Ołbin"],
  );
  assert.equal(window.WROC_CULTURAL_EXPERIENCES[0].mapPoints.length, 2);
  assert.ok(window.WROC_CATALOG.products["cultural-adventure"]);
  assert.equal(
    window.WROC_CATALOG.getPlace("old-jewish-cemetery-wroclaw").links.website,
    "https://muzeum.miejskie.wroclaw.pl/museum/sztuki-cmentarnej/",
  );
  assert.deepEqual(Array.from(window.WROC_CATALOG.getPlace("old-jewish-cemetery-wroclaw").socialPosts), []);

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
  assert.deepEqual(Array.from(wuwaEstate.socialPosts, (post) => post.platform), ["facebook", "instagram"]);
  assert.equal(wuwaEstate.socialPosts[0].url, "https://www.facebook.com/share/p/19G81XL7j2/");
  assert.equal(wuwaEstate.socialPosts[1].url, "https://www.instagram.com/p/Dcq_ageDDb4/?img_index=1");
  wuwaEstate.media.photos.forEach((photo) => assert.ok(existsSync(resolve(root, photo.replace(/^\//, ""))), `missing ${photo}`));
  const aula = window.WROC_CATALOG.getPlace("aula");
  assert.equal(aula.media.photos.length, 8);
  for (const photo of ["/assets/aula-leopoldina-01.jpg", "/assets/aula-leopoldina-02.jpg", "/assets/aula-leopoldina-03.jpg"]) {
    assert.ok(aula.media.photos.includes(photo), `Aula gallery missing ${photo}`);
    assert.ok(existsSync(resolve(root, photo.replace(/^\//, ""))), `missing ${photo}`);
  }
  const opera = window.WROC_CATALOG.getPlace("opera");
  assert.deepEqual(Array.from(opera.media.photos), ["/assets/gallery-opera-05.jpg", "/assets/gallery-opera-06.jpg"]);
  const nfm = window.WROC_CATALOG.getPlace("nfm");
  assert.deepEqual(Array.from(nfm.socialPosts, (post) => [post.platform, post.url]), [
    ["facebook", "https://www.facebook.com/share/p/1C4YQxxtU1/"],
    ["instagram", "https://www.instagram.com/p/DcrATSoDN-C/?img_index=1"],
  ]);
  const fourDomes = window.WROC_CATALOG.getPlace("four-domes");
  assert.deepEqual(Array.from(fourDomes.media.photos), ["/assets/four-domes-pavilion-01.jpg"]);
  assert.ok(existsSync(resolve(root, "assets/four-domes-pavilion-01.jpg")));
  assert.deepEqual(Array.from(fourDomes.socialPosts, (post) => post.platform), ["facebook", "instagram"]);
  assert.deepEqual(Array.from(fourDomes.socialPosts, (post) => post.url), [
    "https://www.facebook.com/share/p/1CAQHdKSat/",
    "https://www.instagram.com/p/DcqyG24DMHg/",
  ]);
  assert.equal(window.WROC_CATALOG.resolveId("galeria-dizajn"), "zyjnia-bwa-wroclaw");
  assert.ok(window.WROC_CATALOG.getPlace("glowny").experiences.some((item) => item.id === "bwa-wroclaw-glowny-gallery"));
});
