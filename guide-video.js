(function () {
  "use strict";
  const labels = {he:"מדריך הטיולים שלנו",en:"Our travel guide",pl:"Nasz przewodnik",de:"Unser Reiseführer",cs:"Náš průvodce"};
  const closeLabels = {he:"סגירה",en:"Close",pl:"Zamknij",de:"Schließen",cs:"Zavřít"};
  const youtubeLabels = {he:"צפייה ביוטיוב",en:"Watch on YouTube",pl:"Oglądaj w YouTube",de:"Auf YouTube ansehen",cs:"Sledovat na YouTube"};
  const subtitleLabels = {he:"הדרכה וכתוביות בעברית",en:"English audio · English subtitles",pl:"Angielski · polskie napisy",de:"Englisch · deutsche Untertitel",cs:"Anglicky · české titulky"};
  const youtubeId = (url) => /^https:\/\/(?:www\.)?youtube\.com\/(?:shorts\/|watch\?v=)([A-Za-z0-9_-]{11})$/.exec(url || "")?.[1] || null;
  const escapeHtml = (value) => String(value || "").replace(/[&<>'"]/g,(c)=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]));
  const language = () => document.documentElement.lang || "he";
  const sourceFor = (id,lang=language()) => window.WROC_CATALOG?.getPlace(id)?.media?.guideVideos?.[lang==="he"?"he":"en"] || null;
  const cueAt = (cues,time) => cues.find(([start,end])=>time>=start&&time<end)?.[2] || ["","",""];
  const embedUrlFor = (url,lang) => {
    const id=youtubeId(url);if(!id)return null;
    const params=new URLSearchParams({autoplay:"1",hl:lang,playsinline:"1",rel:"0",cc_load_policy:"1",cc_lang_pref:lang});
    if(window.location?.origin)params.set("origin",window.location.origin);
    return `https://www.youtube-nocookie.com/embed/${id}?${params}`;
  };
  function dialogFor(lang,title){
    let dialog=document.querySelector(".guide-video-dialog");
    if(!dialog){
      dialog=document.createElement("dialog");dialog.className="guide-video-dialog";
      dialog.innerHTML='<div class="guide-video-panel"><button class="guide-video-close" type="button"></button><h2 id="guide-video-title"></h2><div class="guide-video-frame-host"></div><a class="guide-video-youtube" target="_blank" rel="noopener noreferrer"></a></div>';
      dialog.setAttribute("aria-labelledby","guide-video-title");
      dialog.querySelector(".guide-video-close").addEventListener("click",()=>dialog.close());
      dialog.addEventListener("close",()=>{
        dialog.querySelector(".guide-video-frame-host").replaceChildren();
      });
      document.body.appendChild(dialog);
    }
    dialog.classList.remove("guide-video-responsive","guide-video-expanded");
    dialog.querySelector("h2").textContent=title;
    dialog.querySelector(".guide-video-close").textContent=closeLabels[lang]||closeLabels.en;
    return dialog;
  }
  function openYouTubeVideo(url,title,lang){
    const embed=embedUrlFor(url,lang);if(!embed)return;
    const dialog=dialogFor(lang,title);
    const frame=document.createElement("iframe");frame.id="guide-youtube-frame";frame.title=title;frame.src=embed;
    frame.allow="autoplay; encrypted-media; picture-in-picture";frame.allowFullscreen=true;frame.referrerPolicy="strict-origin-when-cross-origin";
    dialog.querySelector(".guide-video-frame-host").replaceChildren(frame);
    const link=dialog.querySelector(".guide-video-youtube");link.href=url;link.innerHTML='<svg class="guide-video-youtube-icon" viewBox="0 0 24 18" aria-hidden="true" focusable="false"><path fill="#f00" d="M23.5 2.8a3 3 0 0 0-2.1-2.1C19.5.2 12 .2 12 .2S4.5.2 2.6.7A3 3 0 0 0 .5 2.8C0 4.7 0 9 0 9s0 4.3.5 6.2a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 13.3 24 9 24 9s0-4.3-.5-6.2Z"/><path fill="#fff" d="m9.6 12.8 6.3-3.8-6.3-3.8Z"/></svg><span></span>';link.querySelector('span').textContent=youtubeLabels[lang]||youtubeLabels.en;
    dialog.showModal();
  }

  function button(id,lang=language(),resourceClass=""){
    const url=sourceFor(id,lang);if(!youtubeId(url))return "";
    const suffix=subtitleLabels[lang]||subtitleLabels.en;
    const title=`${labels[lang]||labels.en}${suffix?` · ${suffix}`:""}`;
    return `<a class="guide-video-action${resourceClass?` ${escapeHtml(resourceClass)}`:""}" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer" data-guide-video-src="${escapeHtml(url)}" data-guide-video-lang="${escapeHtml(lang)}" aria-label="${escapeHtml(title)}" title="${escapeHtml(title)}"><span class="brand-icon guide" aria-hidden="true"><img src="/assets/logo.png" alt=""></span><span class="guide-video-action-copy"><span class="guide-video-action-title">${escapeHtml(labels[lang]||labels.en)}</span><span class="guide-video-action-language">${escapeHtml(suffix)}</span></span></a>`;
  }
  document.addEventListener("click",event=>{
    const trigger=event.target.closest?.("[data-guide-video-src]");const url=trigger?.dataset.guideVideoSrc;if(!youtubeId(url))return;
    event.preventDefault();openYouTubeVideo(url,trigger.getAttribute("title")||labels.en,trigger.dataset.guideVideoLang||language());
  });
  const markerLabels={he:"כאן יש הדרכת וידאו שלנו",en:"Our video guide available",pl:"Dostępny nasz przewodnik wideo",de:"Unser Video-Reiseführer verfügbar",cs:"Náš videoprůvodce je k dispozici"};
  function decorateIcon(options,place,lang=language()){
    const id=typeof place==="string"?place:place?.canonicalPlaceId||place?.id;
    if(!youtubeId(sourceFor(id,lang)))return options;
    const label=escapeHtml(markerLabels[lang]||markerLabels.en);
    return {...options,className:`${options.className||""} guide-marker-shell`.trim(),html:options.html+`<span class="guide-marker-badge" role="img" aria-label="${label}" title="${label}">▶</span>`};
  }
  function legend(map,lang=language()){
    if(!map||!window.L)return;
    if(!map._wrocGuideLegend){
      const control=window.L.control({position:"bottomright"});
      control.onAdd=()=>{const el=document.createElement("div");el.className="guide-map-legend";window.L.DomEvent.disableClickPropagation(el);return el;};
      control.addTo(map);map._wrocGuideLegend=control;
    }
    map._wrocGuideLegend.getContainer().innerHTML=`<span aria-hidden="true">▶</span> ${escapeHtml(markerLabels[lang]||markerLabels.en)}`;
  }
  window.WROC_GUIDE_VIDEO=Object.freeze({button,sourceFor,embedUrlFor,cueAt,decorateIcon,legend});
})();
