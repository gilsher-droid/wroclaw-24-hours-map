import{beforeSlodowaBridge}from'./slodowa-footbridge-baseline.mjs';
import{readFileSync}from'node:fs';import{createHash}from'node:crypto';import assert from'node:assert/strict';
const proof=JSON.parse(readFileSync('data/northern-city-walks-preservation.json')),hash=p=>createHash('sha256').update(JSON.stringify(p)).digest('hex');
export function beforeNorthernCityWalks(w){beforeSlodowaBridge(w);const c=w.WROC_CATALOG;if(!c)return w;for(const[id,h]of Object.entries(proof.added))if(c.places[id])assert.equal(hash(c.places[id]),h,'Unreviewed city-walk place '+id);w.WROC_CATALOG={...c,places:Object.fromEntries(Object.entries(c.places).filter(([id])=>!Object.hasOwn(proof.added,id))),getPlace:id=>{const p=c.getPlace(id);return p&&Object.hasOwn(proof.added,p.id)?null:p;}};return w;}

export const northernCityIds=Object.keys(proof.added);
export function assertNorthernCityAdditions(places){for(const[id,h]of Object.entries(proof.added))if(places[id])assert.equal(hash(places[id]),h,'Unreviewed city-walk place '+id);}
