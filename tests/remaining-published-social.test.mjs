import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const read = name => JSON.parse(readFileSync(`data/${name}`, 'utf8'));
const window = {};
runInNewContext(readFileSync('data/place-catalog.js', 'utf8'), { window });
const catalog = window.WROC_CATALOG;
const published = read('october19-published-remaining-social-connections.json');
const accountIds = { he:'61591964083308', en:'61595036942289', pl:'61595207664875', de:'61595239823399', cs:'61594716405964' };

test('All 43 newly published exact-place posts resolve in their original language and account', () => {
  assert.equal(published.length, 43);
  assert.equal(new Set(published.map(r => `${r.canonicalId}:${r.platform}:${r.language}`)).size, 43);
  assert.equal(new Set(published.map(r => r.postId)).size, 43);
  for (const row of published) {
    const place = catalog.getPlace(row.canonicalId);
    const post = catalog.getSocialPost(place, row.platform, row.language);
    assert.equal(post?.url, row.url, `${row.canonicalId}:${row.platform}:${row.language}`);
    assert.ok(!post.routingExcluded);
    assert.match(row.evidenceSHA256, /^[a-f0-9]{64}$/);
    const url = new URL(post.url);
    if (row.platform === 'facebook') assert.equal(url.searchParams.get('id'), accountIds[row.language]);
    else {
      assert.match(url.pathname, /\/p\/[^/]+\/?$/);
      assert.equal(row.author, `wroclaw.lowersilesia${row.language === 'en' ? '' : '.' + row.language}`);
    }
  }
});

test('Nine refreshed places have ten exact language/platform routes and preserve existing media', () => {
  for (const id of new Set(published.map(r => r.canonicalId))) {
    const place = catalog.getPlace(id);
    assert.equal(place.links.socialProfileFallback, false, id);
    for (const language of ['he','en','pl','de','cs']) for (const platform of ['facebook','instagram']) {
      const post = catalog.getSocialPost(place, platform, language);
      assert.ok(post && !post.routingExcluded, `${id}:${platform}:${language}`);
      assert.equal(post.language, language);
      assert.match(post.url, platform === 'instagram' ? /\/p\// : /facebook\.com\//);
    }
  }
  const lake = catalog.getPlace('morskie-oko-wroclaw');
  assert.equal(lake.media.photos.length, 35);
  assert.equal(lake.media.videos.length, 8);
  assert.equal(Object.keys(lake.media.guideVideos).length, 2);
  const stadium = catalog.getPlace('stadion-olimpijski-wroclaw');
  assert.equal(stadium.media.photos.length, 20);
  assert.equal(stadium.media.videos.length, 6);
  assert.equal(Object.keys(stadium.media.guideVideos).length, 2);
});
