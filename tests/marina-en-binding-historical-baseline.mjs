import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
export const marinaEnglishBinding = JSON.parse(readFileSync('tests/fixtures/marina-en-photo-binding-20261124.json'));
const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');
// Project only this exact verified addition when checking older immutable receipts.
export function beforeMarinaEnglishBinding(place) {
  const p = marinaEnglishBinding;
  if (place?.id !== p.id || !place.socialPosts?.some(row => row.context === p.context)) return place;
  assert.equal(hash(place.socialPosts), p.afterSocialHash, 'Unreviewed Marina English social change');
  return {...place, socialPosts:p.beforeSocialPosts};
}
export function beforeMarinaEnglishRegistryRows(id, rows) {
  const p = marinaEnglishBinding;
  if (id !== p.id || !rows?.some(row => row.context === p.context)) return rows;
  assert.equal(hash(rows), p.afterRegistryHash, 'Unreviewed Marina English registry change');
  return p.beforeRegistryRows;
}
export function expectedMarinaEnglishURL(id, platform, language, historical) {
  const p = marinaEnglishBinding;
  return id === p.id && platform === p.row.platform && language === p.row.language ? p.row.url : historical;
}
