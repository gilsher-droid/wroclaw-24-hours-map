import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { runInNewContext } from "node:vm";

const root = resolve(import.meta.dirname, "..");

const baseAliases = {
  "market-hall": "hala-targowa",
  "tumski-bridge": "most-tumski",
  "dunikowski-final": "dunikowski",
  "wroclavia-rec": "wroclavia",
  "renoma-rec": "renoma",
  "wroclavia-station": "wroclavia",
  "ostrow-cathedral": "ostrow",
  "christmas-market": "rynek",
};

const relatedPlaces = {
  "ostrow-cathedral": ["cathedral"],
  "wroclavia-station": ["glowny"],
  "wyspa-piasek": ["most-tumski"],
};

const nonPlaceIds = new Set(["culture-evening"]);

async function evaluate(files) {
  const window = {};
  const context = { window, console };
  for (const file of files) {
    runInNewContext(await readFile(resolve(root, file), "utf8"), context, { filename: file });
  }
  return window;
}

const main = await evaluate(["data/extra-languages.js", "data/locations.js"]);
const lifestyle = await evaluate(["data/lifestyle-places.js"]);
const premium = await evaluate(["data/extra-languages.js", "data/premium-route.js"]);
const christmas = await evaluate(["data/extra-languages.js", "data/moshe-route.js"]);
const mediaRegistry = (await evaluate(["data/location-media.js"])).WROC_LOCATION_MEDIA || {};
const canonicalSourceFile = process.env.WROC_CANONICAL_PLACE_SOURCE_FILE || "data/canonical-places-source.js";
const freeWaterSourceFile = process.env.WROC_FREE_WATER_PLACE_SOURCE_FILE || "data/free-water-places.js";
const canonicalSource = [
  ...((await evaluate([canonicalSourceFile])).WROC_CANONICAL_PLACE_SOURCE || []),
  ...((await evaluate([freeWaterSourceFile])).WROC_FREE_WATER_PLACE_SOURCE || []),
];
const outputFile = process.env.WROC_PLACE_CATALOG_OUTPUT_FILE || "data/place-catalog.js";

const wroclawLocation = Object.freeze({
  countryCode: "PL",
  regionId: "lower-silesia",
  cityId: "wroclaw",
});

const sources = [
  { productId: "wroclaw-24-hours", rank: 1, records: [...main.LOCATIONS, ...main.EVENING_LOCATIONS], kind: "route-stop", defaultLocation: wroclawLocation },
  { productId: "lifestyle-guide", rank: 2, records: lifestyle.WROC_LIFESTYLE_PLACES, kind: "catalog-place", defaultLocation: wroclawLocation },
  { productId: "wroclaw-four-days", rank: 3, records: premium.PREMIUM_STOPS, kind: "route-stop", defaultLocation: wroclawLocation },
  { productId: "wroclaw-four-days", rank: 3, records: premium.PREMIUM_RECOMMENDATIONS, kind: "recommendation", defaultLocation: wroclawLocation },
  { productId: "wroclaw-christmas", rank: 4, records: christmas.PREMIUM_STOPS, kind: "route-stop", defaultLocation: wroclawLocation },
  { productId: "wroclaw-christmas", rank: 4, records: christmas.PREMIUM_RECOMMENDATIONS, kind: "recommendation", defaultLocation: wroclawLocation },
];

const asText = (value) => {
  if (!value) return null;
  if (typeof value === "string") return { he: value, en: value, pl: value, de: value, cs: value };
  return {
    he: value.he || value.en || value.pl || "",
    en: value.en || value.he || value.pl || "",
    pl: value.pl || value.en || value.he || "",
    de: value.de || value.en || value.he || "",
    cs: value.cs || value.en || value.he || "",
  };
};

const sameCoordinates = (a, b) => Array.isArray(a) && Array.isArray(b)
  && Math.abs(a[0] - b[0]) < 0.000001
  && Math.abs(a[1] - b[1]) < 0.000001;

const catalogAliases = { ...baseAliases };
const places = new Map();
const conflicts = [];

