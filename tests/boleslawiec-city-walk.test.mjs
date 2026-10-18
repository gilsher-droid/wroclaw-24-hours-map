import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
function load(){const window={};for(const f of ['data/place-catalog.js','data/lower-silesia-excursions.js'])runInNewContext(readFileSync(f,'utf8'),{window,console});return window;}
test('Boleslawiec walking loop follows numbered photographed stops and preserves the two-day excursion',()=>{
 const w=load(),route=w.WROC_LOWER_SILESIA_EXCURSIONS.excursions[3],walk=route.walkingRoute;
 assert.equal(walk.city,'boleslawiec');assert.equal(walk.points.length,9);assert.equal(walk.closedLoop,true);
 assert.deepEqual(Array.from(walk.points,p=>p.id),['1','2','3','4','5','6','7','8','9']);
 assert.deepEqual(Array.from(walk.points,p=>Array.from(p.boardNumbers)),[[1,2,37],[6,7],[11],[16],[22],[24],[26],[28,29],[33]]);
 assert.deepEqual(Array.from(route.canonicalPlaceIds),['czocha-castle','lesnianska-dam','boleslawiec-old-town','boleslawiec-ceramics-museum']);
 assert.equal(route.routePoints.length,6);assert.equal(new Set(route.routePoints.filter(p=>p.canonicalPlaceId).map(p=>p.canonicalPlaceId)).size,4);
 assert.equal(walk.points[0].canonicalPlaceId,'boleslawiec-old-town');assert.equal(walk.extension.canonicalPlaceId,'boleslawiec-ceramics-museum');
 assert.equal(walk.points.filter(p=>p.canonicalPlaceId==='boleslawiec-old-town').length,1);
 assert.equal(walk.points.filter(p=>p.canonicalPlaceId==='boleslawiec-ceramics-museum').length,0,'Current museum remains an optional extension outside the old-town loop');
 assert.equal(walk.geometryAccuracy,'stop-order-only');
 for(const lang of ['he','en','pl','de','cs']){
  for(const item of [walk.title,walk.summary,walk.note,walk.extension.description,...walk.points.flatMap(p=>[p.label,p.description])]) assert.ok(item[lang]?.trim());
  assert.ok(walk.points.every(p=>!/[\u2014]|\p{Extended_Pictographic}/u.test(p.description[lang])));
 }
 for(const p of walk.points){if(!p.canonicalPlaceId){assert.match(p.coordinateSource,/^https:\/\/www.openstreetmap.org\/(node|way)\//);assert.ok(p.coordinates.lat>51.26&&p.coordinates.lat<51.27);assert.ok(p.coordinates.lng>15.56&&p.coordinates.lng<15.57);}}
 const coordinate=p=>p.coordinates||w.WROC_CATALOG.getPlace(p.canonicalPlaceId).location.coordinates;
 for(let i=0;i<walk.points.length;i++){
  const p=walk.points[i],next=coordinate(walk.points[(i+1)%walk.points.length]);const url=new URL(p.nextNavigation);
  assert.equal(url.searchParams.get('travelmode'),'walking');assert.equal(url.searchParams.get('destination'),`${next.lat},${next.lng}`);
 }
 assert.equal(walk.navigation.segments.length,3);
 for(const segment of walk.navigation.segments){const url=new URL(segment.url);assert.equal(url.searchParams.get('travelmode'),'walking');assert.ok(url.searchParams.get('waypoints').split('|').length<=3,'Keep navigation segments usable on mobile');}
 const photos=w.WROC_CATALOG.getPlace('boleslawiec-old-town').media.photos;
 for(const photo of walk.sourcePhotos){assert.ok(photos.includes(photo));assert.ok(existsSync(photo.slice(1)));}
 assert.equal(new Set(walk.sourcePhotos).size,walk.sourcePhotos.length);
 assert.deepEqual(Array.from(w.WROC_LOWER_SILESIA_EXCURSIONS.excursions[1].walkingRoute.points,p=>p.id),[...'ABCDEFGHIJ'],'Brzeg route remains available');
 assert.ok(!w.WROC_LOWER_SILESIA_EXCURSIONS.excursions[0].walkingRoute);assert.ok(!w.WROC_LOWER_SILESIA_EXCURSIONS.excursions[2].walkingRoute);
});
