import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
function runtime(){const window={},document={addEventListener(){}};for(const f of ['data/place-catalog.js','data/canonical-experiences.js','place-popup-photo.js'])runInNewContext(readFileSync(f,'utf8'),{window,document});return window;}
test('Popup photos preserve exact canonical place and alias ownership in every language',()=>{
 const w=runtime();let photographed=0;
 for(const p of Object.values(w.WROC_CATALOG.places)){
  const photo=p.media?.thumbnail || p.media?.photos?.[0];if(!photo)continue;photographed++;
  assert.equal(w.WROC_PLACE_POPUP_PHOTO.sourceFor({canonicalPlaceId:p.id,resources:{gallery:['/assets/unrelated.jpg']}}),photo);
  assert.ok(existsSync(photo.slice(1)),p.id);
  for(const lang of ['he','en','pl','de','cs']){const html=w.WROC_PLACE_POPUP_PHOTO.html({canonicalPlaceId:p.id},lang);assert.ok(html.includes(`src="${photo}"`));assert.ok(html.includes('width="240" height="135"'));assert.ok(!html.includes('unrelated.jpg'));}
 }
 assert.ok(photographed>0);
});
test('Places without media never receive another place photo or a generic placeholder',()=>{
 const w=runtime();assert.equal(w.WROC_PLACE_POPUP_PHOTO.html(null),'');assert.equal(w.WROC_PLACE_POPUP_PHOTO.html({id:'unknown-place',name:{en:'Unknown'}}),'');
 assert.equal(w.WROC_PLACE_POPUP_PHOTO.sourceFor({media:{photos:['javascript:alert(1)','data:text/html,invalid']}}),'');
 const html=w.WROC_PLACE_POPUP_PHOTO.html({name:{en:'A <place> & "name"'},media:{photos:['/assets/a.jpg']}},'en');assert.ok(html.includes('A &lt;place&gt; &amp; &quot;name&quot;'));assert.ok(!html.includes('alt="A <place>'));
});
test('All six map pages and the published artifact load the shared popup photo renderer',()=>{
 for(const [page,renderer] of [['map','app'],['premium','premium'],['moshe','premium'],['lifestyle','lifestyle'],['cultural','cultural'],['excursions','excursions']]){
  const html=readFileSync(`${page}.html`,'utf8');assert.ok(html.includes('/place-popup-photo.css?v='));assert.ok(html.indexOf('/place-popup-photo.js?v=')<html.indexOf(`/${renderer}.js?v=`));assert.ok(readFileSync(`${renderer}.js`,'utf8').includes('WROC_PLACE_POPUP_PHOTO.html('));
 }
 for(const f of ['place-popup-photo.js','place-popup-photo.css'])assert.ok(existsSync(`dist/client/${f}`));
});
