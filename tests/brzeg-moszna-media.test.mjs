import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createHash } from "node:crypto";
import { runInNewContext } from "node:vm";

const root = resolve(import.meta.dirname, "..");

test("every new Brzeg and Moszna media asset has an approved source", () => {
  const provenance = JSON.parse(readFileSync(resolve(root, "data/brzeg-moszna-media-provenance.json"), "utf8"));
  const enrichment = JSON.parse(readFileSync(resolve(root, "data/brzeg-photo-enrichment-provenance.json"), "utf8"));
  const moszna = JSON.parse(readFileSync(resolve(root, "data/moszna-photo-enrichment-provenance.json"), "utf8"));
  const optimized = new Map([...enrichment.assets, ...moszna.assets].map(item => [item.asset, item]));
  const window = {};
  runInNewContext(readFileSync(resolve(root, "data/place-catalog.js"), "utf8"), { window, console });
  const used = new Set();
  for (const id of ["brzeg-castle", "brzeg-holy-cross-church", "brzeg-town-hall", "brzeg-oder-gate", "moszna-castle", "moszna-castle-park"]) {
    const place = window.WROC_CATALOG.getPlace(id);
    assert.ok(place, `missing place ${id}`);
    for (const asset of [...place.media.photos, ...place.media.videos]) {
      used.add(asset);
      assert.ok(provenance[asset], `missing provenance for ${asset}`);
      const expectedFolder = id.startsWith("brzeg-") ? (optimized.has(asset) ? "/brzeg/" : "/brzeg/forcodex/") : (optimized.has(asset) ? "/moszna castle/" : "/moszna castle/forcodex/");
      assert.ok(provenance[asset].toLowerCase().includes(expectedFolder), `wrong source folder for ${asset}`);
      assert.ok(existsSync(resolve(root, asset.slice(1))), `missing asset ${asset}`);
      assert.match(place.media.metadata[asset].sourceFile.toLowerCase(), optimized.has(asset) ? /^(brzeg|moszna castle)\// : /\/forcodex\//);
      if (optimized.has(asset)) {
        const record = optimized.get(asset);
        assert.equal(record.placeId, id);
        assert.equal(createHash("sha256").update(readFileSync(resolve(root, asset.slice(1)))).digest("hex"), record.assetSHA256);
      }
      if (existsSync(provenance[asset])) {
        const digest = (path) => createHash("sha256").update(readFileSync(path)).digest("hex");
        const record = optimized.get(asset);
        if (record) {
          assert.equal(record.placeId, id, `wrong owner ${asset}`);
          assert.equal(digest(provenance[asset]), record.sourceSHA256, `changed original ${asset}`);
          assert.equal(digest(resolve(root, asset.slice(1))), record.assetSHA256, `changed optimized photo ${asset}`);
        } else {
          assert.equal(digest(resolve(root, asset.slice(1))), digest(provenance[asset]), `modified source copy ${asset}`);
        }
      }
    }
  }
  assert.deepEqual([...used].sort(), Object.keys(provenance).sort());
});
