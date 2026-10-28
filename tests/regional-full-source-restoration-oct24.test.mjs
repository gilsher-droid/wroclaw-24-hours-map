import {beforeFourDenominationsMedia} from './four-denominations-media-historical-baseline.mjs';
import {beforePanPrecelMedia} from './pan-precel-media-historical-baseline.mjs';
import {beforeRegional42} from './regional42-historical-baseline.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {runInNewContext} from 'node:vm';
const newFull=JSON.parse(readFileSync('data/brzeg-moszna-distinct18-oct24-preservation.json'));
const proof=JSON.parse(readFileSync('data/regional-full-source-restoration-oct24-preservation.json')),additional=JSON.parse(readFileSync('data/jawor-brzeg-source-photo-additions-oct24-preservation.json')),w={};
for(const f of ['data/place-catalog.js','data/lower-silesia-excursions.js','data/youtube-video-hosting.js'])runInNewContext(readFileSync(f,'utf8'),{window:w,console});
const plain=x=>JSON.parse(JSON.stringify(beforeFourDenominationsMedia(beforePanPrecelMedia(x)))),hash=x=>createHash('sha256').update(JSON.stringify(beforeFourDenominationsMedia(beforePanPrecelMedia(x)))).digest('hex');
test('Regional restoration preserves all225 unrelated canonicals and all existing identity, hero, social, guides and media',()=>{
 let unchanged=0;
 for(const[id,h]of Object.entries(proof.recordHashes)){
  const p=plain(beforeFourDenominationsMedia(w.WROC_CATALOG.getPlace(id)));
  if(!proof.authorizedIds.includes(id)){assert.equal(hash(p),h,id);unchanged++;continue;}
  const old=proof.places[id];
  for(const k of Object.keys(old).filter(k=>k!=='media'))assert.deepEqual(p[k],old[k],id+':'+k);
  for(const k of Object.keys(old.media).filter(k=>!['photos','videos','metadata'].includes(k)))assert.deepEqual(p.media[k],old.media[k]);
  for(const k of ['photos','videos'])assert.deepEqual(p.media[k].slice(0,old.media[k].length),old.media[k]);
  for(const[k,v]of Object.entries(old.media.metadata||{}))assert.deepEqual(p.media.metadata[k],v);
 }
 assert.equal(unchanged,225);
});
test('All91 distinct restored full photographs have exact provenance and remain accessible through the shared regional catalog',()=>{
 assert.equal(proof.photos.length,91);assert.equal(new Set(proof.photos.map(p=>p.pixelSHA256)).size,91);
 for(const[id,n]of Object.entries(proof.expectedPhotoCounts))assert.equal(beforeRegional42(beforeFourDenominationsMedia(w.WROC_CATALOG.getPlace(id))).media.photos.length,newFull.expectedPhotoCounts[id]??n,id);
 for(const r of proof.photos){
  const p=beforeFourDenominationsMedia(w.WROC_CATALOG.getPlace(r.canonicalId)),m=p.media.metadata[r.asset];assert.equal(p.media.photos.filter(a=>a===r.asset).length,1);
  assert.equal(createHash('sha256').update(readFileSync('.'+r.asset)).digest('hex'),r.assetSHA256);
  assert.equal(m.sourceSHA256,r.sourceSHA256);assert.equal(m.originalFullPicturePreserved,true);
  assert.ok(!proof.heldPhotoSourceSHA256.includes(r.sourceSHA256));
  assert.ok(Math.abs(r.originalDimensions[0]/r.originalDimensions[1]-r.preparedDimensions[0]/r.preparedDimensions[1])<.002);
  for(const l of ['he','en','pl','de','cs'])assert.ok(m.alt[l]);
 }
 const trips=w.WROC_LOWER_SILESIA_EXCURSIONS.excursions;
 for(const id of proof.authorizedIds)assert.ok(trips.some(t=>t.canonicalPlaceIds.includes(id)),id);
});
test('Eight previously Public Boleslawiec clips are reused without uploading again or disturbing existing guides',()=>{
 assert.equal(proof.reusedVisits.length,8);
 for(const[id,n]of Object.entries(proof.expectedVisitCounts))assert.equal(beforeRegional42(beforeFourDenominationsMedia(w.WROC_CATALOG.getPlace(id))).media.videos.length,additional.expectedVisitCounts[id]??n,id);
 for(const r of proof.reusedVisits){const p=beforeFourDenominationsMedia(w.WROC_CATALOG.getPlace(r.canonicalId));assert.equal(p.media.videos.filter(u=>u===r.youtube).length,1);assert.equal(p.media.metadata[r.youtube].noNewUpload,true);assert.ok(Object.values(w.WROC_YOUTUBE_VIDEO_HOSTING).some(v=>v.sourceSHA256===r.sourceSHA256&&v.youtube===r.youtube&&v.status==='public'));}
 assert.deepEqual(plain(beforeFourDenominationsMedia(w.WROC_CATALOG.getPlace('boleslawiec-old-town')).media.guideVideos),proof.places['boleslawiec-old-town'].media.guideVideos);
});
