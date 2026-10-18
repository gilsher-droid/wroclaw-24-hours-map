(function () {
  "use strict";
  const labels = {he:"הגדלת תמונת המקום",en:"Enlarge place photo",pl:"Powiększ zdjęcie miejsca",de:"Ortsfoto vergrößern",cs:"Zvětšit fotografii místa"};
  const escape = value => String(value || "").replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
  const local = (value,lang) => typeof value === "string" ? value : value?.[lang] || value?.en || value?.he || "";
  function sourceFor(record) {
    if (!record) return "";
    const canonical = record.canonicalPlace || window.WROC_CATALOG?.getPlace?.(record.canonicalPlaceId || record.id) || record;
    const resources = record.resources || window.WROC_LOCATION_MEDIA?.[record.mediaKey || record.id] || window.WROC_LOCATION_MEDIA?.[canonical.id];
    const experience = record.canonicalExperienceId || (record.placeType === "area-experience" ? record.id : null);
    const inherited = experience ? window.WROC_EXPERIENCE_CATALOG?.resolveMedia?.(experience)?.images : [];
    const candidates = [canonical.media?.thumbnail, record.media?.thumbnail, ...(canonical.media?.photos || []),...(record.media?.photos || []),...(record.media?.gallery || []),...(resources?.gallery || []),...(inherited || [])];
    return candidates.map(photo => typeof photo === "string" ? photo : photo?.src).find(src => typeof src === "string" && (/^\/assets\//.test(src) || /^https?:\/\//.test(src))) || "";
  }
  function html(record,lang = "he") {
    const src = sourceFor(record);
    if (!src) return "";
    const canonical = record.canonicalPlace || window.WROC_CATALOG?.getPlace?.(record.canonicalPlaceId || record.id) || record;
    const name = local(canonical.name || record.name,lang) || canonical.localName || "";
    return `<a class="place-popup-photo-link" href="${escape(src)}" target="_blank" rel="noopener" aria-label="${escape(labels[lang] || labels.en)}"><img class="place-popup-photo" src="${escape(src)}" alt="${escape(name)}" width="240" height="135" loading="lazy" decoding="async"></a>`;
  }
  document.addEventListener("error",event=>{
    if (event.target?.classList?.contains("place-popup-photo")) event.target.closest(".place-popup-photo-link").hidden = true;
  },true);
  window.WROC_PLACE_POPUP_PHOTO = Object.freeze({sourceFor,html});
})();
