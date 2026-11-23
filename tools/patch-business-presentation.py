"""Patch the fresh protected JS readback. Never commit the input/output or owner data.
Usage: python3 patch-business-presentation.py FRESH_WEBSITE_JS OUTPUT_JS
"""
from pathlib import Path
import sys

def patch(source, module):
    if 'WROC_BUSINESS_FILTER_V1' in source:
        raise ValueError('Already patched; reconcile the live version rather than stacking implementations')
    def replace(old,new):
        nonlocal source
        if source.count(old)!=1: raise ValueError('Unexpected dashboard version: '+old[:90])
        source=source.replace(old,new)
    replace("let days=28,source='mapUsers',selected='Poland',business='Hotel';","let days=28,source='mapUsers',selected='Poland',business='all';")
    replace('<select id="pp-business"><option>Hotel</option><option>Restaurant</option><option>Museum</option><option>Café</option><option>Ice cream shop</option></select>', '<select id="pp-business"><option value="all" selected>All businesses</option><option value="hotel">Hotel</option><option value="restaurant">Restaurant</option><option value="museum">Museum</option><option value="cafe">Café</option><option value="ice-cream">Ice cream shop</option></select>')
    replace('Website reporting window<select id="pp-period">','Complete-day window (latest imported GA4 cutoff)<select id="pp-period">')
    replace('const p=web.periods[days],v=p.current;node.querySelector(\'#pp-period-label\').textContent=`${p.start} – ${p.end} · GA4 measured 1 November 2026 · all countries, all website languages`;', 'const p=window.WROC_LATEST_WEBSITE_DATA.periods[days],v=p.current;node.querySelector(\'#pp-period-label\').textContent=`Website-wide GA4: ${p.start} – ${p.end} · collected ${window.WROC_LATEST_WEBSITE_DATA.collectedOn} · Asia/Jerusalem. Business/place/language/map filters apply only to measured place activity below. Globe layers have separate dated sources.`;')
    replace("${esc(note)}</small></div>`).join('');", "${esc(note)} · ${esc(p.start)} – ${esc(p.end)} · GA4, collected ${esc(window.WROC_LATEST_WEBSITE_DATA.collectedOn)} · site-wide</small></div>`).join('');")
    lines=source.splitlines()
    for i,line in enumerate(lines):
        if "const locations=web.mapCountries[days].filter" in line:
            lines[i]="    node.querySelector('#pp-strip').innerHTML=`<span><strong>${fmt(v.mapOpens)}</strong> site-wide map-opening events</span><span><strong>${fmt(v.placeOpens)}</strong> site-wide place-opening events</span><span>${esc(p.start)} – ${esc(p.end)} · GA4 collected ${esc(window.WROC_LATEST_WEBSITE_DATA.collectedOn)}</span>`;"
        if "const museum=business==='Museum'" in line or "node.querySelector('#pp-category').innerHTML=" in line or "node.querySelector('#pp-exploration').innerHTML=" in line:
            lines[i]='    // Business activity is rendered from the authenticated first-party report below.'
        if "const cur=web.periods[7].current,prev=web.periods[7].previous;" in line:
            lines[i]="    const cur=p.current,prev=p.previous;node.querySelector('#pp-momentum').innerHTML=barChart('Website sessions',[[p.start+' to '+p.end,cur.sessions],...(prev.sessions==null?[]:[[p.previousStart+' to '+p.previousEnd,prev.sessions]])],`Site-wide GA4 · collected ${window.WROC_LATEST_WEBSITE_DATA.collectedOn}. ${p.comparisonCoverage}`)+barChart('Users opening a map',[[p.start+' to '+p.end,cur.mapUsers],...(prev.mapUsers==null?[]:[[p.previousStart+' to '+p.previousEnd,prev.mapUsers]])],`Site-wide GA4 · collected ${window.WROC_LATEST_WEBSITE_DATA.collectedOn}. Never add users across actions.`);"
    source='\n'.join(lines)+'\n'
    replace('Two separate measured weeks: 18–24 October versus 25–31 October 2026. This is a weekly comparison, not a reconstructed daily trend.','The selected complete-day GA4 snapshot window and its matched previous window. Website-wide; not business-filtered. Missing comparable history is omitted, not replaced with zero.')
    replace("`GA4 · ${source==='mapUsers'?'total users triggering map_open':'map_open event count'} · ${p.start} – ${p.end} · country users may overlap; never sum them as unique people.`", "`SITE-WIDE HISTORICAL LAYER · GA4 · ${source==='mapUsers'?'total users triggering map_open':'map_open event count'} · ${web.periods[days].start} – ${web.periods[days].end} · collected 1 November 2026. Not filtered by business. Country users may overlap; never sum them as unique people.`")
    replace("statsRow('Website active users',fmt(active))+", "")
    replace('GA4 reported location. Users and repeat actions are separate. Content language, individual-map and business conversion breakdowns are not imported.', 'GA4 reported location, collected 1 November 2026. Historical site-wide layer, not business-filtered. Users and repeat actions are separate. Content language, individual-map and business conversion breakdowns are not imported.')
    replace('GA4 · active users · ${window.WROC_LATEST_WEBSITE_DATA.periods[days].start}', 'SITE-WIDE · GA4 · active users · ${window.WROC_LATEST_WEBSITE_DATA.periods[days].start}')
    replace('GA4 property 555641784 · refreshed 1 November 2026 · saved snapshot, not a live feed.', 'GA4 property 555641784 · website snapshot collected 7 November 2026, through 6 November · site-wide. Place activity uses the separate authenticated first-party report and displays its own collection time. Historical globe layers remain explicitly dated.')
    replace('Website KPIs use GA4 report dates; reporting timezone is not independently verified.', 'Website KPIs use GA4 report dates, Asia/Jerusalem. First-party place counts use Europe/Warsaw and exclude the current partial day. Each source retains its own dates; neither is silently substituted for the other.')
    replace('${esc(web.partnerPresentation.categoryScope)}','Classification uses canonical structured fields only. Map landings are not business activity. Missing classifications and missing measurement are not zero.')
    return source+'\n/* WROC_BUSINESS_FILTER_V1 */\n'+module+'\n'

if __name__=='__main__':
    repo=Path(__file__).resolve().parents[1]
    Path(sys.argv[2]).write_text(patch(Path(sys.argv[1]).read_text(),(repo/'bluehost-api/owner-dashboard/business-insights.js').read_text()))
