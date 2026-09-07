import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

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
