(function(){
 'use strict';
 const text=lang=>{const copies=window.WROC_PLACE_PANEL_COPY||window.WROC_TRIP_ALBUM_COPY;return copies[lang]||copies.en;};
 const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const local=(v,l)=>typeof v==='string'?v:v?.[l]||v?.en||'';
 const name=(p,l)=>l==='he'&&p.id==='gniazdo'?'גניאזדו, קפה ומאפה':l==='he'&&p.id==='papa'?'פאפא קרסנל':l==='he'&&p.id==='bar-mis'?'בר מיש':local(p.name,l);
 const paths={camera:'M4 7h4l2-3h4l2 3h4v13H4z M16 13a4 4 0 1 1-8 0 4 4 0 0 1 8 0',attach:'m8 13 6-6a3 3 0 0 1 4 4l-8 8a5 5 0 0 1-7-7l9-9',note:'M5 4h14v16H5z M8 8h8 M8 12h8 M8 16h5',photos:'M3 4h18v16H3z M3 16l5-6 5 5 3-3 5 5 M16 8h.01',videos:'M4 4h16v16H4z M10 8l6 4-6 4z',navigate:'m5 19 14-14 M7 5h12v12',about:'M12 10v7 M12 6h.01 M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0'};
 const icon=key=>`<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="${paths[key]||paths.about}"></path></svg>`;
 const photo=p=>p.media?.thumbnail||p.media?.photos?.[0]||'';
 function button(p,lang,action,label){return `<button type="button" data-place-panel-action="${action}" data-place="${esc(p.id)}" data-language="${lang}">${icon(action)}<span>${esc(label)}</span></button>`;}
 function actions(p,lang){const t=text(lang),c=p.location?.coordinates;let result='';if(c)result+=`<a href="https://www.google.com/maps/dir/?api=1&destination=${c.lat},${c.lng}" target="_blank" rel="noopener noreferrer">${icon('navigate')}<span>${esc(t.navigate)}</span></a>`;
  for(const platform of ['facebook','instagram']){const post=window.WROC_CATALOG.getSocialPost(p,platform,lang);if(post&&post.context!=='language-channel'&&/^https:\/\/(?:www\.)?(?:facebook|instagram)\.com\//.test(post.url))result+=`<a href="${esc(post.url)}" target="_blank" rel="noopener noreferrer"><span class="panel-social ${platform}" aria-hidden="true">${platform==='facebook'?'f':'◎'}</span><span>${t[platform]}</span></a>`;}
  if(p.media?.photos?.length)result+=button(p,lang,'photos',t.photos);
  if(p.media?.videos?.length)result+=button(p,lang,'videos',t.clips);
  result+=window.WROC_GUIDE_VIDEO?.button(p.id,lang)||'';
  result+=window.WROC_PLACE_AI?.button(p,lang)||'';
  result+=button(p,lang,'about',t.about);return result;
 }
 function popup(p,lang,{personal=false}={}){const t=text(lang),src=photo(p);return `<section class="canonical-popup" dir="${lang==='he'?'rtl':'ltr'}"><div class="canonical-popup-head">${src?`<button class="canonical-popup-thumb" type="button" data-place-panel-action="photos" data-place="${esc(p.id)}" data-language="${lang}" aria-label="${esc(t.photos)}"><img src="${esc(src)}" alt=""></button>`:''}<div><h3>${esc(name(p,lang))}</h3><div dir="auto" class="canonical-local-name">${esc(p.localName||'')}</div></div></div><p class="canonical-popup-description">${esc(local(p.description,lang))}</p><div class="canonical-popup-actions">${actions(p,lang)}</div>${personal?`<button class="canonical-personal-action" type="button" data-add-memory="${esc(p.id)}">${icon('camera')}<span>${t.addMemory}</span></button>`:''}</section>`;}
 let dialog,place,lang,index=0,kind,trigger;
 function create(){dialog=document.createElement('dialog');dialog.id='canonical-media-dialog';dialog.className='canonical-media-dialog';dialog.innerHTML='<header><h2 id="canonical-media-title"></h2><button id="canonical-media-close" type="button"></button></header><div id="canonical-media-stage"></div><nav id="canonical-media-controls"><button type="button" id="canonical-media-prev">←</button><span id="canonical-media-count" aria-live="polite"></span><button type="button" id="canonical-media-next">→</button></nav>';
  document.body.append(dialog);dialog.querySelector('#canonical-media-close').onclick=()=>dialog.close();dialog.querySelector('#canonical-media-prev').onclick=()=>step(-1);dialog.querySelector('#canonical-media-next').onclick=()=>step(1);dialog.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();step(-1);}if(e.key==='ArrowRight'){e.preventDefault();step(1);}});dialog.addEventListener('close',()=>{dialog.querySelector('#canonical-media-stage').replaceChildren();trigger?.focus({preventScroll:true});});}
 function items(){return kind==='photos'?place.media.photos:place.media.videos;}
 function paint(){const t=text(lang),stage=dialog.querySelector('#canonical-media-stage');stage.replaceChildren();dialog.lang=lang;dialog.dir=lang==='he'?'rtl':'ltr';dialog.querySelector('#canonical-media-title').textContent=name(place,lang);dialog.querySelector('#canonical-media-close').textContent=t.closeMap;dialog.querySelector('#canonical-media-controls').hidden=kind==='about';
  if(kind==='about'){const p=document.createElement('p');p.textContent=local(place.description,lang);p.style.whiteSpace='pre-line';stage.append(p);const url=place.links?.website||place.links?.officialWebsite;if(/^https:\/\//.test(url||'')){const a=document.createElement('a');a.href=url;a.target='_blank';a.rel='noopener noreferrer';a.textContent=t.website;stage.append(a);}return;}
  const list=items();if(!list?.length){stage.textContent=t.noMedia;return;}index=(index+list.length)%list.length;
  if(kind==='photos'){const img=document.createElement('img');img.src=list[index];img.alt=name(place,lang);stage.append(img);}else stage.innerHTML=window.WROC_YOUTUBE_VIDEO.html(typeof list[index]==='string'?list[index]:list[index].src,name(place,lang),lang);
  dialog.querySelector('#canonical-media-count').textContent=`${index+1} / ${list.length}`;dialog.querySelector('#canonical-media-prev').setAttribute('aria-label',t.previous);dialog.querySelector('#canonical-media-next').setAttribute('aria-label',t.next);
 }
 function step(delta){if(kind==='about')return;index+=delta;paint();}
 document.addEventListener('click',event=>{const b=event.target.closest?.('[data-place-panel-action]');if(!b)return;const p=window.WROC_CATALOG.getPlace(b.dataset.place);if(!p)return;event.preventDefault();event.stopPropagation();if(!dialog)create();if(dialog.open)return;trigger=b;place=p;lang=b.dataset.language;kind=b.dataset.placePanelAction;index=0;paint();dialog.showModal();});
 window.WROC_PLACE_PANEL=Object.freeze({popup,actions,icon,name});
})();
