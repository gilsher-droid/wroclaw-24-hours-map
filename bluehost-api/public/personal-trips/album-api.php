<?php
declare(strict_types=1);
require_once __DIR__.'/album-repository.php';
function albumRoute(string $private,array $user):array {
 $reference=(string)($user['route']??'');if(!preg_match('/^WL-[A-Z0-9]{12}$/D',$reference))jsonReply(['error'=>'missing'],404);
 $route=readRecord($private.'/routes/'.$reference.'.json');if(!$route||!is_array($route['days']??null)||!is_array($route['places']??null))jsonReply(['error'=>'missing'],404);return $route;
}
function albumRange(int $size,?string $range):array {
 if($range===null)return [0,$size-1,false];
 if(!preg_match('/^bytes=(\d*)-(\d*)$/D',$range,$m)||($m[1]===''&&$m[2]===''))throw new RuntimeException('range');
 if($m[1]===''){$length=(int)$m[2];if($length<1)throw new RuntimeException('range');$start=max(0,$size-$length);$end=$size-1;}
 else{$start=(int)$m[1];$end=$m[2]===''?$size-1:min($size-1,(int)$m[2]);}
 if($start>=$size||$start>$end)throw new RuntimeException('range');return [$start,$end,true];
}
function albumDispatch(string $private,string $key,?array $user,string $action,string $method):never {
 if(!$user)jsonReply(['error'=>'auth'],401);if($user['mustChangePassword']??true)jsonReply(['error'=>'auth'],403);
 $route=albumRoute($private,$user);
 if($action==='album'){
  if($method!=='GET')jsonReply(['error'=>'invalid'],405);header('Content-Type: text/html; charset=utf-8');require __DIR__.'/album-page.php';exit;
 }
 if($action==='album-context'){
  if($method!=='GET')jsonReply(['error'=>'invalid'],405);jsonReply(['route'=>$route,'csrf'=>$_SESSION['csrf'],'language'=>$user['language']??'he','assetVersion'=>substr(hash_file('sha256',__DIR__.'/album-assets.json'),0,16)]);
 }
 try{
  $repo=new AlbumRepository($private,$key,$route+['_albumReference'=>$user['route']]);
  if($action==='album-list'&&$method==='GET'){if(!csrfValid())jsonReply(['error'=>'auth'],401);jsonReply($repo->read());}
  if($action==='album-media'&&in_array($method,['GET','HEAD'],true)){
   $media=$repo->media((string)($_GET['id']??''),($_GET['poster']??'')==='1');$size=filesize($media['path']);
   try{[$start,$end,$partial]=albumRange($size,$_SERVER['HTTP_RANGE']??null);}catch(RuntimeException){header('Content-Range: bytes */'.$size);jsonReply(['error'=>'range'],416);}
   header('Content-Type: '.$media['mime']);header('Accept-Ranges: bytes');header('Content-Length: '.($end-$start+1));header('Cross-Origin-Resource-Policy: same-origin');header('Content-Disposition: '.(isset($_GET['download'])?'attachment':'inline').'; filename="memory"');
   if($partial){http_response_code(206);header("Content-Range: bytes $start-$end/$size");}session_write_close();if($method==='HEAD')exit;
   $f=fopen($media['path'],'rb');if(!$f)exit;fseek($f,$start);$left=$end-$start+1;while($left>0&&!feof($f)&&!connection_aborted()){$chunk=fread($f,min(1048576,$left));if($chunk===false)break;echo $chunk;$left-=strlen($chunk);flush();}fclose($f);exit;
  }
  if($action==='album-export'&&$method==='GET'){
   $path=$repo->export();header('Content-Type: application/zip');header('Content-Disposition: attachment; filename="wroc-love-private-album.zip"');header('Content-Length: '.filesize($path));session_write_close();try{readfile($path);}finally{unlink($path);}exit;
  }
  if($method!=='POST')jsonReply(['error'=>'invalid'],405);
  if(!csrfValid())jsonReply(['error'=>'csrf'],403);
  if(!rateLimit($private,'album-write',180))jsonReply(['error'=>'rate'],429);
  $input=json_decode((string)($_POST['payload']??''),true,32,JSON_THROW_ON_ERROR);if(!is_array($input)||!is_int($input['version']??null))jsonReply(['error'=>'invalid'],400);
  $file=null;$poster=null;
  foreach(['file','poster'] as $field){if(!isset($_FILES[$field]))continue;$f=$_FILES[$field];if(!is_int($f['error'])||$f['error']!==UPLOAD_ERR_OK||!is_string($f['tmp_name'])||!is_uploaded_file($f['tmp_name']))jsonReply(['error'=>'tooLarge'],400);${$field}=['path'=>$f['tmp_name']];}
  $op=match($action){'album-add'=>'add','album-patch'=>'patch','album-meta'=>'meta','album-move'=>'move','album-restore'=>'restore',default=>'invalid'};
  if($file&&$op!=='add')jsonReply(['error'=>'invalid'],400);
  jsonReply($repo->mutate($input['version'],$op,$input['data']??[],$file,$poster));
 }catch(Throwable $e){$code=$e->getMessage();$known=['conflict','quota','unsupported','tooLarge','emptyNote','missing','invalid'];if(!in_array($code,$known,true))$code='storage';jsonReply(['error'=>$code],$code==='conflict'?409:($code==='missing'?404:($code==='storage'?503:400)));}
}
