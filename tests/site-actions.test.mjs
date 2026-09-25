import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { runInNewContext } from "node:vm";

const root = resolve(import.meta.dirname, "..");

test("the product dropdown is named Our interactive maps in every supported language", () => {
  const source = readFileSync(resolve(root, "site-actions.js"), "utf8");
  for (const label of [
    "המפות האינטראקטיביות שלנו",
    "Our interactive maps",
    "Nasze interaktywne mapy",
    "Unsere interaktiven Karten",
    "Naše interaktivní mapy",
  ]) {
    assert.match(source, new RegExp(label));
  }

  const homepage = readFileSync(resolve(root, "index.html"), "utf8");
  assert.match(homepage, /<summary>המפות האינטראקטיביות שלנו<\/summary>/);

  const homepageTranslations = readFileSync(resolve(root, "site-i18n.js"), "utf8");
  for (const label of [
    '"המפות האינטראקטיביות שלנו": "Our interactive maps"',
    '"המפות האינטראקטיביות שלנו": "Nasze interaktywne mapy"',
    '"המפות האינטראקטיביות שלנו": "Unsere interaktiven Karten"',
    '"המפות האינטראקטיביות שלנו": "Naše interaktivní mapy"',
  ]) {
    assert.ok(homepageTranslations.includes(label), `homepage translation missing ${label}`);
  }
});

test("every map dropdown offers all six maps in the selected language", () => {
  const source = readFileSync(resolve(root, "site-actions.js"), "utf8");
  const context = { document: { readyState: "loading", addEventListener() {} } };
  runInNewContext(source.replace(/\}\)\(\);\s*$/, "globalThis.productMenuTest = { productPaths, productLinks, productMenuMarkup };\n})();"), context);
  const { productPaths, productLinks, productMenuMarkup } = context.productMenuTest;
  const expectedPaths = ["map.html", "premium.html", "moshe.html", "lifestyle.html", "excursions.html", "cultural.html"];
  assert.deepEqual(Array.from(productPaths), expectedPaths);

  for (const lang of ["he", "en", "pl", "de", "cs"]) {
    assert.equal(productLinks[lang].length, expectedPaths.length);
    const markup = productMenuMarkup(lang);
    for (const [index, path] of expectedPaths.entries()) {
      assert.ok(markup.includes(`href="/products/interactive-maps/${path}?lang=${lang}"`));
      assert.ok(markup.includes(productLinks[lang][index]));
    }
    assert.equal((markup.match(/<a /g) || []).length, expectedPaths.length);
  }
});

test("the homepage How it works heading follows the language toggle", () => {
  const homepage = readFileSync(resolve(root, "index.html"), "utf8");
  assert.match(homepage, /<h2>איך זה עובד\?<\/h2>/);

  const translations = readFileSync(resolve(root, "site-i18n.js"), "utf8");
  for (const label of [
    '"איך זה עובד?": "How does it work?"',
    '"איך זה עובד?": "Jak to działa?"',
    '"איך זה עובד?": "Wie funktioniert es?"',
    '"איך זה עובד?": "Jak to funguje?"',
  ]) {
    assert.ok(translations.includes(label), `homepage heading translation missing ${label}`);
  }
});
