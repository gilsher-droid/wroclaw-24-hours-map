import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {beforeNov18EnglishSecondSix, expectedNov18EnglishSecondSixURL} from './english-second-six-social-bindings-nov18-historical-baseline.mjs';

export const englishAltusBrzegNov18 = JSON.parse(readFileSync('tests/fixtures/english-altus-brzeg-social-bindings-20261118.json'));
const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');

// Older receipts project only the three exact accepted social arrays.
// Unknown social changes and all independent fields remain observable.
export function beforeNov18EnglishAltusBrzeg(place) {
  place = beforeNov18EnglishSecondSix(place);
  const proof = englishAltusBrzegNov18.changed[place?.id];
  if (!proof || hash(place.socialPosts) === proof.beforeSocialHash) return place;
  if (!place.socialPosts?.some(post => post.context === englishAltusBrzegNov18.context)) return place;
  assert.equal(hash(place.socialPosts), proof.afterSocialHash, 'Unexpected Altus/Brzeg English social delta: ' + place.id);
  return {...place, socialPosts: proof.beforeSocialPosts};
}

export function expectedNov18EnglishAltusBrzegURL(id, platform, language, historical) {
  const latest = expectedNov18EnglishSecondSixURL(id, platform, language, historical);
  if (latest !== historical) return latest;
  return englishAltusBrzegNov18.targets.find(t => t.id === id && t.platform === platform && t.language === language)?.url || historical;
}
