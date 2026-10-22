import test from'node:test';import assert from'node:assert/strict';import{readFileSync}from'node:fs';import{runInNewContext}from'node:vm';
const window={};runInNewContext(readFileSync('data/place-catalog.js','utf8'),{window,console});const c=window.WROC_CATALOG;
test('Every generic account action disappears without changing any of the848 existing place-post candidates pending audit',()=>{
 const rows=JSON.parse(readFileSync('data/social-post-policy-existing-candidates-20261022.json'));let kept=0,hidden=0;
 for(const row of rows){const got=c.getSocialPost(c.getPlace(row.canonicalId),row.platform,row.language);if(row.kind==='post-candidate'){assert.equal(got?.url,row.url,JSON.stringify(row));kept++;}if(row.kind==='profile'){assert.ok(!got||c.socialPostKind(got.url,row.platform)==='post-candidate');hidden++;}}
 assert.equal(kept,848);assert.equal(hidden,781);
});
test('The shared resolver distinguishes missing, generic, excluded and matching-language specific posts without assuming pending means wrong',()=>{
 for(const lang of['he','en','pl','de','cs'])for(const platform of['facebook','instagram']){
  const profile=platform==='facebook'?'https://www.facebook.com/profile.php?id=123':'https://www.instagram.com/account/';const post=platform==='facebook'?'https://www.facebook.com/123/posts/456/':'https://www.instagram.com/p/AbCd123/';
  assert.equal(c.getSocialPost({socialPosts:[]},platform,lang),null);assert.equal(c.getSocialPostState({socialPosts:[]},platform,lang).state,'canonical-missing');
  assert.equal(c.getSocialPostState({socialPosts:[{platform,language:lang,url:profile}]},platform,lang).state,'generic');
  const candidate={platform,language:lang,url:post};assert.equal(c.getSocialPost({socialPosts:[candidate]},platform,lang),candidate);assert.equal(c.getSocialPostState({socialPosts:[candidate]},platform,lang).state,'valid-post-candidate');
  assert.equal(c.getSocialPost({socialPosts:[{...candidate,routingExcluded:true}]},platform,lang),null);assert.equal(c.getSocialPostState({socialPosts:[{...candidate,routingExcluded:true}]},platform,lang).state,'known-excluded');
  assert.equal(c.getSocialPost({socialPosts:[{...candidate,language:lang==='he'?'en':'he'}]},platform,lang),null);
 }
 assert.equal(c.socialPostKind('https://www.facebook.com.evil.test/123/posts/456','facebook'),'unsupported');assert.equal(c.socialPostKind('https://www.instagram.com/reel/abc/','instagram'),'reel-or-story');
});
test('Actual Lifestyle, cultural-area and experience-card renderers use the same specific-post policy; unrelated navigation/media survive',()=>{
 const samples=[{platform:'facebook',language:'en',url:'https://www.facebook.com/profile.php?id=123'},{platform:'instagram',language:'en',url:'https://www.instagram.com/account/'}];const place={id:'sample',name:{en:'Sample'},description:{en:'Sample'},location:{coordinates:{lat:51,lng:17}},media:{photos:[]},socialPosts:samples,links:{website:'https://example.org'}};
 const ls=readFileSync('lifestyle.js','utf8'),a=ls.indexOf('  function actionHtml('),b=ls.indexOf('  function ',a+10),code=ls.slice(a,b);const ctx={window:{WROC_CATALOG:c,WROC_GUIDE_VIDEO:{button:()=>''}},language:'en',resources:{sample:{instagram:'https://www.instagram.com/rawprofile/'}},googleUrl:()=> 'https://maps.google.com/?q=51,17',tr:k=>k,escapeHtml:x=>x,place:{id:'sample',canonicalPlace:place,mediaKey:'sample',sourceUrl:'https://www.facebook.com/profile.php?id=999'}};
 const html=runInNewContext(code+'actionHtml(place)',ctx);assert.ok(!html.includes('facebook.com'));assert.ok(!html.includes('instagram.com'));assert.ok(html.includes('maps.google.com'));assert.ok(html.includes('example.org'));
 place.socialPosts=[{platform:'facebook',language:'en',url:'https://www.facebook.com/123/posts/456/'},{platform:'instagram',language:'en',url:'https://www.instagram.com/p/AbCd123/'}];const valid=runInNewContext(code+'actionHtml(place)',ctx);assert.ok(valid.includes('/123/posts/456/'));assert.ok(valid.includes('/p/AbCd123/'));
 const exp=readFileSync('experiences.js','utf8');assert.match(exp,/const post=catalog.getSocialPost\(p,platform,lang\)/);assert.ok(!exp.includes('p.socialPosts?.find(x=>x.platform===platform&&x.language===lang)'));
 const cult=readFileSync('cultural.js','utf8');assert.match(cult,/getSocialPost\(\{socialPosts:area.social\|\|\[\]\},platform,language\)/);
});
test('Every route media adapter suppresses raw account fallbacks and retains catalogue identity and independent-place queries',()=>{
 runInNewContext(readFileSync('data/location-media.js','utf8'),{window,console});
 for(const[id,media]of Object.entries(window.WROC_LOCATION_MEDIA))for(const platform of['facebook','instagram']){const value=media[platform];if(value)assert.equal(c.socialPostKind(value,platform),'post-candidate',id+':'+platform);}
 assert.equal(typeof c.queryIndependentPlaces,'function');assert.ok(c.queryIndependentPlaces({cityId:'wroclaw'}).length>0);
});
