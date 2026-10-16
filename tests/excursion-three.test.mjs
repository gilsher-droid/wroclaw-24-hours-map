import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import {createHash} from 'node:crypto';
const load=()=>{const window={};for(const f of ['data/place-catalog.js','data/lower-silesia-excursions.js'])runInNewContext(readFileSync(f,'utf8'),{window,console});return window;};
const ids=['jawor-church-of-peace','jawor-market-square','jawor-piast-castle','karpacz-centre','wang-church','jelenia-gora-market-square'];
test('Third excursion preserves the human visit order with Wang separate from Karpacz',()=>{
 const w=load(),trip=w.WROC_LOWER_SILESIA_EXCURSIONS.excursions[2];
 assert.equal(trip.id,'jawor-karpacz-jelenia-gora-day-trip');assert.deepEqual(Array.from(trip.canonicalPlaceIds),ids);
 assert.deepEqual(Array.from(trip.routePoints,p=>p.canonicalPlaceId||p.id),['wroclaw-start',...ids,'wroclaw-return']);
 for(const lang of ['he','en','pl','de','cs'])for(const field of ['title','summary'])assert.ok(trip[field][lang]);
 assert.equal(trip.travel.segments.filter(x=>x.mode==='walking').length,2);
 assert.equal(trip.travel.estimates.length,0,'No invented drive-time estimates');
 assert.match(trip.navigation.googleMaps,/travelmode=driving/);
 for(const id of ids){const p=w.WROC_CATALOG.getPlace(id);assert.equal(p.location.regionId,'lower-silesia');assert.ok(p.media.photos.length>0);}
 for(const id of ids.slice(3))assert.equal(w.WROC_CATALOG.getPlace(id).media.guideVideos,undefined,'No fabricated guide badge');
});
test('Excursion photos have unique verified source hashes and intact optimized assets',()=>{
 const w=load(),provenance=JSON.parse(readFileSync('data/excursion-three-media-provenance.json'));const photos=provenance.photos;
 assert.equal(photos.length,142);assert.equal(new Set(photos.map(x=>x.sha256)).size,photos.length);
 for(const photo of photos){assert.ok(w.WROC_CATALOG.getPlace(photo.place).media.photos.includes(photo.asset));const f=photo.asset.slice(1);assert.ok(existsSync(f));assert.equal(createHash('sha256').update(readFileSync(f)).digest('hex'),photo.outputSHA256);assert.ok(!photo.source.includes('פספוסים'));}
 assert.ok(provenance.duplicates.length>0);assert.equal(provenance.excluded.filter(x=>x.excluded).length,1);
});
