(function () {
  "use strict";

  const labels = {
    he: "מדריך הטיולים שלנו",
    en: "Our travel guide",
    pl: "Nasz przewodnik",
    de: "Unser Reiseführer",
    cs: "Náš průvodce",
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

  function button(id, lang = language(), resourceClass = "") {
    const url = sourceFor(id, lang);
    if (!url) return "";
    const title = labels[lang] || labels.en;
    return `<a class="guide-video-action${resourceClass ? ` ${escapeHtml(resourceClass)}` : ""}" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(title)}" title="${escapeHtml(title)}"><span class="brand-icon guide" aria-hidden="true"><img src="/assets/logo.png" alt=""></span><span>${escapeHtml(title)}</span></a>`;
  }

  window.WROC_GUIDE_VIDEO = Object.freeze({ button, sourceFor });
})();
