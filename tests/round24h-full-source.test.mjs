import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { createHash } from 'node:crypto';
const fixture=JSON.parse(readFileSync('data/round24h-oct22-preservation.json','utf8'));
const window={location:{origin:'https://wroc-love.com'}},document={documentElement:{lang:'he'},addEventListener(){}};
for(const f of ['data/place-catalog.js','youtube-video.js','data/location-media.js','data/lifestyle-places.js','guide-video.js'])runInNewContext(readFileSync(f,'utf8'),{window,document,console,URLSearchParams});
const plain=x=>JSON.parse(JSON.stringify(x)),hash=x=>createHash('sha256').update(typeof x==='string'?x:JSON.stringify(x)).digest('hex');
test('Full-source round preserves223 unrelated canonical records and all changed-point identity, routing, guides and social links',()=>{
 let untouched=0;
 for(const[id,h]of Object.entries(fixture.recordHashes)){
  const p=plain(window.WROC_CATALOG.getPlace(id));
  if(!fixture.authorizedIds.includes(id)){assert.equal(hash(p),h,id);untouched++;continue;}
  const old=fixture.places[id];
  for(const key of ['id','localName','name','description','location','links','socialPosts','sourceRecords','categories','guideVideos'])assert.deepEqual(p[key],old[key],`${id}:${key}`);
  assert.equal(p.media.thumbnail,old.media.thumbnail,`${id}:hero`);assert.deepEqual(p.media.guideVideos,old.media.guideVideos,`${id}:guides`);
  for(const v of old.media.videos)assert.ok(p.media.videos.includes(v),`${id}:existing video ${v}`);
  for(const a of old.media.photos){if(id==='hala-targowa'&&fixture.replacedHalaCropReferences.includes(a))continue;assert.ok(p.media.photos.includes(a),`${id}:existing photo ${a}`);}
 }
 assert.equal(untouched,223);
});
test('All chosen full photographs reach the actual route adapter, including Hala alias, with no stale truncated galleries',()=>{
 const counts={'hala-targowa':20,ostrow:17,'most-tumski':6,cathedral:4,nfm:9,opera:11,glowny:27,boguslawskiego:11};
 for(const[id,count]of Object.entries(counts)){
  const p=window.WROC_CATALOG.getPlace(id),r=window.WROC_LOCATION_MEDIA[id];
  assert.equal(p.media.photos.length,count,id);assert.equal(new Set(p.media.photos).size,count,id);
  assert.deepEqual(plain(p.media.photos),fixture.expectedPhotos[id],id);
  assert.deepEqual(plain(r.gallery),plain(p.media.photos),`${id}:actual adapter`);
  for(const lang of ['he','en','pl','de','cs'])assert.ok(p.name[lang]&&p.description[lang],`${id}:${lang}`);
 }
 assert.deepEqual(plain(window.WROC_LOCATION_MEDIA['market-hall'].gallery),plain(window.WROC_CATALOG.getPlace('hala-targowa').media.photos));
});
test('Every prepared source asset is present, byte-identical to the reviewed publication file and carries five localized alt texts',()=>{
 assert.equal(Object.keys(fixture.newPhotoAssets).length,64);
 for(const[a,expected]of Object.entries(fixture.newPhotoAssets)){
  const bytes=readFileSync('.'+a);assert.equal(createHash('sha256').update(bytes).digest('hex'),expected.sha256,a);
  const meta=window.WROC_CATALOG.getPlace(expected.canonicalId).media.metadata[a];
  assert.equal(meta.sourceSHA256,expected.sourceSHA256,a);assert.equal(meta.originalFullPicturePreserved,true,a);
  for(const lang of ['he','en','pl','de','cs'])assert.ok(meta.alt[lang]?.trim(),`${a}:${lang}`);
 }
});

test('All twenty remaining approved visits reach the actual map playlist with complete source provenance and preserved original guides',()=>{const rows=JSON.parse(readFileSync('data/round24h-public-visits-20261022.json'));assert.equal(rows.length,20);assert.equal(new Set(rows.map(r=>r.youtubeId)).size,20);for(const r of rows){const p=window.WROC_CATALOG.getPlace(r.canonicalId);assert.ok(p.media.videos.includes(r.url));assert.ok(window.WROC_LOCATION_MEDIA[r.canonicalId].videos.some(v=>(typeof v==='string'?v:v.src)===r.url));const m=p.media.metadata[r.url];assert.equal(m.sourceSHA256,r.sourceSHA256);assert.equal(m.publicReopened,true);assert.equal(m.visibility,'Public');assert.equal(m.silent,true);assert.equal(m.originalFullPicturePreserved,true);assert.ok(!/פספוסים|פספסוים|outtakes/i.test(m.sourceFile));for(const l of['he','en','pl','de','cs'])assert.ok(m.title[l]);}});

test("Hala lifestyle photo action resolves the canonical20-image gallery instead of an absent legacy key",()=>{const p=window.WROC_LIFESTYLE_PLACES.find(x=>x.id==="hala-targowa");assert.equal(p.mediaKey,"hala-targowa");const r=window.WROC_LOCATION_MEDIA[p.mediaKey];assert.equal(r.gallery.length,20);assert.deepEqual(plain(r.gallery),plain(window.WROC_CATALOG.getPlace(p.id).media.photos));});

test("New full-source photographs retain the full frame in cultural/lifestyle grid modals with refreshed CSS URLs",()=>{for(const name of["cultural","lifestyle"]){const css=readFileSync(name+".css","utf8");assert.match(css,/\.media-grid img\[src\*="\/round24h-20261022\/"\][\s\S]*?height:auto;[\s\S]*?object-fit:contain/);assert.ok(readFileSync(name+".html","utf8").includes(name+".css?v=20261023-food-round-full-picture"));}});
