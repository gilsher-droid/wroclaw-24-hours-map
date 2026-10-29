(function(){
 'use strict';
 // This adapter never sends coordinates, private records, photos or conversation history.
 function payload(message,language,filters,results,selected){
  if(typeof message!=='string'||!message.trim()||message.length>800)throw new TypeError('invalid_message');
  if(!['he','en','de','cs','pl'].includes(language))throw new TypeError('invalid_language');
  return{version:1,message:message.trim(),language,filters:window.WROC_NEARBY_MODEL.query(filters),selected:results.some(r=>r.id===selected)?selected:null,results:results.slice(0,60).map(r=>({id:r.id,name:String(r.place.name?.[language]||r.place.name?.en||r.id).slice(0,160),metres:Math.round(r.distance)}))};
 }
 async function request(endpoint,body,{signal}={}){
  const url=new URL(endpoint,location.origin);
  if(url.origin!==location.origin&&url.origin!=='https://api.wroc-love.com')throw new TypeError('invalid_endpoint');
  const response=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},credentials:'omit',referrerPolicy:'no-referrer',body:JSON.stringify(body),signal});
  if(!response.ok)throw new Error(response.status===429?'rate_limit':response.status===503?'not_connected':'provider_unavailable');
  const result=await response.json();if(result.version!==1||!result.intent)throw new TypeError('invalid_intent');return result.intent;
 }
 window.WROC_NEARBY_CHAT=Object.freeze({payload,request});
})();