for (const record of canonicalSource) {
  if (!record?.id) throw new Error("Independent canonical places must have a stable id.");
  if (places.has(record.id)) throw new Error(`Duplicate independent canonical place id: ${record.id}`);
  if (catalogAliases[record.id] && catalogAliases[record.id] !== record.id) {
    throw new Error(`Independent canonical place id ${record.id} collides with alias for ${catalogAliases[record.id]}.`);
  }

  const location = record.location;
  if (!location?.countryCode || !location?.regionId || !location?.cityId) {
    throw new Error(`Independent canonical place ${record.id} must provide explicit countryCode, regionId and cityId.`);
  }
  const rawCoordinates = location.coordinates;
  const coordinates = Array.isArray(rawCoordinates)
    ? { lat: rawCoordinates[0], lng: rawCoordinates[1] }
    : rawCoordinates ? { lat: rawCoordinates.lat, lng: rawCoordinates.lng } : null;

  const place = {
    id: record.id,
    localName: record.localName || (typeof record.name === "string" ? record.name : null),
    name: asText(record.name || record.localName || record.id),
    description: asText(record.description),
    location: {
      countryCode: location.countryCode,
      regionId: location.regionId,
      cityId: location.cityId,
      coordinates,
      ...(location.address ? { address: location.address } : {}),
    },
    categories: [...new Set([...(record.categories || []), ...(record.category ? [record.category] : [])])],
    sourceUrls: [...(record.sourceUrls || []), ...(record.sourceUrl ? [record.sourceUrl] : [])],
    aliases: [...new Set(record.aliases || [])],
    sourceRecords: [],
    coordinateCandidates: [],
    status: record.status || "draft",
    editorialPriority: record.editorialPriority ?? null,
    taxonomy: record.taxonomy || null,
    suitability: record.suitability || null,
    visit: record.visit || null,
    links: record.links || null,
    transport: record.transport || null,
    languages: record.languages || ["he", "en", "pl", "de", "cs"],
    _canonicalMedia: record.media || null,
    _canonicalSocialPosts: Array.isArray(record.socialPosts) ? record.socialPosts : [],
    _rank: 0,
    ...(Array.isArray(record.experiences) ? { experiences: record.experiences } : {}),
    ...(record.provenance ? { provenance: record.provenance } : {}),
    ...(record.placeType ? { placeType: record.placeType } : {}),
    ...(record.amenities ? { amenities: record.amenities } : {}),
    ...(record.availability ? { availability: record.availability } : {}),
  };

  places.set(record.id, place);
  for (const alias of place.aliases) {
    if (catalogAliases[alias] && catalogAliases[alias] !== record.id) {
      throw new Error(`Canonical alias ${alias} resolves to more than one place.`);
    }
    if (places.has(alias) && alias !== record.id) {
      throw new Error(`Canonical alias ${alias} collides with a canonical place id.`);
    }
    catalogAliases[alias] = record.id;
  }
}

for (const source of sources) {
  for (const record of source.records) {
    if (!record?.id || nonPlaceIds.has(record.id)) continue;
    const canonicalId = catalogAliases[record.id] || record.id;
    const coordinates = Array.isArray(record.coordinates)
      ? { lat: record.coordinates[0], lng: record.coordinates[1] }
      : null;
    const candidate = {
      id: canonicalId,
      localName: record.localName || (typeof record.name === "string" ? record.name : null),
      name: asText(record.name || record.localName || canonicalId),
      description: asText(record.description),
      location: {
        countryCode: source.defaultLocation.countryCode,
        regionId: source.defaultLocation.regionId,
        cityId: source.defaultLocation.cityId,
        coordinates,
      },
      categories: [...new Set([...(record.categories || []), ...(record.category ? [record.category] : [])])],
      sourceUrls: record.sourceUrl ? [record.sourceUrl] : [],
      aliases: [],
      sourceRecords: [],
      coordinateCandidates: [],
      status: "published",
      editorialPriority: null,
      _rank: source.rank,
      ...(record.placeType ? { placeType: record.placeType } : {}),
      ...(record.amenities ? { amenities: record.amenities } : {}),
      ...(record.availability ? { availability: record.availability } : {}),
    };

    if (!places.has(canonicalId)) places.set(canonicalId, candidate);
    const place = places.get(canonicalId);
    if (source.rank < place._rank) {
      place.localName = candidate.localName;
      place.name = candidate.name;
      place.description = candidate.description;
      place.location = candidate.location;
      place._rank = source.rank;
    }
    if (record.id !== canonicalId) place.aliases.push(record.id);
    place.categories.push(...candidate.categories);
    if (!place.placeType && candidate.placeType) place.placeType = candidate.placeType;
    if (candidate.amenities) place.amenities = { ...(place.amenities || {}), ...candidate.amenities };
    if (!place.availability && candidate.availability) place.availability = candidate.availability;
    place.sourceUrls.push(...candidate.sourceUrls);
    place.sourceRecords.push({ productId: source.productId, kind: source.kind, sourceId: record.id });
    if (coordinates) {
      place.coordinateCandidates.push({ productId: source.productId, sourceId: record.id, ...coordinates });
      const selected = place.location.coordinates;
      if (selected && !sameCoordinates([selected.lat, selected.lng], [coordinates.lat, coordinates.lng])) {
        conflicts.push({ canonicalId, productId: source.productId, sourceId: record.id, selected, candidate: coordinates });
      }
    }
  }
}

