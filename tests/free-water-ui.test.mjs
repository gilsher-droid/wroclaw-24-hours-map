import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";
import { runInNewContext } from "node:vm";

const root = resolve(import.meta.dirname, "..");
const read = (file) => readFileSync(resolve(root, file), "utf8");

function loadAmenities() {
  const window = {};
  const context = { window };
  runInNewContext(read("data/place-catalog.js"), context);
  runInNewContext(read("data/place-amenities.js"), context);
  return window;
}

test("global amenity UI is driven only by canonical freeTapWater metadata", () => {
  const { WROC_CATALOG: catalog, WROC_PLACE_AMENITIES: amenities } = loadAmenities();
  const hospitality = catalog.getPlace("bernard-bistro-wino");
  const ordinaryPlace = catalog.getPlace("altus");
  const refillPoint = catalog.getPlace("water-refill-plac-solny");

  assert.match(amenities.markerBadgeHtml(hospitality, "en"), /free-water-marker-badge[^>]*[\s\S]*💧/);
  assert.match(amenities.labelBadgeHtml(hospitality, "pl"), /💧[\s\S]*Darmowa woda/);
  assert.equal(amenities.markerBadgeHtml(ordinaryPlace, "en"), "");
  assert.equal(amenities.labelBadgeHtml(ordinaryPlace, "en"), "");
  assert.equal(amenities.markerBadgeHtml(refillPoint, "en"), "");

  const firstProductRecord = { canonicalPlaceId: hospitality.id, canonicalPlace: hospitality };
  const secondProductRecord = { id: "another-product-record", canonicalPlaceId: hospitality.id };
  assert.equal(amenities.hasFreeTapWater(firstProductRecord), true);
  assert.equal(amenities.hasFreeTapWater(secondProductRecord), true);
});

test("all map renderers retain their normal marker identity and append the shared badge", () => {
  const renderers = {
    "app.js": /<span>\$\{label\}<\/span>\$\{placeAmenities\.markerBadgeHtml\(location, currentLanguage\)\}/,
    "premium.js": /<span>\$\{item\.order\}<\/span>\$\{placeAmenities\.markerBadgeHtml\(item, language\)\}/,
    "lifestyle.js": /\$\{categorySymbols\[category\]\}<\/span>\$\{placeAmenities\.markerBadgeHtml\(place, language\)\}/,
    "excursions.js": /<span>\$\{index \+ 1\}<\/span>\$\{placeAmenities\.markerBadgeHtml\(canonical, language\)\}/,
  };

  for (const [file, markerPattern] of Object.entries(renderers)) {
    const source = read(file);
    assert.match(source, markerPattern, `${file} must preserve its normal marker content before the badge`);
    assert.match(source, /placeAmenities\.labelBadgeHtml/, `${file} must expose the localized label in place UI`);
  }
});

test("every current map product loads the shared amenity UI after the canonical catalog", () => {
  for (const file of ["map.html", "premium.html", "moshe.html", "lifestyle.html", "excursions.html"]) {
    const html = read(file);
    const catalogIndex = html.indexOf("/data/place-catalog.js");
    const amenitiesIndex = html.indexOf("/data/place-amenities.js");
    assert.ok(catalogIndex >= 0 && amenitiesIndex > catalogIndex, `${file} load order`);
    assert.match(html, /place-amenities\.css/);
  }
});
