(async function () {
  "use strict";

  const API_ORIGIN = "https://api.wroc-love.com";
  const supportedLanguages = ["he", "en", "pl"];
  const requestedLanguage = new URLSearchParams(window.location.search).get("lang");
  const savedLanguage = localStorage.getItem("wroclaw24-language");
  let language = supportedLanguages.includes(requestedLanguage)
    ? requestedLanguage
    : supportedLanguages.includes(savedLanguage) ? savedLanguage : "he";
  let activeDay = Number(localStorage.getItem("wroc-premium-day")) || 1;
  let recommendationFilter = "all";
  let map;
  let routeLine;
  let accessState = null;
  const mapLayers = [];
  const markerById = new Map();

  const ui = {
    he: {
      brandSubtitle: "המסלול המלא שלכם", activeAccess: "גישה פעילה", logout: "יציאה",
      eyebrow: "וורוצלב בקצב שמתאים לכן", title: "ארבעה ימים. עיר אחת. בלי לבזבז זמן על תכנון.",
      subtitle: "מסלול אישי לאם ולבת לביקור ראשון: כל יום באזור אחד, עם סדר ברור, מפה חיה, ניווט והמלצות שמתאימות לקצב אמיתי.",
      smartTip: "איך משתמשים במסלול", smartTipBody: "בחרו יום, פתחו תחנה במפה וצאו לניווט. אפשר להחליף בין הימים לפי מזג האוויר והאנרגיה.",
      days: "ימים", routeStops: "תחנות במסלולים", recommendations: "המלצות אוכל וקניות", languages: "שפות",
      day: "יום", distance: "הליכה", dayLength: "משך מומלץ", start: "שעת התחלה", stops: "תחנות",
      navigateDay: "פתחו את כל היום ב־Google Maps", fitDay: "הציגו את כל המסלול", todayAdvice: "המלצת היום",
      orientation: "התמצאות מהירה", mapTitle: "המפה של היום", mapNote: "הקו מציג את סדר התחנות. כפתור הניווט פותח מסלול מותאם לרחובות ב־Google Maps.",
      byOrder: "לפי הסדר", dailySchedule: "לוח היום והתחנות", atAGlance: "במבט אחד", suggestedSchedule: "לוח זמנים מוצע",
      goodToKnow: "כדאי לדעת", flexibility: "גמישות בלי לפספס", betweenStops: "בין התחנות", foodShopping: "אוכל, קפה, קינוחים וקניות",
      savePhone: "שמרו את הדף בטלפון", closing: "כל ארבעת הימים, המפות והניווט נשארים זמינים לאורך תקופת הגישה.", backTop: "חזרה לבחירת יום",
      optional: "רשות", recommended: "מומלץ", duration: "זמן במקום", showMap: "הציגו במפה", navigate: "ניווט", bestFor: "מתאים במיוחד ליום",
      all: "הכול", cafe: "קפה", dessert: "קינוחים", food: "אוכל", shopping: "קניות", mapUnavailable: "המפה לא נטענה. קישורי הניווט עדיין זמינים.",
      categories: { main: "נקודת פתיחה", special: "חוויה מיוחדת", architecture: "אדריכלות", viewpoint: "תצפית", culture: "תרבות", river: "נהר", nature: "טבע", shopping: "קניות", food: "אוכל" },
      activeUntil: "גישה פעילה עד", freeUntil: "גישה חינם עד 31 בדצמבר 2026"
    },
    en: {
      brandSubtitle: "Your complete route", activeAccess: "Access active", logout: "Log out",
      eyebrow: "Wrocław at your pace", title: "Four days. One city. No wasted planning time.",
      subtitle: "A first-visit mother-and-daughter route: one convenient area each day, with a clear order, live map, navigation and realistic recommendations.",
      smartTip: "How to use the route", smartTipBody: "Choose a day, open a stop on the map and navigate. Swap days according to weather and energy.",
      days: "days", routeStops: "route stops", recommendations: "food and shopping picks", languages: "languages",
      day: "Day", distance: "walking", dayLength: "recommended length", start: "start time", stops: "stops",
      navigateDay: "Open the full day in Google Maps", fitDay: "Show the full route", todayAdvice: "Today’s advice",
      orientation: "Quick orientation", mapTitle: "Today’s map", mapNote: "The line shows stop order. The navigation button opens a street-aware route in Google Maps.",
      byOrder: "In order", dailySchedule: "Schedule and stops", atAGlance: "At a glance", suggestedSchedule: "Suggested schedule",
      goodToKnow: "Good to know", flexibility: "Stay flexible without missing out", betweenStops: "Between stops", foodShopping: "Food, coffee, desserts and shopping",
      savePhone: "Save this page on your phone", closing: "All four days, maps and navigation remain available throughout your access period.", backTop: "Back to day selection",
      optional: "Optional", recommended: "Recommended", duration: "Time here", showMap: "Show on map", navigate: "Navigate", bestFor: "Best with Day",
      all: "All", cafe: "Coffee", dessert: "Desserts", food: "Food", shopping: "Shopping", mapUnavailable: "The map could not load. Navigation links are still available.",
      categories: { main: "Starting point", special: "Special", architecture: "Architecture", viewpoint: "Viewpoint", culture: "Culture", river: "River", nature: "Nature", shopping: "Shopping", food: "Food" },
      activeUntil: "Access active until", freeUntil: "Free access until 31 December 2026"
    },
    pl: {
      brandSubtitle: "Pełna trasa", activeAccess: "Dostęp aktywny", logout: "Wyloguj",
      eyebrow: "Wrocław w Waszym tempie", title: "Cztery dni. Jedno miasto. Bez tracenia czasu na planowanie.",
      subtitle: "Trasa na pierwszy wyjazd mamy i córki: codziennie jeden wygodny obszar, jasna kolejność, mapa, nawigacja i praktyczne rekomendacje.",
      smartTip: "Jak korzystać z trasy", smartTipBody: "Wybierzcie dzień, otwórzcie punkt na mapie i uruchomcie nawigację. Dni można zamieniać zależnie od pogody i energii.",
      days: "dni", routeStops: "punktów trasy", recommendations: "poleceń jedzenia i zakupów", languages: "języki",
      day: "Dzień", distance: "spacer", dayLength: "zalecany czas", start: "początek", stops: "punkty",
      navigateDay: "Otwórz cały dzień w Google Maps", fitDay: "Pokaż całą trasę", todayAdvice: "Wskazówka dnia",
      orientation: "Szybka orientacja", mapTitle: "Mapa dnia", mapNote: "Linia pokazuje kolejność punktów. Nawigacja otwiera trasę ulicami w Google Maps.",
      byOrder: "Po kolei", dailySchedule: "Plan dnia i punkty", atAGlance: "W skrócie", suggestedSchedule: "Proponowany harmonogram",
      goodToKnow: "Warto wiedzieć", flexibility: "Elastycznie, bez pomijania", betweenStops: "Między punktami", foodShopping: "Jedzenie, kawa, desery i zakupy",
      savePhone: "Zapiszcie stronę w telefonie", closing: "Wszystkie cztery dni, mapy i nawigacja są dostępne przez cały okres dostępu.", backTop: "Wróć do wyboru dnia",
      optional: "Opcjonalnie", recommended: "Polecane", duration: "Czas na miejscu", showMap: "Pokaż na mapie", navigate: "Nawiguj", bestFor: "Najlepsze w dniu",
      all: "Wszystko", cafe: "Kawa", dessert: "Desery", food: "Jedzenie", shopping: "Zakupy", mapUnavailable: "Mapa nie została załadowana. Linki nawigacyjne nadal działają.",
      categories: { main: "Początek", special: "Wyjątkowe", architecture: "Architektura", viewpoint: "Widok", culture: "Kultura", river: "Rzeka", nature: "Natura", shopping: "Zakupy", food: "Jedzenie" },
      activeUntil: "Dostęp aktywny do", freeUntil: "Bezpłatny dostęp do 31 grudnia 2026"
    }
  };

  const categoryColors = {
    main: "#dca94f", special: "#7b61a8", architecture: "#062b5c", viewpoint: "#7b61a8",
    culture: "#2477bd", river: "#55a8d8", nature: "#4f8a71", shopping: "#b76791", food: "#d2764f"
  };

  function text(value) {
    if (value == null) return "";
    return typeof value === "object" ? (value[language] || value.he || "") : String(value);
  }

  function escapeHtml(value) {
    return String(value || "").replace(/[&<>'"]/g, (char) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
    }[char]));
  }

  function t(key) {
    return key.split(".").reduce((value, part) => value && value[part], ui[language]) || key;
  }

  function googleNavigationUrl(place) {
    return `https://www.google.com/maps/dir/?api=1&destination=${place.coordinates[0]},${place.coordinates[1]}`;
  }

  function googleDayUrl(stops) {
    const origin = stops[0].coordinates.join(",");
    const destination = stops[stops.length - 1].coordinates.join(",");
    const waypoints = stops.slice(1, -1).map((item) => item.coordinates.join(",")).join("|");
    return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&waypoints=${encodeURIComponent(waypoints)}&travelmode=walking`;
  }

  function setDocumentLanguage() {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "he" ? "rtl" : "ltr";
    localStorage.setItem("wroclaw24-language", language);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", language);
    history.replaceState({}, "", url);
    document.querySelectorAll("[data-ui]").forEach((element) => {
      element.textContent = t(element.dataset.ui);
    });
    document.querySelectorAll("[data-premium-lang]").forEach((button) => {
      const active = button.dataset.premiumLang === language;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    updateAccessStatus();
  }

  function updateAccessStatus() {
    if (!accessState) return;
    const status = document.getElementById("access-status");
    const logout = document.getElementById("logout-button");
    if (accessState.free) {
      status.textContent = t("freeUntil");
      logout.hidden = true;
      return;
    }
    logout.hidden = false;
    if (accessState.expiresAt) {
      const locale = language === "pl" ? "pl-PL" : language === "en" ? "en-GB" : "he-IL";
      status.textContent = `${t("activeUntil")} ${new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(new Date(accessState.expiresAt))}`;
    } else {
      status.textContent = t("activeAccess");
    }
  }

  function renderDayNavigation() {
    document.getElementById("day-nav").innerHTML = window.PREMIUM_DAYS.map((day) => `
      <button type="button" class="${activeDay === day.id ? "active" : ""}" data-day="${day.id}" aria-pressed="${activeDay === day.id}">
        <span>${escapeHtml(t("day"))} ${day.id}</span><strong>${escapeHtml(text(day.title))}</strong>
      </button>`).join("");
  }

  function renderDayOverview(day, stops) {
    document.getElementById("day-kicker").textContent = `${t("day")} ${day.id}`;
    document.getElementById("day-title").textContent = text(day.title);
    document.getElementById("day-description").textContent = text(day.description);
    document.getElementById("day-advice").textContent = text(day.advice);
    document.getElementById("day-weather").textContent = text(day.weather);
    document.getElementById("day-stats").innerHTML = `
      <span><strong>${escapeHtml(day.distance)}</strong>${escapeHtml(t("distance"))}</span>
      <span><strong>${escapeHtml(day.hours)}</strong>${escapeHtml(t("dayLength"))}</span>
      <span><strong>${escapeHtml(day.start)}</strong>${escapeHtml(t("start"))}</span>
      <span><strong>${stops.length}</strong>${escapeHtml(t("stops"))}</span>`;
    document.getElementById("navigate-day").href = googleDayUrl(stops);
    document.getElementById("day-tips").innerHTML = day.tips.map((tip) => `<li>${escapeHtml(text(tip))}</li>`).join("");
  }

  function renderStops(stops) {
    document.getElementById("premium-stop-list").innerHTML = stops.map((item) => `
      <article class="premium-stop-card ${item.optional ? "optional" : ""}" id="stop-${item.id}">
        <div class="stop-index" style="--marker-color:${categoryColors[item.category]}">${item.order}</div>
        <div class="stop-copy">
          <div class="stop-heading">
            <div><h3>${escapeHtml(text(item.name))}</h3><span>${escapeHtml(item.localName)}</span></div>
            <div class="stop-badges"><span>${escapeHtml(t(`categories.${item.category}`))}</span>${item.optional ? `<span class="optional-badge">${escapeHtml(t("optional"))}</span>` : ""}</div>
          </div>
          <p>${escapeHtml(text(item.description))}</p>
          <p class="stop-tip"><strong>${escapeHtml(t("recommended"))}:</strong> ${escapeHtml(text(item.tip))}</p>
          <div class="stop-actions">
            <button type="button" data-show-stop="${item.id}">${escapeHtml(t("showMap"))}</button>
            <a href="${googleNavigationUrl(item)}" target="_blank" rel="noopener">${escapeHtml(t("navigate"))}</a>
          </div>
        </div>
        <div class="stop-time"><strong>${escapeHtml(item.time)}</strong><span>${escapeHtml(t("duration"))}: ${escapeHtml(item.duration)}</span></div>
      </article>`).join("");

    document.getElementById("premium-schedule").innerHTML = stops.map((item) => `
      <li><time>${escapeHtml(item.time)}</time><span>${escapeHtml(text(item.name))}</span>${item.optional ? `<small>${escapeHtml(t("optional"))}</small>` : ""}</li>`).join("");
  }

  function clearMap() {
    if (!map) return;
    mapLayers.splice(0).forEach((layer) => map.removeLayer(layer));
    markerById.clear();
  }

  function popupHtml(item) {
    return `<div class="premium-popup"><strong>${escapeHtml(text(item.name))}</strong><span>${escapeHtml(item.localName)}</span><p>${escapeHtml(text(item.description))}</p><a href="${googleNavigationUrl(item)}" target="_blank" rel="noopener">${escapeHtml(t("navigate"))}</a></div>`;
  }

  function renderMap(stops) {
    const mapElement = document.getElementById("premium-map");
    if (!window.L) {
      mapElement.innerHTML = `<div class="map-error">${escapeHtml(t("mapUnavailable"))}</div>`;
      return;
    }
    if (!map) {
      map = L.map("premium-map", { scrollWheelZoom: false }).setView([51.111, 17.04], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
      }).addTo(map);
    }
    clearMap();
    stops.forEach((item) => {
      const icon = L.divIcon({
        className: "premium-marker-shell",
        html: `<div class="premium-marker" style="--marker-color:${categoryColors[item.category]}"><span>${item.order}</span></div>`,
        iconSize: [36, 36], iconAnchor: [18, 34], popupAnchor: [0, -30]
      });
      const marker = L.marker(item.coordinates, { icon, title: text(item.name) }).addTo(map).bindPopup(popupHtml(item));
      mapLayers.push(marker);
      markerById.set(item.id, marker);
    });
    routeLine = L.polyline(stops.map((item) => item.coordinates), { color: "#2477bd", weight: 4, opacity: 0.78, dashArray: "8 10" }).addTo(map);
    mapLayers.push(routeLine);
    fitDay();
    setTimeout(() => map.invalidateSize(), 0);
    const categories = [...new Set(stops.map((item) => item.category))];
    document.getElementById("map-legend").innerHTML = categories.map((category) => `<span><i style="--legend-color:${categoryColors[category]}"></i>${escapeHtml(t(`categories.${category}`))}</span>`).join("");
  }

  function fitDay() {
    if (!map || !routeLine) return;
    map.fitBounds(routeLine.getBounds(), { padding: [36, 36] });
  }

  function showStop(id) {
    const marker = markerById.get(id);
    if (!marker || !map) return;
    map.setView(marker.getLatLng(), 17, { animate: true });
    marker.openPopup();
    document.getElementById("premium-map").scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function renderRecommendationFilters() {
    const categories = ["all", "cafe", "dessert", "food", "shopping"];
    document.getElementById("recommendation-filters").innerHTML = categories.map((category) => `
      <button type="button" data-rec-filter="${category}" class="${recommendationFilter === category ? "active" : ""}" aria-pressed="${recommendationFilter === category}">${escapeHtml(t(category))}</button>`).join("");
  }

  function renderRecommendations() {
    const recommendations = window.PREMIUM_RECOMMENDATIONS.filter((item) => recommendationFilter === "all" || item.category === recommendationFilter);
    document.getElementById("recommendation-grid").innerHTML = recommendations.map((item) => `
      <article class="recommendation-card">
        <span class="recommendation-type">${escapeHtml(t(item.category))}</span>
        <h3>${escapeHtml(text(item.name))}</h3>
        <small>${escapeHtml(item.localName)}</small>
        <p>${escapeHtml(text(item.description))}</p>
        <div><span>${escapeHtml(t("bestFor"))} ${item.bestDay}</span><a href="${googleNavigationUrl(item)}" target="_blank" rel="noopener">${escapeHtml(t("navigate"))}</a></div>
      </article>`).join("");
  }

  function render() {
    setDocumentLanguage();
    const day = window.PREMIUM_DAYS.find((item) => item.id === activeDay) || window.PREMIUM_DAYS[0];
    const stops = window.PREMIUM_STOPS.filter((item) => item.day === day.id);
    renderDayNavigation();
    renderDayOverview(day, stops);
    renderStops(stops);
    renderMap(stops);
    renderRecommendationFilters();
    renderRecommendations();
  }

  document.addEventListener("click", (event) => {
    const languageButton = event.target.closest("[data-premium-lang]");
    if (languageButton) {
      language = languageButton.dataset.premiumLang;
      render();
      return;
    }
    const dayButton = event.target.closest("[data-day]");
    if (dayButton) {
      activeDay = Number(dayButton.dataset.day);
      localStorage.setItem("wroc-premium-day", String(activeDay));
      render();
      document.getElementById("route-content").scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    const showButton = event.target.closest("[data-show-stop]");
    if (showButton) {
      showStop(showButton.dataset.showStop);
      return;
    }
    const filterButton = event.target.closest("[data-rec-filter]");
    if (filterButton) {
      recommendationFilter = filterButton.dataset.recFilter;
      renderRecommendationFilters();
      renderRecommendations();
    }
  });

  document.getElementById("fit-day").addEventListener("click", fitDay);
  document.getElementById("back-to-top").addEventListener("click", () => document.getElementById("day-nav").scrollIntoView({ behavior: "smooth" }));
  document.getElementById("logout-button").addEventListener("click", async () => {
    await fetch(`${API_ORIGIN}/api/access/logout`, { method: "POST", credentials: "include" });
    window.location.replace(`/access.html?lang=${language}`);
  });

  accessState = await window.WROC_CAMPAIGN_ACCESS.authorize(language);
  if (!accessState.allowed) return;
  render();
})();
