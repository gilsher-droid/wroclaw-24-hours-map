import {beforeNamedWroclawSnapshot} from './named-wroclaw-media-historical-baseline.mjs';
import {readFileSync} from 'node:fs';import vm from 'node:vm';import crypto from 'node:crypto';import assert from 'node:assert/strict';import test from 'node:test';
import {beforeBotanicalMedia,beforeBotanicalGallery} from './botanical-media-historical-baseline.mjs';
const w={};for(const f of ['data/place-catalog.js','data/location-media.js','data/lower-silesia-excursions.js'])vm.runInNewContext(readFileSync(f,'utf8'),{window:w});beforeNamedWroclawSnapshot(w);
const plain=x=>JSON.parse(JSON.stringify(x));const hash=x=>crypto.createHash('sha256').update(Buffer.isBuffer(x)?x:JSON.stringify(x)).digest('hex');
const baseline=JSON.parse(readFileSync('tests/fixtures/botanical-oct28-preintegration.json'));const manifest=JSON.parse(readFileSync('data/botanical-oct28-media-provenance.json'));const current=w.WROC_CATALOG.getPlace(manifest.canonicalID);
test('Botanical media preserves all298 other places, aliases, nine trips, identity, visit videos and guides',()=>{
 assert.equal(Object.keys(w.WROC_CATALOG.places).length,299);for(const[id,h]of Object.entries(baseline.recordHashes))if(id!==current.id)assert.equal(hash(w.WROC_CATALOG.getPlace(id)),h,id);
 assert.deepEqual(plain(w.WROC_CATALOG.aliases),baseline.aliases);assert.equal(w.WROC_LOWER_SILESIA_EXCURSIONS.excursions.length,9);for(const[id,h]of Object.entries(baseline.tripHashes))assert.equal(hash(w.WROC_LOWER_SILESIA_EXCURSIONS.excursions.find(t=>t.id===id)),h,id);
 assert.deepEqual(beforeBotanicalMedia(current),baseline.targetBefore);for(const[k,v]of Object.entries(baseline.targetBefore.media))if(!['photos','metadata','videos'].includes(k))assert.deepEqual(plain(current.media[k]),v,k);
 assert.deepEqual(plain(current.media.videos.slice(0,5)),baseline.targetBefore.media.videos);for(const url of baseline.targetBefore.media.videos)assert.deepEqual(plain(current.media.metadata[url]),baseline.targetBefore.media.metadata[url]);
});
test('Only four specifically approved and verified Public visit sources are appended',()=>{
 const sources={5:'d8b2e33b9c35048e3b1640091c40db1336e717927fcade51fd97bcd4f5e25a72',8:'8e4c52089cdf993de0ee6c837dddae6eb457d8a50c9bff9f98a0b333825378ca',15:'3401bf4d51266e55160c59d26a1d05764fba22a456716b6dc68dbf6872fcd484',21:'3d10b59bb41c9e647a6e010f9b25fb267b161ad0685efe478dbd1bc32a2098fb'};
 assert.equal(current.media.videos.length,9);assert.equal(new Set(current.media.videos).size,9);assert.equal(manifest.visitAdditions.length,4);assert.deepEqual(manifest.visitAdditions.map(x=>x.sourceIndex),[5,8,15,21]);
 for(const item of manifest.visitAdditions){assert.equal(item.sourceSHA256,sources[item.sourceIndex]);assert.ok(current.media.videos.includes(item.url));const metadata=current.media.metadata[item.url];assert.equal(metadata.sourceSHA256,item.sourceSHA256);assert.equal(metadata.uploadSHA256,item.sourceSHA256);assert.equal(metadata.visibility,'Public');assert.equal(metadata.savedPublicVerified,true);assert.equal(metadata.actualPlaybackVerified,true);assert.equal(metadata.checks,'complete-no-issues');assert.equal(metadata.originalPictureUnchanged,true);assert.equal(metadata.originalAudioUnchanged,true);assert.equal(metadata.audioRemoved,false);for(const lang of ['he','en','pl','de','cs'])assert.ok(metadata.title[lang]);}
 assert.deepEqual(plain(w.WROC_LOCATION_MEDIA[current.id].videos.map(v=>v.src)),plain(current.media.videos));
});
test('All51 reviewed full originals are present exactly once with source bytes and five-language alt text',()=>{
 assert.equal(current.media.photos.length,52);assert.equal(new Set(current.media.photos).size,52);assert.deepEqual(plain(w.WROC_LOCATION_MEDIA[current.id].gallery),plain(current.media.photos));assert.equal(manifest.assets.length,51);assert.equal(new Set(manifest.assets.map(x=>x.sourceSHA256)).size,51);
 for(const a of manifest.assets){assert.ok(current.media.photos.includes(a.asset));assert.equal(hash(readFileSync('.'+a.asset)),a.sourceSHA256);const m=current.media.metadata[a.asset];assert.equal(m.sourceSHA256,a.sourceSHA256);assert.equal(m.assetSHA256,a.sourceSHA256);assert.equal(m.originalFullPicturePreserved,true);assert.equal(m.userPreparedPeopleRemoval,false);for(const l of ['he','en','pl','de','cs'])assert.ok(m.alt[l]);assert.match(m.personalScopeApproval,/botanical-new-inbox/);}
 for(const a of manifest.historicalEditedGalleryEntriesRetired)assert.ok(!current.media.photos.includes(a));assert.equal(current.media.thumbnail,baseline.targetBefore.media.thumbnail);
});
test('Garden historical projection rejects identity, link, picture, order and adapter mutations',()=>{
 assert.deepEqual(beforeBotanicalGallery(current.media.photos,current.id),baseline.targetBefore.media.photos);assert.throws(()=>beforeBotanicalGallery([...current.media.photos].reverse(),current.id));
 for(const mutate of [x=>x.location.coordinates.lat+=.01,x=>x.links.website='https://example.invalid',x=>x.media.photos.reverse(),x=>x.media.metadata[x.media.photos[1]].sourceSHA256='bad',x=>x.media.videos.push('https://youtu.be/unapproved')]){const x=plain(current);mutate(x);assert.throws(()=>beforeBotanicalMedia(x));}
 assert.equal(beforeBotanicalMedia(w.WROC_CATALOG.getPlace('four-denominations-district')),w.WROC_CATALOG.getPlace('four-denominations-district'));
});

