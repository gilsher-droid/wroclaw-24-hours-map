<?php
declare(strict_types=1);
// Roles can only be provisioned in protected server records, never by a request.
function isOwnerAdmin(?array $user): bool {
 return $user !== null && ($user['role'] ?? '') === 'owner-admin';
}
function ownerCustomer(string $private,string $customer): ?array {
 if(!preg_match('/^[a-f0-9]{64}$/D',$customer))return null;
 $record=readRecord($private.'/users/'.$customer.'.json');
 if(!$record || isOwnerAdmin($record))return null;
 $ref=(string)($record['route']??'');
 if(!preg_match('/^WL-[A-Z0-9]{12}$/D',$ref))return null;
 $route=readRecord($private.'/routes/'.$ref.'.json');
 if(!$route || !is_array($route['places']??null) || !is_array($route['days']??null))return null;
 return ['record'=>$record,'route'=>$route];
}
function ownerAudit(string $private,string $actor,string $customer,string $action): void {
 $file=fopen($private.'/owner-access.jsonl','ab');
 if(!$file)jsonReply(['error'=>'audit unavailable'],503);
 chmod($private.'/owner-access.jsonl',0600);
 $line=json_encode(['at'=>gmdate('c'),'actor'=>$actor,'customer'=>$customer,'action'=>$action],JSON_THROW_ON_ERROR)."\n";
 try{if(!flock($file,LOCK_EX)||fwrite($file,$line)!==strlen($line)||!fflush($file))jsonReply(['error'=>'audit unavailable'],503);}finally{fclose($file);}
}
function ownerDashboard(string $private): never {
 header('Content-Type: text/html; charset=utf-8');
 ?><!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="csrf-token" content="<?=h((string)$_SESSION['csrf'])?>"><title>Personal maps | WROC-LOVE</title><link rel="stylesheet" href="./app.css"></head><body><header><a href="https://wroc-love.com/">WROC-LOVE</a><span>Personal maps</span><a href="/owner-dashboard/">Owner dashboard</a><form method="post" action="?action=logout"><input type="hidden" name="csrf" value="<?=h((string)$_SESSION['csrf'])?>"><button>Sign out</button></form></header><main><h1>All personal maps</h1><p>Open any customer map and album with your owner access. Access and delivery actions are recorded.</p><p><a class="action-link" href="?action=community&amp;view=review">Traveller content submissions</a></p><section class="owner-map-grid"><?php
 foreach(glob($private.'/users/*.json')?:[] as $path){
  $customer=basename($path,'.json');$entry=ownerCustomer($private,$customer);if(!$entry)continue;
  $route=$entry['route'];$url='?action=album&customer='.$customer;
  ?><article class="owner-map-card"><h2><?=h((string)($route['title']??'מפה אישית'))?></h2><p><?=h((string)($route['dates']??''))?></p><p dir="ltr"><?=h((string)$entry['record']['route'])?></p><a class="action-link" href="<?=h($url)?>">Open map and album</a><a class="action-link" href="?action=owner-access&amp;customer=<?=h($customer)?>">Reset access &amp; resend</a></article><?php
 }
 ?></section></main></body></html><?php exit;
}
