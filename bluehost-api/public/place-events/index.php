<?php
declare(strict_types=1);
ini_set('display_errors','0');
header('Cache-Control: no-store');header('X-Content-Type-Options: nosniff');
$origin=$_SERVER['HTTP_ORIGIN']??'';
if(!in_array($origin,['https://wroc-love.com','https://www.wroc-love.com'],true)) {http_response_code(403);exit;}
header('Access-Control-Allow-Origin: '.$origin);header('Vary: Origin');
if(($_SERVER['REQUEST_METHOD']??'')!=='POST') {http_response_code(405);header('Allow: POST');exit;}
if((int)($_SERVER['CONTENT_LENGTH']??0)>16000) {http_response_code(413);exit;}
$raw=file_get_contents('php://input',false,null,0,16001);
if(strlen($raw)>16000) {http_response_code(413);exit;}
$body=json_decode($raw,true);
if(!is_array($body)||($body['version']??null)!==1||($body['consent']??null)!==true||!is_array($body['events']??null)||count($body['events'])<1||count($body['events'])>20) {http_response_code(400);exit;}
try {
    require dirname(__DIR__,2).'/place-analytics.php';
    $catalog=json_decode(file_get_contents(__DIR__.'/catalog.json'),true,512,JSON_THROW_ON_ERROR);
    $rows=[];foreach($body['events'] as $event) {if(!is_array($event)||!($row=place_analytics_clean($event,$catalog))) {http_response_code(400);exit;}$rows[]=$row;}
    place_analytics_write($rows,($body['test']??false)===true);
    http_response_code(204);
} catch(Throwable $e) {http_response_code(503);}
