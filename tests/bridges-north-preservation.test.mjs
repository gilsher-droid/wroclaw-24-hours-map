import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import {createHash} from 'node:crypto';
import {beforeBridgesNorthSnapshot,beforeBridgesNorthSource,assertReviewedBridgesNorth} from './bridges-north-historical-baseline.mjs';
const proof=JSON.parse(readFileSync('data/bridges-north-approved-additions.json'));
const hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
const clone=x=>JSON.parse(JSON.stringify(x));
function load(){const window={};for(const f of ['data/place-catalog.js','data/canonical-experiences.js','data/lower-silesia-excursions.js','data/home-experiences.js'])runInNewContext(readFileSync(f,'utf8'),{window});return window;}
test('Both additions preserve all 318 prior places, nine trips, fourteen experiences and existing aliases without projection',()=>{
 const w=load(),c=w.WROC_CATALOG;
 assert.equal(Object.keys(proof.beforeRecordHashes).length,318);
 assert.equal(Object.keys(c.places).length,323);
 for(const[id,expected]of Object.entries(proof.beforeRecordHashes))assert.equal(hash(c.places[id]),expected,id);
 assert.deepEqual(clone(c.aliases),proof.beforeAliases);
 assertReviewedBridgesNorth(c.places);
 assert.equal(w.WROC_LOWER_SILESIA_EXCURSIONS.excursions.length,10);
 for(const[id,expected]of Object.entries(proof.beforeTripHashes))assert.equal(hash(w.WROC_LOWER_SILESIA_EXCURSIONS.excursions.find(x=>x.id===id)),expected,id);
 assert.equal(w.WROC_EXPERIENCE_CATALOG.experiences.length,15);
 for(const[id,expected]of Object.entries(proof.beforeExperienceHashes))assert.equal(hash(w.WROC_EXPERIENCE_CATALOG.getExperience(id)),expected,id);
 assert.equal(w.WROC_HOME_EXPERIENCES.length,9);
});
test('Historical scope removes only verified new content and rejects altered northern records and trips',()=>{
 let w=load();let bad=clone(w.WROC_CATALOG.places);bad[proof.newIds[0]].description.en+=' changed';assert.throws(()=>assertReviewedBridgesNorth(bad));
 w.WROC_LOWER_SILESIA_EXCURSIONS.excursions.find(x=>x.id===proof.tripId).title.en+=' changed';assert.throws(()=>beforeBridgesNorthSnapshot(w));
 w=load();const oldGetter=w.WROC_CATALOG.getPlace;w.WROC_CATALOG={...w.WROC_CATALOG,getPlace:id=>id==='papa'?{...oldGetter(id),unreviewed:true}:oldGetter(id)};w.WROC_CATALOG.places.unexpected={id:'unexpected'};
 beforeBridgesNorthSnapshot(w);
 assert.equal(Object.keys(w.WROC_CATALOG.places).length,319);
 assert.ok(w.WROC_CATALOG.places.unexpected);
 assert.equal(w.WROC_CATALOG.getPlace('papa').unreviewed,true);
 for(const id of proof.newIds)assert.equal(w.WROC_CATALOG.getPlace(id),null);
 assert.equal(w.WROC_LOWER_SILESIA_EXCURSIONS.excursions.length,9);
 assert.equal(w.WROC_EXPERIENCE_CATALOG.experiences.length,14);
 assert.equal(w.WROC_HOME_EXPERIENCES.length,8);
});

test("Historical source projection accepts only the exact approved excursion source",()=>{const source=readFileSync("data/lower-silesia-excursions.js");assert.equal(createHash("sha256").update(beforeBridgesNorthSource("data/lower-silesia-excursions.js",source)).digest("hex"),proof.beforeExcursionSourceSHA256);assert.throws(()=>beforeBridgesNorthSource("data/lower-silesia-excursions.js",Buffer.concat([source,Buffer.from("unreviewed")])));});
