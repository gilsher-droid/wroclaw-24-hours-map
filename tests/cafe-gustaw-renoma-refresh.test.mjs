import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {runInNewContext} from 'node:vm';
const window={};for(const f of ['data/place-catalog.js','data/canonical-experiences.js','data/lifestyle-places.js','data/cultural-places.js','data/location-media.js'])runInNewContext(readFileSync(f,'utf8'),{window,console});
const plain=x=>JSON.parse(JSON.stringify(x));
const catalog=window.WROC_CATALOG, baseline=JSON.parse(readFileSync('data/cafe-gustaw-renoma-preservation.json','utf8'));
test('Cafe Berg and Renoma append reviewed images, preserve original media, hero, coordinates and verified social links',()=>{
 for(const [id,count] of [['cafe-berg-wroclaw',12],['renoma',28]]){
  const before=baseline.preserved[id],after=plain(catalog.getPlace(id));
  assert.equal(after.media.photos.length,count);assert.equal(new Set(after.media.photos).size,count);
  assert.deepEqual(after.media.photos.slice(0,before.media.photos.length),before.media.photos);
  assert.equal(after.media.thumbnail,before.media.thumbnail);assert.deepEqual(after.location,before.location);
  for(const [key,value]of Object.entries(before.media.metadata))assert.deepEqual(after.media.metadata[key],value);
  for(const video of before.media.videos)assert.ok(after.media.videos.includes(video));
  for(const lang of ['he','en','pl','de','cs'])for(const platform of ['facebook','instagram']){
   const original=catalog.getSocialPost(before,platform,lang);if(original)assert.equal(catalog.getSocialPost(after,platform,lang)?.url,original.url);
  }
  for(const src of after.media.photos.slice(before.media.photos.length)){
   const meta=after.media.metadata[src];assert.ok(existsSync(src.slice(1)));assert.equal(createHash('sha256').update(readFileSync(src.slice(1))).digest('hex'),meta.assetSHA256);
   for(const lang of ['he','en','pl','de','cs'])assert.ok(meta.alt[lang]);
  }
 }
 const cafe=catalog.getPlace('cafe-berg-wroclaw');assert.deepEqual(plain(cafe.media.videos),['https://youtube.com/shorts/bEKAP8m_KoI','https://www.youtube.com/watch?v=oB2UQUGy3w8']);assert.equal(cafe.media.metadata[cafe.media.videos[0]].checksComplete,true);
});
test('Gustaw is one dining place independent of Bastion, reusing its verified entrance image without a duplicate asset',()=>{
 const p=plain(catalog.getPlace('gustaw-restaurant-wroclaw')),bastion=catalog.getPlace('bastion');assert.ok(p);assert.notEqual(p.id,bastion.id);
 assert.deepEqual(p.location.coordinates,{lat:51.1049153,lng:17.0380912});assert.equal(p.links.website,'https://restauracjagustaw.pl/');assert.equal(p.links.socialProfileFallback,false);
 assert.equal(p.media.photos.length,1);assert.ok(bastion.media.photos.includes(p.media.photos[0]));assert.equal(p.media.thumbnail,p.media.photos[0]);
 assert.equal(createHash('sha256').update(readFileSync(p.media.photos[0].slice(1))).digest('hex'),p.media.metadata[p.media.photos[0]].assetSHA256);
 assert.equal(window.WROC_LIFESTYLE_PLACES.filter(x=>x.id===p.id).length,1);assert.ok(!window.WROC_CULTURAL_PLACES.some(x=>x.canonicalPlaceId===p.id));
 for(const l of ['he','en','pl','de','cs']){assert.ok(p.description[l]);for(const platform of ['facebook','instagram'])assert.equal(catalog.getSocialPost(p,platform,l),null);}
});
test('All 192 unrelated places remain byte-equivalent after the authorized three-place refresh',()=>{
 assert.equal(Object.keys(catalog.places).length,baseline.beforeCount+17+1+1+2+5+4+6+1);assert.equal(Object.keys(baseline.unrelatedHashes).length,192);
 for(const[id,hash]of Object.entries(baseline.unrelatedHashes).filter(([id])=>!["papa","rynek","town-hall","marietta-focacceria-wroclaw","jatki","math-tower","ossolineum","university","aula","wyspa-piasek","jas-malgosia","most-piaskowy"].includes(id)).filter(([id])=>!["boleslawiec-old-town","cathedral","czarna-magia","fc-caffe-kuznicza","four-denominations-district","glowny","gniazdo","kawiarenka-sw-jadwigi","klodzko-fortress","lodz-piotrkowska","lodziarnia-roma","most-tumski","mostek-pokutnic-wroclaw","nfm","opera","ostrow","renoma","royal-palace-wroclaw","woosabi","wroclavia","wroclaw-puppet-theatre"].includes(id)).filter(([id])=>id!=="rynek").filter(([id])=>!["henryk-tomaszewski-theatre-museum","royal-palace-wroclaw","opera","nfm","mostek-pokutnic-wroclaw","papa","domek-nad-fosa-wroclaw","warsaw-nozyk-synagogue","la-maddalena"].includes(id)).filter(([id])=>!["dominikan","bar-mis"].includes(id)).filter(([id])=>!["fc-caffe-kuznicza","czarna-magia","jatki"].includes(id)).filter(([id])=>!["altus","puro","herbal","ac-hotel","boogie-aparthouse-garbary","art-hotel","entre-hotel-wroclaw"].includes(id)).filter(([id])=>!["wroclaw-botanical-garden","chatka"].includes(id)).filter(([id])=>!["charlotte","four-denominations-district","white-stork-synagogue-wroclaw","central","parrot-coffee-bema","boguslawskiego","pizza-si","arche-klasztor","dwarf-info","korona-hotel","slodowa"].includes(id)))assert.equal(createHash('sha256').update(JSON.stringify(catalog.getPlace(id))).digest('hex'),hash,id);
 assert.deepEqual(Object.keys(catalog.places).filter(id=>!["hostel-krasnal-wroclaw","marietta-focacceria-wroclaw","olio-pizza-napoletana-wroclaw","brzeg-st-nicholas-church","india-concept-wroclaw","lwia-brama-restaurant-wroclaw","most-pomorski-poludniowy-wroclaw","piastowska-pieczec-wroclaw","st-martin-church-wroclaw","woosabi-swidnicka-wroclaw","vega-bar-weganski-wroclaw"].includes(id)).filter(id=>!["bb-hotel-wroclaw-old-town","el-gato-odrzanska-wroclaw","stary-mlyn-rynek-wroclaw","pan-precel-express-grunwaldzki","pomiedzy-cafe-bistro-wroclaw"].includes(id)).filter(id=>!['bar-mleczny-mewa-wroclaw','rozowa-krowa-milk-bar-wroclaw','mostek-pokutnic-wroclaw','domek-nad-fosa-wroclaw','joyinn-aparthotel-wroclaw','dwor-polski-hotel-wroclaw','wyndham-wroclaw-old-town','tulip-hotels-wroclaw-patio','srebrna-gora-fortress','klodzko-fortress','klodzko-old-town','movenpick-grand-hotel-wroclaw','the-cyrus-hotel-wroclaw','entre-hotel-wroclaw','absynt-aparthotel-garbary-wroclaw','apartamenty-marina-topacz-wroclaw','boogie-aparthouse-garbary','hotel-traffic-wroclaw'].includes(id)&&id!=='central-cafe-nadodrze'&&id!=='bru-coffee-bakehouse-wroclaw'&&!Object.hasOwn(baseline.unrelatedHashes,id)&&!Object.hasOwn(baseline.preserved,id)),baseline.newCanonicalIds);
});

