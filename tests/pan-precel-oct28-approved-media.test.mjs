import{beforeSwidnicaSnapshot}from'./swidnica-solny-historical-baseline.mjs';
import {beforeFourDenominationsMedia} from './four-denominations-media-historical-baseline.mjs';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import test from 'node:test';
const w={};w.window=w;
for(const file of ['data/place-catalog.js','data/location-media.js','data/lower-silesia-excursions.js'])vm.runInNewContext(readFileSync(file,'utf8'),w);
beforeSwidnicaSnapshot(w);
const plain=v=>JSON.parse(JSON.stringify(beforeFourDenominationsMedia(v)));
const hash=v=>crypto.createHash('sha256').update(Buffer.isBuffer(v)?v:JSON.stringify(beforeFourDenominationsMedia(v))).digest('hex');
const baseline=JSON.parse(readFileSync('tests/fixtures/pan-precel-oct28-preintegration.json'));
const manifest=JSON.parse(readFileSync('data/pan-precel-oct28-media-provenance.json'));
const current=beforeFourDenominationsMedia(w.WROC_CATALOG.getPlace(manifest.canonicalID));
test('Pan Precel enrichment preserves 298 other records, aliases, 9 trips and all target identity/link fields',()=>{
 assert.equal(Object.keys(baseline.recordHashes).length,299);
 assert.equal(Object.keys(w.WROC_CATALOG.places).length,299);
 for(const[id,expected]of Object.entries(baseline.recordHashes))if(id!==manifest.canonicalID)assert.equal(hash(beforeFourDenominationsMedia(w.WROC_CATALOG.getPlace(id))),expected,id);
 assert.deepEqual(plain(w.WROC_CATALOG.aliases),baseline.aliases);
 assert.equal(w.WROC_LOWER_SILESIA_EXCURSIONS.excursions.length,9);
 for(const[id,expected]of Object.entries(baseline.tripHashes))assert.equal(hash(w.WROC_LOWER_SILESIA_EXCURSIONS.excursions.find(t=>t.id===id)),expected,id);
 const restored=plain(current);restored.media=baseline.targetBefore.media;
 assert.deepEqual(restored,baseline.targetBefore);
});
test('seven distinct approved captures use full source bytes without duplicate gallery entries',()=>{
 assert.equal(current.media.photos.length,7);
 assert.deepEqual(plain(w.WROC_LOCATION_MEDIA[manifest.canonicalID].gallery),plain(current.media.photos));
 assert.equal(new Set(current.media.photos).size,7);
 assert.equal(new Set(manifest.assets.map(a=>a.sourceSHA256)).size,7);
 assert.equal(manifest.assets.filter(a=>a.existingCapture).length,2);
 for(const oldPath of manifest.originalGalleryPaths)assert.ok(current.media.photos.includes(oldPath));
 assert.equal(current.media.photos[0],'/assets/pan-precel-oct28/source-2667.jpg');
 for(const asset of manifest.assets){
  const m=current.media.metadata[asset.asset];
  assert.ok(current.media.photos.includes(asset.asset));
  assert.equal(hash(readFileSync('.'+asset.asset)),asset.sourceSHA256);
  assert.equal(m.assetSHA256,asset.sourceSHA256);
  assert.equal(m.sourceSHA256,asset.sourceSHA256);
  assert.deepEqual(plain(m.sourceDimensions),[3024,4032]);
  assert.equal(m.originalFullPicturePreserved,true);
  for(const language of ['he','en','pl','de','cs'])assert.ok(m.alt[language]);
  if(['IMG_2663.JPG','IMG_2664.JPG'].includes(asset.name)){
   assert.equal(m.specificPersonalApproval.approvalId,'call_f8a0a8e95a144cdf97169af1d0f2edb6');
   assert.equal(m.specificPersonalApproval.repository,'https://github.com/gilsher-droid/wroclaw-24-hours-map');
   assert.equal(m.specificPersonalApproval.sourceSHA256,asset.sourceSHA256);
  }
 }
});

test('historical projection rejects unapproved target changes and never projects other records',async()=>{
 const {beforePanPrecelMedia}=await import('./pan-precel-media-historical-baseline.mjs');
 assert.deepEqual(beforePanPrecelMedia(current),baseline.targetBefore);
 const other=beforeFourDenominationsMedia(w.WROC_CATALOG.getPlace('pan-precel'));assert.equal(beforePanPrecelMedia(other),other);
 for(const change of [p=>p.name.he+=' changed',p=>p.location.coordinates.lat+=.001,p=>p.media.photos.reverse(),p=>p.links.website='https://example.com']){
  const modified=plain(current);change(modified);assert.throws(()=>beforePanPrecelMedia(modified));
 }
});
