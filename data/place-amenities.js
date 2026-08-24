(function () {
  "use strict";

  const freeWaterLabels = Object.freeze({
    he: "מים בחינם",
    en: "Free Water",
    pl: "Darmowa woda",
    de: "Kostenloses Wasser",
    cs: "Voda zdarma",
  });

  function canonicalPlace(place) {
    if (place?.canonicalPlace) return place.canonicalPlace;
    const id = place?.canonicalPlaceId || place?.id;
    return id ? window.WROC_CATALOG?.getPlace?.(id) || null : null;
  }

  function hasFreeTapWater(place) {
    return canonicalPlace(place)?.amenities?.freeTapWater === true;
  }

  function freeWaterLabel(language = "en") {
    return freeWaterLabels[language] || freeWaterLabels.en;
  }

  function markerBadgeHtml(place, language = "en") {
    if (!hasFreeTapWater(place)) return "";
    const label = freeWaterLabel(language);
    return `<span class="free-water-marker-badge" role="img" aria-label="${label}" title="${label}">💧</span>`;
  }

  function labelBadgeHtml(place, language = "en") {
    if (!hasFreeTapWater(place)) return "";
    return `<span class="free-water-label"><span aria-hidden="true">💧</span>${freeWaterLabel(language)}</span>`;
  }

  window.WROC_PLACE_AMENITIES = Object.freeze({
    canonicalPlace,
    hasFreeTapWater,
    freeWaterLabel,
    markerBadgeHtml,
    labelBadgeHtml,
  });
})();
