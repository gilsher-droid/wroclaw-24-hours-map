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
  let activeGallery = null;
  let activeGalleryIndex = 0;
  let galleryTrigger = null;
  let activeVideoLocation = null;
  let activeVideoIndex = 0;
  let videoTrigger = null;

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

  const compactActionLabels = {
    he: { navigate: "ניווט", facebook: "הפוסט", instagram: "אינסטגרם", photos: "תמונות", videos: "וידאו" },
    en: { navigate: "Navigate", facebook: "Post", instagram: "Instagram", photos: "Photos", videos: "Video" },
    pl: { navigate: "Nawigacja", facebook: "Post", instagram: "Instagram", photos: "Zdjęcia", videos: "Wideo" },
    de: { navigate: "Navigation", facebook: "Beitrag", instagram: "Instagram", photos: "Fotos", videos: "Video" },
    cs: { navigate: "Navigace", facebook: "Příspěvek", instagram: "Instagram", photos: "Fotografie", videos: "Video" }
  };

  function actionLabel(key) {
    return compactActionLabels[currentLanguage]?.[key] || compactActionLabels.en[key];
  }

  function resourceActionsHtml(location) {
    const resources = location.resources || {};
    const actions = [
      `<a class="resource-icon navigate-resource" href="${googleNavigationUrl(location)}" target="_blank" rel="noopener" aria-label="${escapeHtml(t("navigate"))}" title="${escapeHtml(t("navigate"))}"><span class="brand-icon media" aria-hidden="true">↗</span><span>${escapeHtml(actionLabel("navigate"))}</span></a>`
    ];
    if (resources.facebook) {
      actions.push(`<a class="resource-icon facebook-resource" href="${escapeHtml(resources.facebook)}" target="_blank" rel="noopener" aria-label="${escapeHtml(t("facebookPost"))}" title="${escapeHtml(t("facebookPost"))}"><span class="brand-icon facebook" aria-hidden="true">f</span><span>${escapeHtml(actionLabel("facebook"))}</span></a>`);
    }
    if (resources.instagram) {
      actions.push(`<a class="resource-icon instagram-resource" href="${escapeHtml(resources.instagram)}" target="_blank" rel="noopener" aria-label="${escapeHtml(t("instagramPost"))}" title="${escapeHtml(t("instagramPost"))}"><span class="brand-icon instagram" aria-hidden="true">◎</span><span>${escapeHtml(actionLabel("instagram"))}</span></a>`);
    }
    if (resources.gallery?.length) {
      actions.push(`<button type="button" class="resource-icon gallery-resource open-gallery" data-location="${escapeHtml(location.id)}" aria-label="${escapeHtml(t("photoGallery"))}" title="${escapeHtml(t("photoGallery"))}"><span class="brand-icon media" aria-hidden="true">▣</span><span>${escapeHtml(actionLabel("photos"))}</span></button>`);
    }
    if (resources.videos?.length) {
      actions.push(`<button type="button" class="resource-icon video-resource open-video" data-location="${escapeHtml(location.id)}" aria-label="${escapeHtml(t("videoGallery"))}" title="${escapeHtml(t("videoGallery"))}"><span class="brand-icon media" aria-hidden="true">▶</span><span>${escapeHtml(actionLabel("videos"))}</span></button>`);
    }
    return `<div class="resource-actions" aria-label="${escapeHtml(location.name[currentLanguage])}">${actions.join("")}</div>`;
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
      ${resourceActionsHtml(location)}
      <div class="popup-actions">
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

  function fitFilteredMarkers(category) {
    if (!map) return;
    if (category === "all") {
      fitRoute();
      return;
    }
    const visibleLocations = category === "evening"
      ? window.EVENING_LOCATIONS
      : window.LOCATIONS.filter((location) => location.category === category);
    if (!visibleLocations.length) return;
    map.stop();
    map.invalidateSize({ pan: false });
    if (visibleLocations.length === 1) {
      map.setView(visibleLocations[0].coordinates, 15, { animate: false });
      return;
    }
    const bounds = L.latLngBounds(visibleLocations.map((location) => location.coordinates));
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15, animate: false });
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
      button.addEventListener("click", () => {
        const selectedCategory = button.dataset.category;
        applyFilter(selectedCategory !== "all" && selectedCategory === activeCategory ? "all" : selectedCategory);
      });
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
    window.requestAnimationFrame(() => fitFilteredMarkers(category));
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

  function showEntireRoute() {
    if (activeCategory !== "all") applyFilter("all");
    fitRoute();
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
            </div>
            ${resourceActionsHtml(location)}
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
        </div>
        ${resourceActionsHtml(location)}
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

  function allLocations() {
    return [...window.LOCATIONS, ...window.EVENING_LOCATIONS];
  }

  function renderGalleryPhoto() {
    if (!activeGallery) return;
    const images = activeGallery.resources.gallery;
    const image = document.getElementById("gallery-image");
    image.src = images[activeGalleryIndex];
    image.alt = `${activeGallery.name[currentLanguage]} — ${t("galleryPhoto")} ${activeGalleryIndex + 1}`;
    document.getElementById("gallery-counter").textContent = `${t("galleryPhoto")} ${activeGalleryIndex + 1} ${t("galleryOf")} ${images.length}`;
    document.querySelectorAll(".gallery-thumbnail").forEach((button, index) => {
      const active = index === activeGalleryIndex;
      button.classList.toggle("active", active);
      button.setAttribute("aria-current", active ? "true" : "false");
    });
  }

  function openGallery(locationId, trigger) {
    const location = allLocations().find((item) => item.id === locationId);
    if (!location?.resources?.gallery?.length) return;
    activeGallery = location;
    activeGalleryIndex = 0;
    galleryTrigger = trigger || null;
    const modal = document.getElementById("gallery-modal");
    document.getElementById("gallery-title").textContent = location.name[currentLanguage];
    document.getElementById("gallery-thumbnails").innerHTML = location.resources.gallery.map((src, index) => `
      <button type="button" class="gallery-thumbnail" data-gallery-index="${index}" aria-label="${escapeHtml(t("galleryPhoto"))} ${index + 1}">
        <img src="${escapeHtml(src)}" alt="" loading="lazy" />
      </button>`).join("");
    modal.hidden = false;
    document.body.classList.add("gallery-open");
    renderGalleryPhoto();
    document.getElementById("gallery-close").focus();
  }

  function closeGallery() {
    const modal = document.getElementById("gallery-modal");
    if (modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove("gallery-open");
    document.getElementById("gallery-image").removeAttribute("src");
    activeGallery = null;
    if (galleryTrigger?.isConnected) galleryTrigger.focus();
    galleryTrigger = null;
  }

  function moveGallery(direction) {
    if (!activeGallery) return;
    const length = activeGallery.resources.gallery.length;
    activeGalleryIndex = (activeGalleryIndex + direction + length) % length;
    renderGalleryPhoto();
  }

  function translateGalleryControls() {
    const close = document.getElementById("gallery-close");
    const previous = document.getElementById("gallery-prev");
    const next = document.getElementById("gallery-next");
    close.setAttribute("aria-label", t("closeGallery"));
    close.title = t("closeGallery");
    previous.setAttribute("aria-label", t("previousPhoto"));
    previous.title = t("previousPhoto");
    next.setAttribute("aria-label", t("nextPhoto"));
    next.title = t("nextPhoto");
  }

  function renderVideo() {
    if (!activeVideoLocation) return;
    const videos = activeVideoLocation.resources.videos;
    const selected = videos[activeVideoIndex];
    const player = document.getElementById("video-player");
    player.pause();
    player.src = selected.src;
    player.setAttribute("aria-label", selected.title[currentLanguage]);
    document.getElementById("video-title").textContent = `${activeVideoLocation.name[currentLanguage]} — ${selected.title[currentLanguage]}`;
    document.querySelectorAll(".video-choice").forEach((button, index) => {
      const active = index === activeVideoIndex;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
      button.textContent = videos[index].title[currentLanguage];
    });
  }

  function openVideo(locationId, trigger) {
    const location = allLocations().find((item) => item.id === locationId);
    if (!location?.resources?.videos?.length) return;
    activeVideoLocation = location;
    activeVideoIndex = 0;
    videoTrigger = trigger || null;
    document.getElementById("video-choices").innerHTML = location.resources.videos.map((video, index) => `
      <button type="button" class="video-choice" data-video-index="${index}" aria-pressed="${index === 0}">${escapeHtml(video.title[currentLanguage])}</button>`).join("");
    document.getElementById("video-modal").hidden = false;
    document.body.classList.add("gallery-open");
    renderVideo();
    document.getElementById("video-close").focus();
  }

  function closeVideo() {
    const modal = document.getElementById("video-modal");
    if (modal.hidden) return;
    const player = document.getElementById("video-player");
    player.pause();
    player.removeAttribute("src");
    player.load();
    modal.hidden = true;
    document.body.classList.remove("gallery-open");
    activeVideoLocation = null;
    if (videoTrigger?.isConnected) videoTrigger.focus();
    videoTrigger = null;
  }

  function translateVideoControls() {
    const close = document.getElementById("video-close");
    close.setAttribute("aria-label", t("closeVideo"));
    close.title = t("closeVideo");
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
    translateGalleryControls();
    translateVideoControls();
    if (activeGallery) {
      document.getElementById("gallery-title").textContent = activeGallery.name[currentLanguage];
      renderGalleryPhoto();
    }
    if (activeVideoLocation) renderVideo();
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
    document.getElementById("fit-route").addEventListener("click", showEntireRoute);
    ["share-button", "share-button-bottom"].forEach((id) => document.getElementById(id).addEventListener("click", shareMap));
    ["print-button", "print-button-bottom"].forEach((id) => document.getElementById(id).addEventListener("click", () => window.print()));
    document.addEventListener("click", (event) => {
      const galleryButton = event.target.closest(".open-gallery");
      if (galleryButton) openGallery(galleryButton.dataset.location, galleryButton);
      const videoButton = event.target.closest(".open-video");
      if (videoButton) openVideo(videoButton.dataset.location, videoButton);
      const thumbnail = event.target.closest(".gallery-thumbnail");
      if (thumbnail && activeGallery) {
        activeGalleryIndex = Number(thumbnail.dataset.galleryIndex);
        renderGalleryPhoto();
      }
      if (event.target.matches("[data-close-gallery]")) closeGallery();
      if (event.target.matches("[data-close-video]")) closeVideo();
      const videoChoice = event.target.closest(".video-choice");
      if (videoChoice && activeVideoLocation) {
        activeVideoIndex = Number(videoChoice.dataset.videoIndex);
        renderVideo();
      }
    });
    document.getElementById("gallery-close").addEventListener("click", closeGallery);
    document.getElementById("gallery-prev").addEventListener("click", () => moveGallery(-1));
    document.getElementById("gallery-next").addEventListener("click", () => moveGallery(1));
    document.getElementById("video-close").addEventListener("click", closeVideo);
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && activeVideoLocation) closeVideo();
      else if (event.key === "Escape" && activeGallery) closeGallery();
      if (activeGallery && event.key === "ArrowLeft") moveGallery(-1);
      if (activeGallery && event.key === "ArrowRight") moveGallery(1);
    });
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
  translateGalleryControls();
  translateVideoControls();
  bindControls();
  initMap();
  updateCampaignNotice();
})();
