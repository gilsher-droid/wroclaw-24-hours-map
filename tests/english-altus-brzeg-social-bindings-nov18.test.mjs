import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {runInNewContext} from 'node:vm';
import {beforeNov18EnglishAltusBrzeg, englishAltusBrzegNov18 as proof} from './english-altus-brzeg-social-bindings-nov18-historical-baseline.mjs';
const window = {};
runInNewContext(readFileSync('data/place-catalog.js', 'utf8'), {window});
const catalog = window.WROC_CATALOG;
const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');

test('Only the three verified English place/platform cells use the accepted posts', () => {
  for (const target of proof.targets) {
    assert.equal(catalog.getSocialPost(target.id, target.platform, target.language)?.url, target.url);
    assert.equal(catalog.getSocialPost(target.id, target.platform, target.language)?.account, target.account);
    for (const language of ['he', 'pl', 'de', 'cs']) assert.notEqual(catalog.getSocialPost(target.id, target.platform, language)?.url, target.url);
  }
  assert.equal(catalog.getSocialPost('altus', 'facebook', 'en')?.url, proof.preserveAltusFB);
  for (const [id, url] of Object.entries(proof.preserveBrzegIG)) assert.equal(catalog.getSocialPost(id, 'instagram', 'en')?.url, url);
});

test('All 344 other records and all target media, identity and historical rows remain exact', () => {
  assert.equal(Object.keys(catalog.places).length, proof.beforeCount);
  for (const [id, expected] of Object.entries(proof.unrelatedRecordHashes)) assert.equal(hash(catalog.getPlace(id)), expected, id);
  for (const [id, expected] of Object.entries(proof.changed)) {
    const place = catalog.getPlace(id);
    assert.equal(hash(Object.fromEntries(Object.entries(place).filter(([key]) => key !== 'socialPosts'))), expected.beforeNonSocialHash, id);
    assert.equal(hash(beforeNov18EnglishAltusBrzeg(place)), expected.beforeRecordHash, id);
    for (const old of expected.beforeSocialPosts) assert.ok(place.socialPosts.some(row => hash(row) === hash(old)), id);
  }
  assert.equal(hash(catalog.aliases), proof.aliasesHash);
  assert.equal(hash(catalog.coordinateConflicts), proof.coordinateConflictsHash);
});

test('Historical projection rejects additional social rows and never hides independent fields', () => {
  for (const target of proof.targets) {
    const place = catalog.getPlace(target.id);
    assert.throws(() => beforeNov18EnglishAltusBrzeg({...place, socialPosts: [...place.socialPosts, {platform: 'instagram', language: 'en', url: 'https://example.com/unreviewed'}]}));
    const changed = {...place, description: {...place.description, en: place.description.en + ' independent content'}};
    assert.equal(beforeNov18EnglishAltusBrzeg(changed).description.en, changed.description.en);
  }
});
