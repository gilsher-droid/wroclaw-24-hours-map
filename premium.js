(async function () {
  "use strict";

  const routeConfig = window.PREMIUM_ROUTE_CONFIG || {};
  const supportedLanguages = ["he", "en", "pl", "de", "cs"];
  const requestedLanguage = new URLSearchParams(window.location.search).get("lang");
  const savedLanguage = localStorage.getItem("wroclaw24-language");
  let language = supportedLanguages.includes(requestedLanguage)
    ? requestedLanguage
    : supportedLanguages.includes(savedLanguage) ? savedLanguage : "he";
  let activeDay = window.PREMIUM_DAYS?.[0]?.id || 1;
  let recommendationFilter = "all";
  let map;
  let routeLine;
  const mapLayers = [];
  const markerById = new Map();
  let activeGallery = null;
  let activeGalleryIndex = 0;
  let galleryTrigger = null;
  let activeVideoLocation = null;
  let activeVideoIndex = 0;
  let videoTrigger = null;
  const placeAmenities = window.WROC_PLACE_AMENITIES;

  const ui = {
    he: {
      documentTitle: "המסלול המלא ל־4 ימים | Wroc-love", skipToRoute: "דלגו למסלול",
      brandSubtitle: "המסלול המלא שלכם", homeLink: "לעמוד הבית",
      eyebrow: "וורוצלב בקצב שמתאים לכן", title: "ארבעה ימים. עיר אחת. בלי לבזבז זמן על תכנון.",
      subtitle: "מסלול לביקור ראשון עבור הורים וילדים מתבגרים: כל יום באזור אחד, עם סדר ברור, מפה חיה, ניווט והמלצות שמתאימות לקצב אמיתי.",
      smartTip: "איך משתמשים במסלול", smartTipBody: "בחרו יום, פתחו תחנה במפה וצאו לניווט. אפשר להחליף בין הימים לפי מזג האוויר והאנרגיה.",
      days: "ימים", routeStops: "תחנות במסלולים", recommendations: "המלצות אוכל, קניות ופנאי", languages: "שפות",
      day: "יום", distance: "הליכה", dayLength: "משך מומלץ", start: "שעת התחלה", stops: "תחנות",
      navigateDay: "פתחו את כל היום ב־Google Maps", fitDay: "הציגו את כל המסלול", swipeDays: "החליקו ימינה או שמאלה כדי לעבור בין הימים", todayAdvice: "המלצת היום",
      orientation: "התמצאות מהירה", mapTitle: "המפה של היום", mapNote: "הקו מציג את סדר התחנות. כפתור הניווט פותח מסלול מותאם לרחובות ב־Google Maps.",
      byOrder: "לפי הסדר", dailySchedule: "לוח היום והתחנות", atAGlance: "במבט אחד", suggestedSchedule: "לוח זמנים מוצע",
      goodToKnow: "כדאי לדעת", flexibility: "גמישות בלי לפספס", betweenStops: "בין התחנות", foodShopping: "אוכל, קפה, קינוחים וקניות",
      communityKicker: "ממשיכים איתנו", communityTitle: "עוד מסלולים, המלצות ועדכונים מוורוצלב", communityBody: "הצטרפו לקהילה, בקרו בדף העסקי ועקבו אחרינו באינסטגרם.",
      joinFacebookGroup: "הצטרפו לקבוצת הפייסבוק", visitFacebookPage: "בקרו בדף העסקי", followInstagram: "עקבו אחרינו באינסטגרם",
      savePhone: "שמרו את הדף בטלפון", closing: "כל ארבעת הימים, המפות והניווט זמינים כרגע ללא תשלום.", backTop: "חזרה לבחירת יום",
      optional: "רשות", recommended: "מומלץ", duration: "זמן במקום", showMap: "הציגו במפה", navigate: "ניווט", bestFor: "מתאים במיוחד ליום",
      all: "הכול", cafe: "קפה", dessert: "קינוחים", food: "אוכל", shopping: "קניות", activity: "בילוי ופנאי", mapUnavailable: "המפה לא נטענה. קישורי הניווט עדיין זמינים.",
      categories: { main: "נקודת פתיחה", special: "חוויה מיוחדת", architecture: "אדריכלות", viewpoint: "תצפית", culture: "תרבות", river: "נהר", nature: "טבע", shopping: "קניות", food: "אוכל" },
      facebookPost: "קראו את הפוסט בפייסבוק", instagramPost: "צפו בפוסט באינסטגרם", photoGallery: "פתחו את גלריית התמונות", videoGallery: "פתחו את הסרטונים",
      closeGallery: "סגירת הגלריה", previousPhoto: "התמונה הקודמת", nextPhoto: "התמונה הבאה", galleryPhoto: "תמונה", galleryOf: "מתוך", closeVideo: "סגירת נגן הווידאו"
    },
    en: {
      documentTitle: "The complete 4-day route | Wroc-love", skipToRoute: "Skip to the route",
      brandSubtitle: "Your complete route", homeLink: "Back to home",
      eyebrow: "Wrocław at your pace", title: "Four days. One city. No wasted planning time.",
      subtitle: "A first-visit route for parents and teenagers: one convenient area each day, with a clear order, live map, navigation and realistic recommendations.",
      smartTip: "How to use the route", smartTipBody: "Choose a day, open a stop on the map and navigate. Swap days according to weather and energy.",
      days: "days", routeStops: "route stops", recommendations: "food, shopping and leisure picks", languages: "languages",
      day: "Day", distance: "walking", dayLength: "recommended length", start: "start time", stops: "stops",
      navigateDay: "Open the full day in Google Maps", fitDay: "Show the full route", swipeDays: "Swipe left or right to move between days", todayAdvice: "Today’s advice",
      orientation: "Quick orientation", mapTitle: "Today’s map", mapNote: "The line shows stop order. The navigation button opens a street-aware route in Google Maps.",
      byOrder: "In order", dailySchedule: "Schedule and stops", atAGlance: "At a glance", suggestedSchedule: "Suggested schedule",
      goodToKnow: "Good to know", flexibility: "Stay flexible without missing out", betweenStops: "Between stops", foodShopping: "Food, coffee, desserts and shopping",
      communityKicker: "Stay with us", communityTitle: "More Wrocław routes, recommendations and updates", communityBody: "Join our community, visit our Facebook page and follow us on Instagram.",
      joinFacebookGroup: "Join the Facebook group", visitFacebookPage: "Visit our Facebook page", followInstagram: "Follow us on Instagram",
      savePhone: "Save this page on your phone", closing: "All four days, maps and navigation are currently available free of charge.", backTop: "Back to day selection",
      optional: "Optional", recommended: "Recommended", duration: "Time here", showMap: "Show on map", navigate: "Navigate", bestFor: "Best with Day",
      all: "All", cafe: "Coffee", dessert: "Desserts", food: "Food", shopping: "Shopping", activity: "Leisure", mapUnavailable: "The map could not load. Navigation links are still available.",
      categories: { main: "Starting point", special: "Special", architecture: "Architecture", viewpoint: "Viewpoint", culture: "Culture", river: "River", nature: "Nature", shopping: "Shopping", food: "Food" },
      facebookPost: "Read the Facebook post", instagramPost: "View the Instagram post", photoGallery: "Open the photo gallery", videoGallery: "Open the videos",
      closeGallery: "Close the gallery", previousPhoto: "Previous photo", nextPhoto: "Next photo", galleryPhoto: "Photo", galleryOf: "of", closeVideo: "Close the video player"
    },
    pl: {
      documentTitle: "Pełna trasa na 4 dni | Wroc-love", skipToRoute: "Przejdź do trasy",
      brandSubtitle: "Pełna trasa", homeLink: "Strona główna",
      eyebrow: "Wrocław w Waszym tempie", title: "Cztery dni. Jedno miasto. Bez tracenia czasu na planowanie.",
      subtitle: "Trasa na pierwszy wyjazd dla rodziców i nastolatków: codziennie jeden wygodny obszar, jasna kolejność, mapa, nawigacja i praktyczne rekomendacje.",
      smartTip: "Jak korzystać z trasy", smartTipBody: "Wybierzcie dzień, otwórzcie punkt na mapie i uruchomcie nawigację. Dni można zamieniać zależnie od pogody i energii.",
      days: "dni", routeStops: "punktów trasy", recommendations: "poleceń jedzenia, zakupów i rekreacji", languages: "języki",
      day: "Dzień", distance: "spacer", dayLength: "zalecany czas", start: "początek", stops: "punkty",
      navigateDay: "Otwórz cały dzień w Google Maps", fitDay: "Pokaż całą trasę", swipeDays: "Przesuń w lewo lub w prawo, aby zmienić dzień", todayAdvice: "Wskazówka dnia",
      orientation: "Szybka orientacja", mapTitle: "Mapa dnia", mapNote: "Linia pokazuje kolejność punktów. Nawigacja otwiera trasę ulicami w Google Maps.",
      byOrder: "Po kolei", dailySchedule: "Plan dnia i punkty", atAGlance: "W skrócie", suggestedSchedule: "Proponowany harmonogram",
      goodToKnow: "Warto wiedzieć", flexibility: "Elastycznie, bez pomijania", betweenStops: "Między punktami", foodShopping: "Jedzenie, kawa, desery i zakupy",
      communityKicker: "Zostańcie z nami", communityTitle: "Więcej tras, rekomendacji i aktualności z Wrocławia", communityBody: "Dołączcie do społeczności, odwiedźcie naszą stronę na Facebooku i obserwujcie nas na Instagramie.",
      joinFacebookGroup: "Dołącz do grupy na Facebooku", visitFacebookPage: "Odwiedź naszą stronę na Facebooku", followInstagram: "Obserwuj nas na Instagramie",
      savePhone: "Zapiszcie stronę w telefonie", closing: "Wszystkie cztery dni, mapy i nawigacja są obecnie dostępne bezpłatnie.", backTop: "Wróć do wyboru dnia",
      optional: "Opcjonalnie", recommended: "Polecane", duration: "Czas na miejscu", showMap: "Pokaż na mapie", navigate: "Nawiguj", bestFor: "Najlepsze w dniu",
      all: "Wszystko", cafe: "Kawa", dessert: "Desery", food: "Jedzenie", shopping: "Zakupy", activity: "Rekreacja", mapUnavailable: "Mapa nie została załadowana. Linki nawigacyjne nadal działają.",
      categories: { main: "Początek", special: "Wyjątkowe", architecture: "Architektura", viewpoint: "Widok", culture: "Kultura", river: "Rzeka", nature: "Natura", shopping: "Zakupy", food: "Jedzenie" },
      facebookPost: "Przeczytaj post na Facebooku", instagramPost: "Zobacz post na Instagramie", photoGallery: "Otwórz galerię zdjęć", videoGallery: "Otwórz filmy",
      closeGallery: "Zamknij galerię", previousPhoto: "Poprzednie zdjęcie", nextPhoto: "Następne zdjęcie", galleryPhoto: "Zdjęcie", galleryOf: "z", closeVideo: "Zamknij odtwarzacz wideo"
    }
  };

  const translateUi = (value, code) => {
    if (typeof value === "string") return window.EXTRA_ROUTE_TRANSLATIONS?.[code]?.[value] || value;
    if (Array.isArray(value)) return value.map((item) => translateUi(item, code));
    if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, translateUi(item, code)]));
    return value;
  };
  ui.de = translateUi(ui.en, "de");
  ui.cs = translateUi(ui.en, "cs");
  Object.assign(ui.de, {
    recommendations: "Empfehlungen für Essen, Einkaufen und Freizeit", activity: "Freizeit",
    swipeDays: "Wischen Sie nach links oder rechts, um den Tag zu wechseln",
    facebookPost: "Facebook-Beitrag lesen", instagramPost: "Instagram-Beitrag ansehen", photoGallery: "Fotogalerie öffnen", videoGallery: "Videos öffnen",
    closeGallery: "Galerie schließen", previousPhoto: "Vorheriges Foto", nextPhoto: "Nächstes Foto", galleryPhoto: "Foto", galleryOf: "von", closeVideo: "Videoplayer schließen"
  });
  Object.assign(ui.cs, {
    recommendations: "tipů na jídlo, nákupy a volný čas", activity: "Volný čas",
    swipeDays: "Přejetím doleva nebo doprava změníte den",
    facebookPost: "Přečíst příspěvek na Facebooku", instagramPost: "Zobrazit příspěvek na Instagramu", photoGallery: "Otevřít fotogalerii", videoGallery: "Otevřít videa",
    closeGallery: "Zavřít galerii", previousPhoto: "Předchozí fotografie", nextPhoto: "Další fotografie", galleryPhoto: "Fotografie", galleryOf: "z", closeVideo: "Zavřít přehrávač videa"
  });
  supportedLanguages.forEach((code) => {
    if (code === "de" || code === "cs") Object.assign(ui[code], translateUi(routeConfig.ui?.en || {}, code));
    Object.assign(ui[code], routeConfig.ui?.[code] || {});
  });

  const categoryColors = {
    main: "#dca94f", special: "#7b61a8", architecture: "#062b5c", viewpoint: "#7b61a8",
    culture: "#2477bd", river: "#55a8d8", nature: "#4f8a71", shopping: "#b76791", food: "#d2764f",
    activity: "#4f8a71"
  };

  function text(value) {
    if (value == null) return "";
    if (typeof value !== "object") return String(value);
    return value[language] || window.EXTRA_ROUTE_TRANSLATIONS?.[language]?.[value.en] || value.en || value.he || "";
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

  function resourcesFor(item) {
    return item.resources || window.WROC_LOCATION_MEDIA?.[item.id] || {};
  }

  const compactActionLabels = {
    he: { navigate: "ניווט", facebook: "הפוסט", instagram: "אינסטגרם", photos: "תמונות", videos: "וידאו" },
    en: { navigate: "Navigate", facebook: "Post", instagram: "Instagram", photos: "Photos", videos: "Video" },
    pl: { navigate: "Nawigacja", facebook: "Post", instagram: "Instagram", photos: "Zdjęcia", videos: "Wideo" },
    de: { navigate: "Navigation", facebook: "Beitrag", instagram: "Instagram", photos: "Fotos", videos: "Video" },
    cs: { navigate: "Navigace", facebook: "Příspěvek", instagram: "Instagram", photos: "Fotografie", videos: "Video" }
  };

  function actionLabel(key) {
    return compactActionLabels[language]?.[key] || compactActionLabels.en[key];
  }

  function resourceActionsHtml(item) {
    const resources = resourcesFor(item);
    const actions = [
      `<a class="resource-icon navigate-resource" href="${googleNavigationUrl(item)}" target="_blank" rel="noopener" aria-label="${escapeHtml(t("navigate"))}" title="${escapeHtml(t("navigate"))}"><span class="brand-icon media" aria-hidden="true">↗</span><span>${escapeHtml(actionLabel("navigate"))}</span></a>`
    ];
    if (resources.facebook) {
      actions.push(`<a class="resource-icon facebook-resource" href="${escapeHtml(resources.facebook)}" target="_blank" rel="noopener" aria-label="${escapeHtml(t("facebookPost"))}" title="${escapeHtml(t("facebookPost"))}"><span class="brand-icon facebook" aria-hidden="true">f</span><span>${escapeHtml(actionLabel("facebook"))}</span></a>`);
    }
    if (resources.instagram) {
      actions.push(`<a class="resource-icon instagram-resource" href="${escapeHtml(resources.instagram)}" target="_blank" rel="noopener" aria-label="${escapeHtml(t("instagramPost"))}" title="${escapeHtml(t("instagramPost"))}"><span class="brand-icon instagram" aria-hidden="true">◎</span><span>${escapeHtml(actionLabel("instagram"))}</span></a>`);
    }
    if (resources.gallery?.length) {
      actions.push(`<button type="button" class="resource-icon gallery-resource" data-open-gallery="${escapeHtml(item.id)}" aria-label="${escapeHtml(t("photoGallery"))}" title="${escapeHtml(t("photoGallery"))}"><span class="brand-icon media" aria-hidden="true">▣</span><span>${escapeHtml(actionLabel("photos"))}</span></button>`);
    }
    if (resources.videos?.length) {
      actions.push(`<button type="button" class="resource-icon video-resource" data-open-video="${escapeHtml(item.id)}" aria-label="${escapeHtml(t("videoGallery"))}" title="${escapeHtml(t("videoGallery"))}"><span class="brand-icon media" aria-hidden="true">▶</span><span>${escapeHtml(actionLabel("videos"))}</span></button>`);
    }
    return `<div class="resource-actions" aria-label="${escapeHtml(text(item.name))}">${actions.join("")}</div>`;
  }

  function ensureResourceModals() {
    if (document.getElementById("gallery-modal")) return;
    document.body.insertAdjacentHTML("beforeend", `
      <div class="gallery-modal" id="gallery-modal" hidden>
        <button type="button" class="gallery-backdrop" data-close-gallery aria-label="${escapeHtml(t("closeGallery"))}"></button>
        <section class="gallery-dialog" role="dialog" aria-modal="true" aria-labelledby="gallery-title">
          <header class="gallery-header"><h2 id="gallery-title"></h2><button type="button" class="gallery-close" id="gallery-close" data-close-gallery>×</button></header>
          <div class="gallery-stage">
            <button type="button" class="gallery-arrow" id="gallery-prev" data-gallery-move="-1">‹</button>
            <img class="gallery-image" id="gallery-image" alt="" />
            <button type="button" class="gallery-arrow" id="gallery-next" data-gallery-move="1">›</button>
          </div>
          <p class="gallery-counter" id="gallery-counter"></p><div class="gallery-thumbnails" id="gallery-thumbnails"></div>
        </section>
      </div>
      <div class="video-modal" id="video-modal" hidden>
        <button type="button" class="gallery-backdrop" data-close-video aria-label="${escapeHtml(t("closeVideo"))}"></button>
        <section class="video-dialog" role="dialog" aria-modal="true" aria-labelledby="video-title">
          <header class="gallery-header"><h2 id="video-title"></h2><button type="button" class="gallery-close" id="video-close" data-close-video>×</button></header>
          <video id="video-player" class="video-player" controls playsinline preload="metadata"></video><div class="video-choices" id="video-choices"></div>
        </section>
      </div>`);
    translateResourceControls();
  }

  function translateResourceControls() {
    const controls = [
      ["gallery-close", "closeGallery"], ["gallery-prev", "previousPhoto"], ["gallery-next", "nextPhoto"], ["video-close", "closeVideo"]
    ];
    controls.forEach(([id, key]) => {
      const control = document.getElementById(id);
      if (!control) return;
      control.setAttribute("aria-label", t(key));
      control.title = t(key);
    });
    document.querySelectorAll("[data-close-gallery]").forEach((element) => element.setAttribute("aria-label", t("closeGallery")));
    document.querySelectorAll("[data-close-video]").forEach((element) => element.setAttribute("aria-label", t("closeVideo")));
  }

  function locationById(id) {
    return window.PREMIUM_STOPS.find((item) => item.id === id);
  }

  function renderGalleryPhoto() {
    if (!activeGallery) return;
    const images = resourcesFor(activeGallery).gallery;
    const image = document.getElementById("gallery-image");
    image.src = images[activeGalleryIndex];
    image.alt = `${text(activeGallery.name)} — ${t("galleryPhoto")} ${activeGalleryIndex + 1}`;
    document.getElementById("gallery-counter").textContent = `${t("galleryPhoto")} ${activeGalleryIndex + 1} ${t("galleryOf")} ${images.length}`;
    document.querySelectorAll(".gallery-thumbnail").forEach((button, index) => {
      const active = index === activeGalleryIndex;
      button.classList.toggle("active", active);
      button.setAttribute("aria-current", active ? "true" : "false");
    });
  }

  function openGallery(id, trigger) {
    const item = locationById(id);
    const images = item && resourcesFor(item).gallery;
    if (!images?.length) return;
    activeGallery = item;
    activeGalleryIndex = 0;
    galleryTrigger = trigger || null;
    document.getElementById("gallery-title").textContent = text(item.name);
    document.getElementById("gallery-thumbnails").innerHTML = images.map((src, index) => `
      <button type="button" class="gallery-thumbnail" data-gallery-index="${index}" aria-label="${escapeHtml(t("galleryPhoto"))} ${index + 1}"><img src="${escapeHtml(src)}" alt="" loading="lazy" /></button>`).join("");
    document.getElementById("gallery-modal").hidden = false;
    document.body.classList.add("gallery-open");
    renderGalleryPhoto();
    document.getElementById("gallery-close").focus();
  }

  function closeGallery() {
    const modal = document.getElementById("gallery-modal");
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove("gallery-open");
    document.getElementById("gallery-image").removeAttribute("src");
    activeGallery = null;
    if (galleryTrigger?.isConnected) galleryTrigger.focus();
    galleryTrigger = null;
  }

  function moveGallery(direction) {
    if (!activeGallery) return;
    const length = resourcesFor(activeGallery).gallery.length;
    activeGalleryIndex = (activeGalleryIndex + direction + length) % length;
    renderGalleryPhoto();
  }

  function renderVideo() {
    if (!activeVideoLocation) return;
    const videos = resourcesFor(activeVideoLocation).videos;
    const selected = videos[activeVideoIndex];
    const player = document.getElementById("video-player");
    player.pause();
    player.src = selected.src;
    player.setAttribute("aria-label", text(selected.title));
    document.getElementById("video-title").textContent = `${text(activeVideoLocation.name)} — ${text(selected.title)}`;
    document.querySelectorAll(".video-choice").forEach((button, index) => {
      const active = index === activeVideoIndex;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
      button.textContent = text(videos[index].title);
    });
  }

  function openVideo(id, trigger) {
    const item = locationById(id);
    const videos = item && resourcesFor(item).videos;
    if (!videos?.length) return;
    activeVideoLocation = item;
    activeVideoIndex = 0;
    videoTrigger = trigger || null;
    document.getElementById("video-choices").innerHTML = videos.map((video, index) => `<button type="button" class="video-choice" data-video-index="${index}" aria-pressed="${index === 0}">${escapeHtml(text(video.title))}</button>`).join("");
    document.getElementById("video-modal").hidden = false;
    document.body.classList.add("gallery-open");
    renderVideo();
    document.getElementById("video-close").focus();
  }

  function closeVideo() {
    const modal = document.getElementById("video-modal");
    if (!modal || modal.hidden) return;
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

  function setDocumentLanguage() {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "he" ? "rtl" : "ltr";
    localStorage.setItem("wroclaw24-language", language);
    document.title = t("documentTitle") === "documentTitle" ? document.title : t("documentTitle");
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
    document.querySelectorAll("[data-home-link]").forEach((link) => {
      link.href = `/?lang=${language}`;
    });
    translateResourceControls();
    if (activeGallery) {
      document.getElementById("gallery-title").textContent = text(activeGallery.name);
      renderGalleryPhoto();
    }
    if (activeVideoLocation) renderVideo();
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
            <div class="stop-badges"><span>${escapeHtml(t(`categories.${item.category}`))}</span>${item.optional ? `<span class="optional-badge">${escapeHtml(t("optional"))}</span>` : ""}${placeAmenities.labelBadgeHtml(item, language)}</div>
          </div>
          <p>${escapeHtml(text(item.description))}</p>
          <p class="stop-tip"><strong>${escapeHtml(t("recommended"))}:</strong> ${escapeHtml(text(item.tip))}</p>
          <div class="stop-actions">
            <button type="button" data-show-stop="${item.id}">${escapeHtml(t("showMap"))}</button>
          </div>
          ${resourceActionsHtml(item)}
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
    return `<div class="premium-popup"><strong>${escapeHtml(text(item.name))}</strong><span>${escapeHtml(item.localName)}</span>${placeAmenities.labelBadgeHtml(item, language)}<p>${escapeHtml(text(item.description))}</p>${resourceActionsHtml(item)}</div>`;
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
        html: `<div class="premium-marker" style="--marker-color:${categoryColors[item.category]}"><span>${item.order}</span>${placeAmenities.markerBadgeHtml(item, language)}</div>`,
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

  function fitDay({ scroll = false } = {}) {
    if (!map || !routeLine) return;
    map.invalidateSize();
    map.fitBounds(routeLine.getBounds(), { padding: [36, 36] });
    if (scroll) document.getElementById("premium-map").scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function showStop(id) {
    const marker = markerById.get(id);
    if (!marker || !map) return;
    map.setView(marker.getLatLng(), 17, { animate: true });
    marker.openPopup();
    document.getElementById("premium-map").scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function renderRecommendationFilters() {
    const categories = ["all", "cafe", "dessert", "food", "shopping", "activity"];
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
        ${placeAmenities.labelBadgeHtml(item, language)}
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
      render();
      document.querySelector(".premium-map-section").scrollIntoView({ behavior: "smooth", block: "start" });
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
      return;
    }
    const galleryButton = event.target.closest("[data-open-gallery]");
    if (galleryButton) { openGallery(galleryButton.dataset.openGallery, galleryButton); return; }
    const videoButton = event.target.closest("[data-open-video]");
    if (videoButton) { openVideo(videoButton.dataset.openVideo, videoButton); return; }
    if (event.target.closest("[data-close-gallery]")) { closeGallery(); return; }
    if (event.target.closest("[data-close-video]")) { closeVideo(); return; }
    const galleryMove = event.target.closest("[data-gallery-move]");
    if (galleryMove) { moveGallery(Number(galleryMove.dataset.galleryMove)); return; }
    const galleryThumbnail = event.target.closest("[data-gallery-index]");
    if (galleryThumbnail) { activeGalleryIndex = Number(galleryThumbnail.dataset.galleryIndex); renderGalleryPhoto(); return; }
    const videoChoice = event.target.closest("[data-video-index]");
    if (videoChoice) { activeVideoIndex = Number(videoChoice.dataset.videoIndex); renderVideo(); }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") { closeGallery(); closeVideo(); }
    if (activeGallery && event.key === "ArrowLeft") moveGallery(document.documentElement.dir === "rtl" ? 1 : -1);
    if (activeGallery && event.key === "ArrowRight") moveGallery(document.documentElement.dir === "rtl" ? -1 : 1);
  });

  document.getElementById("fit-day").addEventListener("click", () => fitDay({ scroll: true }));
  await window.WROC_CAMPAIGN_ACCESS.authorize(language);
  ensureResourceModals();
  render();
})();
