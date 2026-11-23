import {beforeNov23EnglishTwoPhotos, beforeNov23EnglishTwoRegistryRows, expectedNov23EnglishTwoURL} from './english-two-photo-bindings-nov23-historical-baseline.mjs';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
export const cafeEnglishBinding = JSON.parse(readFileSync('tests/fixtures/cafe-targowa-en-photo-binding-20261123.json'));
const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');
// Preserve older immutable receipts by projecting only this exact verified
// English social addition. Unknown social edits and all other fields stay visible.
export function beforeCafeEnglishBinding(place) {
  place=beforeNov23EnglishTwoPhotos(place);
  const p = cafeEnglishBinding;
  if (place?.id !== p.id || !place.socialPosts?.some(row => row.context === p.context)) return place;
  assert.equal(hash(place.socialPosts), p.afterSocialHash, 'Unreviewed Cafe Targowa English social change');
  return {...place, socialPosts:p.beforeSocialPosts};
}
export function beforeCafeEnglishRegistryRows(id, rows) {
  rows=beforeNov23EnglishTwoRegistryRows(id,rows);
  const p = cafeEnglishBinding;
  if (id !== p.id || !rows?.some(row => row.context === p.context)) return rows;
  assert.equal(hash(rows), p.afterRegistryHash, 'Unreviewed Cafe Targowa English registry change');
  return p.beforeRegistryRows;
}
export function expectedCafeEnglishURL(id, platform, language, historical) {
  const p = cafeEnglishBinding;
  return expectedNov23EnglishTwoURL(id,platform,language,id === p.id && platform === p.row.platform && language === p.row.language ? p.row.url : historical);
}
