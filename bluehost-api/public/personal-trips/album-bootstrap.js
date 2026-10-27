(async function(){
 'use strict';
 let version='';const script=src=>new Promise((resolve,reject)=>{const el=document.createElement('script');el.src='./'+src+'?v='+encodeURIComponent(version);el.onload=resolve;el.onerror=reject;document.body.append(el);});
 try{
  const owner=new URLSearchParams(location.search).get('customer');const scope=owner?'&customer='+encodeURIComponent(owner):'';
  const r=await fetch('?action=album-context'+scope,{credentials:'same-origin',cache:'no-store'});if(!r.ok)throw Error('auth');const context=await r.json();window.WROC_ALBUM_CONTEXT=context;version=context.assetVersion||'';
  const trip=context.route;window.WROC_ALBUM_ROUTE=trip.days.map(d=>[...new Set([...d.stops,...(d.food||[])].map(s=>s.placeId))]);
  if(!window.WROC_ALBUM_ROUTE.length||window.WROC_ALBUM_ROUTE.some(ids=>!ids.length))throw Error('route');
  await script('public-catalog.js');const publicCatalog=window.WROC_CATALOG;
  const places=Object.fromEntries(Object.entries(trip.places).map(([id,p])=>{const known=publicCatalog.getPlace(id);return[id,{...(known||{}),id,name:known?.name||p.name,localName:p.localName||known?.localName||'',description:known?.description||p.description,location:{...(known?.location||{}),coordinates:p.coordinates},links:{...(known?.links||{}),website:p.website||known?.links?.website},media:{photos:(p.photos||[]).map(url=>new URL(url,'https://wroc-love.com').href),videos:p.videos||[],guideVideos:known?.media?.guideVideos||null}}];}));
  window.WROC_CATALOG={...publicCatalog,getPlace:id=>places[id]||null};
  for(const f of ['map-tiles.js','youtube-video-hosting.js','youtube-video.js','guide-video.js','place-ai-model.js','place-ai.js','trip-album-copy.js','album-server-copy.js','trip-album-model.js','album-server-store.js','place-panel.js','trip-album.js'])await script(f);
 }catch{document.getElementById('album-title').textContent='WROC-LOVE';const p=document.getElementById('album-status');p.textContent='Unable to open the private album. Please sign in again.';const a=document.createElement('a');a.href='./';a.textContent='Sign in';p.append(document.createElement('br'),a);}
})();
