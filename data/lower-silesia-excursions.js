(function () {
  "use strict";

  const t = (he, en, pl, de, cs) => ({ he, en, pl, de, cs });
  const excursions = [];

  const product = {
    id: "lower-silesia-excursions",
    type: "excursions",
    title: t(
      "טיולים בשלזיה התחתונה",
      "Lower Silesia excursions",
      "Wycieczki po Dolnym Śląsku",
      "Ausflüge in Niederschlesien",
      "Výlety po Dolním Slezsku"
    ),
    status: t(
      "טיולים חדשים מתווספים בהדרגה.",
      "New excursions are being added.",
      "Stopniowo dodajemy nowe wycieczki.",
      "Nach und nach kommen neue Ausflüge hinzu.",
      "Postupně přidáváme nové výlety."
    ),
    excursions,
    canonicalPlaceIds: [],
  };

  if (window.WROC_CATALOG?.registerProduct) {
    window.WROC_CATALOG.registerProduct({
      id: product.id,
      type: product.type,
      places: [],
    });
  }

  window.WROC_LOWER_SILESIA_EXCURSIONS = Object.freeze(product);
})();
