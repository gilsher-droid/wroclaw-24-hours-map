<?php
declare(strict_types=1);

// A dashboard session may reuse an existing owner role, never provision one.
function dashboardOwnerIdentity(): ?string {
    $id = $_COOKIE['__Secure-wroc_owner'] ?? '';
    if (!is_string($id) || !preg_match('/^[A-Za-z0-9,-]{16,128}$/D', $id)) return null;
    $auth = dirname(__DIR__).'/owner-dashboard/owner-auth.php';
    if (!is_file($auth)) return null;
    require_once $auth;
    $previousName = session_name();
    $previousLimiter = session_cache_limiter();
    $identity = null;
    session_name('__Secure-wroc_owner');
    session_id($id);
    session_cache_limiter('');
    try {
        // No new cookie or session id can authenticate this request.
        if (!session_start(['use_cookies'=>false, 'use_strict_mode'=>true])) return null;
        if (hash_equals($id, session_id()) && !owner_expired($_SESSION, time())) {
            $candidate = $_SESSION['owner'] ?? null;
            if (is_string($candidate) && isset(dashboardOwnerAccounts()[$candidate])) {
                $identity = $candidate;
                $_SESSION['last_activity'] = time();
            }
        }
    } finally {
        if (session_status() === PHP_SESSION_ACTIVE) session_write_close();
        $_SESSION = [];
        session_id('');
        session_name($previousName);
        session_cache_limiter($previousLimiter);
        ini_set('session.use_cookies', '1');
    }
    return $identity;
}

function dashboardOwnerAccounts(): array {
    $path = dirname(__DIR__,2).'/owner-dashboard-state/map-owners.json';
    $records = is_file($path) ? json_decode((string)file_get_contents($path),true) : null;
    if (!is_array($records)) return [];
    return array_filter($records,static fn($name)=>is_string($name) && preg_match('/^[a-z0-9._-]{1,80}$/D',$name));
}

function dashboardOwnerRecord(string $private, ?string $identity): ?array {
    $name = dashboardOwnerAccounts()[$identity ?? ''] ?? null;
    if ($name === null) return null;
    $key = userKey($name);
    $record = readRecord($private.'/users/'.$key.'.json');
    if (!$record || !isOwnerAdmin($record) || ($record['disabled'] ?? false)
        || ($record['mustChangePassword'] ?? true)) return null;
    return ['key'=>$key, 'record'=>$record];
}
