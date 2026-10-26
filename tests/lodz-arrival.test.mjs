import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const load=()=>{const window={}; for(const file of ['data/place-catalog.js','data/lower-silesia-excursions.js','data/youtube-video-hosting.js']) runInNewContext(readFileSync(file,'utf8'),{window});return window;};
test('arrival itinerary keeps Warsaw origin, Wroclaw destination and a distinct local walking loop',()=>{
 const w=load(), trip=w.WROC_LOWER_SILESIA_EXCURSIONS.excursions.find(t=>t.id==='warsaw-lodz-wroclaw');
 assert.equal(trip.routePoints[0].id,'warsaw-start');assert.equal(trip.routePoints.at(-1).id,'wroclaw-arrival');assert.equal(trip.showDestinationMarker,true);assert.equal(trip.steps.find(s=>s.id==='return').canonicalPlaceId,'lodz-manufaktura');
 assert.equal(trip.canonicalPlaceIds.length,9);assert.equal(new Set(trip.canonicalPlaceIds).size,9);
 assert.deepEqual(Array.from(trip.walkingRoute.points,p=>p.canonicalPlaceId),Array.from(trip.canonicalPlaceIds));
 const drive=new URL(trip.navigation.googleMaps),walk=new URL(trip.walkingRoute.navigation.googleMaps);
 assert.equal(drive.searchParams.get('travelmode'),'driving');assert.equal(drive.searchParams.get('origin'),'Warsaw, Poland');assert.equal(drive.searchParams.get('destination'),'Wrocław, Poland');
 assert.equal(walk.searchParams.get('travelmode'),'walking');assert.equal(walk.searchParams.get('origin'),walk.searchParams.get('destination'));
 assert.ok(trip.canonicalPlaceIds.includes('lodz-ghetto-baluty'));assert.ok(trip.canonicalPlaceIds.includes('lodz-church-square'));
 for(const id of trip.canonicalPlaceIds){const p=w.WROC_CATALOG.getPlace(id);assert.equal(p.location.cityId,'lodz');assert.ok(p.location.coordinates.lat>51.76&&p.location.coordinates.lat<51.80);assert.ok(p.location.coordinates.lng>19.43&&p.location.coordinates.lng<19.47);assert.equal(p.links.socialProfileFallback,false);for(const lang of ['he','en','pl','de','cs']){assert.ok(p.name[lang]);assert.ok(p.description[lang]);assert.ok(trip.title[lang]);assert.ok(trip.startsLabel[lang]);}}
});
test('Lodz media uses reviewed unique originals, no family portraits or local video payload',()=>{
 const w=load(),proof=JSON.parse(readFileSync('data/lodz-arrival-media-provenance.json'));assert.equal(proof.photos.length,16);
 assert.equal(new Set(proof.photos.map(x=>x.sourceSHA256)).size,16);
 for(const p of proof.photos){assert.ok(existsSync('.'+p.asset));assert.match(p.review,/no posed family/i);}
 const p=w.WROC_CATALOG.getPlace('lodz-manufaktura'),key=p.media.videos[0],video=w.WROC_YOUTUBE_VIDEO_HOSTING[key];assert.equal(video.status,'public');assert.equal(video.youtube,'https://youtube.com/shorts/NUoexW1XB4E');assert.ok(!existsSync('.'+key));
 assert.equal(w.WROC_CATALOG.getPlace('lodz-ghetto-baluty').media.photos.length,2);
});
