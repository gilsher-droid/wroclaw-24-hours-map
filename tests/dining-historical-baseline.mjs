import {readFileSync} from 'node:fs';import {createHash} from 'node:crypto';import assert from 'node:assert/strict';
const proof=JSON.parse(readFileSync('data/dining-development-preservation.json','utf8')),hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
// Only the exact additive dining fields and exact two new experience definitions are projected.
// Current behaviour and all 323 untouched record bodies are checked independently without projection.
const restoredRecords=new WeakMap();
export function withoutDining(p){if(!p||!Object.hasOwn(p,'dining'))return p;assert.equal(hash(p.dining),proof.diningHashes[p.id],'Unreviewed dining data '+p.id);const cached=restoredRecords.get(p);if(cached&&Object.keys(cached).length===Object.keys(p).length-1&&Object.entries(p).every(([k,v])=>k==='dining'||cached[k]===v))return cached;const restored={...p};delete restored.dining;restoredRecords.set(p,restored);return restored;}
export function beforeDiningSnapshot(w){
 for(const key of ['WROC_LIFESTYLE_PLACES','WROC_CULTURAL_PLACES','PREMIUM_STOPS','PREMIUM_RECOMMENDATIONS','LOCATIONS','EVENING_LOCATIONS'])if(Array.isArray(w[key]))w[key]=w[key].map(row=>Object.hasOwn(row,'canonicalPlace')?{...row,canonicalPlace:withoutDining(row.canonicalPlace)}:row);
 const c=w.WROC_CATALOG;if(c){w.WROC_CATALOG={...c,places:Object.fromEntries(Object.entries(c.places).map(([id,p])=>[id,withoutDining(p)])),getPlace:id=>withoutDining(c.getPlace(id))};}
 const r=w.WROC_EXPERIENCE_CATALOG;if(r){const keep=e=>{if(!Object.hasOwn(proof.newExperienceHashes,e.id))return true;assert.equal(hash(e),proof.newExperienceHashes[e.id],'Unreviewed dining experience');return false;};for(const e of Object.values(r.byId))keep(e);const experiences=r.experiences.filter(keep);w.WROC_EXPERIENCE_CATALOG={...r,experiences,byId:Object.fromEntries(experiences.map(e=>[e.id,e])),getExperience:id=>{const e=r.getExperience(id);return e&&keep(e)?e:null;},forProduct:id=>r.forProduct(id).filter(keep)};}
 if(w.WROC_HOME_EXPERIENCES)w.WROC_HOME_EXPERIENCES=w.WROC_HOME_EXPERIENCES.filter(e=>{if(!Object.hasOwn(proof.newHomeHashes,e.id))return true;assert.equal(hash(e),proof.newHomeHashes[e.id],'Unreviewed dining home entry');return false;});return w;
}
