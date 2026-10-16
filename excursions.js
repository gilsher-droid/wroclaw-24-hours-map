(function () {
  "use strict";

  const supported = ["he", "en", "pl", "de", "cs"];
  const params = new URLSearchParams(window.location.search);
  const saved = localStorage.getItem("wroclaw24-language");
  let language = supported.includes(params.get("lang")) ? params.get("lang") : supported.includes(saved) ? saved : "he";
  let map;
  let walkingMap;
  const mapStops = new Map();
  let previewIndex = 0;
  let previewInitialized = false;
  let previewTimer;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const placeAmenities = window.WROC_PLACE_AMENITIES;

  const ui = {
    he: { brandLine: "מגלים את האזור דרך המקומות הנכונים", homeReturn: "חזרה לאתר הראשי", eyebrow: "המפה החמישית של Wroc-love", title: "טיולי יום מוורוצלב", lead: "טיולי יום עצמאיים מוורוצלב אל יעדים באזור ובמחוזות השכנים.", duration: "יום מלא", starts: "יציאה מוורוצלב", region: "שלזיה התחתית", mapTitle: "מפת הטיול", routeButton: "פתחו את המסלול ב־Google Maps", itineraryTitle: "סדר היום המומלץ", placesTitle: "המקומות המרכזיים", whyTitle: "למה לשלב אותם?", forWhomTitle: "למי הטיול מתאים?", practicalTitle: "לפני שיוצאים", website: "אתר רשמי", navigate: "ניווט", facebook: "פייסבוק", instagram: "אינסטגרם", travelTitle: "זמני נסיעה", communityLine: "מבית קהילת Wrocław & Lower Silesia", facebookGroup: "קבוצת הפייסבוק", facebookPage: "הדף העסקי", instagramFooter: "אינסטגרם" },
    en: { brandLine: "Discover the region through the right places", homeReturn: "Back to the main site", eyebrow: "The fifth Wroc-love map", title: "Day trips from Wrocław", lead: "Independent day trips from Wrocław to the region and neighbouring provinces.", duration: "Full day", starts: "Starts in Wrocław", region: "Lower Silesia", mapTitle: "Excursion map", routeButton: "Open the route in Google Maps", itineraryTitle: "Suggested order", placesTitle: "Key places", whyTitle: "Why combine them?", forWhomTitle: "Who is it for?", practicalTitle: "Before you go", website: "Official website", navigate: "Navigate", facebook: "Facebook", instagram: "Instagram", travelTitle: "Travel times", communityLine: "By the Wrocław & Lower Silesia community", facebookGroup: "Facebook group", facebookPage: "Business page", instagramFooter: "Instagram" },
    pl: { brandLine: "Odkrywaj region przez właściwe miejsca", homeReturn: "Wróć do strony głównej", eyebrow: "Piąta mapa Wroc-love", title: "Wycieczki jednodniowe z Wrocławia", lead: "Samodzielne wycieczki z Wrocławia po regionie i sąsiednich województwach.", duration: "Cały dzień", starts: "Start we Wrocławiu", region: "Dolny Śląsk", mapTitle: "Mapa wycieczki", routeButton: "Otwórz trasę w Google Maps", itineraryTitle: "Proponowana kolejność", placesTitle: "Najważniejsze miejsca", whyTitle: "Dlaczego warto je połączyć?", forWhomTitle: "Dla kogo?", practicalTitle: "Przed wyjazdem", website: "Oficjalna strona", navigate: "Nawigacja", facebook: "Facebook", instagram: "Instagram", travelTitle: "Czasy przejazdu", communityLine: "Od społeczności Wrocław & Dolny Śląsk", facebookGroup: "Grupa na Facebooku", facebookPage: "Strona firmowa", instagramFooter: "Instagram" },
    de: { brandLine: "Die Region über die richtigen Orte entdecken", homeReturn: "Zurück zur Hauptseite", eyebrow: "Die fünfte Wroc-love-Karte", title: "Tagesausflüge ab Wrocław", lead: "Individuelle Tagesausflüge von Wrocław in die Region und benachbarte Woiwodschaften.", duration: "Ganzer Tag", starts: "Start in Wrocław", region: "Niederschlesien", mapTitle: "Ausflugskarte", routeButton: "Route in Google Maps öffnen", itineraryTitle: "Empfohlene Reihenfolge", placesTitle: "Die wichtigsten Orte", whyTitle: "Warum diese Kombination?", forWhomTitle: "Für wen geeignet?", practicalTitle: "Vor der Abfahrt", website: "Offizielle Website", navigate: "Navigation", facebook: "Facebook", instagram: "Instagram", travelTitle: "Fahrzeiten", communityLine: "Von der Wrocław & Lower Silesia Community", facebookGroup: "Facebook-Gruppe", facebookPage: "Unternehmensseite", instagramFooter: "Instagram" },
    cs: { brandLine: "Objevujte region prostřednictvím správných míst", homeReturn: "Zpět na hlavní stránku", eyebrow: "Pátá mapa Wroc-love", title: "Jednodenní výlety z Vratislavi", lead: "Samostatné jednodenní výlety z Vratislavi po regionu a sousedních vojvodstvích.", duration: "Celý den", starts: "Start ve Vratislavi", region: "Dolní Slezsko", mapTitle: "Mapa výletu", routeButton: "Otevřít trasu v Google Maps", itineraryTitle: "Doporučené pořadí", placesTitle: "Hlavní místa", whyTitle: "Proč je spojit?", forWhomTitle: "Pro koho je výlet?", practicalTitle: "Před cestou", website: "Oficiální web", navigate: "Navigace", facebook: "Facebook", instagram: "Instagram", travelTitle: "Jízdní doby", communityLine: "Od komunity Wrocław & Dolní Slezsko", facebookGroup: "Skupina na Facebooku", facebookPage: "Firemní stránka", instagramFooter: "Instagram" }
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

  const placeDetailsLabels = {he:"לכרטיס המקום המלא",en:"Full place details",pl:"Pełne informacje o miejscu",de:"Alle Informationen zum Ort",cs:"Podrobnosti o místě"};
  const mapFocusLabels = {
    he: {show:"הצגה במפה",overview:"המסלול כולו",walk:"מבט על מסלול ההליכה"},
    en: {show:"Show on map",overview:"Full route",walk:"Walking route overview"},
    pl: {show:"Pokaż na mapie",overview:"Cała trasa",walk:"Widok trasy pieszej"},
    de: {show:"Auf der Karte zeigen",overview:"Gesamte Route",walk:"Übersicht des Spaziergangs"},
    cs: {show:"Zobrazit na mapě",overview:"Celá trasa",walk:"Přehled pěší trasy"}
  };
  function focusMapButton(attributes) { return `<button type="button" class="show-on-map" ${attributes}>${mapFocusLabels[language].show}</button>`; }
  function registerMapStop(key, targetMap, marker, coordinate, canonical, label, containerId) {
    const stop = {targetMap,marker,coordinate,canonical,label,containerId};
    mapStops.set(key,stop);
    if (canonical && !mapStops.has(`place:${canonical.id}`)) mapStops.set(`place:${canonical.id}`,stop);
  }
  function bringMapIntoView(targetMap, containerId) {
    const element = document.getElementById(containerId);
    element.setAttribute("tabindex","-1");
    element.scrollIntoView({behavior:reducedMotion.matches ? "auto" : "smooth",block:"center"});
    element.focus({preventScroll:true});
    targetMap.invalidateSize();
  }
  function focusMapPlace(placeId, pointId) {
    let stop = mapStops.get(placeId ? `place:${placeId}` : pointId);
    if (!stop && pointId === "wroclaw-return") stop = mapStops.get("wroclaw-start");
    if (!stop && placeId) {
      const canonical = place(placeId), coordinate = canonical?.location?.coordinates || canonical?.coordinates;
      if (coordinate) stop = {targetMap:map,coordinate,canonical,label:local(canonical.name),containerId:"excursion-map"};
    }
    if (!stop) return;
    bringMapIntoView(stop.targetMap,stop.containerId);
    stop.targetMap.setView([stop.coordinate.lat,stop.coordinate.lng],stop.containerId === "brzeg-walk-map" ? 17 : 15,{animate:false});
    if (stop.marker) stop.marker.openPopup();
    else L.popup({maxWidth:320}).setLatLng([stop.coordinate.lat,stop.coordinate.lng]).setContent(placePopup(stop.canonical,stop.label,stop.coordinate)).openOn(stop.targetMap);
  }
  function showMapOverview(walking = false) {
    const excursion = selectedExcursion(), targetMap = walking ? walkingMap : map;
    const points = walking ? excursion.walkingRoute?.points : excursion.routePoints;
    if (!targetMap || !points) return;
    bringMapIntoView(targetMap,walking ? "brzeg-walk-map" : "excursion-map");
    targetMap.closePopup();
    targetMap.fitBounds(points.map(coords).filter(Boolean).map(p=>[p.lat,p.lng]),{padding:[30,30],animate:false});
  }
  function escapeHtml(value) { return String(value || "").replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char])); }
  function placePopup(canonical, label, coordinate) {
    const actions = canonical ? actionLinks(canonical, false) : `<a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${coordinate.lat},${coordinate.lng}`)}" target="_blank" rel="noopener">${tr("navigate")}</a>`;
    const details = canonical && selectedExcursion().canonicalPlaceIds.includes(canonical.id) ? `<a class="excursion-place-details" href="#excursion-place-${escapeHtml(canonical.id)}">${placeDetailsLabels[language]}</a>` : "";
    return `<div class="excursion-place-popup" dir="${language === "he" ? "rtl" : "ltr"}">${window.WROC_PLACE_POPUP_PHOTO.html(canonical,language).replace('class="place-popup-photo-link"', `class="place-popup-photo-link" data-place-gallery="${escapeHtml(canonical?.id)}" data-media-kind="photos"`)}<strong>${escapeHtml(label)}</strong>${placeAmenities.labelBadgeHtml(canonical, language)}<div class="place-actions">${actions}${canonical ? mediaButtons(canonical) : ""}</div>${details}</div>`;
  }

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
    if (new URLSearchParams(location.search).has("trip")) return;
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
    mapStops.clear();
    map = L.map("excursion-map", { scrollWheelZoom: false });
    window.WROC_GUIDE_VIDEO.legend(map, language);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: "&copy; OpenStreetMap contributors" }).addTo(map);
    const route = excursion.routePoints.map(coords).filter(Boolean).map(({ lat, lng }) => [lat, lng]);
    L.polyline(route, { color: "#2578bd", weight: 4, dashArray: "8 8" }).addTo(map);
    excursion.routePoints.slice(0, -1).forEach((point, index) => {
      const coordinate = coords(point);
      if (!coordinate) return;
      const canonical = point.canonicalPlaceId ? place(point.canonicalPlaceId) : null;
      const label = canonical ? local(canonical.name) : local(point.label);
      const marker = L.marker([coordinate.lat, coordinate.lng], { icon: L.divIcon(window.WROC_GUIDE_VIDEO.decorateIcon({ className: "route-marker", html: `<span>${index + 1}</span>${placeAmenities.markerBadgeHtml(canonical, language)}`, iconSize: [42, 50], iconAnchor: [21, 48] }, canonical, language)) }).addTo(map).bindPopup(placePopup(canonical, label, coordinate), { maxWidth: 320 }).on("popupopen", () => trackPlaceOpen(canonical));
      registerMapStop(point.id,map,marker,coordinate,canonical,label,"excursion-map");
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
      return `<li><button type="button" class="walk-stop-button" data-map-point="walk:${point.id}" title="${mapFocusLabels[language].show}"><strong>${point.id}</strong><span>${label}</span></button></li>`;
    }).join("");
    if (!window.L) return;
    const points = excursion.walkingRoute.points;
    const line = points.map(coords).filter(Boolean).map(({ lat, lng }) => [lat, lng]);
    walkingMap = L.map("brzeg-walk-map", { scrollWheelZoom: false });
    window.WROC_GUIDE_VIDEO.legend(walkingMap, language);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: "&copy; OpenStreetMap contributors" }).addTo(walkingMap);
    L.polyline(line, { color: "#c55b2f", weight: 5 }).addTo(walkingMap);
    points.forEach((point) => {
      const coordinate = coords(point);
      if (!coordinate) return;
      const canonical = point.canonicalPlaceId ? place(point.canonicalPlaceId) : null;
      const label = canonical ? local(canonical.name) : local(point.label);
      const marker = L.marker([coordinate.lat, coordinate.lng], { icon: L.divIcon(window.WROC_GUIDE_VIDEO.decorateIcon({ className: "walk-marker", html: `<span>${point.id}</span>`, iconSize: [30, 30] }, canonical, language)) }).addTo(walkingMap).bindPopup(placePopup(canonical, `${point.id}. ${label}`, coordinate), { maxWidth: 320 }).on("popupopen", () => trackPlaceOpen(canonical));
      registerMapStop(`walk:${point.id}`,walkingMap,marker,coordinate,canonical,label,"brzeg-walk-map");
    });
    walkingMap.fitBounds(line, { padding: [25, 25] });
  }

  function renderSteps(excursion) {
    document.querySelector("[data-itinerary]").innerHTML = excursion.steps.map((step,index) => {
      const target = step.mapWalkingOverview ? 'data-map-walk-overview' : step.canonicalPlaceId ? `data-map-place="${step.canonicalPlaceId}"` : `data-map-point="${step.mapPointId || step.id}"`;
      return `<li><button type="button" class="itinerary-stop" ${target} title="${mapFocusLabels[language].show}"><span>${index+1}</span><span class="itinerary-stop-copy"><strong>${local(step.title)}</strong><small>${local(step.duration)}</small><span class="map-focus-hint">${mapFocusLabels[language].show}</span></span></button></li>`;
    }).join("");
    document.querySelector("[data-travel-note]").textContent = local(excursion.travel.note);
  }

  function renderLogistics(excursion) {
    const labels = logisticsUi[language] || logisticsUi.en;
    document.querySelector("[data-logistics-title]").textContent = labels.transport;
    document.querySelector("[data-accessibility-title]").textContent = labels.accessibility;
    document.querySelector("[data-accessibility-title]").hidden = !(excursion.travel.accessibility || []).length;
    document.querySelector("[data-accessibility]").hidden = !(excursion.travel.accessibility || []).length;
    document.querySelector("[data-transport-options]").innerHTML = (excursion.travel.options || []).map((option) => `<article><strong>${local(option.title)}</strong><p>${local(option.description)}</p></article>`).join("");
    document.querySelector("[data-accessibility]").innerHTML = (excursion.travel.accessibility || []).map((item) => {
      const canonical = item.canonicalPlaceId ? place(item.canonicalPlaceId) : null;
      const label = canonical ? local(canonical.name) : local(item.label);
      const notes = canonical ? local(canonical.suitability?.accessibility?.notes) : labels.partial;
      return `<article><strong>${label}</strong><p>${notes || labels.partial}</p></article>`;
    }).join("");
  }

  function actionLinks(canonical, includeMapFocus = true) {
    const links = [];
    const website = safeLink(canonical.links?.website);
    const navigation = safeLink(canonical.links?.navigation?.googleMaps || canonical.links?.navigation?.google || canonical.links?.googleMaps || canonical.navigationLinks?.google);
    const facebookPost = window.WROC_CATALOG?.getSocialPost?.(canonical, "facebook", language);
    const instagramPost = window.WROC_CATALOG?.getSocialPost?.(canonical, "instagram", language);
    const facebook = facebookPost?.context !== "language-channel" ? safeLink(facebookPost?.url) : "";
    const instagram = instagramPost?.context !== "language-channel" ? safeLink(instagramPost?.url) : "";
    if (website) links.push(`<a href="${website}" target="_blank" rel="noopener">${tr("website")}</a>`);
    if (navigation) links.push(`<a href="${navigation}" target="_blank" rel="noopener">${tr("navigate")}</a>`);
    if (facebook) links.push(`<a href="${facebook}" target="_blank" rel="noopener">${tr("facebook")}</a>`);
    if (instagram) links.push(`<a href="${instagram}" target="_blank" rel="noopener">${tr("instagram")}</a>`);
    links.push(window.WROC_GUIDE_VIDEO?.button(canonical.id, language) || "");
    if (includeMapFocus && (canonical.location?.coordinates || canonical.coordinates)) links.push(focusMapButton(`data-map-place="${canonical.id}"`));
    return links.join("");
  }

  const mediaLabels = {
    he:{photos:"תמונות",videos:"סרטוני ביקור",previous:"הקודם",next:"הבא",close:"סגירה",open:"פתיחת גלריה"},
    en:{photos:"Photos",videos:"Visit videos",previous:"Previous",next:"Next",close:"Close",open:"Open gallery"},
    pl:{photos:"Zdjęcia",videos:"Filmy z wizyty",previous:"Poprzedni",next:"Następny",close:"Zamknij",open:"Otwórz galerię"},
    de:{photos:"Fotos",videos:"Besuchsvideos",previous:"Zurück",next:"Weiter",close:"Schließen",open:"Galerie öffnen"},
    cs:{photos:"Fotografie",videos:"Videa z návštěvy",previous:"Předchozí",next:"Další",close:"Zavřít",open:"Otevřít galerii"}
  };
  let mediaDialog, activeMedia, touchStart;
  function mediaItems(canonical,kind) {
    return [...new Set(canonical?.media?.[kind] || [])];
  }
  function mediaButtons(canonical) {
    return ["photos","videos"].map(kind=>{
      const count=mediaItems(canonical,kind).length;
      return count ? `<button type="button" data-place-gallery="${escapeHtml(canonical.id)}" data-media-kind="${kind}">${mediaLabels[language][kind]} (${count})</button>` : "";
    }).join("");
  }
  function ensureMediaDialog() {
    if(mediaDialog) return;
    mediaDialog=document.createElement("dialog");
    mediaDialog.className="excursion-media-dialog";
    mediaDialog.setAttribute("aria-labelledby","excursion-media-title");
    mediaDialog.innerHTML=`<header><h2 id="excursion-media-title"></h2><button type="button" data-media-close></button></header><div class="excursion-media-tabs"></div><div class="excursion-media-stage"></div><nav class="excursion-media-controls" dir="ltr"><button type="button" data-media-step="-1"></button><span data-media-counter role="status" aria-live="polite" dir="ltr"></span><button type="button" data-media-step="1"></button></nav>`;
    document.body.append(mediaDialog);
    mediaDialog.addEventListener("close",()=>{mediaDialog.querySelector(".excursion-media-stage").replaceChildren();activeMedia=null;document.body.classList.remove("excursion-media-open");});
    mediaDialog.addEventListener("click",event=>{
      const step=event.target.closest("[data-media-step]");
      const tab=event.target.closest("[data-media-tab]");
      if(event.target.closest("[data-media-close]") || event.target===mediaDialog) mediaDialog.close();
      else if(step) moveMedia(Number(step.dataset.mediaStep));
      else if(tab) {activeMedia.kind=tab.dataset.mediaTab;activeMedia.index=0;renderMediaDialog();}
    });
    mediaDialog.addEventListener("keydown",event=>{
      if(event.key!=="ArrowLeft"&&event.key!=="ArrowRight") return;
      event.preventDefault();moveMedia(event.key==="ArrowLeft"?-1:1);
    });
    const stage=mediaDialog.querySelector(".excursion-media-stage");
    stage.addEventListener("touchstart",event=>{const t=event.touches[0];touchStart={x:t.clientX,y:t.clientY};},{passive:true});
    stage.addEventListener("touchend",event=>{
      if(!touchStart) return;
      const t=event.changedTouches[0],dx=t.clientX-touchStart.x,dy=t.clientY-touchStart.y;
      touchStart=null;
      if(Math.abs(dx)>45 && Math.abs(dx)>Math.abs(dy)) moveMedia(dx<0?1:-1);
    },{passive:true});
  }
  function renderMediaDialog() {
    const canonical=place(activeMedia.id),labels=mediaLabels[language],items=mediaItems(canonical,activeMedia.kind);
    mediaDialog.dir=language==="he"?"rtl":"ltr";
    mediaDialog.querySelector("h2").textContent=local(canonical.name);
    mediaDialog.querySelector("[data-media-close]").textContent=labels.close;
    const tabs=mediaDialog.querySelector(".excursion-media-tabs");
    // Keep the selected tab focused when changing media types.
    if(!tabs.querySelector("[data-media-tab]")) tabs.innerHTML=["photos","videos"].filter(kind=>mediaItems(canonical,kind).length).map(kind=>`<button type="button" data-media-tab="${kind}">${labels[kind]}</button>`).join("");
    tabs.querySelectorAll("button").forEach(button=>button.setAttribute("aria-pressed",String(button.dataset.mediaTab===activeMedia.kind)));
    mediaDialog.querySelector(".excursion-media-stage").innerHTML=activeMedia.kind==="photos" ? `<img src="${escapeHtml(items[activeMedia.index])}" alt="${escapeHtml(local(canonical.name))}" draggable="false">` : window.WROC_YOUTUBE_VIDEO.html(items[activeMedia.index],`${local(canonical.name)} ${activeMedia.index+1}`,language);
    mediaDialog.querySelector("[data-media-counter]").textContent=`${activeMedia.index+1} / ${items.length}`;
    for(const step of [-1,1]) {const button=mediaDialog.querySelector(`[data-media-step="${step}"]`);button.textContent=step<0?`‹ ${labels.previous}`:`${labels.next} ›`;button.disabled=items.length<2;}
  }
  function moveMedia(step) {
    if(!activeMedia) return;
    const count=mediaItems(place(activeMedia.id),activeMedia.kind).length;
    activeMedia.index=(activeMedia.index+step+count)%count;renderMediaDialog();
  }
  function openPlaceMedia(id,kind,index=0) {
    const canonical=place(id),items=mediaItems(canonical,kind);
    if(!items.length) return;
    ensureMediaDialog();activeMedia={id,kind,index:Math.max(0,Math.min(index,items.length-1))};
    mediaDialog.querySelector(".excursion-media-tabs").replaceChildren();
    renderMediaDialog();document.body.classList.add("excursion-media-open");mediaDialog.showModal();
  }
  document.addEventListener("click",event=>{
    const button=event.target.closest("[data-place-gallery]");
    if(button) {event.preventDefault();openPlaceMedia(button.dataset.placeGallery,button.dataset.mediaKind,Number(button.dataset.mediaIndex||0));}
  });
  function renderPlaces(excursion) {
    document.querySelector("[data-places]").innerHTML = excursion.canonicalPlaceIds.map(id=>{
      const canonical=place(id);if(!canonical) return "";
      const photos=mediaItems(canonical,"photos"),videos=mediaItems(canonical,"videos");
      const openPhoto=(photo,index,cover=false)=>`<button type="button" class="${cover?"place-cover-button":"place-photo-button"}" data-place-gallery="${escapeHtml(id)}" data-media-kind="photos" data-media-index="${index}" aria-label="${escapeHtml(mediaLabels[language].open)}: ${escapeHtml(local(canonical.name))}, ${index+1} / ${photos.length}"><img ${cover?'class="place-cover"':'loading="lazy"'} src="${escapeHtml(photo)}" alt="${escapeHtml(local(canonical.name))}"></button>`;
      const cover=photos[0]?openPhoto(photos[0],0,true):"";
      const strip=photos.slice(1,4).map((photo,index)=>openPhoto(photo,index+1)).join("");
      const video=videos[0]?window.WROC_YOUTUBE_VIDEO.html(videos[0],local(canonical.name),language):"";
      return `<article class="place-card" id="excursion-place-${id}" tabindex="-1" data-canonical-place-id="${id}">${cover}<div class="place-copy"><h3>${local(canonical.name)}</h3>${placeAmenities.labelBadgeHtml(canonical,language)}<p>${local(canonical.description)}</p><div class="photo-strip">${strip}</div><div class="place-actions excursion-gallery-actions">${mediaButtons(canonical)}</div>${video}<div class="place-actions">${actionLinks(canonical)}</div></div></article>`;
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
    document.querySelector("[data-map-overview]").textContent = mapFocusLabels[language].overview;
    document.querySelector("[data-walk-overview]").textContent = mapFocusLabels[language].walk;
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

  document.addEventListener("click",event=>{
    const button = event.target.closest("[data-map-place],[data-map-point],[data-map-overview],[data-map-walk-overview],[data-walk-overview]");
    if (!button) return;
    if (button.hasAttribute("data-map-overview")) showMapOverview();
    else if (button.hasAttribute("data-map-walk-overview") || button.hasAttribute("data-walk-overview")) showMapOverview(true);
    else focusMapPlace(button.dataset.mapPlace,button.dataset.mapPoint);
  });
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
