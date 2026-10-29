import {withoutDining} from './dining-historical-baseline.mjs';
import{beforeUrbanRecord}from'./urban-named-historical-baseline.mjs';
import {beforeBotanicalMedia} from './botanical-media-historical-baseline.mjs';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {runInNewContext} from 'node:vm';
import assert from 'node:assert/strict';
const baseline=JSON.parse(readFileSync('tests/fixtures/pan-precel-oct28-preintegration.json'));
const approved=JSON.parse(readFileSync('data/pan-precel-oct28-media-provenance.json'));
const plain=value=>JSON.parse(JSON.stringify(value));
const hash=value=>createHash('sha256').update(JSON.stringify(value)).digest('hex');
const window={};runInNewContext(readFileSync('data/place-catalog.js','utf8'),{window});
const current=withoutDining(window.WROC_CATALOG.getPlace(approved.canonicalID));
// Always validate the real current catalog, even when a historical test passes
// an already projected value through both its plain() and hash() wrappers.
assert.equal(hash(current),approved.approvedRecordSHA256,'Unapproved current Pan Precel delta');
assert.deepEqual(plain(window.WROC_CATALOG.aliases),baseline.aliases,'Aliases changed');
const restoredCurrent=plain(current);restoredCurrent.media=baseline.targetBefore.media;
assert.deepEqual(restoredCurrent,baseline.targetBefore,'Non-media identity, links or social changed');

// Historical receipts stay byte-for-byte unchanged. Only this exact approved
// canonical record may project to its preceding media state. All other 298
// records pass through untouched and are checked independently by the new test.
export function beforePanPrecelMedia(value){
 value=withoutDining(value);
 value=beforeBotanicalMedia(beforeUrbanRecord(value));
 if(!value||value.id!==approved.canonicalID||!value.location||!value.socialPosts)return value;
 const signature=hash(value);
 if(signature===baseline.recordHashes[approved.canonicalID])return value;
 assert.equal(signature,approved.approvedRecordSHA256,'Pan Precel record differs from the exact approved media delta');
 const restored=plain(value);restored.media=baseline.targetBefore.media;
 assert.deepEqual(restored,baseline.targetBefore,'Pan Precel non-media fields changed');
 return baseline.targetBefore;
}
