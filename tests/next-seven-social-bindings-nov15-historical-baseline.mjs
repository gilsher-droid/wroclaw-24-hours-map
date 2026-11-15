import {beforeNov15FollowingFiveHeBindings, expectedNov15FollowingFiveHeUrl} from './following-five-he-social-bindings-nov15-historical-baseline.mjs';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';

export const nextSevenNov15Bindings = JSON.parse(readFileSync('tests/fixtures/next-seven-social-bindings-20261115.json'));
const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');

// Project only the exact seven reviewed social arrays for older preservation receipts.
export function beforeNov15NextSevenBindings(place) {
  place = beforeNov15FollowingFiveHeBindings(place);
  const proof = nextSevenNov15Bindings.changed[place?.id];
  if (!proof || hash(place.socialPosts) === proof.beforeSocialHash) return place;
  if (!place.socialPosts?.some(post => post.context === nextSevenNov15Bindings.context)) return place;
  assert.equal(hash(place.socialPosts), proof.afterSocialHash, 'Unexpected Nov15 next-seven social delta: ' + place.id);
  return {...place, socialPosts: proof.beforeSocialPosts};
}

export function expectedNov15NextSevenUrl(id, platform, language, historical) {
  const latest = expectedNov15FollowingFiveHeUrl(id, platform, language, historical);
  if (latest !== historical) return latest;
  return nextSevenNov15Bindings.targets.find(row => row.id === id && row.platform === platform && row.language === language)?.url || historical;
}
