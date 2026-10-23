import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { runInNewContext } from 'node:vm';
import test from 'node:test';

const root = resolve(import.meta.dirname, '..');
test('Pizza Si and Czarna Magia expose one localized Lifestyle point with curated original galleries', () => {
  const provenance = JSON.parse(readFileSync(resolve(root, 'data/pizza-magia-photo-provenance.json')));
  for (const language of ['he', 'en', 'pl', 'de', 'cs']) {
    const window = { document: { documentElement: { lang: language } } };
    const context = { window, console };
    for (const file of ['data/place-catalog.js', 'data/location-media.js', 'data/lifestyle-places.js']) {
      runInNewContext(readFileSync(resolve(root, file), 'utf8'), context);
    }
    for (const [id, count] of [['pizza-si', 8], ['czarna-magia', 17]]) {
      const place = window.WROC_CATALOG.getPlace(id);
      const points = window.WROC_LIFESTYLE_PLACES.filter(p => p.canonicalPlaceId === id);
      assert.equal(points.length, 1, `${language}: ${id} must have one point`);
      assert.ok(place.name[language]);
      assert.ok(place.description[language]);
      assert.equal(points[0].mediaKey, id);
      assert.equal(window.WROC_LOCATION_MEDIA[id].gallery.length, count);
      assert.deepEqual(Array.from(window.WROC_LOCATION_MEDIA[id].gallery), Array.from(place.media.photos));
      assert.equal(new Set(place.media.photos).size, count);
      assert.equal(place.media.videos.length, id==='czarna-magia'?4:0);
      assert.ok(place.links.navigation.googleMaps.startsWith('https://www.google.com/maps/'));
      const selection = provenance.places[id];
      assert.equal(new Set(selection.selected.map(p => p.pixelSHA256)).size, selection.selected.length);
      for (const row of selection.selected) {
        assert.ok(place.media.photos.includes(row.asset));
        const sha = createHash('sha256').update(readFileSync(resolve(root, row.asset.slice(1)))).digest('hex');
        assert.equal(sha, row.assetSHA256);
        assert.equal(place.media.metadata[row.asset].sourceSHA256, row.sha256);
      }
      assert.ok(selection.excluded.some(p => /personal/.test(p.reason)));
    }
    const pizza = window.WROC_CATALOG.getPlace('pizza-si');
    assert.ok(pizza.socialPosts.some(p => p.platform === 'facebook'));
    assert.equal(pizza.socialPosts.filter(p => p.platform === 'facebook' && p.language).length, 3);
    assert.equal(pizza.socialPosts.filter(p => p.platform === 'instagram').length, 0);
    assert.equal(window.WROC_CATALOG.getPlace('czarna-magia').socialPosts.length, 0);
    assert.ok(window.WROC_LIFESTYLE_PLACES.find(p => p.canonicalPlaceId === 'czarna-magia').categories.includes('drink'));
  }
});
