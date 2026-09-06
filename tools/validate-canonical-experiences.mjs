import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { runInNewContext } from "node:vm";

const root = resolve(import.meta.dirname, "..");
const languages = ["he", "en", "pl", "de", "cs"];
const productIds = new Set([
  "wroclaw-24-hours",
  "wroclaw-four-days",
  "wroclaw-christmas",
  "lifestyle-guide",
  "cultural-adventure",
  "lower-silesia-excursions",
]);
const context = { window: {}, console };

for (const file of ["data/place-catalog.js", "data/canonical-experiences.js"]) {
  runInNewContext(readFileSync(resolve(root, file), "utf8"), context, { filename: file });
}

const catalog = context.window.WROC_CATALOG;
const registry = context.window.WROC_EXPERIENCE_CATALOG;
if (!registry || registry.version !== 1) throw new Error("Canonical Experience Registry v1 is unavailable.");
if (registry.experiences.length !== 10) throw new Error(`Expected exactly 10 canonical experiences, found ${registry.experiences.length}.`);

const ids = new Set();
const validateMediaPath = (experienceId, mediaPath) => {
  if (typeof mediaPath !== "string" || !mediaPath.startsWith("/assets/")) {
    throw new Error(`${experienceId}: invalid media path ${mediaPath}.`);
  }
  if (!existsSync(resolve(root, mediaPath.slice(1)))) throw new Error(`${experienceId}: missing media ${mediaPath}.`);
};

for (const experience of registry.experiences) {
  if (!experience?.id || typeof experience.id !== "string") throw new Error("Every canonical experience requires a stable string id.");
  if (ids.has(experience.id)) throw new Error(`Duplicate canonical experience id: ${experience.id}.`);
  ids.add(experience.id);
  if (!experience.type || !Array.isArray(experience.categories) || !experience.categories.length) {
    throw new Error(`${experience.id}: type and at least one category are required.`);
  }
  for (const field of ["name", "description"]) {
    for (const language of languages) {
      if (typeof experience[field]?.[language] !== "string" || !experience[field][language].trim()) {
        throw new Error(`${experience.id}: ${field}.${language} is required.`);
      }
    }
  }
  if (!Array.isArray(experience.relatedCanonicalPlaceIds) || !Array.isArray(experience.productRefs)) {
    throw new Error(`${experience.id}: Place and Product references must be arrays.`);
  }
  for (const placeId of experience.relatedCanonicalPlaceIds) {
    if (!catalog.getPlace(placeId)) throw new Error(`${experience.id}: dangling Canonical Place reference ${placeId}.`);
  }
  for (const productId of experience.productRefs) {
    if (!productIds.has(productId)) throw new Error(`${experience.id}: dangling Product reference ${productId}.`);
  }
  if (!Array.isArray(experience.mapPoints)) throw new Error(`${experience.id}: mapPoints must be an array.`);
  for (const point of experience.mapPoints) {
    if (!point?.id || !Array.isArray(point.coordinates) || point.coordinates.length !== 2 || point.coordinates.some((value) => !Number.isFinite(value))) {
      throw new Error(`${experience.id}: invalid mapPoint.`);
    }
  }
  for (const endpoint of ["origin", "destination"]) {
    if (experience[endpoint] && (!experience[endpoint].city || !experience[endpoint].countryCode)) {
      throw new Error(`${experience.id}: ${endpoint} requires city and countryCode.`);
    }
  }
  for (const placeId of experience.media?.inheritFromCanonicalPlaceIds || []) {
    if (!catalog.getPlace(placeId)) throw new Error(`${experience.id}: media inherits from missing Place ${placeId}.`);
  }
  const hero = experience.media?.hero;
  if (hero?.src) validateMediaPath(experience.id, hero.src);
  if (hero?.canonicalPlaceId) {
    const place = catalog.getPlace(hero.canonicalPlaceId);
    if (!place) throw new Error(`${experience.id}: Hero references missing Place ${hero.canonicalPlaceId}.`);
    if (!Number.isInteger(hero.photoIndex) || !place.media?.photos?.[hero.photoIndex]) {
      throw new Error(`${experience.id}: Hero photoIndex does not resolve.`);
    }
  }
  for (const mediaPath of [...(experience.media?.images || []), ...(experience.media?.videos || [])]) {
    validateMediaPath(experience.id, mediaPath);
  }
  for (const item of experience.social || []) {
    if (!item?.platform || !item?.url) throw new Error(`${experience.id}: invalid social reference.`);
    if (item.sourceCanonicalPlaceId && !catalog.getPlace(item.sourceCanonicalPlaceId)) {
      throw new Error(`${experience.id}: social reference uses missing Place ${item.sourceCanonicalPlaceId}.`);
    }
  }
}

if (catalog.getPlace("prague") || catalog.getPlace("praha")) throw new Error("Prague must not be a Canonical Place.");
if (catalog.getPlace("dworzec-autobusowy-wroclaw")) throw new Error("The bus station must not be created merely for the Prague Experience.");

console.log(`Canonical Experience Registry validated: ${registry.experiences.length} experiences, ${languages.length} languages.`);
