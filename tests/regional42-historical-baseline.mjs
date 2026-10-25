// Historical receipts retain their original scope; the separate regional42 test
// verifies the new authorized delta and every complete current canonical record.
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const delta=JSON.parse(readFileSync('data/regional42-oct25-preservation.json'));
export function beforeRegional42(record){
 const p=JSON.parse(JSON.stringify(record));if(!delta.changedIds.includes(p.id))return p;
 for(const r of delta.visits.filter(x=>x.canonicalId===p.id)){
  assert.equal(p.media.videos.filter(x=>x===r.url).length,1);
  assert.deepEqual(p.media.metadata[r.url],r.metadata);
  p.media.videos=p.media.videos.filter(x=>x!==r.url);delete p.media.metadata[r.url];
 }
 for(const r of delta.photos.filter(x=>x.canonicalId===p.id)){
  assert.equal(p.media.photos.filter(x=>x===r.asset).length,1);
  assert.deepEqual(p.media.metadata[r.asset],r.metadata);
  p.media.photos=p.media.photos.filter(x=>x!==r.asset);delete p.media.metadata[r.asset];
 }
 if(!Object.hasOwn(delta.before[p.id].media,'metadata'))delete p.media.metadata;
 assert.deepEqual(p,delta.before[p.id]);return p;
}
