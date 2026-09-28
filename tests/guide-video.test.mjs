import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { runInNewContext } from "node:vm";
import { createHash } from "node:crypto";

const root = resolve(import.meta.dirname, "..");

test("travel-guide videos are a separate canonical resource selected by site language", () => {
  const window = {};
  const document = { documentElement: { lang: "he" }, body: { insertAdjacentHTML() {} }, addEventListener() {} };
  const context = { window, document, console };
  runInNewContext(readFileSync(resolve(root, "data/place-catalog.js"), "utf8"), context);
  runInNewContext(readFileSync(resolve(root, "guide-video.js"), "utf8"), context);

  const place = window.WROC_CATALOG.getPlace("four-domes");
  assert.equal(place.media.videos.length, 2);
  assert.equal(place.media.guideVideos.he, "https://youtube.com/shorts/cs7AmJhitLo");
  assert.equal(place.media.guideVideos.en, "https://youtube.com/shorts/Ud5KD21e5kE");
  for (const url of Object.values(place.media.guideVideos)) {
    assert.ok(!place.media.videos.includes(url), "guide must stay out of ordinary videos");
  }
  for (const language of ["he", "en", "pl", "de", "cs"]) {
    const expected = language === "he" ? place.media.guideVideos.he : place.media.guideVideos.en;
    assert.equal(window.WROC_GUIDE_VIDEO.sourceFor("four-domes", language), expected);
    const button = window.WROC_GUIDE_VIDEO.button("four-domes", language, "resource-icon");
    assert.match(button, new RegExp(`href="${expected}"`));
    assert.match(button, /target="_blank" rel="noopener noreferrer"/);
    assert.match(button, /assets\/logo.png/);
    assert.match(button, /resource-icon/);
  }
  assert.equal(window.WROC_GUIDE_VIDEO.button("aleja-bielany", "he"), "");
});

test("Brzeg and Moszna guide clips use their verified place and spoken language", () => {
  const provenance = JSON.parse(readFileSync(resolve(root, "data/brzeg-moszna-guide-video-provenance.json"), "utf8"));
  const window = {};
  const document = { documentElement: { lang: "he" }, addEventListener() {} };
  runInNewContext(readFileSync(resolve(root, "data/place-catalog.js"), "utf8"), { window, console });
  runInNewContext(readFileSync(resolve(root, "guide-video.js"), "utf8"), { window, document, console });
  const places = ["brzeg-castle", "brzeg-oder-gate", "moszna-castle"];
  const assigned = new Set();
  for (const id of places) {
    const place = window.WROC_CATALOG.getPlace(id);
    for (const lang of ["he", "en"]) {
      const asset = place.media.guideVideos[lang];
      assigned.add(asset);
      assert.match(asset, new RegExp(`^/assets/guide-${id}-${lang}\\.mp4$`));
      assert.equal(window.WROC_GUIDE_VIDEO.sourceFor(id, lang), asset);
      assert.match(window.WROC_GUIDE_VIDEO.button(id, lang), /data-guide-video-src=/);
      assert.ok(existsSync(resolve(root, asset.slice(1))));
      const source = provenance[asset];
      assert.ok(source, `missing approved source for ${asset}`);
      assert.match(source.toLowerCase(), id.startsWith("moszna-") ? /\/moszna castle\/tlourguide\// : /\/brzeg\/tourguide\//);
      if (existsSync(source)) {
        const digest = (file) => createHash("sha256").update(readFileSync(file)).digest("hex");
        assert.equal(digest(resolve(root, asset.slice(1))), digest(source));
      }
    }
    for (const lang of ["pl", "de", "cs"]) {
      assert.equal(window.WROC_GUIDE_VIDEO.sourceFor(id, lang), place.media.guideVideos.en);
    }
  }
  assert.deepEqual([...assigned].sort(), Object.keys(provenance).sort());
  assert.equal(window.WROC_GUIDE_VIDEO.button("brzeg-town-hall", "he"), "");
  assert.equal(window.WROC_GUIDE_VIDEO.button("moszna-castle-park", "en"), "");
});

test("all map products load the dedicated travel-guide link", () => {
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
  assert.ok(!existsSync(resolve(root, "dist/client/assets/guide-four-domes-he-v2.mp4")));
  assert.ok(!existsSync(resolve(root, "dist/client/assets/guide-four-domes-en-v2.mp4")));
});
