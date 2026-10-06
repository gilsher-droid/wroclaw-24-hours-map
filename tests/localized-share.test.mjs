import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {resolve} from 'node:path';
const root=resolve(import.meta.dirname,'..');
test('social crawlers receive native-language previews before JavaScript runs',()=>{
 const expected={he:'he_IL',en:'en_GB',pl:'pl_PL',de:'de_DE',cs:'cs_CZ'};
 for(const [lang,locale] of Object.entries(expected)) for(const map of ['home','map','premium','moshe','lifestyle','excursions','cultural']){
  const html=readFileSync(resolve(root,`dist/client/share/${lang}/${map}.html`),'utf8');
  assert.ok(html.includes(`<html lang="${lang}"`));
  assert.ok(html.includes(`og:locale" content="${locale}"`));
  const title=html.match(/og:title" content="([^"]+)"/)[1];
  const description=html.match(/og:description" content="([^"]+)"/)[1];
  assert.ok(title.length>10&&description.length>30);
  if(lang!=='he')assert.doesNotMatch(title+description,/[\u0590-\u05ff]/);
  assert.ok(html.includes(`?lang=${lang}`));
  assert.ok(html.includes('key!=="lang"'));
  assert.ok(html.includes('target.searchParams.set(key,value)'));
  assert.ok(html.includes('location.replace(target.href+location.hash)'));
  assert.ok(html.includes(`og:url" content="https://wroc-love.com/share/${lang}/${map}.html"`));
 }
 assert.ok(existsSync(resolve(root,'dist/client/assets/logo.png')));
});
