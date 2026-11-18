<?php
declare(strict_types=1);
// Trusted approvals live beside the private intake queue, never in visitor input.
function approvalDir(string $private): string {return dirname($private).'/trip-requests-private';}
function approvalRead(string $path): ?array {$v=is_file($path)?json_decode((string)file_get_contents($path),true):null;return is_array($v)?$v:null;}
function approvalSave(string $path,array $record): void {
 $tmp=tempnam(dirname($path),'.approval-');if($tmp===false)throw new RuntimeException('Storage unavailable');
 try{chmod($tmp,0600);if(file_put_contents($tmp,json_encode($record,JSON_THROW_ON_ERROR|JSON_UNESCAPED_UNICODE))===false||!rename($tmp,$path))throw new RuntimeException('Storage unavailable');}finally{if(is_file($tmp))unlink($tmp);}
}
function approvalLocked(string $private,callable $fn): mixed {
 $dir=approvalDir($private);if(!is_dir($dir))throw new RuntimeException('Request queue unavailable');
 $f=fopen($dir.'/submit.lock','c');if(!$f)throw new RuntimeException('Request queue unavailable');chmod($dir.'/submit.lock',0600);
 try{if(!flock($f,LOCK_EX))throw new RuntimeException('Request queue unavailable');return $fn();}finally{flock($f,LOCK_UN);fclose($f);}
}
function approvalFind(string $private,string $ref): ?array {
 if(!preg_match('/^WL-[A-Z0-9]{12}$/D',$ref))return null;
 foreach(glob(approvalDir($private).'/requests/*.json')?:[] as $path){$r=approvalRead($path);if(($r['reference']??null)===$ref)return ['path'=>$path,'record'=>$r];}return null;
}
function approvalGranted(array $r): bool {
 $a=$r['approval']??null;
 return is_array($a)&&($a['decision']??'')==='approved'&&preg_match('/^[a-f0-9]{64}$/D',(string)($a['actor']??''))&&is_string($a['at']??null)&&in_array($a['method']??'',['owner-dashboard','direct-owner-instruction'],true)&&($a['scope']??[])===['production','access','delivery'];
}
function approvalMapAllowed(string $private,string $customer,array $user): bool {
 if(($user['role']??'')==='owner-admin')return true;
 $ref=(string)($user['route']??'');$policy=approvalRead(approvalDir($private).'/approval-policy.json');
 // Explicit deployment baseline preserves maps already installed before this gate.
 if($policy&&isset($policy['legacyBindings'][$customer])&&hash_equals((string)$policy['legacyBindings'][$customer],$ref))return true;
 $found=approvalFind($private,$ref);
 if(!$policy&&!is_file(approvalDir($private).'/approval-policy.json')&&!is_file(approvalDir($private).'/approval-active')&&!($found['record']['approvalRequired']??false))return true; // staged install only
 $r=$found['record']??[];
 return approvalGranted($r)&&($r['provision']['state']??'')==='ready'&&hash_equals((string)($r['provision']['customer']??''),$customer);
}
function approvalRequireMap(string $private,string $customer,array $record): void {
 if(!approvalMapAllowed($private,$customer,$record))jsonReply(['error'=>'Owner approval and authorized map preparation are required.','code'=>'owner_approval_required'],403);
}
function approvalActivate(string $private): array {
 return approvalLocked($private,function()use($private){
  $path=approvalDir($private).'/approval-policy.json';$old=approvalRead($path);if($old)return $old;
  if(is_file($path)||is_file(approvalDir($private).'/approval-active'))throw new RuntimeException('Existing policy cannot be reinitialized');
  $bindings=[];foreach(glob($private.'/users/*.json')?:[] as $path){$u=approvalRead($path);$key=basename($path,'.json');$ref=(string)($u['route']??'');
   if(($u['role']??'')!=='owner-admin'&&preg_match('/^[a-f0-9]{64}$/D',$key)&&preg_match('/^WL-[A-Z0-9]{12}$/D',$ref)&&is_file($private.'/routes/'.$ref.'.json'))$bindings[$key]=$ref;
  }
  $p=['version'=>1,'activatedAt'=>gmdate('c'),'legacyBindings'=>$bindings];approvalSave(approvalDir($private).'/approval-policy.json',$p);approvalSave(approvalDir($private).'/approval-active',['version'=>1,'activatedAt'=>$p['activatedAt']]);return $p;
 });
}
function approvalDecide(string $private,string $ref,string $actor,string $decision,string $method='owner-dashboard',string $evidence=''): array {
 if(!preg_match('/^[a-f0-9]{64}$/D',$actor)||!in_array($decision,['approved','rejected'],true)||!in_array($method,['owner-dashboard','direct-owner-instruction'],true))throw new InvalidArgumentException('Invalid decision');
 if($method==='direct-owner-instruction'&&(!preg_match('/^[A-Za-z0-9._:\/-]{8,240}$/D',$evidence)||$decision!=='approved'))throw new InvalidArgumentException('Record the specific owner instruction reference');
 return approvalLocked($private,function()use($private,$ref,$actor,$decision,$method,$evidence){
  $found=approvalFind($private,$ref);if(!$found)throw new InvalidArgumentException('Request not found');$r=$found['record'];
  if(isset($r['approval'])){if(($r['approval']['decision']??'')===$decision)return $r;throw new InvalidArgumentException('This request already has a decision.');}
  $r['approvalRequired']=true;$r['source']=$r['source']??'website';$r['approval']=['decision'=>$decision,'actor'=>$actor,'at'=>gmdate('c'),'method'=>$method,'evidence'=>$evidence,'scope'=>$decision==='approved'?['production','access','delivery']:[]];
  $r['status']=$decision==='approved'?'approved':'rejected';approvalSave($found['path'],$r);return $r;
 });
}
function approvalStart(string $private,string $ref,string $actor): array {
 return approvalLocked($private,function()use($private,$ref,$actor){
  $found=approvalFind($private,$ref);$r=$found['record']??[];if(!approvalGranted($r))throw new InvalidArgumentException('Owner approval required before production');
  if(!isset($r['production'])){$r['production']=['id'=>bin2hex(random_bytes(16)),'actor'=>$actor,'at'=>gmdate('c')];$r['status']='preparing';approvalSave($found['path'],$r);}return $r;
 });
}
