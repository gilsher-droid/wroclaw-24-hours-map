import {historicalPlaceIds} from './historical-catalog-scope.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { runInNewContext } from 'node:vm';
const proof=JSON.parse(readFileSync('data/roa-mural-oct26-preservation.json'));
const window={};
for(const f of ['data/place-catalog.js','data/lower-silesia-excursions.js'])runInNewContext(readFileSync(f,'utf8'),{window});
const plain=v=>JSON.parse(JSON.stringify(v));
const hash=v=>createHash('sha256').update(v).digest('hex');

test('ROA is one new canonical and one original; all231 existing records stay byte-equivalent',()=>{
 const all=window.WROC_CATALOG.places;
 assert.equal(Object.keys(proof.existingRecordHashes).length,231);
 assert.equal(historicalPlaceIds(all).length,233);
 for(const[id,expected]of Object.entries(proof.existingRecordHashes))assert.equal(hash(JSON.stringify(all[id])),expected,id);
 const p=all[proof.canonicalId];assert.ok(p);assert.equal(p.media.photos.length,1);assert.equal(p.media.videos.length,0);
 assert.deepEqual(plain(p.location.coordinates),{lat:51.7780469,lng:19.4546196});
 const asset=p.media.photos[0],meta=p.media.metadata[asset];assert.equal(hash(readFileSync('.'+asset)),meta.sourceSHA256);
 assert.equal(meta.originalFullPicturePreserved,true);assert.equal(meta.familyExceptionApplied,false);
 assert.equal(meta.sameCaptureReencodeSources.length,1);
 assert.equal(new URL(p.links.navigation.googleMaps).searchParams.get('query'),'51.7780469,19.4546196');
 assert.deepEqual(plain(p.socialPosts),[]);assert.equal(p.links.socialProfileFallback,false);
 for(const lang of ['he','en','pl','de','cs']){assert.ok(p.name[lang]);assert.ok(p.description[lang]);assert.ok(meta.alt[lang]);}
});

test('Optional ROA stop preserves all previous trip objects, times and other excursions',()=>{
 const trips=plain(window.WROC_LOWER_SILESIA_EXCURSIONS.excursions),trip=trips.find(x=>x.id===proof.beforeTrip.id),before=proof.beforeTrip,id=proof.canonicalId;
 assert.deepEqual(trips.filter(x=>x.id!==trip.id&&x.id!=='poznan-wroclaw-stopover'&&x.id!=='slovakia-bielsko-opole-wroclaw'),proof.otherTrips);
 assert.equal(trip.canonicalPlaceIds.filter(x=>x===id).length,1);
 assert.deepEqual(trip.canonicalPlaceIds.filter(x=>x!==id),before.canonicalPlaceIds);
 assert.deepEqual(trip.routePoints.filter(x=>x.canonicalPlaceId!==id),before.routePoints);
 assert.deepEqual(trip.steps.filter(x=>x.canonicalPlaceId!==id),before.steps);
 const modified=new Set(['canonicalPlaceIds','routePoints','steps','walkingRoute']);
 for(const k of Object.keys(before))if(!modified.has(k))assert.deepEqual(trip[k],before[k],k);
 assert.equal(trip.walkingRoute.geometryAccuracy,'stop-order-only');
 assert.deepEqual(trip.walkingRoute.points.filter(x=>x.canonicalPlaceId!==id).map(({id,...x})=>x),before.walkingRoute.points.map(({id,...x})=>x));
 assert.deepEqual(trip.walkingRoute.points.map(x=>x.id),trip.walkingRoute.points.map((_,i)=>String(i+1)));
});
