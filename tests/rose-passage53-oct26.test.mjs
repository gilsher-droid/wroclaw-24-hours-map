import {beforeFourDenominationsMedia} from './four-denominations-media-historical-baseline.mjs';
import {beforePanPrecelMedia} from './pan-precel-media-historical-baseline.mjs';
import {beforeTwoSpecificApprovedPhotos} from './two-specific-approved-photos-historical-baseline.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { runInNewContext } from 'node:vm';

const proof = JSON.parse(readFileSync('data/rose-passage53-oct26-preservation.json'));
const window = {};
runInNewContext(readFileSync('data/place-catalog.js', 'utf8'), { window });
const hash = value => createHash('sha256').update(value).digest('hex');

test('Rose Passage architectural photograph preserves original bytes, thirteen prior photos and all230othercanonicalrecords', () => {
  const all = window.WROC_CATALOG.places;
  assert.equal(Object.keys(proof.recordHashes).length, 230);
  for (const [id, expected] of Object.entries(proof.recordHashes)) {
    assert.equal(hash(JSON.stringify(beforeFourDenominationsMedia(beforePanPrecelMedia(all[id])))), expected, id);
  }
  const place = beforeTwoSpecificApprovedPhotos(all[proof.canonicalId]);
  assert.equal(place.media.photos.length, 14);
  assert.deepEqual(place.media.photos.slice(0, 13), proof.before.media.photos);
  for (const photo of proof.photos) {
    assert.equal(place.media.photos.filter(url => url === photo.asset).length, 1);
    assert.equal(hash(readFileSync('.' + photo.asset)), photo.sourceSHA256);
    assert.deepEqual(place.media.metadata[photo.asset], photo.metadata);
    for (const language of ['he', 'en', 'pl', 'de', 'cs']) {
      assert.ok(photo.metadata.alt[language]);
    }
    assert.equal(photo.metadata.originalFullPicturePreserved, true);
    delete place.media.metadata[photo.asset];
  }
  place.media.photos = proof.before.media.photos;
  assert.deepEqual(place, proof.before);
});
