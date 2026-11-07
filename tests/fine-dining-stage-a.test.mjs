import{beforeFineDiningStageB}from'./fine-dining-stage-b-baseline.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import vm from 'node:vm';
import {beforeFineDiningStageA} from './fine-dining-stage-a-baseline.mjs';
const proof=JSON.parse(readFileSync('data/fine-dining-stage-a-preservation.json'));
const media=JSON.parse(readFileSync('data/fine-dining-nov7-provenance.json'));
const hash=p=>createHash('sha256').update(JSON.stringify(p)).digest('hex');
function load(){const window={};for(const f of ['data/place-catalog.js','data/canonical-experiences.js'])vm.runInNewContext(readFileSync(f,'utf8'),{window});return beforeFineDiningStageB(window);}
test('Stage A enriches two canonical identities, adds eight and preserves every unrelated place and alias',()=>{
 const w=load(),c=w.WROC_CATALOG;assert.equal(Object.keys(proof.added).length,8);assert.deepEqual(Object.keys(proof.changed).sort(),['forum-kulinarne-wroclaw','wierzbowa-15']);
 for(const[id,h]of Object.entries(proof.unaffectedHashes))assert.equal(hash(c.getPlace(id)),h,id);
 assert.deepEqual(JSON.parse(JSON.stringify(c.aliases)),proof.beforeAliases);
 for(const[id,r]of Object.entries(proof.changed)){const p=c.getPlace(id);assert.equal(hash(p),r.afterHash);for(const photo of r.before.media.photos)assert.ok(p.media.photos.includes(photo));assert.deepEqual(JSON.parse(JSON.stringify(p.location.coordinates)),r.before.location.coordinates);}
 assert.equal(c.getPlace('wierzbowa-15').amenities.freeTapWater,true);
 assert.deepEqual(Array.from(c.getPlace('old-havana-wroclaw').dining.venueTypes),['bar']);
 assert.ok(!Object.keys(w.WROC_EXPERIENCE_CATALOG.byId).some(id=>/fine-dining/.test(id)));
});
test('All 17 edited assets retain source checksums, five languages and honest restoration metadata',()=>{
 const c=load().WROC_CATALOG;assert.equal(Object.keys(media.media).length,17);assert.equal(media.places.reduce((n,p)=>n+p.sourceFiles.length,0),18);
 for(const row of media.places){const p=c.getPlace(row.id);for(const l of ['he','en','pl','de','cs'])assert.ok(p.description[l].length>80);for(const path of row.photos){assert.ok(existsSync('.'+path));const m=p.media.metadata[path];assert.equal(m.aiEdited,true);assert.equal(m.original,false);assert.match(m.sourceSHA256,/^[a-f0-9]{64}$/);assert.equal(createHash('sha256').update(readFileSync('.'+path)).digest('hex'),m.assetSHA256);}}
});
test('Historical projection accepts only the recorded enrichment and rejects later unreviewed changes',()=>{
 let w=load();beforeFineDiningStageA(w);assert.equal(w.WROC_CATALOG.getPlace('acquario-wroclaw'),null);assert.equal(hash(w.WROC_CATALOG.getPlace('forum-kulinarne-wroclaw')),hash(proof.changed['forum-kulinarne-wroclaw'].before));
 w=load();w.WROC_CATALOG.getPlace('manami-sushi-wroclaw').description.en+=' altered';assert.throws(()=>beforeFineDiningStageA(w));
});
