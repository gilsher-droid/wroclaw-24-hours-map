// Historical tests retain their prior media scope. The dedicated new test validates
// the exact approved addition, all prior fields and every other current canonical.
import assert from 'node:assert/strict';import{readFileSync}from'node:fs';const proof=JSON.parse(readFileSync('data/wang-photo43-approved-oct25-preservation.json'));
export function beforeApprovedWangPhoto43(record){const p=JSON.parse(JSON.stringify(record));if(p.id!==proof.canonicalId)return p;const r=proof.photo;assert.equal(p.media.photos.filter(x=>x===r.asset).length,1);assert.deepEqual(p.media.metadata[r.asset],r.metadata);p.media.photos=p.media.photos.filter(x=>x!==r.asset);delete p.media.metadata[r.asset];assert.deepEqual(p,proof.before);return p;}
