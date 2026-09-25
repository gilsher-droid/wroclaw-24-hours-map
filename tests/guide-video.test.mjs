import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { resolve } from "node:path";
import { runInNewContext } from "node:vm";

const root = resolve(import.meta.dirname, "..");

test("travel-guide videos are a separate canonical resource selected by site language", () => {
  const window = {};
  const document = { documentElement: { lang: "he" }, body: { insertAdjacentHTML() {} }, addEventListener() {} };
  const context = { window, document, console };
  runInNewContext(readFileSync(resolve(root, "data/place-catalog.js"), "utf8"), context);
  runInNewContext(readFileSync(resolve(root, "guide-video.js"), "utf8"), context);

  const place = window.WROC_CATALOG.getPlace("four-domes");
  assert.equal(place.media.videos.length, 2);
  assert.equal(place.media.guideVideos.he, "/assets/guide-four-domes-he-v2.mp4");
  assert.equal(place.media.guideVideos.en, "/assets/guide-four-domes-en-v2.mp4");
  const hash = (file) => createHash("sha256").update(readFileSync(resolve(root, file.slice(1)))).digest("hex");
  assert.equal(hash(place.media.guideVideos.he), "63273e0a26537d1d35cefe10cf3be15958f290a135f90fa128feecb156178ea7");
  assert.equal(hash(place.media.guideVideos.en), "7a62ce96f903270eb6fe3286b9edbe5be3e08ea612bea905502757e3ead32d31");
  for (const file of Object.values(place.media.guideVideos)) {
    assert.ok(existsSync(resolve(root, file.slice(1))), file);
    assert.ok(!place.media.videos.includes(file), "guide must stay out of ordinary videos");
  }
  for (const language of ["he", "en", "pl", "de", "cs"]) {
    const expected = language === "he" ? place.media.guideVideos.he : place.media.guideVideos.en;
    assert.equal(window.WROC_GUIDE_VIDEO.sourceFor("four-domes", language), expected);
    const button = window.WROC_GUIDE_VIDEO.button("four-domes", language, "resource-icon");
    assert.match(button, /data-guide-video="four-domes"/);
    assert.match(button, /assets\/logo.png/);
    assert.match(button, /resource-icon/);
  }
  assert.equal(window.WROC_GUIDE_VIDEO.button("aleja-bielany", "he"), "");
});

test("all map products load the dedicated travel-guide control and player", () => {
  for (const page of ["map", "premium", "moshe", "lifestyle", "cultural", "excursions"]) {
    const html = readFileSync(resolve(root, `${page}.html`), "utf8");
    assert.match(html, /\/guide-video\.js\?v=/);
    assert.match(html, /\/guide-video\.css\?v=/);
  }
  for (const page of ["app", "premium", "lifestyle", "cultural", "excursions"]) {
    assert.match(readFileSync(resolve(root, `${page}.js`), "utf8"), /WROC_GUIDE_VIDEO\?\.button/);
  }
  assert.ok(existsSync(resolve(root, "dist/client/guide-video.js")));
  assert.ok(existsSync(resolve(root, "dist/client/guide-video.css")));
});
