import test from'node:test';import assert from'node:assert/strict';import{readFileSync}from'node:fs';import{runInNewContext}from'node:vm';import{createHash}from'node:crypto';
const window={location:{origin:'https://wroc-love.com'}},document={documentElement:{lang:'he'},addEventListener(){}};
for(const f of['data/place-catalog.js','data/extra-languages.js','data/premium-route.js','guide-video.js'])runInNewContext(readFileSync(f,'utf8'),{window,document,console,URLSearchParams});
const b=JSON.parse(readFileSync('data/barbara-ostrow-day2-preservation.json')),plain=x=>JSON.parse(JSON.stringify(x)),hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
test('Barbara adds only explicitly shared Papa guides; all221 unrelated records and all route-point media/locations stay exact',()=>{
 let unchanged=0;for(const[id,h]of Object.entries(b.recordHashes)){const p=plain(window.WROC_CATALOG.getPlace(id));if(!b.authorizedIds.includes(id)){assert.equal(hash(p),h,id);unchanged++;}else{const old=b.places[id];assert.deepEqual(p.location,old.location,id);assert.deepEqual(p.links,old.links,id);assert.deepEqual(p.socialPosts,old.socialPosts,id);assert.deepEqual(p.name,old.name,id);assert.deepEqual(p.description,old.description,id);if(id==='barbara-wroclaw'){assert.deepEqual(p.media.photos,old.media.photos);assert.deepEqual(p.media.videos,old.media.videos);assert.equal(p.media.thumbnail,old.media.thumbnail);assert.deepEqual(p.media.metadata,old.media.metadata);}else assert.deepEqual(p.media,old.media,id);}}
 assert.equal(unchanged,221);
});
test('Barbara guide buttons describe the shared context, select actual HE/EN editions and native captions in all five languages',()=>{
 const p=window.WROC_CATALOG.getPlace('barbara-wroclaw');assert.equal(p.media.photos.length,7);assert.equal(p.media.videos.length,3);
 for(const lang of['he','en','pl','de','cs']){const url=window.WROC_GUIDE_VIDEO.sourceFor(p.id,lang);assert.equal(url,lang==='he'?'https://youtube.com/shorts/Eyns7Gj66d0':'https://youtube.com/shorts/pIzp5Bmb9ck');const html=window.WROC_GUIDE_VIDEO.button(p.id,lang);assert.ok(html.includes(p.provenance.guideContextLabel[lang]));assert.match(window.WROC_GUIDE_VIDEO.embedUrlFor(url,lang),new RegExp('cc_lang_pref='+lang));const icon=window.WROC_GUIDE_VIDEO.decorateIcon({html:'B',className:''},p,lang);assert.match(icon.html,/guide-marker-badge/);}
});
test('Day2 contains exactly nine distinct island canonical stops and one garden, while days1,3,4 stay exact',()=>{
 for(const[day,h]of Object.entries(b.unchangedDayHashes))assert.equal(hash(window.PREMIUM_STOPS.filter(s=>s.day===Number(day))),h,'day'+day);
 const day=window.PREMIUM_STOPS.filter(s=>s.day===2),ids=['most-tumski','st-martin-church-wroclaw','piastowska-pieczec-wroclaw','kawiarenka-sw-jadwigi','wroclaw-botanical-garden','cathedral','the-bridge','lwia-brama-restaurant-wroclaw','ostrow'];assert.equal(day.length,14);
 for(const id of ids){const rows=day.filter(s=>s.canonicalPlaceId===id||s.id===id);assert.equal(rows.length,1,id);for(const lang of['he','en','pl','de','cs'])assert.ok(rows[0].name[lang]);}
 assert.equal(window.PREMIUM_RECOMMENDATIONS.filter(s=>s.id==='wroclaw-botanical-garden').length,0);
});
