import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { runInNewContext } from "node:vm";

const root = resolve(import.meta.dirname, "..");
const languages = ["he", "en", "pl", "de", "cs"];

function load(files) {
  const context = { window: {}, console, URLSearchParams };
  for (const file of files) runInNewContext(readFileSync(resolve(root, file), "utf8"), context, { filename: file });
  return context.window;
}

test("the canonical Experience Registry contains exactly the approved localized set", () => {
  const window = load(["data/place-catalog.js", "data/canonical-experiences.js"]);
  const registry = window.WROC_EXPERIENCE_CATALOG;
  assert.equal(registry.experiences.length, 10);
  assert.equal(new Set(Array.from(registry.experiences, ({ id }) => id)).size, 10);
  for (const experience of registry.experiences) {
    assert.deepEqual(Object.keys(experience.name), languages);
    assert.deepEqual(Object.keys(experience.description), languages);
    assert.equal(registry.getExperience(experience.id), experience);
    for (const placeId of experience.relatedCanonicalPlaceIds) assert.ok(window.WROC_CATALOG.getPlace(placeId));
  }
  assert.equal(registry.forProduct("cultural-adventure")[0].id, "street-art-nadodrze-olbin");
  assert.equal(window.WROC_CATALOG.getPlace("prague"), null);
  assert.equal(window.WROC_CATALOG.getPlace("praha"), null);
  assert.equal(window.WROC_CATALOG.getPlace("dworzec-autobusowy-wroclaw"), null);
});

test("existing products reference Experiences without visible duplicates", () => {
  const cultural = load(["data/place-catalog.js", "data/canonical-experiences.js", "data/cultural-places.js"]);
  assert.equal(cultural.WROC_CULTURAL_EXPERIENCES.length, 1);
  assert.equal(cultural.WROC_CULTURAL_EXPERIENCES[0].id, "street-art-nadodrze-olbin");
  assert.equal(cultural.WROC_CULTURAL_EXPERIENCES[0].placeType, "area-experience");
  assert.deepEqual(Array.from(cultural.WROC_CULTURAL_EXPERIENCES[0].mapPoints, ({ label }) => label), ["Nadodrze", "Ołbin"]);

  const fourDays = load(["data/place-catalog.js", "data/canonical-experiences.js", "data/extra-languages.js", "data/premium-route.js"]);
  const expectedRefs = new Map([
    ["dwarf-info", "wroclaw-dwarf-hunt"],
    ["polinka", "polinka-cable-car-ride"],
    ["fountain", "wroclaw-multimedia-fountain-show"],
    ["marina", "oder-river-cruise"],
  ]);
  for (const [stopId, experienceId] of expectedRefs) {
    assert.equal(fourDays.PREMIUM_STOPS.find(({ id }) => id === stopId).canonicalExperienceId, experienceId);
    assert.ok(fourDays.WROC_CATALOG.getPlace(stopId));
  }
  const tramTip = fourDays.PREMIUM_DAYS[2].tips.find((tip) => tip.en === "Use a tram between Hydropolis and Centennial Hall.");
  assert.ok(tramTip, "the existing Four Days tram tip must remain unchanged");
  assert.equal(tramTip.canonicalExperienceId, undefined);

  const christmas = load(["data/place-catalog.js", "data/canonical-experiences.js", "data/extra-languages.js", "data/moshe-route.js"]);
  const culturalEvening = christmas.PREMIUM_STOPS.find(({ id }) => id === "culture-evening");
  assert.equal(culturalEvening.canonicalExperienceId, "culture-evening");
  assert.equal(christmas.PREMIUM_STOPS.filter(({ id }) => id === "culture-evening").length, 1);
});

test("Experience media resolves through existing Place media and Prague originals", () => {
  const window = load(["data/place-catalog.js", "data/canonical-experiences.js"]);
  const registry = window.WROC_EXPERIENCE_CATALOG;
  const culturalEveningMedia = registry.resolveMedia("culture-evening");
  assert.equal(culturalEveningMedia.images.length, 5);
  assert.equal(culturalEveningMedia.videos.length, 0);
  assert.ok(culturalEveningMedia.social.some(({ platform }) => platform === "facebook"));
  assert.ok(!culturalEveningMedia.social.some(({ platform }) => platform === "instagram"));

  const fountainMedia = registry.resolveMedia("wroclaw-multimedia-fountain-show");
  assert.equal(fountainMedia.images.length, 7);
  assert.equal(fountainMedia.videos.length, 4);
  const morskieMedia = registry.resolveMedia("summer-bathing-and-relaxation");
  assert.equal(morskieMedia.images.length, 35);
  assert.equal(morskieMedia.videos.length, 4);

  const prague = registry.getExperience("wroclaw-prague-public-transport");
  assert.equal(prague.relatedCanonicalPlaceIds.length, 0);
  assert.equal(prague.productRefs.length, 0);
  assert.equal(prague.destination.city, "Prague");
  assert.equal(prague.destination.localName, "Praha");
  assert.equal(prague.metadata.reviewedAssetCount, 31);
  assert.equal(prague.media.images.length, 12);
  assert.equal(prague.media.videos.length, 8);
  assert.equal(prague.media.hero.src, "/assets/experiences/prague/IMG_5399.JPG");
  for (const mediaPath of [...prague.media.images, ...prague.media.videos]) {
    assert.ok(existsSync(resolve(root, mediaPath.slice(1))), `missing ${mediaPath}`);
  }
});

test("Routes, non-approved nested records and Hebrew RTL remain intact", () => {
  const window = load(["data/place-catalog.js", "data/canonical-experiences.js", "data/lower-silesia-excursions.js"]);
  const route = window.WROC_LOWER_SILESIA_EXCURSIONS.excursions.find(({ id }) => id === "ksiaz-swidnica-day-trip");
  assert.ok(route);
  assert.ok(Array.isArray(route.routePoints));
  assert.ok(Array.isArray(route.steps));
  assert.equal(window.WROC_CATALOG.getPlace("ksiaz-castle").experiences.length, 3);
  assert.ok(window.WROC_CATALOG.getPlace("morskie-oko-wroclaw").experiences.length > 0);
  assert.match(readFileSync(resolve(root, "cultural.html"), "utf8"), /<html lang="he" dir="rtl">/);
});
