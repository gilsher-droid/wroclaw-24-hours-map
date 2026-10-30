import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';import vm from 'node:vm';
function runtime(withMap=false,search='?lang=en',geoAvailable=true){
 const events=new Map(),elements=new Map();const get=id=>{if(!elements.has(id))elements.set(id,{value:'',disabled:false,textContent:'',setAttribute(){},addEventListener(type,fn){events.set(id+':'+type,fn);},scrollIntoView(){},close(){},append(){},showModal(){}});return elements.get(id);};
 const document={documentElement:{},getElementById:get,querySelectorAll:()=>[],addEventListener(){},createElement:()=>({})};const window={};let calls=0,callbacks,fetches=0;
 const context={window,document,URLSearchParams,location:{search},navigator:{geolocation:{getCurrentPosition(success,error){calls++;callbacks={success,error};}}},fetch(){fetches++;throw new Error('Unexpected API request');},setTimeout,clearTimeout,AbortController};vm.createContext(context);
 for(const f of ['data/dining-taxonomy.js','nearby-model.js','nearby-copy.js','nearby-chat-config.js'])vm.runInContext(readFileSync(f,'utf8'),context);
 if(!geoAvailable)delete context.navigator.geolocation;
 window.WROC_CATALOG={places:{one:{id:'one',categories:['eat'],name:{en:'One'},location:{coordinates:{lat:0,lng:0}}}},getPlace:id=>window.WROC_CATALOG.places[id]};window.WROC_PLACE_PANEL={name:p=>p.name.en,actions:()=>'',popup:()=>''};
 const layers=[],frames=[],views=[];
 if(withMap){
  const map={setView(point){views.push(point);return this;},fitBounds(bounds){views.push(bounds);return this;},getPane:()=>({style:{}}),on(){return this;},getBounds:()=>({pad(){return this;},getSouth:()=>-85,getNorth:()=>85,getWest:()=>-180,getEast:()=>180})};
  const layer=(point,options={})=>{const handlers={};const result={point,options,handlers,icons:0,addTo(){return this;},on(type,fn){handlers[type]=fn;return this;},setLatLng(p){this.point=p;return this;},setLatLngs(){return this;},setRadius(){return this;},setIcon(){this.icons++;return this;},getLatLng(){return this.point;},getBounds(){return this.point;},remove(){},bindPopup(){return this;}};layers.push(result);return result;};
  context.L=window.L={map:()=>map,circle:layer,polygon:layer,marker:layer,divIcon:x=>x};
  window.WROC_MAP_TILES={addTo(){}};context.requestAnimationFrame=fn=>{frames.push(fn);return frames.length;};
 }
 vm.runInContext(readFileSync('nearby.js','utf8'),context);return{get,events,layers,frames,views,calls:()=>calls,callbacks:()=>callbacks,fetches:()=>fetches};
}
test('Normal entry requests GPS once, centres the map on success and allows a fresh request',()=>{
 const r=runtime(true);assert.equal(r.calls(),1);assert.equal(r.fetches(),0);assert.match(r.get('nearby-centre-note').textContent,/Finding/);
 r.callbacks().success({coords:{latitude:0,longitude:0,accuracy:10}});
 assert.match(r.get('nearby-count').textContent,/1 /);assert.match(r.get('nearby-centre-note').textContent,/device location/);assert.equal(r.views.at(-1)[0],0);assert.equal(r.get('nearby-locate').disabled,false);
 r.get('nearby-locate').onclick();assert.equal(r.calls(),2);
});
test('Denial or missing GPS restores manual mode without a retry loop',()=>{
 const r=runtime();r.callbacks().error();assert.equal(r.calls(),1);assert.equal(r.get('nearby-locate').disabled,false);assert.match(r.get('nearby-error').textContent,/unavailable/);assert.match(r.get('nearby-centre-note').textContent,/Manual/);
 const noGps=runtime(false,'?lang=en',false);assert.equal(noGps.calls(),0);assert.match(noGps.get('nearby-error').textContent,/unavailable/);assert.equal(noGps.get('nearby-locate').disabled,false);
});
test('An explicit public place keeps its centre and does not request GPS until asked',()=>{
 const r=runtime(false,'?lang=en&place=one');assert.equal(r.calls(),0);assert.match(r.get('nearby-count').textContent,/1 /);assert.match(r.get('nearby-centre-note').textContent,/Manual/);
 r.get('nearby-locate').onclick();assert.equal(r.calls(),1);
 const unknown=runtime(false,'?lang=en&place=missing');assert.equal(unknown.calls(),1);
});
test('Low accuracy is disclosed and a stale GPS callback cannot overwrite a subsequent manual selection',()=>{
 let r=runtime();r.callbacks().success({coords:{latitude:0,longitude:0,accuracy:900}});assert.match(r.get('nearby-centre-note').textContent,/900/);assert.match(r.get('nearby-count').textContent,/1 /);
 r=runtime();r.get('nearby-manual').onclick();r.callbacks().success({coords:{latitude:0,longitude:0,accuracy:1}});assert.match(r.get('nearby-centre-note').textContent,/Click the map/);assert.match(r.get('nearby-count').textContent,/0 /);
});

test('Hundred-metre buttons and slider stay synchronized without a GPS or AI request',()=>{const r=runtime(false,'?lang=en&place=one');r.get('nearby-radius-more').onclick();assert.equal(Number(r.get('nearby-radius').value),600);assert.equal(Number(r.get('nearby-radius-slider').value),600);r.get('nearby-radius-less').onclick();assert.equal(Number(r.get('nearby-radius').value),500);r.events.get('nearby-radius-slider:input')({target:{value:'800'}});assert.equal(Number(r.get('nearby-radius').value),800);r.events.get('nearby-radius-slider:input')({target:{value:'5000'}});assert.equal(r.get('nearby-radius-more').disabled,true);r.get('nearby-radius-more').onclick();assert.equal(Number(r.get('nearby-radius').value),5000);r.events.get('nearby-radius-slider:input')({target:{value:'100'}});assert.equal(r.get('nearby-radius-less').disabled,true);assert.equal(r.calls(),0);assert.equal(r.fetches(),0);});

// Leaflet setIcon replaces MarkerDrag and terminates an active touch gesture.
test('A continuous centre drag keeps its handler and updates results on release; stale GPS cannot move it back',()=>{
 const r=runtime(true),marker=r.layers.find(l=>l.options.draggable&&l.options.keyboard),icons=marker.icons;
 marker.handlers.dragstart();
 for(const p of [{lat:1,lng:1},{lat:.5,lng:.5},{lat:0,lng:0}]){marker.point=p;marker.handlers.drag();assert.equal(marker.icons,icons);}
 assert.equal(r.frames.length,0,'No render may reset the active drag');
 r.callbacks().success({coords:{latitude:40,longitude:40,accuracy:10}});
 assert.equal(marker.point.lat,0);marker.handlers.dragend();
 assert.match(r.get('nearby-count').textContent,/1 /);assert.match(r.get('nearby-centre-note').textContent,/Manual/);
 assert.equal(marker.icons,icons+1);assert.equal(r.fetches(),0);
});
