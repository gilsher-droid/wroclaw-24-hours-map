import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {runInNewContext} from 'node:vm';
import assert from 'node:assert/strict';
const baseline=JSON.parse(readFileSync('tests/fixtures/botanical-oct28-preintegration.json'));
const approved=JSON.parse(readFileSync('data/botanical-oct28-media-provenance.json'));
const plain=x=>JSON.parse(JSON.stringify(x));
const hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
const window={};runInNewContext(readFileSync('data/place-catalog.js','utf8'),{window});
const current=window.WROC_CATALOG.getPlace(approved.canonicalID);
assert.equal(hash(current),approved.approvedRecordSHA256,'Unapproved Botanical Garden delta');
assert.deepEqual(plain(window.WROC_CATALOG.aliases),baseline.aliases,'Aliases changed');
const restored=plain(current);restored.media=baseline.targetBefore.media;
assert.deepEqual(restored,baseline.targetBefore,'Botanical identity, non-media, links or social changed');
for(const[k,v]of Object.entries(baseline.targetBefore.media))if(!['photos','metadata','videos'].includes(k))assert.deepEqual(plain(current.media[k]),v,'Other garden media changed:'+k);
assert.deepEqual(plain(current.media.videos),approved.proposedVideos,'Unapproved garden video list');
assert.deepEqual(plain(current.media.videos.slice(0,5)),baseline.targetBefore.media.videos,'Existing five visits changed');
assert.deepEqual(plain(current.media.videos.slice(5)),approved.visitAdditions.map(x=>x.url),'Unapproved added visit');
for(const url of baseline.targetBefore.media.videos)assert.deepEqual(plain(current.media.metadata[url]),baseline.targetBefore.media.metadata[url],'Existing visit metadata changed');
assert.deepEqual(plain(current.media.photos),approved.proposedPhotos,'Unapproved garden gallery order');
// Only this exact reviewed media replacement can project to the old receipt.
// All other298 records pass through unchanged and are checked independently.
export function beforeBotanicalMedia(value){
 if(!value||value.id!==approved.canonicalID||!value.location||!value.socialPosts)return value;
 if(hash(value)===baseline.recordHashes[approved.canonicalID])return value;
 assert.equal(hash(value),approved.approvedRecordSHA256,'Unapproved Botanical Garden mutation');
 const copy=plain(value);copy.media=baseline.targetBefore.media;assert.deepEqual(copy,baseline.targetBefore);
 return baseline.targetBefore;
}
export function beforeBotanicalGallery(value,id){
 if(id!==approved.canonicalID)return value;
 if(hash(value)===hash(baseline.targetBefore.media.photos))return value;
 assert.deepEqual(plain(value),plain(current.media.photos),'Unapproved garden adapter mutation');
 return baseline.targetBefore.media.photos;
}

// Historical asset assertions keep their original receipt SHA. Only a listed
// replacement with exact currently approved source bytes can use that receipt.
export function historicalBotanicalAssetSHA(asset){
 const actual=createHash('sha256').update(readFileSync(asset.replace(/^\//,''))).digest('hex');
 const entry=approved.assets.find(x=>x.asset===asset);
 if(!entry||entry.action==='append-distinct-original')return actual;
 assert.equal(actual,entry.sourceSHA256,'Unapproved garden replacement bytes');
 return baseline.targetBefore.media.metadata[asset].assetSHA256;
}
