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
  const context = { window, document, console, URLSearchParams };
  runInNewContext(readFileSync(resolve(root, "data/place-catalog.js"), "utf8"), context);
  runInNewContext(readFileSync(resolve(root, "guide-video.js"), "utf8"), context);

  const place = window.WROC_CATALOG.getPlace("four-domes");
  assert.equal(place.media.videos.length, 2);
  assert.equal(place.media.guideVideos.he, "https://youtube.com/shorts/cs7AmJhitLo");
  assert.equal(place.media.guideVideos.en, "/assets/guide-four-domes-en-de-cs-pl.mp4");
  for (const url of Object.values(place.media.guideVideos)) {
    assert.ok(!place.media.videos.includes(url), "guide must stay out of ordinary videos");
  }
  for (const language of ["he", "en", "pl", "de", "cs"]) {
    const expected = language === "he" ? place.media.guideVideos.he : place.media.guideVideos.en;
    assert.equal(window.WROC_GUIDE_VIDEO.sourceFor("four-domes", language), expected);
    const button = window.WROC_GUIDE_VIDEO.button("four-domes", language, "resource-icon");
    assert.match(button, /assets\/logo.png/);
    assert.match(button, /resource-icon/);
    if (language === "he") {
      assert.match(button, new RegExp(`href="${expected}"`));
      const embed = window.WROC_GUIDE_VIDEO.embedUrlFor(expected, language);
      assert.match(embed, /youtube-nocookie\.com\/embed\/cs7AmJhitLo/);
      assert.doesNotMatch(embed, /cc_lang_pref/);
    } else {
      assert.match(button, /<button/);
      assert.match(button, /data-guide-video-src="\/assets\/guide-four-domes-en-de-cs-pl\.mp4"/);
      assert.match(button, /DE\/CZ\/PL/);
      assert.equal(window.WROC_GUIDE_VIDEO.embedUrlFor(expected, language), null);
      assert.ok(existsSync(resolve(root, expected.slice(1))));
    }
  }
  assert.equal(window.WROC_GUIDE_VIDEO.button("aleja-bielany", "he"), "");
});

test("Brzeg and Moszna guide clips use their verified place and spoken language", () => {
  const provenance = JSON.parse(readFileSync(resolve(root, "data/brzeg-moszna-guide-video-provenance.json"), "utf8"));
  const youtube = {
    "brzeg-castle": { he: "IYllRzq9VJs", en: "zbpTMh2Fe2c" },
    "brzeg-oder-gate": { he: "hvnoxm3reWo", en: "xs3NY7q0OX4" },
    "moszna-castle": { he: "5ghRWvbwU6Q", en: "UqqWiyXRk00" },
  };
  const window = {};
  const document = { documentElement: { lang: "he" }, addEventListener() {} };
  runInNewContext(readFileSync(resolve(root, "data/place-catalog.js"), "utf8"), { window, console });
  runInNewContext(readFileSync(resolve(root, "guide-video.js"), "utf8"), { window, document, console });
  const places = ["brzeg-castle", "brzeg-oder-gate", "moszna-castle"];
  const assigned = new Set();
  for (const id of places) {
    const place = window.WROC_CATALOG.getPlace(id);
    for (const lang of ["he", "en"]) {
      const url = place.media.guideVideos[lang];
      const asset = `/assets/guide-${id}-${lang}.mp4`;
      assigned.add(asset);
      assert.equal(url, lang === "he" ? `https://youtube.com/shorts/${youtube[id][lang]}` : `/assets/guide-${id}-en-de-cs-pl.mp4`);
      assert.equal(window.WROC_GUIDE_VIDEO.sourceFor(id, lang), url);
      const button = window.WROC_GUIDE_VIDEO.button(id, lang);
      if (lang === "he") assert.match(button, new RegExp(`href="${url}"`));
      else {
        assert.match(button, new RegExp(`data-guide-video-src="${url}"`));
        assert.match(button, /DE\/CZ\/PL/);
        assert.match(button, /<button/);
        assert.ok(existsSync(resolve(root, url.slice(1))));
      }
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
  for (const id of ["four-domes", "brzeg-castle", "brzeg-oder-gate", "moszna-castle"]) {
    assert.ok(existsSync(resolve(root, `dist/client/assets/guide-${id}-en-de-cs-pl.mp4`)));
  }
});


test("every linked non-Hebrew guide has all three subtitle languages and valid cue coverage", () => {
  const window = {};
  runInNewContext(readFileSync(resolve(root, "data/place-catalog.js"), "utf8"), { window, console });
  const additional = JSON.parse(readFileSync(resolve(root, "data/additional-guides-subtitle-provenance.json"), "utf8"));
  const manifests = { ...additional, "four-domes": JSON.parse(readFileSync(resolve(root, "data/four-domes-subtitle-provenance.json"), "utf8")) };
  // Audit all canonical records, so future guides cannot silently omit the subtitle edition.
  const linkedPaths = Object.values(window.WROC_CATALOG.places)
    .filter((place) => place.media?.guideVideos?.en)
    .map((place) => place.media.guideVideos.en);
  assert.equal(linkedPaths.length, Object.keys(manifests).length);
  for (const [id, manifest] of Object.entries(manifests)) {
    const place = window.WROC_CATALOG.getPlace(id);
    assert.equal(place.media.guideVideos.en, manifest.asset);
    assert.ok(linkedPaths.includes(manifest.asset));
    assert.deepEqual(manifest.burnedSubtitleLanguages, ["de", "cs", "pl"]);
    assert.equal(createHash("sha256").update(readFileSync(resolve(root, manifest.asset.slice(1)))).digest("hex"), manifest.outputSHA256);
    assert.ok(manifest.playerControlsSafeAreaHeight >= 160);
    let previousEnd = 0;
    for (const [start, end, translations] of manifest.cues) {
      assert.ok(start >= previousEnd && end > start && end <= manifest.durationSeconds);
      assert.equal(translations.length, 3);
      assert.ok(translations.every((text) => typeof text === "string" && text.trim()));
      previousEnd = end;
    }
  }
});
