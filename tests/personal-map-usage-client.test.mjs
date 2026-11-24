import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';import vm from 'node:vm';
const source=readFileSync('bluehost-api/public/personal-trips/album-bootstrap.js','utf8');
async function client(){
 const requests=[],window={},document={visibilityState:'hidden',createElement:()=>({}),body:{append(){throw Error('stop synthetic bootstrap before other scripts');}},getElementById:()=>({append(){}})};
 let nextOK=true;
 const context={csrf:'synthetic-csrf',usageToken:'synthetic-server-bound-context',assetVersion:'test',route:{days:[{stops:[{placeId:'example'}]}]}};
 const fetch=async(url,opts)=>{requests.push({url,opts});return url.includes('album-context')?{ok:true,json:async()=>context}:{ok:nextOK};};
 await vm.runInNewContext(source,{window,document,fetch,URLSearchParams,location:{search:'?customer=server-managed-scope'},console});
 return {window,document,requests,setOK:value=>nextOK=value};
}
test('Opening acknowledgement is first-party, visible-only, carries server context and deduplicates concurrent render calls',async()=>{
 const c=await client();await c.window.WROC_PERSONAL_MAP_OPEN();assert.equal(c.requests.length,1);
 c.document.visibilityState='visible';await Promise.all([c.window.WROC_PERSONAL_MAP_OPEN(),c.window.WROC_PERSONAL_MAP_OPEN()]);await c.window.WROC_PERSONAL_MAP_OPEN();
 assert.equal(c.requests.length,2);const request=c.requests[1];assert.equal(request.url,'?action=album-open&customer=server-managed-scope');assert.equal(request.opts.method,'POST');assert.equal(request.opts.credentials,'same-origin');assert.equal(request.opts.headers['X-CSRF-Token'],'synthetic-csrf');assert.equal(request.opts.headers['X-Map-Open-Token'],'synthetic-server-bound-context');assert.equal(request.opts.body,undefined);
});
test('An unavailable counter does not break the map and a later visible map render may retry',async()=>{const c=await client();c.document.visibilityState='visible';c.setOK(false);await c.window.WROC_PERSONAL_MAP_OPEN();c.setOK(true);await c.window.WROC_PERSONAL_MAP_OPEN();await c.window.WROC_PERSONAL_MAP_OPEN();assert.equal(c.requests.length,3);});
