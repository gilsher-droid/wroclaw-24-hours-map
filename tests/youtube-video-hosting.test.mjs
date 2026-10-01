import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {runInNewContext} from 'node:vm';
const root=resolve(import.meta.dirname,'..');
test('every video waiting for quota has a working localized pending state with no broken player',()=>{
 const window={};const document={documentElement:{lang:'en'}};
 for(const file of ['data/youtube-video-hosting.js','youtube-video.js'])runInNewContext(readFileSync(resolve(root,file),'utf8'),{window,document});
 const records=Object.entries(window.WROC_YOUTUBE_VIDEO_HOSTING);
 assert.equal(records.length,35);
 for(const [src,item]of records){
  for(const lang of ['he','en','de','cs','pl']){
   const html=window.WROC_YOUTUBE_VIDEO.html(src,item.title,lang);
   assert.doesNotMatch(html,/\/assets\/|<video/);
   if(item.status==='public'){assert.match(html,/youtube-nocookie\.com\/embed\/[A-Za-z0-9_-]{11}/);assert.match(html,/<iframe/);}
   else {assert.match(html,/role="status"/);assert.doesNotMatch(html,/<iframe|src=/);}
  }
 }
 assert.ok(records.filter(([,r])=>r.status==='public').length>=10);
});
