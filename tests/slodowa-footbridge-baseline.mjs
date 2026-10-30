import{beforeSlodowaPosition}from'./slodowa-position-baseline.mjs';
import{readFileSync}from'node:fs';import{createHash}from'node:crypto';import assert from'node:assert/strict';
const proof=JSON.parse(readFileSync('data/slodowa-footbridge-preservation.json')),hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
export const slodowaBridgeId=proof.id;
export function assertSlodowaBridge(places){if(places[proof.id])assert.equal(hash(places[proof.id]),proof.approvedRecordHash,'Unreviewed Slodowa bridge');}
// Project only the exact, independently checked bridge addition out of older receipts.
export function beforeSlodowaBridge(w){beforeSlodowaPosition(w);
 const c=w.WROC_CATALOG;if(c){assertSlodowaBridge(c.places);w.WROC_CATALOG={...c,places:Object.fromEntries(Object.entries(c.places).filter(([id])=>id!==proof.id)),getPlace:id=>{const p=c.getPlace(id);return p?.id===proof.id?null:p;}};}
 const r=w.WROC_EXPERIENCE_CATALOG;if(r){const project=e=>{if(e?.id!==proof.experienceId)return e;const h=hash(e);if(h===hash(proof.beforeExperience))return e;assert.equal(h,proof.approvedExperienceHash,'Unreviewed bridges experience');return JSON.parse(JSON.stringify(proof.beforeExperience));};w.WROC_EXPERIENCE_CATALOG={...r,experiences:r.experiences.map(project),byId:Object.fromEntries(Object.entries(r.byId).map(([id,e])=>[id,project(e)])),getExperience:id=>project(r.getExperience(id)),forProduct:id=>r.forProduct(id).map(project)};}
 return w;
}
