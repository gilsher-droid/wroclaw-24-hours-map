document.addEventListener('click',async event=>{
 const button=event.target.closest('button[data-copy]');if(!button)return;
 const field=document.getElementById(button.dataset.copy),status=document.getElementById('copy-status');
 try{await navigator.clipboard.writeText(field.value);status.textContent='Copied. Verify the recipient and business sender before sending.';}
 catch{field.focus();field.select();status.textContent='Select and copy the message.';}
});
