import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const window={};
for(const file of ['data/place-catalog.js','data/now-in-wroclaw.js','data/place-visit-updates.js','place-visit-updates.js'])runInNewContext(readFileSync(file,'utf8'),{window,console});
const api=window.WROC_PLACE_VISITS;
test('November 2 bulletin preserves future announcements and expires weekly news separately from events',()=>{
 const items=window.WROC_NOW_IN_WROCLAW_ITEMS.filter(item=>item.startDate==='2026-11-02');assert.equal(items.length,5);
 for(const item of items){assert.equal(item.startDate,'2026-11-02');assert.equal(item.endDate,'2026-11-08');for(const lang of ['he','en','pl','de','cs'])assert.ok(item.title[lang]);if(item.eventStartDate>'2026-11-02')assert.equal(item.status,'announced');}
 assert.equal(items.find(x=>x.id==='wroclaw-christmas-market-2026-27').eventEndDate,'2027-01-07');
 const nowy=items.find(x=>x.id==='nowy-swiateczny-targ-2026');assert.equal(nowy.eventEndDate,'2026-12-20');assert.equal(nowy.relatedCanonicalPlaceId,undefined);assert.equal(nowy.coordinates,undefined);
});
test('Visitor notices use Warsaw calendar boundaries and remove the expired Czocha warning',()=>{
 assert.equal(api.localDate(new Date('2026-11-08T23:01:00Z')),'2026-11-09');
 assert.equal(api.forPlace('czocha-castle',new Date('2026-11-08T22:59:00Z')).length,1);
 assert.equal(api.forPlace('czocha-castle',new Date('2026-11-08T23:00:00Z')).length,0);
 assert.equal(api.forPlace('japanese',new Date('2027-03-31T12:00:00Z')).length,1);
 assert.equal(api.forPlace('japanese',new Date('2027-04-01T12:00:00Z')).length,0);
 assert.equal(api.forPlace('japanese',new Date('2026-10-31T12:00:00Z')).length,0);
 assert.equal(api.forPlace('rynek',new Date('2026-11-20T12:00:00Z')).length,0,'Upcoming-opening copy must expire before the announced opening');
});
test('Daytime garden closure does not erase special programmes or invent an exhibition end date',()=>{
 const bot=api.forPlace('wroclaw-botanical-garden',new Date('2026-11-02T12:00:00Z'))[0];assert.equal(bot.scope,'regular-visiting-only');assert.equal(bot.reviewRequiredBeforeExpiry,true);assert.equal(bot.validTo,undefined);assert.equal(bot.reviewAfter,'2027-02-28');
 assert.equal(api.forPlace('wroclaw-botanical-garden',new Date('2027-03-01T12:00:00Z')).length,1,'Historical season notice remains until reverified, rather than silently implying reopening');
 assert.match(api.html('wroclaw-botanical-garden','en',new Date('2027-03-01T12:00:00Z')),/data-review-required="true"/);
 const photo=api.forPlace('wroclaw-contemporary-museum',new Date('2026-11-02T12:00:00Z'))[0];assert.equal(photo.endDateUnresolved,true);assert.equal(photo.eventEndDate,undefined);
 for(const u of window.WROC_PLACE_VISIT_UPDATES){assert.ok(window.WROC_CATALOG.getPlace(u.canonicalPlaceId));assert.ok(u.sourceUrls.every(url=>url.startsWith('https://')));assert.ok(!('coordinates' in u));}
});
test('Every visitor notice and bulletin link follows the selected language in the existing panel',()=>{
 for(const lang of ['he','en','pl','de','cs']){
  const suffix=lang==='he'?'':'-'+lang;const html=api.html('czocha-castle',lang,new Date('2026-11-05T12:00:00Z'));
  assert.ok(html.includes('/news/2026-11-02'+suffix+'.html#czocha'));assert.ok(html.includes('role="note"'));
  const page=readFileSync('news/2026-11-02'+suffix+'.html','utf8');assert.match(page,new RegExp('<html lang="'+lang+'"'));for(const id of ['main-market','nowy-targ','gardens','czocha','ksiaz','photography'])assert.ok(page.includes('id="'+id+'"'));
 }
 for(const file of ['map','premium','moshe','lifestyle','cultural','excursions','guides','experiences','nearby']){const html=readFileSync(file+'.html','utf8');assert.ok(html.indexOf('/place-visit-updates.js')<html.indexOf('/place-panel.js'),file);}
 const panel=readFileSync('place-panel.js','utf8');assert.ok(panel.includes('WROC_PLACE_VISITS?.html(p.id,lang)'));assert.ok(panel.includes('WROC_PLACE_VISITS?.html(p.id,l)'));
});
