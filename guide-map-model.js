(()=>{'use strict';
 const local=(value,lang)=>typeof value==='string'?value:value?.[lang]||value?.en||value?.he||'';
 const area=p=>p.cityId==='wroclaw'?'city':'region';
 const filter=(places,{scope='city',search='',lang='he'}={})=>{const term=search.trim().normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase();return places.filter(p=>(scope==='all'||area(p)===scope)&&(!term||[...Object.values(p.name),p.localName,...Object.values(p.description),p.city].join(' ').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase().includes(term))).sort((a,b)=>local(a.name,lang).localeCompare(local(b.name,lang),lang));};
 window.WROC_GUIDE_MAP_MODEL=Object.freeze({local,area,filter,edition:(p,lang)=>p.editions[lang]||p.editions.en});
})();
