import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
export const englishTwoPhotosNov23 = JSON.parse(readFileSync('tests/fixtures/english-two-photo-bindings-20261123.json'));
const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');
// Only the exact native-verified two-row addition projects to older receipts.
// Personal-photo approval does not permit other social or canonical changes.
export function beforeNov23EnglishTwoPhotos(place) {
  const p = englishTwoPhotosNov23.changed[place?.id];
  if (!p || !place.socialPosts?.some(row => row.context === englishTwoPhotosNov23.context)) return place;
  assert.equal(hash(place.socialPosts),p.afterSocialHash,'Unreviewed Nov23 English social change: '+place.id);
  return {...place,socialPosts:p.beforeSocialPosts};
}
export function beforeNov23EnglishTwoRegistryRows(id,rows) {
  const p = englishTwoPhotosNov23.changed[id];
  if (!p || !rows?.some(row => row.context === englishTwoPhotosNov23.context)) return rows;
  assert.equal(hash(rows),p.afterRegistryHash,'Unreviewed Nov23 English registry change: '+id);
  return p.beforeRegistryRows;
}
export function expectedNov23EnglishTwoURL(id,platform,language,historical) {
  return englishTwoPhotosNov23.targets.find(t=>t.id===id&&t.platform===platform&&t.language===language)?.url||historical;
}