test('Explicitly excluded family and doubtful clips cannot enter canonical photo or video metadata',()=>{
 const proof=JSON.parse(readFileSync('data/cafe-gustaw-renoma-refresh-provenance.json','utf8'));assert.equal(proof.privacyExcludedSourceHashes.length,15);assert.equal(proof.historicalPrivacyExcludedSourceHashes.length,16);assert.deepEqual(proof.resolvedIncidentalVisitSourceHashes,['bdb6d64d3bc9845c1ff11c9432f68761ed6229fe9bed88f6b98206169df02108']);
 for(const id of proof.canonicalIds)for(const metadata of Object.values(catalog.getPlace(id).media.metadata))assert.ok(!proof.privacyExcludedSourceHashes.includes(metadata.sourceSHA256),id);
});

test('Renoma full original guides have five published and reopened native-caption tracks with preserved timing',()=>{
 const guide=JSON.parse(readFileSync('data/renoma-guide-caption-provenance.json','utf8')),p=catalog.getPlace('renoma');
 assert.equal(guide.canonicalId,'renoma');assert.equal(guide.readyForIntegration,true);
 for(const lang of ['he','en','pl','de','cs']){
  const track=guide.tracks[lang],edition=guide.editions[lang==='he'?'he':'en'];
  assert.equal(edition.visibility,'Public');assert.equal(edition.savedVisibilityVerified,true);assert.equal(edition.originalPictureAudioUnchanged,true);assert.equal(edition.sourceSHA256,edition.uploadSHA256);assert.equal(p.media.guideVideos[lang==='he'?'he':'en'],edition.url);
  assert.equal(track.status,'Published');assert.equal(track.reopenedVerified,true);assert.equal(track.allCueTextsAndTimesVerified,true);assert.equal(track.videoId,edition.id);assert.equal(createHash('sha256').update(readFileSync(track.srtFile)).digest('hex'),track.srtSHA256);
  let end=0;for(const cue of track.cues){assert.ok(cue.start>=end&&cue.end>cue.start&&cue.end<=edition.durationSeconds);assert.ok(cue.text.trim());end=cue.end;}
 }
 assert.equal(catalog.getPlace('pedet').media.guideVideos,undefined);
});
