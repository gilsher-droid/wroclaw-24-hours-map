import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';import vm from 'node:vm';
function runtime(){
 const events=new Map(),elements=new Map();const get=id=>{if(!elements.has(id))elements.set(id,{value:'',disabled:false,textContent:'',setAttribute(){},addEventListener(type,fn){events.set(id+':'+type,fn);},scrollIntoView(){},close(){},append(){},showModal(){}});return elements.get(id);};
 const document={documentElement:{},getElementById:get,querySelectorAll:()=>[],addEventListener(){},createElement:()=>({})};const window={};let calls=0,callbacks,fetches=0;
 const context={window,document,URLSearchParams,location:{search:'?lang=en'},navigator:{geolocation:{getCurrentPosition(success,error){calls++;callbacks={success,error};}}},fetch(){fetches++;throw new Error('Unexpected API request');},setTimeout,clearTimeout,AbortController};vm.createContext(context);
 for(const f of ['data/dining-taxonomy.js','nearby-model.js','nearby-copy.js','nearby-chat-config.js'])vm.runInContext(readFileSync(f,'utf8'),context);
 window.WROC_CATALOG={places:{one:{id:'one',categories:['eat'],name:{en:'One'},location:{coordinates:{lat:0,lng:0}}}},getPlace:()=>null};window.WROC_PLACE_PANEL={name:p=>p.name.en,actions:()=>''};
 vm.runInContext(readFileSync('nearby.js','utf8'),context);return{get,events,calls:()=>calls,callbacks:()=>callbacks,fetches:()=>fetches};
}
test('GPS is requested only after an explicit click; denial leaves manual search available',()=>{
 const r=runtime();assert.equal(r.calls(),0);assert.equal(r.fetches(),0);assert.match(r.get('nearby-centre-note').textContent,/Manual/);
 r.get('nearby-locate').onclick();assert.equal(r.calls(),1);assert.equal(r.get('nearby-locate').disabled,true);r.callbacks().error();assert.equal(r.get('nearby-locate').disabled,false);assert.match(r.get('nearby-error').textContent,/unavailable/);assert.match(r.get('nearby-centre-note').textContent,/Manual/);
});
test('Low accuracy is disclosed and a stale GPS callback cannot overwrite a subsequent manual selection',()=>{
 let r=runtime();r.get('nearby-locate').onclick();r.callbacks().success({coords:{latitude:0,longitude:0,accuracy:900}});assert.match(r.get('nearby-centre-note').textContent,/900/);assert.match(r.get('nearby-count').textContent,/1 /);
 r=runtime();r.get('nearby-locate').onclick();r.get('nearby-manual').onclick();r.callbacks().success({coords:{latitude:0,longitude:0,accuracy:1}});assert.match(r.get('nearby-centre-note').textContent,/Click the map/);assert.match(r.get('nearby-count').textContent,/0 /);
});
