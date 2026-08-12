import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { runInNewContext } from "node:vm";

const root = process.cwd();

test("Lower Silesia excursions registers an empty five-language product foundation", () => {
  const window = {};
  const context = { window, console };
  runInNewContext(readFileSync(resolve(root, "data/place-catalog.js"), "utf8"), context);
  runInNewContext(readFileSync(resolve(root, "data/lower-silesia-excursions.js"), "utf8"), context);

  const product = window.WROC_LOWER_SILESIA_EXCURSIONS;
  assert.equal(product.id, "lower-silesia-excursions");
  assert.equal(product.type, "excursions");
  assert.deepEqual(Array.from(product.excursions), []);
  assert.deepEqual(Array.from(product.canonicalPlaceIds), []);
  assert.deepEqual(Object.keys(product.title), ["he", "en", "pl", "de", "cs"]);
  assert.ok(window.WROC_CATALOG.products[product.id]);
  assert.deepEqual(Array.from(window.WROC_CATALOG.products[product.id].places), []);
});
