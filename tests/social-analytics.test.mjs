import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
const directory=new URL('../management/social-analytics/',import.meta.url);
const schema=vm.createContext({});
vm.runInContext(readFileSync(new URL('schema.js',directory),'utf8'),schema);
const validate=schema.WrocSocialSchema.validateSnapshot;
const snapshot=JSON.parse(readFileSync(new URL('snapshot.json',directory),'utf8'));
test('published snapshot and browser bootstrap contain the same measured data',()=>{
  validate(snapshot);
  const context=vm.createContext({window:{}});
  vm.runInContext(readFileSync(new URL('snapshot.js',directory),'utf8'),context);
  assert.equal(JSON.stringify(context.window.WROC_LOVE_SNAPSHOT),JSON.stringify(snapshot));
});
for(const [name,change] of [
  ['HTML in channel names',s=>s.channels[0].name='<img src=x onerror=alert(1)>'],
  ['negative metrics',s=>s.channels[0].data[7].f[0]=-1],
  ['spreadsheet formula metrics',s=>s.channels[0].data[7].f[0]='=HYPERLINK("x")'],
  ['missing metrics',s=>s.channels[0].data[7].f=[1]],
  ['duplicate languages',s=>s.channels[1].name='Hebrew'],
  ['incorrect window length',s=>s.periods[7].end='2026-10-14'],
  ['invalid measurement date',s=>s.measuredOn='2026-02-30'],
  ['unsafe source identifier',s=>s.channels[0].asset='1" onmouseover="alert(1)'],
])test(`rejects ${name}`,()=>{const copy=structuredClone(snapshot);change(copy);assert.throws(()=>validate(copy));});
test('unavailable metrics remain distinct from zero',()=>{const copy=structuredClone(snapshot);copy.channels[0].data[7].f[0]=null;assert.equal(validate(copy).channels[0].data[7].f[0],null);});
test('dashboard is included in the site build and linked from the homepage',()=>{
  assert.match(readFileSync(new URL('../build-static.mjs',import.meta.url),'utf8'),/resolve\(client, "management"\)/);
  assert.match(readFileSync(new URL('../index.html',import.meta.url),'utf8'),/href="\/management\/social-analytics\/"/);
});
