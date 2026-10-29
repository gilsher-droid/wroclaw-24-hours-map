<?php
declare(strict_types=1);
ini_set('display_errors','0');
header('Content-Type: application/json; charset=utf-8');header('Cache-Control: no-store');header('X-Content-Type-Options: nosniff');
function nearby_reply(array $body,int $status=200): never {http_response_code($status);echo json_encode($body,JSON_UNESCAPED_UNICODE);exit;}
$private=dirname(__DIR__,2).'/nearby-chat-private';$file=$private.'/config.php';
// Fail closed before any provider/network request, including when a placeholder config exists.
$config=is_file($file)?require $file:[];
$ready=($config['enabled']??false)===true&&in_array($config['provider']??'', ['openai','gemini'],true)&&preg_match('/^[A-Za-z0-9._-]{1,100}$/',$config['model']??'')&&!empty($config['api_key'])&&strlen($config['rate_salt']??'')>=32;
$origin=$_SERVER['HTTP_ORIGIN']??'';$origins=$config['allowed_origins']??[];
if(in_array($origin,$origins,true)){header('Access-Control-Allow-Origin: '.$origin);header('Vary: Origin');}
$method=$_SERVER['REQUEST_METHOD']??'GET';
if($method==='OPTIONS'){if(!in_array($origin,$origins,true))nearby_reply(['code'=>'origin'],403);header('Access-Control-Allow-Methods: GET, POST, OPTIONS');header('Access-Control-Allow-Headers: Content-Type');http_response_code(204);exit;}
if($method==='GET')nearby_reply(['version'=>1,'ready'=>(bool)$ready]);
if($method!=='POST')nearby_reply(['code'=>'method'],405);
if(!$ready)nearby_reply(['version'=>1,'code'=>'not_connected'],503);
if(!in_array($origin,$origins,true))nearby_reply(['code'=>'origin'],403);
if(strtolower(trim(explode(';',$_SERVER['CONTENT_TYPE']??'')[0]))!=='application/json')nearby_reply(['code'=>'content_type'],415);
if((int)($_SERVER['CONTENT_LENGTH']??0)>24576)nearby_reply(['code'=>'size'],413);
$raw=file_get_contents('php://input',false,null,0,24577);if($raw===false||strlen($raw)>24576)nearby_reply(['code'=>'size'],413);
require __DIR__.'/contract.php';
try{$input=nearby_input(json_decode($raw,true,32,JSON_THROW_ON_ERROR));}catch(Throwable){nearby_reply(['code'=>'input'],422);}
// Pseudonymous rate counters only. No coordinates, prompt, output, names or raw IP saved.
try{
 umask(0077);if(!is_dir($private))throw new RuntimeException('private');$lock=fopen($private.'/usage.lock','c');if(!$lock||!flock($lock,LOCK_EX))throw new RuntimeException('lock');
 $now=time();$day=gmdate('Y-m-d');$path=$private.'/usage.json';$usage=is_file($path)?json_decode((string)file_get_contents($path),true):[];
 if(!is_array($usage)||($usage['day']??'')!==$day)$usage=['day'=>$day,'count'=>0,'clients'=>[]];
 foreach($usage['clients'] as $k=>$times){$usage['clients'][$k]=array_values(array_filter($times,fn($t)=>$t>$now-3600));if(!$usage['clients'][$k])unset($usage['clients'][$k]);}
 $key=hash_hmac('sha256',$_SERVER['REMOTE_ADDR']??'unknown',$config['rate_salt']);$times=$usage['clients'][$key]??[];
 if($usage['count']>=max(1,min(10000,(int)($config['requests_per_day']??100)))||count($times)>=max(1,min(120,(int)($config['per_client_per_hour']??12))))nearby_reply(['code'=>'rate_limit'],429);
 $usage['count']++;$usage['clients'][$key][]=$now;if(file_put_contents($path,json_encode($usage),LOCK_EX)===false)throw new RuntimeException('usage');flock($lock,LOCK_UN);fclose($lock);
}catch(Throwable){nearby_reply(['code'=>'not_connected'],503);}
$provider=$config['provider'];$model=$config['model'];$tokens=max(128,min(1000,(int)($config['max_output_tokens']??500)));
$url=$provider==='openai'?'https://api.openai.com/v1/responses':'https://generativelanguage.googleapis.com/v1beta/models/'.rawurlencode($model).':generateContent';
$headers=['Content-Type: application/json'];$headers[]=$provider==='openai'?'Authorization: Bearer '.$config['api_key']:'x-goog-api-key: '.$config['api_key'];
try{
 $ch=curl_init($url);curl_setopt_array($ch,[CURLOPT_POST=>true,CURLOPT_HTTPHEADER=>$headers,CURLOPT_POSTFIELDS=>json_encode(nearby_provider_body($provider,$model,$input,$tokens),JSON_UNESCAPED_UNICODE|JSON_THROW_ON_ERROR),CURLOPT_RETURNTRANSFER=>true,CURLOPT_CONNECTTIMEOUT=>5,CURLOPT_TIMEOUT=>18,CURLOPT_FOLLOWLOCATION=>false]);
 $output=curl_exec($ch);$status=curl_getinfo($ch,CURLINFO_HTTP_CODE);curl_close($ch);if(!is_string($output)||strlen($output)>131072||$status!==200)throw new RuntimeException('provider');
 $decoded=json_decode($output,true,32,JSON_THROW_ON_ERROR);$text='';
 if($provider==='openai'){foreach($decoded['output']??[] as $item)foreach($item['content']??[] as $part)if(($part['type']??'')==='output_text')$text.=$part['text']??'';}else{foreach($decoded['candidates'][0]['content']['parts']??[] as $part)$text.=$part['text']??'';}
 $intent=nearby_validate_intent(json_decode($text,true,16,JSON_THROW_ON_ERROR),$input);
 nearby_reply(['version'=>1,'intent'=>$intent]);
}catch(Throwable){nearby_reply(['code'=>'provider_unavailable'],502);}
