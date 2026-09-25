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
  const escapeHtml = (value) => String(value || "").replace(/[&<>'"]/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;",
  }[char]));
  const placeFor = (id) => window.WROC_CATALOG?.getPlace(id);
  const language = () => document.documentElement.lang || "he";
  const sourceFor = (id, lang = language()) => {
    const videos = placeFor(id)?.media?.guideVideos;
    return videos?.[lang === "he" ? "he" : "en"] || null;
  };

  function button(id, lang, resourceClass = "") {
    if (!sourceFor(id, lang)) return "";
    const title = labels[lang] || labels.en;
    return `<button type="button" class="guide-video-action${resourceClass ? ` ${escapeHtml(resourceClass)}` : ""}" data-guide-video="${escapeHtml(id)}" aria-label="${escapeHtml(title)}" title="${escapeHtml(title)}"><span class="brand-icon guide" aria-hidden="true"><img src="/assets/logo.png" alt=""></span><span>${escapeHtml(title)}</span></button>`;
  }

  let trigger = null;
  function close() {
    const dialog = document.getElementById("guide-video-modal");
    if (!dialog || dialog.hidden) return;
    const player = dialog.querySelector("video");
    player.pause();
    player.removeAttribute("src");
    player.load();
    dialog.hidden = true;
    document.body.classList.remove("guide-video-open");
    if (trigger?.isConnected) trigger.focus();
    trigger = null;
  }

  function open(id, clicked) {
    const lang = language();
    const src = sourceFor(id, lang);
    if (!src) return;
    const place = placeFor(id);
    const dialog = document.getElementById("guide-video-modal");
    trigger = clicked || null;
    dialog.querySelector("h2").textContent = `${labels[lang] || labels.en} — ${place.name?.[lang] || place.name?.en || place.localName}`;
    const closeButton = dialog.querySelector("button[data-close-guide-video]");
    closeButton.setAttribute("aria-label", closeLabels[lang] || closeLabels.en);
    const player = dialog.querySelector("video");
    player.src = src;
    player.setAttribute("aria-label", dialog.querySelector("h2").textContent);
    dialog.hidden = false;
    document.body.classList.add("guide-video-open");
    closeButton.focus();
  }

  document.body.insertAdjacentHTML("beforeend", `<div class="guide-video-modal" id="guide-video-modal" hidden role="dialog" aria-modal="true" aria-labelledby="guide-video-title"><div class="guide-video-backdrop" data-close-guide-video></div><section class="guide-video-dialog"><header><h2 id="guide-video-title"></h2><button type="button" class="guide-video-close" data-close-guide-video aria-label="Close">×</button></header><video controls playsinline preload="metadata"></video></section></div>`);
  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-guide-video]");
    if (button) { event.preventDefault(); open(button.dataset.guideVideo, button); return; }
    if (event.target.closest("#guide-video-modal [data-close-guide-video]")) close();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") close();
  });
  window.WROC_GUIDE_VIDEO = Object.freeze({ button, sourceFor, open, close });
})();
