// Classification uses structured canonical fields only, never a place's name/prose.
export const businessLabels = Object.freeze({hotel:'Hotel',restaurant:'Restaurant',museum:'Museum',cafe:'Café','ice-cream':'Ice cream shop'});
export function classifyBusiness(p) {
  const c=new Set(p.categories||[]), v=new Set(p.dining?.venueTypes||[]), types=[], evidence=[];
  const add=(type,conditions)=>{const fields=conditions.filter(([ok])=>ok).map(([,field])=>field);if(fields.length){types.push(type);evidence.push(...fields.map(field=>({type,field})));}};
  add('hotel',[[p.placeType==='hotel','placeType:hotel'],[c.has('hotel'),'categories:hotel'],[c.has('hotels'),'categories:hotels']]);
  add('restaurant',[[p.placeType==='restaurant','placeType:restaurant'],[v.has('restaurant'),'dining.venueTypes:restaurant'],[c.has('restaurant'),'categories:restaurant']]);
  add('museum',[[['museum','museums'].some(x=>c.has(x)),'categories:museum|museums']]);
  add('cafe',[[p.placeType==='cafe','placeType:cafe'],[['cafe','chocolate-cafe'].some(x=>v.has(x)),'dining.venueTypes:cafe|chocolate-cafe'],[['cafe','coffee'].some(x=>c.has(x)),'categories:cafe|coffee']]);
  add('ice-cream',[[p.placeType==='ice-cream','placeType:ice-cream'],[v.has('ice-cream'),'dining.venueTypes:ice-cream'],[c.has('ice-cream'),'categories:ice-cream']]);
  return {types,evidence,classification:types.length?'classified':'unclassified',multiple:types.length>1};
}
