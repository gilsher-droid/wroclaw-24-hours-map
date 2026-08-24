(async function () {
  "use strict";

  const supported = ["he", "en", "pl", "de", "cs"];
  const params = new URLSearchParams(window.location.search);
  const saved = localStorage.getItem("wroclaw24-language");
  let language = supported.includes(params.get("lang")) ? params.get("lang") : supported.includes(saved) ? saved : "he";
  let activeCategory = "all";
  let freeWaterOnly = false;
  let searchTerm = "";
  let selectedId = null;

  const ui = {
    he: {
      brandLine:"מגלים את העיר דרך המקומות הנכונים", eyebrow:"המדריך המקומי של Wroc-love", title:"לאכול. לשתות.<br>לקנות. לישון.",
      lead:"המסעדות, בתי הקפה, מרכזי הקניות והמלונות שפורסמו אצלנו — על מפה אחת שמתאימה את עצמה למה שאתם מחפשים עכשיו.",
      places:"מקומות", fiveLanguages:"חמש שפות", directNavigation:"ניווט ישיר", questionLabel:"שאלה אחת לפני שיוצאים", question:"מה בא לכם עכשיו?", questionHint:"בחרו צורך, והמפה תציג ותקרב אל המקומות המתאימים.",
      explore:"לגלות לפי מצב הרוח", mapTitle:"המקומות על המפה", searchLabel:"חיפוש מקום", searchPlaceholder:"חפשו שם או אזור…", all:"הכול", eat:"לאכול", drink:"לשתות", buy:"לקנות", sleep:"לישון",
      mapNote:"המפה מתקרבת אוטומטית לתוצאות. לבדיקת מסלול בזמן אמת השתמשו בכפתור הניווט.", allPlaces:"כל המקומות", emptyTitle:"לא מצאנו מקום מתאים", emptyText:"נסו מילת חיפוש אחרת או חזרו להצגת הכול.", showAll:"הציגו הכול",
      livingGuide:"מדריך שחי ומתעדכן", editorialTitle:"לא רשימה אינסופית. רק מקומות שיש להם סיבה להיות כאן.", editorialText:"המוצר מבוסס על פוסטי האוכל, הקניות והלינה שכבר פורסמו בדף העסקי ובקהילה. כל מקום מקושר אל הפוסט המקורי ואל ניווט ישיר.",
      homeReturn:"חזרה לאתר הראשי", freeUntil:"כרגע ללא תשלום", communityLine:"מבית קהילת Wrocław & Lower Silesia", facebookGroup:"קבוצת הפייסבוק", facebookPage:"הדף העסקי", instagram:"אינסטגרם", navigate:"ניווט", readPost:"הפוסט", photos:"תמונות", videos:"וידאו", close:"סגירה", resultOne:"מקום", resultMany:"מקומות", source:"מקור", water:"מים לשתייה"
    },
    en: {
      brandLine:"Discover the city through the right places", eyebrow:"The local Wroc-love guide", title:"Eat. Drink.<br>Shop. Sleep.",
      lead:"The restaurants, cafés, shopping centres and hotels featured in our posts — on one map that adapts to what you need now.",
      places:"places", fiveLanguages:"Five languages", directNavigation:"Direct navigation", questionLabel:"One question before you go", question:"What do you feel like now?", questionHint:"Choose a need and the map will show and zoom to the right places.",
      explore:"Explore by mood", mapTitle:"Places on the map", searchLabel:"Search places", searchPlaceholder:"Search by name or area…", all:"All", eat:"Eat", drink:"Drink", buy:"Shop", sleep:"Sleep",
      mapNote:"The map zooms to match your results. Use the navigation button for live directions.", allPlaces:"All places", emptyTitle:"No matching place found", emptyText:"Try another search or return to all places.", showAll:"Show all",
      livingGuide:"A living, evolving guide", editorialTitle:"Not an endless list. Only places with a reason to be here.", editorialText:"This product is built from the food, shopping and accommodation posts already published on our business page and in the community. Every place links back to its source post and direct navigation.",
      homeReturn:"Back to the main site", freeUntil:"Currently free", communityLine:"By the Wrocław & Lower Silesia community", facebookGroup:"Facebook group", facebookPage:"Business page", instagram:"Instagram", navigate:"Navigate", readPost:"Post", photos:"Photos", videos:"Video", close:"Close", resultOne:"place", resultMany:"places", source:"Source", water:"Drinking water"
    },
    pl: {
      brandLine:"Odkrywaj miasto przez właściwe miejsca", eyebrow:"Lokalny przewodnik Wroc-love", title:"Jedz. Pij.<br>Kupuj. Śpij.",
      lead:"Restauracje, kawiarnie, centra handlowe i hotele z naszych postów — na jednej mapie dopasowanej do tego, czego teraz szukasz.",
      places:"miejsca", fiveLanguages:"Pięć języków", directNavigation:"Bezpośrednia nawigacja", questionLabel:"Jedno pytanie przed wyjściem", question:"Na co masz teraz ochotę?", questionHint:"Wybierz potrzebę, a mapa pokaże i przybliży odpowiednie miejsca.",
      explore:"Odkrywaj według nastroju", mapTitle:"Miejsca na mapie", searchLabel:"Szukaj miejsca", searchPlaceholder:"Szukaj nazwy lub okolicy…", all:"Wszystko", eat:"Jedzenie", drink:"Napoje", buy:"Zakupy", sleep:"Nocleg",
      mapNote:"Mapa automatycznie dopasowuje widok do wyników. Użyj przycisku nawigacji, aby sprawdzić trasę na żywo.", allPlaces:"Wszystkie miejsca", emptyTitle:"Nie znaleziono miejsca", emptyText:"Spróbuj innego wyszukiwania lub pokaż wszystko.", showAll:"Pokaż wszystko",
      livingGuide:"Przewodnik, który stale się rozwija", editorialTitle:"Nie nieskończona lista. Tylko miejsca, które mają powód, by tu być.", editorialText:"Produkt powstał z postów o jedzeniu, zakupach i noclegach opublikowanych na stronie firmowej i w społeczności. Każde miejsce prowadzi do źródłowego postu i nawigacji.",
      homeReturn:"Wróć do strony głównej", freeUntil:"Obecnie bezpłatnie", communityLine:"Od społeczności Wrocław & Dolny Śląsk", facebookGroup:"Grupa na Facebooku", facebookPage:"Strona firmowa", instagram:"Instagram", navigate:"Nawigacja", readPost:"Post", photos:"Zdjęcia", videos:"Wideo", close:"Zamknij", resultOne:"miejsce", resultMany:"miejsc", source:"Źródło", water:"Woda pitna"
    },
    de: {
      brandLine:"Die Stadt über die richtigen Orte entdecken", eyebrow:"Der lokale Wroc-love-Guide", title:"Essen. Trinken.<br>Einkaufen. Schlafen.",
      lead:"Restaurants, Cafés, Einkaufszentren und Hotels aus unseren Beiträgen — auf einer Karte, die sich Ihren aktuellen Wünschen anpasst.",
      places:"Orte", fiveLanguages:"Fünf Sprachen", directNavigation:"Direkte Navigation", questionLabel:"Eine Frage vor dem Start", question:"Worauf haben Sie jetzt Lust?", questionHint:"Wählen Sie ein Bedürfnis; die Karte zeigt und vergrößert die passenden Orte.",
      explore:"Nach Stimmung entdecken", mapTitle:"Orte auf der Karte", searchLabel:"Orte suchen", searchPlaceholder:"Name oder Gegend suchen…", all:"Alle", eat:"Essen", drink:"Trinken", buy:"Einkaufen", sleep:"Schlafen",
      mapNote:"Die Karte zoomt automatisch zu den Ergebnissen. Nutzen Sie die Navigation für aktuelle Routen.", allPlaces:"Alle Orte", emptyTitle:"Kein passender Ort gefunden", emptyText:"Versuchen Sie eine andere Suche oder zeigen Sie alle Orte.", showAll:"Alle anzeigen",
      livingGuide:"Ein lebendiger, wachsender Guide", editorialTitle:"Keine endlose Liste. Nur Orte, die einen Grund haben, hier zu sein.", editorialText:"Dieses Produkt basiert auf den bereits auf unserer Unternehmensseite und in der Community veröffentlichten Beiträgen zu Essen, Einkaufen und Übernachten. Jeder Ort führt zum Originalbeitrag und zur Navigation.",
      homeReturn:"Zurück zur Hauptseite", freeUntil:"Derzeit kostenlos", communityLine:"Von der Wrocław & Lower Silesia Community", facebookGroup:"Facebook-Gruppe", facebookPage:"Unternehmensseite", instagram:"Instagram", navigate:"Navigieren", readPost:"Beitrag", photos:"Fotos", videos:"Video", close:"Schließen", resultOne:"Ort", resultMany:"Orte", source:"Quelle", water:"Trinkwasser"
    },
    cs: {
      brandLine:"Objevujte město prostřednictvím správných míst", eyebrow:"Místní průvodce Wroc-love", title:"Jíst. Pít.<br>Nakupovat. Spát.",
      lead:"Restaurace, kavárny, nákupní centra a hotely z našich příspěvků — na jedné mapě, která se přizpůsobí tomu, co právě hledáte.",
      places:"míst", fiveLanguages:"Pět jazyků", directNavigation:"Přímá navigace", questionLabel:"Jedna otázka před cestou", question:"Na co máte právě chuť?", questionHint:"Vyberte potřebu a mapa zobrazí a přiblíží vhodná místa.",
      explore:"Objevujte podle nálady", mapTitle:"Místa na mapě", searchLabel:"Hledat místo", searchPlaceholder:"Hledejte název nebo oblast…", all:"Vše", eat:"Jíst", drink:"Pít", buy:"Nakupovat", sleep:"Spát",
      mapNote:"Mapa se automaticky přiblíží k výsledkům. Pro aktuální trasu použijte tlačítko navigace.", allPlaces:"Všechna místa", emptyTitle:"Nenašli jsme odpovídající místo", emptyText:"Zkuste jiné hledání nebo zobrazte všechna místa.", showAll:"Zobrazit vše",
      livingGuide:"Živý, průběžně rozšiřovaný průvodce", editorialTitle:"Ne nekonečný seznam. Jen místa, která mají důvod zde být.", editorialText:"Produkt vychází z příspěvků o jídle, nakupování a ubytování, které již vyšly na firemní stránce a v komunitě. Každé místo odkazuje na původní příspěvek a navigaci.",
      homeReturn:"Zpět na hlavní stránku", freeUntil:"Nyní zdarma", communityLine:"Od komunity Wrocław & Dolní Slezsko", facebookGroup:"Skupina na Facebooku", facebookPage:"Firemní stránka", instagram:"Instagram", navigate:"Navigovat", readPost:"Příspěvek", photos:"Fotografie", videos:"Video", close:"Zavřít", resultOne:"místo", resultMany:"míst", source:"Zdroj", water:"Pitná voda"
    }
  };

  const places = Array.isArray(window.WROC_LIFESTYLE_PLACES) ? window.WROC_LIFESTYLE_PLACES : [];
  const placeFilters = window.WROC_PLACE_FILTERS;
  const placeAmenities = window.WROC_PLACE_AMENITIES;
  const publicWaterPlaces = (window.WROC_CATALOG?.queryIndependentPlaces?.({
    cityId: "wroclaw",
    placeType: "waterRefillPoint",
  }) || []).map((place) => ({
    id: place.id,
    canonicalPlaceId: place.id,
    canonicalPlace: place,
    categories: place.categories,
    coordinates: [place.location.coordinates.lat, place.location.coordinates.lng],
    name: place.name,
    localName: place.localName,
    description: place.description,
    sourceUrl: place.links?.website || null,
    mediaKey: null,
    note: place.availability?.notes || null,
  }));
  const accessState = await window.WROC_CAMPAIGN_ACCESS?.authorize(language);
  if (accessState && !accessState.allowed) return;
  const resources = window.WROC_LOCATION_MEDIA || {};
  const categorySymbols = { eat:"🍽", drink:"☕", buy:"◫", sleep:"☾", water:"💧" };
  const categoryOrder = ["eat","drink","buy","sleep"];
  const markers = new Map();
  const markerLayer = L.layerGroup();
  const map = L.map("lifestyle-map", { scrollWheelZoom:false, zoomControl:true }).setView([51.1088,17.0335], 13);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom:19, attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo(map);
  markerLayer.addTo(map);

  const local = (value) => value && typeof value === "object" ? (value[language] || value.en || value.he || Object.values(value)[0]) : (value || "");
  const tr = (key) => key === "freeWater"
    ? placeAmenities.freeWaterLabel(language)
    : ui[language]?.[key] || ui.en[key] || key;
  const escapeHtml = (value) => String(value || "").replace(/[&<>'"]/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[char]));
  const placeName = (place) => local(place.name) || place.localName || place.id;
  const googleUrl = (place) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${placeName(place)}, Wrocław`)}`;

  function categoryFor(place) {
    if (activeCategory !== "all" && place.categories.includes(activeCategory)) return activeCategory;
    if (place.canonicalPlace?.placeType === "waterRefillPoint") return "water";
    return categoryOrder.find((category) => place.categories.includes(category)) || "eat";
  }

  function markerIcon(place) {
    const category = categoryFor(place);
    return L.divIcon({ className:"", html:`<span class="lifestyle-marker ${category}"><span>${categorySymbols[category]}</span>${placeAmenities.markerBadgeHtml(place, language)}</span>`, iconSize:[34,34], iconAnchor:[17,17], popupAnchor:[0,-18] });
  }

  function searchable(place) {
    const names = typeof place.name === "object" ? Object.values(place.name) : [place.name];
    return [...names, place.localName, ...Object.values(place.description || {}), ...Object.values(place.note || {})].join(" ").toLocaleLowerCase();
  }

  function filteredPlaces() {
    return placeFilters.filterPlaces({
      productPlaces: places,
      overlayPlaces: publicWaterPlaces,
      category: activeCategory,
      freeWaterOnly,
      searchTerm,
      searchable,
    });
  }

  function actionHtml(place) {
    const media = place.mediaKey ? resources[place.mediaKey] : null;
    const actions = [`<a href="${googleUrl(place)}" target="_blank" rel="noopener"><span class="brand-icon media">↗</span>${tr("navigate")}</a>`];
    if (place.sourceUrl) actions.push(`<a href="${place.sourceUrl}" target="_blank" rel="noopener"><span class="brand-icon facebook">f</span>${tr("readPost")}</a>`);
    if (media?.instagram) actions.push(`<a href="${media.instagram}" target="_blank" rel="noopener"><span class="brand-icon instagram">◎</span>${tr("instagram")}</a>`);
    if (media?.gallery?.length) actions.push(`<button type="button" data-gallery="${place.id}"><span class="brand-icon media">▣</span>${tr("photos")}</button>`);
    if (media?.videos?.length) actions.push(`<button type="button" data-video="${place.id}"><span class="brand-icon media">▶</span>${tr("videos")}</button>`);
    return actions.join("");
  }

  function cardHtml(place) {
    const tags = place.categories.map((category) => `<span class="place-tag ${category}">${tr(category)}</span>`).join("");
    return `<article class="place-card${selectedId === place.id ? " selected" : ""}" data-place="${place.id}" tabindex="0">
      <div class="place-topline"><h3>${escapeHtml(placeName(place))}</h3><div class="place-tags">${tags}</div></div>
      <p class="local-name">${escapeHtml(place.localName || placeName(place))}</p>
      ${placeAmenities.labelBadgeHtml(place, language)}
      <p>${escapeHtml(local(place.description))}</p>
      ${place.note ? `<p class="place-note">${escapeHtml(local(place.note))}</p>` : ""}
      <div class="place-actions">${actionHtml(place)}</div>
    </article>`;
  }

  function popupHtml(place) {
    return `<strong>${escapeHtml(placeName(place))}</strong><br>${placeAmenities.labelBadgeHtml(place, language)}<span>${escapeHtml(local(place.description))}</span><div class="place-actions">${actionHtml(place)}</div>`;
  }

  function fitResults(results) {
    if (!results.length) return;
    const bounds = L.latLngBounds(results.map((place) => place.coordinates));
    if (results.length === 1) map.setView(results[0].coordinates, 16, { animate:true });
    else map.fitBounds(bounds, { padding:[42,42], maxZoom:15, animate:true });
  }

  function render({ fit = true } = {}) {
    const results = filteredPlaces();
    markerLayer.clearLayers();
    markers.clear();
    results.forEach((place) => {
      const marker = L.marker(place.coordinates, { icon:markerIcon(place), title:placeName(place) }).bindPopup(popupHtml(place), { maxWidth:320 });
      marker.on("click", () => selectPlace(place.id, false));
      marker.addTo(markerLayer);
      markers.set(place.id, marker);
    });

    const resultsElement = document.getElementById("place-results");
    resultsElement.innerHTML = results.map(cardHtml).join("");
    document.getElementById("empty-state").hidden = results.length !== 0;
    resultsElement.hidden = results.length === 0;
    document.getElementById("results-count").textContent = `${results.length} ${results.length === 1 ? tr("resultOne") : tr("resultMany")}`;
    const categoryTitle = activeCategory === "all" ? tr("allPlaces") : tr(activeCategory);
    document.getElementById("results-title").textContent = freeWaterOnly ? `${categoryTitle} · ${tr("freeWater")}` : categoryTitle;
    if (fit) fitResults(results);
  }

  function selectPlace(id, openPopup = true) {
    selectedId = id;
    document.querySelectorAll(".place-card").forEach((card) => card.classList.toggle("selected", card.dataset.place === id));
    const marker = markers.get(id);
    if (marker) {
      map.panTo(marker.getLatLng(), { animate:true });
      if (openPopup) marker.openPopup();
    }
  }

  function applyLanguage() {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "he" ? "rtl" : "ltr";
    document.title = `${tr("title").replace(/<br>/g," ")} | Wroc-love`;
    localStorage.setItem("wroclaw24-language", language);
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const value = tr(element.dataset.i18n);
      if (element.dataset.i18n === "title") element.innerHTML = value;
      else element.textContent = value;
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => element.placeholder = tr(element.dataset.i18nPlaceholder));
    document.querySelectorAll("[data-lang]").forEach((button) => {
      const active = button.dataset.lang === language;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    document.querySelectorAll("[data-home-link]").forEach((link) => link.href = `/?lang=${language}`);
    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.set("lang", language);
    history.replaceState({}, "", nextUrl);
    render({ fit:false });
  }

  function setLanguage(nextLanguage) {
    if (!supported.includes(nextLanguage)) return;
    language = nextLanguage;
    applyLanguage();
  }

  function openMedia(placeId, type) {
    const place = places.find((item) => item.id === placeId);
    const media = place?.mediaKey ? resources[place.mediaKey] : null;
    if (!place || !media) return;
    const modal = document.getElementById("media-modal");
    document.getElementById("media-title").textContent = place.name;
    const content = document.getElementById("media-content");
    if (type === "gallery") content.innerHTML = `<div class="media-grid">${(media.gallery || []).map((src) => `<img src="${src}" alt="${escapeHtml(place.name)}" loading="lazy">`).join("")}</div>`;
    else content.innerHTML = `<div class="media-grid">${(media.videos || []).map((video) => `<video controls playsinline preload="metadata" src="${video.src}"></video>`).join("")}</div>`;
    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    modal.querySelector("[data-close-media]").focus();
  }

  function closeMedia() {
    const modal = document.getElementById("media-modal");
    modal.hidden = true;
    modal.setAttribute("aria-hidden", "true");
    modal.querySelectorAll("video").forEach((video) => video.pause());
    document.body.style.overflow = "";
  }

  document.getElementById("place-count").textContent = String(places.length);
  document.querySelectorAll("[data-count]").forEach((element) => {
    const category = element.dataset.count;
    element.textContent = category === "all" ? places.length : places.filter((place) => place.categories.includes(category)).length;
  });
  document.querySelector("[data-free-water-count]").textContent = String(
    placeFilters.filterPlaces({ productPlaces: places, overlayPlaces: publicWaterPlaces, freeWaterOnly: true }).length,
  );

  document.querySelector(".category-filters").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-category]");
    if (!button) return;
    activeCategory = button.dataset.category;
    selectedId = null;
    document.querySelectorAll("button[data-category]").forEach((item) => item.classList.toggle("active", item === button));
    render();
  });
  document.getElementById("free-water-filter").addEventListener("click", (event) => {
    freeWaterOnly = !freeWaterOnly;
    selectedId = null;
    event.currentTarget.classList.toggle("active", freeWaterOnly);
    event.currentTarget.setAttribute("aria-pressed", String(freeWaterOnly));
    render();
  });
  document.getElementById("place-search").addEventListener("input", (event) => {
    searchTerm = event.target.value.trim().toLocaleLowerCase();
    selectedId = null;
    render();
  });
  document.getElementById("reset-search").addEventListener("click", () => {
    activeCategory = "all"; freeWaterOnly = false; searchTerm = ""; selectedId = null;
    document.getElementById("place-search").value = "";
    document.querySelectorAll("button[data-category]").forEach((button) => button.classList.toggle("active", button.dataset.category === "all"));
    document.getElementById("free-water-filter").classList.remove("active");
    document.getElementById("free-water-filter").setAttribute("aria-pressed", "false");
    render();
  });
  document.querySelector(".language-switcher").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-lang]");
    if (button) setLanguage(button.dataset.lang);
  });
  document.getElementById("place-results").addEventListener("click", (event) => {
    const galleryButton = event.target.closest("[data-gallery]");
    const videoButton = event.target.closest("[data-video]");
    if (galleryButton) return openMedia(galleryButton.dataset.gallery, "gallery");
    if (videoButton) return openMedia(videoButton.dataset.video, "video");
    if (event.target.closest("a,button")) return;
    const card = event.target.closest("[data-place]");
    if (card) selectPlace(card.dataset.place);
  });
  document.getElementById("place-results").addEventListener("keydown", (event) => {
    if ((event.key === "Enter" || event.key === " ") && !event.target.closest("a,button")) {
      const card = event.target.closest("[data-place]");
      if (card) { event.preventDefault(); selectPlace(card.dataset.place); }
    }
  });
  document.getElementById("media-modal").addEventListener("click", (event) => {
    if (event.target.id === "media-modal" || event.target.closest("[data-close-media]")) closeMedia();
  });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape" && !document.getElementById("media-modal").hidden) closeMedia(); });

  applyLanguage();
  render();
  setTimeout(() => map.invalidateSize(), 50);
})();
