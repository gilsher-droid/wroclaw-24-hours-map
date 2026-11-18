import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {runInNewContext} from 'node:vm';
import {beforeNov18EnglishRenoma, englishRenomaNov18 as proof} from './english-renoma-social-binding-nov18-historical-baseline.mjs';
const window = {};
runInNewContext(readFileSync('data/place-catalog.js', 'utf8'), {window});
const catalog = window.WROC_CATALOG;
const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');

test('Renoma opens its verified English Facebook gallery and preserves English Instagram', () => {
  assert.equal(catalog.getSocialPost('renoma', 'facebook', 'en')?.url, proof.row.url);
  assert.equal(catalog.getSocialPost('renoma', 'facebook', 'en')?.account, proof.row.account);
  assert.equal(catalog.getSocialPost('renoma', 'instagram', 'en')?.url, proof.beforeIGEnglish);
  for (const language of ['he', 'pl', 'de', 'cs']) assert.notEqual(catalog.getSocialPost('renoma', 'facebook', language)?.url, proof.row.url);
});

test('Renoma retains all original fields, media, historical social rows and the 347 place catalogue', () => {
  const place = catalog.getPlace('renoma');
  assert.equal(Object.keys(catalog.places).length, proof.beforeCount);
  assert.equal(hash(beforeNov18EnglishRenoma(place)), proof.beforeRecordHash);
  assert.equal(hash(Object.fromEntries(Object.entries(place).filter(([key]) => key !== 'socialPosts'))), proof.beforeNonSocialHash);
  for (const old of proof.beforeSocialPosts) assert.ok(place.socialPosts.some(row => hash(row) === hash(old)));
});

test('The narrow Renoma receipt rejects extra social changes without hiding independent fields', () => {
  const place = catalog.getPlace('renoma');
  assert.throws(() => beforeNov18EnglishRenoma({...place, socialPosts: [...place.socialPosts, {platform: 'instagram', language: 'en', url: 'https://example.com/unreviewed'}]}));
  const changed = {...place, description: {...place.description, en: place.description.en + ' independent content'}};
  assert.equal(beforeNov18EnglishRenoma(changed).description.en, changed.description.en);
});
