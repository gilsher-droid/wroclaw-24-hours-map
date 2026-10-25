import {beforeRegional42} from './regional42-historical-baseline.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {runInNewContext} from 'node:vm';
const proof=JSON.parse(readFileSync('data/regional124-oct25-preservation.json')),window={};
runInNewContext(readFileSync('data/place-catalog.js','utf8'),{window,console});
const plain=x=>JSON.parse(JSON.stringify(x)),hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
test('Regional124 photo additions preserve all other records and existing identity/media in nine changed places',()=>{
 assert.deepEqual(Object.keys(window.WROC_CATALOG.places).sort(),Object.keys(proof.recordHashes).sort());let unchanged=0;
 for(const[id,h]of Object.entries(proof.recordHashes)){const p=plain(window.WROC_CATALOG.getPlace(id));if(!proof.changedIds.includes(id)){assert.equal(hash(p),h,id);unchanged++;continue;}Object.assign(p,beforeRegional42(p));const old=proof.before[id],rows=proof.photos.filter(r=>r.canonicalId===id);assert.equal(p.media.photos.length,old.media.photos.length+rows.length,id);assert.deepEqual(p.media.photos.slice(0,old.media.photos.length),old.media.photos,id);p.media.photos=old.media.photos;for(const r of rows)delete p.media.metadata[r.asset];if(!Object.hasOwn(old.media,"metadata")){assert.deepEqual(p.media.metadata,{});delete p.media.metadata;}assert.deepEqual(p,old,id);}
 assert.equal(unchanged,Object.keys(proof.recordHashes).length-9);
});
test('All124 new assets preserve exact source bytes and complete multilingual visible descriptions',()=>{
 assert.equal(proof.photos.length,124);assert.equal(new Set(proof.photos.map(r=>r.sourceSHA256)).size,124);
 for(const r of proof.photos){const p=window.WROC_CATALOG.getPlace(r.canonicalId),m=p.media.metadata[r.asset];assert.equal(p.media.photos.filter(a=>a===r.asset).length,1);assert.equal(createHash('sha256').update(readFileSync('.'+r.asset)).digest('hex'),r.sourceSHA256);assert.equal(m.sourceSHA256,r.sourceSHA256);assert.equal(m.originalFullPicturePreserved,true);for(const l of['he','en','pl','de','cs'])assert.ok(m.alt[l],r.asset+' '+l);}
});
