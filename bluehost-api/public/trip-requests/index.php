<?php
declare(strict_types=1);

// Recipients and the queue live outside the public document root.
ini_set('display_errors', '0');
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowed = ['https://wroc-love.com', 'https://www.wroc-love.com'];
if (in_array($origin, $allowed, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Vary: Origin');
}
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
function reply(array $value, int $status = 200): never {
    http_response_code($status); echo json_encode($value, JSON_UNESCAPED_UNICODE); exit;
}
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
if ($method === 'OPTIONS') { if (!in_array($origin, $allowed, true)) reply(['accepted'=>false],403); http_response_code(204); exit; }
$private = dirname(__DIR__, 2) . '/trip-requests-private';
$configPath = $private . '/config.php';
if (!is_file($configPath)) reply(['accepted'=>false,'code'=>'unavailable'],503);
$config = require $configPath;
if (!is_array($config) || empty($config['recipients']) || count($config['recipients']) !== 2 || empty($config['rateSalt'])) reply(['accepted'=>false,'code'=>'unavailable'],503);
foreach($config['recipients'] as $recipient) if(!is_string($recipient)||!filter_var($recipient,FILTER_VALIDATE_EMAIL)||strpbrk($recipient,"\r\n")!==false)reply(['accepted'=>false,'code'=>'unavailable'],503);
if ($method === 'GET') reply(['ready'=>true,'version'=>1]);
if ($method !== 'POST') reply(['accepted'=>false],405);
if (!in_array($origin, $allowed, true)) reply(['accepted'=>false],403);
if (strtolower(trim(explode(';', $_SERVER['CONTENT_TYPE'] ?? '')[0])) !== 'application/json') reply(['accepted'=>false],415);
if ((int)($_SERVER['CONTENT_LENGTH'] ?? 0) > 16384) reply(['accepted'=>false],413);
$raw = file_get_contents('php://input', false, null, 0, 16385);
if ($raw === false || strlen($raw)>16384) reply(['accepted'=>false],413);
$input = json_decode($raw, true);
if (!is_array($input)) reply(['accepted'=>false],422);
function value(array $input, string $key, int $max): string {
    $v=$input[$key]??'';
    if (!is_string($v) || strlen($v)>$max || preg_match('/[\x00-\x08\x0B\x0C\x0E-\x1F]/',$v)) reply(['accepted'=>false],422);
    return trim($v);
}
function number(array $input, string $key, int $min, int $max): int {
    $v=filter_var($input[$key]??null,FILTER_VALIDATE_INT);
    if ($v===false || $v===null || $v<$min || $v>$max) reply(['accepted'=>false],422);
    return $v;
}
$id=value($input,'requestId',36);
if (!preg_match('/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i',$id)) reply(['accepted'=>false],422);
$language=value($input,'language',2);
if (!in_array($language,['he','en','pl','de','cs'],true) || ($input['consent']??false)!==true || value($input,'website',200)!=='') reply(['accepted'=>false],422);
$name=value($input,'name',240);$email=value($input,'email',180);
if ($name==='' || !filter_var($email,FILTER_VALIDATE_EMAIL) || strpbrk($email,"\r\n")!==false) reply(['accepted'=>false],422);
$arrival=value($input,'arrival',10);
if ($arrival!=='' && (!preg_match('/^\d{4}-\d{2}-\d{2}$/',$arrival) || !checkdate((int)substr($arrival,5,2),(int)substr($arrival,8,2),(int)substr($arrival,0,4)))) reply(['accepted'=>false],422);
$interests=$input['interests']??[];
if (!is_array($interests) || count($interests)>6) reply(['accepted'=>false],422);
foreach($interests as $interest)if(!is_string($interest)||!in_array($interest,['culture','foodInterest','nature','architecture','shopping','daytrip'],true))reply(['accepted'=>false],422);
$transport=value($input,'transport',10);$pace=value($input,'pace',10);$budget=value($input,'budget',10);
if (!in_array($transport,['walk','car','mixed'],true) || !in_array($pace,['relaxed','balanced','full'],true) || !in_array($budget,['flexible','economy','mid','high'],true)) reply(['accepted'=>false],422);
$details=['name'=>$name,'email'=>$email,'language'=>$language,'arrival'=>$arrival,'days'=>number($input,'days',1,30),'adults'=>number($input,'adults',1,20),'children'=>number($input,'children',0,20),'base'=>value($input,'base',400),'transport'=>$transport,'pace'=>$pace,'budget'=>$budget,'interests'=>array_values(array_unique($interests)),'preferences'=>value($input,'preferences',4800),'notes'=>value($input,'notes',6400),'consent'=>true,'consentVersion'=>'2026-10-17'];
try {
    umask(0077);
    $queue=$private.'/requests';if (!is_dir($queue) && !mkdir($queue,0700,true)) throw new RuntimeException('queue');
    $lock=fopen($private.'/submit.lock','c');if (!$lock || !flock($lock,LOCK_EX)) throw new RuntimeException('lock');
    $file=$queue.'/'.strtolower($id).'.json';$fingerprint=hash('sha256',json_encode($details,JSON_UNESCAPED_UNICODE));
    if (is_file($file)) {
        $existing=json_decode((string)file_get_contents($file),true);
        if (!is_array($existing) || ($existing['fingerprint']??'')!==$fingerprint) reply(['accepted'=>false],409);
        reply(['accepted'=>true,'reference'=>$existing['reference']]);
    }
    $ratePath=$private.'/rate.json';$now=time();$rate=is_file($ratePath)?json_decode((string)file_get_contents($ratePath),true):[];
    if (!is_array($rate)) $rate=[];
    foreach($rate as $key=>$times){$rate[$key]=array_values(array_filter((array)$times,fn($t)=>is_int($t)&&$t>$now-3600));if(!$rate[$key])unset($rate[$key]);}
    $rateKey=hash_hmac('sha256',(string)($_SERVER['REMOTE_ADDR']??'unknown'),(string)$config['rateSalt']);
    $times=$rate[$rateKey]??[];
    if(count($times)>=5 || ($times && max($times)>$now-30)) reply(['accepted'=>false,'code'=>'rateLimit'],429);
    $rate[$rateKey][]=$now;if(file_put_contents($ratePath,json_encode($rate),LOCK_EX)===false)throw new RuntimeException('rate');
    $reference='WL-'.strtoupper(bin2hex(random_bytes(6)));
    $record=['reference'=>$reference,'createdAt'=>gmdate('c'),'status'=>'received','fingerprint'=>$fingerprint,'details'=>$details,'notifications'=>[]];
    if (file_put_contents($file,json_encode($record,JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT),LOCK_EX)===false)throw new RuntimeException('save');
    $body="New personal-trip quote request. No payment or booking has been made.\nReference: ".$reference."\n\n".json_encode($details,JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT);
    $headers=['From: WROC-LOVE <requests@wroc-love.com>','Reply-To: '.$email,'MIME-Version: 1.0','Content-Type: text/plain; charset=UTF-8'];
    foreach($config['recipients'] as $i=>$recipient){
        if (!is_string($recipient) || !filter_var($recipient,FILTER_VALIDATE_EMAIL) || strpbrk($recipient,"\r\n")!==false) throw new RuntimeException('config');
        $record['notifications'][(string)$i]=mail($recipient,'WROC-LOVE personal trip '.$reference,$body,implode("\r\n",$headers));
    }
    $record['notificationState']=count(array_filter($record['notifications']))===2?'accepted-by-mail-server':'needs-owner-review';
    file_put_contents($file,json_encode($record,JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT),LOCK_EX);
    // A receipt proves durable private storage. Mail delivery is tracked separately.
    reply(['accepted'=>true,'reference'=>$reference],201);
} catch(Throwable $error) { error_log('wroc-personal-trip: request storage unavailable'); reply(['accepted'=>false,'code'=>'unavailable'],503); }
