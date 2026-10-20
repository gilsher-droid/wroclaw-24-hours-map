import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const context={};vm.runInNewContext(readFileSync('popup-viewport.js','utf8'),context);
const {visibleBounds,panOffset}=context.WROC_POPUP_VIEWPORT;
const rect=(left,top,right,bottom)=>({left,top,right,bottom});
test('visible bounds intersect a map with the viewport instead of its full height',()=>{
 const b=visibleBounds(rect(20,-200,800,900),rect(0,50,1000,600));
 assert.deepEqual(JSON.parse(JSON.stringify(b)),{left:32,top:62,right:788,bottom:588,width:756,height:526});
});
test('mobile clipped district popup moves right and down inside map',()=>{
 const b=visibleBounds(rect(12,280,363,719),rect(0,0,390,844));
 const offset=panOffset(rect(-82,171,248,515),b);
 assert.deepEqual(Array.from(offset),[-106,-121]);
});
test('short popup already inside stays still, bottom/right overflow pans minimally',()=>{
 const b=visibleBounds(rect(0,0,600,400),rect(0,0,600,400));
 assert.deepEqual(Array.from(panOffset(rect(30,30,300,300),b)),[0,0]);
 assert.deepEqual(Array.from(panOffset(rect(400,200,610,410),b)),[22,22]);
});
test('all Leaflet entry pages load shared fitter after library before map code',()=>{
 for(const name of ['map','premium','moshe','lifestyle','cultural','excursions','personal-trip']){
 const html=readFileSync(`${name}.html`,'utf8');
 assert.equal((html.match(/src="\/popup-viewport.js/g)||[]).length,1);
 assert.ok(html.indexOf('/popup-viewport.js')>html.indexOf('dist/leaflet.js'));
 }
 assert.match(readFileSync('build-static.mjs','utf8'),/"popup-viewport.js"/);
});
test('open/resize fitting caps tall content, pans once and settles without a feedback loop',()=>{
 let mapHook,popupHook,frames=[],pans=0,updates=0;
 let mapRect=rect(12,280,363,719), popupRect={...rect(-82,171,248,800)};
 const content={style:{setProperty(k,v){this[k]=v;}},hasAttribute:()=>false,setAttribute(){},getBoundingClientRect:()=>({width:300})};
 const element={querySelector:()=>content,classList:{add(){}},getBoundingClientRect:()=>popupRect};
 const popup={options:{maxWidth:340,minWidth:50,autoPan:true,keepInView:true},getElement:()=>element,update(){updates++;popupRect.right=popupRect.left+this.options.maxWidth+30;popupRect.bottom=popupRect.top+this.options.maxHeight+26;}};
 const handlers={},listeners={};
 const container={getBoundingClientRect:()=>mapRect,addEventListener(){},removeEventListener(){}};
 const map={getContainer:()=>container,hasLayer:()=>true,on(names,fn){names.split(' ').forEach(n=>handlers[n]=fn);},panBy([x,y],options){assert.equal(options.animate,false);pans++;popupRect={left:popupRect.left-x,right:popupRect.right-x,top:popupRect.top-y,bottom:popupRect.bottom-y};handlers.moveend();}};
 const root={L:{Map:{addInitHook(fn){mapHook=fn;}},Popup:{addInitHook(fn){popupHook=fn;}}},innerWidth:390,innerHeight:844,addEventListener(n,fn){listeners[n]=fn;},removeEventListener(){},document:{querySelectorAll:()=>[]},requestAnimationFrame(fn){frames.push(fn);return frames.length;},cancelAnimationFrame(){},ResizeObserver:class{observe(){}disconnect(){}}};
 root.window=root;vm.runInNewContext(readFileSync('popup-viewport.js','utf8'),root);
 popupHook.call(popup);assert.equal(popup.options.autoPan,false);assert.equal(popup.options.keepInView,false);
 mapHook.call(map);handlers.popupopen({popup});
 function drain(){let count=0;while(frames.length){assert.ok(++count<10,'fitter must settle');frames.shift()();}}
 drain();assert.equal(pans,1);assert.equal(content.style.overflowY,'auto');assert.equal(content.style.width,'291px');assert.equal(content.style.maxHeight,'367px');assert.ok(popupRect.top>=292);assert.ok(popupRect.bottom<=707);
 mapRect=rect(12,280,363,500);handlers.resize();drain();assert.equal(updates,2);assert.ok(popupRect.bottom<=488);
 handlers.popupclose();listeners.resize();assert.equal(frames.length,0);
});
