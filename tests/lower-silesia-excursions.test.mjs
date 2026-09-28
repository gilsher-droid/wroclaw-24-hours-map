import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { runInNewContext } from "node:vm";

const root = process.cwd();

test("day-trip product includes both routes and reuses canonical places in five languages", () => {
  const window = {};
  const context = { window, console };
  runInNewContext(readFileSync(resolve(root, "data/place-catalog.js"), "utf8"), context);
  runInNewContext(readFileSync(resolve(root, "data/lower-silesia-excursions.js"), "utf8"), context);

  const product = window.WROC_LOWER_SILESIA_EXCURSIONS;
  assert.equal(product.id, "lower-silesia-excursions");
  assert.equal(product.type, "excursions");
  assert.equal(product.excursions.length, 2);
  const expectedPlaces = ["ksiaz-castle", "walbrzych-market-square", "church-of-peace-swidnica", "brzeg-castle", "brzeg-holy-cross-church", "brzeg-town-hall", "brzeg-oder-gate", "moszna-castle", "moszna-castle-park"];
  assert.deepEqual(Array.from(product.canonicalPlaceIds), expectedPlaces);
  assert.deepEqual(Object.keys(product.title), ["he", "en", "pl", "de", "cs"]);
  assert.deepEqual(Object.keys(product.excursions[0].title), ["he", "en", "pl", "de", "cs"]);
  product.canonicalPlaceIds.forEach((id) => assert.ok(window.WROC_CATALOG.getPlace(id), `missing canonical place ${id}`));
  assert.ok(window.WROC_CATALOG.products[product.id]);
  const registered = Array.from(window.WROC_CATALOG.products[product.id].places);
  assert.deepEqual(registered.map((item) => item.placeId), expectedPlaces);
  const trip = product.excursions[1];
  assert.equal(trip.id, "brzeg-moszna-day-trip");
  assert.equal(trip.meta.region, "opole");
  assert.deepEqual(Array.from(trip.walkingRoute.points, (point) => point.id), [..."ABCDEFGHIJ"]);
  assert.deepEqual(Array.from(trip.travel.segments, (segment) => segment.mode), ["car", "car", "car"]);
  assert.equal(trip.routePoints[1].canonicalPlaceId, "brzeg-castle");
  assert.equal(trip.routePoints[2].canonicalPlaceId, "moszna-castle");
  for (const id of trip.canonicalPlaceIds) assert.equal(window.WROC_CATALOG.getPlace(id).location.regionId, "opole");
});
