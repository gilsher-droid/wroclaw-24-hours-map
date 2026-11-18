import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {beforeNov18EnglishAltusBrzeg} from './english-altus-brzeg-social-bindings-nov18-historical-baseline.mjs';

export const englishRenomaNov18 = JSON.parse(readFileSync('tests/fixtures/english-renoma-social-binding-20261118.json'));
const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');

// Project only the exact reviewed social row for older receipts. Preserve
// unrelated fields, and reject any additional unreviewed social changes.
export function beforeNov18EnglishRenoma(place) {
  place = beforeNov18EnglishAltusBrzeg(place);
  const proof = englishRenomaNov18;
  if (place?.id !== proof.id || hash(place.socialPosts) === proof.beforeSocialHash) return place;
  if (!place.socialPosts?.some(post => post.context === proof.context)) return place;
  assert.equal(hash(place.socialPosts), proof.afterSocialHash, 'Unexpected Renoma English social delta');
  return {...place, socialPosts: proof.beforeSocialPosts};
}
