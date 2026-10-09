import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import {versionScriptUrls} from '../tools/version-script-urls.mjs';

test('Lifestyle card routes by canonical place instead of shared picture source', () => {
 const source=readFileSync(new URL('../lifestyle.js',import.meta.url),'utf8');
 const body=source.slice(source.indexOf('  function actionHtml(place) {'),source.indexOf('  function cardHtml(place) {'));
 for(const language of ['he','en','de','cs','pl']) {
  const window={WROC_CATALOG:{getSocialPost:(place,platform,lang)=>({url:`https://example.com/${place.id}/${platform}/${lang}`})}};
  const context={window,language,resources:{rynek:{instagram:'https://instagram.com/wrong-square-post/'}},googleUrl:()=>'/navigate',tr:x=>x,escapeHtml:x=>x};
  runInNewContext(body+'globalThis.render=actionHtml;',context);
  const html=context.render({id:'wedel',mediaKey:'rynek',canonicalPlace:{id:'wedel',socialPosts:[]}});
  assert.ok(html.includes(`https://example.com/wedel/instagram/${language}`));
  assert.ok(!html.includes('wrong-square-post'));
 }
});

test('Changed catalog or player code invalidates browser script caches',()=>{
 const html='<script src="/data/place-catalog.js?v=old"></script><script src="/lifestyle.js?v=old"></script>';
 const old=versionScriptUrls(html,[['/data/place-catalog.js','old-catalog'],['/lifestyle.js','stable']]);
 const updated=versionScriptUrls(html,[['/data/place-catalog.js','new-place-post'],['/lifestyle.js','stable']]);
 assert.notEqual(old,updated);
 assert.equal(old.match(/lifestyle.js\?v=([a-f0-9]+)/)[1],updated.match(/lifestyle.js\?v=([a-f0-9]+)/)[1]);
 assert.ok(!updated.includes('?v=old'));
});

function routeFixture(language) {
 const window={document:{documentElement:{lang:language}}};
 const context={window};
 for(const file of ['place-catalog','location-media','locations','premium-route']) {
  runInNewContext(readFileSync(new URL(`../data/${file}.js`,import.meta.url),'utf8'),context);
 }
 return window;
}

function resourceRenderer(file,window,language) {
 const source=readFileSync(new URL(`../${file}`,import.meta.url),'utf8');
 const start=source.indexOf('  function resourceActionsHtml(');
 const body=source.slice(start,source.indexOf('\n  function ',start+10));
 const context={window,language,currentLanguage:language,googleNavigationUrl:()=>'/navigate',
  escapeHtml:value=>String(value||'').replaceAll('&','&amp;'),t:x=>x,actionLabel:x=>x,
  resourcesFor:item=>item.resources||window.WROC_LOCATION_MEDIA?.[item.id]||window.WROC_LOCATION_MEDIA?.[item.canonicalPlaceId]||{},
  text:value=>value?.[language]||value?.en||''};
 runInNewContext(body+'globalThis.render=resourceActionsHtml;',context);
 return context.render;
}

test('24-hour and four-day social actions use canonical identity across all languages without media entries or aliases',()=>{
 for(const language of ['en','he','pl','de','cs']) {
  const window=routeFixture(language);
  for(const [file,items] of [['app.js',window.LOCATIONS],['premium.js',[...window.PREMIUM_STOPS,...window.PREMIUM_RECOMMENDATIONS]]]) {
   const render=resourceRenderer(file,window,language);
   for(const item of items) {
    const place=window.WROC_CATALOG.getPlace(item.canonicalPlaceId||item.id);
    if(!place) continue;
    // A shared picture source must never override the card's canonical place.
    const html=render({...item,resources:{facebook:'https://facebook.com/wrong-place',instagram:'https://instagram.com/wrong-place',gallery:['/original.jpg'],videos:[{src:'/original-video'}]}});
    for(const platform of ['facebook','instagram']) {
     const expected=window.WROC_CATALOG.getSocialPost(place,platform,language).url.replaceAll('&','&amp;');
     assert.ok(html.includes(expected),`${file} ${item.id} ${language} ${platform}`);
    }
    assert.ok(!html.includes('wrong-place'));
    assert.ok(html.includes('/navigate'));
    assert.ok(html.includes('gallery-resource'));
    assert.ok(html.includes('video-resource'));
   }
  }
 }
});

test('premium recommendations retain editorial text, hydrate canonical-only places, and expose social/media actions',()=>{
 const window=routeFixture('en');
 const lake=window.PREMIUM_RECOMMENDATIONS.find(item=>item.id==='morskie-oko-wroclaw');
 const stadium=window.PREMIUM_RECOMMENDATIONS.find(item=>item.id==='stadion-olimpijski-wroclaw');
 for(const item of [lake,stadium]) {
  assert.ok(item.name.en);
  assert.ok(item.description.en);
  assert.equal(item.name.en,item.canonicalPlace.name.en);
 }
 assert.equal(window.PREMIUM_RECOMMENDATIONS.find(item=>item.id==='renoma-rec').name.en,'Renoma – shopping and architecture');
 const source=readFileSync(new URL('../premium.js',import.meta.url),'utf8');
 const body=source.slice(source.indexOf('  function renderRecommendations()'),source.indexOf('\n  function render()',source.indexOf('  function renderRecommendations()')));
 const grid={innerHTML:''};
 const context={window,document:{getElementById:()=>grid},recommendationFilter:'all',language:'en',
  t:x=>x,text:value=>value?.en||'',escapeHtml:x=>String(x||''),placeAmenities:{labelBadgeHtml:()=>''},resourceActionsHtml:resourceRenderer('premium.js',window,'en')};
 runInNewContext(body+'renderRecommendations();',context);
 assert.ok(grid.innerHTML.includes('data-canonical-place-id="renoma"'));
 assert.ok(grid.innerHTML.includes('https://www.instagram.com/p/DeRG3F0FyOF/'));
 assert.ok(grid.innerHTML.includes('https://www.instagram.com/p/DeRMKpzFm-Z/'));
 assert.ok(grid.innerHTML.includes(lake.name.en));
 // Media controls on repeated recommendations must be resolvable by the modal opener.
 const lookup=source.slice(source.indexOf('  function locationById('),source.indexOf('\n  function renderGalleryPhoto('));
 runInNewContext(lookup+'globalThis.findLocation=locationById;',context);
 assert.equal(context.findLocation('renoma-rec').canonicalPlaceId,'renoma');
});
