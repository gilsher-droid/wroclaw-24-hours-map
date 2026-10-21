import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {runInNewContext} from 'node:vm';
const json=p=>JSON.parse(readFileSync(p,'utf8'));
function load(route){const window={};for(const file of ['data/extra-languages.js','data/place-catalog.js',route].filter(Boolean))runInNewContext(readFileSync(file,'utf8'),{window,console});return window;}
test('Westfield Wroclavia retains one identity and six original photo assets with one verified Public visit clip',()=>{
 const w=load(),p=w.WROC_CATALOG.getPlace('wroclavia'),proof=json('data/wroclavia-refresh-provenance.json'),video=json('data/wroclavia-youtube-publication-receipt.json');
 for(const alias of ['Wroclavia','wroclavia-rec','wroclavia-station','Westfield Wroclavia','westfield-wroclavia','וורוצלביה ווסטפילדס'])assert.equal(w.WROC_CATALOG.getPlace(alias),p);
 assert.equal(p.media.photos.length,7);for(const src of p.media.photos.slice(0,6))assert.equal(createHash('sha256').update(readFileSync(src.slice(1))).digest('hex'),proof.photoSHA256[src]);
 assert.deepEqual(Array.from(p.media.videos),[video.url]);assert.equal(video.visibility,'Public');assert.equal(video.savedPublicVerified,true);assert.equal(video.processing,'Standard Definition complete');assert.equal(video.copyright,'No issues found');assert.equal(video.communityGuidelines,'Checks complete. No issues found.');assert.equal(video.sourceSHA256,video.uploadSHA256);
 assert.equal(p.name.he,'וסטפילד וורוצלביה');for(const lang of ['en','pl','de','cs'])assert.equal(p.name[lang],'Westfield Wroclavia');
 for(const lang of ['he','en','pl','de','cs'])for(const platform of ['facebook','instagram'])assert.equal(w.WROC_CATALOG.getSocialPost(p,platform,lang).url,proof.social.find(row=>row.language===lang&&row.platform===platform).url);
});
test('Every mall route alias navigates to the canonical shopping centre while the railway station stays separate',()=>{
 for(const route of ['data/lifestyle-places.js','data/premium-route.js','data/moshe-route.js']){const w=load(route),p=w.WROC_CATALOG.getPlace('wroclavia');const rows=[...(w.WROC_LIFESTYLE_PLACES||[]),...(w.PREMIUM_STOPS||[]),...(w.PREMIUM_RECOMMENDATIONS||[])].filter(r=>r.canonicalPlaceId==='wroclavia');assert.ok(rows.length);for(const r of rows){assert.equal(r.name.en,p.name.en);assert.deepEqual(Array.from(r.coordinates),[p.location.coordinates.lat,p.location.coordinates.lng]);}}
});
