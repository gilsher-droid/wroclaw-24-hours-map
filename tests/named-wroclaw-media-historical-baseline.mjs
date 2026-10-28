import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {runInNewContext} from 'node:vm';
import assert from 'node:assert/strict';
const baseline=JSON.parse(readFileSync('tests/fixtures/named-wroclaw-oct28-preintegration.json'));
const approved=JSON.parse(readFileSync('data/named-wroclaw-oct28-media-provenance.json'));
const gardenHistorical=JSON.parse(readFileSync('tests/fixtures/botanical-oct28-preintegration.json'));
const plain=x=>JSON.parse(JSON.stringify(x));
const hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
const window={};runInNewContext(readFileSync('data/place-catalog.js','utf8'),{window});
assert.deepEqual(plain(window.WROC_CATALOG.aliases),baseline.aliases,'Named inbox aliases changed');
for(const id of approved.canonicalIDs){
 const current=window.WROC_CATALOG.getPlace(id);
 assert.equal(hash(current),approved.approvedRecordSHAs[id],'Unapproved named-inbox record: '+id);
 const restored=plain(current);restored.media=baseline.targetsBefore[id].media;
 assert.deepEqual(restored,baseline.targetsBefore[id],'Named inbox changed nonmedia: '+id);
}
// Only the exact reviewed media delta projects to the historical receipt.
// The independent new test compares all280 other records without projection.
export function beforeNamedWroclawMedia(value){
 const before=value?.location&&value?.socialPosts&&baseline.targetsBefore[value.id];
 if(!before)return value;
 if(value.id==='wroclaw-botanical-garden'&&hash(value)===gardenHistorical.recordHashes[value.id])return value;
 if(hash(value)===baseline.recordHashes[value.id])return value;
 assert.equal(hash(value),approved.approvedRecordSHAs[value.id],'Unapproved named-inbox mutation: '+value.id);
 const restored=plain(value);restored.media=before.media;
 assert.deepEqual(restored,before);return before;
}
export function beforeNamedWroclawGallery(value,id){
 const before=baseline.targetsBefore[id]?.media.photos;
 if(!before||hash(value)===hash(before))return value;
 if(id==='wroclaw-botanical-garden'&&hash(value)===hash(gardenHistorical.targetBefore.media.photos))return value;
 assert.deepEqual(plain(value),approved.proposedMedia[id].photos,'Unapproved named-inbox gallery: '+id);
 return before;
}
export function historicalNamedWroclawAssetSHA(asset){
 const actual=createHash('sha256').update(readFileSync(asset.replace(/^\//,''))).digest('hex');
 const before=baseline.replacedAssetSHAs[asset];
 if(!before)return actual;
 assert.equal(actual,approved.assets.find(x=>x.asset===asset)?.sourceSHA256,'Unapproved original upgrade bytes');
 return before;
}
// Explicit test-only snapshot for receipts whose assertions predate this batch.
// Each changed record and gallery must first match the exact reviewed delta.
export function beforeNamedWroclawSnapshot(runtime){
 const catalog=runtime.WROC_CATALOG;
 const places=Object.fromEntries(Object.entries(catalog.places).map(([id,p])=>[id,beforeNamedWroclawMedia(p)]));
 runtime.WROC_CATALOG={...catalog,places,getPlace:id=>beforeNamedWroclawMedia(catalog.getPlace(id))};
 for(const rows of Object.values(runtime).filter(Array.isArray))for(const row of rows){
  if(row?.canonicalPlace)row.canonicalPlace=beforeNamedWroclawMedia(row.canonicalPlace);
 }
 for(const[id,resource]of Object.entries(runtime.WROC_LOCATION_MEDIA||{})){
  const canonicalID=catalog.resolveId(id);
  if(!baseline.targetsBefore[canonicalID])continue;
  const restored={...resource};
  if(resource.gallery){
   const oldResource=baseline.resourceGalleriesBefore[id];
   restored.gallery=oldResource&&hash(resource.gallery)===hash(oldResource)
    ? resource.gallery : beforeNamedWroclawGallery(resource.gallery,canonicalID);
  }
  if(resource.videos){
   const additions=approved.videoAdditions.filter(x=>x.canonicalID===canonicalID).map(x=>x.url);
   restored.videos=resource.videos.filter(v=>!additions.includes(typeof v==='string'?v:v.src));
  }
  runtime.WROC_LOCATION_MEDIA[id]=restored;
 }
 return runtime;
}
