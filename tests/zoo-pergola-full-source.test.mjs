import {beforePanPrecelMedia} from './pan-precel-media-historical-baseline.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import {createHash} from 'node:crypto';
const f=JSON.parse(readFileSync('data/zoo-pergola-full-source-oct22-preservation.json'));
const window={location:{origin:'https://wroc-love.com'}},document={documentElement:{lang:'he'},addEventListener(){}};
for(const file of ['data/place-catalog.js','youtube-video.js','data/location-media.js','guide-video.js'])runInNewContext(readFileSync(file,'utf8'),{window,document,console,URLSearchParams});
const plain=x=>JSON.parse(JSON.stringify(beforePanPrecelMedia(x))),hash=x=>createHash('sha256').update(JSON.stringify(beforePanPrecelMedia(x))).digest('hex');
test('Zoo/Pergola/source correction preserves227 unrelated records and all four place identities, routing, heroes, links and guides',()=>{
 let n=0;for(const[id,h]of Object.entries(f.recordHashes)){const p=plain(window.WROC_CATALOG.getPlace(id));if(!f.authorizedIds.includes(id)){assert.equal(hash(p),h,id);n++;continue;}const old=f.places[id];for(const k of Object.keys(old).filter(k=>k!=='media'))assert.deepEqual(p[k],old[k],id+':'+k);assert.equal(p.media.thumbnail,old.media.thumbnail);assert.deepEqual(p.media.guideVideos,old.media.guideVideos);for(const a of old.media.photos)assert.ok(p.media.photos.includes(a));for(const v of old.media.videos){if(id==='hala'&&v.includes(f.removedMistakenHallVisit))continue;assert.ok(p.media.videos.includes(v));}}assert.equal(n,227);
});
test('All50 distinct full-frame photos reach actual map gallery bindings with scoped personal approvals and preserved source hashes',()=>{
 assert.equal(f.newPhotoAssets.length,50);for(const[id,n]of Object.entries(f.expectedPhotos)){const p=window.WROC_CATALOG.getPlace(id);assert.equal(p.media.photos.length,n,id);assert.deepEqual(plain(window.WROC_LOCATION_MEDIA[id].gallery),plain(p.media.photos));assert.equal(new Set(p.media.photos).size,n);}
 for(const r of f.newPhotoAssets){assert.equal(createHash('sha256').update(readFileSync('.'+r.asset)).digest('hex'),r.assetSHA256,r.asset);const m=window.WROC_CATALOG.getPlace(r.canonicalId).media.metadata[r.asset];assert.equal(m.sourceSHA256,r.sourceSHA256);assert.equal(m.originalFullPicturePreserved,true);for(const l of ['he','en','pl','de','cs'])assert.ok(m.alt[l]?.trim());}
 const m=window.WROC_CATALOG.getPlace('zoo-wroclaw').media.metadata;
 for(const a of ['zoo-53.jpg','zoo-55.jpg'])assert.equal(m['/assets/round24h-20261022/'+a].approvalCall,'call_a68c7100035c402e8a8127c58746d7cd');assert.equal(m['/assets/round24h-20261022/zoo-49.jpg'].approvalCall,'call_75edc9bb3de243778c5d0c20b9d98242');
});
test('User-identified Japanese entrance reuses the existing Public ID and removes its mistaken Hall assignment; Pergola approach reuses fountain video',()=>{
 const j=window.WROC_CATALOG.getPlace('japanese'),h=window.WROC_CATALOG.getPlace('hala'),p=window.WROC_CATALOG.getPlace('pergola');assert.ok(j.media.videos.some(u=>u.includes('oeTVQpkK7kU')));assert.ok(!h.media.videos.some(u=>u.includes('oeTVQpkK7kU')));assert.equal(j.media.metadata[j.media.videos.find(u=>u.includes('oeTVQpkK7kU'))].identityClarificationCall,'call_32c2d237c98842c79f52f0c8b9e439c7');assert.ok(p.media.videos.some(u=>u.includes('U7TyifQyg7k')));assert.equal(p.media.metadata[p.media.videos.find(u=>u.includes('U7TyifQyg7k'))].existingPublicVideoReused,true);
});
test('All nine new Public visits appear once in shared map playlists with source stream preservation and localized titles',()=>{
 assert.equal(f.newVisits.length,9);for(const[id,count]of Object.entries(f.expectedVideos))assert.equal(window.WROC_CATALOG.getPlace(id).media.videos.length,count,id);
 for(const x of f.newVisits){const p=window.WROC_CATALOG.getPlace(x.id);assert.equal(p.media.videos.filter(u=>u===x.url).length,1);assert.ok(window.WROC_LOCATION_MEDIA[x.id].videos.some(v=>(typeof v==='string'?v:v.src).includes(new URL(x.url).searchParams.get('v'))));const m=p.media.metadata[x.url];assert.equal(m.publicReopened,true);assert.equal(m.visibility,'Public');assert.equal(m.termsApprovalCall,'call_9f6e3c489c324bd9b8919083b9c52940');assert.ok(m.pictureStreamSHA256);for(const l of ['he','en','pl','de','cs'])assert.ok(m.title[l]?.trim());}
});
