import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const load=(files,window={},document={documentElement:{lang:'he'},addEventListener(){}})=>{for(const f of files)runInNewContext(readFileSync(new URL('../'+f,import.meta.url),'utf8'),{window,document,console,URLSearchParams});return window;};
test('Opera full social guides are language-specific external links, separate from visit clips and YouTube embeds',()=>{
 const w=load(['data/place-catalog.js','guide-video.js']);const p=w.WROC_CATALOG.getPlace('opera');
 const expected={he:['1134820542254961','DfUFr6yGd9N'],en:['1449760397283921','DfUcZ0olg45'],pl:['1837503874047470','DfUZ5V_CTzm'],de:['2765697730491391','DfUeQvbET8W'],cs:['1696084648788682','DfUfw4vFSym']};
 for(const [lang,ids] of Object.entries(expected)){
  const html=w.WROC_GUIDE_VIDEO.button('opera',lang,'resource-icon');for(const id of ids)assert.ok(html.includes(id));
  assert.equal((html.match(/<a /g)||[]).length,2);assert.ok(!html.includes('data-guide-video-src'));assert.equal(w.WROC_GUIDE_VIDEO.sourceFor('opera',lang),null);
  for(const url of Object.values(p.media.guideLinks[lang]))assert.ok(!p.media.videos.includes(url));
  assert.match(w.WROC_GUIDE_VIDEO.decorateIcon({html:'<span>1</span>'},p,lang).html,/guide-marker-badge/);
 }
 assert.equal(w.WROC_GUIDE_VIDEO.button('opera','fr'),'');
 p.media.guideLinks.he.facebook='https://example.com/reel/123/';assert.ok(!w.WROC_GUIDE_VIDEO.button('opera','he').includes('example.com'));
});
test('Jatki retains one canonical identity and the same Hebrew name on both itineraries',()=>{
 const w=load(['data/place-catalog.js','data/extra-languages.js','data/locations.js','data/premium-route.js']);const p=w.WROC_CATALOG.getPlace('jatki');
 const records=[w.LOCATIONS.find(p=>p.id==='jatki'),w.PREMIUM_STOPS.find(p=>p.id==='jatki')];
 for(const r of records){assert.equal(r.canonicalPlaceId,'jatki');assert.equal(r.name.he,p.name.he);}
 assert.equal(p.name.he,'סמטת יאטקי, סמטת הקצבים');
});

test('Christmas evening choices have distinct canonical locations, media and guides',()=>{
 const w=load(['data/place-catalog.js','data/extra-languages.js','data/moshe-route.js','guide-video.js']);
 assert.ok(!w.PREMIUM_STOPS.some(p=>p.id==='culture-evening'));
 const choices=['opera','nfm'].map(id=>w.PREMIUM_STOPS.find(p=>p.id===id));
 for(const r of choices){const p=w.WROC_CATALOG.getPlace(r.id);assert.equal(r.day,3);assert.equal(r.optional,true);assert.equal(r.time,'16:00');assert.equal(r.canonicalPlaceId,p.id);assert.deepEqual([...r.coordinates],[p.location.coordinates.lat,p.location.coordinates.lng]);assert.ok(w.WROC_GUIDE_VIDEO.button(r.id,'he'));assert.ok(p.media.photos.length);}
 assert.notDeepEqual([...choices[0].coordinates],[...choices[1].coordinates]);
});
