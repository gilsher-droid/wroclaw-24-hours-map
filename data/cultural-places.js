(function () {
  "use strict";

  const memberships = {
    "royal-palace-wroclaw": ["museums-history", "art-contemporary", "architecture-design"],
    "municipal-arsenal-wroclaw": ["museums-history", "architecture-design"],
    "town-hall": ["museums-history", "architecture-design"],
    "old-jewish-cemetery-wroclaw": ["museums-history", "architecture-design"],
    "henryk-tomaszewski-theatre-museum": ["museums-history", "theatre-performing-arts"],
    "museum-of-architecture-wroclaw": ["museums-history", "architecture-design"],
    "national-museum": ["museums-history", "art-contemporary"],
    "panorama": ["museums-history", "art-contemporary"],
    "four-domes": ["art-contemporary", "architecture-design"],
    "wroclaw-contemporary-museum": ["art-contemporary", "architecture-design"],
    "pan-tadeusz-museum": ["museums-history"],
    "depot-history-centre": ["museums-history"],
    "polish-theatre-wroclaw": ["theatre-performing-arts"],
    "wroclaw-contemporary-theatre": ["theatre-performing-arts"],
    "wroclaw-puppet-theatre": ["theatre-performing-arts"],
    "song-of-the-goat-theatre": ["theatre-performing-arts"],
    "new-horizons-cinema": ["film"],
    "nfm": ["music-opera", "architecture-design"],
    "opera": ["music-opera", "theatre-performing-arts", "architecture-design"],
    "glowny": ["art-contemporary", "architecture-design"],
    "zyjnia-bwa-wroclaw": ["art-contemporary", "architecture-design"],
    "sic-gallery-bwa-wroclaw": ["art-contemporary", "architecture-design"],
    "studio-bwa-wroclaw": ["art-contemporary"],
    "aula": ["museums-history", "architecture-design"],
    "museum-of-pharmacy-wroclaw": ["museums-history"],
    "wuwa-estate": ["architecture-design"],
  };

  const places = Object.entries(memberships).map(([id, categories]) => {
    const canonical = window.WROC_CATALOG?.getPlace(id);
    if (!canonical) throw new Error(`Cultural Adventure references missing canonical place: ${id}`);
    return {
      id,
      categories,
      coordinates: [canonical.location.coordinates.lat, canonical.location.coordinates.lng],
      name: canonical.name,
      localName: canonical.localName,
      description: canonical.description,
      sourceUrl: canonical.links?.website || null,
    };
  });

  const registered = window.WROC_CATALOG?.registerProduct?.({
    id: "cultural-adventure",
    type: "place-catalog",
    places,
  });

  window.WROC_CULTURAL_PLACES = registered?.places || places;

  const streetArtExperience = window.WROC_EXPERIENCE_CATALOG?.getExperience("street-art-nadodrze-olbin");
  if (!streetArtExperience) throw new Error("Cultural Adventure requires the street-art-nadodrze-olbin canonical experience");
  window.WROC_CULTURAL_EXPERIENCES = [
    Object.freeze({ ...streetArtExperience, placeType: "area-experience" }),
  ];
})();
