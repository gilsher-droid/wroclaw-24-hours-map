(function () {
  "use strict";

  const labels = {
    he: "מדריך הטיולים שלנו",
    en: "Our travel guide",
    pl: "Nasz przewodnik",
    de: "Unser Reiseführer",
    cs: "Náš průvodce",
  };
  const closeLabels = { he: "סגירה", en: "Close", pl: "Zamknij", de: "Schließen", cs: "Zavřít" };
  const englishLabels = { pl: "po angielsku", de: "auf Englisch", cs: "anglicky" };
  const escapeHtml = (value) => String(value || "").replace(/[&<>'"]/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;",
  }[char]));
  const placeFor = (id) => window.WROC_CATALOG?.getPlace(id);
  const language = () => document.documentElement.lang || "he";
  const sourceFor = (id, lang = language()) => {
    const videos = placeFor(id)?.media?.guideVideos;
    return videos?.[lang === "he" ? "he" : "en"] || null;
  };
  const localVideo = (url) => /^\/assets\/guide-[A-Za-z0-9._-]+\.mp4$/.test(url);

  function openLocalVideo(url, title, lang) {
    let dialog = document.querySelector(".guide-video-dialog");
    if (!dialog) {
      dialog = document.createElement("dialog");
      dialog.className = "guide-video-dialog";
      dialog.innerHTML = '<div class="guide-video-panel"><button class="guide-video-close" type="button"></button><h2></h2><video controls playsinline preload="metadata"></video></div>';
      dialog.querySelector(".guide-video-close").addEventListener("click", () => dialog.close());
      dialog.addEventListener("close", () => {
        const video = dialog.querySelector("video");
        video.pause();
        video.removeAttribute("src");
        video.load();
      });
      document.body.appendChild(dialog);
    }
    dialog.querySelector("h2").textContent = title;
    dialog.querySelector(".guide-video-close").textContent = closeLabels[lang] || closeLabels.en;
    dialog.querySelector("video").src = url;
    dialog.showModal();
  }

  function button(id, lang = language(), resourceClass = "") {
    const url = sourceFor(id, lang);
    if (!url) return "";
    const title = `${labels[lang] || labels.en}${englishLabels[lang] ? ` · ${englishLabels[lang]}` : ""}`;
    if (localVideo(url)) {
      return `<button class="guide-video-action${resourceClass ? ` ${escapeHtml(resourceClass)}` : ""}" type="button" data-guide-video-src="${escapeHtml(url)}" data-guide-video-lang="${escapeHtml(lang)}" aria-label="${escapeHtml(title)}" title="${escapeHtml(title)}"><span class="brand-icon guide" aria-hidden="true"><img src="/assets/logo.png" alt=""></span><span>${escapeHtml(title)}</span></button>`;
    }
    return `<a class="guide-video-action${resourceClass ? ` ${escapeHtml(resourceClass)}` : ""}" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(title)}" title="${escapeHtml(title)}"><span class="brand-icon guide" aria-hidden="true"><img src="/assets/logo.png" alt=""></span><span>${escapeHtml(title)}</span></a>`;
  }

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest?.("[data-guide-video-src]");
    const url = trigger?.dataset.guideVideoSrc;
    if (url && localVideo(url)) openLocalVideo(url, trigger.getAttribute("title") || labels.en, trigger.dataset.guideVideoLang || language());
  });

  window.WROC_GUIDE_VIDEO = Object.freeze({ button, sourceFor });
})();
