import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const window={},plain=v=>JSON.parse(JSON.stringify(v));
for(const f of ['data/place-catalog.js','data/location-media.js'])runInNewContext(readFileSync(f,'utf8'),{window,console});
const c=window.WROC_CATALOG,b=JSON.parse(readFileSync('data/full-media-refresh-baseline-20261022.json'));
test('The full media refresh preserves all219 other canonical records and every existing identity and coordinate',()=>{
 assert.equal(Object.keys(c.places).length,231);assert.equal(b.authorizedIds.length,12);let unchanged=0;
 for(const[id,old]of Object.entries(b.places)){const p=plain(c.getPlace(id));if(!b.authorizedIds.includes(id)){assert.deepEqual(p,old,id);unchanged++;}else{assert.equal(p.id,old.id);assert.deepEqual(p.location,old.location,id+':location');}}
 assert.equal(unchanged,219);
});
test('All full-folder photographs and seven approved Public visits are exposed through actual route media adapters',()=>{
 const expected={papa:18,rynek:35,'town-hall':5,'marietta-focacceria-wroclaw':2,jatki:3,'math-tower':6,ossolineum:13,university:5,aula:8,'jas-malgosia':1};
 for(const[id,count]of Object.entries(expected)){const p=c.getPlace(id);assert.equal(p.media.photos.length,count,id);assert.deepEqual(plain(window.WROC_LOCATION_MEDIA[id].gallery),plain(p.media.photos),id+':actual gallery');for(const src of p.media.photos)assert.ok(existsSync(src.slice(1)),src);}
 const visits=JSON.parse(readFileSync('data/full-media-public-visits-20261022.json'));assert.equal(visits.length,7);assert.equal(new Set(visits.map(v=>v.id)).size,7);
 for(const v of visits){assert.equal(v.visibility,'Public');assert.equal(v.reopenedPublic,true);const p=c.getPlace(v.canonicalId);assert.ok(p.media.videos.includes(v.url));assert.ok(window.WROC_LOCATION_MEDIA[p.id].videos.some(x=>(typeof x==='string'?x:x.src)===v.url));assert.equal(p.media.metadata[v.url].sourceSHA256,v.sourceSHA256);assert.equal(p.media.metadata[v.url].fullPicturePreserved,true);assert.equal(p.media.metadata[v.url].silent,true);}
 assert.deepEqual(plain(c.getPlace('papa').media.guideVideos),b.places.papa.media.guideVideos);
});
test('The approved surroundings/people photographs stay full while Aula interiors belong to the Aula card',()=>{
 const r=c.getPlace('rynek');assert.ok(r.media.photos.includes('/assets/full-enrichment-20261022/rynek-01.jpg'));assert.ok(c.getPlace('jas-malgosia').media.photos.includes('/assets/rynek-refresh-oct19-05.jpg'));
 const uni=c.getPlace('university'),aula=c.getPlace('aula');for(const src of ['/assets/gallery-university-02.jpg','/assets/gallery-university-04.jpg']){assert.ok(!uni.media.photos.includes(src));assert.ok(aula.media.photos.includes(src));}assert.equal(uni.media.thumbnail,'/assets/gallery-university-01.jpg');
 for(const css of ['cultural.css','lifestyle.css'])assert.match(readFileSync(css,'utf8'),/full-enrichment-20261022\/[\s\S]*?object-fit:contain/);
});
test('Sand Island hides both social actions in all languages; Sand Bridge keeps Instagram and specific written Facebook posts',()=>{
 for(const lang of ['he','en','pl','de','cs']){assert.equal(c.getSocialPost(c.getPlace('wyspa-piasek'),'facebook',lang),null);assert.equal(c.getSocialPost(c.getPlace('wyspa-piasek'),'instagram',lang),null);const now=c.getSocialPost(c.getPlace('most-piaskowy'),'instagram',lang),old=b.places['most-piaskowy'].socialPosts.find(x=>x.platform==='instagram'&&x.language===lang);assert.ok(now);if(old)assert.equal(now.url,old.url);const fb=c.getSocialPost(c.getPlace('most-piaskowy'),'facebook',lang);if(lang==='he')assert.equal(fb,null);else assert.match(fb.url,/facebook\.com\/\d+\/posts\/\d+\//);}
});

test("Aula cultural photographs preserve the entire interiors and the main route summary counts its displayed optional garden",()=>{const css=readFileSync("cultural.css","utf8");assert.match(css,/gallery-university-[\s\S]*?aula-leopoldina-[\s\S]*?object-fit:contain/);assert.match(readFileSync("cultural.html","utf8"),/cultural\.css\?v=20261022-aula-full-frame/);assert.match(readFileSync("map.html","utf8"),/data-route-stop-count>15</);assert.match(readFileSync("app.js","utf8"),/data-route-stop-count[\s\S]*?String\(window.LOCATIONS.length\)/);});
