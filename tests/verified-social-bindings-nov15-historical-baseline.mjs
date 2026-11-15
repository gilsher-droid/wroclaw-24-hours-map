import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';

export const verifiedNov15Bindings = JSON.parse(readFileSync('tests/fixtures/verified-social-bindings-20261115.json'));
const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');

// Older receipts project only the exact reviewed social arrays, never media or other fields.
export function beforeNov15SocialBindings(place) {
  const proof = verifiedNov15Bindings.changed[place?.id];
  if (!proof || hash(place.socialPosts) === proof.beforeSocialHash) return place;
  if (!place.socialPosts?.some(post => post.context === verifiedNov15Bindings.context)) return place;
  assert.equal(hash(place.socialPosts), proof.afterSocialHash, 'Unexpected Nov15 social delta: ' + place.id);
  return {...place, socialPosts: proof.beforeSocialPosts};
}

export function expectedNov15SocialUrl(id, platform, language, historical) {
  return verifiedNov15Bindings.targets.find(row => row.id === id && row.platform === platform && row.language === language)?.url || historical;
}
