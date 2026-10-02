(function () {
  "use strict";
  const labels = {he:"מדריך הטיולים שלנו",en:"Our travel guide",pl:"Nasz przewodnik",de:"Unser Reiseführer",cs:"Náš průvodce"};
  const closeLabels = {he:"סגירה",en:"Close",pl:"Zamknij",de:"Schließen",cs:"Zavřít"};
  const youtubeLabels = {he:"צפייה ביוטיוב",en:"Watch on YouTube",pl:"Oglądaj w YouTube",de:"Auf YouTube ansehen",cs:"Sledovat na YouTube"};
  const subtitleLabels = {en:"English · DE/CZ/PL subtitles",pl:"Angielski · napisy DE/CZ/PL",de:"Englisch · Untertitel DE/CZ/PL",cs:"Anglicky · titulky DE/CZ/PL"};
  const captionIds = new Set(["Ud5KD21e5kE","zbpTMh2Fe2c","xs3NY7q0OX4","UqqWiyXRk00"]);
  const youtubeId = (url) => /^https:\/\/(?:www\.)?youtube\.com\/(?:shorts\/|watch\?v=)([A-Za-z0-9_-]{11})$/.exec(url || "")?.[1] || null;
  const escapeHtml = (value) => String(value || "").replace(/[&<>'"]/g,(c)=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]));
  const language = () => document.documentElement.lang || "he";
  const sourceFor = (id,lang=language()) => window.WROC_CATALOG?.getPlace(id)?.media?.guideVideos?.[lang==="he"?"he":"en"] || null;
  const cueAt = (cues,time) => cues.find(([start,end])=>time>=start&&time<end)?.[2] || ["","",""];
  const embedUrlFor = (url,lang) => {
    const id=youtubeId(url);if(!id)return null;
    const params=new URLSearchParams({autoplay:"1",hl:lang,playsinline:"1",rel:"0",enablejsapi:"1"});
    if(window.location?.origin)params.set("origin",window.location.origin);
    if(lang!=="he"&&captionIds.has(id))params.set("fs","0");
    return `https://www.youtube-nocookie.com/embed/${id}?${params}`;
  };
  let captionsPromise,apiPromise;
  const playerCaptions=()=>captionsPromise ||= fetch("/data/guide-player-captions.json?v=20261001-2").then(r=>{if(!r.ok)throw new Error("Captions unavailable");return r.json();}).catch(()=>{captionsPromise=null;return null;});
  function youtubeApi(){
    if(window.YT?.Player)return Promise.resolve(window.YT);
    return apiPromise ||= new Promise((resolve,reject)=>{
      const previous=window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady=()=>{previous?.();resolve(window.YT);};
      const script=document.createElement("script");script.src="https://www.youtube.com/iframe_api";
      script.onerror=()=>{apiPromise=null;reject(new Error("YouTube unavailable"));};document.head.appendChild(script);
    });
  }
  function updateCaptions(dialog){
    if(!dialog._captionCues||!dialog._player?.getCurrentTime)return;
    const text=cueAt(dialog._captionCues,dialog._player.getCurrentTime());
    dialog.querySelectorAll(".guide-video-captions p").forEach((p,i)=>{if(p.textContent!==text[i])p.textContent=text[i];});
  }
  function dialogFor(lang,title){
    let dialog=document.querySelector(".guide-video-dialog");
    if(!dialog){
      dialog=document.createElement("dialog");dialog.className="guide-video-dialog";
      dialog.innerHTML='<div class="guide-video-panel"><button class="guide-video-close" type="button"></button><h2 id="guide-video-title"></h2><div class="guide-video-stage"><div class="guide-video-frame-host"></div><section class="guide-video-captions" aria-label="DE / CZ / PL" hidden><div><h3 lang="de">Deutsch</h3><p lang="de"></p></div><div><h3 lang="cs">Čeština</h3><p lang="cs"></p></div><div><h3 lang="pl">Polski</h3><p lang="pl"></p></div></section></div><button class="guide-video-fullscreen" type="button" hidden></button><a class="guide-video-youtube" target="_blank" rel="noopener noreferrer"></a></div>';
      dialog.setAttribute("aria-labelledby","guide-video-title");
      dialog.querySelector(".guide-video-close").addEventListener("click",()=>dialog.close());
      const fullscreen=dialog.querySelector(".guide-video-fullscreen");
      fullscreen.addEventListener("click",()=>{
        if(dialog.classList.contains("guide-video-expanded")){dialog.classList.remove("guide-video-expanded");fullscreen.textContent=fullscreen.dataset.enterLabel;return;}
        const fallback=()=>{dialog.classList.add("guide-video-expanded");fullscreen.textContent=fullscreen.dataset.exitLabel;};
        const operation=document.fullscreenElement?document.exitFullscreen():dialog.requestFullscreen?.();
        if(!operation)fallback();else operation.then(()=>{fullscreen.textContent=document.fullscreenElement?fullscreen.dataset.exitLabel:fullscreen.dataset.enterLabel;}).catch(fallback);
      });
      document.addEventListener("fullscreenchange",()=>{fullscreen.textContent=document.fullscreenElement===dialog?fullscreen.dataset.exitLabel:fullscreen.dataset.enterLabel;});
      dialog.addEventListener("close",()=>{
        dialog._session++;
        clearInterval(dialog._captionTimer);dialog._captionCues=null;
        dialog._player?.destroy();dialog._player=null;
        dialog.querySelector(".guide-video-frame-host").replaceChildren();
        if(document.fullscreenElement===dialog)document.exitFullscreen()?.catch(()=>{});
      });
      dialog._session=0;document.body.appendChild(dialog);
    }
    dialog._session++;
    dialog.classList.remove("guide-video-responsive","guide-video-expanded");
    dialog.querySelector(".guide-video-captions").hidden=true;
    dialog.querySelector(".guide-video-fullscreen").hidden=true;
    dialog.querySelector("h2").textContent=title;
    dialog.querySelector(".guide-video-close").textContent=closeLabels[lang]||closeLabels.en;
    return dialog;
  }
  async function openYouTubeVideo(url,title,lang){
    const embed=embedUrlFor(url,lang);if(!embed)return;
    const dialog=dialogFor(lang,title),session=dialog._session;
    const frame=document.createElement("iframe");frame.id="guide-youtube-frame";frame.title=title;frame.src=embed;
    frame.allow="autoplay; encrypted-media; picture-in-picture";frame.allowFullscreen=true;frame.referrerPolicy="strict-origin-when-cross-origin";
    dialog.querySelector(".guide-video-frame-host").replaceChildren(frame);
    const link=dialog.querySelector(".guide-video-youtube");link.href=url;link.innerHTML='<svg class="guide-video-youtube-icon" viewBox="0 0 24 18" aria-hidden="true" focusable="false"><path fill="#f00" d="M23.5 2.8a3 3 0 0 0-2.1-2.1C19.5.2 12 .2 12 .2S4.5.2 2.6.7A3 3 0 0 0 .5 2.8C0 4.7 0 9 0 9s0 4.3.5 6.2a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 13.3 24 9 24 9s0-4.3-.5-6.2Z"/><path fill="#fff" d="m9.6 12.8 6.3-3.8-6.3-3.8Z"/></svg><span></span>';link.querySelector('span').textContent=youtubeLabels[lang]||youtubeLabels.en;
    dialog.showModal();
    if(lang==="he"||!captionIds.has(youtubeId(url)))return;
    const editions=await playerCaptions();
    if(!dialog.open||dialog._session!==session)return;
    const edition=editions?.[youtubeId(url)];if(!edition)return;
    dialog._captionCues=edition.cues;
    dialog.classList.add("guide-video-responsive");
    dialog.querySelector("h2").textContent=`${labels[lang]||labels.en} · DE / CZ / PL`;
    dialog.querySelector(".guide-video-captions").hidden=false;
    const fullscreen=dialog.querySelector(".guide-video-fullscreen");
    fullscreen.dataset.enterLabel=({he:"מסך מלא",en:"Full screen",pl:"Pełny ekran",de:"Vollbild",cs:"Celá obrazovka"})[lang]||"Full screen";
    fullscreen.dataset.exitLabel=({he:"יציאה ממסך מלא",en:"Exit full screen",pl:"Zamknij pełny ekran",de:"Vollbild verlassen",cs:"Ukončit celou obrazovku"})[lang]||"Exit full screen";
    fullscreen.textContent=fullscreen.dataset.enterLabel;fullscreen.hidden=false;
    try{
      const YT=await youtubeApi();if(!dialog.open||dialog._session!==session)return;
      dialog._player=new YT.Player(frame,{events:{onReady:()=>{if(dialog.open&&dialog._session===session){updateCaptions(dialog);dialog._captionTimer=setInterval(()=>updateCaptions(dialog),200);}},onStateChange:()=>updateCaptions(dialog)}});
    }catch{
      dialog.querySelectorAll(".guide-video-captions p").forEach((p,i)=>{p.textContent=edition.cues.map(c=>c[2][i]).join(" ");});
    }
  }
  function button(id,lang=language(),resourceClass=""){
    const url=sourceFor(id,lang);if(!youtubeId(url))return "";
    const suffix=lang==="he"?"הדרכה בעברית":captionIds.has(youtubeId(url))?subtitleLabels[lang]||subtitleLabels.en:"English";
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
