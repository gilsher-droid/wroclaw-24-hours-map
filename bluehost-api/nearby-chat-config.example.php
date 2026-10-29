<?php
declare(strict_types=1);
// Install as nearby-chat-private/config.php OUTSIDE the public document root.
// Review model, retention terms, billing source and limits before changing enabled.
return [
 'enabled' => false,
 'provider' => 'openai', // openai or gemini; never accepted from browser input
 'model' => '', // Exact approved model ID, no implicit default or automatic upgrade
 'api_key' => '', // Server secret, never commit a real key
 'allowed_origins' => ['https://wroc-love.com', 'https://sandbox.wroc-love.com'],
 'rate_salt' => '', // Random deployment secret; pseudonymous counters only
 'per_client_per_hour' => 12,
 'requests_per_day' => 100, // Hard global request ceiling, includes failed attempts
 'max_output_tokens' => 500,
 // Request/token limits do not guarantee a monetary ceiling. Also set a provider-side spend limit.
];
