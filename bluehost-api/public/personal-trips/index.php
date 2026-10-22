<?php
declare(strict_types=1);
// Deploy this folder beneath the existing API document root. Private data is its sibling.
header('Cache-Control: no-store, private, max-age=0');
header('Pragma: no-cache');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: strict-origin-when-cross-origin');
header('X-Frame-Options: DENY');
header('X-Robots-Tag: noindex, nofollow, noarchive');
header("Content-Security-Policy: default-src 'none'; script-src 'self' https://unpkg.com; style-src 'self' https://unpkg.com; media-src 'self' blob:; img-src 'self' blob: https://unpkg.com https://wroc-love.com https://*.tile.openstreetmap.org data:; connect-src 'self'; frame-src https://www.youtube.com https://www.youtube-nocookie.com; form-action 'self'; base-uri 'none'; frame-ancestors 'none'");
$private = dirname(__DIR__, 2) . '/personal-trips-private';
if (!is_dir($private) || !is_file($private . '/server-key')) { http_response_code(503); exit('השירות טרם חובר.'); }
ini_set('session.use_strict_mode', '1');
ini_set('session.use_only_cookies', '1');
ini_set('session.use_trans_sid', '0');
ini_set('session.gc_maxlifetime', '28800');
// Never trust proxy headers supplied by a visitor. Production must terminate HTTPS here.
$localTest = PHP_SAPI === 'cli-server' && in_array($_SERVER['REMOTE_ADDR'] ?? '', ['127.0.0.1','::1'], true);
if (!$localTest && (empty($_SERVER['HTTPS']) || $_SERVER['HTTPS'] === 'off')) { http_response_code(400); exit('HTTPS required.'); }
session_name('wroc_personal_session');
session_set_cookie_params(['lifetime'=>0,'path'=>'/personal-trips/','secure'=>!$localTest,'httponly'=>true,'samesite'=>'Strict']);
session_save_path($private . '/sessions');
if (!session_start()) { http_response_code(503); exit('לא ניתן לפתוח כניסה מאובטחת כרגע.'); }
if (!isset($_SESSION['csrf'])) $_SESSION['csrf'] = bin2hex(random_bytes(32));
function h(string $value): string { return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'); }
function jsonReply(array $value, int $status=200): never { http_response_code($status); header('Content-Type: application/json; charset=utf-8'); echo json_encode($value, JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES|JSON_THROW_ON_ERROR); exit; }
function readRecord(string $path): ?array { if (!is_file($path)) return null; $value=json_decode((string)file_get_contents($path),true); return is_array($value)?$value:null; }
function userKey(string $name): string { return hash('sha256', strtolower(trim($name))); }
function csrfValid(): bool { return hash_equals((string)$_SESSION['csrf'], (string)($_POST['csrf'] ?? $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '')); }
function saveRecord(string $path,array $data): void { $tmp=tempnam(dirname($path),'.atomic-'); if ($tmp===false) throw new RuntimeException('write failed'); chmod($tmp,0600); if(file_put_contents($tmp,json_encode($data,JSON_UNESCAPED_UNICODE|JSON_THROW_ON_ERROR))===false || !rename($tmp,$path)){@unlink($tmp);throw new RuntimeException('write failed');} }
function rateLimit(string $private,string $scope,int $limit): bool {
 $key=(string)file_get_contents($private.'/server-key'); $identity=hash_hmac('sha256',$scope.'|'.($_SERVER['REMOTE_ADDR']??'unknown'),$key);
 $path=$private.'/rate/'.$identity.'.json'; $file=fopen($path,'c+');if(!$file)return false;chmod($path,0600);flock($file,LOCK_EX);$state=json_decode(stream_get_contents($file),true);$now=time();if(!is_array($state)||($state['start']??0)<$now-900)$state=['start'=>$now,'count'=>0];$state['count']++;rewind($file);ftruncate($file,0);fwrite($file,json_encode($state));fflush($file);flock($file,LOCK_UN);fclose($file);return $state['count']<=$limit;
}
$user=null;$key=(string)($_SESSION['user']??'');
if(preg_match('/^[a-f0-9]{64}$/',$key)){
 $candidate=readRecord($private.'/users/'.$key.'.json');
 if($candidate && !($candidate['disabled']??false) && (int)($candidate['sessionVersion']??0)===(int)($_SESSION['version']??-1) && (int)($_SESSION['issued']??0)>time()-28800) $user=$candidate;
}
$action=(string)($_GET['action']??'');$method=$_SERVER['REQUEST_METHOD']??'GET';$error='';
if($action==='album'&&(!$user||($user['mustChangePassword']??true))){
 $place=(string)($_GET['place']??'');$day=max(0,min(30,(int)($_GET['day']??0)));
 $_SESSION['albumReturn']=['place'=>preg_match('/^[a-z0-9-]{1,120}$/D',$place)?$place:'','day'=>$day,'add'=>($_GET['add']??'')==='1'];
 header('Location: ./',true,303);exit;
}
if($action===''&&$user&&!($user['mustChangePassword']??true)&&isset($_SESSION['albumReturn'])){
 $next=$_SESSION['albumReturn'];unset($_SESSION['albumReturn']);header('Location: ?'.http_build_query(['action'=>'album','place'=>$next['place'],'day'=>$next['day'],'add'=>$next['add']?'1':'0']),true,303);exit;
}
if($action==='album'||str_starts_with($action,'album-')){require_once __DIR__.'/album-api.php';albumDispatch($private,$key,$user,$action,$method);}
if($method==='POST'){
 if(!csrfValid())jsonReply(['error'=>'יש לרענן את העמוד ולנסות שוב.'],403);
 if($action==='login'){
  if(!rateLimit($private,'login',12)){http_response_code(429);$error='בוצעו ניסיונות רבים. נסו שוב בעוד 15 דקות.';}
  else{
   $username=(string)($_POST['username']??'');$password=(string)($_POST['password']??'');$uk=userKey($username);$record=readRecord($private.'/users/'.$uk.'.json');
   // An equal-cost dummy prevents unknown-user timing disclosure.
   $dummy='$2y$12$abcdefghijklmnopqrstuu71ZWEb9if6Eph11XL7ITDUM4RSxhyJ9S';
   $valid=strlen($password)<=256 && password_verify($password,(string)($record['passwordHash']??$dummy));
   if($valid && $record && !($record['disabled']??false)){
    $albumReturn=$_SESSION['albumReturn']??null;session_regenerate_id(true);$_SESSION=['csrf'=>bin2hex(random_bytes(32)),'user'=>$uk,'version'=>(int)$record['sessionVersion'],'issued'=>time()];if(is_array($albumReturn))$_SESSION['albumReturn']=$albumReturn;header('Location: ./',true,303);exit;
   }
   $error='פרטי הכניסה אינם תקינים.';http_response_code(401);
  }
 }elseif($action==='logout'){
  $_SESSION=[];session_destroy();setcookie('wroc_personal_session','',['expires'=>time()-3600,'path'=>'/personal-trips/','secure'=>!$localTest,'httponly'=>true,'samesite'=>'Strict']);header('Location: ./',true,303);exit;
 }elseif($action==='password'){
  if(!$user)jsonReply(['error'=>'נדרשת כניסה.'],401);
  if(!rateLimit($private,'password',8))jsonReply(['error'=>'נסו שוב מאוחר יותר.'],429);
  $old=(string)($_POST['current']??'');$new=(string)($_POST['new']??'');
  if(strlen($old)>256||!password_verify($old,$user['passwordHash']))jsonReply(['error'=>'הסיסמה הזמנית אינה תואמת. בשדה הראשון יש להזין את הסיסמה שנשלחה במייל, ובשדה השני לבחור קוד חדש.'],400);
  if(!preg_match('/^[0-9]{4}$/D',$new))jsonReply(['error'=>'בחרו קוד אישי המורכב מארבע ספרות בדיוק.'],400);
  if(!hash_equals($new,(string)($_POST['confirm']??'')))jsonReply(['error'=>'שני הקודים החדשים אינם זהים. הזינו אותם שוב.'],400);
  $user['passwordHash']=password_hash($new,PASSWORD_DEFAULT);$user['mustChangePassword']=false;$user['sessionVersion']++;saveRecord($private.'/users/'.$key.'.json',$user);session_regenerate_id(true);$_SESSION['version']=$user['sessionVersion'];$_SESSION['csrf']=bin2hex(random_bytes(32));jsonReply(['ok'=>true,'csrf'=>$_SESSION['csrf']]);
 }else jsonReply(['error'=>'פעולה לא נתמכת.'],404);
}elseif($method!=='GET'){header('Allow: GET, POST');jsonReply(['error'=>'Method not allowed'],405);}
if($action==='route'){
 if(!$user)jsonReply(['error'=>'נדרשת כניסה.'],401);
 if($user['mustChangePassword']??true)jsonReply(['error'=>'יש להחליף את הסיסמה הזמנית לפני פתיחת המסלול.'],403);
 $reference=(string)$user['route'];if(!preg_match('/^WL-[A-Z0-9]{12}$/',$reference))jsonReply(['error'=>'המפה אינה זמינה.'],500);
 $route=readRecord($private.'/routes/'.$reference.'.json');if(!$route)jsonReply(['error'=>'המפה אינה זמינה.'],404);jsonReply($route);
}
header('Content-Type: text/html; charset=utf-8');
?><!doctype html><html lang="he" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="csrf-token" content="<?=h((string)$_SESSION['csrf'])?>"><title>המפה האישית שלך | WROC-LOVE</title><link rel="stylesheet" href="./app.css?v=<?=substr(hash_file('sha256',__DIR__.'/app.css'),0,12)?>"><link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin=""></head><body><header><a href="https://wroc-love.com/">WROC-LOVE</a><span>המפה האישית שלך</span><?php if($user):?><form method="post" action="?action=logout"><input type="hidden" name="csrf" value="<?=h((string)$_SESSION['csrf'])?>"><button>יציאה</button></form><?php endif;?></header><main>
<?php if(!$user):?><section class="login"><h1>ברוכים הבאים למפה האישית</h1><p>המסלול זמין רק לאחר כניסה. השתמשו בפרטים שנשלחו אליכם.</p><?php if($error):?><p role="alert"><?=h($error)?></p><?php endif;?><form method="post" action="?action=login"><input type="hidden" name="csrf" value="<?=h((string)$_SESSION['csrf'])?>"><label>שם משתמש<input name="username" type="text" autocomplete="username" autocapitalize="none" spellcheck="false" required maxlength="254" dir="ltr"></label><label>סיסמה<input name="password" type="password" autocomplete="current-password" required maxlength="256" dir="ltr"></label><button>כניסה למפה</button></form></section>
<?php elseif($user['mustChangePassword']??true):?><section class="login"><h1>בחרו סיסמה אישית</h1><p>בשדה הראשון הזינו את הסיסמה הזמנית מהמייל. לאחר מכן בחרו קוד אישי בן ארבע ספרות והקלידו אותו שוב לאישור.</p><form id="password-form"><label>סיסמה זמנית<input name="current" type="password" autocomplete="current-password" required dir="ltr"></label><label>קוד אישי חדש, ארבע ספרות<input name="new" type="password" autocomplete="new-password" inputmode="numeric" pattern="[0-9]{4}" minlength="4" maxlength="4" required dir="ltr"></label><label>אישור הקוד האישי<input name="confirm" type="password" autocomplete="new-password" inputmode="numeric" pattern="[0-9]{4}" minlength="4" maxlength="4" required dir="ltr"></label><button>שמירה ופתיחת המפה</button><p id="password-result" role="status"></p></form></section><script src="./app.js?v=<?=substr(hash_file('sha256',__DIR__.'/app.js'),0,12)?>" defer></script>
<?php else:?><section class="trip-hero"><div class="hero-overlay"><span class="kicker">WROC-LOVE · הטיול שלכם</span><h1 id="trip-title">טוענים את המסלול…</h1><p id="trip-description"></p><p class="hero-caption">שלושה ימים. העיר, הסיפורים והטעמים שבדרך.</p></div></section><details><summary>לפני שיוצאים לדרך</summary><ul id="assumptions"></ul></details><nav id="days" aria-label="בחירת יום"></nav><section class="day-banner"><span id="day-label" class="kicker"></span><h2 id="day-title"></h2><p id="day-intro"></p></section><div id="map" aria-label="מפת התחנות של היום"></div><p id="map-note"></p><button id="locate">הצגת המיקום שלי במפה</button><p id="location-status" role="status"></p><p class="album-entry"><a href="?action=album">האלבום והזיכרונות שלי מהטיול</a></p><h2 class="section-title">התחנות שלכם</h2><p class="section-subtitle">לחצו על תמונה או סיכה כדי לפתוח את הסיפור, התמונות והסרטונים של המקום.</p><section id="stops" aria-label="תחנות היום"></section><dialog id="place-dialog" aria-label="פרטי המקום"><button id="place-close" class="dialog-close" aria-label="סגירת פרטי המקום">סגירה ×</button><div id="place-content"></div></dialog><dialog id="photo-dialog" aria-label="תמונה מוגדלת"><button id="photo-close" class="dialog-close" aria-label="סגירת תמונה מוגדלת">סגירה ×</button><div class="photo-stage"><button id="photo-prev" aria-label="התמונה הקודמת">←</button><img id="large-photo" alt=""><button id="photo-next" aria-label="התמונה הבאה">→</button></div><p id="photo-count"></p></dialog><section id="food"></section><section><h2>אם מזג האוויר משתנה</h2><p id="weather"></p></section><details><summary>מקורות ושעות פעילות</summary><ul id="sources"></ul></details><p>המיקום שלכם משמש לתצוגה בדפדפן בלבד ואינו נשלח לשרת שלנו. המפה דורשת חיבור לרשת לטעינת אריחים ומדיה. אין הבטחת שימוש ללא רשת.</p><script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin="" defer></script><script src="./app.js?v=<?=substr(hash_file('sha256',__DIR__.'/app.js'),0,12)?>" defer></script><?php endif;?></main><footer>מסלול אישי. אין לשתף את פרטי הכניסה. שעות פעילות ותנאי כניסה עשויים להשתנות.</footer></body></html>
