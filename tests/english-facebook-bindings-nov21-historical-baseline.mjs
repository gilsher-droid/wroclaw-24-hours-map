import {beforeCafeEnglishBinding, beforeCafeEnglishRegistryRows, expectedCafeEnglishURL} from './cafe-targowa-en-binding-historical-baseline.mjs';
import {beforeWuWALocationMedia} from './wuwa-location-historical-baseline.mjs';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
export const englishNov21 = JSON.parse(readFileSync('tests/fixtures/english-facebook-bindings-20261121.json'));
const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');
export function beforeNov21English(place) {
  place = beforeCafeEnglishBinding(beforeWuWALocationMedia(place));
  if (!place) return place;
  const p = englishNov21.changed[place.id];
  if (p && hash(place.socialPosts) !== p.beforeSocialHash && place.socialPosts?.some(row => row.context === englishNov21.context)) {
    assert.equal(hash(place.socialPosts), p.afterSocialHash, 'Unexpected Nov21 social delta: ' + place.id);
    return {...place, socialPosts: p.beforeSocialPosts};
  }
  return place;
}
export function beforeNov21EnglishRegistryRows(id, rows) {
  rows = beforeCafeEnglishRegistryRows(id, rows);
  const p = englishNov21.changed[id];
  if (p && hash(rows) !== p.beforeRegistryHash && rows?.some(row => row.context === englishNov21.context)) {
    assert.equal(hash(rows), p.afterRegistryHash, 'Unexpected Nov21 registry delta: ' + id);
    return p.beforeRegistryRows;
  }
  return rows;
}
export function expectedNov21EnglishURL(id, platform, language, historical) {
  return expectedCafeEnglishURL(id, platform, language, englishNov21.targets.find(row => row.id === id && row.platform === platform && row.language === language)?.url || historical);
}
