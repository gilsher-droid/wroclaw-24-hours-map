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
  const multilingualVideo = (url) => /^\/assets\/guide-[A-Za-z0-9._-]+-en-de-cs-pl\.mp4$/.test(url);
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

  let captionsPromise;
  const cueAt = (cues, time) => cues.find(([start, end]) => time >= start && time < end)?.[2] || ["", "", ""];
  const playerCaptions = () => captionsPromise ||= fetch("/data/guide-player-captions.json?v=20261001-1")
    .then((response) => { if (!response.ok) throw new Error("Captions unavailable"); return response.json(); })
    .catch(() => { captionsPromise = null; return null; });

  function dialogFor(lang, title) {
    let dialog = document.querySelector(".guide-video-dialog");
    if (!dialog) {
      dialog = document.createElement("dialog");
      dialog.className = "guide-video-dialog";
      dialog.setAttribute("aria-label", "Travel guide");
      dialog.innerHTML = '<div class="guide-video-panel"><button class="guide-video-close" type="button"></button><h2></h2><div class="guide-video-stage"><video controls playsinline preload="metadata" hidden></video><section class="guide-video-captions" aria-label="DE / CZ / PL" hidden><div><h3 lang="de">Deutsch</h3><p lang="de"></p></div><div><h3 lang="cs">Čeština</h3><p lang="cs"></p></div><div><h3 lang="pl">Polski</h3><p lang="pl"></p></div></section></div><button class="guide-video-fullscreen" type="button" hidden></button><iframe title="" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen referrerpolicy="strict-origin-when-cross-origin" hidden></iframe><a class="guide-video-youtube" target="_blank" rel="noopener noreferrer" hidden></a></div>';
      const fullscreen = dialog.querySelector(".guide-video-fullscreen");
      fullscreen.addEventListener("click", () => {
        if (dialog.classList.contains("guide-video-expanded")) {
          dialog.classList.remove("guide-video-expanded");
          fullscreen.textContent = fullscreen.dataset.enterLabel;
          return;
        }
        const operation = document.fullscreenElement ? document.exitFullscreen() : dialog.requestFullscreen?.();
        if (!operation) {
          dialog.classList.add("guide-video-expanded");
          fullscreen.textContent = fullscreen.dataset.exitLabel;
        }
        operation?.then(() => { fullscreen.textContent = document.fullscreenElement ? fullscreen.dataset.exitLabel : fullscreen.dataset.enterLabel; })
          .catch(() => { dialog.classList.add("guide-video-expanded"); fullscreen.textContent = fullscreen.dataset.exitLabel; });
      });
      document.addEventListener("fullscreenchange", () => {
        fullscreen.textContent = document.fullscreenElement === dialog ? fullscreen.dataset.exitLabel : fullscreen.dataset.enterLabel;
      });
      dialog.querySelector("video").addEventListener("timeupdate", () => updateCaptions(dialog));
      dialog.querySelector("video").addEventListener("seeked", () => updateCaptions(dialog));
      dialog.querySelector("video").addEventListener("error", () => {
        if (!dialog.classList.contains("guide-video-responsive")) return;
        dialog._captionCues = null;
        dialog.classList.remove("guide-video-responsive", "guide-video-expanded");
        dialog.classList.add("guide-video-multilingual");
        dialog.querySelector(".guide-video-captions").hidden = true;
        dialog.querySelector(".guide-video-fullscreen").hidden = true;
        dialog.querySelector("video").removeAttribute("controlsList");
        dialog.querySelector("video").src = dialog._fallbackUrl;
      });
      dialog.querySelector(".guide-video-close").addEventListener("click", () => dialog.close());
      dialog.addEventListener("close", () => {
        const video = dialog.querySelector("video");
        if (document.fullscreenElement === dialog) document.exitFullscreen()?.catch(() => {});
        dialog._captionCues = null;
        video.pause();
        video.removeAttribute("src");
        video.load();
        dialog.querySelector("iframe").removeAttribute("src");
      });
      document.body.appendChild(dialog);
    }
    dialog.classList.remove("guide-video-multilingual", "guide-video-responsive", "guide-video-expanded");
    dialog._captionCues = null;
    dialog.querySelector(".guide-video-captions").hidden = true;
    dialog.querySelector(".guide-video-fullscreen").hidden = true;
    dialog.querySelector("video").removeAttribute("controlsList");
    dialog.querySelector("h2").textContent = title;
    dialog.querySelector(".guide-video-close").textContent = closeLabels[lang] || closeLabels.en;
    return dialog;
  }

  function updateCaptions(dialog) {
    if (!dialog._captionCues) return;
    const text = cueAt(dialog._captionCues, dialog.querySelector("video").currentTime);
    dialog.querySelectorAll(".guide-video-captions p").forEach((paragraph, index) => {
      paragraph.textContent = text[index];
    });
  }

  async function openLocalVideo(url, title, lang) {
    const dialog = dialogFor(lang, title);
    dialog.querySelector("iframe").hidden = true;
    dialog.querySelector(".guide-video-youtube").hidden = true;
    const video = dialog.querySelector("video");
    video.hidden = false;
    dialog._fallbackUrl = url;
    video.src = url;
    dialog.classList.toggle("guide-video-multilingual", multilingualVideo(url));
    dialog.showModal();
    if (!multilingualVideo(url)) return;
    const edition = (await playerCaptions())?.[url];
    if (!edition || !dialog.open || video.getAttribute("src") !== url) return;
    dialog._captionCues = edition.cues;
    dialog.querySelector("h2").textContent = `${labels[lang] || labels.en} · DE / CZ / PL`;
    video.src = edition.source;
    dialog.classList.remove("guide-video-multilingual");
    dialog.classList.add("guide-video-responsive");
    video.setAttribute("controlsList", "nofullscreen");
    dialog.querySelector(".guide-video-captions").hidden = false;
    const fullscreen = dialog.querySelector(".guide-video-fullscreen");
    fullscreen.textContent = ({he:"מסך מלא",en:"Full screen",pl:"Pełny ekran",de:"Vollbild",cs:"Celá obrazovka"})[lang] || "Full screen";
    fullscreen.dataset.enterLabel = fullscreen.textContent;
    fullscreen.dataset.exitLabel = ({he:"יציאה ממסך מלא",en:"Exit full screen",pl:"Zamknij pełny ekran",de:"Vollbild verlassen",cs:"Ukončit celou obrazovku"})[lang] || "Exit full screen";
    fullscreen.hidden = false;
    updateCaptions(dialog);
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

  window.WROC_GUIDE_VIDEO = Object.freeze({ button, sourceFor, embedUrlFor, cueAt });
})();
