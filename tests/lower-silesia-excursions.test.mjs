import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { runInNewContext } from "node:vm";

const root = process.cwd();

test("Lower Silesia excursion reuses three canonical places in five languages", () => {
  const window = {};
  const context = { window, console };
  runInNewContext(readFileSync(resolve(root, "data/place-catalog.js"), "utf8"), context);
  runInNewContext(readFileSync(resolve(root, "data/lower-silesia-excursions.js"), "utf8"), context);

  const product = window.WROC_LOWER_SILESIA_EXCURSIONS;
  assert.equal(product.id, "lower-silesia-excursions");
  assert.equal(product.type, "excursions");
  assert.equal(product.excursions.length, 1);
  assert.deepEqual(Array.from(product.canonicalPlaceIds), ["ksiaz-castle", "walbrzych-market-square", "church-of-peace-swidnica"]);
  assert.deepEqual(Object.keys(product.title), ["he", "en", "pl", "de", "cs"]);
  assert.deepEqual(Object.keys(product.excursions[0].title), ["he", "en", "pl", "de", "cs"]);
  product.canonicalPlaceIds.forEach((id) => assert.ok(window.WROC_CATALOG.getPlace(id), `missing canonical place ${id}`));
  assert.ok(window.WROC_CATALOG.products[product.id]);
  const registered = Array.from(window.WROC_CATALOG.products[product.id].places);
  assert.deepEqual(registered.map((item) => item.placeId), ["ksiaz-castle", "walbrzych-market-square", "church-of-peace-swidnica"]);
});
