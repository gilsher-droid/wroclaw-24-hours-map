import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {resolve} from 'node:path';
import vm from 'node:vm';
import {classifyBusiness,businessLabels} from './business-place-mapping.mjs';
export async function generatePlaceAnalyticsCatalog(root){
 const window={};
 for(const name of ['place-catalog','canonical-experiences'])vm.runInNewContext(await readFile(resolve(root,'data',name+'.js'),'utf8'),{window});
 const places=Object.fromEntries(Object.values(window.WROC_CATALOG.places).map(p=>[p.id,p.name?.en||p.localName||p.id]));
 const registry=window.WROC_EXPERIENCE_CATALOG;
 const experiences=Object.fromEntries(Object.values(registry.experiences||{}).map(e=>[e.id,e.name?.en||e.id]));
 const dir=resolve(root,'bluehost-api/public/place-events');await mkdir(dir,{recursive:true});
 const businessPlaces=Object.fromEntries(Object.values(window.WROC_CATALOG.places).map(p=>[p.id,{name:places[p.id],...classifyBusiness(p)}]));
 const businessMapping={version:1,source:'data/place-catalog.js: categories, placeType and dining.venueTypes',labels:businessLabels,places:businessPlaces,
  unclassified:Object.keys(businessPlaces).filter(id=>!businessPlaces[id].types.length),multiple:Object.keys(businessPlaces).filter(id=>businessPlaces[id].multiple),
  note:'All businesses includes all canonical places, including unclassified places and non-business sights. Broad eat/drink/sleep/dessert/museums-history categories alone do not establish a specific business type. Multi-category places count once within each selection; do not add category totals.'};
 await writeFile(resolve(dir,'catalog.json'),JSON.stringify({places,experiences,businessMapping})+'\n');
}
