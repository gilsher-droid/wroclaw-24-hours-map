import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {test} from 'node:test';
import vm from 'node:vm';
const source=readFileSync(new URL('../analytics.js',import.meta.url),'utf8');
function browser(query='',hostname='wroc-love.com'){
 const sent=[],scripts=[],storage=new Map(),location=new URL('https://'+hostname+'/nearby.html?lang=en'+query);
 const window={WROC_ANALYTICS_CONFIG:{ga4MeasurementId:'G-TEST',metaPixelId:'123',firstPartyEndpoint:'https://api.wroc-love.com/place-events/'},fetch:(url,options)=>{sent.push({url,options,body:JSON.parse(options.body)});return Promise.resolve({ok:true});},setTimeout:()=>1,addEventListener:()=>{}};
 const document={documentElement:{lang:'en'},head:{appendChild:s=>scripts.push(s)},createElement:()=>({}),addEventListener:()=>{}};
 vm.runInNewContext(source,{window,document,location,URL,URLSearchParams,Date,console,sessionStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)}});
 return{api:window.WROC_ANALYTICS,sent,scripts,window};
}
test('collector needs consent, strips question, URL and coordinates, and stops on withdrawal',()=>{
 const b=browser();b.api.track('ai_open',{question:'private question'});b.api.flush();assert.equal(b.sent.length,0);
 b.api.setConsent({analytics:true});b.api.track('ai_service_click',{canonical_place_id:'opera',provider:'gemini',question:'secret',latitude:51.1,page_location:'https://private.test/?token=secret'});b.api.flush();
 assert.equal(b.sent.length,1);assert.equal(b.sent[0].options.credentials,'omit');const raw=JSON.stringify(b.sent[0].body);assert.ok(!/secret|private|latitude|page_location/.test(raw));assert.ok(raw.includes('opera'));
 b.api.track('photo_open');b.api.setConsent({analytics:false});b.api.flush();assert.equal(b.sent.length,1);
});
test('owner exclusion suppresses all providers; test traffic reaches only isolated first-party counters',()=>{
 const owner=browser('&analytics_exclude=1');owner.api.setConsent({analytics:true,marketing:true});owner.api.track('place_open');owner.api.flush();assert.equal(owner.sent.length,0);assert.equal(owner.scripts.length,0);
 const b=browser('&analytics_test=1');b.api.setConsent({analytics:true,marketing:true});b.api.flush();assert.equal(b.sent[0].body.test,true);assert.equal(b.scripts.length,0);
});
test('first-party collection stays off on local previews and private API host',()=>{
 for(const host of ['localhost','api.wroc-love.com']){const b=browser('',host);b.api.setConsent({analytics:true});b.api.track('place_open');b.api.flush();assert.equal(b.sent.length,0);}
});
test('YouTube counts confirmed playback, each milestone once, and stops after consent withdrawal',()=>{
 const events=[],listeners={},intervals=new Map();let timerId=0,consent=true,stateChange,current=0;
 const frame={src:'https://www.youtube-nocookie.com/embed/abcdefghijk?enablejsapi=1',dataset:{},isConnected:true,closest:()=>null};
 const document={readyState:'complete',body:{},querySelectorAll:s=>s.startsWith('iframe')?[frame]:[],addEventListener:(n,f)=>listeners[n]=f};
 const window={WROC_ANALYTICS:{status:()=>({analytics:consent}),track:(n,d)=>events.push({n,d})},addEventListener:(n,f)=>listeners[n]=f,YT:{Player:function(_,config){stateChange=config.events.onStateChange;this.getDuration=()=>100;this.getCurrentTime=()=>current;}}};
 vm.runInNewContext(readFileSync(new URL('../place-telemetry.js',import.meta.url),'utf8'),{window,document,location:new URL('https://wroc-love.com'),URL,setInterval:fn=>{intervals.set(++timerId,fn);return timerId;},clearInterval:id=>intervals.delete(id),setTimeout,clearTimeout});
 assert.equal(events.length,0);stateChange({data:0});assert.equal(events.length,0);
 stateChange({data:1});stateChange({data:1});assert.equal(events.filter(e=>e.n==='video_start').length,1);
 current=60;for(const f of intervals.values())f();for(const f of intervals.values())f();assert.deepEqual(events.filter(e=>e.n==='video_progress').map(e=>e.d.video_percent),[25,50]);
 consent=false;listeners['wroc:analytics-consent']();assert.equal(intervals.size,0);stateChange({data:0});assert.equal(events.filter(e=>e.n==='video_complete').length,0);
 consent=true;stateChange({data:1});current=100;stateChange({data:0});assert.equal(events.filter(e=>e.n==='video_complete').length,1);
});