for (const place of places.values()) {
  place.aliases = [...new Set(place.aliases)].sort();
  place.categories = [...new Set(place.categories)].sort();
  place.sourceUrls = [...new Set(place.sourceUrls)].sort();
  place.sourceRecords = place.sourceRecords.filter((item, index, all) =>
    all.findIndex((other) => JSON.stringify(other) === JSON.stringify(item)) === index);
  place.coordinateCandidates = place.coordinateCandidates.filter((item, index, all) =>
    all.findIndex((other) => JSON.stringify(other) === JSON.stringify(item)) === index);
  const mediaKeys = [place.id, ...place.aliases];
  const resources = mediaKeys.map((key) => mediaRegistry[key]).find(Boolean) || {};
  place.taxonomy = {
    categories: place.categories,
    tags: Array.isArray(place.taxonomy?.tags) ? [...new Set(place.taxonomy.tags)] : [],
  };
  const suitability = place.suitability || {};
  place.suitability = {
    recommendedFor: [],
    walkingIntensity: null,
    familyFriendly: null,
    couples: null,
    solo: null,
    romantic: null,
    indoorOutdoor: null,
    rainFriendly: null,
    budgetLevel: null,
    accessibility: { level: null, notes: null },
    ...suitability,
    accessibility: {
      level: null,
      notes: null,
      ...(suitability.accessibility || {}),
    },
  };
  const visit = place.visit || {};
  place.visit = {
    durationMinutes: null,
    bestTimeOfDay: [],
    seasonalSuitability: [],
    openingHoursNotes: null,
    ...visit,
  };
  const links = place.links || {};
  place.links = {
    website: null,
    navigation: { googleMaps: null, appleMaps: null },
    ...links,
    navigation: {
      googleMaps: null,
      appleMaps: null,
      ...(links.navigation || {}),
    },
  };
  const canonicalMedia = place._canonicalMedia || {};
  place.media = {
    photos: Array.isArray(canonicalMedia.photos)
      ? canonicalMedia.photos
      : Array.isArray(resources.gallery) ? resources.gallery : [],
    videos: Array.isArray(canonicalMedia.videos)
      ? canonicalMedia.videos
      : Array.isArray(resources.videos) ? resources.videos : [],
    ...(canonicalMedia.metadata ? { metadata: canonicalMedia.metadata } : {}),
  };
  place.socialPosts = [
    ...(place._canonicalSocialPosts || []),
    ...(resources.facebook ? [{ platform: "facebook", url: resources.facebook }] : []),
    ...(resources.instagram ? [{ platform: "instagram", url: resources.instagram }] : []),
    ...place.sourceUrls.map((url) => ({ platform: "facebook", url })),
  ].filter((item, index, all) => all.findIndex((other) => other.platform === item.platform && other.url === item.url) === index);
  place.transport = {
    carRequired: null,
    publicTransportNotes: null,
    parkingNotes: null,
    drivingTimeFromWroclawMinutes: null,
    ...(place.transport || {}),
  };
  place.languages = place.languages || ["he", "en", "pl", "de", "cs"];
  delete place._canonicalMedia;
  delete place._canonicalSocialPosts;
  delete place._rank;
}

