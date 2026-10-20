import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
const load=()=>{const window={};for(const f of ['data/place-catalog.js','data/lower-silesia-excursions.js'])runInNewContext(readFileSync(f,'utf8'),{window});return window;};
test('sixth excursion preserves mountain stop first and separates city from fortress without duplicate pins',()=>{
 const w=load(),trip=w.WROC_LOWER_SILESIA_EXCURSIONS.excursions.find(x=>x.id==='srebrna-gora-klodzko-day-trip');
 assert.equal(w.WROC_LOWER_SILESIA_EXCURSIONS.excursions.length,6);
 assert.equal(trip.routePoints[0].id,'wroclaw-start');assert.equal(trip.routePoints.at(-1).id,'wroclaw-return');
 assert.deepEqual(Array.from(trip.routePoints.filter(p=>p.canonicalPlaceId),p=>p.canonicalPlaceId),['srebrna-gora-fortress','klodzko-fortress','klodzko-old-town']);
 assert.equal(new Set(trip.canonicalPlaceIds).size,3);
 for(const id of trip.canonicalPlaceIds){const p=w.WROC_CATALOG.getPlace(id);assert.equal(p.location.regionId,'lower-silesia');assert.equal(p.links.socialProfileFallback,false);for(const lang of ['he','en','pl','de','cs']){assert.ok(p.description[lang]);assert.ok(trip.title[lang]);assert.ok(trip.editorial.practical[lang]);assert.ok(trip.regionalInspiration.title[lang]);}}
 const nav=new URL(trip.navigation.googleMaps);assert.equal(nav.searchParams.get('origin'),nav.searchParams.get('destination'));assert.equal(nav.searchParams.get('travelmode'),'driving');assert.match(nav.searchParams.get('waypoints'),/^50.572949,16.6479108/);
 assert.ok(!trip.canonicalPlaceIds.includes('regional-reference'),'regional poster is not another canonical stop');
});
test('reviewed media excludes portraits and keeps guide city/fortress assignment by subject',()=>{
 const p=JSON.parse(readFileSync('data/srebrna-klodzko-media-provenance.json'));
 assert.equal(p.photos.length,38);assert.equal(new Set(p.photos.map(x=>x.sourceSHA256)).size,p.photos.length);
 for(const r of p.photos){assert.ok(existsSync('.'+r.asset));assert.match(r.review,/no posed family portrait/);assert.ok(!r.asset.match(/\.(mp4|mov|webm)$/i));}
 assert.match(p.guideAssignments['klodzko-old-town'],/City guide/);assert.match(p.guideAssignments['klodzko-fortress'],/Fortress guide/);
 assert.ok(existsSync('.'+p.regionalReference.asset));
});
