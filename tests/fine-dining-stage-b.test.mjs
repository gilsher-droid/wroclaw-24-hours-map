import test from 'node:test';
import {beforeJoliePhotoSnapshot} from './jolie-photo-attribution-historical-baseline.mjs';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import vm from 'node:vm';
import {beforeFineDiningStageB} from './fine-dining-stage-b-baseline.mjs';
const hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
const proof=JSON.parse(readFileSync('data/fine-dining-stage-b-preservation.json'));
function load(){const window={};for(const f of ['data/place-catalog.js','data/canonical-experiences.js','data/home-experiences.js','data/dining-taxonomy.js'])vm.runInNewContext(readFileSync(f,'utf8'),{window});return beforeJoliePhotoSnapshot(window);}
test('Fine Dining reuses nine reviewed restaurants, all their images and five-language editorial copy',()=>{
 const w=load(),r=w.WROC_EXPERIENCE_CATALOG,e=r.getExperience(proof.id);assert.equal(e.relatedCanonicalPlaceIds.length,9);assert.equal(new Set(e.relatedCanonicalPlaceIds).size,9);assert.ok(!e.relatedCanonicalPlaceIds.includes('old-havana-wroclaw'));
 for(const id of e.relatedCanonicalPlaceIds){const p=w.WROC_CATALOG.getPlace(id);assert.ok(p.dining.venueTypes.includes('restaurant'));assert.ok(/^https:\/\//.test(p.links.website));}
 for(const f of ['name','description','subtitle','visitNote','galleryTitle','placeWebsiteLabel','mapTitle','mapNote'])for(const lang of ['he','en','pl','de','cs'])assert.ok(e[f][lang]?.length>3,f+lang);
 const media=r.resolveMedia(e);assert.equal(media.images.length,17);assert.equal(new Set(media.images).size,17);for(const path of media.images)assert.ok(existsSync('.'+path));assert.deepEqual(Array.from(e.diningFilterKeys),['cuisine']);assert.equal(e.nearbyDiscovery,false);
 const japanese=e.relatedCanonicalPlaceIds.filter(id=>w.WROC_DINING.matches(w.WROC_CATALOG.getPlace(id),{cuisine:'japanese'}));assert.deepEqual(Array.from(japanese),['manami-sushi-wroclaw']);
 assert.equal(w.WROC_HOME_EXPERIENCES.filter(x=>x.id===e.id).length,1);
});
test('Stage B preserves every canonical place, all 18 earlier experiences and every existing home card',()=>{
 const w=load();assert.equal(hash(w.WROC_CATALOG.places),proof.beforePlaceHash);for(const[id,h]of Object.entries(proof.beforeExperienceHashes))assert.equal(hash(w.WROC_EXPERIENCE_CATALOG.getExperience(id)),h,id);
 assert.equal(w.WROC_EXPERIENCE_CATALOG.experiences.length,Object.keys(proof.beforeExperienceHashes).length+1);assert.equal(hash(w.WROC_HOME_EXPERIENCES.filter(x=>x.id!==proof.id)),hash(proof.beforeHome));
 beforeFineDiningStageB(w);assert.equal(w.WROC_EXPERIENCE_CATALOG.getExperience(proof.id),null);
 const bad=load();bad.WROC_EXPERIENCE_CATALOG.getExperience(proof.id).description.en+=' changed';assert.throws(()=>beforeFineDiningStageB(bad));
});
