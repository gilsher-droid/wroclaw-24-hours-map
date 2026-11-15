import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import {createHash} from 'node:crypto';
import {beforeNov15FollowingFiveHeBindings, followingFiveHeNov15Bindings as proof} from './following-five-he-social-bindings-nov15-historical-baseline.mjs';
const window = {};
runInNewContext(readFileSync('data/place-catalog.js', 'utf8'), {window});
const catalog = window.WROC_CATALOG;
const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');

test('Five subsequent original-HE verified posts resolve only for the exact place, language and original account', () => {
  assert.equal(proof.targets.length, 5);
  for (const t of proof.targets) {
    assert.equal(catalog.getSocialPost(t.id, t.platform, t.language)?.url, t.url);
    assert.equal(catalog.getSocialPost(t.id, t.platform, t.language)?.account, t.account);
    for (const language of ['he', 'en', 'pl', 'de', 'cs'].filter(value => value !== t.language)) {
      assert.notEqual(catalog.getSocialPost(t.id, t.platform, language)?.url, t.url);
    }
  }
});

test('All341 unrelated records and every non-social field of the five affected places remain unchanged', () => {
  assert.equal(Object.keys(catalog.places).length, 346);
  assert.equal(Object.keys(proof.unrelatedRecordHashes).length, 341);
  for (const [id, expected] of Object.entries(proof.unrelatedRecordHashes)) assert.equal(hash(catalog.getPlace(id)), expected, id);
  for (const [id, expected] of Object.entries(proof.changed)) {
    const place = catalog.getPlace(id);
    assert.equal(hash(Object.fromEntries(Object.entries(place).filter(([key]) => key !== 'socialPosts'))), expected.beforeNonSocialHash, id);
    assert.equal(hash(beforeNov15FollowingFiveHeBindings(place)), expected.beforeRecordHash, id);
  }
  assert.equal(hash(catalog.aliases), proof.aliasesHash);
  assert.equal(hash(catalog.coordinateConflicts), proof.coordinateConflictsHash);
});

test('The prior nineteen preferred links and all historical candidates of the five new targets remain intact', () => {
  const first = [...JSON.parse(readFileSync('tests/fixtures/verified-social-bindings-20261115.json')).targets, ...JSON.parse(readFileSync('tests/fixtures/followup-social-bindings-20261115.json')).targets, ...JSON.parse(readFileSync('tests/fixtures/next-four-social-bindings-20261115.json')).targets, ...JSON.parse(readFileSync('tests/fixtures/next-seven-social-bindings-20261115.json')).targets];
  assert.equal(first.length, 19);
  for (const t of first) assert.equal(catalog.getSocialPost(t.id, t.platform, t.language)?.url, t.url);
  for (const [id, expected] of Object.entries(proof.changed)) {
    for (const old of expected.beforeSocialPosts) assert.ok(catalog.getPlace(id).socialPosts.some(row => row.url === old.url && row.platform === old.platform), id + ': ' + old.url);
  }
});

test('Follow-up projection rejects unknown social changes while preserving independent non-social changes', () => {
  for (const id of Object.keys(proof.changed)) {
    const place = catalog.getPlace(id);
    assert.throws(() => beforeNov15FollowingFiveHeBindings({...place, socialPosts: [...place.socialPosts, {platform: 'facebook', language: 'en', url: 'https://example.com/unreviewed'}]}));
    const changed = JSON.parse(JSON.stringify(place));
    changed.description.en += ' independent content';
    assert.equal(beforeNov15FollowingFiveHeBindings(changed).description.en, changed.description.en);
    assert.notEqual(hash(beforeNov15FollowingFiveHeBindings(changed)), proof.changed[id].beforeRecordHash);
  }
});

