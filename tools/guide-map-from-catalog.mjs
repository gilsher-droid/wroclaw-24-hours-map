// Derive a guide-only view from existing canonical places and published-caption proofs.
export function guideMapFromCatalog(catalog,proof,registry={},sourceVersion='current-canonical-catalog'){
 const idFor=u=>/(?:shorts\/|v=|youtu\.be\/)([\w-]{11})/.exec(u||'')?.[1];const langs=['he','en','pl','de','cs'];const places=[],held=[],excludedOutsideCity=[],verifiedVideos={};
 for(const p of Object.values(catalog.places).filter(p=>p.media?.guideVideos)){
  if(p.location?.cityId!=='wroclaw'){excludedOutsideCity.push({id:p.id,cityId:p.location?.cityId});continue;}
  const coordinates=p.location.coordinates;if(!Number.isFinite(coordinates?.lat)||!Number.isFinite(coordinates?.lng)){held.push({id:p.id,reason:'coordinates'});continue;}const editions={};
  for(const lang of langs){let url=p.media.guideVideos[lang==='he'?'he':'en'],audio=lang==='he'?'he':'en';if(!url&&lang==='he'){const en=p.media.guideVideos.en;const record=proof.guides.find(g=>Object.values(g.videos||{}).includes(idFor(en))&&g.englishOnlyExplicitlyAuthorized&&g.hebrewPublishedTrack?.language==='he');if(record){url=en;audio='en';}}
   const id=idFor(url),record=proof.guides.find(g=>Object.values(g.videos||{}).includes(id));const hasTrack=lang==='he'?(record?.hebrewPublishedTrack?.language==='he'||record?.nativeCaptions?.some(c=>c.videoId===id&&c.language==='he'&&c.published)):record?.englishPublishedManualTracks?.includes(lang);
   if(id&&record&&hasTrack){const verificationPlace=record.place||record.canonicalId;editions[lang]={url,videoId:id,audioLanguage:audio,captionLanguage:lang,verificationPlace};const verified=verifiedVideos[id]||={verificationPlace,captionLanguages:[],audioLanguage:audio,englishOnlyExplicitlyAuthorized:record.englishOnlyExplicitlyAuthorized===true,verifiedAt:record.verifiedAt||proof.verifiedAt};if(!verified.captionLanguages.includes(lang))verified.captionLanguages.push(lang);}
  }
  if(langs.some(l=>!editions[l])){held.push({id:p.id,reason:'missing verified language edition',available:Object.keys(editions)});continue;}
  const social={};for(const l of langs){social[l]={};for(const platform of ['facebook','instagram']){const link=catalog.getSocialPost(p,platform,l);if(link&&link.context!=='language-channel'&&!/\/(?:reels?|stories)\/|watch\?/.test(link.url))social[l][platform]=link.url;}}
  const videos=[...new Set((p.media.videos||[]).map(v=>typeof v==='string'?v:v.src).map(u=>idFor(u)?u:registry[u]?.status==='public'?registry[u].youtube:null).filter(Boolean))];
  const name={...p.name};if(p.id==='papa')name.he='פאפא קרסנל';if(p.id==='wuwa-estate')name.he='שכונת וו־ווה';
  places.push({id:p.id,canonicalPlaceId:p.id,name,localName:p.localName,description:p.description,coordinates:[coordinates.lat,coordinates.lng],cityId:'wroclaw',city:p.location.address?.city||'',website:p.links?.website||null,photos:[...new Set(p.media.photos||[])],thumbnail:p.media.thumbnail||(p.media.photos||[])[0]||null,videos,social,editions});
 }
 return {source:{sourceCommit:sourceVersion,scope:{cityId:'wroclaw',cityOnly:true},places,held,excludedOutsideCity},proof:{videos:verifiedVideos}};
}
