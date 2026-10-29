import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";
import { runInNewContext } from "node:vm";

const root = resolve(import.meta.dirname, "..");

function loadSiteData() {
  const window = { document: { documentElement: { lang: "he" } } };
  const context = { window, console };
  runInNewContext(readFileSync(resolve(root, "data/place-catalog.js"), "utf8"), context);
  runInNewContext(readFileSync(resolve(root, "data/lower-silesia-excursions.js"), "utf8"), context);
  return window;
}

test("Świdnica Market Square is a complete canonical excursion place", () => {
  const window = loadSiteData();
  const place = window.WROC_CATALOG.getPlace("swidnica-market-square");

  assert.ok(place);
  assert.equal(place.location.cityId, "swidnica");
  assert.deepEqual(
    JSON.parse(JSON.stringify(place.location.coordinates)),
    { lat: 50.8422, lng: 16.4877 },
  );
  assert.deepEqual(Object.keys(place.name).sort(), ["cs", "de", "en", "he", "pl"]);
  assert.deepEqual(Object.keys(place.description).sort(), ["cs", "de", "en", "he", "pl"]);
  assert.equal(place.media.photos.length, 11);
  assert.equal(place.media.videos.length, 0);
  assert.ok(place.links.navigation.googleMaps);
  assert.ok(place.links.navigation.appleMaps);
  assert.equal(place.links.website, null);
  assert.ok(place.provenance.factualSources.some((source) => source.url.includes("um.swidnica.pl")));

  for (const photo of place.media.photos) {
    const metadata = place.media.metadata[photo];
    const asset = readFileSync(resolve(root, photo.slice(1)));
    const sha256 = createHash("sha256").update(asset).digest("hex");
    assert.equal(metadata.assetSHA256, sha256, `${photo} must match its source hash`);
    assert.equal(metadata.originalFullPicturePreserved, true);
    if(metadata.specificPersonalApproval)assert.equal(metadata.sourceSHA256,"36d446fdd7ec1bd81af960a10175f2871c1b7e229e398eb0d6d6a182e804658c");
    assert.ok(metadata.alt.he);
    assert.ok(metadata.alt.en);
  }

  const excluded = place.provenance.excludedSourceFiles.map((item) => item.file);
  assert.ok(!excluded.includes("0FEB3F35-5617-414B-8E30-89A96D53B2CF.JPG"));
  assert.ok(excluded.includes("IMG_2796.JPG"));
  assert.ok(excluded.includes("IMG_2798.JPG"));
  assert.ok(excluded.includes("IMG_2799.JPG"));
});

test("the market square follows the Church of Peace in the Książ–Świdnica route", () => {
  const window = loadSiteData();
  const excursion = window.WROC_LOWER_SILESIA_EXCURSIONS.excursions.find(
    (item) => item.id === "ksiaz-swidnica-day-trip",
  );

  assert.ok(excursion);
  const routeIds = excursion.routePoints.map((item) => item.canonicalPlaceId).filter(Boolean);
  const churchRouteIndex = routeIds.indexOf("church-of-peace-swidnica");
  const marketRouteIndex = routeIds.indexOf("swidnica-market-square");
  assert.equal(marketRouteIndex, churchRouteIndex + 1);

  const stepIds = excursion.steps.map((item) => item.canonicalPlaceId).filter(Boolean);
  const churchStepIndex = stepIds.indexOf("church-of-peace-swidnica");
  const marketStepIndex = stepIds.indexOf("swidnica-market-square");
  assert.equal(marketStepIndex, churchStepIndex + 1);
  assert.equal(excursion.routePoints.find((item) => item.canonicalPlaceId === "swidnica-market-square").kind, "place");
});
