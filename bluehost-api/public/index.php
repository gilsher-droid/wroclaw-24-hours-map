<?php

declare(strict_types=1);

const COOKIE_MAX_AGE_OWNER = 31536000;

// Phase 1 public launch: the historical payment/access implementation below is
// intentionally retained for a future controlled reactivation. Public routes
// must not charge customers, verify codes, or create new access records now.

$configPath = dirname(__DIR__) . '/config.php';
if (!is_file($configPath)) {
    respond(['error' => 'Server configuration is missing.'], 503);
}

/** @var array<string,mixed> $config */
$config = require $configPath;
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowedOrigin = (string) ($config['app_origin'] ?? 'https://wroc-love.com');

if ($origin !== '' && hash_equals($allowedOrigin, $origin)) {
    header('Access-Control-Allow-Origin: ' . $allowedOrigin);
    header('Access-Control-Allow-Credentials: true');
    header('Vary: Origin');
}
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
header('Content-Type: application/json; charset=utf-8');

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($origin !== '' && !hash_equals($allowedOrigin, $origin)) {
    respond(['error' => 'בקשה לא מורשית.'], 403);
}

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';

try {
    if ($path === '/health' && $method === 'GET') {
        respond(['ok' => true, 'service' => 'wroc-love-api']);
    }

    if ($path === '/api/paypal/config' && $method === 'GET') {
        respond(['error' => 'Payments are disabled during the public launch phase.'], 410);
    }

    if ($path === '/api/paypal/orders' && $method === 'POST') {
        respond(['error' => 'Payments are disabled during the public launch phase.'], 410);
    }

    if (preg_match('#^/api/paypal/orders/([A-Z0-9]{10,32})/capture$#', $path, $match) && $method === 'POST') {
        respond(['error' => 'Payments are disabled during the public launch phase.'], 410);
    }

    if ($path === '/api/access/verify' && $method === 'POST') {
        respond(['error' => 'Access codes are disabled during the public launch phase.'], 410);
    }

    if ($path === '/api/access/status' && $method === 'GET') {
        respond(['active' => true, 'free' => true, 'phase' => 'public-launch', 'expiresAt' => null]);
    }

    if ($path === '/api/access/logout' && $method === 'POST') {
        clearAccessCookie($config);
        respond(['active' => false]);
    }

    if ($path === '/api/admin/codes' && $method === 'POST') {
        respond(['error' => 'Access-code creation is disabled during the public launch phase.'], 410);
    }

    respond(['error' => 'העמוד לא נמצא.'], 404);
} catch (Throwable $error) {
    error_log('wroc-love-api: ' . $error->getMessage());
    respond(['error' => 'שירות האתר אינו זמין כרגע. נסו שוב מאוחר יותר.'], 503);
}

