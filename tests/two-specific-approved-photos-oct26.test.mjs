import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { runInNewContext } from 'node:vm';
const proof=JSON.parse(readFileSync('data/two-specific-approved-photos-oct26-preservation.json'));
const window={};runInNewContext(readFileSync('data/place-catalog.js','utf8'),{window});
const hash=x=>createHash('sha256').update(x).digest('hex');
test('Two exact approved originals preserve all230 other records and every prior field in both targets',()=>{
 const all=window.WROC_CATALOG.places;assert.equal(Object.keys(all).length,232);let unchanged=0;
 for(const[id,h]of Object.entries(proof.recordHashes))if(!proof.changedIds.includes(id)){assert.equal(hash(JSON.stringify(all[id])),h,id);unchanged++;}
 assert.equal(unchanged,230);assert.equal(proof.photos.length,2);
 for(const row of proof.photos){const p=JSON.parse(JSON.stringify(all[row.canonicalId])),before=proof.before[row.canonicalId];assert.equal(p.media.photos.length,before.media.photos.length+1);assert.deepEqual(p.media.photos.slice(0,-1),before.media.photos);assert.equal(p.media.photos.at(-1),row.asset);assert.equal(hash(readFileSync('.'+row.asset)),row.sourceSHA256);assert.deepEqual(p.media.metadata[row.asset],row.metadata);assert.equal(row.metadata.specificPersonalPhotoApproval.call,'call_42fbfdb56b6b46cc9c1d61846993884a');for(const l of['he','en','pl','de','cs'])assert.ok(row.metadata.alt[l]);assert.equal(row.metadata.originalFullPicturePreserved,true);p.media.photos=before.media.photos;delete p.media.metadata[row.asset];assert.deepEqual(p,before,row.canonicalId);}
});
