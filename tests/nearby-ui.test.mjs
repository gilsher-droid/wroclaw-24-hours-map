import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';import vm from 'node:vm';
test('All five nearby screens disclose aerial distance, manual centre and disabled chat without untranslated labels',()=>{
 const window={};vm.runInNewContext(readFileSync('nearby-copy.js','utf8'),{window});const keys=Object.keys(window.WROC_NEARBY_COPY.en);
 for(const lang of ['he','en','pl','de','cs']){const c=window.WROC_NEARBY_COPY[lang];assert.deepEqual(Object.keys(c),keys);for(const [key,value]of Object.entries(c))assert.ok(typeof value==='string'&&value.length>0,lang+' '+key);}
 const html=readFileSync('nearby.html','utf8');for(const script of ['data/place-catalog.js','data/dining-taxonomy.js','nearby-model.js','place-panel.js','nearby-chat-config.js'])assert.ok(html.includes(script));assert.match(html,/id="nearby-message"[^>]*disabled/);
 const source=readFileSync('nearby.js','utf8');assert.match(source,/L\.circle\(/);assert.match(source,/radius:filters\.radius/);assert.match(source,/version\.isCurrent\(stamp\)/);assert.ok(!source.includes('localStorage'));assert.match(source,/nearby-confirm.*showModal/);
});
