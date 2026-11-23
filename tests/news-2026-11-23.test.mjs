import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createHash} from 'node:crypto';
const window={};for(const file of ['data/place-catalog.js','data/now-in-wroclaw.js','data/place-visit-updates.js','place-visit-updates.js'])vm.runInNewContext(fs.readFileSync(file,'utf8'),{window,console});
const current=window.WROC_NOW_IN_WROCLAW_ITEMS.filter(x=>x.startDate==='2026-11-23');
test('Current bulletin distinguishes confirmed openings from next-weekend announcements',()=>{
 assert.equal(current.length,5);
 assert.equal(current.find(x=>x.id.endsWith('-markets')).status,'confirmed');
 assert.equal(current.find(x=>x.id.endsWith('-tygiel')).status,'confirmed');
 const weekend=current.find(x=>x.id.endsWith('-weekend'));assert.equal(weekend.status,'announced');assert.equal(weekend.eventStartDate,'2026-11-27');assert.equal(weekend.endDate,'2026-11-26');
 for(const x of current){assert.equal(x.verifiedAt,'2026-11-23');if(x.status==='confirmed')assert.ok(x.eventStartDate<=x.verifiedAt);assert.equal(x.coordinates,undefined);}
});
test('Canonical visitor notices preserve identities, expire and localize their links',()=>{
 assert.equal(Object.keys(window.WROC_CATALOG.places).length,347);assert.equal(Object.keys(window.WROC_CATALOG.aliases).length,269);
 const api=window.WROC_PLACE_VISITS;
 assert.equal(api.forPlace('rynek',new Date('2026-11-23T12:00:00Z')).length,1);
 assert.equal(api.forPlace('rynek',new Date('2026-11-29T23:00:00Z')).length,0);
 const notice=api.forPlace('zoo-wroclaw',new Date('2026-11-23T12:00:00Z'))[0];assert.equal(notice.status,'announced');assert.ok(!('wheelchairAccessible' in notice));
 assert.ok(api.html('rynek','pl',new Date('2026-11-23T12:00:00Z')).includes('/news/2026-11-23-pl.html#markets'));
});
test('Five localized bulletins contain seven linked articles, original media and proposal wording',()=>{
 for(const lang of ['he','en','pl','de','cs']){
  const suffix=lang==='he'?'':'-'+lang,page=fs.readFileSync('news/2026-11-23'+suffix+'.html','utf8');
  assert.ok(page.includes('<html lang="'+lang+'"'));assert.equal((page.match(/<article /g)||[]).length,7);
  for(const id of ['markets','tygiel','weekend','ginger','tourist-fee','pjm','ice'])assert.ok(page.includes('id="'+id+'"'));
  assert.match(page,/<article id="tourist-fee" data-status="announced">/);assert.match(page,/<article id="weekend" data-status="announced">/);
  assert.ok(page.includes('torpartynice.pl/kalendarz-wydarzen/'));assert.ok(page.includes('starakopalnia.pl/tygiel/'));
  assert.ok(page.includes('https://wroc-love.com/news/2026-11-23'+suffix+'.html'));
  assert.ok(!page.includes('—'));assert.ok(!page.includes('utm_source='));
 }
 const hash=createHash('sha256').update(fs.readFileSync('assets/news/2026-11-23-wroc-love-original.png')).digest('hex');assert.equal(hash,'bd3bb06a0760c5db9dafb264e56b738ea042296be98b7838abd2cc33131137fe');
});
