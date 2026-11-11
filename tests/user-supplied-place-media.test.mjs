import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {runInNewContext} from 'node:vm';
import {beforePolishRichPosts} from './polish-rich-posts-historical-baseline.mjs';
const hash=value=>createHash('sha256').update(typeof value==='string'||Buffer.isBuffer(value)?value:JSON.stringify(value)).digest('hex');
const fixture=JSON.parse(readFileSync('tests/fixtures/user-supplied-place-media-nov11.json'));
const w={}; for(const file of ['data/place-catalog.js','data/lifestyle-places.js','data/location-media.js'])runInNewContext(readFileSync(file,'utf8'),{window:w,console});
test('Two user-approved illustrations preserve every prior identity and all 344 unrelated records',()=>{
 assert.deepEqual(Object.keys(w.WROC_CATALOG.places).sort(),Object.keys(fixture.beforeRecordHashes).sort());
 for(const [id,beforeHash] of Object.entries(fixture.beforeRecordHashes)){
  const p=w.WROC_CATALOG.places[id];
  assert.equal(hash(fixture.beforeMedia[id]?beforePolishRichPosts(p):p),beforeHash,id);
 }
 for(const id of Object.keys(fixture.beforeMedia)){
  const p=w.WROC_CATALOG.getPlace(id),src=p.media.photos.at(-1),m=p.media.metadata[src];
  assert.equal(p.media.photos.length,fixture.beforeMedia[id].photos.length+1);
  assert.equal(hash(readFileSync(src.slice(1))),m.assetSHA256);assert.equal(m.sourceSHA256,m.assetSHA256);
  assert.equal(m.original,false);assert.equal(m.aiGenerated,true);assert.equal(m.addedGraphicOverlay,false);
  for(const lang of ['he','en','pl','de','cs'])assert.ok(m.alt[lang]);
  assert.deepEqual([...w.WROC_LOCATION_MEDIA[id].gallery],[...p.media.photos]);
 }
 assert.equal(w.WROC_CATALOG.getPlace('new-horizons-cinema').media.metadata[w.WROC_CATALOG.getPlace('new-horizons-cinema').media.photos[0]].printedSourceCredit,'Marcin Biodrowski');
});
