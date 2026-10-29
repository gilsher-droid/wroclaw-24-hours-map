import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const p=JSON.parse(readFileSync('data/bridges-north-approved-additions.json'));
const hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
const additions=new Set(p.newIds);
export const bridgesNorthAdditionIds=p.newIds;
export function assertReviewedBridgesNorth(places){for(const id of p.newIds)if(places[id])assert.equal(hash(places[id]),p.approvedRecordHashes[id],'Unreviewed northern place: '+id);}
// Project only this independently checked addition out of older receipts.
// Existing records, unexpected IDs and existing getter results pass through.
export function beforeBridgesNorthSnapshot(w){
 const c=w.WROC_CATALOG;
 if(c){assertReviewedBridgesNorth(c.places);w.WROC_CATALOG={...c,places:Object.fromEntries(Object.entries(c.places).filter(([id])=>!additions.has(id))),products:Object.fromEntries(Object.entries(c.products).map(([id,product])=>[id,id==='lower-silesia-excursions'?{...product,places:product.places.filter(x=>!additions.has(x.placeId))}:product])),getPlace:id=>{const value=c.getPlace(id);if(value&&additions.has(c.resolveId(id))){assert.equal(hash(value),p.approvedRecordHashes[c.resolveId(id)]);return null;}return value;}};}
 const r=w.WROC_EXPERIENCE_CATALOG;
 if(r?.getExperience(p.experienceId)){assert.equal(hash(r.getExperience(p.experienceId)),p.approvedExperienceHash);for(const x of [r.byId[p.experienceId],...r.experiences.filter(x=>x.id===p.experienceId)])assert.equal(hash(x),p.approvedExperienceHash);w.WROC_EXPERIENCE_CATALOG={...r,experiences:r.experiences.filter(x=>x.id!==p.experienceId),byId:Object.fromEntries(Object.entries(r.byId).filter(([id])=>id!==p.experienceId)),getExperience:id=>id===p.experienceId?null:r.getExperience(id),forProduct:id=>r.forProduct(id).filter(x=>x.id!==p.experienceId)};}
 const trip=w.WROC_LOWER_SILESIA_EXCURSIONS;
 if(trip?.excursions.some(x=>x.id===p.tripId)){const added=trip.excursions.find(x=>x.id===p.tripId);assert.equal(hash(added),p.approvedTripHash,'Unreviewed northern trip');assert.equal(hash(trip.status),p.approvedProductStatusHash,'Unreviewed excursion status');w.WROC_LOWER_SILESIA_EXCURSIONS={...trip,status:p.beforeProductStatus,excursions:trip.excursions.filter(x=>x.id!==p.tripId),canonicalPlaceIds:trip.canonicalPlaceIds.filter(id=>!additions.has(id))};}
 if(w.WROC_HOME_EXPERIENCES)w.WROC_HOME_EXPERIENCES=w.WROC_HOME_EXPERIENCES.filter(x=>x.id!==p.experienceId);
 return w;
}
