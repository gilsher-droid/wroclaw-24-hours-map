import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import test from 'node:test';
const window = {};
for (const file of ['data/locations.js', 'data/extra-languages.js']) {
  runInNewContext(readFileSync(new URL('../' + file, import.meta.url), 'utf8'), { window });
}
const overrides = JSON.parse(readFileSync(new URL('../data/extra-language-overrides.json', import.meta.url), 'utf8'));
test('German and Czech evening stops have translated names and descriptions', () => {
  assert.ok(window.EVENING_LOCATIONS.length > 0);
  for (const lang of ['de', 'cs']) {
    for (const stop of window.EVENING_LOCATIONS) {
      for (const field of ['name', 'description']) {
        const english = stop[field]?.en;
        if (!english) continue;
        const translated = window.EXTRA_ROUTE_TRANSLATIONS[lang][english];
        assert.ok(translated, `${lang}: ${stop.id} ${field} absent`);
        assert.notEqual(translated, english, `${lang}: ${stop.id} ${field} still English`);
      }
    }
  }
});
test('curated translations survive generated route dictionaries', () => {
  for (const [lang, dictionary] of Object.entries(overrides)) {
    for (const [source, expected] of Object.entries(dictionary)) {
      assert.equal(window.EXTRA_ROUTE_TRANSLATIONS[lang][source], expected, `${lang}: ${source}`);
    }
  }
});
