const digits=/^[0-9]{1,40}$/;
const postId=/^(?:[0-9]{1,40}|pfbid[A-Za-z0-9]{5,200})$/;
// Submit typed identifiers, never an arbitrary third-party URL. PHP validates
// the same types and reconstructs the canonical destination independently.
export function facebookDestination(value,kind){
 const raw=value.trim();if(!raw)return kind==='messenger'?{fbKind:'none'}:{threadKind:'none'};
 let u;try{u=new URL(raw);}catch{throw new Error('Enter a full verified Facebook conversation URL.');}
 if(u.protocol!=='https:'||u.username||u.password||u.port||!['facebook.com','www.facebook.com','business.facebook.com','messenger.com','www.messenger.com'].includes(u.hostname))throw new Error('Use a verified Facebook or Messenger HTTPS link.');
 const path=u.pathname.replace(/\/+$/,'');
 const query=(name,pattern=digits,required=false)=>{
  const all=u.searchParams.getAll(name);if(all.length>1||(!all.length&&required))throw new Error('The conversation link is incomplete or ambiguous.');
  const v=all[0]||'';if(v&&!pattern.test(v))throw new Error('The conversation link has an invalid identifier.');return v;
 };
 if(kind==='messenger'){
  let match;
  if(u.hostname==='business.facebook.com'&&/^\/latest\/inbox\/(messenger|all)$/.test(path)){
   return {fbKind:'business',fbRecipient:query('selected_item_id',digits,true),fbAsset:query('asset_id',digits,true),fbBusiness:query('business_id'),fbMailbox:query('mailbox_id')};
  }
  if((['facebook.com','www.facebook.com'].includes(u.hostname)&&(match=path.match(/^\/messages\/t\/(\d+)$/)))||(['messenger.com','www.messenger.com'].includes(u.hostname)&&(match=path.match(/^\/t\/(\d+)$/)))){
   if(!digits.test(match[1]))throw new Error('Invalid conversation identifier.');return {fbKind:'direct',fbRecipient:match[1]};
  }
  throw new Error('Use the direct private conversation link from Facebook or Business Suite.');
 }
 if(!['facebook.com','www.facebook.com'].includes(u.hostname))throw new Error('Use the existing public Facebook post or comment link.');
 const comment=query('comment_id'),reply=query('reply_comment_id');let match;
 if((match=path.match(/^\/groups\/(\d+)\/(?:posts|permalink)\/([A-Za-z0-9]+)$/))&&digits.test(match[1])&&postId.test(match[2]))return {threadKind:'group',threadGroup:match[1],threadPost:match[2],threadComment:comment,threadReply:reply};
 if((match=path.match(/^\/(\d+)\/posts\/([A-Za-z0-9]+)$/))&&digits.test(match[1])&&postId.test(match[2]))return {threadKind:'page',threadPage:match[1],threadPost:match[2],threadComment:comment,threadReply:reply};
 if(path==='/permalink.php')return {threadKind:'page',threadPage:query('id',digits,true),threadPost:query('story_fbid',postId,true),threadComment:comment,threadReply:reply};
 if((match=path.match(/^\/reel\/(\d+)$/))&&digits.test(match[1]))return {threadKind:'reel',threadPost:match[1],threadComment:comment,threadReply:reply};
 throw new Error('Use a direct Facebook post or comment link, rather than a share shortcut.');
}
if(typeof document!=='undefined'){
 document.addEventListener('click',async event=>{
  const button=event.target.closest('button[data-copy]');if(!button)return;
  const field=document.getElementById(button.dataset.copy),status=document.getElementById('copy-status');
  try{await navigator.clipboard.writeText(field.value);status.textContent='Copied. Verify the recipient and business sender before sending.';}
  catch{field.focus();field.select();status.textContent='Select and copy the message.';}
 });
 const form=document.querySelector('form[data-access-reset]');
 if(form){
  form.addEventListener('submit',event=>{
   const fields=form.querySelector('[data-facebook-fields]'),status=form.querySelector('[role="alert"]');
   try{
    const values={contactFormat:'facebook-ids-v1',...facebookDestination(form.querySelector('[data-messenger-url]').value,'messenger'),...facebookDestination(form.querySelector('[data-thread-url]').value,'thread')};
    const nodes=Object.entries(values).map(([name,value])=>{const input=document.createElement('input');input.type='hidden';input.name=name;input.value=value;return input;});
    fields.replaceChildren(...nodes);status.textContent='';
   }catch(error){event.preventDefault();fields.replaceChildren();status.textContent=error.message;status.focus();}
  });
  for(const button of form.querySelectorAll('[data-needs-destinations]'))button.disabled=false;
 }
}
