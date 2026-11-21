import test from 'node:test';
import assert from 'node:assert/strict';
import {classifyBusiness} from '../tools/business-place-mapping.mjs';

test('place names and broad map categories do not establish a business type',()=>{
 assert.deepEqual(classifyBusiness({name:{en:'Hotel Restaurant Ice cream Café'},categories:['eat','drink','sleep','dessert','museums-history']}).types,[]);
});
test('structured fields preserve overlapping classifications and their provenance',()=>{
 const p=classifyBusiness({categories:['museum'],placeType:'hotel',dining:{venueTypes:['restaurant','cafe']}});
 assert.deepEqual(p.types,['hotel','restaurant','museum','cafe']);assert.equal(p.multiple,true);
 assert.equal(p.evidence.find(e=>e.type==='hotel').field,'placeType:hotel');
 assert.deepEqual(classifyBusiness({dining:{venueTypes:['ice-cream']}}).types,['ice-cream']);
});
