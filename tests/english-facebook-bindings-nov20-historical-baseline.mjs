import {beforeNov21English,beforeNov21EnglishRegistryRows,expectedNov21EnglishURL} from './english-facebook-bindings-nov21-historical-baseline.mjs';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
export const englishNov20 = JSON.parse(readFileSync('tests/fixtures/english-facebook-bindings-20261120.json'));
const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');
export function beforeNov20English(place) {
  place=beforeNov21English(place);
  if (!place) return place;
  const p = englishNov20.changed[place.id];
  if (p && hash(place.socialPosts) !== p.beforeSocialHash && place.socialPosts?.some(row => row.context === englishNov20.context)) {
    assert.equal(hash(place.socialPosts), p.afterSocialHash, 'Unexpected Nov20 social delta: ' + place.id);
    return {...place, socialPosts: p.beforeSocialPosts};
  }
  return place;
}
export function beforeNov20EnglishRegistryRows(id, rows) {
  rows=beforeNov21EnglishRegistryRows(id,rows);
  const p = englishNov20.changed[id];
  if (p && hash(rows) !== p.beforeRegistryHash && rows?.some(row => row.context === englishNov20.context)) {
    assert.equal(hash(rows), p.afterRegistryHash, 'Unexpected Nov20 registry delta: ' + id);
    return p.beforeRegistryRows;
  }
  return rows;
}
export function expectedNov20EnglishURL(id, platform, language, historical) {
  return expectedNov21EnglishURL(id,platform,language,englishNov20.targets.find(row => row.id === id && row.platform === platform && row.language === language)?.url || historical);
}
