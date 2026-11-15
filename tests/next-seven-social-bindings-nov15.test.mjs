import {beforeNov15FollowingFiveHeBindings} from './following-five-he-social-bindings-nov15-historical-baseline.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import {createHash} from 'node:crypto';
import {beforeNov15NextSevenBindings, nextSevenNov15Bindings as proof} from './next-seven-social-bindings-nov15-historical-baseline.mjs';
const window = {};
runInNewContext(readFileSync('data/place-catalog.js', 'utf8'), {window});
const catalog = window.WROC_CATALOG;
const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');

test('Seven subsequent verified posts resolve only for the exact place, language and original account', () => {
  assert.equal(proof.targets.length, 7);
  for (const t of proof.targets) {
    assert.equal(catalog.getSocialPost(t.id, t.platform, t.language)?.url, t.url);
    assert.equal(catalog.getSocialPost(t.id, t.platform, t.language)?.account, t.account);
    for (const language of ['he', 'en', 'pl', 'de', 'cs'].filter(value => value !== t.language)) {
      assert.notEqual(catalog.getSocialPost(t.id, t.platform, language)?.url, t.url);
    }
  }
});

test('All339 unrelated records and every non-social field of the seven affected places remain unchanged', () => {
  assert.equal(Object.keys(catalog.places).length, 346);
  assert.equal(Object.keys(proof.unrelatedRecordHashes).length, 339);
  for (const [id, expected] of Object.entries(proof.unrelatedRecordHashes)) assert.equal(hash(beforeNov15FollowingFiveHeBindings(catalog.getPlace(id))), expected, id);
  for (const [id, expected] of Object.entries(proof.changed)) {
    const place = beforeNov15FollowingFiveHeBindings(catalog.getPlace(id));
    assert.equal(hash(Object.fromEntries(Object.entries(place).filter(([key]) => key !== 'socialPosts'))), expected.beforeNonSocialHash, id);
    assert.equal(hash(beforeNov15NextSevenBindings(place)), expected.beforeRecordHash, id);
  }
  assert.equal(hash(catalog.aliases), proof.aliasesHash);
  assert.equal(hash(catalog.coordinateConflicts), proof.coordinateConflictsHash);
});

test('The prior twelve preferred links and all historical candidates of the seven new targets remain intact', () => {
  const first = [...JSON.parse(readFileSync('tests/fixtures/verified-social-bindings-20261115.json')).targets, ...JSON.parse(readFileSync('tests/fixtures/followup-social-bindings-20261115.json')).targets, ...JSON.parse(readFileSync('tests/fixtures/next-four-social-bindings-20261115.json')).targets];
  assert.equal(first.length, 12);
  for (const t of first) assert.equal(catalog.getSocialPost(t.id, t.platform, t.language)?.url, t.url);
  for (const [id, expected] of Object.entries(proof.changed)) {
    for (const old of expected.beforeSocialPosts) assert.ok(catalog.getPlace(id).socialPosts.some(row => row.url === old.url && row.platform === old.platform), id + ': ' + old.url);
  }
});

test('Follow-up projection rejects unknown social changes while preserving independent non-social changes', () => {
  for (const id of Object.keys(proof.changed)) {
    const place = beforeNov15FollowingFiveHeBindings(catalog.getPlace(id));
    assert.throws(() => beforeNov15NextSevenBindings({...place, socialPosts: [...place.socialPosts, {platform: 'facebook', language: 'en', url: 'https://example.com/unreviewed'}]}));
    const changed = JSON.parse(JSON.stringify(place));
    changed.description.en += ' independent content';
    assert.equal(beforeNov15NextSevenBindings(changed).description.en, changed.description.en);
    assert.notEqual(hash(beforeNov15NextSevenBindings(changed)), proof.changed[id].beforeRecordHash);
  }
});

test('Only the old wrong-owner Four Domes URL remains excluded after the original Hebrew owner replacement', () => {
 const oldURL = 'https://www.instagram.com/p/DcqyG24DMHg/';
 assert.equal(catalog.getSocialPost('four-domes', 'instagram', 'he').url, 'https://www.instagram.com/p/DfwjPMfEVdB/');
 assert.equal(catalog.getSocialPostState('four-domes', 'instagram', 'he').state, 'valid-post-candidate');
 assert.ok(catalog.getPlace('four-domes').socialPosts.some(row => row.url === oldURL && row.routingExcluded));
 const exclusions = JSON.parse(readFileSync('data/social-post-routing-exclusions.json'));
 const held = exclusions.filter(row => row.placeId === 'four-domes' && row.url === oldURL);
 assert.equal(held.length, 1);
 assert.equal(held[0].actualAccount, 'wroclaw.lowersilesia');
 assert.equal(held[0].requiredAccount, 'wroclaw.lowersilesia.he');
 assert.equal(held[0].resolvedByVerifiedReplacementURL, 'https://www.instagram.com/p/DfwjPMfEVdB/');
 assert.ok(!JSON.parse(readFileSync('data/social-post-action-blocks.json')).some(row => row.placeId === 'four-domes' && row.platform === 'instagram' && row.language === 'he'));
});
