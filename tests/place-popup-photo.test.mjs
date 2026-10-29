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
test('Places without media display the authorized site logo without inventing a gallery photo',()=>{
 const w=runtime();assert.equal(w.WROC_PLACE_POPUP_PHOTO.html(null),'');
 const place={id:'unknown-place',name:{en:'Unknown'},media:{photos:[]}},before=JSON.stringify(place);
 for(const lang of ['he','en','pl','de','cs']){const html=w.WROC_PLACE_POPUP_PHOTO.html(place,lang);assert.ok(html.includes('src="/assets/logo.png"'));assert.ok(html.includes('data-place-photo-fallback="logo"'));assert.ok(html.includes('WROC-LOVE'));assert.ok(!html.includes('<a '));assert.ok(!html.includes('data-gallery'));}
 assert.equal(JSON.stringify(place),before,'rendering does not add logo to media or change gallery counts');
 assert.equal(w.WROC_PLACE_POPUP_PHOTO.sourceFor(place),'');
 place.media.photos.push('/assets/new-real-photo.jpg');
 const replacement=w.WROC_PLACE_POPUP_PHOTO.html(place,'en');assert.ok(replacement.includes('src="/assets/new-real-photo.jpg"'));assert.ok(!replacement.includes('data-place-photo-fallback'));
 assert.equal(w.WROC_PLACE_POPUP_PHOTO.placeholderHtml(place,'en'),'','real photos automatically replace logo fallback');
 assert.equal(w.WROC_PLACE_POPUP_PHOTO.sourceFor({media:{photos:['javascript:alert(1)','data:text/html,invalid']}}),'');
 const html=w.WROC_PLACE_POPUP_PHOTO.html({name:{en:'A <place> & "name"'},media:{photos:['/assets/a.jpg']}},'en');assert.ok(html.includes('A &lt;place&gt; &amp; &quot;name&quot;'));assert.ok(!html.includes('alt="A <place>'));
});
test('Solny uses its four approved photographs while unphotographed canonicals keep a localized logo',()=>{
 const w=runtime();const solny=w.WROC_CATALOG.getPlace('solny');assert.equal(solny.media.photos.length,4);assert.ok(w.WROC_PLACE_POPUP_PHOTO.sourceFor(solny).includes('/named-wroclaw-oct28/'));
 for(const p of Object.values(w.WROC_CATALOG.places)){if(w.WROC_PLACE_POPUP_PHOTO.sourceFor(p))continue;for(const lang of ['he','en','pl','de','cs']){const html=w.WROC_PLACE_POPUP_PHOTO.imageHtml(p,lang);assert.ok(html.includes('place-photo-logo'));assert.ok(html.includes('alt="'));assert.ok(!html.includes('javascript:'));}}
 const flatGuide={name:{en:'Guide-map place'},thumbnail:'/assets/a.jpg',photos:['/assets/a.jpg']};assert.equal(w.WROC_PLACE_POPUP_PHOTO.sourceFor(flatGuide),'/assets/a.jpg');
});
test('All six map pages and the published artifact load the shared popup photo renderer',()=>{
 for(const [page,renderer] of [['map','app'],['premium','premium'],['moshe','premium'],['lifestyle','lifestyle'],['cultural','cultural'],['excursions','excursions']]){
  const html=readFileSync(`${page}.html`,'utf8');assert.ok(html.includes('/place-popup-photo.css?v='));assert.ok(html.indexOf('/place-popup-photo.js?v=')<html.indexOf(`/${renderer}.js?v=`));assert.ok(readFileSync(`${renderer}.js`,'utf8').includes('WROC_PLACE_POPUP_PHOTO.html('));
 }
 for(const f of ['place-popup-photo.js','place-popup-photo.css'])assert.ok(existsSync(`dist/client/${f}`));
});
test('Thumbnail delegates to the existing gallery, preserves native excursion handling and safe fallback',()=>{
 const handlers={};runInNewContext(readFileSync('place-popup-photo.js','utf8'),{window:{},document:{addEventListener(type,handler){handlers[type]=handler;}}});
 let clicked=0,prevented=0,stopped=0;
 const gallery={click(){clicked++;}};
 const thumbnail={hasAttribute(){return false;},closest(){return {querySelector(){return gallery;}};}};
 const event={target:{closest(){return thumbnail;}},preventDefault(){prevented++;},stopPropagation(){stopped++;}};
 handlers.click(event);assert.equal(clicked,1);assert.equal(prevented,1);assert.equal(stopped,1);
 thumbnail.hasAttribute=()=>true;handlers.click(event);assert.equal(clicked,1,'native excursion handler owns this click');
 thumbnail.hasAttribute=()=>false;thumbnail.closest=()=>({querySelector(){return null;}});handlers.click(event);assert.equal(prevented,1,'unavailable gallery keeps the existing image fallback');
});
