# Place usage counters

Deploy `place-analytics.php` outside the public document root, alongside the existing backend configuration. It stores only whitelisted aggregate event dimensions in `place-analytics-state/` (0700 directory; 0600 files). No user identifiers, IPs, questions, customer data, exact device location, URLs or media filenames are recorded. Retention is 90 completed Warsaw calendar days plus today. Test traffic uses separate files excluded from reports.

Deploy `public/place-events/` into the API public document root. This public POST-only collector accepts only the two production website origins, explicit analytics consent, up to 20 events and 16 KB per batch. Its catalogue includes only public canonical IDs and labels. It is telemetry, not proof of human visits; browser-origin restrictions are not caller authentication. Reports must never interpret actions as unique users, visits, bookings or revenue.

Deploy `owner-dashboard/place-report.php` and `place-insights.js` into the existing protected owner dashboard. Integrate the report route **after** the existing session authentication and expiration checks, before static-asset handling:

```php
if ($asset === 'place-report') { require __DIR__.'/place-report.php'; exit; }
if ($asset === 'place-insights.js') {
    header('Content-Type: text/javascript; charset=utf-8');
    readfile(__DIR__.'/place-insights.js'); exit;
}
```

Add `<script defer src="place-insights.js"></script>` to the authenticated dashboard document. Preserve existing session logic, CSP, owner credentials and reports. Neither endpoint bypasses owner authentication. The report refreshes every minute while visible and supports 1/7/28/90-day windows and language filtering. Historical GA4/Meta snapshots retain their own dates and sources.

The website dispatches the same consented events to GA4 and this collector. Video opens are separate from confirmed player starts, milestones and completions; the latter use the YouTube IFrame API. Missing/blocked player telemetry remains unmeasured. `analytics_exclude=1` excludes the current browser session (including GA4/Meta); `analytics_exclude=0` restores it. `analytics_test=1` routes first-party events to isolated test counters and disables GA4/Meta for that page. Authenticated owners can inspect the isolated report at `place-report?days=1&test=1`. No replay of unconsented activity is performed.

Generate `public/place-events/catalog.json` from the public canonical catalogue during builds. Do not include owner reports, aggregate data or credentials in the GitHub Pages artifact.
