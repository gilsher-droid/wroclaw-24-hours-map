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
  const youtubeLabels = { he: "צפייה ביוטיוב", en: "Watch on YouTube", pl: "Oglądaj w YouTube", de: "Auf YouTube ansehen", cs: "Sledovat na YouTube" };
  const englishLabels = { pl: "po angielsku", de: "auf Englisch", cs: "anglicky" };
  const multilingualVideo = (url) => url === "/assets/guide-four-domes-en-de-cs-pl.mp4";
  const subtitleLabels = {
    en: "English · DE/CZ/PL subtitles", pl: "Angielski · napisy DE/CZ/PL",
    de: "Englisch · Untertitel DE/CZ/PL", cs: "Anglicky · titulky DE/CZ/PL",
  };
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
  const youtubeId = (url) => /^https:\/\/youtube\.com\/shorts\/([A-Za-z0-9_-]{11})$/.exec(url)?.[1] || null;
  const captionLanguage = (lang) => (["en", "pl", "de", "cs"].includes(lang) ? lang : null);
  const embedUrlFor = (url, lang) => {
    const id = youtubeId(url);
    if (!id) return null;
    const params = new URLSearchParams({ autoplay: "1", hl: lang });
    const captions = captionLanguage(lang);
    if (captions) {
      params.set("cc_load_policy", "1");
      params.set("cc_lang_pref", captions);
    }
    return `https://www.youtube-nocookie.com/embed/${id}?${params}`;
  };

  function dialogFor(lang, title) {
    let dialog = document.querySelector(".guide-video-dialog");
    if (!dialog) {
      dialog = document.createElement("dialog");
      dialog.className = "guide-video-dialog";
      dialog.innerHTML = '<div class="guide-video-panel"><button class="guide-video-close" type="button"></button><h2></h2><video controls playsinline preload="metadata" hidden></video><iframe title="" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen referrerpolicy="strict-origin-when-cross-origin" hidden></iframe><a class="guide-video-youtube" target="_blank" rel="noopener noreferrer" hidden></a></div>';
      dialog.querySelector(".guide-video-close").addEventListener("click", () => dialog.close());
      dialog.addEventListener("close", () => {
        const video = dialog.querySelector("video");
        video.pause();
        video.removeAttribute("src");
        video.load();
        dialog.querySelector("iframe").removeAttribute("src");
      });
      document.body.appendChild(dialog);
    }
    dialog.classList.remove("guide-video-multilingual");
    dialog.querySelector("h2").textContent = title;
    dialog.querySelector(".guide-video-close").textContent = closeLabels[lang] || closeLabels.en;
    return dialog;
  }

  function openLocalVideo(url, title, lang) {
    const dialog = dialogFor(lang, title);
    dialog.querySelector("iframe").hidden = true;
    dialog.querySelector(".guide-video-youtube").hidden = true;
    const video = dialog.querySelector("video");
    video.hidden = false;
    video.src = url;
    dialog.classList.toggle("guide-video-multilingual", multilingualVideo(url));
    dialog.showModal();
  }

  function openYouTubeVideo(url, title, lang) {
    const embed = embedUrlFor(url, lang);
    if (!embed) return;
    const dialog = dialogFor(lang, title);
    dialog.querySelector("video").hidden = true;
    const frame = dialog.querySelector("iframe");
    frame.hidden = false;
    frame.title = title;
    frame.src = embed;
    const link = dialog.querySelector(".guide-video-youtube");
    link.hidden = false;
    link.href = url;
    link.textContent = youtubeLabels[lang] || youtubeLabels.en;
    dialog.showModal();
  }

  function button(id, lang = language(), resourceClass = "") {
    const url = sourceFor(id, lang);
    if (!url) return "";
    const suffix = multilingualVideo(url) ? subtitleLabels[lang] || subtitleLabels.en : englishLabels[lang];
    const title = `${labels[lang] || labels.en}${suffix ? ` · ${suffix}` : ""}`;
    if (localVideo(url)) {
      return `<button class="guide-video-action${resourceClass ? ` ${escapeHtml(resourceClass)}` : ""}" type="button" data-guide-video-src="${escapeHtml(url)}" data-guide-video-lang="${escapeHtml(lang)}" aria-label="${escapeHtml(title)}" title="${escapeHtml(title)}"><span class="brand-icon guide" aria-hidden="true"><img src="/assets/logo.png" alt=""></span><span>${escapeHtml(title)}</span></button>`;
    }
    return `<a class="guide-video-action${resourceClass ? ` ${escapeHtml(resourceClass)}` : ""}" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer" data-guide-video-src="${escapeHtml(url)}" data-guide-video-lang="${escapeHtml(lang)}" aria-label="${escapeHtml(title)}" title="${escapeHtml(title)}"><span class="brand-icon guide" aria-hidden="true"><img src="/assets/logo.png" alt=""></span><span>${escapeHtml(title)}</span></a>`;
  }

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest?.("[data-guide-video-src]");
    const url = trigger?.dataset.guideVideoSrc;
    if (!url) return;
    const lang = trigger.dataset.guideVideoLang || language();
    const title = trigger.getAttribute("title") || labels.en;
    if (localVideo(url)) openLocalVideo(url, title, lang);
    else if (youtubeId(url)) {
      event.preventDefault();
      openYouTubeVideo(url, title, lang);
    }
  });

  window.WROC_GUIDE_VIDEO = Object.freeze({ button, sourceFor, embedUrlFor });
})();
