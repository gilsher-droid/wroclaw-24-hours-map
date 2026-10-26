import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {runInNewContext} from 'node:vm';
const root=new URL('../',import.meta.url),window={};
for(const file of ['data/place-catalog.js','data/canonical-experiences.js','data/cultural-places.js'])runInNewContext(readFileSync(new URL(file,root),'utf8'),{window,console});
test('District and synagogue remain separate identities with one cultural pin each and audited original photos',()=>{
 for(const [id,lat,lng,count] of [['four-denominations-district',51.10968,17.023753,33],['white-stork-synagogue-wroclaw',51.108468291071,17.025364605411,9]]){
  const place=window.WROC_CATALOG.getPlace(id);
  assert.equal(place.location.coordinates.lat,lat);assert.equal(place.location.coordinates.lng,lng);
  assert.equal(window.WROC_CULTURAL_PLACES.filter(p=>p.id===id).length,1);
  assert.equal(place.media.photos.length,count);
  for(const src of place.media.photos){const meta=place.media.metadata[src];assert.equal(meta.familyForeground,false);assert.equal(createHash('sha256').update(readFileSync(new URL(src.slice(1),root))).digest('hex'),meta.assetSHA256);for(const lang of ['he','en','pl','de','cs'])assert.ok(meta.alt[lang].length>10);}
  for(const lang of ['he','en','pl','de','cs']){assert.ok(place.description[lang].length>100);for(const platform of ['facebook','instagram'])assert.equal(window.WROC_CATALOG.getSocialPost(place,platform,lang),null);}
 }
 assert.equal(window.WROC_CATALOG.resolveId('four-religions'),'four-denominations-district');
 assert.equal(window.WROC_CATALOG.resolveId('white-stork-synagogue'),'white-stork-synagogue-wroclaw');
 assert.equal(window.WROC_CATALOG.getPlace('zyjnia-bwa-wroclaw').media.videos.length,9);
 assert.equal(window.WROC_CATALOG.getPlace('zyjnia-bwa-wroclaw').media.photos.length,12);
});
