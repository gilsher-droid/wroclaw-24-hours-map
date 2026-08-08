<?php

declare(strict_types=1);

return [
    'app_origin' => 'https://wroc-love.com',
    'cookie_name' => 'wroc_love_access',
    'access_token_secret' => 'replace-with-a-long-random-secret',
    'owner_access_code_hash' => 'replace-with-the-sha256-hash-of-the-owner-code',
    'admin_secret' => 'replace-with-a-long-random-admin-secret',
    'db' => [
        'host' => 'localhost',
        'port' => 3306,
        'name' => 'replace-with-bluehost-database-name',
        'user' => 'replace-with-bluehost-database-user',
        'password' => 'replace-with-bluehost-database-password',
        'charset' => 'utf8mb4',
    ],
    'paypal' => [
        'mode' => 'live',
        'client_id' => 'replace-with-live-paypal-client-id',
        'client_secret' => 'replace-with-live-paypal-client-secret',
        'currency' => 'ILS',
        'amount' => '49.00',
    ],
];
