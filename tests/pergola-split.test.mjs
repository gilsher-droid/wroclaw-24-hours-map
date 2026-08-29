import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";
import { runInNewContext } from "node:vm";

const root = resolve(import.meta.dirname, "..");

test("Pergola and Multimedia Fountain remain independent canonical places", () => {
  const window = {};
  const context = { window, console };
  for (const file of ["data/extra-languages.js", "data/place-catalog.js", "data/premium-route.js", "data/location-media.js"]) {
    runInNewContext(readFileSync(resolve(root, file), "utf8"), context, { filename: file });
  }

  const pergola = window.WROC_CATALOG.getPlace("pergola");
  const fountain = window.WROC_CATALOG.getPlace("fountain");
  assert.ok(pergola);
  assert.ok(fountain);
  assert.notEqual(pergola.id, fountain.id);
  assert.equal(window.WROC_CATALOG.resolveId("pergola-wroclawska"), "pergola");
  assert.equal(window.WROC_CATALOG.resolveId("multimedia-fountain"), "fountain");

  assert.deepEqual(Array.from(pergola.media.photos), [
    "/assets/pergola-wroclawska-01.jpg",
    "/assets/pergola-wroclawska-02.jpg",
    "/assets/pergola-wroclawska-03.jpg",
  ]);
  pergola.media.photos.forEach((asset) => assert.ok(existsSync(resolve(root, asset.slice(1))), asset));
  assert.equal(pergola.media.videos.length, 0);
  assert.equal(pergola.socialPosts.find((post) => post.platform === "facebook")?.url, "https://www.facebook.com/share/p/1CHRnrqLwQ/");
  assert.equal(pergola.socialPosts.find((post) => post.platform === "instagram")?.url, "https://www.instagram.com/p/Dcn4ySrisOr/?img_index=1");
  assert.equal(fountain.socialPosts.length, 0);
  assert.ok(fountain.media.videos.some((video) => video.src === "/assets/video-stulecia-fountain.mp4"));

  const dayThree = window.PREMIUM_STOPS.filter((stop) => stop.day === 3);
  const pergolaStop = dayThree.find((stop) => stop.id === "pergola");
  const fountainStop = dayThree.find((stop) => stop.id === "fountain");
  assert.equal(pergolaStop?.canonicalPlaceId, "pergola");
  assert.equal(fountainStop?.canonicalPlaceId, "fountain");
  assert.equal(pergolaStop.order, 7);
  assert.equal(fountainStop.order, 8);

  const resources = window.WROC_LOCATION_MEDIA.pergola;
  assert.deepEqual(Array.from(resources.gallery), Array.from(pergola.media.photos));
  assert.equal(resources.facebook, "https://www.facebook.com/share/p/1CHRnrqLwQ/");
  assert.equal(resources.instagram, "https://www.instagram.com/p/Dcn4ySrisOr/?img_index=1");
});
