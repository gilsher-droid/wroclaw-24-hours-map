import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
const dir=new URL('../management/social-analytics/',import.meta.url);
test('website management entry opens the protected owner dashboard',()=>{const html=readFileSync(new URL('index.html',dir),'utf8');assert.match(html,/window\.location\.replace\("https:\/\/api\.wroc-love\.com\/owner-dashboard\/"\)/);assert.match(html,/http-equiv="refresh"/);assert.match(html,/<a href="https:\/\/api\.wroc-love\.com\/owner-dashboard\/">/);});
test('public management folder contains only the entry and documentation',()=>{assert.deepEqual(readdirSync(dir).sort(),['README.md','index.html']);});
test('homepage keeps its management entry and build inclusion',()=>{assert.match(readFileSync(new URL('../index.html',import.meta.url),'utf8'),/href="\/management\/social-analytics\/"/);assert.match(readFileSync(new URL('../build-static.mjs',import.meta.url),'utf8'),/resolve\(client, "management"\)/);});
