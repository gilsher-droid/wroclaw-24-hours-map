import {beforePolishRichPosts} from './polish-rich-posts-historical-baseline.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {runInNewContext} from 'node:vm';
const w={};for(const f of ['data/place-catalog.js','data/location-media.js'])runInNewContext(readFileSync(f,'utf8'),{window:w});
const c=w.WROC_CATALOG,asset='/assets/feels-familiar/chatka-placki.jpg';
const before=JSON.parse(readFileSync('tests/fixtures/jolie-photo-attribution-nov8-before.json'));
const plain=v=>JSON.parse(JSON.stringify(v));
test('owner correction moves only the exact photograph to Jolie and preserves its bytes and all other photos',()=>{
 assert.equal(createHash('sha256').update(readFileSync('.'+asset)).digest('hex'),'a8c5b2658353ac7e97b339ae6e245d83acbf627b0b2d75f553dfaf494eea2b08');
 assert.deepEqual(plain(c.places.chatka.media.photos),before.chatka.media.photos.filter(p=>p!==asset));
 assert.deepEqual(plain(c.places['jolie-kurzy-targ'].media.photos),[...before['jolie-kurzy-targ'].media.photos,asset]);
 for(const id of ['chatka','jolie-kurzy-targ']){
  assert.deepEqual(plain(w.WROC_LOCATION_MEDIA[id].gallery),plain(c.places[id].media.photos));
  for(const key of ['id','location','name','socialPosts','links'])assert.deepEqual(plain(beforePolishRichPosts(c.places[id])[key]),before[id][key]);
 }
 assert.ok(!c.places.chatka.media.metadata?.[asset]);
 const m=c.places['jolie-kurzy-targ'].media.metadata[asset];
 for(const lang of ['he','en','pl','de','cs']){assert.ok(m.alt[lang]);assert.ok(m.title[lang]);assert.ok(c.places.chatka.description[lang]);}
 for(const term of ['לביבות','potato pancakes','placki ziemniaczane','Kartoffelpuffer','bramboráky'])assert.ok(Object.values(c.places.chatka.description).some(d=>d.includes(term)));
 assert.equal(m.canonicalPlaceId,'jolie-kurzy-targ');
});
