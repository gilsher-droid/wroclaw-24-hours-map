import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';import {createHash} from 'node:crypto';import vm from 'node:vm';import {beforeDiningSnapshot,withoutDining} from './dining-historical-baseline.mjs';
const proof=JSON.parse(readFileSync('data/dining-development-preservation.json','utf8')),hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
const clone=x=>JSON.parse(JSON.stringify(x));
function load(){const window={};for(const f of ['data/place-catalog.js','data/canonical-experiences.js','data/lower-silesia-excursions.js','data/home-experiences.js'])vm.runInNewContext(readFileSync(f,'utf8'),{window});return window;}
test('Dining is additive: all 323 original record bodies, aliases, 10 excursions and 15 experiences remain exact',()=>{
 const w=load(),c=w.WROC_CATALOG;assert.equal(Object.keys(c.places).length,323);assert.equal(Object.keys(proof.beforeRecordHashes).length,323);
 for(const [id,p]of Object.entries(c.places)){const body=clone(p);delete body.dining;assert.equal(hash(body),proof.beforeRecordHashes[id],id);if(p.dining)assert.equal(hash(p.dining),proof.diningHashes[id]);}
 assert.deepEqual(clone(c.aliases),proof.beforeAliases);assert.equal(hash(w.WROC_LOWER_SILESIA_EXCURSIONS),proof.beforeExcursionsHash);
 assert.equal(w.WROC_EXPERIENCE_CATALOG.experiences.length,17);for(const [id,h]of Object.entries(proof.beforeExperienceHashes))assert.equal(hash(w.WROC_EXPERIENCE_CATALOG.getExperience(id)),h,id);
 for(const [id,h]of Object.entries(proof.newExperienceHashes))assert.equal(hash(w.WROC_EXPERIENCE_CATALOG.getExperience(id)),h,id);
 assert.equal(w.WROC_HOME_EXPERIENCES.length,11);const historical=w.WROC_HOME_EXPERIENCES.filter(e=>!Object.hasOwn(proof.newHomeHashes,e.id));assert.equal(hash(historical),proof.beforeHomeHash);
});
test('Historical projection refuses altered new fields, definitions and unrelated record edits',()=>{
 let w=load();const p=clone(w.WROC_CATALOG.getPlace('pizza-si'));p.dining.cuisines.push('polish');assert.throws(()=>withoutDining(p));
 w=load();w.WROC_EXPERIENCE_CATALOG.getExperience('foodies-wroclaw').description.en+=' changed';assert.throws(()=>beforeDiningSnapshot(w));
 w=load();w.WROC_CATALOG.getPlace('papa').description.en+=' retained';beforeDiningSnapshot(w);assert.ok(w.WROC_CATALOG.getPlace('papa').description.en.endsWith(' retained'));
});
