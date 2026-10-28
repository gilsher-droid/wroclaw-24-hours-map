import {beforeFourDenominationsMedia} from './four-denominations-media-historical-baseline.mjs';
import {beforePanPrecelMedia} from './pan-precel-media-historical-baseline.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import {createHash} from 'node:crypto';
const f=JSON.parse(readFileSync('data/fourday-full-source-oct22-preservation.json'));
const window={location:{origin:'https://wroc-love.com'}},document={documentElement:{lang:'he'},addEventListener(){}};
for(const p of ['data/place-catalog.js','youtube-video.js','data/location-media.js','guide-video.js'])runInNewContext(readFileSync(p,'utf8'),{window,document,console,URLSearchParams});
const plain=x=>JSON.parse(JSON.stringify(beforeFourDenominationsMedia(beforePanPrecelMedia(x)))),hash=x=>createHash('sha256').update(JSON.stringify(beforeFourDenominationsMedia(beforePanPrecelMedia(x)))).digest('hex');
test('Fourday source additions preserve229 unrelated canonical records and both place identities, heroes, guides, links and existing media',()=>{
 let n=0;for(const[id,h]of Object.entries(f.recordHashes)){const p=plain(beforeFourDenominationsMedia(window.WROC_CATALOG.getPlace(id)));if(!f.authorizedIds.includes(id)){assert.equal(hash(p),h,id);n++;continue;}const old=f.places[id];for(const key of ['id','localName','name','description','location','links','socialPosts','sourceRecords','categories'])assert.deepEqual(p[key],old[key],id+':'+key);assert.equal(p.media.thumbnail,old.media.thumbnail);assert.deepEqual(p.media.guideVideos,old.media.guideVideos);for(const a of old.media.photos)assert.ok(p.media.photos.includes(a));for(const v of old.media.videos)assert.ok(p.media.videos.includes(v));}assert.equal(n,229);
});
test('All nine new full source images and two shared pond views reach the actual localized galleries',()=>{
 assert.equal(Object.keys(f.newPhotoAssets).length,9);for(const[id,n]of [['slodowa',12],['hala',17]]){const p=beforeFourDenominationsMedia(window.WROC_CATALOG.getPlace(id));assert.equal(p.media.photos.length,n);assert.equal(new Set(p.media.photos).size,n);assert.deepEqual(plain(p.media.photos),f.expectedPhotos[id]);assert.deepEqual(plain(window.WROC_LOCATION_MEDIA[id].gallery),plain(p.media.photos));}
 for(const[a,r]of Object.entries(f.newPhotoAssets)){assert.equal(createHash('sha256').update(readFileSync('.'+a)).digest('hex'),r.sha256,a);const m=beforeFourDenominationsMedia(window.WROC_CATALOG.getPlace(r.canonicalId)).media.metadata[a];assert.equal(m.sourceSHA256,r.sourceSHA256);assert.equal(m.originalFullPicturePreserved,true);for(const l of ['he','en','pl','de','cs'])assert.ok(m.alt[l]?.trim(),a+':'+l);if(a.endsWith('/hala-21.jpg'))assert.equal(m.approvalCall,'call_3be7eb9c2fcc41c5b196b7ca8024e085');}
 const css=readFileSync('cultural.css','utf8');for(const a of ['/assets/multimedia-fountain-04.jpg','/assets/multimedia-fountain-05.jpg']){assert.ok(beforeFourDenominationsMedia(window.WROC_CATALOG.getPlace('hala')).media.photos.includes(a));assert.ok(css.includes(a.replace('/assets','')));for(const l of ['he','en','pl','de','cs'])assert.ok(beforeFourDenominationsMedia(window.WROC_CATALOG.getPlace('hala')).media.metadata[a].alt[l]);}
});
test('Both specifically approved Public visits retain their user-corrected Hall/Japanese playlist assignments and retain source provenance without replacing existing visits or guides',()=>{
 assert.equal(f.publicVisits.length,2);const p=beforeFourDenominationsMedia(window.WROC_CATALOG.getPlace('hala'));assert.equal(p.media.videos.length,5);for(const r of f.publicVisits){const targetId=r.url.includes('oeTVQpkK7kU')?'japanese':'hala';const target=beforeFourDenominationsMedia(window.WROC_CATALOG.getPlace(targetId));assert.ok(target.media.videos.includes(r.url));assert.ok(window.WROC_LOCATION_MEDIA[targetId].videos.some(v=>(typeof v==='string'?v:v.src)===r.url));const m=target.media.metadata[r.url];assert.equal(m.visibility,'Public');assert.equal(m.publicReopened,true);assert.equal(m.silent,true);assert.equal(m.sourceSHA256,r.sourceSHA256);assert.equal(m.approvalCall,'call_7ef0c1d7152d49928c1bb47d115f02e7');assert.equal(m.originalFullPicturePreserved,true);for(const l of['he','en','pl','de','cs'])assert.ok(m.title[l]);}
});
