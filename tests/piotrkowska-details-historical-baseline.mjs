import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const delta = JSON.parse(readFileSync('data/piotrkowska-safe-details-oct26-preservation.json'));

// Earlier scoped tests compare the state before this separately tested delta.
// Verify the exact authorized additions before projecting that historical state.
export function beforePiotrkowskaDetails(record) {
  const place = JSON.parse(JSON.stringify(record));
  if (place.id !== delta.canonicalId) return place;
  for (const photo of delta.photos) {
    assert.equal(place.media.photos.filter(url => url === photo.asset).length, 1);
    assert.deepEqual(place.media.metadata[photo.asset], photo.metadata);
    place.media.photos = place.media.photos.filter(url => url !== photo.asset);
    delete place.media.metadata[photo.asset];
  }
  return place;
}
