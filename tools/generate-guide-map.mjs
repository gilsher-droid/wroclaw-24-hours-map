import vm from 'node:vm';
import {createHash} from 'node:crypto';
import {guideMapFromCatalog} from './guide-map-from-catalog.mjs';
import {readFile,writeFile} from 'node:fs/promises';
export async function generateGuideMap(root=process.cwd()){
 let source=JSON.parse(await readFile(`${root}/data/guide-map-source.json`,'utf8'));
 let proof=JSON.parse(await readFile(`${root}/data/guide-map-verification.json`,'utf8'));
 // Production always derives from the current canonical catalog. The UX-only
 // sandbox uses the small approved snapshot and reuses production media.
 const nativeProof=await readFile(`${root}/docs/native-youtube-caption-verification.json`,'utf8').catch(()=>null);
 if(nativeProof){const window={};const catalogCode=await readFile(`${root}/data/place-catalog.js`,'utf8');vm.runInNewContext(catalogCode,{window});vm.runInNewContext(await readFile(`${root}/data/youtube-video-hosting.js`,'utf8'),{window});({source,proof}=guideMapFromCatalog(window.WROC_CATALOG,JSON.parse(nativeProof),window.WROC_YOUTUBE_VIDEO_HOSTING,createHash('sha256').update(catalogCode).update(nativeProof).digest('hex')));}
 const ids=new Set();
 for(const p of source.places){
  if(p.cityId!=='wroclaw')throw new Error(`Guide map is city-only: ${p.id}`);
  if(ids.has(p.canonicalPlaceId)||p.id!==p.canonicalPlaceId)throw new Error(`Duplicate canonical guide place: ${p.id}`);ids.add(p.id);
  if(!Array.isArray(p.coordinates)||p.coordinates.length!==2||!p.coordinates.every(Number.isFinite))throw new Error(`Missing coordinates: ${p.id}`);
  for(const l of ['he','en','pl','de','cs']){const e=p.editions[l];if(!e?.verificationPlace||e.captionLanguage!==l||!/^https:\/\/(?:www\.)?youtube\.com\/(?:shorts\/|watch\?v=)[\w-]{11}$/.test(e.url))throw new Error(`Unverified guide edition ${p.id}/${l}`);const verified=proof.videos[e.videoId];if(!verified?.captionLanguages.includes(l)||!e.url.endsWith(e.videoId)||(l==='he'&&e.audioLanguage==='en'&&!verified.englishOnlyExplicitlyAuthorized))throw new Error(`Unverified native captions ${p.id}/${l}`);}
  if(p.videos.some(url=>!/^https:\/\/(?:www\.)?youtube\.com\/(?:shorts\/|watch\?v=)[\w-]{11}/.test(url)))throw new Error(`Non-YouTube clip: ${p.id}`);
 }
 await writeFile(`${root}/data/guide-map-places.js`,`/* Canonical guide map, source ${source.sourceCommit}. No new places or media uploads. */\nwindow.WROC_GUIDE_MAP_PLACES = ${JSON.stringify(source.places)};\n`);
 return source.places;
}
