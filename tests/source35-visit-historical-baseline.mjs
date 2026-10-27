import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const proof=JSON.parse(readFileSync('data/source35-visit-oct27-preservation.json'));
// Validate the exact later visit before projecting the earlier regional contract.
export function beforeSource35Visit(record){
 const p=JSON.parse(JSON.stringify(record));if(p.id!==proof.canonicalId)return p;
 assert.equal(p.media.photos.length,78);
 assert.equal(p.media.videos.length,18);
 assert.deepEqual(p.media.videos.slice(0,17),proof.before.media.videos);
 assert.equal(p.media.videos[17],proof.url);
 assert.deepEqual(p.media.metadata[proof.url],proof.metadata);
 p.media.videos.pop();delete p.media.metadata[proof.url];
 assert.deepEqual(p,proof.before);return p;
}
