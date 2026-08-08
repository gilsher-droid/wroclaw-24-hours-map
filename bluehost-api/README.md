# Bluehost API deployment

This directory contains the private PHP/MySQL backend for `api.wroc-love.com`.

1. Create a MySQL database and database user in Bluehost.
2. Copy `config.example.php` to `config.php` and fill in the database and PayPal live credentials.
3. Point the `api.wroc-love.com` subdomain document root to `bluehost-api/public`.
4. Upload the folder with `config.php` one level above the public document root.
5. Verify `https://api.wroc-love.com/health` returns JSON with `ok: true`.

Never commit `config.php`. It contains production secrets.
