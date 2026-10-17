# Personal trip inquiries

The public service page requests a quote only. No payment, booking, newsletter
subscription, customer account, or finished private map is created by this form.
The agreed commercial scope and delivery date must be confirmed separately.

Install `public/trip-requests/index.php` without changing the existing API router
or the protected owner dashboard. Install the recipient configuration as
`trip-requests-private/config.php` beside `public/`, outside its document root.
Never commit actual recipients, rate salt, requests or deployment archives.

The endpoint accepts JSON from the two approved website origins, validates and
limits input, hashes the IP for a bounded rate log, and stores the inquiry under
a random request ID in the private directory. A repeated ID with identical data
returns the same reference and does not send a second notification. Changed
data under an existing ID returns 409. A pending request remains in the browser
on HTTP or network failure; no form contents are sent to analytics or persisted
in browser storage.

`accepted: true` means a durable private record exists. PHP mail transport
acceptance is recorded separately for each recipient. It is not proof of inbox
delivery. Review `notificationState: needs-owner-review` in the private queue if
mail transport fails. Owners can retrieve records through their authenticated
hosting file manager. This initial release does not provide a customer login or
an inquiry administration screen. Do not put queue records into the public
website or assume the analytics dashboard exposes them.

The public GET health check returns readiness and version only. Configuration
and private queue records must remain unreachable over HTTP. Do not add the
server directory to the GitHub Pages artifact. Recipient changes require a
server-only configuration update and a new end-to-end notification check.
