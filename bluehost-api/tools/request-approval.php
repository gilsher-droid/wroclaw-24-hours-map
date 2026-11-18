<?php
declare(strict_types=1);
// Hosting CLI only. Never install this operational entry point in the web root.
if(PHP_SAPI!=='cli')exit(1);
require_once dirname(__DIR__).'/public/personal-trips/request-approval.php';
try{
 $private=realpath($argv[2]??'');if(!$private||!is_file($private.'/server-key'))throw new RuntimeException('Private service directory required');
 if(($argv[1]??'')==='activate'){$p=approvalActivate($private);echo json_encode(['active'=>true,'legacyBindings'=>count($p['legacyBindings']),'activatedAt'=>$p['activatedAt']])."\n";}
 elseif(($argv[1]??'')==='check'){
  $r=approvalFind($private,$argv[3]??'')['record']??[];$stage=$argv[4]??'';
  if(!approvalGranted($r)||!isset($r['production'])||!in_array($stage,['production','access','delivery'],true))throw new RuntimeException('Owner approval required');
  if($stage!=='production'&&($r['provision']['state']??'')!=='ready')throw new RuntimeException('Map preparation required');
  if($stage==='delivery'&&!isset($r['deliveryRelease']))throw new RuntimeException('Authenticated delivery release required');
  echo json_encode(['allowed'=>true,'reference'=>$r['reference'],'stage'=>$stage])."\n";
 }else throw new RuntimeException('Use activate or check');
}catch(Throwable $e){fwrite(STDERR,"Approval gate refused the operation.\n");exit(1);}
