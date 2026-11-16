import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const window={};
for(const file of ['data/place-catalog.js','data/now-in-wroclaw.js','data/place-visit-updates.js','place-visit-updates.js'])runInNewContext(readFileSync(file,'utf8'),{window,console});
const api=window.WROC_PLACE_VISITS;
const current=window.WROC_NOW_IN_WROCLAW_ITEMS.filter(x=>x.startDate==='2026-11-16');
test('November 16 announcements distinguish publication expiry from event dates',()=>{
 assert.equal(current.length,5);
 for(const item of current){assert.equal(item.status,'announced');assert.equal(item.verifiedAt,'2026-11-16');assert.ok(item.endDate<= '2026-11-22');}
 const market=current.find(x=>x.id.endsWith('-markets'));
 assert.equal(market.endDate,'2026-11-19');assert.equal(market.eventEndDate,'2027-01-07');
 assert.equal(current.find(x=>x.id.endsWith('-huta')).eventStartDate,'2026-11-27');
 assert.equal(current.find(x=>x.id.endsWith('-daisy')).eventStartDate,'2026-12-01');
});
test('Canonical notices expire before future-opening claims become stale',()=>{
 assert.equal(api.forPlace('ksiaz-castle',new Date('2026-11-30T22:59:00Z')).length,1);
 assert.equal(api.forPlace('ksiaz-castle',new Date('2026-11-30T23:00:00Z')).length,0);
 assert.equal(api.forPlace('new-horizons-cinema',new Date('2026-11-22T12:00:00Z')).length,1);
 assert.equal(api.forPlace('new-horizons-cinema',new Date('2026-11-23T12:00:00Z')).length,0);
 assert.equal(api.forPlace('rynek',new Date('2026-11-19T12:00:00Z')).length,1);
 assert.equal(api.forPlace('rynek',new Date('2026-11-20T12:00:00Z')).length,0);
 for(const item of current.filter(x=>!x.relatedCanonicalPlaceId)){assert.equal(item.coordinates,undefined);}
 const ids=window.WROC_PLACE_VISIT_UPDATES.map(x=>x.id);assert.equal(new Set(ids).size,ids.length);
});
test('Five localized bulletins retain all seven source-linked stories and supplied original artwork',()=>{
 for(const lang of ['he','en','pl','de','cs']){
  const suffix=lang==='he'?'':'-'+lang;
  const page=readFileSync('news/2026-11-16'+suffix+'.html','utf8');
  assert.match(page,new RegExp('<html lang="'+lang+'"'));
  for(const id of ['tygiel','markets','huta','transport','daisy','friendship','film'])assert.ok(page.includes('id="'+id+'"'));
  assert.equal((page.match(/<article /g)||[]).length,7);
  assert.ok(page.includes('/assets/news/2026-11-16-wroc-love-original.png'));
  assert.ok(page.includes('600.walbrzych.pl/wydarzenie/muzeum-walbrzyszan-tygiel/'));
  assert.ok(page.includes('www.nowehoryzonty.pl/aff'));
  assert.ok(!page.includes('—'));
  const visit=api.html('ksiaz-castle',lang,new Date('2026-11-16T12:00:00Z'));
  assert.ok(visit.includes('/news/2026-11-16'+suffix+'.html#daisy'));
 }
});
