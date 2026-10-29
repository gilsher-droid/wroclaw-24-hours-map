(function(){
 'use strict';
 const MIN_RADIUS=100,MAX_RADIUS=5000,DEFAULT_RADIUS=500,EARTH_RADIUS=6371008.8;
 const categories=Object.keys(window.WROC_DINING.quickCategories);
 const actions=['search','nearest','photos','videos','explore','clarify'];
 const finite=x=>typeof x==='number'&&Number.isFinite(x);
 function centre(value){if(!value||!finite(value.lat)||!finite(value.lng)||value.lat< -90||value.lat>90||value.lng< -180||value.lng>180)throw new TypeError('invalid_centre');return{lat:value.lat,lng:value.lng};}
 function radius(value){if(!finite(value)||value<MIN_RADIUS||value>MAX_RADIUS||value%100!==0)throw new RangeError('invalid_radius');return value;}
 function distance(a,b){a=centre(a);b=centre(b);const rad=x=>x*Math.PI/180,dLat=rad(b.lat-a.lat),dLng=rad(b.lng-a.lng),v=Math.sin(dLat/2)**2+Math.cos(rad(a.lat))*Math.cos(rad(b.lat))*Math.sin(dLng/2)**2;return 2*EARTH_RADIUS*Math.atan2(Math.sqrt(Math.min(1,v)),Math.sqrt(Math.max(0,1-v)));}
 function choice(value,allowed,fallback){if(value===undefined)return fallback;if(!allowed.includes(value))throw new TypeError('invalid_filter');return value;}
 function query(value={}){const t=window.WROC_DINING;return{radius:radius(value.radius??DEFAULT_RADIUS),category:choice(value.category,categories,'all'),venueType:choice(value.venueType,['all',...Object.keys(t.venueTypes)],'all'),cuisine:choice(value.cuisine,['all',...Object.keys(t.cuisines)],'all'),dietary:choice(value.dietary,['all',...Object.keys(t.dietary)],'all'),sort:choice(value.sort,['distance','name'],'distance')};}
 function markerCategory(place,selected='all'){const d=window.WROC_DINING;if(selected!=='all'&&d.categoryMatch(place,selected))return selected;return ['dwarfs','museums','shopping','coffee','drink','eat','parks','waterside','heritage','sights'].find(key=>d.categoryMatch(place,key))||'all';}
 function publicPlace(p){return Boolean(p&&typeof p.id==='string'&&!['private','hidden','excluded','deleted','rejected'].includes(p.status)&&p.location?.coordinates&&finite(p.location.coordinates.lat)&&finite(p.location.coordinates.lng));}
 function search(places,origin,filters={}){origin=centre(origin);filters=query(filters);const unique=new Map();for(const p of Array.isArray(places)?places:Object.values(places)){if(!publicPlace(p)||unique.has(p.id)||!window.WROC_DINING.matches(p,filters))continue;let metres;try{metres=distance(origin,p.location.coordinates);}catch{continue;}if(metres<=filters.radius+1e-6)unique.set(p.id,{id:p.id,place:p,distance:metres});}const found=[...unique.values()];return found.sort((a,b)=>filters.sort==='name'?String(a.place.name?.en||a.id).localeCompare(String(b.place.name?.en||b.id))||a.distance-b.distance:a.distance-b.distance||(a.id<b.id?-1:a.id>b.id?1:0));}
 function reference(ref,ids,selected){if(!ref||ref.kind==='none')return null;if(ref.kind==='selected'){if(!selected||!ids.includes(selected))throw new TypeError('invalid_reference');return selected;}if(ref.kind==='index'){if(!Number.isInteger(ref.index)||ref.index<1||ref.index>ids.length)throw new TypeError('invalid_reference');return ids[ref.index-1];}if(ref.kind==='id'&&typeof ref.id==='string'&&ids.includes(ref.id))return ref.id;throw new TypeError('invalid_reference');}
 function intent(value,current,context={}){
  if(!value||typeof value!=='object'||Array.isArray(value)||Object.keys(value).some(k=>!['action','category','venueType','cuisine','dietary','radius','sort','reference','centreChange','unsupported'].includes(k)))throw new TypeError('invalid_intent');
  const action=choice(value.action,actions,'search'),next={...query(current)};
  for(const k of ['category','venueType','cuisine','dietary','radius','sort'])if(value[k]!==null&&value[k]!==undefined)next[k]=value[k];
  const filters=query(next),id=reference(value.reference,context.ids||[],context.selected);
  if(['photos','videos','explore'].includes(action)&&!id)throw new TypeError('invalid_reference');
  const centreChange=choice(value.centreChange??'keep',['keep','place'],'keep');
  if(centreChange==='place'&&!id)throw new TypeError('invalid_reference');
  const unsupported=value.unsupported??[];if(!Array.isArray(unsupported)||unsupported.some(x=>!['quiet','cheap','open-now','walking-time','unknown'].includes(x)))throw new TypeError('invalid_intent');
  return{action,filters,referenceId:id,centreChange,unsupported:[...new Set(unsupported)]};
 }
 function coordinator(){let version=0;return Object.freeze({invalidate:()=>++version,version:()=>version,isCurrent:v=>v===version});}
 window.WROC_NEARBY_MODEL=Object.freeze({MIN_RADIUS,MAX_RADIUS,DEFAULT_RADIUS,EARTH_RADIUS,centre,radius,distance,query,markerCategory,publicPlace,search,intent,reference,coordinator});
})();
