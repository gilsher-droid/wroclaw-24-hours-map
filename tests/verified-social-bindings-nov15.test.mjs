import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import {createHash} from 'node:crypto';
import {beforeNov15SocialBindings, verifiedNov15Bindings as proof} from './verified-social-bindings-nov15-historical-baseline.mjs';
import {beforeNov15FollowupBindings} from './followup-social-bindings-nov15-historical-baseline.mjs';
const window = {};
runInNewContext(readFileSync('data/place-catalog.js', 'utf8'), {window});
const catalog = window.WROC_CATALOG;
const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');
const plain = value => JSON.parse(JSON.stringify(value));

test('Five native-verified written-photo posts are preferred only in their exact place and language', () => {
  assert.equal(proof.targets.length, 5);
  for (const target of proof.targets) {
    const post = catalog.getSocialPost(target.id, target.platform, target.language);
    assert.equal(post?.url, target.url);
    assert.equal(post.account, target.account);
    assert.equal(catalog.socialPostKind(post.url, target.platform), 'post-candidate');
    for (const language of ['he', 'en', 'pl', 'de', 'cs'].filter(value => value !== target.language)) {
      assert.notEqual(catalog.getSocialPost(target.id, target.platform, language)?.url, target.url);
    }
  }
});

test('All342 other canonical records and all media, identities and coordinates of the four changed places survive', () => {
  assert.equal(Object.keys(catalog.places).length, 346);
  assert.equal(Object.keys(proof.unrelatedRecordHashes).length, 342);
  for (const [id, expected] of Object.entries(proof.unrelatedRecordHashes)) assert.equal(hash(beforeNov15FollowupBindings(catalog.getPlace(id))), expected, id);
  for (const [id, expected] of Object.entries(proof.changed)) {
    const place = catalog.getPlace(id);
    assert.equal(hash(Object.fromEntries(Object.entries(place).filter(([key]) => key !== 'socialPosts'))), expected.beforeNonSocialHash, id);
    assert.equal(hash(beforeNov15SocialBindings(place)), expected.beforeRecordHash, id);
  }
  assert.equal(hash(catalog.aliases), proof.aliasesHash);
  assert.equal(hash(catalog.coordinateConflicts), proof.coordinateConflictsHash);
});

test('Original text post, removed Chatka URL, Papa collection and correct Jolie attribution remain historical evidence', () => {
  for (const [id, expected] of Object.entries(proof.changed)) {
    for (const old of expected.beforeSocialPosts) assert.ok(catalog.getPlace(id).socialPosts.some(row => row.url === old.url && row.platform === old.platform), id + ': ' + old.url);
  }
  const oldPL = 'https://www.instagram.com/p/DePBtSmFyRI/';
  assert.ok(catalog.getPlace('chatka').socialPosts.some(row => row.url === oldPL && row.routingExcluded));
  const blocks = JSON.parse(readFileSync('data/social-post-action-blocks.json'));
  assert.ok(!blocks.some(row => row.placeId === 'chatka' && row.platform === 'instagram' && row.language === 'pl'));
  assert.equal(catalog.getSocialPost('four-domes', 'instagram', 'he'), null);
  assert.equal(catalog.getSocialPost('jolie-kurzy-targ', 'instagram', 'he')?.url, 'https://www.instagram.com/wroclaw.lowersilesia.he/p/DeUurgzkeMm/');
  assert.ok(catalog.getPlace('chatka').socialPosts.some(row => row.url.endsWith('/DeUurgzkeMm/') && row.routingExcluded));
  assert.ok(catalog.getPlace('papa').socialPosts.some(row => row.url.endsWith('/DehSWMMCbzH/') && row.routingExcluded));
});

test('Historical projection rejects unreviewed social changes and preserves changes outside its scope', () => {
  for (const id of Object.keys(proof.changed)) {
    const place = catalog.getPlace(id);
    assert.throws(() => beforeNov15SocialBindings({...place, socialPosts: [...place.socialPosts, {platform: 'facebook', language: 'en', url: 'https://example.com/unreviewed'}]}));
    const changed = plain(place);
    changed.description.en += ' independent content';
    assert.equal(beforeNov15SocialBindings(changed).description.en, changed.description.en);
    assert.notEqual(hash(beforeNov15SocialBindings(changed)), proof.changed[id].beforeRecordHash);
  }
});
