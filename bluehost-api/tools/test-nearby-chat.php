<?php
declare(strict_types=1);
require __DIR__.'/../public/nearby-chat/contract.php';
function check(bool $condition,string $name): void {if(!$condition)throw new RuntimeException($name);echo 'PASS '.$name.PHP_EOL;}
function rejects(callable $f,string $name): void {try{$f();}catch(Throwable){check(true,$name);return;}throw new RuntimeException('accepted '.$name);}
$context=['version'=>1,'message'=>'Show photos of second place','language'=>'en','filters'=>['category'=>'eat','venueType'=>'all','cuisine'=>'all','dietary'=>'all','radius'=>500,'sort'=>'distance'],'selected'=>null,'results'=>[['id'=>'one','name'=>'One','metres'=>2],['id'=>'two','name'=>'Two','metres'=>10]]];
check(nearby_input($context)===$context,'minimal input accepted');
rejects(fn()=>nearby_input([...$context,'coordinates'=>['lat'=>51,'lng'=>17]]),'coordinates refused');
rejects(fn()=>nearby_input([...$context,'results'=>[['id'=>'one','name'=>'One','metres'=>2,'privateNotes'=>'secret']]]),'private fields refused');
$intent=['action'=>'photos','category'=>null,'venueType'=>null,'cuisine'=>null,'dietary'=>null,'sort'=>null,'centreChange'=>'keep','radius'=>null,'reference'=>['kind'=>'index','index'=>2,'id'=>null],'unsupported'=>[]];
check(nearby_validate_intent($intent,$context)===$intent,'follow-up reference resolved');
rejects(fn()=>nearby_validate_intent([...$intent,'reference'=>['kind'=>'id','id'=>'invented','index'=>null]],$context),'invented id refused');
rejects(fn()=>nearby_validate_intent([...$intent,'radius'=>10000],$context),'excessive radius refused');
rejects(fn()=>nearby_validate_intent([...$intent,'description'=>'invented'], $context),'free provider prose refused');
foreach(['openai','gemini'] as $provider){$body=nearby_provider_body($provider,'review-only-model',$context,500);check(!str_contains(json_encode($body),'coordinates'),'no location in '.$provider.' payload');check(str_contains(json_encode($body),'nearby')||isset($body['generationConfig']),'structured output '.$provider);}
check((require __DIR__.'/../nearby-chat-config.example.php')['enabled']===false,'configuration disabled by default');
