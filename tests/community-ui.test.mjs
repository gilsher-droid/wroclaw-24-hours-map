import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
test('Community interface provides five complete editions with explicit review and privacy consent',()=>{
 const window={};runInNewContext(readFileSync('community-copy.js','utf8'),{window});
 const copies=window.WROC_COMMUNITY_COPY,keys=Object.keys(copies.en).sort();
 for(const lang of ['he','en','pl','de','cs']){assert.deepEqual(Object.keys(copies[lang]).sort(),keys);for(const key of keys)assert.ok(copies[lang][key],lang+'/'+key);assert.deepEqual(Object.keys(copies[lang].statuses).sort(),['declined','needs-info','pending','published','withdrawn']);assert.ok(copies[lang].privacy.length>70);assert.ok(copies[lang].consent.length>60);}
});
test('Hosted and public community interfaces use identical reviewed application sources',()=>{
 for(const file of ['community-app.js','community-copy.js','community.css'])assert.equal(readFileSync(file,'utf8'),readFileSync('bluehost-api/public/personal-trips/'+file,'utf8'));
 assert.ok(readFileSync('community.html','utf8').includes('data-community-demo="0"'));
 const code=readFileSync('community-app.js','utf8');assert.ok(!/\.innerHTML\s*=/.test(code),'visitor prose must be rendered as text');assert.ok(code.includes('youtube-nocookie.com/embed/'));assert.ok(code.includes("iframe.loading='lazy'"));
});
test('Community place selector references existing canonical identities with localized names',()=>{
 const list=JSON.parse(readFileSync('data/community-places.json'));assert.ok(Object.keys(list).length>100);
 for(const [id,p]of Object.entries(list)){assert.equal(id,p.id);for(const lang of ['he','en','pl','de','cs'])assert.ok(p.name[lang]);assert.ok(Number.isFinite(p.coordinates.lat));assert.ok(Number.isFinite(p.coordinates.lng));}
});
