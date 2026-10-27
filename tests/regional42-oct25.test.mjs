import {historicalPlaceIds} from './historical-catalog-scope.mjs';
import {beforeSource35Visit} from './source35-visit-historical-baseline.mjs';
import {beforeRosePassagePhoto} from './rose-passage53-historical-baseline.mjs';
import {beforeApprovedWangPhoto43} from './wang-photo43-historical-baseline.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {runInNewContext} from 'node:vm';
const proof=JSON.parse(readFileSync('data/regional42-oct25-preservation.json')),window={};
runInNewContext(readFileSync('data/place-catalog.js','utf8'),{window,console});
const plain=x=>JSON.parse(JSON.stringify(x)),hash=x=>createHash('sha256').update(x).digest('hex');
test('Regional42 visits and two Brzeg photos preserve all existing identities, links, media, and 224 other records',()=>{
 assert.deepEqual(historicalPlaceIds(window.WROC_CATALOG.places).filter(id=>id!=="lodz-roa-weasels-mural"&&id!=="forum-kulinarne-wroclaw").sort(),Object.keys(proof.recordHashes).sort());
 let unchanged=0;
 for(const[id,baselineHash]of Object.entries(proof.recordHashes)){
  const current=plain(window.WROC_CATALOG.getPlace(id));const p=proof.changedIds.includes(id)?beforeRosePassagePhoto(beforeApprovedWangPhoto43(beforeSource35Visit(current))):current;
  if(!proof.changedIds.includes(id)){assert.equal(hash(JSON.stringify(p)),baselineHash,id);unchanged++;continue;}
  const old=proof.before[id],newPhotos=proof.photos.filter(r=>r.canonicalId===id),newVisits=proof.visits.filter(r=>r.canonicalId===id);
  assert.deepEqual(p.media.photos.slice(0,old.media.photos.length),old.media.photos,id);
  assert.deepEqual(p.media.videos.slice(0,old.media.videos.length),old.media.videos,id);
  assert.equal(p.media.photos.length,old.media.photos.length+newPhotos.length,id);
  assert.equal(p.media.videos.length,old.media.videos.length+newVisits.length,id);
  p.media.photos=old.media.photos;p.media.videos=old.media.videos;
  for(const r of newPhotos)delete p.media.metadata[r.asset];
  for(const r of newVisits)delete p.media.metadata[r.url];
  if(!Object.hasOwn(old.media,'metadata')){assert.deepEqual(p.media.metadata,{});delete p.media.metadata;}
  assert.deepEqual(p,old,id);
 }
 assert.equal(unchanged,224);
});
test('42 distinct Public visits retain source, silent/full-picture integrity and all five language labels',()=>{
 assert.equal(proof.visits.length,42);assert.equal(new Set(proof.visits.map(r=>r.url)).size,42);
 for(const r of proof.visits){const p=window.WROC_CATALOG.getPlace(r.canonicalId),m=p.media.metadata[r.url];
  assert.equal(p.media.videos.filter(url=>url===r.url).length,1);
  assert.match(r.url,/^https:\/\/www\.youtube\.com\/watch\?v=[\w-]{11}$/);
  assert.equal(m.visibility,'Public');assert.ok(m.publicVisibilityReopenedAt);
  assert.equal(m.publicationApprovalCall,'call_63b8adb2da4047b6b0a0645c174bf845');
  assert.equal(m.audioRemoved,true);assert.equal(m.originalFullPicturePreserved,true);
  for(const key of['sourceSHA256','uploadSHA256','decodedVideoSHA256'])assert.match(m[key],/^[a-f\d]{64}$/);
  for(const lang of['he','en','pl','de','cs'])assert.ok(m.title[lang]);
 }
});
test('Both new Brzeg gallery files preserve exact original source bytes and multilingual descriptions',()=>{
 assert.equal(proof.photos.length,2);
 for(const r of proof.photos){const m=window.WROC_CATALOG.getPlace(r.canonicalId).media.metadata[r.asset];
  assert.equal(hash(readFileSync('.'+r.asset)),m.sourceSHA256);assert.equal(m.assetSHA256,m.sourceSHA256);
  assert.equal(m.originalFullPicturePreserved,true);for(const lang of['he','en','pl','de','cs'])assert.ok(m.alt[lang]);
 }
});
