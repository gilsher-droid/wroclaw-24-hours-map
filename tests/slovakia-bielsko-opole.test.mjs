import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import {createHash} from 'node:crypto';
const window={};for(const file of ['data/place-catalog.js','data/lower-silesia-excursions.js','data/home-excursions.js'])runInNewContext(readFileSync(file,'utf8'),{window});
const plain=v=>JSON.parse(JSON.stringify(v));
const hash=v=>createHash('sha256').update(typeof v==='string'||Buffer.isBuffer(v)?v:JSON.stringify(v)).digest('hex');
const proof=JSON.parse(readFileSync('tests/fixtures/slovakia-bielsko-opole-preintegration.json'));
const ids=JSON.parse(readFileSync('data/slovakia-bielsko-opole-place-ids.json'));
const trip=window.WROC_LOWER_SILESIA_EXCURSIONS.excursions.find(v=>v.id==='slovakia-bielsko-opole-wroclaw');
const langs=['he','en','pl','de','cs'];
test('new stopover preserves all269 canonical records, all old aliases and all7 excursion objects',()=>{
 assert.equal(Object.keys(proof.recordHashes).length,269);assert.equal(Object.keys(proof.tripHashes).length,7);
 assert.equal(Object.keys(window.WROC_CATALOG.places).length,269+ids.length);
 for(const[id,expected]of Object.entries(proof.recordHashes))assert.equal(hash(window.WROC_CATALOG.places[id]),expected,id);
 for(const[id,expected]of Object.entries(proof.tripHashes))assert.equal(hash(window.WROC_LOWER_SILESIA_EXCURSIONS.excursions.find(v=>v.id===id)),expected,id);
 for(const[key,value]of Object.entries(proof.aliases))assert.equal(window.WROC_CATALOG.aliases[key],value,key);
 assert.equal(window.WROC_LOWER_SILESIA_EXCURSIONS.excursions.length,8);
});
test('two city chapters keep real coordinates and navigation within one city at a time',()=>{
 assert.equal(trip.cityChapters.length,2);assert.equal(trip.cityChapters[0].id,'bielsko-biala');assert.equal(trip.cityChapters[1].id,'opole');
 const members=trip.cityChapters.flatMap(c=>[...c.canonicalPlaceIds,...c.optionalPlaceIds]);assert.deepEqual(plain(members).sort(),ids.slice().sort());
 for(const chapter of trip.cityChapters){
  const walk=new URL(chapter.walkingRoute.navigation.googleMaps);assert.equal(walk.searchParams.get('travelmode'),'walking');assert.equal(chapter.navigation.googleMaps,walk.href);
  for(const point of chapter.routePoints)assert.equal(window.WROC_CATALOG.getPlace(point.canonicalPlaceId).location.cityId,chapter.id);
  assert.deepEqual(plain(chapter.walkingRoute.points),plain(chapter.routePoints));
  assert.ok(!chapter.routePoints.some(p=>p.canonicalPlaceId==='rynek'||p.coordinates));
 }
 for(const id of ['bielsko-rynek','bielsko-plac-wojska-polskiego','bielsko-plac-wolnosci','bielsko-biala-town-hall'])assert.equal(window.WROC_CATALOG.getPlace(id).id,id);
 assert.equal(window.WROC_HOME_EXCURSIONS.filter(v=>v.id===trip.id).length,1);
});
test('all original full-frame assets have localized descriptions and exact source hashes; personal approval remains item-specific',()=>{
 const photos=[];
 for(const id of ids){const p=window.WROC_CATALOG.getPlace(id);assert.ok(p.provenance.coordinateProof.url);assert.equal(p.links.socialProfileFallback,false);
  for(const lang of langs){assert.ok(p.name[lang]);assert.ok(p.description[lang]);}
  for(const asset of p.media.photos){photos.push(asset);const meta=p.media.metadata[asset];assert.ok(existsSync('.'+asset));assert.equal(hash(readFileSync('.'+asset)),meta.sourceSHA256);assert.equal(meta.originalFullPicturePreserved,true);for(const lang of langs)assert.ok(meta.alt[lang]);}
  assert.equal(p.media.videos.length,id==='chinkalnia-bielsko-rynek'?2:0);
  for(const url of p.media.videos){assert.ok(['https://www.youtube.com/watch?v=jTapFukZWuU','https://www.youtube.com/watch?v=gVFFVJla2W8'].includes(url));assert.equal(p.media.metadata[url].visibility,'Public');assert.equal(p.media.metadata[url].audioRemoved,false);}
 }
 assert.equal(photos.length,12);assert.equal(new Set(photos).size,12);
 for(const photo of trip.contextGallery){assert.equal(hash(readFileSync('.'+photo.src)),photo.sourceSHA256);assert.ok(photo.specificApproval || photo.personalApprovalNotRequired);}
 assert.equal(trip.contextGallery.length,5);assert.ok(!trip.contextGallery.some(v=>v.src.endsWith('21.jpg')),'lower-resolution reencode reuses the larger original');
});
