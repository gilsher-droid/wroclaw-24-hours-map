import {beforeNov20Snapshot} from './opera-jatki-zoo-historical-baseline.mjs';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const proof=JSON.parse(readFileSync('data/history-trail-preservation.json'));
const hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
// Older receipts exclude only this independently checked new experience.
export function beforeHistoryTrail(w){beforeNov20Snapshot(w);
 const r=w.WROC_EXPERIENCE_CATALOG;
 const keep=e=>{if(e?.id!==proof.id)return true;assert.equal(hash(e),proof.experienceHash,'Unreviewed History Trail');return false;};
 if(r){const experiences=r.experiences.filter(keep);w.WROC_EXPERIENCE_CATALOG={...r,experiences,byId:Object.fromEntries(experiences.map(e=>[e.id,e])),getExperience:id=>{const e=r.getExperience(id);return keep(e)?e:null;},forProduct:id=>r.forProduct(id).filter(keep)};}
 if(w.WROC_HOME_EXPERIENCES)w.WROC_HOME_EXPERIENCES=w.WROC_HOME_EXPERIENCES.filter(e=>{if(e.id!==proof.id)return true;assert.equal(hash(e),proof.homeHash,'Unreviewed History Trail home entry');return false;});
 return w;
}
