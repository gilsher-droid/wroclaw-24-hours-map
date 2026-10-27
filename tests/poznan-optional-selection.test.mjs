import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const source=readFileSync('excursions.js','utf8');
test('An explicit optional category fits its places with the route; card focus reveals the group without a second fit',()=>{
 const added=[],fits=[];let clears=0,closed=0;
 const buttons=['route','stay'].map(group=>({dataset:{mapChoice:group},setAttribute(k,v){this[k]=v;}}));
 const context={optionalLayer:{clearLayers(){clears++;},addLayer(m){added.push(m);}},optionalMarkers:[{group:'stay',marker:'hotel',coordinate:{lat:52.5,lng:16.8}},{group:'culture',marker:'museum',coordinate:{lat:52.4,lng:16.9}}],document:{querySelectorAll(){return buttons;}},selectedExcursion:()=>({routePoints:[{lat:52.4,lng:16.93}]}),coords:p=>p,map:{closePopup(){closed++;},fitBounds(p,o){fits.push({p,o});}}};
 const fn=source.slice(source.indexOf('  function selectOptionalGroup('),source.indexOf('  let previewIndex'));
 vm.runInNewContext(fn+'\nthis.select=selectOptionalGroup;',context);
 context.select('stay',true);
 assert.deepEqual(added,['hotel']);assert.equal(fits.length,1);assert.equal(fits[0].p.length,2);assert.equal(fits[0].o.animate,false);assert.equal(closed,1);assert.equal(buttons[1]['aria-pressed'],'true');
 context.select('culture');assert.equal(fits.length,1);assert.equal(clears,2);assert.equal(added.at(-1),'museum');
 const render=source.slice(source.indexOf('  function renderMap('),source.indexOf('  function extensionActions'));
 assert.match(render,/if \(isPoznan\) optionalMarkers\.push/);
 assert.match(render,/if \(!isPoznan\) optionalLayer\.addLayer\(marker\)/);
 assert.match(render,/html: `<span>\+\$\{index\+1\}<\/span>`/);
});
