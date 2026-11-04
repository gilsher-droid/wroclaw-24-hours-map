import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const source=name=>readFileSync(name,'utf8');
test('Every numbered place retains its order and receives the correct shared category symbol',()=>{
 const w={WROC_CATALOG:{getPlace:()=>null}};vm.runInNewContext(source('guide-video.js'),{window:w,document:{documentElement:{lang:'en'},addEventListener(){}},URLSearchParams});
 for(const [category,type] of [['eat',0],['cafe',1],['museum',2],['sleep',3],['sightseeing',4],['drink',5]]){
  const icon=w.WROC_GUIDE_VIDEO.decorateIcon({html:'<span>7</span>',className:'route-marker',iconSize:[34,34]},{id:category,categories:[category]},'en');
  assert.ok(icon.html.includes('<span>7</span>'));assert.ok(icon.html.includes(`wroc-type-${type}`));assert.ok(icon.html.includes('<svg'));assert.deepEqual(icon.iconSize,[34,34]);
 }
 const icon=w.WROC_GUIDE_VIDEO.decorateIcon({html:'<span class="lifestyle-marker eat"><span>OLD</span></span>',className:''},{id:'coffee',categories:['cafe']},'en');assert.ok(!icon.html.includes('OLD'));assert.ok(icon.html.includes('wroc-type-main'));assert.ok(icon.html.includes('Café'));
});
test('Traveller-content availability uses only the public feed and hides empty places',async()=>{
 const calls=[],w={};const document={addEventListener(){},querySelectorAll:()=>[]};
 vm.runInNewContext(source('place-panel.js'),{window:w,document,location:{hostname:'wroc-love.com'},fetch:async(url,options)=>{calls.push({url,options});return {ok:true,json:async()=>({items:[{placeId:'has-content',text:'Published story',media:[]},{placeId:'empty',text:'',media:[]}]})};}});
 w.WROC_COMMUNITY_AVAILABILITY.load();await new Promise(setImmediate);assert.equal(w.WROC_COMMUNITY_AVAILABILITY.has('has-content'),true);assert.equal(w.WROC_COMMUNITY_AVAILABILITY.has('empty'),false);assert.equal(w.WROC_COMMUNITY_AVAILABILITY.has('private-place'),false);assert.equal(calls.length,1);assert.equal(calls[0].url,'https://api.wroc-love.com/personal-trips/?action=community-public');assert.equal(calls[0].options.credentials,'omit');
});
test('An album keeps every included photo and video exactly once and ends with a back cover',()=>{
 const w={WROC_ALBUM_ROUTE:[['cafe']]};vm.runInNewContext(source('bluehost-api/public/personal-trips/trip-album-model.js'),{window:w});
 const entries=Array.from({length:6},(_,i)=>({id:'media'+i,day:0,placeId:'cafe',type:i===5?'video':'image',caption:'',text:'',order:i,createdAt:i}));entries.push({id:'note',day:0,placeId:'cafe',type:'note',caption:'Story',text:'Full story',order:6,createdAt:6},{id:'excluded',day:0,placeId:'cafe',type:'image',included:false,order:7,createdAt:7});
 const ui=source('bluehost-api/public/personal-trips/trip-album.js'),start=ui.indexOf(' function bookPages()'),end=ui.indexOf('\n function pageSize()',start),context={model:w.WROC_TRIP_ALBUM_MODEL,data:{entries}};vm.runInNewContext(ui.slice(start,end)+';this.pages=bookPages();',context);
 assert.equal(context.pages.at(-1).type,'back-cover');assert.equal(context.pages.filter(p=>p.type==='back-cover').length,1);
 const displayed=context.pages.flatMap(p=>p.entries||(p.entry?[p.entry]:[]));assert.deepEqual(Array.from(displayed,e=>e.id).sort(),entries.filter(e=>e.included!==false).map(e=>e.id).sort());assert.ok(context.pages.some(p=>p.entries?.length===4));assert.ok(context.pages.every(p=>!p.entries||p.entries.length<=4));
});
