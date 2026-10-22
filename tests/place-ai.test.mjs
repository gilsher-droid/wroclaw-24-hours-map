import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import vm from 'node:vm';
const code=readFileSync('place-ai-model.js','utf8');
function runtime(){const window={};vm.runInNewContext(code,{window});return window.WROC_PLACE_AI_MODEL;}
test('AI questions resolve canonical identity without private content or device location',()=>{
 const m=runtime(),p={id:'japanese',name:{he:'הגן היפני',en:'Japanese Garden'},localName:'Ogród Japoński',location:{address:{city:'Wrocław'}},privateNotes:'SECRET',photos:['family.jpg']};
 const c=m.context({id:'alias',canonicalPlaceId:'japanese',name:'Wrong place',privateNotes:'PERSONAL'},'he',{getPlace:id=>id==='japanese'?p:null});
 assert.equal(c.id,'japanese');assert.equal(c.name,'הגן היפני');assert.equal(c.city,'Wrocław');assert.deepEqual(Object.keys(c).sort(),['city','id','language','localName','name']);
 const prompt=m.prompt(c);assert.ok(prompt.includes('Ogród Japoński'));assert.ok(!/SECRET|PERSONAL|family.jpg|Wrong place/.test(prompt));assert.equal(m.context(null),null);
});
test('All five languages have distinct preset questions and a truthful default context',()=>{
 const m=runtime();for(const l of m.languages){const c=m.context({id:'hala',name:{en:'Centennial Hall'},localName:'Hala Stulecia',city:'Wrocław'},l);const prompts=Array.from({length:5},(_,i)=>m.prompt(c,i));assert.equal(new Set(prompts).size,5);for(const p of prompts){assert.ok(p.includes('Hala Stulecia'));assert.ok(p.includes('Wrocław'));assert.ok(p.includes(m.tasks[l][prompts.indexOf(p)]));}}
 assert.match(m.prompt(m.context({name:'Place'},'he')),/אין להניח שאני נמצא/);
 assert.equal(m.context({name:'Place'},'xx').language,'he');
});
test('AI buttons escape untrusted place names and open only fixed external destinations',()=>{
 const window={WROC_PLACE_AI_MODEL:runtime()},document={addEventListener(){}};
 vm.runInNewContext(readFileSync('place-ai.js','utf8'),{window,document});
 const html=window.WROC_PLACE_AI.button({id:'a',name:'<img src=x onerror="alert(1)">'},'en');assert.ok(!html.includes('<img'));assert.ok(html.includes('&lt;img'));assert.ok(html.includes('aria-haspopup="dialog"'));
 const ui=readFileSync('place-ai.js','utf8');assert.ok(!/\bfetch\s*\(|XMLHttpRequest|geolocation|localStorage|sessionStorage/.test(ui));assert.match(ui,/href="https:\/\/chatgpt\.com\/"/);assert.match(ui,/href="https:\/\/gemini\.google\.com\/"/);assert.match(ui,/noopener noreferrer/);assert.match(ui,/question\.select\(\)/);
});
test('All seven public map types load the shared service before rendering place controls',()=>{
 for(const [page,renderer] of [['map','app'],['premium','premium'],['moshe','premium'],['lifestyle','lifestyle'],['cultural','cultural'],['excursions','excursions'],['guides','guide-map']]){
  const html=readFileSync(page+'.html','utf8');assert.ok(html.indexOf('/place-ai-model.js')<html.indexOf('/place-ai.js'));assert.ok(html.indexOf('/place-ai.js')<html.indexOf('/'+renderer+'.js'));assert.ok(html.includes('/place-ai.css'));assert.ok(readFileSync(renderer+'.js','utf8').includes('WROC_PLACE_AI?.button('));
 }
 for(const f of ['place-ai-model.js','place-ai.js','place-ai.css'])assert.ok(existsSync('dist/client/'+f));
});
