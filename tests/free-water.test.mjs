import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";
import { runInNewContext } from "node:vm";

const root = resolve(import.meta.dirname, "..");

function loadGlobals(files) {
  const window = {};
  const context = { window, console };
  for (const file of files) runInNewContext(readFileSync(resolve(root, file), "utf8"), context);
  return window;
}

test("free-water catalog records are additive, scoped and preserve identity", () => {
  const { WROC_CATALOG: catalog } = loadGlobals(["data/place-catalog.js"]);
  const hospitality = catalog.queryIndependentPlaces({ cityId: "wroclaw", amenity: "freeTapWater" });
  const refillPoints = catalog.queryIndependentPlaces({ cityId: "wroclaw", placeType: "waterRefillPoint" });

  assert.equal(hospitality.length, 24);
  assert.equal(refillPoints.length, 15);
  assert.equal(new Set(Object.keys(catalog.places)).size, 130);

  const wierzbowa = catalog.getPlace("wierzbowa-15");
  assert.equal(wierzbowa.id, "wierzbowa-15");
  assert.equal(wierzbowa.location.coordinates.lat, 51.1049625);
  assert.equal(wierzbowa.location.coordinates.lng, 17.0364118);
  assert.equal(wierzbowa.amenities.freeTapWater, true);
  assert.equal(catalog.getPlace("altus").amenities?.freeTapWater, undefined);

  const woda = catalog.getPlace("woda-cafe");
  assert.equal(woda.location.coordinates.lat, 51.1034555);
  assert.equal(woda.location.coordinates.lng, 17.0572822);
  assert.equal(catalog.getPlace("hydropolis").amenities?.freeTapWater, undefined);

  const airport = catalog.getPlace("water-refill-wroclaw-airport");
  assert.equal(airport.availability.seasonal, false);
  assert.equal(airport.amenities.potableWater, true);
  assert.equal(airport.amenities.bottleRefill, true);
  assert.equal("petBowl" in airport.amenities, false);
  assert.match(airport.description.en, /three year-round drinking-water devices/);

  for (const point of refillPoints.filter((place) => place.id !== airport.id)) {
    assert.equal(point.availability.seasonal, true);
    assert.equal(point.amenities.petBowl, true);
  }
});

test("Free Water composes a scoped overlay without changing Lifestyle membership", () => {
  const window = loadGlobals(["data/place-catalog.js", "data/lifestyle-places.js", "data/place-filters.js"]);
  const catalog = window.WROC_CATALOG;
  const filters = window.WROC_PLACE_FILTERS;
  const originalPlaces = window.WROC_LIFESTYLE_PLACES;
  const originalIds = originalPlaces.map((place) => place.canonicalPlaceId);
  const originalCategories = new Map(originalPlaces.map((place) => [place.canonicalPlaceId, [...place.categories]]));
  const overlay = catalog.queryIndependentPlaces({ cityId: "wroclaw", placeType: "waterRefillPoint" });

  const unchanged = filters.filterPlaces({ productPlaces: originalPlaces, overlayPlaces: overlay });
  assert.deepEqual(unchanged.map((place) => place.canonicalPlaceId), originalIds);

  const eligible = {
    id: "eligible-lifestyle-place",
    canonicalPlaceId: "eligible-lifestyle-place",
    categories: ["eat"],
    canonicalPlace: { id: "eligible-lifestyle-place", amenities: { freeTapWater: true } },
  };
  const ineligibleFalse = {
    id: "ineligible-false",
    canonicalPlaceId: "ineligible-false",
    categories: ["eat"],
    canonicalPlace: { id: "ineligible-false", amenities: { freeTapWater: false } },
  };
  const ineligibleUndefined = {
    id: "ineligible-undefined",
    canonicalPlaceId: "ineligible-undefined",
    categories: ["eat"],
    canonicalPlace: { id: "ineligible-undefined", amenities: {} },
  };
  const filtered = filters.filterPlaces({
    productPlaces: [eligible, ineligibleFalse, ineligibleUndefined],
    overlayPlaces: overlay,
    freeWaterOnly: true,
  });

  assert.equal(filtered.some((place) => filters.canonicalId(place) === eligible.canonicalPlaceId), true);
  assert.equal(filtered.some((place) => filters.canonicalId(place) === ineligibleFalse.canonicalPlaceId), false);
  assert.equal(filtered.some((place) => filters.canonicalId(place) === ineligibleUndefined.canonicalPlaceId), false);
  assert.equal(filtered.filter((place) => place.placeType === "waterRefillPoint").length, 15);
  assert.equal(filters.canonicalId(eligible), "eligible-lifestyle-place");
  assert.deepEqual(eligible.categories, ["eat"]);

  const categoryScoped = filters.filterPlaces({
    productPlaces: [eligible],
    overlayPlaces: overlay,
    category: "eat",
    freeWaterOnly: true,
  });
  assert.equal(JSON.stringify(categoryScoped.map((place) => filters.canonicalId(place))), JSON.stringify(["eligible-lifestyle-place"]));
  assert.equal(new Set(filtered.map((place) => filters.canonicalId(place))).size, filtered.length);

  assert.deepEqual(window.WROC_LIFESTYLE_PLACES.map((place) => place.canonicalPlaceId), originalIds);
  for (const place of window.WROC_LIFESTYLE_PLACES) {
    assert.equal(JSON.stringify(place.categories), JSON.stringify(originalCategories.get(place.canonicalPlaceId)));
  }
  assert.equal(catalog.products["lifestyle-guide"].places.some((record) => record.placeId.startsWith("water-refill-")), false);
});

test("Free Water labels are shared across all five product languages", () => {
  const source = readFileSync(resolve(root, "data/place-amenities.js"), "utf8");
  for (const label of ["מים בחינם", "Free Water", "Darmowa woda", "Kostenloses Wasser", "Voda zdarma"]) {
    assert.match(source, new RegExp(label));
  }
});

test("Lifestyle loads the reusable filter and exposes an independent amenity toggle", () => {
  const html = readFileSync(resolve(root, "lifestyle.html"), "utf8");
  const catalogIndex = html.indexOf("/data/place-catalog.js");
  const filtersIndex = html.indexOf("/data/place-filters.js");
  const lifestyleDataIndex = html.indexOf("/data/lifestyle-places.js");
  const appIndex = html.indexOf("/lifestyle.js");

  assert.match(html, /id="free-water-filter"/);
  assert.match(html, /aria-pressed="false"/);
  assert.ok(catalogIndex >= 0 && catalogIndex < filtersIndex);
  assert.ok(filtersIndex < lifestyleDataIndex && lifestyleDataIndex < appIndex);
});
