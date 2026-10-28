import {beforePanPrecelMedia} from './pan-precel-media-historical-baseline.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import {createHash} from 'node:crypto';
const f=JSON.parse(readFileSync('data/cafe-japanese-full-source-oct22-preservation.json'));
const window={location:{origin:'https://wroc-love.com'}},document={documentElement:{lang:'he'},addEventListener(){}};
for(const file of ['data/place-catalog.js','youtube-video.js','data/location-media.js','guide-video.js'])runInNewContext(readFileSync(file,'utf8'),{window,document,console,URLSearchParams});
const plain=x=>JSON.parse(JSON.stringify(beforePanPrecelMedia(x))),hash=x=>createHash('sha256').update(JSON.stringify(beforePanPrecelMedia(x))).digest('hex');
test('Café/Japanese full-source delta preserves229 unrelated records and both existing place identities, routes, heroes, links and guides',()=>{
 let n=0;for(const[id,h]of Object.entries(f.recordHashes)){const p=plain(window.WROC_CATALOG.getPlace(id));if(!f.authorizedIds.includes(id)){assert.equal(hash(p),h,id);n++;continue;}const old=f.places[id];for(const k of Object.keys(old).filter(k=>k!=='media'))assert.deepEqual(p[k],old[k],id+':'+k);assert.equal(p.media.thumbnail,old.media.thumbnail);assert.deepEqual(p.media.guideVideos,old.media.guideVideos);for(const a of old.media.photos)assert.ok(p.media.photos.includes(a));for(const v of old.media.videos)assert.ok(p.media.videos.includes(v));}assert.equal(n,229);
});
test('All24 distinct full photographs reach actual map galleries, exact personal approvals stay scoped, and rejected family images stay absent',()=>{
 assert.equal(Object.keys(f.newPhotoAssets).length,24);for(const[id,n]of [['kawiarenka-sw-jadwigi',36],['japanese',9]]){const p=window.WROC_CATALOG.getPlace(id);assert.equal(p.media.photos.length,n);assert.deepEqual(plain(window.WROC_LOCATION_MEDIA[id].gallery),plain(p.media.photos));assert.equal(new Set(p.media.photos).size,n);}
 for(const[a,r]of Object.entries(f.newPhotoAssets)){assert.equal(createHash('sha256').update(readFileSync('.'+a)).digest('hex'),r.sha256,a);const m=window.WROC_CATALOG.getPlace(r.canonicalId).media.metadata[a];assert.equal(m.sourceSHA256,r.sourceSHA256);assert.equal(m.originalFullPicturePreserved,true);for(const l of ['he','en','pl','de','cs'])assert.ok(m.alt[l]?.trim());}
 assert.equal(window.WROC_CATALOG.getPlace('japanese').media.metadata['/assets/round24h-20261022/japanese-approved-05.jpg'].approvalCall,'call_64a7ea5779114d3daff52e641752d205');assert.equal(window.WROC_CATALOG.getPlace('kawiarenka-sw-jadwigi').media.metadata['/assets/round24h-20261022/jadwigi-05.jpg'].approvalCall,'call_1924ba7022b94bc6ba5dc388e7b96f9c');
 const rejected=['a9350d322249741fea4275bf63f04ab4d9880d12718f919b91fb6453e67151f3','14f941f68b5a4321b1665fdfbe622bbd28dbd47cb1d3ade3bd484c4a69c04a9f','83a6b1150c043310f3118fea6b89680b6b185576594da1498b10dcd56e2423c8','46fdba453c9322e9c41c358eec1b0a39e885371376b578ac36e4d4a0feba8334'];const p=window.WROC_CATALOG.getPlace('japanese');for(const a of p.media.photos)assert.ok(!rejected.includes(p.media.metadata?.[a]?.sourceSHA256));
});
test('All four approved Public silent full visits append to the café playlist without replacing its nine existing visits',()=>{
 const p=window.WROC_CATALOG.getPlace('kawiarenka-sw-jadwigi');assert.equal(p.media.videos.length,13);assert.equal(f.publicVisits.length,4);for(const r of f.publicVisits){assert.ok(p.media.videos.includes(r.url));assert.ok(window.WROC_LOCATION_MEDIA[p.id].videos.some(v=>(typeof v==='string'?v:v.src)===r.url));const m=p.media.metadata[r.url];assert.equal(m.sourceSHA256,r.sourceSHA256);assert.equal(m.visibility,'Public');assert.equal(m.publicReopened,true);assert.equal(m.sdProcessingComplete,true);assert.equal(m.silent,true);assert.equal(m.originalFullPicturePreserved,true);assert.equal(m.approvalCall,'call_a4f0fcdb0ba148e7969b655c4b7e99ce');for(const l of ['he','en','pl','de','cs'])assert.ok(m.title[l]);}
});
