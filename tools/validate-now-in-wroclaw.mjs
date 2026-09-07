import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { runInNewContext } from "node:vm";

const root = process.cwd();
const window = {};
const context = { window, console };
for (const file of ["data/place-catalog.js", "data/canonical-experiences.js", "data/now-in-wroclaw.js"]) {
  runInNewContext(readFileSync(resolve(root, file), "utf8"), context, { filename: file });
}

const languages = ["he", "en", "pl", "de", "cs"];
const categories = new Set(["event", "transport", "airport", "culture", "attraction", "city-update", "practical"]);
const priorities = new Set(["normal", "important"]);
const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const ids = new Set();

function validDate(value) {
  if (!datePattern.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

for (const item of window.WROC_NOW_IN_WROCLAW_ITEMS || []) {
  if (!item.id || ids.has(item.id)) throw new Error(`Duplicate or missing news ID: ${item.id || "(missing)"}`);
  ids.add(item.id);
  for (const language of languages) {
    if (!item.title?.[language]?.trim()) throw new Error(`${item.id} is missing a ${language} title`);
  }
  if (!categories.has(item.category)) throw new Error(`${item.id} has unsupported category: ${item.category}`);
  if (!priorities.has(item.priority || "normal")) throw new Error(`${item.id} has unsupported priority: ${item.priority}`);
  for (const field of ["startDate", "endDate"]) {
    if (item[field] && !validDate(item[field])) throw new Error(`${item.id} has invalid ${field}: ${item[field]}`);
  }
  if (item.startDate && item.endDate && item.startDate > item.endDate) throw new Error(`${item.id} ends before it starts`);
  if (item.url) new URL(item.url);
  if (item.relatedCanonicalPlaceId && !window.WROC_CATALOG.getPlace(item.relatedCanonicalPlaceId)) {
    throw new Error(`${item.id} references missing Canonical Place: ${item.relatedCanonicalPlaceId}`);
  }
  if (item.relatedCanonicalExperienceId && !window.WROC_EXPERIENCE_CATALOG.getExperience(item.relatedCanonicalExperienceId)) {
    throw new Error(`${item.id} references missing Canonical Experience: ${item.relatedCanonicalExperienceId}`);
  }
}

console.log(`Now in Wrocław validated: ${ids.size} items, five languages, canonical references resolved.`);
