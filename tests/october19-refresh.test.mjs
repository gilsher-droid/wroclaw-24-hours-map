import {beforePanPrecelMedia} from './pan-precel-media-historical-baseline.mjs';
import {historicalPlaceIds} from './historical-catalog-scope.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {runInNewContext} from 'node:vm';
const root=new URL('../',import.meta.url);
const json=file=>JSON.parse(readFileSync(new URL(file,root),'utf8'));
const window={};for(const file of ['data/place-catalog.js','data/canonical-experiences.js'])runInNewContext(readFileSync(new URL(file,root),'utf8'),{window,console});
const catalog=window.WROC_CATALOG, contract=json('data/october19-refresh-preservation-contract.json');
test('October refresh preserves existing identities, pins, guide links and unrelated places',()=>{
 for(const id of contract.originalPlaceIds)assert.ok(catalog.getPlace(id),id);
 assert.deepEqual(historicalPlaceIds(catalog.places).filter(id=>id!=="lodz-roa-weasels-mural"&&id!=="forum-kulinarne-wroclaw").filter(id=>!["hostel-krasnal-wroclaw","marietta-focacceria-wroclaw","olio-pizza-napoletana-wroclaw","brzeg-st-nicholas-church","india-concept-wroclaw","lwia-brama-restaurant-wroclaw","most-pomorski-poludniowy-wroclaw","piastowska-pieczec-wroclaw","st-martin-church-wroclaw","woosabi-swidnicka-wroclaw","vega-bar-weganski-wroclaw"].includes(id)).filter(id=>!["bb-hotel-wroclaw-old-town","el-gato-odrzanska-wroclaw","stary-mlyn-rynek-wroclaw","pan-precel-express-grunwaldzki","pomiedzy-cafe-bistro-wroclaw"].includes(id)).filter(id=>!contract.originalPlaceIds.includes(id)),["absynt-aparthotel-garbary-wroclaw", "apartamenty-marina-topacz-wroclaw", "bar-mleczny-mewa-wroclaw", "barbara-wroclaw", "boogie-aparthouse-garbary", "bru-coffee-bakehouse-wroclaw", "central-cafe-nadodrze", "domek-nad-fosa-wroclaw", "dwor-polski-hotel-wroclaw", "entre-hotel-wroclaw", "fc-caffe-kuznicza", "four-denominations-district", "gustaw-restaurant-wroclaw", "hotel-traffic-wroclaw", "joyinn-aparthotel-wroclaw", "klodzko-fortress", "klodzko-old-town", "mostek-pokutnic-wroclaw", "movenpick-grand-hotel-wroclaw", "rozowa-krowa-milk-bar-wroclaw", "srebrna-gora-fortress", "the-cyrus-hotel-wroclaw", "tulip-hotels-wroclaw-patio", "white-stork-synagogue-wroclaw", "wyndham-wroclaw-old-town"]);
 for(const [id,pin] of Object.entries(contract.preservedCoordinates))assert.equal(JSON.stringify(beforePanPrecelMedia(catalog.getPlace(id)).location.coordinates),JSON.stringify(beforePanPrecelMedia(pin)),id);
 for(const [id,guides] of Object.entries(contract.preservedGuides))assert.equal(JSON.stringify(beforePanPrecelMedia(catalog.getPlace(id).media.guideVideos)),JSON.stringify(beforePanPrecelMedia(guides)),id);
 const authorizedPosts=new Set(json('data/october19-published-remaining-social-connections.json').map(row=>row.url));
 for(const [id,hash] of Object.entries(contract.unchangedPlaceSHA256).filter(([id])=>!["papa","rynek","town-hall","marietta-focacceria-wroclaw","jatki","math-tower","ossolineum","university","aula","wyspa-piasek","jas-malgosia","most-piaskowy"].includes(id)).filter(([id])=>!["boleslawiec-old-town","cathedral","czarna-magia","fc-caffe-kuznicza","four-denominations-district","glowny","gniazdo","kawiarenka-sw-jadwigi","klodzko-fortress","lodz-piotrkowska","lodziarnia-roma","most-tumski","mostek-pokutnic-wroclaw","nfm","opera","ostrow","renoma","royal-palace-wroclaw","woosabi","wroclavia","wroclaw-puppet-theatre"].includes(id)).filter(([id])=>!["henryk-tomaszewski-theatre-museum","royal-palace-wroclaw","opera","nfm","mostek-pokutnic-wroclaw","papa","domek-nad-fosa-wroclaw","warsaw-nozyk-synagogue","la-maddalena"].includes(id)).filter(([id])=>!["dominikan","bar-mis"].includes(id)).filter(([id])=>!["fc-caffe-kuznicza","czarna-magia","jatki"].includes(id)).filter(([id])=>!["altus","puro","herbal","ac-hotel","boogie-aparthouse-garbary","art-hotel","entre-hotel-wroclaw"].includes(id)).filter(([id])=>id!=="charlotte"&&id!=="central"&&id!=="parrot-coffee-bema"&&id!=="boguslawskiego"&&id!=="pizza-si"&&id!=="arche-klasztor"&&id!=="dwarf-info"&&id!=="korona-hotel"&&id!=="slodowa"&&id!=="chatka"&&id!=="wroclaw-botanical-garden")){const laterRefresh=json('data/cafe-gustaw-renoma-preservation.json');const preserved=JSON.parse(JSON.stringify(beforePanPrecelMedia(laterRefresh.preserved[id] || catalog.getPlace(id))));preserved.socialPosts=preserved.socialPosts.filter(post=>!authorizedPosts.has(post.url));if(id==='bastion'){const before=json('data/bastion-refresh-preservation-baseline.json');preserved.media=before.media;preserved.provenance=before.provenance;delete preserved.links.socialProfileFallback;}assert.equal(createHash('sha256').update(JSON.stringify(beforePanPrecelMedia(preserved))).digest('hex'),hash,id);}
});
test('Refreshed galleries exclude wrongly associated and unapproved personal frames; pending clips stay unlinked',()=>{
 for(const src of contract.excludedTowerImages)assert.ok(!catalog.getPlace('math-tower').media.photos.includes(src));
 for(const src of contract.excludedRenomaImages)assert.ok(!catalog.getPlace('renoma').media.photos.includes(src));
 for(const [id,count] of Object.entries(contract.pendingNewVideos))assert.equal(catalog.getPlace(id).media.videos.length,count,id);
 const visits=json('data/pergola-publication-receipts.json');assert.equal(visits.length,6);
 for(const clip of visits){assert.equal(clip.visibility,'Public');assert.equal(clip.savedPublicVerified,true);assert.equal(clip.checks,'No issues found');assert.ok(catalog.getPlace('pergola').media.videos.includes(clip.youtube));}
 assert.ok(catalog.getPlace('pan-tadeusz-museum').media.videos.includes('https://youtube.com/shorts/BTXtNDsF_8M'));
 for(const id of ['math-tower','pan-tadeusz-museum','pedet','renoma','wroclavia','pasaz','pergola','rynek','town-hall','slodowa','dominikan','fashion-outlet','fc-caffe-kuznicza','stadion-olimpijski-wroclaw']){const p=catalog.getPlace(id);for(const lang of ['he','en','pl','de','cs'])assert.ok(p.description[lang]?.length>20,`${id}:${lang}`);for(const src of p.media.photos)assert.ok(existsSync(new URL(src.slice(1),root)),src);}
});
test('Approved social permalinks connect only to their canonical place or Nadodrze area',()=>{
 const links=json('data/october19-verified-social-connections.json');assert.equal(links.length,41);
 const area=window.WROC_EXPERIENCE_CATALOG.getExperience('street-art-nadodrze-olbin');
 for(const row of links){if(row.mapPointId){assert.equal(row.mapPointId,'nadodrze');assert.ok(area.mapPoints.find(p=>p.id==='nadodrze').social.some(p=>p.url===row.url));assert.ok(!area.mapPoints.find(p=>p.id==='olbin').social?.some(p=>p.url===row.url));}else assert.equal(catalog.getSocialPost(catalog.getPlace(row.canonicalId),row.platform,row.language)?.url,row.url,row.key);}
 assert.equal(catalog.getSocialPost(catalog.getPlace('math-tower'),'facebook','he'),null);
});

