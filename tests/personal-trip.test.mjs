import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { runInNewContext } from 'node:vm';
const root=resolve(import.meta.dirname,'..');
const read=file=>readFileSync(resolve(root,file),'utf8');

test('personal planning provides complete five-language copy without exposing recipient addresses',()=>{
  const window={};runInNewContext(read('personal-trip-copy.js'),{window});
  const copy=window.WROC_PERSONAL_COPY;
  const keys=Object.keys(copy.he).sort();
  for(const lang of ['he','en','de','cs','pl']){
    assert.deepEqual(Object.keys(copy[lang]).sort(),keys);
    for(const key of keys)assert.ok(typeof copy[lang][key]==='string'&&copy[lang][key].length,`${lang}.${key}`);
    assert.ok(copy[lang].quoteNote&&copy[lang].consent&&copy[lang].error&&copy[lang].successText);
  }
  for(const file of ['personal-trip.html','personal-trip-copy.js','personal-trip.js','privacy.js']){
    assert.doesNotMatch(read(file),/[\w.+-]+@gmail\.com/i,`${file} leaks a private recipient`);
  }
  assert.doesNotMatch(read('personal-trip.js'),/localStorage|sessionStorage|mailto:|gtag\(|fbq\(/);
  assert.match(read('personal-trip.js'),/credentials: 'omit'/);
  assert.match(read('personal-trip.js'),/result\.accepted !== true/);
  assert.match(read('personal-trip.js'),/const requestId = crypto\.randomUUID\(\)/);
});
test('both demo days reuse three distinct photographed canonical places and preserve existing maps',()=>{
  const window={};runInNewContext(read('data/place-catalog.js'),{window});
  for(const ids of [['rynek','czarna-magia','university'],['japanese','hala','fountain']]){
    const places=ids.map(id=>window.WROC_CATALOG.getPlace(id));
    assert.equal(new Set(places.map(p=>p.id)).size,3);
    for(const p of places){assert.ok(p.media.photos.length);assert.ok(existsSync(resolve(root,p.media.photos[0].slice(1))))}
  }
  assert.match(read('build-static.mjs'),/"personal-trip\.html"/);
  assert.match(read('personal-trip.html'),/type="submit" id="send"/);
  assert.doesNotMatch(read('personal-trip.html'),/paypal|stripe|checkout\.js/i);
});
test('request endpoint keeps recipient configuration and stored inquiries outside public hosting',()=>{
  const php=read('bluehost-api/public/trip-requests/index.php');
  assert.match(php,/dirname\(__DIR__, 2\) \. '\/trip-requests-private'/);
  assert.match(php,/fingerprint/);
  assert.match(php,/LOCK_EX/);
  assert.match(php,/hash_hmac\('sha256'/);
  assert.match(php,/accepted-by-mail-server/);
  assert.doesNotMatch(php,/[\w.+-]+@gmail\.com/i);
  assert.doesNotMatch(read('build-static.mjs'),/cp\([^\n]+bluehost-api/);
});
