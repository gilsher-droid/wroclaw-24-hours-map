<?php
declare(strict_types=1);
// Invoked only after the existing owner session + CSRF guard. Isolated synthetic data.
function approvalSelftest(string $private): array {
 $base=approvalDir($private).'/approval-check-'.bin2hex(random_bytes(8));$test=$base.'/personal-trips-private';$queue=$base.'/trip-requests-private';$checks=[];
 try {
  foreach([$test.'/users',$test.'/routes',$queue.'/requests'] as $d)if(!mkdir($d,0700,true)&&!is_dir($d))throw new RuntimeException('Test storage unavailable');
  $actor=hash('sha256','synthetic-owner');$customer=hash('sha256','synthetic-existing');$ref='WL-AAAAAAAAAAAA';$new='WL-BBBBBBBBBBBB';
  $user=['route'=>$ref,'language'=>'en'];$map=['days'=>[],'places'=>[]];
  approvalSave($test.'/users/'.$customer.'.json',$user);approvalSave($test.'/routes/'.$ref.'.json',$map);$before=file_get_contents($test.'/users/'.$customer.'.json');
  approvalActivate($test);$checks['legacyAccessPreserved']=approvalMapAllowed($test,$customer,$user);
  $path=$queue.'/requests/check.json';approvalSave($path,['reference'=>$new,'source'=>'website','approvalRequired'=>true,'status'=>'pending-owner-approval','details'=>['language'=>'en']]);
  $checks['pendingMapBlocked']=!approvalMapAllowed($test,hash('sha256','synthetic-new'),['route'=>$new]);
  $checks['publicApprovalFlagRejected']=!approvalGranted(['approved'=>true,'source'=>'owner-approved']);
  try{approvalStart($test,$new,$actor);$checks['pendingProductionBlocked']=false;}catch(InvalidArgumentException $e){$checks['pendingProductionBlocked']=true;}
  try{approvalProvision($test,$new,$actor,['username'=>'synthetic-new','route'=>json_encode($map)]);$checks['pendingAccessBlocked']=false;}catch(InvalidArgumentException $e){$checks['pendingAccessBlocked']=true;}
  $r=approvalDecide($test,$new,$actor,'approved','direct-owner-instruction','chat:synthetic-check:case-1');$checks['directInstructionApprovedOnce']=approvalGranted($r)&&$r['approval']['method']==='direct-owner-instruction';
  $a=approvalStart($test,$new,$actor);$b=approvalStart($test,$new,$actor);$checks['oneProductionClaim']=$a['production']['id']===$b['production']['id'];
  $a=approvalProvision($test,$new,$actor,['username'=>'synthetic-new','route'=>json_encode($map)]);$b=approvalProvision($test,$new,$actor,['username'=>'synthetic-new','route'=>json_encode($map)]);
  $checks['oneProvisionedBinding']=$a['provision']===$b['provision'];$u=approvalRead($test.'/users/'.$a['provision']['customer'].'.json');
  $checks['approvedBindingAllowed']=approvalMapAllowed($test,$a['provision']['customer'],$u);
  $checks['existingAccountUntouched']=$before===file_get_contents($test.'/users/'.$customer.'.json');
  if(in_array(false,$checks,true))throw new RuntimeException('Approval check failed');
  return ['ok'=>true,'checks'=>$checks,'realCustomerWrites'=>0,'messagesSent'=>0];
 }finally{
  // Only this randomly named test directory; never follows a link or visits live records.
  if(is_dir($base)){$items=new RecursiveIteratorIterator(new RecursiveDirectoryIterator($base,FilesystemIterator::SKIP_DOTS),RecursiveIteratorIterator::CHILD_FIRST);foreach($items as $f){if($f->isDir()&&!$f->isLink())rmdir($f->getPathname());else unlink($f->getPathname());}rmdir($base);}
 }
}
