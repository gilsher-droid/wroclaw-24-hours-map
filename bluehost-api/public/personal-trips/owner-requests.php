<?php
declare(strict_types=1);
require_once __DIR__.'/request-approval.php';
function approvalProvision(string $private,string $ref,string $actor,array $input): array {
 $name=strtolower(trim((string)($input['username']??'')));$route=json_decode((string)($input['route']??''),true);
 if(!preg_match('/^[a-z0-9][a-z0-9._@+\-]{1,253}$/D',$name)||!is_array($route)||!is_array($route['days']??null)||!is_array($route['places']??null)||count($route['days'])>30||count($route['places'])>500||strlen(json_encode($route))>2000000)throw new InvalidArgumentException('Provide a valid username and reviewed map JSON.');
 $customer=userKey($name);$digest=hash('sha256',json_encode([$customer,$route],JSON_THROW_ON_ERROR));
 return approvalLocked($private,function()use($private,$ref,$actor,$route,$customer,$digest){
  $found=approvalFind($private,$ref);$r=$found['record']??[];if(!approvalGranted($r)||!isset($r['production']))throw new InvalidArgumentException('Approve and start this request before preparing access.');
  $lang=$r['details']['language']??'';if(!in_array($lang,['en','he','pl','de','cs'],true))throw new InvalidArgumentException('Original request language required.');
  $prior=$r['provision']??null;
  if($prior&&(($prior['customer']??'')!==$customer||($prior['digest']??'')!==$digest))throw new InvalidArgumentException('This request is already assigned to a different map or customer.');
  if(($prior['state']??'')==='ready')return $r;
  $userPath=$private.'/users/'.$customer.'.json';$routePath=$private.'/routes/'.$ref.'.json';
  $u=approvalRead($userPath);$saved=approvalRead($routePath);
  if(($u&&($u['approvalRequest']??'')!==$ref)||($saved&&($saved['_ownerApprovalReference']??'')!==$ref))throw new InvalidArgumentException('An existing map or account cannot be replaced.');
  $r['provision']=['state'=>'prepared','customer'=>$customer,'digest'=>$digest,'actor'=>$actor,'at'=>gmdate('c')];approvalSave($found['path'],$r);
  $map=$route;$map['_ownerApprovalReference']=$ref;
  if(!$saved)approvalSave($routePath,$map);
  if(!$u)approvalSave($userPath,['passwordHash'=>password_hash(bin2hex(random_bytes(32)),PASSWORD_DEFAULT),'mustChangePassword'=>true,'temporaryCodeExpiresAt'=>0,'sessionVersion'=>0,'route'=>$ref,'language'=>$lang,'approvalRequest'=>$ref]);
  $r['provision']['state']='ready';$r['status']='map-ready';approvalSave($found['path'],$r);return $r;
 });
}
function approvalDispatch(string $private,string $actor,?array $user,string $action,string $method): never {
 if(!isOwnerAdmin($user)||($user['mustChangePassword']??true))jsonReply(['error'=>'Owner access required'],403);
 try {
  if($action==='requests'&&$method==='GET')approvalPage($private);
  if($method!=='POST')jsonReply(['error'=>'POST required'],405);
  if(!csrfValid())jsonReply(['error'=>'Refresh the page and try again'],403);
  if(!rateLimit($private,'owner-request-actions',60))jsonReply(['error'=>'Too many actions'],429);
  $ref=(string)($_POST['reference']??'');
  if($action==='request-verify'){
   require_once __DIR__.'/approval-selftest.php';jsonReply(approvalSelftest($private));
  }elseif($action==='request-activate'){
   $policy=approvalActivate($private);jsonReply(['ok'=>true,'active'=>true,'legacyBindings'=>count($policy['legacyBindings'])]);
  }elseif($action==='request-direct-create'){
   $evidence=trim((string)($_POST['evidence']??''));$name=trim((string)($_POST['name']??''));$language=(string)($_POST['language']??'');
   if(!preg_match('/^[A-Za-z0-9._:\\/-]{8,240}$/D',$evidence)||$name===''||strlen($name)>240||!in_array($language,['he','en','pl','de','cs'],true))throw new InvalidArgumentException('Specific instruction reference, customer name and original language required.');
   $ref=approvalLocked($private,function()use($private,$actor,$evidence,$name,$language){
    $path=approvalDir($private).'/requests/owner-'.hash('sha256',$actor.'|'.$evidence).'.json';$old=approvalRead($path);
    if($old){if(($old['details']['name']??'')!==$name||($old['details']['language']??'')!==$language)throw new InvalidArgumentException('Instruction already assigned to another case.');return $old['reference'];}
    $ref='WL-'.strtoupper(bin2hex(random_bytes(6)));approvalSave($path,['reference'=>$ref,'createdAt'=>gmdate('c'),'source'=>'direct-owner-instruction','status'=>'pending-owner-approval','approvalRequired'=>true,'details'=>['name'=>$name,'language'=>$language]]);return $ref;
   });
   $r=approvalDecide($private,$ref,$actor,'approved','direct-owner-instruction',$evidence);
  }elseif($action==='request-decision'){
   $r=approvalDecide($private,$ref,$actor,(string)($_POST['decision']??''));
  }elseif($action==='request-direct-approve'){
   // The authenticated owner/operator records an already-given case-specific instruction.
   // No second dashboard confirmation is needed. Public intake cannot reach this path.
   $r=approvalDecide($private,$ref,$actor,'approved','direct-owner-instruction',trim((string)($_POST['evidence']??'')));
  }elseif($action==='request-start'){$r=approvalStart($private,$ref,$actor);
  }elseif($action==='request-provision'){$r=approvalProvision($private,$ref,$actor,$_POST);
  }elseif($action==='request-delivery-release'){
   $r=approvalLocked($private,function()use($private,$ref,$actor){
    $found=approvalFind($private,$ref);$r=$found['record']??[];
    if(!approvalGranted($r)||($r['provision']['state']??'')!=='ready')throw new InvalidArgumentException('Approved map and customer access are required.');
    $customer=$r['provision']['customer'];$u=readRecord($private.'/users/'.$customer.'.json');
    if(!$u||!approvalMapAllowed($private,$customer,$u))throw new InvalidArgumentException('Customer access is unavailable.');
    if(!isset($r['deliveryRelease'])){$r['deliveryRelease']=['actor'=>$actor,'at'=>gmdate('c')];approvalSave($found['path'],$r);}return $r;
   });
  }else jsonReply(['error'=>'Not found'],404);
  if(($_POST['format']??'')==='json')jsonReply(['ok'=>true,'reference'=>$r['reference'],'status'=>$r['status'],'productionId'=>$r['production']['id']??null,'customer'=>$r['provision']['customer']??null]);
  header('Location: ?action=requests&saved='.rawurlencode($r['reference']),true,303);exit;
 }catch(InvalidArgumentException $e){jsonReply(['error'=>$e->getMessage()],409);}catch(Throwable $e){error_log('wroc-request-approval: storage operation failed');jsonReply(['error'=>'Could not save. No production or delivery is authorized by this failure.'],503);}
}
function approvalPage(string $private): never {
 $rows=[];foreach(glob(approvalDir($private).'/requests/*.json')?:[] as $p){$r=approvalRead($p);if($r)$rows[]=$r;}
 usort($rows,fn($a,$b)=>strcmp($b['createdAt']??'',$a['createdAt']??''));
 header('Content-Type: text/html; charset=utf-8');
 ?><!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Map requests | WROC-LOVE</title><link rel="stylesheet" href="./app.css"><link rel="stylesheet" href="./request-approval.css"><script src="./request-feedback.js" defer></script></head><body><header><a href="?action=admin">Back to personal maps</a><a href="/owner-dashboard/">Owner dashboard</a></header><main><h1>Personal map requests</h1><?php if(!approvalRead(approvalDir($private).'/approval-policy.json')):?><form method="post" action="?action=request-activate"><input type="hidden" name="csrf" value="<?=h($_SESSION['csrf'])?>"><button>Activate approval gate and preserve existing maps</button><p role="status"></p></form><?php else:?><p>Owner approval gate active. Previously installed customer access is preserved.</p><form method="post" action="?action=request-verify"><input type="hidden" name="csrf" value="<?=h($_SESSION['csrf'])?>"><button>Verify approval gate with isolated test data</button><p role="status"></p></form><?php endif;?><p>Website requests wait for an owner decision before preparation, customer access or delivery. Approval does not collect payment or send a map.</p><?php if(isset($_GET['saved'])):?><p role="status">Saved. Request <?=h((string)$_GET['saved'])?></p><?php endif;?>
 <?php foreach($rows as $r):$ref=(string)($r['reference']??'');$d=$r['details']??[];$a=$r['approval']??null;$legacy=in_array($ref,(approvalRead(approvalDir($private).'/approval-policy.json')['legacyBindings']??[]),true);?>
 <article class="owner-map-card"><h2><?=h($ref)?></h2><?php if(($_GET['saved']??'')===$ref):?><p role="status">Saved.</p><?php endif;?><p>Source: <?=h((string)($r['source']??'website'))?> · Received: <?=h((string)($r['createdAt']??''))?></p><p>Status: <strong><?=h((string)($legacy?'existing-map-preserved':(($r['status']??'received')==='received'?'pending-owner-approval':$r['status'])))?></strong></p><p dir="auto"><?=h((string)($d['name']??''))?><br><?=h((string)($d['email']??''))?></p><details><summary>Request details</summary><pre class="request-details"><?=h(json_encode($d,JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT))?></pre></details>
 <?php if($legacy):?><p>This historical request already has an installed map. Existing access is preserved; do not prepare or deliver it again from this queue.</p><?php elseif(!$a):?><form method="post" action="?action=request-decision"><input type="hidden" name="csrf" value="<?=h($_SESSION['csrf'])?>"><input type="hidden" name="reference" value="<?=h($ref)?>"><button name="decision" value="approved">Approve preparation</button> <button name="decision" value="rejected">Decline request</button><p role="status"></p></form>
 <?php else:?><p>Decision: <?=h($a['decision'])?><br>By: <?=h($a['actor'])?><br>At: <?=h($a['at'])?><br>Method: <?=h($a['method'])?><?php if($a['evidence']??''):?><br>Instruction reference: <?=h($a['evidence'])?><?php endif;?></p>
 <?php if(approvalGranted($r)&&!isset($r['production'])):?><form method="post" action="?action=request-start"><input type="hidden" name="csrf" value="<?=h($_SESSION['csrf'])?>"><input type="hidden" name="reference" value="<?=h($ref)?>"><button>Start map preparation</button><p role="status"></p></form><?php endif;?>
 <?php if(isset($r['production'])):?><p>Preparation reference: <?=h($r['production']['id'])?></p><?php endif;?>
 <?php if(($r['provision']['state']??'')==='ready'):?><a class="action-link" href="?action=owner-access&amp;customer=<?=h($r['provision']['customer'])?>">Prepare customer access and delivery</a><?php endif;?>
 <?php endif;?></article><?php endforeach;?><?php if(!$rows):?><p>No requests yet.</p><?php endif;?></main></body></html><?php exit;
}
