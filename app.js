(async function () {
  "use strict";

  const supportedLanguages = ["he", "en", "pl", "de", "cs"];
  const queryLanguage = new URLSearchParams(window.location.search).get("lang");
  const savedLanguage = localStorage.getItem("wroclaw24-language");
  let currentLanguage = supportedLanguages.includes(queryLanguage)
    ? queryLanguage
    : supportedLanguages.includes(savedLanguage) ? savedLanguage : "he";
  let activeCategory = "all";
  let currentOpenId = null;
  let map;
  let routeLine;
  const markers = new Map();

  const categoryColors = {
    start: "#D6A657",
    main: "#062B5C",
    architecture: "#062B5C",
    culture: "#2468A2",
    special: "#7B61A8",
    viewpoint: "#7B61A8",
    food: "#DF8F5A",
    river: "#6AB7E8",
    evening: "#7B61A8",
    station: "#4F8A71"
  };

  function t(key) {
    return key.split(".").reduce((value, part) => value && value[part], window.TRANSLATIONS[currentLanguage]) || key;
  }

  function escapeHtml(value) {
    return String(value || "").replace(/[&<>'"]/g, (char) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
    }[char]));
  }

  function googleNavigationUrl(location) {
    return `https://www.google.com/maps/dir/?api=1&destination=${location.coordinates[0]},${location.coordinates[1]}`;
  }

  function appleNavigationUrl(location) {
    return `https://maps.apple.com/?daddr=${location.coordinates[0]},${location.coordinates[1]}&dirflg=w`;
  }

  function updateDocumentLanguage() {
    const isHebrew = currentLanguage === "he";
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = isHebrew ? "rtl" : "ltr";
    document.title = t("appTitle");
    document.querySelector('meta[name="description"]').setAttribute("content", t("subtitle"));
    document.querySelector('meta[property="og:title"]').setAttribute("content", t("appTitle"));
    document.querySelector('meta[property="og:description"]').setAttribute("content", t("subtitle"));
  }

  function translateStaticContent() {
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      element.textContent = t(element.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
      element.setAttribute("aria-label", t(element.dataset.i18nAria));
    });
    document.querySelectorAll(".language-button").forEach((button) => {
      button.classList.toggle("active", button.dataset.lang === currentLanguage);
      button.setAttribute("aria-pressed", String(button.dataset.lang === currentLanguage));
    });
    document.getElementById("home-link").href = `/?lang=${currentLanguage}`;
  }

  function markerHtml(location, evening = false) {
    const label = evening ? "+" : location.order;
    const color = categoryColors[evening ? "evening" : location.category];
    return `<div class="route-marker" style="background:${color}"><span>${label}</span></div>`;
  }

  function popupHtml(location, evening = false) {
    const category = evening ? t("categories.evening") : t(`categories.${location.category}`);
    const time = evening ? "" : `<span class="popup-chip">${escapeHtml(t("recommendedTime"))}: ${escapeHtml(location.time[currentLanguage])}</span>`;
    const optional = location.optional ? `<span class="popup-chip">${escapeHtml(t("optionalStop"))}</span>` : "";
    return `
      <div class="popup-title">${escapeHtml(location.name[currentLanguage])}</div>
      <div class="popup-local">${escapeHtml(location.localName)}</div>
      <div>${escapeHtml(location.description[currentLanguage])}</div>
      <div class="popup-meta"><span class="popup-chip">${escapeHtml(category)}</span>${time}${optional}</div>
      <div class="popup-actions">
        <a href="${googleNavigationUrl(location)}" target="_blank" rel="noopener">${escapeHtml(t("navigate"))}</a>
        <a href="${appleNavigationUrl(location)}" target="_blank" rel="noopener">${escapeHtml(t("appleMaps"))}</a>
      </div>`;
  }

  function addMarker(location, evening = false) {
    const icon = L.divIcon({
      className: "custom-marker",
      html: markerHtml(location, evening),
      iconSize: [34, 34],
      iconAnchor: [17, 32],
      popupAnchor: [0, -30]
    });
    const marker = L.marker(location.coordinates, {
      icon,
      keyboard: true,
      title: location.name[currentLanguage],
      alt: location.name[currentLanguage]
    }).addTo(map);
    marker.locationData = location;
    marker.evening = evening;
    marker.category = evening ? "evening" : location.category;
    marker.bindPopup(popupHtml(location, evening));
    marker.on("popupopen", () => { currentOpenId = location.id; });
    marker.on("popupclose", () => { if (currentOpenId === location.id) currentOpenId = null; });
    markers.set(location.id, marker);
  }

  function initMap() {
    const mapElement = document.getElementById("map");
    if (!window.L) {
      mapElement.innerHTML = `<div style="padding:2rem">${escapeHtml(t("mapLoadingError"))}</div>`;
      return;
    }
    map = L.map("map", { scrollWheelZoom: false, zoomControl: true }).setView([51.1122, 17.0395], 14);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    }).addTo(map);

    window.LOCATIONS.forEach((location) => addMarker(location, false));
    window.EVENING_LOCATIONS.forEach((location) => addMarker(location, true));

    const routeCoordinates = window.LOCATIONS.filter((location) => !location.optional).map((location) => location.coordinates);
    routeLine = L.polyline(routeCoordinates, {
      color: "#2468A2", weight: 4, opacity: 0.8, dashArray: "8 10", lineCap: "round"
    }).addTo(map);
    fitRoute();
  }

  function fitRoute() {
    if (!map || !routeLine) return;
    map.fitBounds(routeLine.getBounds(), { padding: [32, 32] });
  }

  function renderFilters() {
    const usedCategories = [...new Set(window.LOCATIONS.map((location) => location.category))];
    usedCategories.push("evening");
    const filters = document.getElementById("filters");
    filters.innerHTML = ["all", ...usedCategories].map((category) => `
      <button type="button" class="filter-button ${activeCategory === category ? "active" : ""}" data-category="${category}" aria-pressed="${activeCategory === category}">
        ${escapeHtml(category === "all" ? t("all") : t(`categories.${category}`))}
      </button>`).join("");
    filters.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => applyFilter(button.dataset.category));
    });
  }

  function applyFilter(category) {
    activeCategory = category;
    markers.forEach((marker) => {
      const shouldShow = category === "all" || marker.category === category;
      if (shouldShow && !map.hasLayer(marker)) marker.addTo(map);
      if (!shouldShow && map.hasLayer(marker)) marker.removeFrom(map);
    });
    document.querySelectorAll(".route-card").forEach((card) => {
      card.hidden = !(category === "all" || card.dataset.category === category);
    });
    document.querySelectorAll(".filter-button").forEach((button) => {
      const active = button.dataset.category === category;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  function showLocation(id) {
    const marker = markers.get(id);
    if (!marker || !map) return;
    if (!map.hasLayer(marker)) {
      activeCategory = "all";
      renderFilters();
      applyFilter("all");
    }
    map.setView(marker.getLatLng(), 17, { animate: true });
    marker.openPopup();
    document.getElementById("map").scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function renderRouteList() {
    const list = document.getElementById("route-list");
    list.innerHTML = window.LOCATIONS.map((location) => {
      const recommendation = location.recommendation
        ? `<p class="recommendation">${escapeHtml(location.recommendation[currentLanguage])}</p>` : "";
      const optional = location.optional ? `<span class="optional-pill">${escapeHtml(t("optionalStop"))}</span>` : "";
      return `
        <article class="route-card" data-category="${location.category}" id="stop-${location.id}">
          <div class="stop-number" style="background:${categoryColors[location.category]}">${location.order}</div>
          <div>
            <h3>${escapeHtml(location.name[currentLanguage])}</h3>
            <div class="local-name">${escapeHtml(location.localName)}</div>
            <p>${escapeHtml(location.description[currentLanguage])}</p>
            ${recommendation}
            <div class="card-actions">
              <button type="button" class="card-button show-location" data-location="${location.id}">${escapeHtml(t("showOnRoute"))}</button>
              <a class="card-button secondary" href="${googleNavigationUrl(location)}" target="_blank" rel="noopener">${escapeHtml(t("navigate"))}</a>
            </div>
          </div>
          <div class="card-meta">
            <span class="category-pill">${escapeHtml(t(`categories.${location.category}`))}</span>
            <span class="time-pill">${escapeHtml(location.time[currentLanguage])}</span>
            ${optional}
          </div>
        </article>`;
    }).join("");
    list.querySelectorAll(".show-location").forEach((button) => {
      button.addEventListener("click", () => showLocation(button.dataset.location));
    });
    applyFilter(activeCategory);
  }

  function renderSchedule() {
    document.getElementById("schedule-list").innerHTML = t("schedule").map(([time, label]) => `
      <li><time>${escapeHtml(time)}</time><span>${escapeHtml(label)}</span></li>`).join("");
  }

  function renderTips() {
    document.getElementById("tips-list").innerHTML = t("tips").map((tip) => `<li>${escapeHtml(tip)}</li>`).join("");
  }

  function renderEvening() {
    document.getElementById("evening-list").innerHTML = window.EVENING_LOCATIONS.map((location) => `
      <article class="evening-item">
        <h3>${escapeHtml(location.name[currentLanguage])}</h3>
        <div class="local-name">${escapeHtml(location.localName)}</div>
        <p>${escapeHtml(location.description[currentLanguage])}</p>
        <div class="card-actions">
          <button type="button" class="card-button show-location" data-location="${location.id}">${escapeHtml(t("showOnRoute"))}</button>
          <a class="card-button secondary" href="${googleNavigationUrl(location)}" target="_blank" rel="noopener">${escapeHtml(t("navigate"))}</a>
        </div>
      </article>`).join("");
    document.querySelectorAll(".evening-item .show-location").forEach((button) => {
      button.addEventListener("click", () => showLocation(button.dataset.location));
    });
  }

  function refreshMarkerLanguage() {
    markers.forEach((marker) => {
      const location = marker.locationData;
      marker.setIcon(L.divIcon({
        className: "custom-marker",
        html: markerHtml(location, marker.evening),
        iconSize: [34, 34], iconAnchor: [17, 32], popupAnchor: [0, -30]
      }));
      marker.setPopupContent(popupHtml(location, marker.evening));
      marker.options.title = location.name[currentLanguage];
      marker.options.alt = location.name[currentLanguage];
    });
    if (currentOpenId && markers.has(currentOpenId)) markers.get(currentOpenId).openPopup();
  }

  function setLanguage(language) {
    if (!supportedLanguages.includes(language)) return;
    currentLanguage = language;
    localStorage.setItem("wroclaw24-language", language);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", language);
    history.replaceState({}, "", url);
    updateDocumentLanguage();
    translateStaticContent();
    renderFilters();
    renderRouteList();
    renderSchedule();
    renderTips();
    renderEvening();
    if (map) refreshMarkerLanguage();
    updateCampaignNotice();
  }

  function updateCampaignNotice() {
    const notice = document.getElementById("campaign-route-notice");
    if (!notice || !window.WROC_CAMPAIGN_ACCESS?.isFreeNow()) return;
    notice.textContent = window.WROC_CAMPAIGN_ACCESS.text("freeUntil", currentLanguage);
    notice.hidden = false;
  }

  function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");
    window.setTimeout(() => toast.classList.remove("show"), 2200);
  }

  async function shareMap() {
    const url = new URL(window.location.href);
    url.searchParams.set("lang", currentLanguage);
    const data = { title: t("shareTitleText"), text: t("shareText"), url: url.toString() };
    try {
      if (navigator.share) await navigator.share(data);
      else {
        await navigator.clipboard.writeText(data.url);
        showToast(t("linkCopied"));
      }
    } catch (error) {
      if (error && error.name === "AbortError") return;
      try {
        await navigator.clipboard.writeText(data.url);
        showToast(t("linkCopied"));
      } catch (_) {
        showToast(t("shareFailed"));
      }
    }
  }

  function bindControls() {
    document.querySelectorAll(".language-button").forEach((button) => {
      button.addEventListener("click", () => setLanguage(button.dataset.lang));
    });
    document.getElementById("fit-route").addEventListener("click", fitRoute);
    ["share-button", "share-button-bottom"].forEach((id) => document.getElementById(id).addEventListener("click", shareMap));
    ["print-button", "print-button-bottom"].forEach((id) => document.getElementById(id).addEventListener("click", () => window.print()));
  }

  const access = await window.WROC_CAMPAIGN_ACCESS.authorize(currentLanguage);
  if (!access.allowed) return;

  updateDocumentLanguage();
  translateStaticContent();
  renderFilters();
  renderRouteList();
  renderSchedule();
  renderTips();
  renderEvening();
  bindControls();
  initMap();
  updateCampaignNotice();
})();
