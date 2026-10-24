# Private personal trip album

This service extends the existing authenticated `/personal-trips/` PHP service.
Deploy `public/personal-trips/` only to the existing API document root. Do not
upload a private directory, account records, server key, credentials or media to
GitHub, Pages, the public canonical catalog or the wife's static sandbox.

Existing identity/session validation, forced password change and route access
remain the authority. The album API checks these for every request. All writes
require the same session CSRF token, including multipart uploads. List reads
also require the token so a tab from a previous login cannot silently change
account. Media IDs are looked up only within the authenticated owner's album.

Storage is under the existing sibling `personal-trips-private/albums/`, owner
SHA-256 key and route-place scope. Directories are 0700, JSON and media 0600.
Uploaded names never become paths. Fileinfo magic, image dimensions, image/video
byte limits, membership of the assigned itinerary and per-account capacity are
validated server-side. Public visitors cannot read personal media; private
videos are an explicit customer-album exception to the public YouTube workflow.
Canonical/public visit and guide videos still use existing Public YouTube URLs.
No personal file is sent to AI, analytics, public maps or YouTube.

Concurrent writes are locked. A stale revision gets 409 instead of overwriting
another device. Atomic metadata saves retain the latest 30 private revision snapshots.
Removal is recoverable and retains media. 60 active entries, 200 MiB including
recoverable entries, 15 MiB images and 60 MiB videos are the initial limits.
Exceeding capacity stops with an error; it never buys storage. Metadata history
is on the same server and is not an independent disaster-recovery backup.
The authenticated full ZIP download includes originals and an album JSON
manifest, including recoverable records. Keep that archive private. Browser
printing produces PDF pages; it cannot embed playable video. Private video is
available after login and in the downloaded original-media backup.

Deployment prerequisites: PHP 8.1+, fileinfo, mbstring, GD-independent getimagesize,
ZipArchive; writable existing private parent; `upload_max_filesize >= 64M` and
`post_max_size >= 68M`. Use the scoped `.user.ini` supplied here if the host
allows it. Existing hosting disk limits and actual backup policy must be
verified before promising retention or disaster recovery. No extra paid service
is introduced. Do not start PHP as a permanent service on the owner's Mac.

Validation: `PHP_BINARY=/path/to/php python3 tests/personal-trip-album-server.test.py`.
The suite creates only temporary synthetic accounts. It checks auth, CSRF,
assigned-place validation, optimistic concurrency, true file types, media range
requests, cross-user denial, duplicate detection, restore, ZIP backup, a fresh
session read and private recovery-file permissions. Test the native browser
workflow and the actual deployed host as well. Never reset a real user's chosen
password for verification.

## Owner administration

Owner accounts are separate protected user records with `role: "owner-admin"`.
The role is not assignable through the customer UI or request payloads. Use an
independently generated strong password for each authorized owner; never reuse
or retain a customer's chosen password. Owner password changes require at least
16 characters. Revoking the saved role, disabling the owner, or changing the
session version takes effect on the next request.

`/personal-trips/?action=admin` lists all valid customer maps automatically.
Direct owner links use `?action=album&customer=<customer-user-key>` and require an
owner login. The key is a routing identifier, not an access token. Every browser
tab and API/media/export request carries its own customer scope, rather than
changing a global selected customer. Customer requests with that parameter are
denied. Owner access operates on the original customer album, not a duplicate.
Opening an album or submitting a write records the actor and customer scope in
`personal-trips-private/owner-access.jsonl` (0600), outside the document root.
Owner map links survive sign-in and do not change the customer password.

Deploy `owner-admin.php`, `index.php`, `album-api.php`, `album-page.php`,
`album-bootstrap.js`, `album-server-store.js`, `app.css`, and `album-assets.json`
together. Provision the two explicitly authorized owners as new protected user
records, without replacing existing customer accounts or the server key. Private
records and credentials must not enter Git or a public deployment bundle. Send
each owner their own credentials privately and include a direct owner link in
all future customer-delivery copies.
