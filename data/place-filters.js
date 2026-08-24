(function () {
  "use strict";

  const canonicalPlace = (place) => place?.canonicalPlace || place || null;
  const canonicalId = (place) => place?.canonicalPlaceId || canonicalPlace(place)?.id || place?.id || null;

  function hasFreeWater(place) {
    const canonical = canonicalPlace(place);
    return Boolean(canonical && (
      canonical.amenities?.freeTapWater === true
      || place?.amenities?.freeTapWater === true
      || canonical.placeType === "waterRefillPoint"
      || place?.placeType === "waterRefillPoint"
    ));
  }

  function mergeByCanonicalId(productPlaces, overlayPlaces) {
    const merged = [];
    const seen = new Set();
    for (const place of [...productPlaces, ...overlayPlaces]) {
      const id = canonicalId(place);
      if (!id || seen.has(id)) continue;
      seen.add(id);
      merged.push(place);
    }
    return merged;
  }

  function filterPlaces({
    productPlaces = [],
    overlayPlaces = [],
    category = "all",
    freeWaterOnly = false,
    searchTerm = "",
    searchable = () => "",
  } = {}) {
    const candidates = freeWaterOnly
      ? mergeByCanonicalId(productPlaces, overlayPlaces)
      : productPlaces;
    return candidates.filter((place) => (
      (!freeWaterOnly || hasFreeWater(place))
      && (category === "all" || place.categories?.includes(category))
      && (!searchTerm || searchable(place).includes(searchTerm))
    ));
  }

  window.WROC_PLACE_FILTERS = Object.freeze({
    canonicalId,
    hasFreeWater,
    mergeByCanonicalId,
    filterPlaces,
  });
})();
