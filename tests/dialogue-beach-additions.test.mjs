import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {runInNewContext} from 'node:vm';
import {
  assertReviewedDialogueBeach,
  beforeDialogueBeachOnlySnapshot,
} from './dialogue-beach-historical-baseline.mjs';

const proof = JSON.parse(readFileSync('data/dialogue-beach-oct29-approved-additions.json'));
const plain = value => JSON.parse(JSON.stringify(value));
const hash = value => createHash('sha256').update(Buffer.isBuffer(value) ? value : JSON.stringify(value)).digest('hex');
function load(extra = []) {
  const window = {};
  for (const file of ['data/place-catalog.js', 'data/canonical-experiences.js', ...extra]) {
    runInNewContext(readFileSync(file, 'utf8'), {window});
  }
  return window;
}

test('Six separate additions preserve309 other records and the approved fields of3enrichments, aliases, excursions and video hosting', () => {
  const window = load(['data/lower-silesia-excursions.js', 'data/youtube-video-hosting.js']);
  const catalog = window.WROC_CATALOG;
  assert.equal(proof.newIds.length, 6);
  assert.deepEqual(proof.updatedIds,['zenka','jolie-kurzy-targ','lodziarnia-roma']);
  assert.equal(Object.keys(proof.beforeRecordHashes).length, 312);
  assert.equal(Object.keys(catalog.places).length, 318);
  for (const [id, beforeHash] of Object.entries(proof.beforeRecordHashes)) {
    if(!proof.updatedIds.includes(id))assert.equal(hash(catalog.places[id]), beforeHash, id);
  }
  assert.deepEqual(plain(catalog.aliases), proof.beforeAliases);
  assert.equal(hash(window.WROC_LOWER_SILESIA_EXCURSIONS), proof.beforeExcursionHash);
  assert.equal(hash(window.WROC_YOUTUBE_VIDEO_HOSTING), proof.beforeHostingHash);
  for (const [file, beforeHash] of Object.entries(proof.sourceFileHashes)) {
    assert.equal(hash(readFileSync(file)), beforeHash, file);
  }
  for (const id of proof.newIds) {
    assert.ok(catalog.places[id], id);
    assert.equal(hash(catalog.getPlace(id)), proof.approvedRecordHashes[id], id);
    for (const language of ['he', 'en', 'pl', 'de', 'cs']) {
      assert.ok(catalog.places[id].name[language]);
      assert.ok(catalog.places[id].description[language]);
    }
    assert.deepEqual(plain(catalog.places[id].socialPosts), []);
  }
});

test('The reviewed full photographs retain their exact selected bytes and canonical galleries', () => {
  const window = load(['data/location-media.js']);
  assert.equal(proof.assets.length,50);
  assert.equal(proof.assets.filter(x=>x.existingAssetReused).length,7);
  assert.equal(proof.assets.filter(x=>!x.existingAssetReused).length,43);
  assert.equal(new Set(proof.assets.map(row => row.asset)).size, proof.assets.length);
  for (const row of proof.assets) {
    assert.equal(hash(readFileSync(row.asset.slice(1))), row.assetSHA256, row.asset);
  }
  for (const [id, assets] of Object.entries(proof.bindings)) {
    const place = window.WROC_CATALOG.getPlace(id);
    assert.equal(new Set(place.media.photos).size, place.media.photos.length, id);
    assert.deepEqual(plain(place.media.photos), assets, id);
    assert.deepEqual(plain(window.WROC_LOCATION_MEDIA[id].gallery), assets, id);
    for (const asset of assets) {
      if(proof.assets.some(row=>row.asset===asset))assert.equal(place.media.metadata[asset].originalFullPicturePreserved,true,asset);
      else assert.deepEqual(plain(place.media.metadata[asset]),proof.beforeUpdatedRecords[id].media.metadata[asset],asset);
    }
  }
});

test('Two separate beach bars extend the prior Morskie Oko reference while all other experiences and old map memberships remain exact', () => {
  const window = load(['data/lifestyle-places.js', 'data/cultural-places.js']);
  assert.equal(window.WROC_LIFESTYLE_PLACES.length,101);
  assert.equal(window.WROC_CULTURAL_PLACES.length,51);
  assert.deepEqual(plain(window.WROC_CULTURAL_PLACES.find(x=>x.id==='przejscie-dialogu-wroclaw').categories),['community-culture']);
  assert.equal(window.WROC_CATALOG.getPlace('kepa-mieszczanska-wroclaw').placeType,'island-area');
  const beach = window.WROC_EXPERIENCE_CATALOG.getExperience(proof.beforeBeach.id);
  assert.equal(hash(beach), proof.approvedBeachHash);
  assert.equal(beach.relatedCanonicalPlaceIds.length, 3);
  assert.deepEqual(plain(beach.relatedCanonicalPlaceIds.slice(0, 1)), proof.beforeBeach.relatedCanonicalPlaceIds);
  assert.deepEqual(plain(beach.media.inheritFromCanonicalPlaceIds), plain(beach.relatedCanonicalPlaceIds));
  for (const [id, beforeHash] of Object.entries(proof.beforeOtherExperienceHashes)) {
    assert.equal(hash(window.WROC_EXPERIENCE_CATALOG.getExperience(id)), beforeHash, id);
  }
  for (const [field, hashes] of [
    ['WROC_LIFESTYLE_PLACES', proof.beforeLifestyleHashes],
    ['WROC_CULTURAL_PLACES', proof.beforeCulturalHashes],
  ]) {
    for (const [id, beforeHash] of Object.entries(hashes)) {
      if(!proof.updatedIds.includes(id))assert.equal(hash(window[field].find(row => row.id === id)), beforeHash, id);
    }
    for (const id of proof.newIds) assert.ok(window[field].filter(row => row.id === id).length <= 1, id);
  }
});

