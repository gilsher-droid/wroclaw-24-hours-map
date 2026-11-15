import {beforeNov15NextFourBindings} from './next-four-social-bindings-nov15-historical-baseline.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import {createHash} from 'node:crypto';
import {beforeNov15FollowupBindings, followupNov15Bindings as proof} from './followup-social-bindings-nov15-historical-baseline.mjs';
const window = {};
runInNewContext(readFileSync('data/place-catalog.js', 'utf8'), {window});
const catalog = window.WROC_CATALOG;
const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');

test('Three subsequent verified posts resolve only for the exact place, language and original account', () => {
  assert.equal(proof.targets.length, 3);
  for (const t of proof.targets) {
    assert.equal(catalog.getSocialPost(t.id, t.platform, t.language)?.url, t.url);
    assert.equal(catalog.getSocialPost(t.id, t.platform, t.language)?.account, t.account);
    for (const language of ['he', 'en', 'pl', 'de', 'cs'].filter(value => value !== t.language)) {
      assert.notEqual(catalog.getSocialPost(t.id, t.platform, language)?.url, t.url);
    }
  }
});

test('All343 unrelated records and every non-social field of the three affected places remain unchanged', () => {
  assert.equal(Object.keys(catalog.places).length, 346);
  assert.equal(Object.keys(proof.unrelatedRecordHashes).length, 343);
  for (const [id, expected] of Object.entries(proof.unrelatedRecordHashes)) assert.equal(hash(beforeNov15NextFourBindings(catalog.getPlace(id))), expected, id);
  for (const [id, expected] of Object.entries(proof.changed)) {
    const place = catalog.getPlace(id);
    assert.equal(hash(Object.fromEntries(Object.entries(place).filter(([key]) => key !== 'socialPosts'))), expected.beforeNonSocialHash, id);
    assert.equal(hash(beforeNov15FollowupBindings(place)), expected.beforeRecordHash, id);
  }
  assert.equal(hash(catalog.aliases), proof.aliasesHash);
  assert.equal(hash(catalog.coordinateConflicts), proof.coordinateConflictsHash);
});

test('The initial five preferred links and all historical candidates of the three new targets remain intact', () => {
  const first = JSON.parse(readFileSync('tests/fixtures/verified-social-bindings-20261115.json'));
  for (const t of first.targets) assert.equal(catalog.getSocialPost(t.id, t.platform, t.language)?.url, t.url);
  for (const [id, expected] of Object.entries(proof.changed)) {
    for (const old of expected.beforeSocialPosts) assert.ok(catalog.getPlace(id).socialPosts.some(row => row.url === old.url && row.platform === old.platform), id + ': ' + old.url);
  }
});

test('Follow-up projection rejects unknown social changes while preserving independent non-social changes', () => {
  for (const id of Object.keys(proof.changed)) {
    const place = catalog.getPlace(id);
    assert.throws(() => beforeNov15FollowupBindings({...place, socialPosts: [...place.socialPosts, {platform: 'facebook', language: 'en', url: 'https://example.com/unreviewed'}]}));
    const changed = JSON.parse(JSON.stringify(place));
    changed.description.en += ' independent content';
    assert.equal(beforeNov15FollowupBindings(changed).description.en, changed.description.en);
    assert.notEqual(hash(beforeNov15FollowupBindings(changed)), proof.changed[id].beforeRecordHash);
  }
});
