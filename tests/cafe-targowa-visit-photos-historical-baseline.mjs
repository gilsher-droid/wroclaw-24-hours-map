import {beforePolskieJadloSnapshot} from './polskie-jadlo-market-historical-baseline.mjs';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const proof = JSON.parse(readFileSync('data/cafe-targowa-visit-photos-preservation-nov15.json', 'utf8'));
const clone = value => JSON.parse(JSON.stringify(value));
const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');

// Historical receipts keep their original scope. Only this exact newly approved
// gallery/map delta can be projected; the fresh test protects the real state.
export function beforeCafeTargowaRecord(value) {
  if (value?.id !== 'cafe-targowa' || !value.media?.photos?.some(src => proof.newAssets.includes(src))) return value;
  assert.equal(hash(value), proof.targetAfterHash, 'Unreviewed Cafe Targowa record change');
  return clone(proof.targetBefore);
}

export function beforeCafeTargowaExperience(value) {
  if (value?.id !== 'coffee-lovers-wroclaw' || !value.relatedCanonicalPlaceIds?.includes('cafe-targowa')) return value;
  assert.equal(hash(value), proof.coffeeAfterHash, 'Unreviewed Cafe Targowa coffee membership');
  return clone(proof.coffeeBefore);
}

export function beforeCafeTargowaGallery(value, id) {
  if (id !== 'cafe-targowa' || !value?.some(src => proof.newAssets.includes(src))) return value;
  assert.deepEqual(clone(value), proof.targetAfter.media.photos, 'Unreviewed Cafe Targowa gallery');
  return clone(proof.targetBefore.media.photos);
}

export function beforeCafeTargowaSnapshot(window) {
  beforePolskieJadloSnapshot(window);
  const catalog = window.WROC_CATALOG;
  if (catalog) {
    beforeCafeTargowaRecord(catalog.getPlace('cafe-targowa'));
    const products = {...catalog.products};
    const lifestyle = products['lifestyle-guide'];
    if (lifestyle) products['lifestyle-guide'] = {...lifestyle, places:lifestyle.places.filter(row => {
      if (row.placeId !== 'cafe-targowa') return true;
      assert.deepEqual(clone(row), proof.productRecordAfter, 'Unreviewed Cafe Targowa map reference');
      return false;
    })};
    window.WROC_CATALOG = {...catalog, products,
      places:Object.fromEntries(Object.entries(catalog.places).map(([id, value]) => [id, beforeCafeTargowaRecord(value)])),
      getPlace:id => beforeCafeTargowaRecord(catalog.getPlace(id))};
  }
  if (window.WROC_LIFESTYLE_PLACES) window.WROC_LIFESTYLE_PLACES = window.WROC_LIFESTYLE_PLACES.filter(row => {
    if ((row.canonicalPlaceId || row.id) !== 'cafe-targowa') return true;
    const withoutCanonical = value => Object.fromEntries(Object.entries(value).filter(([key]) => key !== 'canonicalPlace'));
    assert.deepEqual(clone(withoutCanonical(row)), withoutCanonical(proof.lifestyleAfter), 'Unreviewed Cafe Targowa map row');
    if (row.canonicalPlace) assert.deepEqual(clone(beforeCafeTargowaRecord(row.canonicalPlace)), proof.targetBefore, 'Unreviewed Cafe Targowa attached canonical');
    return false;
  });
  if (window.WROC_LOCATION_MEDIA?.['cafe-targowa']?.gallery?.some(src => proof.newAssets.includes(src))) {
    assert.deepEqual(clone(window.WROC_LOCATION_MEDIA['cafe-targowa']), proof.mediaAfter, 'Unreviewed Cafe Targowa map gallery');
    window.WROC_LOCATION_MEDIA['cafe-targowa'] = clone(proof.mediaBefore);
  }
  const registry = window.WROC_EXPERIENCE_CATALOG;
  if (registry) window.WROC_EXPERIENCE_CATALOG = {...registry,
    experiences:registry.experiences.map(beforeCafeTargowaExperience),
    byId:Object.fromEntries(Object.entries(registry.byId).map(([id, value]) => [id, beforeCafeTargowaExperience(value)])),
    getExperience:id => beforeCafeTargowaExperience(registry.getExperience(id)),
    forProduct:id => registry.forProduct(id).map(beforeCafeTargowaExperience),
    resolveMedia:value => registry.resolveMedia(typeof value === 'string' && value === 'coffee-lovers-wroclaw'
      ? beforeCafeTargowaExperience(registry.getExperience(value)) : beforeCafeTargowaExperience(value))};
  return window;
}
