import {historicalPlaceIds} from './historical-catalog-scope.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {runInNewContext} from 'node:vm';
const proof=JSON.parse(readFileSync('data/nozyk-full-oct25-preservation.json')),window={};
runInNewContext(readFileSync('data/place-catalog.js','utf8'),{window,console});
const plain=x=>JSON.parse(JSON.stringify(x)),hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
test('Nozyk13photo delta preserves230other identities and every existing Nozyk field',()=>{
 assert.equal(historicalPlaceIds(window.WROC_CATALOG.places).length,((231)+1)+1);let unchanged=0;
 for(const[id,h]of Object.entries(proof.recordHashes)){const p=plain(window.WROC_CATALOG.getPlace(id));if(id!==proof.canonicalId){assert.equal(hash(p),h,id);unchanged++;continue;}assert.equal(p.media.photos.length,19);assert.deepEqual(p.media.photos.slice(0,6),proof.before.media.photos);p.media.photos=proof.before.media.photos;for(const r of proof.photos)delete p.media.metadata[r.asset];assert.deepEqual(p,proof.before);}
 assert.equal(unchanged,230);
});
test('All13 full-frame assets retain exact recorded sourceSHA and5language alt text',()=>{
 const p=window.WROC_CATALOG.getPlace(proof.canonicalId);assert.equal(proof.photos.length,13);assert.equal(new Set(proof.photos.map(r=>r.sourceSHA256)).size,13);
 for(const r of proof.photos){assert.equal(p.media.photos.filter(a=>a===r.asset).length,1);assert.equal(createHash('sha256').update(readFileSync('.'+r.asset)).digest('hex'),r.sourceSHA256);const m=p.media.metadata[r.asset];assert.equal(m.sourceSHA256,r.sourceSHA256);assert.equal(m.originalFullPicturePreserved,true);for(const l of['he','en','pl','de','cs'])assert.ok(m.alt[l]);}
});
