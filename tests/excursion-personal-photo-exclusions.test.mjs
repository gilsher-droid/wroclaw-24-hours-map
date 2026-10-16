import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {runInNewContext} from 'node:vm';

test('Personal excursion portraits remain outside canonical galleries and public artifacts',()=>{
 const excluded=JSON.parse(readFileSync('data/excursion-personal-photo-exclusions.json','utf8')).photos;
 const window={};runInNewContext(readFileSync('data/place-catalog.js','utf8'),{window});
 assert.equal(excluded.length,24);
 for(const photo of excluded){
  assert.equal(photo.excluded,true);
  assert.equal(existsSync(photo.asset.slice(1)),false,`public original copy must be removed: ${photo.asset}`);
  assert.equal(existsSync('dist/client'+photo.asset),false,`artifact must exclude ${photo.asset}`);
  for(const place of Object.values(window.WROC_CATALOG.places))assert.equal(place.media.photos.includes(photo.asset),false);
 }
});
