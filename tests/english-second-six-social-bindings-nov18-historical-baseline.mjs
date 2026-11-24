import {beforeCzechEightLegacyRow} from './czech-eight-photo-bindings-historical-baseline.mjs';
import {beforeNov20Legacy} from './opera-jatki-zoo-historical-baseline.mjs';
import {beforeNov19EnglishBatch01, expectedNov19EnglishURL} from './english-facebook-bindings-nov19-batch01-historical-baseline.mjs';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';

export const englishSecondSixNov18 = JSON.parse(readFileSync('tests/fixtures/english-second-six-social-bindings-20261118.json'));
const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');

// Project only the exact accepted social arrays and the two reviewed Dobra cells.
// Unrelated fields and unknown social changes remain observable to older receipts.
export function beforeNov18EnglishSecondSix(place) {
  place = beforeNov19EnglishBatch01(place);
  if (!place) return place;
  const proof = englishSecondSixNov18.changed[place.id];
  let result = place;
  if (proof && hash(result.socialPosts) !== proof.beforeSocialHash && result.socialPosts?.some(post => post.context === englishSecondSixNov18.context)) {
    assert.equal(hash(result.socialPosts), proof.afterSocialHash, 'Unexpected second-six English social delta: ' + place.id);
    result = {...result, socialPosts: proof.beforeSocialPosts};
  }
  const info = englishSecondSixNov18.dobraInformation;
  if (place.id === info.canonicalId) {
    const oldDescription = info['description.en'].before, newDescription = info['description.en'].after;
    const oldWebsite = info['links.website'].before, newWebsite = info['links.website'].after;
    const description = result.description.en, website = result.links.website;
    if (description === newDescription || website === newWebsite) {
      assert.equal(description, newDescription, 'Unexpected Dobra English description delta');
      assert.equal(website, newWebsite, 'Unexpected Dobra official branch URL delta');
      result = {...result, description: {...result.description, en: oldDescription}, links: {...result.links, website: oldWebsite}};
    } else {
      assert.equal(description, oldDescription, 'Unexpected Dobra historical English description');
      assert.equal(website, oldWebsite, 'Unexpected Dobra historical website');
    }
  }
  return result;
}

export function expectedNov18EnglishSecondSixURL(id, platform, language, historical) {
  return expectedNov19EnglishURL(id, platform, language, englishSecondSixNov18.targets.find(row => row.id === id && row.platform === platform && row.language === language)?.url || historical);
}

export function beforeNov18EnglishSecondSixLegacyRow(row) {
 row=beforeCzechEightLegacyRow(row);
 row=beforeNov20Legacy(row);
  const info = englishSecondSixNov18.dobraInformation;
  if (row?.id !== info.canonicalId) return row;
  const oldDescription = info['description.en'].before, newDescription = info['description.en'].after;
  const newWebsite = info['links.website'].after;
  if (row.description.en === newDescription || row.links?.website === newWebsite) {
    assert.equal(row.description.en, newDescription, 'Unexpected Dobra legacy description');
    assert.equal(hash(row.links), hash({website: newWebsite}), 'Unexpected Dobra legacy links');
    const projected = {...row, description: {...row.description, en: oldDescription}};
    delete projected.links;
    return projected;
  }
  assert.equal(row.description.en, oldDescription);
  assert.equal(row.links, undefined);
  return row;
}