const serializedPlaces = Object.fromEntries([...places.entries()].sort(([a], [b]) => a.localeCompare(b)));
const aliases = catalogAliases;
const banner = `/* Generated by tools/generate-place-catalog.mjs.\n * Canonical identity data is consumed through WROC_CATALOG while legacy globals\n * remain available as a compatibility surface for the approved UI.\n */\n`;
const runtime = `(function () {\n  "use strict";\n\n  const places = ${JSON.stringify(serializedPlaces, null, 2)};\n  const aliases = ${JSON.stringify(aliases, null, 2)};\n  const relatedPlaces = ${JSON.stringify(relatedPlaces, null, 2)};\n  const products = {};\n\n  const resolveId = (id) => aliases[id] || id;\n  const getPlace = (id) => places[resolveId(id)] || null;\n  const resolvePlaceId = (record) => record && record.id !== "culture-evening" ? resolveId(record.id) : null;\n\n  function routeStop(record, productId, role) {\n    const placeId = resolvePlaceId(record);\n    return {\n      id: \`${'${productId}'}:${'${role}'}:${'${record.id}'}\`,\n      productId,\n      role,\n      placeId,\n      relatedPlaceIds: (relatedPlaces[record.id] || []).map(resolveId),\n      day: record.day ?? null,\n      order: record.order ?? null,\n      arrivalTime: record.time ?? null,\n      duration: record.duration ?? record.time ?? null,\n      optional: Boolean(record.optional),\n      categoryOverride: record.category ?? null,\n      coordinateOverride: Array.isArray(record.coordinates) ? { lat: record.coordinates[0], lng: record.coordinates[1] } : null,\n      presentation: {\n        name: record.name ?? null,\n        localName: record.localName ?? null,\n        description: record.description ?? null,\n        recommendation: record.recommendation ?? null,\n        tip: record.tip ?? null,\n        note: record.note ?? null,\n      },\n      legacyId: record.id,\n    };\n  }\n\n  function attach(record, productId, role) {\n    const normalized = routeStop(record, productId, role);\n    return {\n      ...record,\n      canonicalPlaceId: normalized.placeId,\n      relatedPlaceIds: normalized.relatedPlaceIds,\n      canonicalPlace: normalized.placeId ? places[normalized.placeId] || null : null,\n      productRecordId: normalized.id,\n    };\n  }\n\n  function registerProduct({ id, type = "route", stops = [], recommendations = [], places: productPlaces = [], days = [] }) {\n    const normalizedStops = stops.map((record) => routeStop(record, id, "stop"));\n    const normalizedRecommendations = recommendations.map((record) => routeStop(record, id, "recommendation"));\n    const normalizedPlaces = productPlaces.map((record) => routeStop(record, id, "catalog-place"));\n    products[id] = { id, type, days, stops: normalizedStops, recommendations: normalizedRecommendations, places: normalizedPlaces };\n    return {\n      stops: stops.map((record) => attach(record, id, "stop")),\n      recommendations: recommendations.map((record) => attach(record, id, "recommendation")),\n      places: productPlaces.map((record) => attach(record, id, "catalog-place")),\n    };\n  }\n\n  window.WROC_CATALOG = Object.freeze({\n    version: 1,\n    places,\n    aliases,\n    coordinateConflicts: ${JSON.stringify(conflicts, null, 2)},\n    products,\n    resolveId,\n    getPlace,\n    registerProduct,\n  });\n})();\n`;

const runtimeWithIndependentQuery = runtime
  .replace(
    '  const resolvePlaceId = (record)',
    '  const queryIndependentPlaces = ({ cityId, placeType, amenity } = {}) => Object.values(places).filter((place) => {\n'
      + '    if (place.sourceRecords.length !== 0) return false;\n'
      + '    if (cityId && place.location.cityId !== cityId) return false;\n'
      + '    if (placeType && place.placeType !== placeType) return false;\n'
      + '    if (amenity && place.amenities?.[amenity] !== true) return false;\n'
      + '    return true;\n'
      + '  });\n  const resolvePlaceId = (record)',
  )
  .replace('    getPlace,\n    registerProduct,', '    getPlace,\n    queryIndependentPlaces,\n    registerProduct,');

await writeFile(resolve(root, outputFile), banner + runtimeWithIndependentQuery);
console.log(`Generated ${places.size} canonical places with ${conflicts.length} coordinate audit flags.`);
