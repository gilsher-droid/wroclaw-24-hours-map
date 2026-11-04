<?php
declare(strict_types=1);
// Included only after the existing owner-session controller authenticates the request.
if(empty($_SESSION['owner'])) {http_response_code(401);header('Content-Type: application/json');echo '{"error":"Sign in required"}';exit;}
header('Content-Type: application/json; charset=utf-8');header('Cache-Control: private, no-store');
if(($_SERVER['REQUEST_METHOD']??'GET')!=='GET') {http_response_code(405);exit;}
$days=filter_var($_GET['days']??7,FILTER_VALIDATE_INT);
if(!in_array($days,[1,7,28,90],true)) {http_response_code(400);echo '{"error":"Invalid period"}';exit;}
try {require dirname(__DIR__,2).'/place-analytics.php';$report=place_analytics_report($days,null,($_GET['test']??'')==='1');$catalog=json_decode(file_get_contents(dirname(__DIR__).'/place-events/catalog.json'),true,512,JSON_THROW_ON_ERROR);$report['labels']=$catalog['places'];echo json_encode($report,JSON_THROW_ON_ERROR);} catch(Throwable $e) {http_response_code(503);echo '{"error":"Report temporarily unavailable"}';}
