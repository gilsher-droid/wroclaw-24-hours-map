import assert from 'node:assert/strict';
import {readFileSync}from'node:fs';
const proof=JSON.parse(readFileSync('data/two-specific-approved-photos-oct26-preservation.json'));
// Verify each exact approved delta before projecting the earlier scoped contract.
export function beforeTwoSpecificApprovedPhotos(record){
 const place=JSON.parse(JSON.stringify(record));const row=proof.photos.find(r=>r.canonicalId===place.id);if(!row)return place;
 assert.equal(place.media.photos.length,proof.before[place.id].media.photos.length+1);
 assert.equal(place.media.photos.filter(a=>a===row.asset).length,1);
 assert.deepEqual(place.media.metadata[row.asset],row.metadata);
 place.media.photos=place.media.photos.filter(a=>a!==row.asset);delete place.media.metadata[row.asset];return place;
}
