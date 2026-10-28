import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const source=readFileSync('excursions.js','utf8');
test('An explicit optional category fits its places with the route; card focus reveals the group without a second fit',()=>{
 const added=[],fits=[];let clears=0,closed=0;
 const buttons=['route','stay'].map(group=>({dataset:{mapChoice:group},setAttribute(k,v){this[k]=v;}}));
 const context={optionalLayer:{clearLayers(){clears++;},addLayer(m){added.push(m);}},optionalMarkers:[{group:'stay',marker:'hotel',coordinate:{lat:52.5,lng:16.8}},{group:'culture',marker:'museum',coordinate:{lat:52.4,lng:16.9}}],document:{querySelectorAll(){return buttons;}},selectedExcursion:()=>({routePoints:[{lat:52.4,lng:16.93}]}),coords:p=>p,map:{closePopup(){closed++;},fitBounds(p,o){fits.push({p,o});}}};
 const fn=source.slice(source.indexOf('  function selectOptionalGroup('),source.indexOf('  let previewIndex'));
 vm.runInNewContext(fn+'\nthis.select=selectOptionalGroup;',context);
 context.select('stay',true);
 assert.deepEqual(added,['hotel']);assert.equal(fits.length,1);assert.equal(fits[0].p.length,2);assert.equal(fits[0].o.animate,false);assert.equal(closed,1);assert.equal(buttons[1]['aria-pressed'],'true');
 context.select('culture');assert.equal(fits.length,1);assert.equal(clears,2);assert.equal(added.at(-1),'museum');
 const render=source.slice(source.indexOf('  function renderMap('),source.indexOf('  function extensionActions'));
 assert.match(render,/if \(isPoznan\) optionalMarkers\.push/);
 assert.match(render,/if \(!isPoznan\) optionalLayer\.addLayer\(marker\)/);
 assert.match(render,/html: `<span>\+\$\{index\+1\}<\/span>`/);
});
test('Nearby stops remain individually selectable at their real coordinates, with separate labels and leaders',()=>{
 let scale=1;const drawn=[],events={},leaders=[];
 const original=[{key:'a',number:1,label:'Market',coordinate:{lat:1,lng:1}},{key:'b',number:2,label:'Town hall',coordinate:{lat:1.1,lng:1.1}},{key:'c',number:3,label:'Fara',coordinate:{lat:5,lng:5}}];
 original.forEach(s=>{s.marker={coordinate:[s.coordinate.lat,s.coordinate.lng],options:{icon:{options:{...(s.number===2 ? {iconSize:[30,30]} : {iconAnchor:[21,48],iconSize:[42,50]}),html:`<span>${s.number}</span>`}}},setIcon(icon){this.options.icon=icon;}};});
 const baseIcons=original.map(s=>s.marker.options.icon),before=JSON.stringify(original.map(s=>s.coordinate));
 const targetMap={removeLayer(){},latLngToLayerPoint([lat,lng]){return {x:lat*100*scale,y:lng*100*scale};},layerPointToLatLng(p){return {lat:p[0]/(100*scale),lng:p[1]/(100*scale)};},on(k,f){events[k]=f;}};
 const L={layerGroup(){return {addTo(){return this;},clearLayers(){drawn.length=0;},addLayer(m){drawn.push(m);}};},divIcon:options=>({options}),polyline(points){leaders.push(points);return {addTo(){return this;}};},circleMarker(){return {addTo(){return this;}};}};
 const context={L,recommendedGroups:new WeakMap()};
 const fn=source.slice(source.indexOf('  function installRecommendedGroups('),source.indexOf('  let previewIndex'));
 vm.runInNewContext(fn+'\nthis.install=installRecommendedGroups;',context);context.install(targetMap,original);
 assert.deepEqual(drawn,original.map(s=>s.marker));
 assert.equal(leaders.length,2);
 for(let i=0;i<2;i++){
  assert.equal(JSON.stringify(leaders[i][0]),JSON.stringify(original[i].marker.coordinate));
  assert.notDeepEqual(original[i].marker.options.icon.options.iconAnchor,baseIcons[i].options.iconAnchor);
  assert.equal(original[i].marker.options.icon.options.html,`<span>${i+1}</span>`);
 }
 assert.equal(JSON.stringify(original.map(s=>s.coordinate)),before);
 scale=20;events.zoomend();
 original.forEach((s,i)=>assert.equal(JSON.stringify(s.marker.options.icon.options.iconAnchor),JSON.stringify(baseIcons[i].options.iconAnchor)));
 assert.deepEqual(drawn,original.map(s=>s.marker));
});
