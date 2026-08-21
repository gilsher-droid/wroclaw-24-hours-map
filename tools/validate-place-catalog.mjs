import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { runInNewContext } from "node:vm";

const root = resolve(import.meta.dirname, "..");
const languages = ["he", "en", "pl", "de", "cs"];

async function evaluate(file) {
  const window = {};
  runInNewContext(await readFile(resolve(root, file), "utf8"), { window, console }, { filename: file });
  return window;
}

const source = (await evaluate("data/canonical-places-source.js")).WROC_CANONICAL_PLACE_SOURCE;
const catalog = (await evaluate("data/place-catalog.js")).WROC_CATALOG;

if (!Array.isArray(source)) throw new Error("WROC_CANONICAL_PLACE_SOURCE must be an array.");
if (!catalog?.places || !catalog?.aliases) throw new Error("Generated canonical catalog is unavailable.");

const ids = new Set();
const aliases = new Map();
const invalidSocialPosts = (posts) => !Array.isArray(posts) || posts.some((item) =>
  !item?.platform
  || !item?.url
  || (item.originalLanguage != null && (typeof item.originalLanguage !== "string" || !item.originalLanguage.trim()))
  || (item.contentRef != null && (typeof item.contentRef !== "string" || !item.contentRef.trim()))
  || (item.contentRef != null && item.originalLanguage == null)
);
for (const record of source) {
  if (!record?.id || typeof record.id !== "string") throw new Error("Every independent place needs a stable string id.");
  if (ids.has(record.id)) throw new Error(`Duplicate independent canonical id: ${record.id}`);
  if (aliases.has(record.id)) throw new Error(`Independent canonical id collides with alias: ${record.id}`);
  ids.add(record.id);

  const location = record.location;
  if (!location?.countryCode || !location?.regionId || !location?.cityId) {
    throw new Error(`${record.id}: independent places must provide countryCode, regionId and cityId.`);
  }
  const coordinates = Array.isArray(location.coordinates)
    ? location.coordinates
    : [location.coordinates?.lat, location.coordinates?.lng];
  if (coordinates.length !== 2 || coordinates.some((value) => !Number.isFinite(value))) {
    throw new Error(`${record.id}: independent places must provide numeric coordinates.`);
  }
  if (location.address != null && (typeof location.address !== "object" || Array.isArray(location.address))) {
    throw new Error(`${record.id}: location.address must be an object when provided.`);
  }

  for (const field of ["name", "description"]) {
    if (!record[field] || typeof record[field] !== "object") {
      throw new Error(`${record.id}: ${field} must contain all five localized values.`);
    }
    for (const language of languages) {
      if (typeof record[field][language] !== "string" || !record[field][language].trim()) {
        throw new Error(`${record.id}: ${field}.${language} is required.`);
      }
    }
  }

  for (const alias of record.aliases || []) {
    if (!alias || typeof alias !== "string") throw new Error(`${record.id}: aliases must be non-empty strings.`);
    if (ids.has(alias) || aliases.has(alias)) throw new Error(`Duplicate or colliding independent alias: ${alias}`);
    aliases.set(alias, record.id);
  }

  if (record.experiences != null && !Array.isArray(record.experiences)) {
    throw new Error(`${record.id}: experiences must be an array when provided.`);
  }
  for (const experience of record.experiences || []) {
    if (!experience?.id) throw new Error(`${record.id}: every experience needs an id.`);
    if (experience.accessibility != null && (typeof experience.accessibility !== "object" || Array.isArray(experience.accessibility))) {
      throw new Error(`${record.id}/${experience.id}: accessibility must be an object.`);
    }
  }
  if (record.provenance != null && (typeof record.provenance !== "object" || Array.isArray(record.provenance))) {
    throw new Error(`${record.id}: provenance must be an object when provided.`);
  }
  if (record.socialPosts != null && invalidSocialPosts(record.socialPosts)) {
    throw new Error(`${record.id}: socialPosts must contain platform/url and valid optional originalLanguage/contentRef values.`);
  }

  const media = record.media || {};
  for (const field of ["photos", "videos"]) {
    if (media[field] != null && (!Array.isArray(media[field]) || media[field].some((item) => typeof item !== "string" || !item))) {
      throw new Error(`${record.id}: media.${field} must remain an array of non-empty strings.`);
    }
  }
  if (media.metadata != null && (typeof media.metadata !== "object" || Array.isArray(media.metadata))) {
    throw new Error(`${record.id}: media.metadata must be an object when provided.`);
  }
  const mediaPaths = new Set([...(media.photos || []), ...(media.videos || [])]);
  for (const mediaPath of Object.keys(media.metadata || {})) {
    if (!mediaPaths.has(mediaPath)) throw new Error(`${record.id}: metadata references unknown media ${mediaPath}.`);
  }

  const generated = catalog.getPlace(record.id);
  if (!generated) throw new Error(`${record.id}: independent place is missing from the generated catalog.`);
  if (generated.sourceRecords.some((item) => !item?.productId || !item?.sourceId)) {
    throw new Error(`${record.id}: invalid product reference metadata.`);
  }
  for (const alias of record.aliases || []) {
    if (catalog.resolveId(alias) !== record.id) throw new Error(`${record.id}: alias ${alias} is not registered.`);
  }
}

for (const [alias, canonicalId] of Object.entries(catalog.aliases)) {
  if (!catalog.places[canonicalId]) throw new Error(`Catalog alias ${alias} points to missing place ${canonicalId}.`);
}

for (const place of Object.values(catalog.places)) {
  if (invalidSocialPosts(place.socialPosts)) {
    throw new Error(`${place.id}: generated socialPosts contain invalid optional enrichment.`);
  }
}

console.log(`Canonical catalog validated: ${Object.keys(catalog.places).length} places, ${Object.keys(catalog.aliases).length} aliases, ${source.length} independent places.`);
