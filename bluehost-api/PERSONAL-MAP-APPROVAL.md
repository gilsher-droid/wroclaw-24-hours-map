# Personal-map request owner approval

Public intake writes `pending-owner-approval`, `source=website` and
`approvalRequired=true` on the server. Visitor-supplied source/status/approval
fields are ignored. A receipt means storage only: no map, login or delivery.

Owners enter through the existing dashboard → Personal maps → Review personal
map requests. The existing saved owner role, session and CSRF token are required.
Approve/decline records actor identity, UTC time, source, reference, method and
scope in the protected queue. A decision is immutable; an identical retry is
idempotent. Approval does not send mail, bill, or start a second job.

## Installation and preservation

Install the approval library, owner request dispatcher, CSS/JS and changed
personal-trips/index.php, owner-admin.php and trip-requests/index.php. Verify the
old three PHP sources against the rollback copies first. Activate once using the
owner-only `request-activate` POST with the existing CSRF token, or hosting CLI:

`php bluehost-api/tools/request-approval.php activate PRIVATE_PERSONAL_TRIPS_DIR`

Activation stores the existing customer→route bindings in the private request
queue. It never updates user passwords, sessions, routes, albums, media, delivery
receipts or owner roles. Existing bindings remain accessible. Later unknown
bindings are refused until registered through the approved preparation flow.
Do not reinitialize or regenerate this baseline after deployment.

## Authorized preparation protocol

All operations are owner-only POSTs on `/personal-trips/?action=...`, with the
existing `csrf` and `reference` fields. Optional `format=json` returns a redacted
machine response. No public caller may assert approval.

1. `request-decision`, `decision=approved|rejected`.
2. `request-start` atomically claims one production ID. Check before production:
   `php bluehost-api/tools/request-approval.php check PRIVATE_DIR REFERENCE production`
3. `request-provision`, with `username` and reviewed full map JSON in `route`.
   It preserves original request language and refuses to replace existing users
   or maps. Repeated identical calls resume or return the same binding. It makes
   no usable password: the existing owner access flow issues the temporary code.
4. `request-delivery-release` requires the approved, prepared map/customer pair.
   It records permission only, not a sent-message receipt. Before any sending:
   `php bluehost-api/tools/request-approval.php check PRIVATE_DIR REFERENCE delivery`
5. Use the existing verified private delivery workflow and record actual sent
   message IDs and owner copies separately. There is no automatic email sender.

The local mail helper rejects approval-required requests without a check against
protected hosting storage. Hosting invocation uses `--private-dir PRIVATE_DIR`.
It is a formatter, not a sending service. Never trust an approval object copied
from browser input as a service approval.

### Direct owner instruction

A specific instruction from Gil to supply a particular person's map is already
approval, not a request for another dashboard click. An authorized operator with
the existing owner session records it using `request-direct-approve` on an
existing reference, with `evidence` set to the exact chat/message/case reference.
For a new case use `request-direct-create` with `evidence`, `name` and original
`language`; retries of that instruction produce the same case. These are
owner-authenticated records of the instruction, not a public flag or automated
verification that a chat message exists. If the instruction cannot be verified
by the operator, do not use this path. Continue with request-start and the same
preparation protocol without asking Gil for duplicate human approval.

Customer map/album/nearby endpoints and owner access-reset/delivery preparation
refuse an unapproved new customer binding, including files manually copied into
private storage. Administrators with direct hosting access can still edit server
files; this feature cannot constrain a hosting administrator or stop arbitrary
offline work. Operational builders must use the server check before production.

No payment provider, price, charge, account role or billing change is included.
