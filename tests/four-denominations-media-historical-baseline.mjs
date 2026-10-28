import {beforeBotanicalMedia,beforeBotanicalGallery} from './botanical-media-historical-baseline.mjs';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {runInNewContext} from 'node:vm';
import assert from 'node:assert/strict';
const baseline=JSON.parse(readFileSync('tests/fixtures/four-denominations-oct28-preintegration.json'));
const approved=JSON.parse(readFileSync('data/four-denominations-oct28-media-provenance.json'));
const plain=value=>JSON.parse(JSON.stringify(value));
const hash=value=>createHash('sha256').update(JSON.stringify(value)).digest('hex');
const window={};runInNewContext(readFileSync('data/place-catalog.js','utf8'),{window});
const current=window.WROC_CATALOG.getPlace(approved.canonicalID);
// Always validate the real current catalog, even when a historical test passes
// an already projected value through both its plain() and hash() wrappers.
assert.equal(hash(current),approved.approvedRecordSHA256,'Unapproved current Four Denominations delta');
assert.deepEqual(plain(window.WROC_CATALOG.aliases),baseline.aliases,'Aliases changed');
const restoredCurrent=plain(current);restoredCurrent.media=baseline.targetBefore.media;
assert.deepEqual(restoredCurrent,baseline.targetBefore,'Non-media identity, links or social changed');
assert.deepEqual(plain(current.media.photos.slice(0,33)),baseline.targetBefore.media.photos,'Previous gallery reordered or removed');
assert.deepEqual(plain(current.media.photos.slice(33)),approved.newAssets.map(a=>a.asset),'Only the eight approved assets may append');
for(const[k,v]of Object.entries(baseline.targetBefore.media))if(!['photos','metadata'].includes(k))assert.deepEqual(plain(current.media[k]),v,'Other media changed: '+k);
for(const[k,v]of Object.entries(baseline.targetBefore.media.metadata))assert.deepEqual(plain(current.media.metadata[k]),v,'Previous metadata changed: '+k);

// Historical receipts stay byte-for-byte unchanged. Only this exact approved
// canonical record may project to its preceding media state. All other 298
// records pass through untouched and are checked independently by the new test.
export function beforeFourDenominationsMedia(value){
 value=beforeBotanicalMedia(value);
 if(!value||value.id!==approved.canonicalID||!value.location||!value.socialPosts)return value;
 const signature=hash(value);
 if(signature===baseline.recordHashes[approved.canonicalID])return value;
 assert.equal(signature,approved.approvedRecordSHA256,'Four Denominations record differs from the exact approved media delta');
 const restored=plain(value);restored.media=baseline.targetBefore.media;
 assert.deepEqual(restored,baseline.targetBefore,'Four Denominations non-media fields changed');
 return baseline.targetBefore;
}

export function beforeFourDenominationsGallery(value,id){
 value=beforeBotanicalGallery(value,id);
 if(id!==approved.canonicalID)return value;
 if(hash(value)===hash(baseline.targetBefore.media.photos))return value;
 assert.deepEqual(plain(value),plain(current.media.photos),'Unapproved district adapter gallery delta');
 return baseline.targetBefore.media.photos;
}
