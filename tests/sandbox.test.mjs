import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync,readdirSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import {join} from 'node:path';
const output='dist/sandbox';
test('sandbox artifact disables production tracking, live routes and indexation',()=>{
 const manifest=JSON.parse(readFileSync(join(output,'sandbox-manifest.json')));assert.equal(manifest.productionPublishing,false);
 for(const p of manifest.disabledRoutes)assert.equal(existsSync(join(output,p)),false,p);
 const window={};runInNewContext(readFileSync(join(output,'analytics-config.js'),'utf8'),{window});assert.equal(window.WROC_ANALYTICS_CONFIG.ga4MeasurementId,'');assert.equal(window.WROC_ANALYTICS_CONFIG.metaPixelId,'');
 function check(dir){for(const item of readdirSync(dir,{withFileTypes:true})){const p=join(dir,item.name);if(item.isDirectory())check(p);else if(p.endsWith('.html')){const s=readFileSync(p,'utf8');assert.ok(s.includes('noindex,nofollow,noarchive'),p);assert.ok(s.indexOf('/sandbox-guard.js')<s.indexOf('</head>'),p);}else assert.ok(!/\.(mp4|mov|webm)$/i.test(p),'no raw video: '+p);}}
 check(output);assert.match(readFileSync(join(output,'robots.txt'),'utf8'),/Disallow: \//);
});
test('sandbox guard prevents live API reads, mutations and form submission',async()=>{
 const listeners={},calls=[];const document={documentElement:{lang:'en'},readyState:'loading',addEventListener:(name,fn)=>listeners[name]=fn};const window={fetch:async(...args)=>{calls.push(args);return {ok:true};}};const navigator={sendBeacon:()=>true};
 runInNewContext(readFileSync('sandbox-guard.js','utf8'),{window,document,navigator,URL,location:{href:'https://sandbox.example/',protocol:'https:',host:'sandbox.example'},MutationObserver:class {observe(){}}});
 await assert.rejects(window.fetch('https://api.wroc-love.com/trip-requests/index.php',{method:'POST'}),/Sandbox/);await assert.rejects(window.fetch('https://api.wroc-love.com/api/access/status'),/Sandbox/);await assert.rejects(window.fetch('/other',{method:'POST'}),/Sandbox/);
 await window.fetch('/data/place-catalog.js');assert.equal(calls.length,1);assert.equal(navigator.sendBeacon(),false);
 let prevented=false,stopped=false;const status={};listeners.submit({preventDefault(){prevented=true;},stopImmediatePropagation(){stopped=true;},target:{querySelector(){return status;}}});assert.equal(prevented,true);assert.equal(stopped,true);assert.match(status.textContent,/not sent/);
});
test('sandbox workflow cannot publish GitHub Pages',()=>{
 const workflow=readFileSync('.github/workflows/sandbox.yml','utf8');assert.ok(!workflow.includes('deploy-pages'));assert.ok(!workflow.includes('pages: write'));assert.ok(!workflow.includes('id-token: write'));const live=readFileSync('.github/workflows/pages.yml','utf8');assert.equal((live.match(/if: github.ref == 'refs\/heads\/main'/g)||[]).length,2);
});
test('sandbox UX recommends by traveller needs and preserves place return context',()=>{
 const document={documentElement:{lang:'en'},readyState:'loading',addEventListener(){},querySelector(){return null;}};
 const window={addEventListener(){}};const location={href:'https://sandbox.wroc-love.com/products/interactive-maps/excursions.html?lang=pl&trip=warsaw-lodz-wroclaw&category=history',pathname:'/products/interactive-maps/excursions.html'};
 runInNewContext(readFileSync('sandbox-ux.js','utf8'),{window,document,location,URL,URLSearchParams,localStorage:{getItem(){return null;}}});
 const {recommend,placeLink}=window.WROC_SANDBOX_UX;
 assert.equal(recommend({time:0,interest:0}),0);assert.equal(recommend({time:1,interest:0}),1);assert.equal(recommend({time:2,interest:2}),2);assert.equal(recommend({time:0,interest:1}),3);assert.equal(recommend({time:0,interest:2}),4);assert.equal(recommend({time:0,interest:3}),5);
 const link=new URL(placeLink('lodz-manufaktura','lodz-manufaktura'));for(const [k,v] of Object.entries({lang:'pl',trip:'warsaw-lodz-wroclaw',category:'history',place:'lodz-manufaktura',stop:'lodz-manufaktura'}))assert.equal(link.searchParams.get(k),v);assert.equal(link.host,'sandbox.wroc-love.com');
 for(const file of ['sandbox-ux.js','sandbox-ux.css'])assert.ok(existsSync(join(output,file)));
 assert.ok(readFileSync(join(output,'index.html'),'utf8').includes('/sandbox-ux.js'));
});
