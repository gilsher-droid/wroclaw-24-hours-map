import {beforePanPrecelMedia} from './pan-precel-media-historical-baseline.mjs';
import {historicalPlaceIds} from './historical-catalog-scope.mjs';
import test from'node:test';import assert from'node:assert/strict';import{readFileSync}from'node:fs';import{createHash}from'node:crypto';import{runInNewContext}from'node:vm';
const window={};runInNewContext(readFileSync('data/place-catalog.js','utf8'),{window});const c=window.WROC_CATALOG,b=JSON.parse(readFileSync('data/four-domes-he-social-preservation-20261022.json'));
test('Only Four Domes Hebrew Instagram action is hidden; every231 canonical record and all868 other post targets stay exact',()=>{
 assert.equal(historicalPlaceIds(c.places).length,((231)+1)+1);for(const[id,sha]of Object.entries(b.hashes))assert.equal(createHash('sha256').update(JSON.stringify(beforePanPrecelMedia(c.getPlace(id)))).digest('hex'),sha,id);
 let kept=0,blocked=0;for(const row of b.actions){const got=c.getSocialPost(row.placeId,row.platform,row.language)?.url||null;if(row.placeId==='four-domes'&&row.platform==='instagram'&&row.language==='he'){assert.equal(row.url,'https://www.instagram.com/p/DcqyG24DMHg/');assert.equal(got,null);assert.equal(c.getSocialPostState(row.placeId,row.platform,row.language).state,'known-excluded');blocked++;}else{assert.equal(got,row.url,JSON.stringify(beforePanPrecelMedia(row)));if(got)kept++;}}assert.equal(blocked,1);assert.equal(kept,868);
 assert.ok(c.getPlace('four-domes').socialPosts.some(p=>p.url==='https://www.instagram.com/p/DcqyG24DMHg/'),'originalURLkeptashistoricalevidence');
});
