import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const source=readFileSync('app.js','utf8');
test('The24h overview fits every displayed daytime stop including the optional botanical garden with space for controls',()=>{
 const window={};for(const f of ['data/place-catalog.js','data/locations.js'])runInNewContext(readFileSync(f,'utf8'),{window,console});
 const coordinates=window.LOCATIONS.map(p=>p.coordinates),garden=window.LOCATIONS.find(p=>(p.canonicalPlaceId||p.id)==='wroclaw-botanical-garden');assert.ok(garden.optional);assert.equal(window.LOCATIONS.length,15);
 let fitted;const lineBounds={kind:'line'},map={fitBounds:(b,o)=>{fitted={b,o}}},L={latLngBounds:points=>({points,extend(extra){this.extra=extra;return this;}})};
 const fn=source.slice(source.indexOf('  function fitRoute()'),source.indexOf('  function fitFilteredMarkers('));runInNewContext(fn+'fitRoute();',{window,map,L,routeLine:{getBounds:()=>lineBounds},routeOverviewActive:false});
 assert.deepEqual(Array.from(fitted.b.points,p=>Array.from(p)),Array.from(coordinates,p=>Array.from(p)));assert.ok(fitted.b.points.includes(garden.coordinates));assert.equal(fitted.b.extra,lineBounds);assert.equal(fitted.o.animate,false);assert.ok(fitted.o.paddingTopLeft[0]>=40&&fitted.o.paddingBottomRight[1]>=80);
});
test('Only the requested optional garden extends the existing schematic itinerary after the cathedral',()=>{
 const window={};for(const f of ['data/place-catalog.js','data/locations.js'])runInNewContext(readFileSync(f,'utf8'),{window,console});const expr=source.match(/const routeCoordinates = ([^;]+);/)[1],old=window.LOCATIONS.filter(p=>!p.optional).map(p=>p.coordinates),now=runInNewContext(expr,{window});assert.deepEqual(Array.from(now.slice(0,-1),p=>Array.from(p)),Array.from(old,p=>Array.from(p)));const last=window.LOCATIONS.at(-1);assert.equal(last.canonicalPlaceId||last.id,'wroclaw-botanical-garden');assert.deepEqual(Array.from(now.at(-1)),Array.from(last.coordinates));
 assert.match(source,/map\.on\("resize",[\s\S]*?routeOverviewActive && activeCategory === "all"/);assert.match(source,/map\.on\("dragstart", \(\) => \{ routeOverviewActive = false;/);assert.match(source,/function showLocation[\s\S]*?routeOverviewActive = false/);
});
