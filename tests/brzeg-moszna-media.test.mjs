import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createHash } from "node:crypto";
import { runInNewContext } from "node:vm";

const root = resolve(import.meta.dirname, "..");

function sourceContext() {
  const provenance = JSON.parse(readFileSync(resolve(root, "data/brzeg-moszna-media-provenance.json"), "utf8"));
  const enrichment = JSON.parse(readFileSync(resolve(root, "data/brzeg-photo-enrichment-provenance.json"), "utf8"));
  const moszna = JSON.parse(readFileSync(resolve(root, "data/moszna-photo-enrichment-provenance.json"), "utf8"));
  const newFull = JSON.parse(readFileSync(resolve(root, "data/brzeg-moszna-distinct18-oct24-preservation.json"))).photoAdditions.map(p=>({...p,...p.metadata}));
  const restored = JSON.parse(readFileSync(resolve(root, "data/regional-full-source-restoration-oct24-preservation.json"))).photos.filter(p=>p.canonicalId.startsWith("brzeg-")).concat(newFull);
  for(const p of restored)provenance[p.asset]=p.sourcePath;
  const restoredByAsset = new Map(restored.map(p=>[p.asset,p]));
  const optimized = new Map([...enrichment.assets, ...moszna.assets,...restored.map(p=>({...p,placeId:p.canonicalId}))].map(item => [item.asset, item]));
  const window = {};
  runInNewContext(readFileSync(resolve(root, "data/place-catalog.js"), "utf8"), { window, console });
  return {provenance, optimized, restoredByAsset, window};
}

test("Brzeg and Moszna repository assets retain approved provenance, ownership and immutable recorded hashes", () => {
  const {provenance, optimized, restoredByAsset, window} = sourceContext();
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
      if(restoredByAsset.has(asset))assert.equal(place.media.metadata[asset].sourceFile,restoredByAsset.get(asset).sourcePath);else assert.match(place.media.metadata[asset].sourceFile.toLowerCase(), optimized.has(asset) ? /^(brzeg|moszna castle)\// : /\/forcodex\//);
      if (optimized.has(asset)) {
        const record = optimized.get(asset);
        assert.equal(record.placeId, id);
        assert.equal(createHash("sha256").update(readFileSync(resolve(root, asset.slice(1)))).digest("hex"), record.assetSHA256);
      }

    }
  }
  assert.deepEqual([...used].sort(), Object.keys(provenance).sort());
});

// Desktop originals are external to the repository and absent in CI. Their
// availability must never turn a repository-asset check into an apparent source
// verification. Unreadable originals are reported as an explicit skipped check.
test("Available Brzeg and Moszna Desktop originals match their recorded source hashes", t => {
  const {provenance, optimized} = sourceContext();
  const digest = data => createHash("sha256").update(data).digest("hex");
  let checked = 0;
  const absent = [], blocked = [];
  for (const [asset, source] of Object.entries(provenance)) {
    let original;
    try {
      original = readFileSync(source);
    } catch (error) {
      if (error.code === "ENOENT" || error.code === "ENOTDIR") { absent.push(source); continue; }
      if (error.code === "EPERM" || error.code === "EACCES") { blocked.push({source, code:error.code}); continue; }
      throw error;
    }
    const record = optimized.get(asset);
    const assetHash = digest(readFileSync(resolve(root, asset.slice(1))));
    if (record) {
      assert.equal(digest(original), record.sourceSHA256, `changed original ${asset}`);
      assert.equal(assetHash, record.assetSHA256, `changed optimized photo ${asset}`);
    } else {
      assert.equal(assetHash, digest(original), `modified source copy ${asset}`);
    }
    checked++;
  }
  t.diagnostic(JSON.stringify({checked, absent:absent.length, blocked:blocked.length, blockedExamples:blocked.slice(0,3)}));
  if (blocked.length) {
    t.skip(`BLOCKED: ${blocked.length} Desktop original reads denied; source integrity for those originals is unverified. Repository hashes are checked separately.`);
  } else if (!checked) {
    t.skip("Desktop originals are not present, as expected in CI; this is not a source-file verification pass.");
  }
});
