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
 if(function_exists('approvalMapAllowed')&&!approvalMapAllowed($private,$customer,$record))return null;
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
 $usage=null;$activation=null;$usageReady=true;try{$usage=new PersonalMapUsage($private);$activation=$usage->activation();}catch(Throwable){$usageReady=false;}
 ?><!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="csrf-token" content="<?=h((string)$_SESSION['csrf'])?>"><title>Personal maps | WROC-LOVE</title><link rel="stylesheet" href="./app.css"></head><body><header><a href="https://wroc-love.com/">WROC-LOVE</a><span>Personal maps</span><a href="/owner-dashboard/">Owner dashboard</a><form method="post" action="?action=logout"><input type="hidden" name="csrf" value="<?=h((string)$_SESSION['csrf'])?>"><button>Sign out</button></form></header><main><h1>All personal maps</h1><p>Open any customer map and album with your owner access. Access and delivery actions are recorded.</p><p><a class="action-link" href="?action=community&amp;view=review">Traveller content submissions</a></p><p><a class="action-link" href="?action=requests">Review personal map requests</a></p><section aria-labelledby="usage-heading"><h2 id="usage-heading">Personal map usage</h2><p>Counts start when measurement is activated. A visible map must load successfully after sign-in and map authorization. Openings of the same account and map within 30 minutes are combined, including technical reloads. Owner openings and selected demo/test maps are separate. These counts are not unique people and do not prove that a trip took place. No historical use is inferred.</p><?php if(!$usageReady):?><p role="status">Usage measurement unavailable.</p><?php elseif($activation):?><p>Measurement started: <?=h(gmdate('Y-m-d H:i:s',$activation['startedAt']).' UTC')?></p><?php else:?><form method="post" action="?action=usage-activate" id="usage-setup"><input type="hidden" name="csrf" value="<?=h((string)$_SESSION['csrf'])?>"><p>Select any demonstration or test maps below before starting. Existing customer maps remain included.</p><button>Start measuring map openings</button></form><?php endif;?></section><section class="owner-map-grid"><?php
 foreach(glob($private.'/users/*.json')?:[] as $path){
  $customer=basename($path,'.json');$entry=ownerCustomer($private,$customer);if(!$entry)continue;
  $route=$entry['route'];$url='?action=album&customer='.$customer;
  $summary=null;if($usageReady)try{$summary=$usage->summary($customer,(string)$entry['record']['route']);}catch(Throwable){}
  ?><article class="owner-map-card"><h2><?=h((string)($route['title']??'מפה אישית'))?></h2><p><?=h((string)($route['dates']??''))?></p><p dir="ltr"><?=h((string)$entry['record']['route'])?></p><?php personalUsageHtml($summary);if($usageReady&&$activation===null):?><label><input form="usage-setup" type="checkbox" name="excluded[]" value="<?=h($customer)?>"> Demo / test map. Exclude from customer counts.</label><?php endif;?><a class="action-link" href="<?=h($url)?>">Open map and album</a><a class="action-link" href="?action=owner-access&amp;customer=<?=h($customer)?>">Reset access &amp; resend</a></article><?php
 }
 ?></section></main></body></html><?php exit;
}
