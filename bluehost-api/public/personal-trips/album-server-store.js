(function(){
 'use strict';let version=0;const csrf=()=>window.WROC_ALBUM_CONTEXT.csrf;
 async function call(action,data,file,poster){const options={credentials:'same-origin',cache:'no-store',headers:{'X-CSRF-Token':csrf()}};if(data!==undefined){const form=new FormData();form.append('csrf',csrf());form.append('payload',JSON.stringify({version,data}));if(file)form.append('file',file);if(poster)form.append('poster',poster,'preview.jpg');options.method='POST';options.body=form;}const response=await fetch('?action=album-'+action+(window.WROC_ALBUM_CONTEXT.managedOwner?'&customer='+encodeURIComponent(window.WROC_ALBUM_CONTEXT.managedOwner):''),options);if(!(response.headers.get('content-type')||'').includes('application/json'))throw Error('storageError');const result=await response.json();if(!response.ok){if(result.error==='conflict')await all();throw Error(['quota','unsupported','tooLarge','emptyNote','conflict','auth','missing'].includes(result.error)?result.error:'storageError');}if(Number.isInteger(result.version))version=result.version;return result;}
 async function all(){return call('list');}
 async function add(e){const {file,poster,...data}=e;return call('add',data,file,poster);}
 const patch=(id,values)=>call('patch',{id,values}),metadata=values=>call('meta',values),move=(id,delta)=>call('move',{id,delta}),restore=()=>call('restore',{});
 window.WROC_TRIP_ALBUM_STORE=Object.freeze({all,add,patch,metadata,move,restore});
})();
