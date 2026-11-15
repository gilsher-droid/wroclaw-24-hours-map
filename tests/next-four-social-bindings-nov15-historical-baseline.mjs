import {beforeNov15NextSevenBindings, expectedNov15NextSevenUrl} from './next-seven-social-bindings-nov15-historical-baseline.mjs';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';

export const nextFourNov15Bindings = JSON.parse(readFileSync('tests/fixtures/next-four-social-bindings-20261115.json'));
const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');

// Project only the exact four reviewed social arrays for older preservation receipts.
export function beforeNov15NextFourBindings(place) {
  place = beforeNov15NextSevenBindings(place);
  const proof = nextFourNov15Bindings.changed[place?.id];
  if (!proof || hash(place.socialPosts) === proof.beforeSocialHash) return place;
  if (!place.socialPosts?.some(post => post.context === nextFourNov15Bindings.context)) return place;
  assert.equal(hash(place.socialPosts), proof.afterSocialHash, 'Unexpected Nov15 next-four social delta: ' + place.id);
  return {...place, socialPosts: proof.beforeSocialPosts};
}

export function expectedNov15NextFourUrl(id, platform, language, historical) {
  const latest = expectedNov15NextSevenUrl(id, platform, language, historical);
  if (latest !== historical) return latest;
  return nextFourNov15Bindings.targets.find(row => row.id === id && row.platform === platform && row.language === language)?.url || historical;
}
