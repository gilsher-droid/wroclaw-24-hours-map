import {beforeNov19EnglishBatch01, beforeNov19EnglishRegistryRows} from './english-facebook-bindings-nov19-batch01-historical-baseline.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {runInNewContext} from 'node:vm';
import {beforeNov18EnglishSecondSix, beforeNov18EnglishSecondSixLegacyRow, englishSecondSixNov18 as proof} from './english-second-six-social-bindings-nov18-historical-baseline.mjs';
const window = {};
runInNewContext(readFileSync('data/place-catalog.js', 'utf8'), {window});
const catalog = window.WROC_CATALOG;
const registry = JSON.parse(readFileSync('data/localized-social-posts.json'));
const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');

test('The eleven verified English Facebook cells route to their original-account photo posts', () => {
  for (const row of proof.targets) {
    const selected = catalog.getSocialPost(row.id, row.platform, row.language);
    assert.equal(selected?.url, row.url);
    assert.equal(selected?.account, '61595036942289');
    for (const language of ['he', 'pl', 'de', 'cs']) assert.notEqual(catalog.getSocialPost(row.id, 'facebook', language)?.url, row.url);
    assert.equal(catalog.getSocialPost(row.id, 'instagram', 'en')?.url || null, proof.preservedInstagramSourceURLs[row.id]);
  }
});

test('All 336 other records and every historical social row remain exact', () => {
  assert.equal(Object.keys(catalog.places).length, proof.beforeCount);
  for (const [id, expected] of Object.entries(proof.unrelatedRecordHashes)) assert.equal(hash(beforeNov19EnglishBatch01(catalog.getPlace(id))), expected, id);
  for (const [id, expected] of Object.entries(proof.changed)) {
    assert.equal(hash(beforeNov18EnglishSecondSix(catalog.getPlace(id))), expected.beforeRecordHash, id);
    assert.equal(hash(beforeNov19EnglishRegistryRows(id,registry[id]).slice(1)), expected.beforeRegistryHash, id);
  }
  for (const [id, expected] of Object.entries(proof.unrelatedRegistryHashes)) assert.equal(hash(beforeNov19EnglishRegistryRows(id, registry[id])), expected, id);
  assert.equal(hash(catalog.aliases), proof.aliasesHash);
  assert.equal(hash(catalog.coordinateConflicts), proof.coordinateConflictsHash);
});

test('Dobra uses its exact official branch URL and neutral English visit copy', () => {
  const info = proof.dobraInformation, place = catalog.getPlace(info.canonicalId);
  assert.equal(place.links.website, 'https://dobrapaczkarnia.pl/nasze-punkty/wroclaw-kuznicza/');
  assert.equal(place.description.en, info['description.en'].after);
  assert.doesNotMatch(place.description.en, /temporarily closed|open today/i);
  const legacy = {};
  runInNewContext(readFileSync('data/lifestyle-places.js', 'utf8'), {window: legacy});
  const source = legacy.WROC_LIFESTYLE_PLACES.find(row => row.id === info.canonicalId);
  assert.equal(source.links.website, place.links.website);
  assert.equal(source.description.en, place.description.en);
  assert.equal(hash(beforeNov18EnglishSecondSixLegacyRow(source)), proof.legacyDobraBeforeRecordHash);
  assert.throws(() => beforeNov18EnglishSecondSixLegacyRow({...source, links: {...source.links, extra: 'unreviewed'}}));
});

test('The historical adapter rejects unknown rows and partial Dobra changes without masking other fields', () => {
  for (const row of proof.targets) {
    const place = catalog.getPlace(row.id);
    assert.throws(() => beforeNov18EnglishSecondSix({...place, socialPosts: [...place.socialPosts, {platform: 'facebook', language: 'en', url: 'https://example.com/unreviewed'}]}));
    const changed = {...place, editorialPriority: 'unreviewed'};
    assert.equal(beforeNov18EnglishSecondSix(changed).editorialPriority, 'unreviewed');
  }
  const info = proof.dobraInformation, place = catalog.getPlace(info.canonicalId);
  assert.throws(() => beforeNov18EnglishSecondSix({...place, links: {...place.links, website: 'https://example.com/wrong-branch'}}));
});
