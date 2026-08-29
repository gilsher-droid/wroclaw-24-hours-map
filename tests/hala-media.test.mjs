import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";
import { runInNewContext } from "node:vm";

const root = resolve(import.meta.dirname, "..");

test("Centennial Hall exposes its expanded canonical media everywhere", () => {
  const window = {};
  const context = { window, console };
  for (const file of ["data/extra-languages.js", "data/place-catalog.js", "data/premium-route.js", "data/location-media.js"]) {
    runInNewContext(readFileSync(resolve(root, file), "utf8"), context, { filename: file });
  }

  const place = window.WROC_CATALOG.getPlace("hala");
  assert.ok(place);
  assert.equal(place.media.photos.length, 8);
  assert.equal(place.media.videos.length, 2);
  assert.equal(place.media.photos[0], "/assets/hala-stulecia-01.jpg");
  assert.equal(place.media.metadata[place.media.photos[0]].sourceFile, "IMG_5063.JPG");
  assert.equal(place.media.metadata[place.media.photos[0]].heroCandidate, true);
  assert.equal(place.media.videos[0], "/assets/hala-stulecia-visit.mp4");
  assert.equal(place.media.metadata[place.media.videos[0]].sourceFile, "IMG_5061.MOV");
  [...place.media.photos, ...place.media.videos].forEach((asset) => {
    assert.ok(existsSync(resolve(root, asset.slice(1))), `missing Hala asset ${asset}`);
  });

  const stop = window.PREMIUM_STOPS.find((item) => item.id === "hala");
  assert.equal(stop?.canonicalPlaceId, "hala");
  const resources = window.WROC_LOCATION_MEDIA.hala;
  assert.deepEqual(Array.from(resources.gallery), Array.from(place.media.photos));
  assert.deepEqual(Array.from(resources.videos, (video) => video.src), Array.from(place.media.videos));
  assert.equal(resources.facebook, place.socialPosts.find((post) => post.platform === "facebook")?.url);
  assert.equal(resources.instagram, place.socialPosts.find((post) => post.platform === "instagram")?.url);
});
