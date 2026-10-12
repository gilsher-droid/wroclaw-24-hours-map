import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const registry=JSON.parse(readFileSync(new URL('../data/localized-social-posts.json',import.meta.url),'utf8'));
test('verified original visual editions route each canonical point to its matching language and retain galleries and prior posts',()=>{
 const window={};runInNewContext(readFileSync(new URL('../data/place-catalog.js',import.meta.url),'utf8'),{window});
 for(const id of ['japanese','wuwa-estate'])for(const lang of ['he','en','de','cs','pl'])for(const platform of ['facebook','instagram']){
  const rows=registry[id].filter(p=>p.language===lang&&p.platform===platform);
  const visual=rows.filter(p=>p.context?.startsWith('original-visual-'));
  assert.equal(visual.length,2,`${id} ${lang} ${platform}: one verified reel and one gallery`);
  assert.ok(visual.some(p=>p.context==='original-visual-gallery'));
  const expected=visual.find(p=>p.context==='original-visual-reel')||visual[0];
  const place=window.WROC_CATALOG.getPlace(id);
  assert.equal(window.WROC_CATALOG.getSocialPost(place,platform,lang).url,expected.url);
  for(const post of visual)assert.ok(place.socialPosts.some(p=>p.url===post.url&&p.language===lang&&p.platform===platform));
  assert.ok(rows.some(p=>!p.context?.startsWith('original-visual-')),`${id} ${lang} ${platform}: historical post preserved`);
 }
 const cafe=window.WROC_CATALOG.getPlace('wuwa');
 assert.ok(cafe.socialPosts.every(p=>!p.context?.startsWith('original-visual-')),'estate visual montage must not replace cafe-specific destinations');
});
