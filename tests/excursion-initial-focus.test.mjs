import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
test('Łódź opens on its local stops while keeping the complete journey and overview',()=>{
 const window={};for(const file of ['data/place-catalog.js','data/lower-silesia-excursions.js'])runInNewContext(readFileSync(file,'utf8'),{window});
 const source=readFileSync('excursions.js','utf8');
 const fn=source.slice(source.indexOf('  function renderMap(excursion) {'),source.indexOf('  function extensionActions'));
 for(const excursion of window.WROC_LOWER_SILESIA_EXCURSIONS.excursions){
  let fitted,polyline;
  const fakeMap={remove(){},fitBounds(points){fitted=points;}};
  const L={map(){return fakeMap;},tileLayer(){return {addTo(){}};},polyline(points){polyline=points;return {addTo(){}};},divIcon(){},marker(){return {addTo(){return this;},bindPopup(){return this;},on(){return this;}};}};
  const place=id=>window.WROC_CATALOG.getPlace(id);
  const coords=point=>{const p=point.canonicalPlaceId?place(point.canonicalPlaceId):null;return p?.location?.coordinates||point.coordinates;};
  const context={window:{L,WROC_GUIDE_VIDEO:{legend(){},decorateIcon(){}}},L,map:null,mapStops:new Map(),coords,place,local:v=>v?.en||v,language:'en',placeAmenities:{markerBadgeHtml(){return '';}},placePopup(){return '';},registerMapStop(){},trackPlaceOpen(){}};
  runInNewContext(fn+'\nthis.run=renderMap;',context);context.run(excursion);
  assert.equal(polyline.length,excursion.routePoints.map(coords).filter(Boolean).length);
  if(excursion.id==='warsaw-lodz-wroclaw'){
   assert.equal(fitted.length,8);assert.ok(fitted.every(([lat,lng])=>lat>51.7&&lat<51.85&&lng>19.3&&lng<19.6));assert.ok(polyline.length>fitted.length);
  }else assert.equal(fitted.length,polyline.length);
 }
 assert.ok(source.includes('points = walking ? excursion.walkingRoute?.points : excursion.routePoints'),'full-route overview retains departure and destination');
});
