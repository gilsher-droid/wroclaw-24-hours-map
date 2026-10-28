import {beforeNamedWroclawSnapshot} from './named-wroclaw-media-historical-baseline.mjs';
import {beforeFourDenominationsMedia} from './four-denominations-media-historical-baseline.mjs';
import {beforePanPrecelMedia} from './pan-precel-media-historical-baseline.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import {createHash} from 'node:crypto';
const f=JSON.parse(readFileSync('data/fourday-next-full-source-preservation.json'));
const window={location:{origin:'https://wroc-love.com'}},document={documentElement:{lang:'he'},addEventListener(){}};
for(const file of ['data/place-catalog.js','youtube-video.js','data/location-media.js','guide-video.js'])runInNewContext(readFileSync(file,'utf8'),{window,document,console,URLSearchParams});beforeNamedWroclawSnapshot(window);
const plain=x=>JSON.parse(JSON.stringify(beforeFourDenominationsMedia(beforePanPrecelMedia(x)))),hash=x=>createHash('sha256').update(JSON.stringify(beforeFourDenominationsMedia(beforePanPrecelMedia(x)))).digest('hex');
test('Full-folder photo additions preserve222 unrelated records and9 canonical identities, existing media, representative covers and links',()=>{
 let n=0;for(const[id,h]of Object.entries(f.recordHashes)){const p=plain(beforeFourDenominationsMedia(window.WROC_CATALOG.getPlace(id)));if(!f.authorizedIds.includes(id)){assert.equal(hash(p),h,id);n++;continue;}const old=f.places[id];for(const k of Object.keys(old).filter(k=>k!=='media'))assert.deepEqual(p[k],old[k],id+':'+k);for(const k of ['thumbnail','guideVideos'])assert.deepEqual(p.media[k],old.media[k],id+':'+k);const laterVisits=JSON.parse(readFileSync('data/remaining-fourteen-visit-publication-oct23.json')).patches;if(Object.hasOwn(laterVisits,id))assert.deepEqual(p.media.videos.slice(0,old.media.videos.length),old.media.videos,id+':existing-visits');else assert.deepEqual(p.media.videos,old.media.videos,id+':videos');for(const a of old.media.photos)assert.ok(p.media.photos.includes(a));}assert.equal(n,222);
});
test('All48 distinct full-frame photo assets are exposed by shared gallery bindings with complete localized captions and exact source provenance',()=>{
 assert.equal(f.newPhotoAssets.length,48);for(const[id,n]of Object.entries(f.expectedPhotos)){const p=beforeFourDenominationsMedia(window.WROC_CATALOG.getPlace(id));assert.equal(p.media.photos.length,n,id);assert.deepEqual(plain(window.WROC_LOCATION_MEDIA[id].gallery),plain(p.media.photos));assert.equal(new Set(p.media.photos).size,n);}
 for(const r of f.newPhotoAssets){assert.equal(createHash('sha256').update(readFileSync('.'+r.asset)).digest('hex'),r.assetSHA256);const m=beforeFourDenominationsMedia(window.WROC_CATALOG.getPlace(r.canonicalId)).media.metadata[r.asset];assert.equal(m.sourceSHA256,r.sha256);assert.equal(m.originalFullPicturePreserved,true);for(const l of ['he','en','pl','de','cs'])assert.ok(m.alt[l]?.trim());}
 const b=beforeFourDenominationsMedia(window.WROC_CATALOG.getPlace('bastion')).media.metadata;assert.equal(b['/assets/round24h-20261022/bastion-01.jpg'].approvalCall,'call_4fd43e555b1f4b02965081a3dc4381b5');assert.equal(b['/assets/round24h-20261022/bastion-04.jpg'].approvalCall,'call_ed45bc52f64e4d89afe767f77aa30ce4');
});
