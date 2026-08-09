# Bluehost API deployment

## Phase 1 public launch

All customer-facing maps currently open directly and free of charge. The
historical PayPal, access-code and admin-code routes return HTTP 410 and do not
create orders, codes, activations or customer records. Existing database tables
and historical rows are intentionally preserved for a possible future,
controlled reactivation.

This directory contains the private PHP/MySQL backend for `api.wroc-love.com`.

1. Create a MySQL database and database user in Bluehost.
2. Copy `config.example.php` to `config.php` and fill in the database and PayPal live credentials.
3. Point the `api.wroc-love.com` subdomain document root to `bluehost-api/public`.
4. Upload the folder with `config.php` one level above the public document root.
5. Verify `https://api.wroc-love.com/health` returns JSON with `ok: true`.

Never commit `config.php`. It contains production secrets.
