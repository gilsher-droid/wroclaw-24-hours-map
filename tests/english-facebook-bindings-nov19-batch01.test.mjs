import {beforeNov20Guides} from './opera-jatki-zoo-historical-baseline.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {runInNewContext} from 'node:vm';
import {englishNov19Batch01 as proof, beforeNov19EnglishBatch01, beforeNov19EnglishRegistryRows} from './english-facebook-bindings-nov19-batch01-historical-baseline.mjs';
const window = {}; runInNewContext(readFileSync('data/place-catalog.js', 'utf8'), {window});
const c = window.WROC_CATALOG, registry = JSON.parse(readFileSync('data/localized-social-posts.json'));
const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');
test('Verified Nov19 original-account English posts resolve without altering other canonical data', () => {
  assert.equal(Object.keys(c.places).length, proof.beforeCount);
  for (const t of proof.targets) {
    assert.equal(c.getSocialPost(t.id, 'facebook', 'en')?.url, t.url);
    assert.equal(c.getSocialPost(t.id, 'facebook', 'en')?.account, '61595036942289');
    assert.equal(hash(beforeNov19EnglishBatch01(c.getPlace(t.id))), proof.changed[t.id].beforeRecordHash, t.id);
    assert.equal(hash(beforeNov19EnglishRegistryRows(t.id, registry[t.id])), proof.changed[t.id].beforeRegistryHash, t.id);
  }
  for (const [id, h] of Object.entries(proof.unrelatedRecordHashes)) assert.equal(hash(beforeNov20Guides(c.getPlace(id))), h, id);
  for (const [id, h] of Object.entries(proof.unrelatedRegistryHashes)) assert.equal(hash(registry[id]), h, id);
  assert.equal(hash(c.aliases), proof.aliasesHash); assert.equal(hash(c.coordinateConflicts), proof.coordinateConflictsHash);
});
test('Historical projections reject unreviewed social changes and preserve unrelated fields', () => {
  for (const t of proof.targets) {
    const p = c.getPlace(t.id);
    assert.throws(() => beforeNov19EnglishBatch01({...p, socialPosts: [...p.socialPosts, {url: 'https://example.com/unreviewed'}]}));
    assert.throws(() => beforeNov19EnglishRegistryRows(t.id, [...registry[t.id], {url: 'https://example.com/unreviewed'}]));
    assert.equal(beforeNov19EnglishBatch01({...p, editorialPriority: 'unreviewed'}).editorialPriority, 'unreviewed');
  }
});
