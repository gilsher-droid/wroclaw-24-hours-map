import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const fixture=JSON.parse(readFileSync('tests/fixtures/user-supplied-place-media-nov11.json'));
const hash=value=>createHash('sha256').update(JSON.stringify(value)).digest('hex');
// Preserve older receipts while accepting only these two exact image additions.
export function beforeApprovedPlaceMedia(value){
 const before=fixture.beforeMedia[value?.id];
 if(!before||!value.location||!value.socialPosts||hash(value.media)===hash(before))return value;
 assert.equal(hash(value.media),fixture.afterMediaHashes[value.id],'Unexpected approved-image media delta: '+value.id);
 return {...value,media:before};
}
