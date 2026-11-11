import test from'node:test';import assert from'node:assert/strict';import{readFileSync}from'node:fs';import{runInNewContext}from'node:vm';import{createHash}from'node:crypto';import{beforeHeCurrent79Routing,heCurrent79Fixture as fixture}from'./he-current79-historical-baseline.mjs';
const w={};runInNewContext(readFileSync('data/place-catalog.js','utf8'),{window:w});const c=w.WROC_CATALOG,hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
test('81 current Hebrew written/photo candidates resolve exactly, with only 29 promoted selections and preserved prior eight pairs',()=>{
 assert.equal(fixture.candidates.length,81);assert.equal(fixture.candidates.filter(r=>r.changeRequired).length,29);
 for(const r of fixture.candidates){assert.equal(c.getSocialPost(r.id,r.platform,'he')?.url,r.url,r.id+':'+r.platform);assert.equal(c.socialPostKind(r.url,r.platform),'post-candidate');}
 for(const id of['charlotte','magnolia','herbal','doubletree','bar-mis','aula','art-hotel','bastion'])assert.ok(!fixture.changed[id],id+' prior PR550 pair untouched');
});
test('346 identities and all non-social fields are preserved; only exact reviewed social arrays project to historical records',()=>{
 assert.equal(Object.keys(c.places).length,346);assert.equal(Object.keys(fixture.changed).length,28);
 for(const[id,oldHash]of Object.entries(fixture.beforeRecordHashes)){assert.equal(hash(beforeHeCurrent79Routing(c.getPlace(id))),oldHash,id);}
 for(const id of Object.keys(fixture.changed)){const p=c.getPlace(id);assert.throws(()=>beforeHeCurrent79Routing({...p,socialPosts:[...p.socialPosts,{platform:'instagram',language:'en',url:'https://www.instagram.com/p/Unexpected/'}]}));}
});
test('Jolie Kurzy Targ owns the corrected Hebrew Instagram post; Chatka retains evidence but no active substitute and Plac Solny is unchanged',()=>{
 const url='https://www.instagram.com/wroclaw.lowersilesia.he/p/DeUurgzkeMm/';assert.equal(c.getSocialPost('jolie-kurzy-targ','instagram','he')?.url,url);assert.equal(c.getSocialPost('chatka','instagram','he'),null);assert.notEqual(c.getSocialPost('jolie-plac-solny','instagram','he')?.url,url);assert.equal(hash(c.getPlace('jolie-plac-solny')),fixture.beforeRecordHashes['jolie-plac-solny']);
 const held=c.getPlace('chatka').socialPosts.find(p=>p.url===url);assert.ok(held?.routingExcluded);assert.equal(c.getSocialPostState('chatka','instagram','he').state,'known-excluded');
});
