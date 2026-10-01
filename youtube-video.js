(function () {
  "use strict";
  const registry = () => window.WROC_YOUTUBE_VIDEO_HOSTING || {};
  const idFor = (url) => /^https:\/\/(?:www\.)?(?:youtube\.com\/(?:shorts\/|watch\?v=)|youtu\.be\/)([A-Za-z0-9_-]{11})(?:[?&].*)?$/.exec(url || "")?.[1] || null;
  const resolve = (src) => idFor(src) ? src : registry()[src]?.status === "public" ? registry()[src].youtube : null;
  const embed = (src) => { const id = idFor(resolve(src)); return id ? `https://www.youtube-nocookie.com/embed/${id}?playsinline=1&rel=0` : null; };
  const pending = {
    he: "הסרטון מועבר ליוטיוב ויהיה זמין כאן לאחר הפרסום.",
    en: "This video is being transferred to YouTube and will be available here after publication.",
    pl: "Film jest przenoszony do YouTube i będzie tutaj dostępny po publikacji.",
    de: "Dieses Video wird zu YouTube übertragen und ist hier nach der Veröffentlichung verfügbar.",
    cs: "Video se přesouvá na YouTube a po zveřejnění bude dostupné zde.",
  };
  const escape = (text) => String(text || "").replace(/[&<>"']/g, (c) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  function html(src, title = "Video", lang = document.documentElement.lang || "en") {
    const url = embed(src);
    return url ? `<iframe class="youtube-media-frame" src="${url}" title="${escape(title)}" loading="lazy" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>` : `<p class="youtube-video-pending" role="status">${escape(pending[lang] || pending.en)}</p>`;
  }
  function setFrame(frame, src, lang = document.documentElement.lang || "en") {
    frame.parentElement.querySelector(".youtube-video-pending")?.remove();
    const url = embed(src);
    frame.hidden = !url;
    if (url) frame.src = url;
    else { frame.removeAttribute("src"); frame.insertAdjacentHTML("afterend", html(src, "Video", lang)); }
  }
  window.WROC_YOUTUBE_VIDEO = Object.freeze({ idFor, resolve, embed, html, setFrame });
})();
