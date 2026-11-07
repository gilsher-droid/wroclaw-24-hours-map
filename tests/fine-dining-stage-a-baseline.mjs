import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const proof=JSON.parse(readFileSync('data/fine-dining-stage-a-preservation.json','utf8'));
const hash=p=>createHash('sha256').update(JSON.stringify(p)).digest('hex');
export function beforeFineDiningRecord(p){
 if(!p)return p;
 if(proof.added[p.id]){assert.equal(hash(p),proof.added[p.id],'Unreviewed fine dining addition '+p.id);return null;}
 const r=proof.changed[p.id];if(!r)return p;
 if(p.provenance?.provenanceFile!=='/data/fine-dining-nov7-provenance.json'&&!p.media?.photos?.some(x=>x.startsWith('/assets/fine-dining-nov7/')))return p;
 if(hash(p)===hash(r.before))return p;
 assert.equal(hash(p),r.afterHash,'Unreviewed fine dining enrichment '+p.id);return JSON.parse(JSON.stringify(r.before));
}
export function beforeFineDiningStageA(w){
 const c=w.WROC_CATALOG;if(c){const places=Object.fromEntries(Object.entries(c.places).map(([id,p])=>[id,beforeFineDiningRecord(p)]).filter(([,p])=>p));w.WROC_CATALOG={...c,places,getPlace:id=>beforeFineDiningRecord(c.getPlace(id))};}
 for(const key of ['WROC_LIFESTYLE_PLACES','WROC_CULTURAL_PLACES','PREMIUM_STOPS','PREMIUM_RECOMMENDATIONS','LOCATIONS','EVENING_LOCATIONS'])if(Array.isArray(w[key]))w[key]=w[key].map(p=>p.canonicalPlace?{...p,canonicalPlace:beforeFineDiningRecord(p.canonicalPlace)}:p);
 const r=w.WROC_EXPERIENCE_CATALOG;if(r){const restore=e=>{const item=proof.experiences[e?.id];if(!item||hash(e)===hash(item.before))return e;assert.equal(hash(e),item.afterHash,'Unreviewed fine dining experience membership');return JSON.parse(JSON.stringify(item.before));};const experiences=r.experiences.map(restore),byId=Object.fromEntries(experiences.map(e=>[e.id,e]));w.WROC_EXPERIENCE_CATALOG={...r,experiences,byId,getExperience:id=>{const e=r.getExperience(id);restore(e);return proof.experiences[e?.id]?byId[e.id]:e;},forProduct:id=>r.forProduct(id).map(e=>{restore(e);return proof.experiences[e?.id]?byId[e.id]:e;})};}
 return w;
}
