(function () {
  "use strict";

  const supported = ["he", "en", "pl", "de", "cs"];
  const params = new URLSearchParams(window.location.search);
  const saved = localStorage.getItem("wroclaw24-language");
  let language = supported.includes(params.get("lang")) ? params.get("lang") : supported.includes(saved) ? saved : "he";
  let map;

  const ui = {
    he: { brandLine: "מגלים את האזור דרך המקומות הנכונים", homeReturn: "חזרה לאתר הראשי", eyebrow: "המוצר החמישי של Wroc-love", title: "טיולים בשלזיה התחתית", lead: "טיולי יום עצמאיים מוורוצלב אל המקומות המיוחדים של שלזיה התחתית.", duration: "יום מלא", starts: "יציאה מוורוצלב", region: "שלזיה התחתית", mapTitle: "מפת הטיול", routeButton: "פתחו את המסלול ב־Google Maps", itineraryTitle: "סדר היום המומלץ", placesTitle: "המקומות המרכזיים", whyTitle: "למה לשלב אותם?", forWhomTitle: "למי הטיול מתאים?", practicalTitle: "לפני שיוצאים", website: "אתר רשמי", navigate: "ניווט", facebook: "פייסבוק", instagram: "אינסטגרם", travelTitle: "זמני נסיעה", communityLine: "מבית קהילת Wrocław & Lower Silesia", facebookGroup: "קבוצת הפייסבוק", facebookPage: "הדף העסקי", instagramFooter: "אינסטגרם" },
    en: { brandLine: "Discover the region through the right places", homeReturn: "Back to the main site", eyebrow: "The fifth Wroc-love product", title: "Lower Silesia excursions", lead: "Independent day trips from Wrocław to Lower Silesia’s most distinctive places.", duration: "Full day", starts: "Starts in Wrocław", region: "Lower Silesia", mapTitle: "Excursion map", routeButton: "Open the route in Google Maps", itineraryTitle: "Suggested order", placesTitle: "Key places", whyTitle: "Why combine them?", forWhomTitle: "Who is it for?", practicalTitle: "Before you go", website: "Official website", navigate: "Navigate", facebook: "Facebook", instagram: "Instagram", travelTitle: "Travel times", communityLine: "By the Wrocław & Lower Silesia community", facebookGroup: "Facebook group", facebookPage: "Business page", instagramFooter: "Instagram" },
    pl: { brandLine: "Odkrywaj region przez właściwe miejsca", homeReturn: "Wróć do strony głównej", eyebrow: "Piąty produkt Wroc-love", title: "Wycieczki po Dolnym Śląsku", lead: "Samodzielne wycieczki z Wrocławia do wyjątkowych miejsc Dolnego Śląska.", duration: "Cały dzień", starts: "Start we Wrocławiu", region: "Dolny Śląsk", mapTitle: "Mapa wycieczki", routeButton: "Otwórz trasę w Google Maps", itineraryTitle: "Proponowana kolejność", placesTitle: "Najważniejsze miejsca", whyTitle: "Dlaczego warto je połączyć?", forWhomTitle: "Dla kogo?", practicalTitle: "Przed wyjazdem", website: "Oficjalna strona", navigate: "Nawigacja", facebook: "Facebook", instagram: "Instagram", travelTitle: "Czasy przejazdu", communityLine: "Od społeczności Wrocław & Dolny Śląsk", facebookGroup: "Grupa na Facebooku", facebookPage: "Strona firmowa", instagramFooter: "Instagram" },
    de: { brandLine: "Die Region über die richtigen Orte entdecken", homeReturn: "Zurück zur Hauptseite", eyebrow: "Das fünfte Wroc-love-Produkt", title: "Ausflüge in Niederschlesien", lead: "Individuelle Tagesausflüge von Wrocław zu besonderen Orten in Niederschlesien.", duration: "Ganzer Tag", starts: "Start in Wrocław", region: "Niederschlesien", mapTitle: "Ausflugskarte", routeButton: "Route in Google Maps öffnen", itineraryTitle: "Empfohlene Reihenfolge", placesTitle: "Die wichtigsten Orte", whyTitle: "Warum diese Kombination?", forWhomTitle: "Für wen geeignet?", practicalTitle: "Vor der Abfahrt", website: "Offizielle Website", navigate: "Navigation", facebook: "Facebook", instagram: "Instagram", travelTitle: "Fahrzeiten", communityLine: "Von der Wrocław & Lower Silesia Community", facebookGroup: "Facebook-Gruppe", facebookPage: "Unternehmensseite", instagramFooter: "Instagram" },
    cs: { brandLine: "Objevujte region prostřednictvím správných míst", homeReturn: "Zpět na hlavní stránku", eyebrow: "Pátý produkt Wroc-love", title: "Výlety po Dolním Slezsku", lead: "Samostatné jednodenní výlety z Vratislavi na výjimečná místa Dolního Slezska.", duration: "Celý den", starts: "Start ve Vratislavi", region: "Dolní Slezsko", mapTitle: "Mapa výletu", routeButton: "Otevřít trasu v Google Maps", itineraryTitle: "Doporučené pořadí", placesTitle: "Hlavní místa", whyTitle: "Proč je spojit?", forWhomTitle: "Pro koho je výlet?", practicalTitle: "Před cestou", website: "Oficiální web", navigate: "Navigace", facebook: "Facebook", instagram: "Instagram", travelTitle: "Jízdní doby", communityLine: "Od komunity Wrocław & Dolní Slezsko", facebookGroup: "Skupina na Facebooku", facebookPage: "Firemní stránka", instagramFooter: "Instagram" }
  };

  function tr(key) { return ui[language]?.[key] || ui.en[key] || key; }
  function local(value) { return value?.[language] || value?.en || value?.he || ""; }
  function place(id) { return window.WROC_CATALOG?.getPlace?.(id) || window.WROC_CATALOG?.places?.[id]; }
  function coords(point) {
    if (point.coordinates) return point.coordinates;
    const canonical = place(point.canonicalPlaceId);
    return canonical?.location?.coordinates || canonical?.coordinates;
  }
  function safeLink(value) { return typeof value === "string" && /^https?:\/\//.test(value) ? value : ""; }

  function hero(excursion) {
    const canonical = place(excursion.heroMedia.canonicalPlaceId);
    return canonical?.media?.photos?.[excursion.heroMedia.photoIndex] || "";
  }

  function renderHero(excursion) {
    document.querySelectorAll("[data-excursion-title]").forEach((element) => { element.textContent = local(excursion.title); });
    document.querySelector("[data-excursion-summary]").textContent = local(excursion.summary);
    document.querySelector("[data-excursion-hero]").src = hero(excursion);
    document.querySelector("[data-route-link]").href = excursion.navigation.googleMaps;
    document.querySelector("[data-excursion-meta]").innerHTML = [tr("duration"), tr("starts"), tr("region")].map((value) => `<span>${value}</span>`).join("");
  }

  function renderMap(excursion) {
    if (!window.L) return;
    if (map) map.remove();
    map = L.map("excursion-map", { scrollWheelZoom: false });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: "&copy; OpenStreetMap contributors" }).addTo(map);
    const route = excursion.routePoints.map(coords).filter(Boolean).map(({ lat, lng }) => [lat, lng]);
    L.polyline(route, { color: "#2578bd", weight: 4, dashArray: "8 8" }).addTo(map);
    excursion.routePoints.slice(0, -1).forEach((point, index) => {
      const coordinate = coords(point);
      if (!coordinate) return;
      const canonical = point.canonicalPlaceId ? place(point.canonicalPlaceId) : null;
      const label = canonical ? local(canonical.name) : local(point.label);
      L.marker([coordinate.lat, coordinate.lng], { icon: L.divIcon({ className: "route-marker", html: `<span>${index + 1}</span>`, iconSize: [42, 50], iconAnchor: [21, 48] }) }).addTo(map).bindPopup(`<strong>${label}</strong>`);
    });
    map.fitBounds(route, { padding: [30, 30] });
  }

  function renderSteps(excursion) {
    document.querySelector("[data-itinerary]").innerHTML = excursion.steps.map((step, index) => `<li><span>${index + 1}</span><div><strong>${local(step.title)}</strong><small>${local(step.duration)}</small></div></li>`).join("");
    document.querySelector("[data-travel-note]").textContent = local(excursion.travel.note);
  }

  function actionLinks(canonical) {
    const links = [];
    const website = safeLink(canonical.links?.website);
    const navigation = safeLink(canonical.links?.navigation?.googleMaps || canonical.links?.navigation?.google || canonical.links?.googleMaps || canonical.navigationLinks?.google);
    const socialPosts = Array.isArray(canonical.socialPosts) ? canonical.socialPosts : [];
    const facebook = safeLink(canonical.social?.facebook || socialPosts.find((item) => item.platform === "facebook")?.url || canonical.socialPosts?.facebook?.[0] || canonical.socialPosts?.facebook);
    const instagram = safeLink(canonical.social?.instagram || socialPosts.find((item) => item.platform === "instagram")?.url || canonical.socialPosts?.instagram?.[0] || canonical.socialPosts?.instagram);
    if (website) links.push(`<a href="${website}" target="_blank" rel="noopener">${tr("website")}</a>`);
    if (navigation) links.push(`<a href="${navigation}" target="_blank" rel="noopener">${tr("navigate")}</a>`);
    if (facebook) links.push(`<a href="${facebook}" target="_blank" rel="noopener">${tr("facebook")}</a>`);
    if (instagram) links.push(`<a href="${instagram}" target="_blank" rel="noopener">${tr("instagram")}</a>`);
    return links.join("");
  }

  function renderPlaces(excursion) {
    document.querySelector("[data-places]").innerHTML = excursion.canonicalPlaceIds.map((id) => {
      const canonical = place(id);
      if (!canonical) return "";
      const photos = (canonical.media?.photos || []).slice(0, 4);
      return `<article class="place-card"><img class="place-cover" src="${photos[0] || ""}" alt="${local(canonical.name)}"><div class="place-copy"><h3>${local(canonical.name)}</h3><p>${local(canonical.description)}</p><div class="photo-strip">${photos.slice(1).map((photo) => `<img src="${photo}" alt="">`).join("")}</div><div class="place-actions">${actionLinks(canonical)}</div></div></article>`;
    }).join("");
  }

  function renderEditorial(excursion) {
    document.querySelector("[data-why]").textContent = local(excursion.editorial.why);
    document.querySelector("[data-for-whom]").textContent = local(excursion.editorial.forWhom);
    document.querySelector("[data-practical]").textContent = local(excursion.editorial.practical);
  }

  function render() {
    const product = window.WROC_LOWER_SILESIA_EXCURSIONS;
    const excursion = product?.excursions?.[0];
    if (!excursion) return;
    renderHero(excursion); renderMap(excursion); renderSteps(excursion); renderPlaces(excursion); renderEditorial(excursion);
  }

  function applyLanguage(next = language) {
    language = supported.includes(next) ? next : "he";
    document.documentElement.lang = language;
    document.documentElement.dir = language === "he" ? "rtl" : "ltr";
    localStorage.setItem("wroclaw24-language", language);
    document.title = `${tr("title")} | Wroc-love`;
    document.querySelectorAll("[data-i18n]").forEach((element) => { element.textContent = tr(element.dataset.i18n); });
    document.querySelectorAll("[data-lang]").forEach((button) => button.classList.toggle("active", button.dataset.lang === language));
    document.querySelectorAll("[data-home-link]").forEach((link) => { link.href = `/?lang=${language}`; });
    const url = new URL(location.href); url.searchParams.set("lang", language); history.replaceState(null, "", url);
    render();
  }

  document.querySelectorAll("[data-lang]").forEach((button) => button.addEventListener("click", () => applyLanguage(button.dataset.lang)));
  applyLanguage();
})();
