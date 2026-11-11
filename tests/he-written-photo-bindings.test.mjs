import test from'node:test';import assert from'node:assert/strict';import{readFileSync}from'node:fs';import{runInNewContext}from'node:vm';import{beforeHeWrittenPhotoPosts,heWrittenPhotoSignatures}from'./he-written-photo-historical-baseline.mjs';
const window={};runInNewContext(readFileSync('data/place-catalog.js','utf8'),{window});const c=window.WROC_CATALOG;
test('Eight verified Hebrew written/photo pairs route to sixteen exact posts; old evidence survives and unrelated deltas fail',()=>{
 assert.equal(Object.keys(heWrittenPhotoSignatures).length,8);
 for(const[id,s]of Object.entries(heWrittenPhotoSignatures)){
  const p=c.getPlace(id),old=beforeHeWrittenPhotoPosts(p);
  for(const platform of['facebook','instagram']){assert.equal(c.getSocialPost(id,platform,'he')?.url,s.urls[platform]);assert.equal(c.socialPostKind(s.urls[platform],platform),'post-candidate');}
  for(const post of old.socialPosts)assert.ok(p.socialPosts.some(x=>JSON.stringify(x)===JSON.stringify(post)));
  assert.throws(()=>beforeHeWrittenPhotoPosts({...p,socialPosts:p.socialPosts.map((x,i)=>i?x:{...x,url:'https://www.facebook.com/61591964083308/posts/999/'})}));
 }
});
