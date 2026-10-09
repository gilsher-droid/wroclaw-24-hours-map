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
