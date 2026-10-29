import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";

test("Verified visit fallback links are localized and render only for the intended cultural places", () => {
  const window = {};
  runInNewContext(readFileSync("youtube-video.js", "utf8"), { window });
  const player = window.WROC_YOUTUBE_VIDEO;
  const source = readFileSync("cultural.js", "utf8");
  const openMedia = source.slice(source.indexOf("function openMedia("), source.indexOf("function closeMedia("));
  const labels = { he: "צפייה ביוטיוב", en: "Watch on YouTube", pl: "Obejrzyj w YouTube", de: "Auf YouTube ansehen", cs: "Přehrát na YouTube" };
  for (const [language, label] of Object.entries(labels)) {
    for (const [id, video, linked] of [
      ["nfm", "https://www.youtube.com/watch?v=_Dez_yfkVVQ", true],
      ["kepa-mieszczanska-wroclaw", "https://www.youtube.com/watch?v=8LYxTYkEqDo", true],
      ["unrelated-place", "https://www.youtube.com/watch?v=8LYxTYkEqDo", false],
      ["kepa-mieszczanska-wroclaw", "pending.mp4", false],
    ]) {
      const nodes = {
        "media-modal": { hidden: true, setAttribute(key, value) { this[key] = value; } },
        "media-content": { innerHTML: "" },
        "media-title": { textContent: "" },
      };
      const context = {
        window, language, places: [{ id }], experiences: [],
        canonical: () => ({ media: { videos: [video] } }),
        name: () => "Visit", local: value => value, esc: value => value,
        document: { getElementById: id => nodes[id], body: { style: {} } },
      };
      runInNewContext(`${openMedia}\nopenMedia(${JSON.stringify(id)}, "video");`, context);
      const html = nodes["media-content"].innerHTML;
      assert.equal(nodes["media-modal"].hidden, false);
      assert.equal(nodes["media-modal"]["aria-hidden"], "false");
      assert.equal(html.includes('class="video-watch-link"'), linked, `${id}/${language}`);
      if (linked) {
        assert.ok(html.includes(label));
        assert.ok(html.includes(`href="${video}"`));
        assert.match(html, /target="_blank" rel="noopener noreferrer"/);
        assert.ok(html.includes(player.embed(video)));
      }
      if (video === "pending.mp4") {
        assert.ok(!html.includes("<iframe"));
        assert.ok(html.includes('role="status"'));
      }
    }
    assert.equal(player.watchLink("pending.mp4", language), "");
  }
  const experiences = readFileSync("experiences.js", "utf8");
  for (const id of ["8_6jLl31M0s", "AmOhNKFSpsw"]) assert.ok(experiences.includes(id));
});