test('Historical projection rejects new-record and beach mutations and preserves custom reads of every old place', () => {
  const window = load(['data/location-media.js']);
  assertReviewedDialogueBeach(window.WROC_CATALOG.places);
  for (const id of proof.newIds) {
    const bad = plain(window.WROC_CATALOG.places);
    bad[id].description.en += ' unreviewed';
    assert.throws(() => assertReviewedDialogueBeach(bad), id);
  }
  const mutatedBeach = load();
  const registry=mutatedBeach.WROC_EXPERIENCE_CATALOG,badBeach=plain(registry.getExperience(proof.beforeBeach.id));
  badBeach.description.en += ' unreviewed';
  mutatedBeach.WROC_EXPERIENCE_CATALOG={...registry,getExperience:id=>id===proof.beforeBeach.id?badBeach:registry.getExperience(id)};
  assert.throws(() => beforeDialogueBeachOnlySnapshot(mutatedBeach));

  const oldId = Object.keys(proof.beforeRecordHashes)[0];
  const catalog = window.WROC_CATALOG;
  const originalGetPlace = catalog.getPlace;
  const sentinel = {...originalGetPlace(oldId), description: {en: 'unreviewed old place'}};
  window.WROC_CATALOG = {...catalog, getPlace: id => id === oldId ? sentinel : originalGetPlace(id)};
  const projected = beforeDialogueBeachOnlySnapshot(window);
  assert.equal(projected.WROC_CATALOG.getPlace(oldId), sentinel);
  for (const id of proof.newIds) assert.equal(projected.WROC_CATALOG.getPlace(id), null);
  assert.equal(hash(projected.WROC_EXPERIENCE_CATALOG.getExperience(proof.beforeBeach.id)), hash(proof.beforeBeach));
  assert.equal(hash(beforeDialogueBeachOnlySnapshot(projected).WROC_EXPERIENCE_CATALOG.getExperience(proof.beforeBeach.id)), hash(proof.beforeBeach));
});

test('Only the approved island video is added, while the declined deck footage and unrelated portal stay out',()=>{const w=load(),p=w.WROC_CATALOG.getPlace('kepa-mieszczanska-wroclaw');assert.deepEqual(plain(p.media.videos),[proof.publicVideo.url]);assert.equal(p.media.metadata[proof.publicVideo.url].sourceSHA256,proof.publicVideo.sourceSHA256);assert.equal(p.media.metadata[proof.publicVideo.url].savedPublicReopened,true);assert.equal(p.media.metadata[proof.publicVideo.url].originalImageAndAudioPreserved,true);for(const id of proof.ids){const r=w.WROC_CATALOG.getPlace(id);assert.ok(!JSON.stringify(r.media).includes('IMG_4653.MOV'));assert.ok(!JSON.stringify(r.media).includes('IMG_4686.JPG'));assert.ok(!JSON.stringify(r.media).includes('sEcinMYLccI'));}const k=p.media.photos.filter(a=>p.media.metadata[a].geographicRole==='mainland-approach-and-opposite-bank-context');assert.equal(k.length,2);});

test('ScopedwifeapprovalenrichesZenka, previouslyapprovedRoma portrait is restored once, and bothcafesjoincoffee withoutduplicates',()=>{const w=load(['data/location-media.js','data/lifestyle-places.js']),c=w.WROC_CATALOG,z=c.getPlace('zenka'),j=c.getPlace('jolie-kurzy-targ'),r=c.getPlace('lodziarnia-roma');assert.equal(z.media.photos.length,2);for(const a of z.media.photos){assert.equal(z.media.metadata[a].familyExceptionApplied,true);assert.ok(z.media.metadata[a].personalApprovalReceipt.includes('zenka-cafe-review'));}assert.equal(j.media.photos.length,4);assert.equal(r.media.photos.length,6);assert.equal(r.media.videos.length,3);assert.equal(r.media.photos.filter(x=>x==='/assets/food-cafes/lodziarnia-roma-03.jpg').length,1);assert.equal(r.media.metadata['/assets/food-cafes/lodziarnia-roma-03.jpg'].personalPhotoExceptionAuthorizedAt,'2026-10-18');for(const id of proof.updatedIds){const n=plain(c.getPlace(id)),old=proof.beforeUpdatedRecords[id];for(const key of proof.allowedUpdatedFields[id]){if(key in old)n[key]=old[key];else delete n[key];}assert.deepEqual(n,old,id);assert.deepEqual(plain(c.getPlace(id).location),old.location);assert.deepEqual(plain(c.getPlace(id).socialPosts),old.socialPosts);for(const a of old.media.photos)assert.ok(c.getPlace(id).media.photos.includes(a));}const coffee=w.WROC_EXPERIENCE_CATALOG.getExperience('coffee-lovers-wroclaw');assert.equal(coffee.relatedCanonicalPlaceIds.length,21);assert.deepEqual(plain(coffee.relatedCanonicalPlaceIds.slice(0,19)),proof.beforeExperiences['coffee-lovers-wroclaw'].relatedCanonicalPlaceIds);assert.deepEqual(plain(coffee.relatedCanonicalPlaceIds.slice(-2)),['zenka','jolie-kurzy-targ']);assert.equal(hash(coffee),proof.approvedExperienceHashes[coffee.id]);});
