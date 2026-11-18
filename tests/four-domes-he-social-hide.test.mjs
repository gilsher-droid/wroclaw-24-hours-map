import {followingFiveHeNov15Bindings as followingFiveHeNov15} from './following-five-he-social-bindings-nov15-historical-baseline.mjs';
import {englishAltusBrzegNov18} from './english-altus-brzeg-social-bindings-nov18-historical-baseline.mjs';
import {nextSevenNov15Bindings as nextSevenNov15} from './next-seven-social-bindings-nov15-historical-baseline.mjs';
import {nextFourNov15Bindings as nextFourNov15} from './next-four-social-bindings-nov15-historical-baseline.mjs';
import {followupNov15Bindings as followupNov15} from './followup-social-bindings-nov15-historical-baseline.mjs';
import{verifiedNov15Bindings as nov15}from'./verified-social-bindings-nov15-historical-baseline.mjs';
import {expectedPolishSocialUrl} from './polish-rich-posts-historical-baseline.mjs';
import {beforeFourDenominationsMedia} from './four-denominations-media-historical-baseline.mjs';
import {beforePanPrecelMedia} from './pan-precel-media-historical-baseline.mjs';
import {historicalPlaceIds} from './historical-catalog-scope.mjs';
import test from'node:test';import assert from'node:assert/strict';import{readFileSync}from'node:fs';import{createHash}from'node:crypto';import{runInNewContext}from'node:vm';
const window={};runInNewContext(readFileSync('data/place-catalog.js','utf8'),{window});const c=window.WROC_CATALOG,b=JSON.parse(readFileSync('data/four-domes-he-social-preservation-20261022.json'));
test('Four Domes old wrong-owner URL stays excluded; its verified HE replacement and later reviewed routes are exact',()=>{
 assert.equal(historicalPlaceIds(c.places).length,((231)+1)+1);for(const[id,sha]of Object.entries(b.hashes))assert.equal(createHash('sha256').update(JSON.stringify(beforeFourDenominationsMedia(beforePanPrecelMedia(beforeFourDenominationsMedia(c.getPlace(id)))))).digest('hex'),sha,id);
 let kept=0,blocked=0;for(const row of b.actions){const got=c.getSocialPost(row.placeId,row.platform,row.language)?.url||null;if(row.placeId==='four-domes'&&row.platform==='instagram'&&row.language==='he'){assert.equal(row.url,'https://www.instagram.com/p/DcqyG24DMHg/');assert.equal(got,'https://www.instagram.com/p/DfwjPMfEVdB/');assert.equal(c.getSocialPostState(row.placeId,row.platform,row.language).state,'valid-post-candidate');assert.ok(c.getPlace('four-domes').socialPosts.some(post=>post.url===row.url&&post.routingExcluded));blocked++;}else{assert.equal(got,expectedPolishSocialUrl(row.placeId,row.platform,row.language,row.url),JSON.stringify(beforeFourDenominationsMedia(beforePanPrecelMedia(row))));if(got)kept++;}}assert.equal(blocked,1);assert.equal(kept,901+[...nov15.targets,...followupNov15.targets,...nextFourNov15.targets,...nextSevenNov15.targets,...followingFiveHeNov15.targets,...englishAltusBrzegNov18.targets].filter(target=>target.id!=='four-domes'&&!target.beforeResolvedURL&&b.actions.some(row=>row.placeId===target.id&&row.platform===target.platform&&row.language===target.language)).length); // Prior901 plus newly verified formerly held place-language-platform cells.
 assert.ok(beforeFourDenominationsMedia(c.getPlace('four-domes')).socialPosts.some(p=>p.url==='https://www.instagram.com/p/DcqyG24DMHg/'),'originalURLkeptashistoricalevidence');
});
