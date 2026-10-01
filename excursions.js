(function () {
  "use strict";

  const supported = ["he", "en", "pl", "de", "cs"];
  const params = new URLSearchParams(window.location.search);
  const saved = localStorage.getItem("wroclaw24-language");
  let language = supported.includes(params.get("lang")) ? params.get("lang") : supported.includes(saved) ? saved : "he";
  let map;
  let walkingMap;
  let previewIndex = 0;
  let previewInitialized = false;
  let previewTimer;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const placeAmenities = window.WROC_PLACE_AMENITIES;

  const ui = {
    he: { brandLine: "מגלים את האזור דרך המקומות הנכונים", homeReturn: "חזרה לאתר הראשי", eyebrow: "המוצר החמישי של Wroc-love", title: "טיולי יום מוורוצלב", lead: "טיולי יום עצמאיים מוורוצלב אל יעדים באזור ובמחוזות השכנים.", duration: "יום מלא", starts: "יציאה מוורוצלב", region: "שלזיה התחתית", mapTitle: "מפת הטיול", routeButton: "פתחו את המסלול ב־Google Maps", itineraryTitle: "סדר היום המומלץ", placesTitle: "המקומות המרכזיים", whyTitle: "למה לשלב אותם?", forWhomTitle: "למי הטיול מתאים?", practicalTitle: "לפני שיוצאים", website: "אתר רשמי", navigate: "ניווט", facebook: "פייסבוק", instagram: "אינסטגרם", travelTitle: "זמני נסיעה", communityLine: "מבית קהילת Wrocław & Lower Silesia", facebookGroup: "קבוצת הפייסבוק", facebookPage: "הדף העסקי", instagramFooter: "אינסטגרם" },
    en: { brandLine: "Discover the region through the right places", homeReturn: "Back to the main site", eyebrow: "The fifth Wroc-love product", title: "Day trips from Wrocław", lead: "Independent day trips from Wrocław to the region and neighbouring provinces.", duration: "Full day", starts: "Starts in Wrocław", region: "Lower Silesia", mapTitle: "Excursion map", routeButton: "Open the route in Google Maps", itineraryTitle: "Suggested order", placesTitle: "Key places", whyTitle: "Why combine them?", forWhomTitle: "Who is it for?", practicalTitle: "Before you go", website: "Official website", navigate: "Navigate", facebook: "Facebook", instagram: "Instagram", travelTitle: "Travel times", communityLine: "By the Wrocław & Lower Silesia community", facebookGroup: "Facebook group", facebookPage: "Business page", instagramFooter: "Instagram" },
    pl: { brandLine: "Odkrywaj region przez właściwe miejsca", homeReturn: "Wróć do strony głównej", eyebrow: "Piąty produkt Wroc-love", title: "Wycieczki jednodniowe z Wrocławia", lead: "Samodzielne wycieczki z Wrocławia po regionie i sąsiednich województwach.", duration: "Cały dzień", starts: "Start we Wrocławiu", region: "Dolny Śląsk", mapTitle: "Mapa wycieczki", routeButton: "Otwórz trasę w Google Maps", itineraryTitle: "Proponowana kolejność", placesTitle: "Najważniejsze miejsca", whyTitle: "Dlaczego warto je połączyć?", forWhomTitle: "Dla kogo?", practicalTitle: "Przed wyjazdem", website: "Oficjalna strona", navigate: "Nawigacja", facebook: "Facebook", instagram: "Instagram", travelTitle: "Czasy przejazdu", communityLine: "Od społeczności Wrocław & Dolny Śląsk", facebookGroup: "Grupa na Facebooku", facebookPage: "Strona firmowa", instagramFooter: "Instagram" },
    de: { brandLine: "Die Region über die richtigen Orte entdecken", homeReturn: "Zurück zur Hauptseite", eyebrow: "Das fünfte Wroc-love-Produkt", title: "Tagesausflüge ab Wrocław", lead: "Individuelle Tagesausflüge von Wrocław in die Region und benachbarte Woiwodschaften.", duration: "Ganzer Tag", starts: "Start in Wrocław", region: "Niederschlesien", mapTitle: "Ausflugskarte", routeButton: "Route in Google Maps öffnen", itineraryTitle: "Empfohlene Reihenfolge", placesTitle: "Die wichtigsten Orte", whyTitle: "Warum diese Kombination?", forWhomTitle: "Für wen geeignet?", practicalTitle: "Vor der Abfahrt", website: "Offizielle Website", navigate: "Navigation", facebook: "Facebook", instagram: "Instagram", travelTitle: "Fahrzeiten", communityLine: "Von der Wrocław & Lower Silesia Community", facebookGroup: "Facebook-Gruppe", facebookPage: "Unternehmensseite", instagramFooter: "Instagram" },
    cs: { brandLine: "Objevujte region prostřednictvím správných míst", homeReturn: "Zpět na hlavní stránku", eyebrow: "Pátý produkt Wroc-love", title: "Jednodenní výlety z Vratislavi", lead: "Samostatné jednodenní výlety z Vratislavi po regionu a sousedních vojvodstvích.", duration: "Celý den", starts: "Start ve Vratislavi", region: "Dolní Slezsko", mapTitle: "Mapa výletu", routeButton: "Otevřít trasu v Google Maps", itineraryTitle: "Doporučené pořadí", placesTitle: "Hlavní místa", whyTitle: "Proč je spojit?", forWhomTitle: "Pro koho je výlet?", practicalTitle: "Před cestou", website: "Oficiální web", navigate: "Navigace", facebook: "Facebook", instagram: "Instagram", travelTitle: "Jízdní doby", communityLine: "Od komunity Wrocław & Dolní Slezsko", facebookGroup: "Skupina na Facebooku", facebookPage: "Firemní stránka", instagramFooter: "Instagram" }
  };

  const logisticsUi = {
    he: { transport: "דרכי הגעה", accessibility: "נגישות", partial: "נגישות חלקית — מומלץ לבדוק מראש מול האתר או המפעיל." },
    en: { transport: "Getting there", accessibility: "Accessibility", partial: "Partly accessible — confirm current conditions with the venue or operator." },
    pl: { transport: "Dojazd", accessibility: "Dostępność", partial: "Częściowa dostępność — sprawdź aktualne warunki u obiektu lub przewoźnika." },
    de: { transport: "Anreise", accessibility: "Barrierefreiheit", partial: "Teilweise zugänglich — aktuelle Bedingungen bitte beim Ort oder Betreiber prüfen." },
    cs: { transport: "Doprava", accessibility: "Přístupnost", partial: "Částečně přístupné — ověřte aktuální podmínky u místa nebo dopravce." }
  };

  const tripUi = {
    he: { select: "בחרו טיול", previous: "טיול קודם", next: "טיול הבא", view: "הציגו מסלול", carousel: "מסלולי טיול יום", opole: "מחוז אופולה", walk: "מסלול הליכה בברז׳ג", walkingDirections: "ניווט להליכה", approximate: "נקודות המשנה מסומנות בקירוב. עקבו אחרי שבילי ההליכה והניווט המקומי." },
    en: { select: "Choose a trip", previous: "Previous trip", next: "Next trip", view: "View trip", carousel: "Day trip routes", opole: "Opole Voivodeship", walk: "Brzeg walking route", walkingDirections: "Walking directions", approximate: "Minor waypoints are approximate. Follow local paths and navigation." },
    pl: { select: "Wybierz wycieczkę", previous: "Poprzednia wycieczka", next: "Następna wycieczka", view: "Zobacz trasę", carousel: "Trasy jednodniowe", opole: "Województwo opolskie", walk: "Trasa piesza w Brzegu", walkingDirections: "Trasa piesza", approximate: "Mniejsze punkty są orientacyjne. Korzystaj ze ścieżek i lokalnej nawigacji." },
    de: { select: "Ausflug wählen", previous: "Vorheriger Ausflug", next: "Nächster Ausflug", view: "Ausflug ansehen", carousel: "Tagesausflüge", opole: "Woiwodschaft Opole", walk: "Spaziergang durch Brzeg", walkingDirections: "Fußweg öffnen", approximate: "Kleinere Punkte sind ungefähr verortet. Folgen Sie den Wegen und der Navigation vor Ort." },
    cs: { select: "Vyberte výlet", previous: "Předchozí výlet", next: "Další výlet", view: "Zobrazit výlet", carousel: "Jednodenní výlety", opole: "Opolské vojvodství", walk: "Pěší trasa v Brzegu", walkingDirections: "Pěší navigace", approximate: "Menší body jsou orientační. Sledujte místní cesty a navigaci." },
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
  function trackPlaceOpen(canonical) {
    if (canonical) window.WROC_ANALYTICS?.track("place_open", { canonical_place_id: canonical.id });
  }

  function hero(excursion) {
    const canonical = place(excursion.heroMedia.canonicalPlaceId);
    return canonical?.media?.photos?.[excursion.heroMedia.photoIndex] || "";
  }

  function renderHero(excursion) {
    document.querySelectorAll("[data-excursion-title]").forEach((element) => { element.textContent = local(excursion.title); });
    document.querySelector("[data-route-link]").href = excursion.navigation.googleMaps;
    document.querySelector("[data-excursion-meta]").innerHTML = [tr("duration"), tr("starts"), excursion.meta.region === "opole" ? tripUi[language].opole : tr("region")].map((value) => `<span>${value}</span>`).join("");
  }

  function renderPreview() {
    const excursions = window.WROC_LOWER_SILESIA_EXCURSIONS.excursions;
    const excursion = excursions[previewIndex];
    const carousel = document.querySelector("[data-excursion-carousel]");
    const link = document.querySelector("[data-excursion-preview-link]");
    carousel.setAttribute("aria-label", tripUi[language].carousel);
    link.href = `?lang=${language}&trip=${encodeURIComponent(excursion.id)}`;
    link.setAttribute("aria-label", `${tripUi[language].view}: ${local(excursion.title)}`);
    document.querySelector("[data-excursion-hero]").src = hero(excursion);
    document.querySelector("[data-excursion-preview-title]").textContent = local(excursion.title);
    document.querySelector("[data-excursion-summary]").textContent = local(excursion.summary);
    document.querySelector("[data-excursion-position]").textContent = `${previewIndex + 1} / ${excursions.length}`;
    document.querySelector("[data-excursion-previous]").setAttribute("aria-label", tripUi[language].previous);
    document.querySelector("[data-excursion-next]").setAttribute("aria-label", tripUi[language].next);
  }

  function stopPreview() { clearInterval(previewTimer); previewTimer = undefined; }
  function startPreview() {
    stopPreview();
    const carousel = document.querySelector("[data-excursion-carousel]");
    if (reducedMotion.matches || document.hidden || carousel.matches(":hover") || carousel.contains(document.activeElement)) return;
    if (window.WROC_LOWER_SILESIA_EXCURSIONS.excursions.length < 2) return;
    previewTimer = setInterval(() => { previewIndex = (previewIndex + 1) % window.WROC_LOWER_SILESIA_EXCURSIONS.excursions.length; renderPreview(); }, 6000);
  }

  function movePreview(direction) {
    const count = window.WROC_LOWER_SILESIA_EXCURSIONS.excursions.length;
    previewIndex = (previewIndex + direction + count) % count;
    renderPreview();
    startPreview();
  }

  function selectedExcursion() {
    const excursions = window.WROC_LOWER_SILESIA_EXCURSIONS?.excursions || [];
    return excursions.find((item) => item.id === new URLSearchParams(location.search).get("trip")) || excursions[0];
  }

  function renderTripList() {
    const product = window.WROC_LOWER_SILESIA_EXCURSIONS;
    const selected = selectedExcursion();
    document.querySelector("[data-trip-list-title]").textContent = tripUi[language].select;
    document.querySelector("[data-trip-list]").innerHTML = product.excursions.map((item) => {
      const photo = hero(item);
      const href = `?lang=${language}&trip=${encodeURIComponent(item.id)}`;
      return `<a class="trip-card ${item.id === selected.id ? "active" : ""}" href="${href}" ${item.id === selected.id ? 'aria-current="page"' : ""}><img src="${photo}" alt=""><span><strong>${local(item.title)}</strong><small>${local(item.summary)}</small></span></a>`;
    }).join("");
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
      L.marker([coordinate.lat, coordinate.lng], { icon: L.divIcon({ className: "route-marker", html: `<span>${index + 1}</span>${placeAmenities.markerBadgeHtml(canonical, language)}`, iconSize: [42, 50], iconAnchor: [21, 48] }) }).addTo(map).bindPopup(`<strong>${label}</strong>${placeAmenities.labelBadgeHtml(canonical, language)}${canonical ? window.WROC_GUIDE_VIDEO?.button(canonical.id, language) || "" : ""}`).on("popupopen", () => trackPlaceOpen(canonical));
    });
    map.fitBounds(route, { padding: [30, 30] });
  }

  function renderWalkingRoute(excursion) {
    const section = document.querySelector("[data-walking-route]");
    section.hidden = !excursion.walkingRoute;
    if (walkingMap) { walkingMap.remove(); walkingMap = null; }
    if (!excursion.walkingRoute) return;
    document.querySelector("[data-walk-title]").textContent = tripUi[language].walk;
    document.querySelector("[data-walk-link]").textContent = tripUi[language].walkingDirections;
    document.querySelector("[data-walk-link]").href = excursion.walkingRoute.navigation.googleMaps;
    document.querySelector("[data-walk-note]").textContent = tripUi[language].approximate;
    document.querySelector("[data-walk-stops]").innerHTML = excursion.walkingRoute.points.map((point) => {
      const canonical = point.canonicalPlaceId ? place(point.canonicalPlaceId) : null;
      const label = canonical ? local(canonical.name) : local(point.label);
      return `<li><strong>${point.id}</strong><span>${label}</span></li>`;
    }).join("");
    if (!window.L) return;
    const points = excursion.walkingRoute.points;
    const line = points.map(coords).filter(Boolean).map(({ lat, lng }) => [lat, lng]);
    walkingMap = L.map("brzeg-walk-map", { scrollWheelZoom: false });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: "&copy; OpenStreetMap contributors" }).addTo(walkingMap);
    L.polyline(line, { color: "#c55b2f", weight: 5 }).addTo(walkingMap);
    points.forEach((point) => {
      const coordinate = coords(point);
      if (!coordinate) return;
      const canonical = point.canonicalPlaceId ? place(point.canonicalPlaceId) : null;
      const label = canonical ? local(canonical.name) : local(point.label);
      L.marker([coordinate.lat, coordinate.lng], { icon: L.divIcon({ className: "walk-marker", html: `<span>${point.id}</span>`, iconSize: [30, 30] }) }).addTo(walkingMap).bindPopup(`<strong>${point.id} — ${label}</strong>${canonical ? window.WROC_GUIDE_VIDEO?.button(canonical.id, language) || "" : ""}`).on("popupopen", () => trackPlaceOpen(canonical));
    });
    walkingMap.fitBounds(line, { padding: [25, 25] });
  }

  function renderSteps(excursion) {
    document.querySelector("[data-itinerary]").innerHTML = excursion.steps.map((step, index) => `<li><span>${index + 1}</span><div><strong>${local(step.title)}</strong><small>${local(step.duration)}</small></div></li>`).join("");
    document.querySelector("[data-travel-note]").textContent = local(excursion.travel.note);
  }

  function renderLogistics(excursion) {
    const labels = logisticsUi[language] || logisticsUi.en;
    document.querySelector("[data-logistics-title]").textContent = labels.transport;
    document.querySelector("[data-accessibility-title]").textContent = labels.accessibility;
    document.querySelector("[data-transport-options]").innerHTML = (excursion.travel.options || []).map((option) => `<article><strong>${local(option.title)}</strong><p>${local(option.description)}</p></article>`).join("");
    document.querySelector("[data-accessibility]").innerHTML = (excursion.travel.accessibility || []).map((item) => {
      const canonical = item.canonicalPlaceId ? place(item.canonicalPlaceId) : null;
      const label = canonical ? local(canonical.name) : local(item.label);
      const notes = canonical ? local(canonical.suitability?.accessibility?.notes) : labels.partial;
      return `<article><strong>${label}</strong><p>${notes || labels.partial}</p></article>`;
    }).join("");
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
    links.push(window.WROC_GUIDE_VIDEO?.button(canonical.id, language) || "");
    return links.join("");
  }

  function renderPlaces(excursion) {
    document.querySelector("[data-places]").innerHTML = excursion.canonicalPlaceIds.map((id) => {
      const canonical = place(id);
      if (!canonical) return "";
      const photos = (canonical.media?.photos || []).slice(0, 4);
      const cover = photos[0] ? `<img class="place-cover" src="${photos[0]}" alt="${local(canonical.name)}">` : "";
      const video = canonical.media?.videos?.[0] ? window.WROC_YOUTUBE_VIDEO.html(canonical.media.videos[0], local(canonical.name), language) : "";
      return `<article class="place-card" data-canonical-place-id="${id}">${cover}<div class="place-copy"><h3>${local(canonical.name)}</h3>${placeAmenities.labelBadgeHtml(canonical, language)}<p>${local(canonical.description)}</p><div class="photo-strip">${photos.slice(1).map((photo) => `<img src="${photo}" alt="">`).join("")}</div>${video}<div class="place-actions">${actionLinks(canonical)}</div></div></article>`;
    }).join("");
  }

  function renderEditorial(excursion) {
    document.querySelector("[data-why]").textContent = local(excursion.editorial.why);
    document.querySelector("[data-for-whom]").textContent = local(excursion.editorial.forWhom);
    document.querySelector("[data-practical]").textContent = local(excursion.editorial.practical);
  }

  function render() {
    const product = window.WROC_LOWER_SILESIA_EXCURSIONS;
    const excursion = selectedExcursion();
    if (!excursion) return;
    if (!previewInitialized) { previewIndex = product.excursions.indexOf(excursion); previewInitialized = true; }
    renderTripList(); renderHero(excursion); renderPreview(); renderMap(excursion); renderWalkingRoute(excursion); renderSteps(excursion); renderLogistics(excursion); renderPlaces(excursion); renderEditorial(excursion);
    startPreview();
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
  document.querySelector("[data-excursion-previous]").addEventListener("click", () => movePreview(-1));
  document.querySelector("[data-excursion-next]").addEventListener("click", () => movePreview(1));
  const carousel = document.querySelector("[data-excursion-carousel]");
  carousel.addEventListener("mouseenter", stopPreview);
  carousel.addEventListener("mouseleave", startPreview);
  carousel.addEventListener("focusin", stopPreview);
  carousel.addEventListener("focusout", () => setTimeout(startPreview, 0));
  document.addEventListener("visibilitychange", startPreview);
  reducedMotion.addEventListener("change", startPreview);
  applyLanguage();
})();
