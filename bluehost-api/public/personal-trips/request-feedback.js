document.querySelectorAll('form').forEach(form=>form.addEventListener('submit',event=>{
 if(form.dataset.busy){event.preventDefault();return;}form.dataset.busy='1';
 const button=event.submitter;if(button?.name){const input=document.createElement('input');input.type='hidden';input.name=button.name;input.value=button.value;form.append(input);}
 form.querySelectorAll('button').forEach(b=>{b.disabled=true;});if(button)button.textContent='Saving…';
 const status=form.querySelector('[role=status]');if(status)status.textContent='Saving your decision…';
}));