function respond(array $data, int $status = 200): never
{
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function requestJson(): array
{
    $payload = json_decode((string) file_get_contents('php://input'), true);
    return is_array($payload) ? $payload : [];
}

function db(array $config): PDO
{
    static $pdo;
    if ($pdo instanceof PDO) return $pdo;
    $db = $config['db'] ?? [];
    $dsn = sprintf('mysql:host=%s;port=%d;dbname=%s;charset=%s', $db['host'] ?? 'localhost', $db['port'] ?? 3306, $db['name'] ?? '', $db['charset'] ?? 'utf8mb4');
    $pdo = new PDO($dsn, (string) ($db['user'] ?? ''), (string) ($db['password'] ?? ''), [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
    ensureSchema($pdo);
    return $pdo;
}

function ensureSchema(PDO $pdo): void
{
    $pdo->exec("CREATE TABLE IF NOT EXISTS access_codes (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        code_hash CHAR(64) NOT NULL UNIQUE,
        customer_label VARCHAR(160) NOT NULL DEFAULT '',
        valid_days SMALLINT UNSIGNED NOT NULL DEFAULT 30,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        activated_at DATETIME NULL,
        expires_at DATETIME NULL,
        last_used_at DATETIME NULL,
        revoked_at DATETIME NULL,
        INDEX idx_access_expiry (expires_at, revoked_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
    $pdo->exec("CREATE TABLE IF NOT EXISTS paypal_purchases (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        paypal_order_id VARCHAR(32) NOT NULL UNIQUE,
        paypal_capture_id VARCHAR(32) NOT NULL UNIQUE,
        access_code_id BIGINT UNSIGNED NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        currency CHAR(3) NOT NULL,
        payer_email VARCHAR(160) NOT NULL DEFAULT '',
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_purchase_access FOREIGN KEY (access_code_id) REFERENCES access_codes(id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
}

function normalizeCode(mixed $value): string
{
    return preg_replace('/[^A-Z0-9]/', '', strtoupper((string) $value)) ?? '';
}

function base64UrlEncode(string $value): string
{
    return rtrim(strtr(base64_encode($value), '+/', '-_'), '=');
}

function base64UrlDecode(string $value): string|false
{
    $remainder = strlen($value) % 4;
    if ($remainder) $value .= str_repeat('=', 4 - $remainder);
    return base64_decode(strtr($value, '-_', '+/'), true);
}

function createSession(string $id, int $expires, string $secret): string
{
    $payload = $id . '.' . $expires;
    return $payload . '.' . base64UrlEncode(hash_hmac('sha256', $payload, $secret, true));
}

function decodeSession(string $token, string $secret): ?array
{
    $parts = explode('.', $token);
    if (count($parts) !== 3 || $secret === '') return null;
    [$id, $expires, $signature] = $parts;
    if (($id !== 'owner' && !ctype_digit($id)) || !ctype_digit($expires) || (int) $expires <= time()) return null;
    $decoded = base64UrlDecode($signature);
    $expected = hash_hmac('sha256', $id . '.' . $expires, $secret, true);
    if ($decoded === false || !hash_equals($expected, $decoded)) return null;
    return ['id' => $id === 'owner' ? 'owner' : (int) $id, 'expires' => (int) $expires];
}

function setAccessCookie(array $config, string $token, int $expires): void
{
    setcookie((string) ($config['cookie_name'] ?? 'wroc_love_access'), $token, [
        'expires' => $expires,
        'path' => '/',
        'secure' => true,
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
}

function clearAccessCookie(array $config): void
{
    setcookie((string) ($config['cookie_name'] ?? 'wroc_love_access'), '', [
        'expires' => time() - 3600,
        'path' => '/',
        'secure' => true,
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
}

function activeAccess(array $config): ?array
{
    $secret = (string) ($config['access_token_secret'] ?? '');
    $cookieName = (string) ($config['cookie_name'] ?? 'wroc_love_access');
    $session = decodeSession((string) ($_COOKIE[$cookieName] ?? ''), $secret);
    if (!$session) return null;
    if ($session['id'] === 'owner') return ['id' => 'owner', 'expires_at' => gmdate('c', $session['expires'])];
    $statement = db($config)->prepare('SELECT id, expires_at FROM access_codes WHERE id = ? AND revoked_at IS NULL AND expires_at > UTC_TIMESTAMP()');
    $statement->execute([$session['id']]);
    $row = $statement->fetch();
    if (!$row) return null;
    return ['id' => (int) $row['id'], 'expires_at' => gmdate('c', strtotime($row['expires_at'] . ' UTC'))];
}

function verifyAccessCode(array $config): never
{
    $payload = requestJson();
    $code = normalizeCode($payload['code'] ?? '');
    $secret = (string) ($config['access_token_secret'] ?? '');
    if ($secret === '') respond(['error' => 'מערכת הגישה עדיין אינה מחוברת.'], 503);

    $ownerHash = (string) ($config['owner_access_code_hash'] ?? '');
    if (str_starts_with($code, 'WROCOWNR') && $ownerHash !== '' && hash_equals($ownerHash, hash('sha256', $code))) {
        $expires = time() + (10 * 365 * 86400);
        setAccessCookie($config, createSession('owner', $expires, $secret), $expires);
        respond(['active' => true, 'owner' => true, 'expiresAt' => gmdate('c', $expires)]);
    }

    if (strlen($code) !== 12 || !str_starts_with($code, 'WROC')) respond(['error' => 'קוד הגישה אינו בפורמט הנכון.'], 400);
    $pdo = db($config);
    $statement = $pdo->prepare('SELECT id, activated_at, expires_at, revoked_at FROM access_codes WHERE code_hash = ?');
    $statement->execute([hash('sha256', $code)]);
    $row = $statement->fetch();
    if (!$row || $row['revoked_at']) respond(['error' => 'הקוד אינו תקף. בדקו אותו ונסו שוב.'], 401);

    if (!$row['activated_at']) {
        $activate = $pdo->prepare('UPDATE access_codes SET activated_at = UTC_TIMESTAMP(), expires_at = DATE_ADD(UTC_TIMESTAMP(), INTERVAL valid_days DAY), last_used_at = UTC_TIMESTAMP() WHERE id = ? AND activated_at IS NULL');
        $activate->execute([$row['id']]);
    } else {
        $pdo->prepare('UPDATE access_codes SET last_used_at = UTC_TIMESTAMP() WHERE id = ?')->execute([$row['id']]);
    }

    $statement = $pdo->prepare('SELECT id, expires_at FROM access_codes WHERE id = ? AND revoked_at IS NULL AND expires_at > UTC_TIMESTAMP()');
    $statement->execute([$row['id']]);
    $active = $statement->fetch();
    if (!$active) respond(['error' => 'תקופת הגישה של הקוד הסתיימה.'], 403);
    $expires = strtotime($active['expires_at'] . ' UTC');
    setAccessCookie($config, createSession((string) $active['id'], $expires, $secret), $expires);
    respond(['active' => true, 'expiresAt' => gmdate('c', $expires)]);
}

function paypalBase(array $config): string
{
    return ($config['paypal']['mode'] ?? 'live') === 'sandbox' ? 'https://api-m.sandbox.paypal.com' : 'https://api-m.paypal.com';
}

function paypalRequest(array $config, string $method, string $path, ?array $body = null, array $headers = []): array
{
    $paypal = $config['paypal'] ?? [];
    $clientId = (string) ($paypal['client_id'] ?? '');
    $clientSecret = (string) ($paypal['client_secret'] ?? '');
    if ($clientId === '' || $clientSecret === '') throw new RuntimeException('PAYPAL_NOT_CONFIGURED');

    $tokenHandle = curl_init(paypalBase($config) . '/v1/oauth2/token');
    curl_setopt_array($tokenHandle, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_USERPWD => $clientId . ':' . $clientSecret,
        CURLOPT_HTTPHEADER => ['Content-Type: application/x-www-form-urlencoded'],
        CURLOPT_POSTFIELDS => 'grant_type=client_credentials',
        CURLOPT_TIMEOUT => 20,
    ]);
    $tokenBody = curl_exec($tokenHandle);
    $tokenStatus = (int) curl_getinfo($tokenHandle, CURLINFO_RESPONSE_CODE);
    curl_close($tokenHandle);
    $token = json_decode((string) $tokenBody, true)['access_token'] ?? '';
    if ($tokenStatus < 200 || $tokenStatus >= 300 || $token === '') throw new RuntimeException('PAYPAL_AUTH_FAILED');

    $handle = curl_init(paypalBase($config) . $path);
    $httpHeaders = array_merge(['Authorization: Bearer ' . $token, 'Content-Type: application/json'], $headers);
    curl_setopt_array($handle, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CUSTOMREQUEST => $method,
        CURLOPT_HTTPHEADER => $httpHeaders,
        CURLOPT_TIMEOUT => 25,
    ]);
    if ($body !== null) curl_setopt($handle, CURLOPT_POSTFIELDS, json_encode($body));
    $responseBody = curl_exec($handle);
    $status = (int) curl_getinfo($handle, CURLINFO_RESPONSE_CODE);
    curl_close($handle);
    return ['status' => $status, 'body' => json_decode((string) $responseBody, true) ?: []];
}

function createPaypalOrder(array $config): never
{
    $paypal = $config['paypal'] ?? [];
    $result = paypalRequest($config, 'POST', '/v2/checkout/orders', [
        'intent' => 'CAPTURE',
        'purchase_units' => [[
            'reference_id' => 'wroc-love-30-day-access',
            'description' => 'Wroc-love - 30-day access',
            'amount' => ['currency_code' => (string) ($paypal['currency'] ?? 'ILS'), 'value' => (string) ($paypal['amount'] ?? '49.00')],
        ]],
    ], ['PayPal-Request-Id: ' . bin2hex(random_bytes(16))]);
    if ($result['status'] < 200 || $result['status'] >= 300 || empty($result['body']['id'])) respond(['error' => 'לא הצלחנו לפתוח את התשלום ב־PayPal.'], 502);
    respond(['id' => $result['body']['id']], 201);
}

function completedCapture(array $order, array $config): ?array
{
    $expectedCurrency = (string) ($config['paypal']['currency'] ?? 'ILS');
    $expectedAmount = (string) ($config['paypal']['amount'] ?? '49.00');
    foreach ($order['purchase_units'] ?? [] as $unit) {
        foreach ($unit['payments']['captures'] ?? [] as $capture) {
            if (($capture['status'] ?? '') === 'COMPLETED' && ($capture['amount']['currency_code'] ?? '') === $expectedCurrency && ($capture['amount']['value'] ?? '') === $expectedAmount) return $capture;
        }
    }
    return null;
}

function capturePaypalOrder(array $config, string $orderId): never
{
    $pdo = db($config);
    $existing = $pdo->prepare('SELECT p.access_code_id, a.expires_at FROM paypal_purchases p JOIN access_codes a ON a.id = p.access_code_id WHERE p.paypal_order_id = ?');
    $existing->execute([$orderId]);
    if ($row = $existing->fetch()) {
        $expires = strtotime($row['expires_at'] . ' UTC');
        setAccessCookie($config, createSession((string) $row['access_code_id'], $expires, (string) $config['access_token_secret']), $expires);
        respond(['active' => true, 'expiresAt' => gmdate('c', $expires)]);
    }

    $result = paypalRequest($config, 'POST', '/v2/checkout/orders/' . rawurlencode($orderId) . '/capture', [], ['PayPal-Request-Id: capture-' . $orderId]);
    if ($result['status'] === 422) $result = paypalRequest($config, 'GET', '/v2/checkout/orders/' . rawurlencode($orderId));
    $capture = completedCapture($result['body'], $config);
    if ($result['status'] < 200 || $result['status'] >= 300 || !$capture) respond(['error' => 'התשלום לא הושלם. לא בוצע חיוב נוסף.'], 502);

    $pdo->beginTransaction();
    try {
        $payerEmail = substr((string) ($result['body']['payer']['email_address'] ?? 'PayPal customer'), 0, 160);
        $codeHash = hash('sha256', 'PAY-' . $orderId . '-' . bin2hex(random_bytes(16)));
        $insert = $pdo->prepare("INSERT INTO access_codes (code_hash, customer_label, valid_days, activated_at, expires_at, last_used_at) VALUES (?, ?, 30, UTC_TIMESTAMP(), DATE_ADD(UTC_TIMESTAMP(), INTERVAL 30 DAY), UTC_TIMESTAMP())");
        $insert->execute([$codeHash, $payerEmail]);
        $accessId = (int) $pdo->lastInsertId();
        $purchase = $pdo->prepare('INSERT INTO paypal_purchases (paypal_order_id, paypal_capture_id, access_code_id, amount, currency, payer_email) VALUES (?, ?, ?, ?, ?, ?)');
        $purchase->execute([$orderId, $capture['id'], $accessId, $capture['amount']['value'], $capture['amount']['currency_code'], $payerEmail]);
        $statement = $pdo->prepare('SELECT expires_at FROM access_codes WHERE id = ?');
        $statement->execute([$accessId]);
        $expires = strtotime($statement->fetchColumn() . ' UTC');
        $pdo->commit();
    } catch (Throwable $error) {
        $pdo->rollBack();
        throw $error;
    }
    setAccessCookie($config, createSession((string) $accessId, $expires, (string) $config['access_token_secret']), $expires);
    respond(['active' => true, 'expiresAt' => gmdate('c', $expires)]);
}

function generateCode(): string
{
    $alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    $characters = '';
    for ($index = 0; $index < 8; $index++) $characters .= $alphabet[random_int(0, strlen($alphabet) - 1)];
    return 'WROC-' . substr($characters, 0, 4) . '-' . substr($characters, 4);
}

function createAccessCode(array $config): never
{
    $authorization = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    $expected = 'Bearer ' . (string) ($config['admin_secret'] ?? '');
    if ($expected === 'Bearer ' || !hash_equals($expected, $authorization)) respond(['error' => 'מפתח המנהל אינו נכון.'], 401);
    $payload = requestJson();
    $label = substr(trim((string) ($payload['label'] ?? '')), 0, 160);
    $validDays = max(1, min(90, (int) ($payload['validDays'] ?? 30)));
    if ($label === '') respond(['error' => 'יש להזין שם או אימייל של הלקוח.'], 400);
    $pdo = db($config);
    for ($attempt = 0; $attempt < 4; $attempt++) {
        $code = generateCode();
        try {
            $statement = $pdo->prepare('INSERT INTO access_codes (code_hash, customer_label, valid_days) VALUES (?, ?, ?)');
            $statement->execute([hash('sha256', normalizeCode($code)), $label, $validDays]);
            respond(['code' => $code, 'validDays' => $validDays], 201);
        } catch (PDOException $error) {
            if ($attempt === 3) throw $error;
        }
    }
    respond(['error' => 'לא ניתן להפיק קוד כרגע.'], 500);
}
