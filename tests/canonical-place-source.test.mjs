import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { runInNewContext } from "node:vm";

const root = resolve(import.meta.dirname, "..");

function loadCatalog(file) {
  const window = {};
  runInNewContext(readFileSync(file, "utf8"), { window, console });
  return window.WROC_CATALOG;
}

function registeredProduct(catalogFile, productFile, productId, extraLanguages = false) {
  const window = {};
  const context = { window, console };
  if (extraLanguages) runInNewContext(readFileSync(resolve(root, "data/extra-languages.js"), "utf8"), context);
  runInNewContext(readFileSync(catalogFile, "utf8"), context);
  runInNewContext(readFileSync(resolve(root, productFile), "utf8"), context);
  return JSON.stringify(window.WROC_CATALOG.products[productId]);
}

test("an independent Lower Silesia place is supported without changing current places or products", () => {
  const temporary = mkdtempSync(resolve(tmpdir(), "wroc-canonical-source-"));
  const sourceFile = resolve(temporary, "canonical-source.js");
  const outputFile = resolve(temporary, "place-catalog.js");
  const fixtureId = "lower-silesia-independent-test-place";
  const photo = "/assets/test-independent-place.jpg";
  const video = "/assets/test-independent-place.mp4";

  writeFileSync(sourceFile, `window.WROC_CANONICAL_PLACE_SOURCE = [{
    id: ${JSON.stringify(fixtureId)},
    aliases: ["independent-test-alias"],
    localName: "Miejsce testowe",
    name: { he: "מקום בדיקה", en: "Test place", pl: "Miejsce testowe", de: "Testort", cs: "Testovací místo" },
    description: { he: "תיאור", en: "Description", pl: "Opis", de: "Beschreibung", cs: "Popis" },
    location: {
      countryCode: "PL", regionId: "lower-silesia", cityId: "swidnica",
      coordinates: { lat: 50.842, lng: 16.49 },
      address: { street: "Testowa 1", postalCode: "58-100", city: "Świdnica", country: "Poland" }
    },
    categories: ["historical-landmark"],
    experiences: [{ id: "interior", accessibility: { level: "partial", notes: { en: "Stairs" } } }],
    provenance: { contentType: "personal-visit", originalContent: true, originalPhotography: true },
    media: {
      photos: [${JSON.stringify(photo)}], videos: [${JSON.stringify(video)}],
      metadata: { ${JSON.stringify(photo)}: { tags: ["architecture"], original: true } }
    }
  }];\n`);

  try {
    const result = spawnSync(process.execPath, [resolve(root, "tools/generate-place-catalog.mjs")], {
      cwd: root,
      encoding: "utf8",
      env: {
        ...process.env,
        WROC_CANONICAL_PLACE_SOURCE_FILE: sourceFile,
        WROC_PLACE_CATALOG_OUTPUT_FILE: outputFile,
      },
    });
    assert.equal(result.status, 0, result.stderr || result.stdout);

    const baselineFile = resolve(root, "data/place-catalog.js");
    const baseline = loadCatalog(baselineFile);
    const candidate = loadCatalog(outputFile);
    assert.equal(Object.keys(baseline.places).length, 84);
    assert.equal(Object.keys(candidate.places).length, 85);
    assert.equal(baseline.coordinateConflicts.length, 27);
    assert.equal(JSON.stringify(candidate.coordinateConflicts), JSON.stringify(baseline.coordinateConflicts));

    for (const [id, place] of Object.entries(baseline.places)) {
      assert.equal(JSON.stringify(candidate.places[id]), JSON.stringify(place), `${id} changed after adding an independent place`);
    }

    const independent = candidate.getPlace(fixtureId);
    assert.equal(independent.location.cityId, "swidnica");
    assert.equal(independent.location.address.city, "Świdnica");
    assert.equal(independent.sourceRecords.length, 0);
    assert.equal(candidate.resolveId("independent-test-alias"), fixtureId);
    assert.deepEqual(Array.from(independent.media.photos), [photo]);
    assert.deepEqual(Array.from(independent.media.videos), [video]);
    assert.equal(independent.media.metadata[photo].original, true);
    assert.equal(independent.experiences[0].accessibility.level, "partial");
    assert.equal(independent.provenance.originalPhotography, true);

    for (const scenario of [
      ["wroclaw-24-hours", "data/locations.js", true],
      ["wroclaw-four-days", "data/premium-route.js", true],
      ["wroclaw-christmas", "data/moshe-route.js", true],
      ["lifestyle-guide", "data/lifestyle-places.js", false],
    ]) {
      const [productId, productFile, extraLanguages] = scenario;
      assert.equal(
        registeredProduct(outputFile, productFile, productId, extraLanguages),
        registeredProduct(baselineFile, productFile, productId, extraLanguages),
        `${productId} changed after adding an independent place`,
      );
    }
  } finally {
    rmSync(temporary, { recursive: true, force: true });
  }
});
