/* Shared browser and Node validation; imports never execute file content. */
(() => {
  const names = ['Hebrew', 'English', 'German', 'Polish', 'Czech'];
  function date(value) {
    return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) &&
      Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0,10) === value;
  }
  function metric(value) {
    return value === null || (typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= 1e12) ||
      (typeof value === 'string' && /^\d+(?:\.\d+)?K$/.test(value) && parseFloat(value) <= 1e9);
  }
  function validateSnapshot(s) {
    if (!s || s.schemaVersion !== 1 || !date(s.measuredOn) || s.timeZone !== 'America/Los_Angeles') throw new Error('Use schema version 1, a valid measurement date, and America/Los_Angeles reporting time.');
    for (const days of [7,28,90]) {
      const p = s.periods?.[days];
      if (!p || !['start','end','previousStart','previousEnd'].every(k=>date(p[k]))) throw new Error('Each reporting window needs valid current and previous dates.');
      const length=(a,b)=>(Date.parse(b)-Date.parse(a))/86400000+1;
      if (length(p.start,p.end)!==days || length(p.previousStart,p.previousEnd)!==days || Date.parse(p.start)-Date.parse(p.previousEnd)!==86400000 || p.end>s.measuredOn) throw new Error('Reporting windows must have the selected length and adjacent comparison periods.');
    }
    if (!Array.isArray(s.channels) || s.channels.length !== 5 || new Set(s.channels.map(c=>c.name)).size!==5) throw new Error('Include the five distinct WROC-LOVE language channels.');
    for (const c of s.channels) {
      if (!names.includes(c.name) || !Number.isSafeInteger(c.fb) || c.fb<0 || !Number.isSafeInteger(c.ig) || c.ig<0 || !/^\d{1,24}$/.test(c.business) || !/^\d{1,24}$/.test(c.asset)) throw new Error('Check channel names, follower counts and Meta source identifiers.');
      for (const days of [7,28,90]) for (const platform of ['f','i']) {
        const row=c.data?.[days]?.[platform];
        if (!Array.isArray(row) || row.length!==6 || !row.every(metric)) throw new Error('Each platform/window needs six nonnegative metrics; use null for unavailable values.');
      }
    }
    if (!s.group || !['members','addedLastWeek','postsLastMonth'].every(k=>Number.isSafeInteger(s.group[k])&&s.group[k]>=0)) throw new Error('Check the group snapshot counts.');
    if (typeof s.websiteStatus!=='string' || s.websiteStatus.length>1000) throw new Error('Include a short website measurement status.');
    return s;
  }
  globalThis.WrocSocialSchema={validateSnapshot};
})();
