import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {runInNewContext} from 'node:vm';
const proof=JSON.parse(readFileSync('data/brzeg-moszna-distinct18-oct24-preservation.json')),w={};
for(const file of ['data/place-catalog.js','data/lower-silesia-excursions.js'])runInNewContext(readFileSync(file,'utf8'),{window:w,console});
const plain=x=>JSON.parse(JSON.stringify(x)),hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
test('18 distinct Brzeg and Moszna photos preserve all227 other canonicals and all existing identity, hero, links and media',()=>{
 let unchanged=0;
 for(const[id,expected]of Object.entries(proof.recordHashes)){
  const p=plain(w.WROC_CATALOG.getPlace(id));
  if(!proof.authorizedIds.includes(id)){assert.equal(hash(p),expected,id);unchanged++;continue;}
  const old=proof.places[id];assert.equal(p.media.photos.length,proof.expectedPhotoCounts[id]);
  assert.deepEqual(p.media.photos.slice(0,old.media.photos.length),old.media.photos);
  p.media.photos=old.media.photos;
  for(const a of proof.photoAdditions.filter(a=>a.canonicalId===id))delete p.media.metadata[a.asset];
  assert.deepEqual(p,old,id);
 }
 assert.equal(unchanged,227);
});
test('All18 full original files have exact retained source provenance and five-language captions in their existing excursion',()=>{
 assert.equal(proof.photoAdditions.length,18);assert.equal(new Set(proof.photoAdditions.map(r=>r.sourceSHA256)).size,18);
 for(const r of proof.photoAdditions){const p=w.WROC_CATALOG.getPlace(r.canonicalId),m=p.media.metadata[r.asset];assert.equal(p.media.photos.filter(a=>a===r.asset).length,1);assert.equal(createHash('sha256').update(readFileSync('.'+r.asset)).digest('hex'),r.sourceSHA256);assert.equal(m.originalFullPicturePreserved,true);for(const l of ['he','en','pl','de','cs'])assert.ok(m.alt[l]);assert.ok(w.WROC_LOWER_SILESIA_EXCURSIONS.excursions.some(t=>t.canonicalPlaceIds.includes(r.canonicalId)));}
});
