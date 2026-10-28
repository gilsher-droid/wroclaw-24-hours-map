import {beforeFourDenominationsMedia} from './four-denominations-media-historical-baseline.mjs';
import {beforePanPrecelMedia} from './pan-precel-media-historical-baseline.mjs';
import {historicalPlaceIds} from './historical-catalog-scope.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {runInNewContext} from 'node:vm';
const proof=JSON.parse(readFileSync('data/forum-kulinarne-oct27-preservation.json'));
const window={};
for(const f of ['data/place-catalog.js','data/location-media.js','data/lifestyle-places.js'])runInNewContext(readFileSync(f,'utf8'),{window});
const plain=v=>JSON.parse(JSON.stringify(beforeFourDenominationsMedia(beforePanPrecelMedia(v))));
const hash=v=>createHash('sha256').update(v).digest('hex');
test('Forum Kulinarne preserves all232 earlier canonicals and existing routes exactly',()=>{
 assert.equal(Object.keys(proof.existingRecordHashes).length,232);
 assert.equal(historicalPlaceIds(window.WROC_CATALOG.places).length,233);
 for(const[id,expected]of Object.entries(proof.existingRecordHashes))assert.equal(hash(JSON.stringify(beforeFourDenominationsMedia(beforePanPrecelMedia(window.WROC_CATALOG.places[id])))),expected,id);
 // The later Poznan test hashes all six existing excursion objects separately.
 for(const[file,expected]of Object.entries(proof.unchangedSourceFileHashes).filter(([file])=>file!=='data/lower-silesia-excursions.js'))assert.equal(hash(readFileSync(file)),expected,file);
});
test('The verified Forum facade is one full original in one Lifestyle food point with no generic social action',()=>{
 const p=beforeFourDenominationsMedia(window.WROC_CATALOG.getPlace(proof.canonicalId)),media=p.media,src=media.photos[0],metadata=media.metadata[src];
 assert.deepEqual(plain(p.location.coordinates),{lat:51.106514,lng:17.0297567});
 assert.equal(p.location.address.street,'Plac Wolności 4');
 assert.deepEqual(plain(media.videos),[]);assert.equal(media.photos.length,1);
 assert.equal(hash(readFileSync('.'+src)),'8a970b9e91f3a10d3e999eeef0efcfa6884f13ec715b38ca8fb22feca608a196');
 assert.equal(metadata.assetSHA256,metadata.sourceSHA256);assert.equal(metadata.originalFullPicturePreserved,true);assert.equal(metadata.incidentalPublicPedestrians,true);
 assert.deepEqual(plain(p.sourceRecords.map(r=>r.productId)),['lifestyle-guide']);
 const records=window.WROC_LIFESTYLE_PLACES.filter(r=>r.canonicalPlaceId===p.id||r.id===p.id);assert.equal(records.length,1);assert.deepEqual(plain(records[0].categories),['eat']);
 assert.deepEqual(plain(window.WROC_LOCATION_MEDIA[p.id].gallery),plain(media.photos));
 // The existing Lifestyle renderer collapses description newlines; keep this Hebrew field free of Latin text.
 assert.doesNotMatch(p.description.he,/[A-Za-z]/);
 assert.deepEqual(plain(p.socialPosts),[]);assert.equal(p.links.socialProfileFallback,false);
 assert.equal(new URL(p.links.navigation.googleMaps).searchParams.get('query'),'51.106514,17.0297567');
 for(const lang of ['he','en','pl','de','cs']){assert.ok(p.name[lang]);assert.ok(p.description[lang]);assert.ok(metadata.alt[lang]);assert.equal(window.WROC_CATALOG.getSocialPost(p,'facebook',lang),null);assert.equal(window.WROC_CATALOG.getSocialPost(p,'instagram',lang),null);}
});
