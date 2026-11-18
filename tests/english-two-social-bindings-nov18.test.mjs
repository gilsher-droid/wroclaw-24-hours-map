import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {runInNewContext} from 'node:vm';
import {beforeNov18EnglishTwo, englishTwoNov18 as proof} from './english-two-social-bindings-nov18-historical-baseline.mjs';
import {beforeNov18EnglishRenoma} from './english-renoma-social-binding-nov18-historical-baseline.mjs';
const window = {};
runInNewContext(readFileSync('data/place-catalog.js', 'utf8'), {window});
const catalog = window.WROC_CATALOG;
const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');

test('Altus and the restaurant street resolve to their exact verified English Facebook posts only', () => {
  for (const t of proof.targets) {
    assert.equal(catalog.getSocialPost(t.id, t.platform, t.language)?.url, t.url);
    assert.equal(catalog.getSocialPost(t.id, t.platform, t.language)?.account, t.account);
    for (const language of ['he', 'pl', 'de', 'cs']) assert.notEqual(catalog.getSocialPost(t.id, t.platform, language)?.url, t.url);
  }
});

test('All345 other records and all target identities, media and non-social data remain exact', () => {
  assert.equal(Object.keys(catalog.places).length, proof.beforeCount);
  for (const [id, expected] of Object.entries(proof.unrelatedRecordHashes)) assert.equal(hash(beforeNov18EnglishRenoma(catalog.getPlace(id))), expected, id);
  for (const [id, expected] of Object.entries(proof.changed)) {
    const p = catalog.getPlace(id);
    assert.equal(hash(Object.fromEntries(Object.entries(p).filter(([k]) => k !== 'socialPosts'))), expected.beforeNonSocialHash, id);
    assert.equal(hash(beforeNov18EnglishTwo(p)), expected.beforeRecordHash, id);
    for (const old of expected.beforeSocialPosts) assert.ok(p.socialPosts.some(row => hash(row) === hash(old)), id + ': historical row');
  }
  assert.equal(hash(catalog.aliases), proof.aliasesHash);
  assert.equal(hash(catalog.coordinateConflicts), proof.coordinateConflictsHash);
});

test('The narrow historical adapter rejects unreviewed social changes and preserves unrelated edits', () => {
  for (const t of proof.targets) {
    const p = catalog.getPlace(t.id);
    assert.throws(() => beforeNov18EnglishTwo({...p, socialPosts: [...p.socialPosts, {platform: 'facebook', language: 'en', url: 'https://example.com/unreviewed'}]}));
    const changed = {...p, description: {...p.description, en: p.description.en + ' independent content'}};
    assert.equal(beforeNov18EnglishTwo(changed).description.en, changed.description.en);
  }
});
