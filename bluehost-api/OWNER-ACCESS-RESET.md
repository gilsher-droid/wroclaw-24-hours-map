# Personal-map owner access reset

The existing owner dashboard opens `/personal-trips/?action=owner-entry`. Each customer card now has **Reset access & resend**. The bridge reuses an existing owner role; it never creates accounts or roles. Its previously deployed source is included here to keep deployments reproducible.

An owner verifies the customer username and existing delivery destinations, then submits the reset form. The server generates a new random temporary four-digit code, expires it after 24 hours, revokes existing customer sessions, and requires a different personal code at the next login. Routes, media, albums and other accounts are untouched. Existing accounts without an expiry field keep their current behavior. Owner credentials cannot be reset through this customer workflow.

Each form has a session-bound idempotency token. The encrypted delivery event is saved before the account update so a retry can finish an interrupted write without issuing another code. All credential updates share a per-customer lock and check the current session version. The reset event is stored outside the document root under `personal-trips-private/access-resets`, with mode 0600; the temporary code is encrypted using AES-256-GCM and a purpose-specific key derived from the existing private server key. Audit lines never contain credentials.

Delivery templates follow the account's original request language (he/en/pl/de/cs). Missing language blocks the reset. Private messages contain the customer login link, verified username and temporary code together. Public replies contain none of those credentials and become available only after a private delivery is confirmed.

## Delivery integration boundary

**This release prepares messages and tracks manual delivery. It does not automatically send Gmail, Messenger or group comments.** The hosting server has no authenticated connection to the designated business Gmail or Meta account. No personal Gmail alias, PHP mail spoofing, ordinary mailbox password or guessed Meta recipient ID is used as a substitute.

Send email from the signed-in business account shown in the UI. Send Messenger messages in the verified conversation. Record the actual sent-message ID or permalink afterward. The state is explicitly **Sent, confirmed by owner**, rather than claiming provider-verified delivery. Pending and absent destinations remain separate. A sent channel does not offer another copy button. A consumed, expired or superseded code is unavailable for delivery.

A future automatic transport must verify the sending identity, store credentials only in protected server configuration, enforce the provider's current messaging constraints, save provider message IDs, and reconcile uncertain outcomes before retries. It must not silently broaden access or send duplicate deliveries.

## Validation

`python3 tests/personal-trip-owner-admin.test.py` covers owner-only authorization, target and username binding, CSRF and method restrictions, customer isolation, session revocation, forced code change, expiry, idempotency, interrupted-write recovery, rate limits, delivery states, public credential exclusion and all five message languages. Run the existing album, community and nearby Python suites as well.

For deployment, back up the live PHP source first. Install only `index.php`, `owner-admin.php`, `dashboard-owner.php`, `owner-access.php`, `owner-access.css` and `owner-access.js`. Preserve all private users, routes, sessions, album storage, server keys, dashboard role mappings and existing frontend assets. Do not reset a real customer's access during installation or QA.

## Hosting compatibility correction

The hosting firewall rejected the first live reset POST before the application ran. The form originally submitted complete Facebook links. It now parses supported conversation, post and comment links into typed identifiers; PHP independently validates those identifiers and reconstructs canonical Facebook destinations. Raw URL parameters and the old form format are rejected. No encoding disguise, firewall exclusion, rule change or security reduction is used. The hosting log viewer did not expose the matched rule ID, so the exact rule is not claimed.

JavaScript must finish validating the form before the reset button is enabled. Delivery receipt fields accept message IDs, not URLs or message bodies. Server authorization, CSRF, customer binding, locking, code expiry and idempotency remain unchanged. Live customer credential mutation still requires the owner to submit the action.

The **Check delivery details** action runs the same authorization and destination validation without changing an account or issuing a code. It can be exercised against the production hosting firewall before the owner performs an actual reset.
