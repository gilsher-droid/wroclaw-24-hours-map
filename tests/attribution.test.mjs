import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {test} from 'node:test';
import vm from 'node:vm';
const source=readFileSync(new URL('../analytics.js',import.meta.url),'utf8');
function visit(url,{storage=new Map(),referrer='',now=10000000}={}) {
 const sent=[],location=new URL(url),clock={now};
 class Clock extends Date {static now(){return clock.now;}}
 const window={WROC_ANALYTICS_CONFIG:{ga4MeasurementId:'G-TEST',firstPartyEndpoint:'https://api.wroc-love.com/place-events/'},fetch:(url,options)=>{sent.push(JSON.parse(options.body));return Promise.resolve({ok:true});},setTimeout:()=>1,addEventListener:()=>{}};
 const document={referrer,readyState:'complete',documentElement:{lang:'en'},head:{appendChild:()=>{}},createElement:()=>({}),addEventListener:()=>{}};
 vm.runInNewContext(source,{window,document,location,URL,URLSearchParams,Date:Clock,console,sessionStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)}});
 return {api:window.WROC_ANALYTICS,window,sent,storage,clock};
}
const landing='https://wroc-love.com/?utm_source=facebook&utm_medium=paid_social&utm_campaign=wang_en&utm_id=12345&utm_content=fb_post_20261120_v1';
const map='https://wroc-love.com/products/interactive-maps/guides.html?lang=en';
test('campaign and exact publication survive consented internal navigation in both providers',()=>{
 const a=visit(landing);assert.equal(a.storage.size,0);assert.equal(a.sent.length,0);a.api.setConsent({analytics:true});a.api.flush();
 const b=visit(map,{storage:a.storage,referrer:landing,now:a.clock.now+10000});b.api.setConsent({analytics:true});b.api.flush();
 const event=b.sent[0].events.find(e=>e.event==='map_open');assert.equal(event.utm_content,'fb_post_20261120_v1');assert.equal(event.utm_id,'12345');assert.equal(event.arrival_source,'facebook');
 const ga=Array.from(b.window.dataLayer,e=>Array.from(e)).find(e=>e[1]==='map_open')[2];assert.equal(ga.utm_campaign,event.utm_campaign);
});
test('old campaign expires, but a new tagged external visit replaces it immediately',()=>{
 const a=visit(landing);a.api.setConsent({analytics:true});
 const expired=visit(map,{storage:a.storage,referrer:landing,now:a.clock.now+1800001});expired.api.setConsent({analytics:true});assert.equal(expired.api.context().utm_campaign,undefined);assert.equal(expired.api.context().arrival_basis,'direct_or_unknown');
 const next=visit(landing.replace('facebook','instagram').replace('wang_en','pergola_en'),{storage:a.storage});next.api.setConsent({analytics:true});assert.equal(next.api.context().utm_campaign,'pergola_en');assert.equal(next.api.context().arrival_source,'instagram');
});
test('external search referrer is preserved through navigation without inventing campaign tags',()=>{
 const a=visit('https://wroc-love.com/',{referrer:'https://www.google.com/search?q=PRIVATE'});a.api.setConsent({analytics:true});
 const b=visit(map,{storage:a.storage,referrer:'https://wroc-love.com/',now:a.clock.now+10000});b.api.setConsent({analytics:true});b.api.flush();
 const e=b.sent[0].events.find(e=>e.event==='map_open');assert.equal(e.arrival_source,'google');assert.equal(e.arrival_medium,'organic');assert.equal(e.utm_campaign,undefined);assert.ok(!JSON.stringify(b.sent).includes('PRIVATE'));
});
test('social referrers do not prove paid placement; unknown traffic is not falsely classified',()=>{
 const a=visit(map,{referrer:'https://l.facebook.com/redirect?secret=x'});a.api.setConsent({analytics:true});assert.equal(a.api.context().arrival_medium,'referral');assert.equal(a.api.context().arrival_basis,'referrer');assert.equal(a.api.context().utm_campaign,undefined);
 const b=visit(map);b.api.setConsent({analytics:true});assert.equal(b.api.context().arrival_source,'direct_or_unknown');
});
test('personal strings in tags and unapproved event parameters never reach collection',()=>{
 const a=visit(map+'&utm_source=facebook&utm_content=person%40example.com&utm_campaign=https%3A%2F%2Fsecret.test&email=private&fbclid=unique-click');a.api.setConsent({analytics:true});a.api.track('place_open',{email:'private@example.com',canonical_place_id:'opera'});a.api.flush();
 const wire=JSON.stringify([a.sent,Array.from(a.window.dataLayer,e=>Array.from(e))]);assert.ok(!/person@|private|unique-click|secret.test/.test(wire));assert.equal(a.api.context().utm_content,undefined);
});
test('withdrawal clears attribution and prevents pending collector batches',()=>{
 const a=visit(landing);a.api.setConsent({analytics:true});a.api.setConsent({analytics:false});a.api.flush();assert.equal(a.sent.length,0);assert.equal(a.storage.has('wroc-analytics-attribution'),false);
});
test('expanded tag batches stay below the collector limit without dropping queued events',()=>{
 const tags=new URLSearchParams({utm_source:'f'.repeat(100),utm_medium:'m'.repeat(100),utm_campaign:'c'.repeat(100),utm_id:'1'.repeat(100),utm_content:'p'.repeat(100)});
 const a=visit('https://wroc-love.com/?'+tags);a.api.setConsent({analytics:true});
 for(let i=0;i<40;i++)a.api.track('place_open',{canonical_place_id:'a'.repeat(100)});
 for(let i=0;i<20;i++)a.api.flush();
 assert.equal(a.sent.reduce((n,b)=>n+b.events.length,0),41);assert.ok(a.sent.every(b=>JSON.stringify(b).length<16000));
});
test('Google ad click markers are not counted as proven organic search or retained',()=>{
 const a=visit(map+'&gclid=PRIVATE-CLICK',{referrer:'https://www.google.com/'});a.api.setConsent({analytics:true});a.api.flush();assert.equal(a.api.context().arrival_source,'google');assert.equal(a.api.context().arrival_medium,'unknown');assert.ok(!JSON.stringify(a.sent).includes('PRIVATE-CLICK'));
});
test('an inherited campaign also expires after inactivity on an already-open map',()=>{
 const a=visit(landing);a.api.setConsent({analytics:true});
 const b=visit(map,{storage:a.storage,referrer:'https://wroc-love.com/',now:a.clock.now+1000});b.api.setConsent({analytics:true});
 assert.equal(b.api.context().utm_campaign,'wang_en');
 b.clock.now+=1800001;b.api.track('place_open',{canonical_place_id:'opera'});b.api.flush();
 const e=b.sent.flatMap(batch=>batch.events).filter(e=>e.event==='place_open').at(-1);
 assert.equal(e.utm_campaign,undefined);assert.equal(e.arrival_basis,'direct_or_unknown');
});
