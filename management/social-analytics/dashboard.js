(() => {
  const root=document.getElementById('wroc-channel-pulse');
  let snapshot=WrocSocialSchema.validateSnapshot(window.WROC_LOVE_SNAPSHOT);
  let days=28;
  try { const saved=Number(localStorage.getItem('wroc-social-period')); if([7,28,90].includes(saved)) days=saved; } catch {}
  const metrics=[{name:'Views',index:0,unit:'Content views · Instagram-only component shown'},{name:'Link clicks',index:3,unit:'Meta link clicks · website sessions unverified'},{name:'Content interactions',index:2,unit:'Meta content interactions · paid + organic'},{name:'Current followers',index:null,unit:'Follower snapshot · unchanged by period selector'}];
  const num=v=>v===null?0:typeof v==='number'?v:parseFloat(v)*1000;
  const fmt=v=>v===null?'Unavailable':typeof v==='number'?v.toLocaleString('en-US'):v;
  function render() {
    const channels=snapshot.channels;
    root.querySelector('#snapshot-date').textContent=`5 languages · Facebook & Instagram · Measured ${snapshot.measuredOn}`;
    const period=snapshot.periods[days];
    root.querySelector('#wroc-period').textContent=`${period.start} – ${period.end} · Pacific Time · Previous: ${period.previousStart} – ${period.previousEnd}`;
    root.querySelectorAll('[data-days]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.days)===days)));
    const facets=root.querySelector('#wroc-facets');
    if (!facets.children.length) facets.innerHTML=metrics.map((m,n)=>`<section class="facet" data-metric="${n}"><h3>${m.name}</h3><div class="unit text-small text-muted">${m.unit}</div>${channels.map((c,j)=>`<div class="language-row"><div class="language-name">${c.name}</div>${['f','i'].map(p=>`<div class="bar-row" data-channel="${j}" data-platform="${p}"><span class="text-small text-muted">${p==='f'?'FB':'IG'}</span><div class="track" role="img"><div class="mark ${p==='i'?'ig':''}"></div></div><span class="value tabular-nums"></span></div>`).join('')}</div>`).join('')}</section>`).join('');
    metrics.forEach((m,n)=>{
      const values=channels.flatMap(c=>m.index===null?[c.fb,c.ig]:[c.data[days].f[m.index],c.data[days].i[m.index]]);
      const max=Math.max(...values.map(num),1);
      root.querySelectorAll(`[data-metric="${n}"] .bar-row`).forEach(row=>{
        const c=channels[Number(row.dataset.channel)],p=row.dataset.platform;
        const val=m.index===null?(p==='f'?c.fb:c.ig):c.data[days][p][m.index];
        row.closest('.language-row').querySelector('.language-name').textContent=c.name;
        row.querySelector('.mark').style.width=`${100*num(val)/max}%`;
        row.querySelector('.value').textContent=fmt(val);
        row.querySelector('.track').setAttribute('aria-label',`${c.name} ${p==='f'?'Facebook':'Instagram'}: ${fmt(val)} ${m.name.toLowerCase()}`);
      });
    });
    root.querySelector('#wroc-data tbody').innerHTML=channels.flatMap(c=>['f','i'].map(p=>`<tr><td>${c.name}</td><td>${p==='f'?'Facebook':'Instagram'}</td>${c.data[days][p].map(v=>`<td class="text-end">${fmt(v)}</td>`).join('')}</tr>`)).join('');
    const group=root.querySelector('#group-summary');
    group.replaceChildren();
    const groupTitle=document.createElement('h3'); groupTitle.textContent='Hebrew Facebook group'; group.append(groupTitle);
    const groupCounts=document.createElement('p'); groupCounts.textContent=`${fmt(snapshot.group.members)} members · +${fmt(snapshot.group.addedLastWeek)} “in the last week” · ${fmt(snapshot.group.postsLastMonth)} posts “in the last month”`; group.append(groupCounts);
    const groupNote=document.createElement('p'); groupNote.className='text-small text-muted'; groupNote.textContent=`Public snapshot measured ${snapshot.measuredOn}. Rolling labels are separate from the selected period; additions are not verified net growth.`;group.append(groupNote);
    root.querySelector('#window-notes').textContent=[7,28,90].map(d=>`${d} days: ${snapshot.periods[d].start} – ${snapshot.periods[d].end}`).join(' · ');
    root.querySelector('#website-status').textContent=snapshot.websiteStatus;
    root.querySelector('#wroc-sources').innerHTML=channels.map(c=>`<a target="_blank" rel="noreferrer" href="https://business.facebook.com/latest/insights/results?business_id=${c.business}&asset_id=${c.asset}">${c.name} Meta Insights</a>`).join('')+'<a target="_blank" rel="noreferrer" href="https://www.facebook.com/groups/2525899074519424/about">Hebrew group</a>';
  }
  root.querySelectorAll('[data-days]').forEach(b=>b.addEventListener('click',()=>{days=Number(b.dataset.days);try{localStorage.setItem('wroc-social-period',String(days));}catch{}render();}));
  function download(content,type,name){
    const url=URL.createObjectURL(new Blob([content],{type}));const a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  root.querySelector('#download-json').addEventListener('click',()=>download(JSON.stringify(snapshot,null,2)+'\n','application/json',`wroc-love-social-${snapshot.measuredOn}.json`));
  root.querySelector('#download-csv').addEventListener('click',()=>{
    const quote=v=>'"'+String(v??'Unavailable').replaceAll('"','""')+'"';
    const rows=[['Language','Platform','Measured on','Start','End','Reporting timezone','Views','Viewers','Interactions','Link clicks','Profile/page visits','New follows']];
    snapshot.channels.forEach(c=>['f','i'].forEach(p=>rows.push([c.name,p==='f'?'Facebook':'Instagram',snapshot.measuredOn,snapshot.periods[days].start,snapshot.periods[days].end,snapshot.timeZone,...c.data[days][p]])));
    download(rows.map(r=>r.map(quote).join(',')).join('\r\n')+'\r\n','text/csv',`wroc-love-social-${snapshot.measuredOn}-${days}d.csv`);
  });
  root.querySelector('#snapshot-file').addEventListener('change',async event=>{
    const file=event.target.files[0],status=root.querySelector('#import-status');if(!file)return;
    try{
      if(file.size>1024*1024)throw new Error('Choose a JSON snapshot smaller than 1 MB.');
      const parsed=WrocSocialSchema.validateSnapshot(JSON.parse(await file.text()));
      snapshot=parsed;root.querySelector('#wroc-facets').replaceChildren();
      root.querySelector('#original-evidence').hidden=true;
      render();status.dataset.error='false';status.textContent=`Loaded ${snapshot.measuredOn} for this tab only. GitHub and the live site were not changed.`;
    }catch(error){status.dataset.error='true';status.textContent=`Snapshot not loaded: ${error.message}`;}
    event.target.value='';
  });
  render();
})();
