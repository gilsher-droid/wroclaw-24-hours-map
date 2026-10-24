import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const source=readFileSync('bluehost-api/public/personal-trips/app.js','utf8');
const helper=source.match(/function dateTabLabel\(day\)\{[\s\S]*?\n\}/)?.[0];
assert.ok(helper,'The itinerary date formatter must be available');
const label=vm.runInNewContext(helper+';dateTabLabel');
test('Private itinerary respects undated customer plans and explicit relative day labels',()=>{
 assert.equal(label({date:'',dateLabel:'יום ההגעה'}),'יום ההגעה');
 assert.equal(label({date:null}),'');
 assert.equal(label({}),'');
 assert.equal(label({date:'2026-02-31'}),'');
 assert.equal(label({date:'2026-11-29',dateLabel:'  יום מלא בעיר  '}),'יום מלא בעיר');
 assert.match(source,/el\('span',dateTabLabel\(d\)\)/);
});
test('November and December retain their actual month in private day tabs',()=>{
 assert.match(label({date:'2026-11-29'}),/נובמבר/);
 assert.match(label({date:'2026-12-02'}),/דצמבר/);
 assert.notEqual(label({date:'2026-11-29'}),label({date:'2026-12-29'}));
});
