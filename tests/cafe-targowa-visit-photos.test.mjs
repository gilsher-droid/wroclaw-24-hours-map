import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {runInNewContext} from 'node:vm';

const window = {};
for (const file of ['data/place-catalog.js', 'data/canonical-experiences.js', 'data/lifestyle-places.js', 'data/location-media.js']) {
  runInNewContext(readFileSync(file, 'utf8'), {window, console});
}
const plain = value => JSON.parse(JSON.stringify(value));
const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');
const baseline = JSON.parse(readFileSync('data/cafe-targowa-visit-photos-preservation-nov15.json', 'utf8'));
const catalog = window.WROC_CATALOG;

test('Cafe Targowa adds exactly the three selected existing photos and preserves its other canonical data', () => {
  const place = plain(catalog.getPlace('cafe-targowa'));
  const before = baseline.targetBefore;
  assert.deepEqual(place.media.photos, [...before.media.photos, ...baseline.newAssets]);
  assert.equal(new Set(place.media.photos).size, 5);
  assert.equal(place.media.thumbnail, before.media.thumbnail);
  for (const src of baseline.newAssets) {
    const meta = place.media.metadata[src];
    assert.equal(createHash('sha256').update(readFileSync(src.slice(1))).digest('hex'), meta.assetSHA256);
    assert.equal(meta.sourceSHA256, catalog.getPlace('hala-targowa').media.metadata[src].sourceSHA256);
    assert.equal(meta.originalFullPicturePreserved, true);
    for (const language of ['he', 'en', 'pl', 'de', 'cs']) assert.ok(meta.alt[language]);
    assert.ok(catalog.getPlace('hala-targowa').media.photos.includes(src));
  }
  assert.deepEqual(place.sourceRecords, [{productId:'lifestyle-guide',kind:'catalog-place',sourceId:'cafe-targowa'}]);
  assert.deepEqual(place.coordinateCandidates, [{productId:'lifestyle-guide',sourceId:'cafe-targowa',lat:51.1124915,lng:17.0408014}]);
  place.media.photos = place.media.photos.filter(src => !baseline.newAssets.includes(src));
  for (const src of baseline.newAssets) delete place.media.metadata[src];
  place.sourceRecords = [];
  place.coordinateCandidates = [];
  assert.deepEqual(place, before);
});

test('The other 345 canonical places, including the market gallery, remain byte-equivalent', () => {
  assert.equal(Object.keys(catalog.places).length, baseline.beforeCount);
  assert.equal(Object.keys(baseline.unrelatedHashes).length, 345);
  for (const [id, expected] of Object.entries(baseline.unrelatedHashes)) {
    assert.equal(hash(plain(catalog.getPlace(id))), expected, id);
  }
});

test('Coffee experience and lifestyle map reuse the same existing Cafe Targowa identity and gallery once', () => {
  const experience = plain(window.WROC_EXPERIENCE_CATALOG.getExperience('coffee-lovers-wroclaw'));
  assert.deepEqual(experience.relatedCanonicalPlaceIds, [...baseline.coffeeBefore.relatedCanonicalPlaceIds, 'cafe-targowa']);
  assert.deepEqual(experience.media.inheritFromCanonicalPlaceIds, [...baseline.coffeeBefore.media.inheritFromCanonicalPlaceIds, 'cafe-targowa']);
  experience.relatedCanonicalPlaceIds.pop();
  experience.media.inheritFromCanonicalPlaceIds.pop();
  assert.deepEqual(experience, baseline.coffeeBefore);
  const mapPlaces = window.WROC_LIFESTYLE_PLACES.filter(place => (place.canonicalPlaceId || place.id) === 'cafe-targowa');
  assert.equal(mapPlaces.length, 1);
  assert.equal(mapPlaces[0].mediaKey, 'cafe-targowa');
  assert.deepEqual(plain(window.WROC_LOCATION_MEDIA['cafe-targowa'].gallery), plain(catalog.getPlace('cafe-targowa').media.photos));
  for (const [id, expected] of Object.entries(baseline.otherExperienceHashes)) {
    assert.equal(hash(plain(window.WROC_EXPERIENCE_CATALOG.getExperience(id))), expected, id);
  }
});
