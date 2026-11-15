import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';

export const followingFiveHeNov15Bindings = JSON.parse(readFileSync('tests/fixtures/following-five-he-social-bindings-20261115.json'));
const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');

// Project only the exact five reviewed social arrays for older preservation receipts.
export function beforeNov15FollowingFiveHeBindings(place) {
  const proof = followingFiveHeNov15Bindings.changed[place?.id];
  if (!proof || hash(place.socialPosts) === proof.beforeSocialHash) return place;
  if (!place.socialPosts?.some(post => post.context === followingFiveHeNov15Bindings.context)) return place;
  assert.equal(hash(place.socialPosts), proof.afterSocialHash, 'Unexpected Nov15 following-five HE social delta: ' + place.id);
  return {...place, socialPosts: proof.beforeSocialPosts};
}

export function expectedNov15FollowingFiveHeUrl(id, platform, language, historical) {
  return followingFiveHeNov15Bindings.targets.find(row => row.id === id && row.platform === platform && row.language === language)?.url || historical;
}
