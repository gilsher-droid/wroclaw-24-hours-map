import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {beforeNov18EnglishRenoma, englishRenomaNov18} from './english-renoma-social-binding-nov18-historical-baseline.mjs';

export const englishTwoNov18 = JSON.parse(readFileSync('tests/fixtures/english-two-social-bindings-20261118.json'));
const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');

// Older receipts retain their reviewed scope; only these exact two social
// arrays project back. Unrelated fields and unknown social changes stay visible.
export function beforeNov18EnglishTwo(place) {
  place = beforeNov18EnglishRenoma(place);
  const proof = englishTwoNov18.changed[place?.id];
  if (!proof || hash(place.socialPosts) === proof.beforeSocialHash) return place;
  if (!place.socialPosts?.some(post => post.context === englishTwoNov18.context)) return place;
  assert.equal(hash(place.socialPosts), proof.afterSocialHash, 'Unexpected Nov18 English social delta: ' + place.id);
  return {...place, socialPosts: proof.beforeSocialPosts};
}

export function expectedNov18EnglishTwoUrl(id, platform, language, historical) {
  const renoma = englishRenomaNov18;
  if (id === renoma.id && platform === renoma.row.platform && language === renoma.row.language) return renoma.row.url;
  return englishTwoNov18.targets.find(row => row.id === id && row.platform === platform && row.language === language)?.url || historical;
}
