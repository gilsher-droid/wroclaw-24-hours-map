import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { runInNewContext } from 'node:vm';
import test from 'node:test';
const root = new URL('../', import.meta.url);
test('Mała Czarna has one exact cafe point and verified photo/video media in five languages', () => {
 const proof = JSON.parse(readFileSync(new URL('data/mala-czarna-media-provenance.json', root)));
 for (const lang of ['he','en','pl','de','cs']) {
  const window = { document:{documentElement:{lang}} };
  for (const file of ['data/place-catalog.js','data/location-media.js','data/lifestyle-places.js','data/youtube-video-hosting.js']) runInNewContext(readFileSync(new URL(file,root),'utf8'),{window,console});
  const place=window.WROC_CATALOG.getPlace('mala-czarna-paderewskiego');
  assert.ok(place.name[lang] && place.description[lang]);
  assert.equal(window.WROC_LIFESTYLE_PLACES.filter(p=>p.canonicalPlaceId===place.id).length,1);
  assert.equal(place.location.coordinates.lat,51.1174365);
  assert.equal(place.location.coordinates.lng,17.0905595);
  const media=window.WROC_LOCATION_MEDIA[place.id];
  assert.equal(media.gallery.length,5);
  assert.equal(new Set(media.gallery).size,5);
  assert.equal(place.links.socialProfileFallback,false);
  assert.equal(window.WROC_CATALOG.getSocialPost(place,"facebook",lang),null);
  assert.equal(window.WROC_CATALOG.getSocialPost(place,"instagram",lang),null);
  assert.equal(media.videos[0].src,'https://youtube.com/watch?v=xUGky_l826A');
  assert.equal(window.WROC_YOUTUBE_VIDEO_HOSTING['/assets/mala-czarna-visit-01.mp4'].status,'public');
  assert.notEqual(window.WROC_CATALOG.getPlace('czarna-magia').id,place.id);
  assert.equal(place.socialPosts.length,0);
  for (const photo of proof.photos) assert.equal(createHash('sha256').update(readFileSync(new URL(photo.asset.slice(1),root))).digest('hex'),photo.sha256);
 }
});