test('October 19 news edition and canonical event updates survive enrichment',()=>{
 const news=json('data/october19-news-preservation-contract.json');
 for(const [file,hash] of Object.entries(news.files))assert.equal(createHash('sha256').update(readFileSync(new URL(file==='data/now-in-wroclaw.js'?'tests/fixtures/news-2026-10-19.js':file,root))).digest('hex'),hash,file);
 assert.equal(JSON.stringify(beforePanPrecelMedia(catalog.getPlace('zamek-topacz'))),JSON.stringify(beforePanPrecelMedia(news.topacz)));
 assert.equal(JSON.stringify(beforePanPrecelMedia(window.WROC_EXPERIENCE_CATALOG.getExperience('wroclaw-multimedia-fountain-show'))),JSON.stringify(beforePanPrecelMedia(news.fountainExperience)));
});

test('Olympic Stadium has one cultural card using its existing canonical identity',()=>{
 const context={window,console};runInNewContext(readFileSync(new URL('data/cultural-places.js',root),'utf8'),context);
 const stadium=window.WROC_CULTURAL_PLACES.filter(record=>record.canonicalPlaceId==='stadion-olimpijski-wroclaw');
 assert.equal(stadium.length,1);assert.ok(stadium[0].categories.includes('architecture-design'));
});

test('Olympic Stadium day-three recommendation exposes its canonical gallery', () => {
 const w={};runInNewContext(readFileSync(new URL('data/place-catalog.js',root),'utf8'),{window:w});runInNewContext(readFileSync(new URL('data/location-media.js',root),'utf8'),{window:w});
 assert.equal(w.WROC_LOCATION_MEDIA['stadion-olimpijski-wroclaw'].gallery.length,20);
});
