import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {runInNewContext} from 'node:vm';
const load=()=>{const window={};for(const file of ['data/place-catalog.js','data/lower-silesia-excursions.js'])runInNewContext(readFileSync(file,'utf8'),{window,console});return window;};
test('Fourth excursion preserves castle overnight and breakfast before the morning dam walk',()=>{
 const w=load(),trip=w.WROC_LOWER_SILESIA_EXCURSIONS.excursions[3];
 assert.equal(trip.id,'czocha-boleslawiec-two-day-trip');assert.equal(trip.meta.days,2);assert.equal(trip.meta.nights,1);
 assert.deepEqual(Array.from(trip.canonicalPlaceIds),['czocha-castle','lesnianska-dam','boleslawiec-old-town','boleslawiec-ceramics-museum']);
 const ids=Array.from(trip.routePoints.filter(p=>p.canonicalPlaceId),p=>p.canonicalPlaceId);assert.equal(new Set(ids).size,ids.length,'Overnight and breakfast reuse the castle pin');
 assert.deepEqual(Array.from(trip.steps.filter(s=>s.day===2),s=>s.id),['breakfast','dam','return-car','town','museum','home']);
 assert.equal(trip.steps.find(s=>s.id==='overnight').day,1);assert.match(trip.navigation.morningWalk,/travelmode=walking/);
 assert.ok(!trip.navigation.googleMaps.includes('Zapora'),'The dam belongs to the separate morning walking navigation, not the car route');assert.equal(trip.travel.estimates.length,0);for(const lang of ['he','en','pl','de','cs']){assert.ok(trip.title[lang]);assert.ok(trip.days.every(d=>d.title[lang]));}
 for(const id of ids){const p=w.WROC_CATALOG.getPlace(id);assert.ok(p);assert.equal(p.location.regionId,'lower-silesia');assert.ok(!p.media.guideVideos,'Our guides are deferred to stage two');}
});
test('New route photos are traceable, unique, unmodified optimized assets with family material held',()=>{
 const w=load(),proof=JSON.parse(readFileSync('data/czocha-boleslawiec-media-provenance.json','utf8'));
 assert.equal(proof.familyPhotosAllowed,false);assert.ok(proof.held.length>0);assert.ok(proof.photos.length>0);assert.equal(proof.photos.length,['czocha-castle','lesnianska-dam','boleslawiec-old-town','boleslawiec-ceramics-museum'].reduce((n,id)=>n+w.WROC_CATALOG.getPlace(id).media.photos.length,0));
 assert.equal(new Set(proof.photos.map(p=>p.sourceSHA256)).size,proof.photos.length);
 const held=new Set(proof.held.map(p=>p.sha256));
 for(const photo of proof.photos){assert.equal(held.has(photo.sourceSHA256),false);assert.ok(w.WROC_CATALOG.getPlace(photo.placeId).media.photos.includes(photo.asset));assert.equal(createHash('sha256').update(readFileSync(photo.asset.slice(1))).digest('hex'),photo.assetSHA256);}
 for(const category of ['breakfast','apple-cake'])assert.ok(proof.photos.some(p=>p.placeId==='czocha-castle'&&p.category===category));
});
test('All sixteen visit clips use verified Public YouTube hosting and no guide is added in stage one',()=>{
 const w=load(),proof=JSON.parse(readFileSync('data/czocha-boleslawiec-visit-provenance.json','utf8')),registry=JSON.parse(readFileSync('data/youtube-media-migration.json','utf8'));
 assert.equal(proof.visits.length,16);assert.equal(new Set(proof.visits.map(v=>v.youtube)).size,16);assert.equal(proof.guidesDeferred,true);
 for(const v of proof.visits){assert.equal(v.visibility,'Public');assert.equal(registry[v.registryKey].status,'public');assert.equal(registry[v.registryKey].youtube,v.youtube);assert.equal(w.WROC_CATALOG.getPlace(v.place).media.videos.includes(v.youtube),v.websiteIncluded!==false);assert.match(v.youtube,/^https:\/\/(youtube\.com\/(?:shorts\/|watch\?v=)|youtu\.be\/)/);}
});

test('Boleslawiec galleries retain distinct views instead of repeated camera bursts',()=>{
 const w=load(),curation=JSON.parse(readFileSync('data/boleslawiec-photo-curation.json','utf8'));
 assert.equal(curation.originalsPreserved,true);assert.equal(curation.excluded.length,56);
 for(const [id,count] of Object.entries(curation.after))assert.equal(w.WROC_CATALOG.getPlace(id).media.photos.length,count);
 for(const group of curation.groups){const place=w.WROC_CATALOG.getPlace(group.placeId);assert.ok(group.retained.length);for(const asset of group.retained)assert.ok(place.media.photos.includes(asset));for(const asset of group.excluded){assert.equal(place.media.photos.includes(asset),false);assert.equal(existsSync(asset.slice(1)),false);}}
 assert.equal(w.WROC_CATALOG.getPlace('boleslawiec-old-town').media.videos.length,4);assert.equal(w.WROC_CATALOG.getPlace('boleslawiec-ceramics-museum').media.videos.length,1);
});

test('Repeated Boleslawiec visit clips remain preserved on YouTube but outside the curated gallery',()=>{
 const w=load(),c=JSON.parse(readFileSync('data/boleslawiec-video-curation.json','utf8')),gallery=w.WROC_CATALOG.getPlace(c.placeId).media.videos;
 assert.equal(c.youTubePublicUploadsPreserved,true);assert.equal(c.originalsPreserved,true);assert.equal(c.excluded.length,8);assert.equal(gallery.length,4);
 for(const r of c.retained)assert.ok(gallery.includes(r.youtube));for(const r of c.excluded)assert.equal(gallery.includes(r.youtube),false);
});
