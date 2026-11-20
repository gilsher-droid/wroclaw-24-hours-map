import {beforeNov20Guides} from './opera-jatki-zoo-historical-baseline.mjs';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
export const englishNov19Batch01 = JSON.parse(readFileSync('tests/fixtures/english-facebook-bindings-20261119-batch01.json'));
const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');
export function beforeNov19EnglishBatch01(place) {
  place = beforeNov20Guides(place);
  if (!place) return place;
  const p = englishNov19Batch01.changed[place.id];
  if (p && hash(place.socialPosts) !== p.beforeSocialHash && place.socialPosts?.some(row => row.context === englishNov19Batch01.context)) {
    assert.equal(hash(place.socialPosts), p.afterSocialHash, 'Unexpected Nov19 social delta: ' + place.id);
    return {...place, socialPosts: p.beforeSocialPosts};
  }
  return place;
}
export function beforeNov19EnglishRegistryRows(id, rows) {
  const p = englishNov19Batch01.changed[id];
  if (p && hash(rows) !== p.beforeRegistryHash && rows?.some(row => row.context === englishNov19Batch01.context)) {
    assert.equal(hash(rows), p.afterRegistryHash, 'Unexpected Nov19 registry delta: ' + id);
    return p.beforeRegistryRows;
  }
  return rows;
}
export function expectedNov19EnglishURL(id, platform, language, historical) {
  return englishNov19Batch01.targets.find(row => row.id === id && row.platform === platform && row.language === language)?.url || historical;
}
