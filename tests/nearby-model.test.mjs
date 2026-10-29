import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
const window={};for(const file of ['data/dining-taxonomy.js','nearby-model.js','nearby-chat-client.js'])vm.runInNewContext(readFileSync(file,'utf8'),{window});
const m=window.WROC_NEARBY_MODEL,d=window.WROC_DINING;
const p=(id,lat,lng,dining={},categories=[])=>({id,name:{en:id},location:{coordinates:{lat,lng}},dining,categories});
const origin={lat:0,lng:0};
test('haversine is deterministic, includes exact radius boundary and excludes farther points',()=>{
 assert.equal(m.distance(origin,origin),0);assert.ok(Math.abs(m.distance(origin,{lat:0,lng:1})-111195.08)<0.1);
 const degrees=500/m.EARTH_RADIUS*180/Math.PI;
 const found=m.search([p('edge',0,degrees),p('outside',0,degrees+0.000001),p('inside',0,0),p('inside',0,0)],origin,{radius:500});
 assert.deepEqual(Array.from(found,r=>r.id),['inside','edge']);
 assert.equal(m.search([p('far',51,17)],origin,{radius:500}).length,0);
 for(const radius of [0,49,5001,NaN,Infinity,'500'])assert.throws(()=>m.query({radius}));
 for(const centre of [{lat:91,lng:0},{lat:0,lng:181},{lat:'0',lng:0}])assert.throws(()=>m.search([],centre));
});
test('dedicated venues, mixed options and unknown dietary evidence remain distinct',()=>{
 const vegan=p('vegan',0,0,{dietary:{venue:'vegan'}}),mixed=p('mixed',0,0,{dietary:{venue:'mixed',veganOptions:'verified'}}),unknown=p('unknown',0,0,{});
 assert.ok(d.dietaryMatch(vegan,'vegetarian'));assert.ok(d.dietaryMatch(mixed,'vegan'));assert.ok(!d.dietaryMatch(mixed,'vegan-only'));assert.ok(!d.dietaryMatch(vegan,'vegan-options'));assert.ok(!d.dietaryMatch(unknown,'vegan'));
 assert.equal(m.search([vegan,mixed,unknown],origin,{dietary:'vegan'}).length,2);
 const italian=p('italian',0,0,{venueTypes:['restaurant'],cuisines:['italian'],dietary:{venue:'vegan'}});
 assert.equal(m.search([italian,vegan],origin,{cuisine:'italian',dietary:'vegan',venueType:'restaurant'}).length,1);
 for(const dict of [d.quickCategories,d.venueTypes,d.cuisines,d.dietary])for(const label of Object.values(dict))for(const lang of ['he','en','pl','de','cs'])assert.ok(label[lang]);
});
test('chat references cannot introduce external or stale result IDs; no implicit filter relaxation',()=>{
 const context={ids:['first','second'],selected:'second'},filters={category:'eat',cuisine:'italian',dietary:'vegan',radius:500};
 const intent=m.intent({action:'photos',reference:{kind:'index',index:2}},filters,context);
 assert.equal(intent.referenceId,'second');assert.equal(intent.filters.cuisine,'italian');assert.equal(intent.filters.dietary,'vegan');
 assert.throws(()=>m.intent({action:'photos',reference:{kind:'id',id:'invented'}},filters,context));
 assert.throws(()=>m.intent({action:'photos',reference:{kind:'index',index:3}},filters,context));
 assert.throws(()=>m.intent({action:'search',centreChange:'place'},filters,context));
 assert.throws(()=>m.intent({action:'search',unexpected:true},filters,context));
 const c=m.coordinator(),v=c.version();c.invalidate();assert.ok(!c.isCurrent(v));
});
test('chat transport minimizes context, excluding location and private record fields',()=>{
 const place={...p('a',51.1,17.2),privateNotes:'SECRET',media:{photos:['private.jpg']}};
 const body=window.WROC_NEARBY_CHAT.payload('מה יש סביבי?','he',{radius:500},[{id:'a',place,distance:20.42}],'a');
 assert.equal(body.results[0].metres,20);assert.ok(!/SECRET|51.1|17.2|private.jpg|coordinates/.test(JSON.stringify(body)));
 assert.throws(()=>window.WROC_NEARBY_CHAT.payload('x'.repeat(801),'he',{},[],null));
});

test('Provider configuration is disabled and no provider is silently chosen or activated',()=>{
 const w={};vm.runInNewContext(readFileSync('nearby-chat-config.js','utf8'),{window:w});assert.equal(w.WROC_NEARBY_CHAT_CONFIG.enabled,false);assert.equal(w.WROC_NEARBY_CHAT_CONFIG.endpoint,'https://api.wroc-love.com/nearby-chat/');
 const ui=readFileSync('nearby.js','utf8');assert.match(ui,/if\(config.enabled===true\)fetch/);assert.ok(!/watchPosition|localStorage|sessionStorage/.test(ui));assert.match(ui,/getCurrentPosition/);assert.match(ui,/nearby-locate.*onclick/);
});

test('Public-only results deduplicate by canonical ID and remain deterministically ordered',()=>{
 const entries=[p('z',0,0),p('a',0,0),{...p('hidden',0,0),status:'hidden'},p('a',0,0),{...p('invalid',99,0)}, {...p('private',0,0),status:'private'}];
 assert.deepEqual(Array.from(m.search(entries,origin),r=>r.id),['a','z']);
});
test('Validated follow-up contracts in five languages preserve hard filters and require centre confirmation',()=>{
 // Contract fixtures, not live provider quality tests. No provider was called.
 const phrases={he:['בעצם רק בתי קפה','תרחיב לקילומטר','תראה תמונות של המקום השני','מה עוד לידו?'],en:['Only cafés instead','Expand to one kilometre','Photos of the second place','What else is near it?'],pl:['Tylko kawiarnie','Zwiększ do kilometra','Zdjęcia drugiego miejsca','Co jeszcze jest obok?'],de:['Nur Cafés','Auf einen Kilometer erweitern','Fotos vom zweiten Ort','Was gibt es in seiner Nähe?'],cs:['Jen kavárny','Rozšiř na kilometr','Fotky druhého místa','Co dalšího je poblíž?']};
 for(const [language,texts]of Object.entries(phrases)){
  const current={category:'eat',dietary:'vegan',radius:500},context={ids:['first','second'],selected:'second'};
  const responses=[{action:'search',category:'coffee'},{action:'search',radius:1000},{action:'photos',reference:{kind:'index',index:2}},{action:'explore',category:'sights',reference:{kind:'selected'},centreChange:'place'}];
  responses.forEach((response,i)=>{const next=m.intent(response,current,context);assert.equal(next.filters.dietary,'vegan',language+' '+texts[i]);if(i===0)assert.equal(next.filters.category,'coffee');if(i===1)assert.equal(next.filters.radius,1000);if(i===2)assert.equal(next.referenceId,'second');if(i===3)assert.equal(next.centreChange,'place');});
 }
});
