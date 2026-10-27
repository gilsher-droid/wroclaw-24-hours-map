import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';

const source=readFileSync(new URL('../map-tiles.js',import.meta.url),'utf8');
function setup(language, extra = {}){
  class Element {
    constructor(){this.children=[];this.dataset={};this.events={};this.classList={add:()=>{this.withoutBackground=true;}};}
    append(...items){this.children.push(...items);}
    setAttribute(k,v){this[k]=v;}
    addEventListener(k,fn){this.events[k]=fn;}
    insertAdjacentElement(_,node){this.notice=node;}
    remove(){this.removed=true;}
  }
  const container=new Element(), events={}, map={getContainer:()=>container,on:(k,fn)=>events[k]=fn,removeLayer:()=>{map.removals=(map.removals||0)+1;},attributionControl:{addAttribution:a=>map.attribution=a}};
  const layer={events:{},getTileUrl:()=> 'https://tile.openstreetmap.org/1/1/1.png',on(k,fn){this.events[k]=fn;return this;},off(k){delete this.events[k];return this;},addTo(){return this;}};
  const window={L:{tileLayer:(url,options)=>{layer.url=url;layer.options=options;return layer;}}};
  const document={documentElement:{lang:language},createElement:()=>new Element()};
  let observer;
  class MutationObserver {
    constructor(callback){this.callback=callback;observer=this;}
    observe(target,options){this.target=target;this.options=options;}
    disconnect(){this.disconnected=true;}
  }
  vm.runInNewContext(source,{window,document,AbortController,MutationObserver,...extra});
  window.WROC_MAP_TILES.addTo(map);
  return {container,map,layer,events,document,observer};
}
test('Ordinary map requests use the canonical provider URL and origin-only referrer without cache bypass',()=>{
  const {layer}=setup('en');
  assert.equal(layer.url,'https://tile.openstreetmap.org/{z}/{x}/{y}.png');
  assert.equal(layer.options.referrerPolicy,'origin');
  assert.equal(layer.options.errorTileUrl,undefined);
  assert.equal(layer.options.headers,undefined);
  assert.match(layer.options.attribution,/openstreetmap.org\/copyright/);
});
test('An HTTP403 containing a valid image is rejected before rendering and completes the Leaflet callback',async()=>{
  const {layer}=setup('en',{fetch:async()=>({ok:false,status:403})});
  const results=[];const image=layer.createTile({x:1,y:1,z:1},error=>results.push(error));
  await new Promise(resolve=>setImmediate(resolve));
  assert.equal(results.length,1);assert.match(results[0].message,/HTTP 403/);
  assert.equal(image.src,undefined);
});
test('Tile bytes are fetched once with private-safe defaults; unloading revokes its blob and aborts without disabling the map',async()=>{
  const calls=[],revoked=[];
  const {layer,map}=setup('en',{fetch:async(url,options)=>{calls.push({url,options});return {ok:true,blob:async()=>({})};},URL:{createObjectURL:()=> 'blob:local-test',revokeObjectURL:url=>revoked.push(url)}});
  const results=[];const image=layer.createTile({x:1,y:1,z:1},error=>{results.push(error);if(error)layer.events.tileerror?.({error});});
  await new Promise(resolve=>setImmediate(resolve));
  assert.equal(image.src,'blob:local-test');assert.equal(calls.length,1);
  assert.equal(calls[0].options.credentials,'omit');assert.equal(calls[0].options.referrerPolicy,'origin');assert.equal(calls[0].options.cache,undefined);
  layer.events.tileunload({tile:image});image.onload();
  assert.equal(results.length,1);assert.equal(results[0].name,'AbortError');
  assert.equal(calls[0].options.signal.aborted,true);assert.deepEqual(revoked,['blob:local-test']);
  assert.equal(map.removals,undefined);
});
test('Tile failure stops the layer once, preserves the map and exposes localized accessible alternatives in all five languages',()=>{
  const messages=new Set();
  for(const language of ['he','en','pl','de','cs']){
    const {layer,map,container,events}=setup(language), fail=layer.events.tileerror;
    fail({error:new Error('403')});fail({error:new Error('403')});
    assert.equal(map.removals,1);
    assert.equal(container.withoutBackground,true);
    assert.equal(container.notice.dataset.state,'unavailable');
    assert.equal(container.notice.children[0].role,'status');
    assert.ok(container.notice.children[0].textContent.length>25);
    messages.add(container.notice.children[0].textContent);
    assert.equal(container.notice.children[1].hidden,true);
    assert.equal(layer.events.tileerror,undefined);
    assert.ok(map.attribution);
    events.unload();assert.equal(container.notice.removed,true);
  }
  assert.equal(messages.size,5);
});
test('A visitor can remove an error-image background even when no network error fires, without an automatic retry',()=>{
  const {container,map,layer}=setup('he');
  assert.equal(map.removals,undefined);
  container.notice.children[1].events.click();
  assert.equal(map.removals,1);
  assert.equal(layer.events.tileerror,undefined);
});
test('Private pages keep their no-referrer protection while tile images explicitly send only an origin',()=>{
  const php=readFileSync(new URL('../bluehost-api/public/personal-trips/index.php',import.meta.url),'utf8');
  assert.match(php,/Referrer-Policy: no-referrer/);
  assert.match(php,/img-src[^;]*https:\/\/tile\.openstreetmap\.org/);
  assert.match(source,/referrerPolicy: "origin"/);
});
test('The shared helper executes synchronously before every map consumer, including mixed legacy script chains',()=>{
  for(const file of ['map.html','premium.html','moshe.html','lifestyle.html','excursions.html','cultural.html','guides.html','experiences.html','personal-trip.html','community.html','bluehost-api/public/personal-trips/index.php','bluehost-api/public/personal-trips/community-page.php']){
    const html=readFileSync(new URL('../'+file,import.meta.url),'utf8');
    const scripts=[...html.matchAll(/<script\b([^>]*?)src="([^"]+)"([^>]*)>/g)];
    const helper=scripts.findIndex(m=>/map-tiles\.js/.test(m[2]));
    assert.ok(helper>=0,file);
    assert.doesNotMatch(scripts[helper][1]+scripts[helper][3],/\b(?:defer|async)\b/,file);
    for(const [i,m] of scripts.entries())if(/\/(?:app|premium|lifestyle|cultural|guide-map|excursions|experiences|personal-trip|community-app)\.js(?:\?|$)/.test(m[2]))assert.ok(helper<i,`${file}: helper before ${m[2]}`);
  }
  const bootstrap=readFileSync(new URL('../bluehost-api/public/personal-trips/album-bootstrap.js',import.meta.url),'utf8');
  assert.match(bootstrap,/\['map-tiles\.js',[\s\S]*'trip-album\.js'\]\)await script\(f\)/);
});

test('Language switches update both available and failed notices without another tile request, and unload disconnects observation',()=>{
  let requests=0;
  const {container,layer,events,document,observer}=setup('he',{fetch:()=>{requests++;}});
  assert.deepEqual([...observer.options.attributeFilter],['lang']);
  assert.equal(container.notice.dir,'rtl');
  document.documentElement.lang='en';observer.callback();
  assert.equal(container.notice.dir,'ltr');
  assert.equal(container.notice.children[1].textContent,'Map background not displaying?');
  layer.events.tileerror({error:new Error('403')});
  const english=container.notice.children[0].textContent;
  document.documentElement.lang='pl';observer.callback();
  assert.notEqual(container.notice.children[0].textContent,english);
  assert.match(container.notice.children[0].textContent,/Tło mapy/);
  document.documentElement.lang='he';observer.callback();
  assert.equal(container.notice.dir,'rtl');
  assert.equal(requests,0);
  events.unload();assert.equal(observer.disconnected,true);
});
