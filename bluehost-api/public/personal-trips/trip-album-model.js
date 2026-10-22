(function(){
 'use strict';
 const languages=['he','en','pl','de','cs'];
 const route=window.WROC_ALBUM_ROUTE||[['rynek','papa','czarna-magia'],['ostrow','cathedral','kawiarenka-sw-jadwigi'],['hala','japanese','wuwa']];
 const limits={image:15*1024*1024,video:60*1024*1024,total:200*1024*1024,files:60};
 const types=new Set(['image/jpeg','image/png','image/webp','image/gif','video/mp4','video/webm','video/quicktime']);
 function validateFile(file){if(!types.has(file.type))return 'unsupported';if(!Number.isFinite(file.size)||file.size<=0)return 'unsupported';if(file.size>(file.type.startsWith('image/')?limits.image:limits.video))return 'tooLarge';return null;}
 const active=entries=>entries.filter(e=>!e.deletedAt);
 function ordered(entries){return active(entries).filter(e=>e.included!==false).sort((a,b)=>a.day-b.day||a.order-b.order||a.createdAt-b.createdAt||a.id.localeCompare(b.id));}
 function pages(entries){const result=[{type:'cover'}];let day=null;for(const entry of ordered(entries)){if(day!==entry.day){day=entry.day;result.push({type:'chapter',day});}result.push({type:'memory',entry});}return result;}
 function validateEntry(entry){return Boolean(entry&&typeof entry.id==='string'&&route[entry.day]?.includes(entry.placeId)&&['note','image','video'].includes(entry.type)&&typeof entry.text==='string'&&entry.text.length<=5000&&typeof entry.caption==='string'&&entry.caption.length<=500&&Number.isFinite(entry.order)&&Number.isFinite(entry.createdAt));}
 function planAdd(entries,entry){if(!validateEntry(entry))throw Error('invalid');const duplicate=entries.find(e=>!e.deletedAt&&e.placeId===entry.placeId&&entry.fingerprint&&entry.fingerprint===e.fingerprint);if(duplicate)return {duplicate:duplicate.id};if(active(entries).length>=limits.files)throw Error('quota');const size=entries.reduce((n,e)=>n+(e.file?.size||0)+(e.poster?.size||0),0)+(entry.file?.size||0)+(entry.poster?.size||0);if(size>limits.total)throw Error('quota');return {entry,size};}
 function move(entries,id,delta){const current=entries.find(e=>e.id===id&&!e.deletedAt);if(!current)return [];const group=active(entries).filter(e=>e.day===current.day).sort((a,b)=>a.order-b.order||a.createdAt-b.createdAt||a.id.localeCompare(b.id));const i=group.findIndex(e=>e.id===id),next=group[i+delta];if(!next)return [];const reordered=[...group];[reordered[i],reordered[i+delta]]=[reordered[i+delta],reordered[i]];return reordered.map((entry,order)=>({...entry,order}));}
 const safeText=(text,max)=>String(text??'').trim().slice(0,max);
 window.WROC_TRIP_ALBUM_MODEL=Object.freeze({languages,route,limits,validateFile,active,ordered,pages,validateEntry,planAdd,move,safeText});
})();
