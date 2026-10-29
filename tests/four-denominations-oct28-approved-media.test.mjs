import{beforeSwidnicaSnapshot}from'./swidnica-solny-historical-baseline.mjs';
import {beforeBotanicalMedia} from './botanical-media-historical-baseline.mjs';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import test from 'node:test';
const w={};w.window=w;
for(const file of ['data/place-catalog.js','data/location-media.js','data/lower-silesia-excursions.js'])vm.runInNewContext(readFileSync(file,'utf8'),w);
beforeSwidnicaSnapshot(w);
const plain=x=>JSON.parse(JSON.stringify(beforeBotanicalMedia(x)));
const hash=x=>crypto.createHash('sha256').update(Buffer.isBuffer(x)?x:JSON.stringify(beforeBotanicalMedia(x))).digest('hex');
const baseline=JSON.parse(readFileSync('tests/fixtures/four-denominations-oct28-preintegration.json'));
const manifest=JSON.parse(readFileSync('data/four-denominations-oct28-media-provenance.json'));
const current=w.WROC_CATALOG.getPlace(manifest.canonicalID);
test('district media preserves 298 other places, all aliases, nine trips and all non-media fields',()=>{
 assert.equal(Object.keys(w.WROC_CATALOG.places).length,299);
 for(const[id,h]of Object.entries(baseline.recordHashes))if(id!==manifest.canonicalID)assert.equal(hash(w.WROC_CATALOG.getPlace(id)),h,id);
 assert.deepEqual(plain(w.WROC_CATALOG.aliases),baseline.aliases);
 assert.equal(w.WROC_LOWER_SILESIA_EXCURSIONS.excursions.length,9);
 for(const[id,h]of Object.entries(baseline.tripHashes))assert.equal(hash(w.WROC_LOWER_SILESIA_EXCURSIONS.excursions.find(t=>t.id===id)),h,id);
 const restored=plain(current);restored.media=baseline.targetBefore.media;assert.deepEqual(restored,baseline.targetBefore);
 for(const[k,v]of Object.entries(baseline.targetBefore.media))if(!['photos','metadata'].includes(k))assert.deepEqual(plain(current.media[k]),v,k);
 for(const[k,v]of Object.entries(baseline.targetBefore.media.metadata))assert.deepEqual(plain(current.media.metadata[k]),v,k);
});
test('eight distinct full-original approved photographs append to the existing 33-image gallery',()=>{
 assert.equal(current.media.photos.length,41);
 assert.deepEqual(plain(current.media.photos.slice(0,33)),baseline.targetBefore.media.photos);
 assert.deepEqual(plain(w.WROC_LOCATION_MEDIA[manifest.canonicalID].gallery),plain(current.media.photos));
 assert.equal(new Set(current.media.photos).size,41);
 assert.equal(manifest.newAssets.length,8);
 assert.equal(new Set(manifest.newAssets.map(a=>a.sourceSHA256)).size,8);
 for(const a of manifest.newAssets){
  assert.ok(current.media.photos.includes(a.asset));
  assert.equal(hash(readFileSync('.'+a.asset)),a.sourceSHA256);
  const m=current.media.metadata[a.asset];assert.equal(m.assetSHA256,a.sourceSHA256);assert.equal(m.sourceSHA256,a.sourceSHA256);
  assert.equal(m.originalFullPicturePreserved,true);assert.deepEqual(plain(m.sourceDimensions),[3024,4032]);
  assert.equal(m.personalScopeApproval,'four-religions-new-inbox-2026-10-28/scoped-personal-media-approval-latest.json');
  for(const l of ['he','en','pl','de','cs'])assert.ok(m.alt[l]);
 }
 for(const n of ['2636','2637','2638','2639','2655','2656','2642','2643','2645','2651','2657'])assert.ok(!current.media.photos.some(a=>a.endsWith('/source-'+n+'.jpg')));
});
test('historical district projection rejects any unapproved identity, media or link delta',async()=>{
 const {beforeFourDenominationsMedia,beforeFourDenominationsGallery}=await import('./four-denominations-media-historical-baseline.mjs');
 assert.deepEqual(beforeFourDenominationsMedia(current),baseline.targetBefore);
 assert.deepEqual(beforeFourDenominationsGallery(current.media.photos,current.id),baseline.targetBefore.media.photos);
 assert.throws(()=>beforeFourDenominationsGallery([...current.media.photos].reverse(),current.id));
 assert.equal(beforeFourDenominationsGallery(current.media.photos,'pan-precel-olawska'),current.media.photos);
 const other=w.WROC_CATALOG.getPlace('pan-precel-olawska');assert.equal(beforeFourDenominationsMedia(other),other);
 for(const change of [p=>p.name.he+=' changed',p=>p.location.coordinates.lat+=.001,p=>p.media.photos.reverse(),p=>p.links.website='https://example.com']){
  const modified=plain(current);change(modified);assert.throws(()=>beforeFourDenominationsMedia(modified));
 }
});
