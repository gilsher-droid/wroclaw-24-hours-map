import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import {createHash} from 'node:crypto';
const f=JSON.parse(readFileSync('data/four-venues-fourteen-photos-reuse-oct23-preservation.json'));
const window={};for(const file of ['data/place-catalog.js','data/canonical-experiences.js','data/lifestyle-places.js','data/location-media.js','data/cultural-places.js'])runInNewContext(readFileSync(file,'utf8'),{window,console});
const plain=x=>x===undefined?undefined:JSON.parse(JSON.stringify(x)),hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
test('Four venue gallery additions preserve227 other records and all existing identities, locations, heroes, guides, posts and visits',()=>{
 let unchanged=0;for(const[id,h]of Object.entries(f.recordHashes)){const p=plain(window.WROC_CATALOG.getPlace(id));if(!f.authorizedIds.includes(id)){assert.equal(hash(p),h,id);unchanged++;continue;}const old=f.places[id];for(const k of Object.keys(old).filter(k=>k!=='media'))assert.deepEqual(p[k],old[k],id+'.'+k);for(const k of Object.keys(old.media).filter(k=>!['photos','metadata'].includes(k)))assert.deepEqual(p.media[k],old.media[k],id+'.media.'+k);assert.deepEqual(p.media.photos.slice(0,old.media.photos.length),old.media.photos);for(const[k,v]of Object.entries(old.media.metadata||{}))assert.deepEqual(p.media.metadata[k],v);}assert.equal(unchanged,227);
});
test('Fourteen new assets and one exact existing asset reach all four actual galleries with complete pictures and five captions',()=>{
 assert.equal(f.items.length,15);assert.equal(new Set(f.items.map(r=>r.asset)).size,15);
 for(const[id,n]of Object.entries(f.expectedPhotoCounts)){const rows=window.WROC_LIFESTYLE_PLACES.filter(p=>p.id===id);assert.equal(rows.length,1,id+'onecard');assert.equal(rows[0].mediaKey,id,id+'gallery-action-key');const p=window.WROC_CATALOG.getPlace(id);assert.equal(p.media.photos.length,n,id);assert.deepEqual(plain(window.WROC_LOCATION_MEDIA[id].gallery),plain(p.media.photos),id+'adapter');assert.deepEqual(plain(window.WROC_LOCATION_MEDIA[id].videos),f.adapterVideos[id]);}
 for(const r of f.items){const p=window.WROC_CATALOG.getPlace(r.canonicalId),m=p.media.metadata[r.asset];assert.equal(p.media.photos.filter(v=>v===r.asset).length,1);assert.equal(hashFile(r.asset),r.assetSHA256);if(r.canonicalId!=='woosabi-swidnicka-wroclaw')assert.equal(m.sourceSHA256,r.sha256);assert.equal(m.originalFullPicturePreserved,true);assert.equal(m.familyExceptionApplied,false);if(!r.reuseExistingAsset)assert.ok(Math.abs(r.sourceDimensions[0]/r.sourceDimensions[1]-r.assetDimensions[0]/r.assetDimensions[1])<0.001);for(const l of ['he','en','pl','de','cs'])assert.ok(m.alt[l]);}
 assert.equal(f.newAssetCount,14);assert.equal(f.reusedAssetBindingCount,1);
 const reused=f.items.find(r=>r.canonicalId==='woosabi-swidnicka-wroclaw');assert.equal(reused.asset,'/assets/hotels-20261020/hotel-traffic-wroclaw-14.jpg');assert.ok(window.WROC_CATALOG.getPlace('hotel-traffic-wroclaw').media.photos.includes(reused.asset));

});
function hashFile(asset){return createHash('sha256').update(readFileSync('.'+asset)).digest('hex');}

test("Both map styles preserve full cafe photographs and pages load the updated rule",()=>{for(const kind of["lifestyle","cultural"]){const css=readFileSync(kind+".css","utf8");assert.match(css,/\.media-grid img\[src\*="\/food-round-oct23\/"\]\{height:auto;max-height:78vh;object-fit:contain/);assert.match(readFileSync(kind+".html","utf8"),new RegExp(kind+"\\.css\\?v=20261023-food-round-full-picture"));}});
