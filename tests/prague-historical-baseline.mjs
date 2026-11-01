import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const proof=JSON.parse(readFileSync(new URL('../data/prague-nov1-preservation.json',import.meta.url)));
const hash=value=>createHash('sha256').update(JSON.stringify(value)).digest('hex');
// Preserve historical receipts while accepting only the separately tested Prague update.
export function beforePragueExperience(value){
 if(value?.id!==proof.id||hash(value)===hash(proof.before))return value;
 assert.equal(hash(value),proof.approvedHash,'Unreviewed Prague experience change');
 return JSON.parse(JSON.stringify(proof.before));
}
export function beforePragueSnapshot(w){
 const r=w.WROC_EXPERIENCE_CATALOG;
 if(r)w.WROC_EXPERIENCE_CATALOG={...r,experiences:r.experiences.map(beforePragueExperience),byId:Object.fromEntries(Object.entries(r.byId).map(([id,e])=>[id,beforePragueExperience(e)])),getExperience:id=>beforePragueExperience(r.getExperience(id)),forProduct:id=>r.forProduct(id).map(beforePragueExperience)};
 if(w.WROC_HOME_EXPERIENCES)w.WROC_HOME_EXPERIENCES=w.WROC_HOME_EXPERIENCES.filter(e=>e.id!==proof.id);
 return w;
}
