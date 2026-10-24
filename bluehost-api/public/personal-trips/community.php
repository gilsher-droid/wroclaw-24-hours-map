<?php
declare(strict_types=1);
// Unpublished proposals and login tokens remain outside the public document root.
function communityDir(string $private):string {
 $dir=$private.'/community';foreach([$dir,$dir.'/users',$dir.'/items',$dir.'/tokens'] as $p){if(!is_dir($p)&&!mkdir($p,0700,true)&&!is_dir($p))throw new RuntimeException('storage');chmod($p,0700);}return $dir;
}
function communityId(string $id):bool{return (bool)preg_match('/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/D',$id);}
function communityText(array $data,string $key,int $max=2000):string {
 $s=$data[$key]??'';if(!is_string($s)||!mb_check_encoding($s,'UTF-8')||mb_strlen($s)>$max||preg_match('/[\x00-\x08\x0B\x0C\x0E-\x1F]/',$s))throw new RuntimeException('invalid');return trim($s);
}
function communityRecords(string $dir):array {
 $out=[];foreach(glob($dir.'/items/*/item.json')?:[] as $file){$r=readRecord($file);if($r)$out[]=$r;}usort($out,fn($a,$b)=>strcmp($b['createdAt'],$a['createdAt']));return $out;
}
function communityPlaces(string $dir):array {
 $places=array_replace(readRecord(__DIR__.'/community-places.json')??[],readRecord($dir.'/places.json')??[]);
 foreach(communityRecords($dir) as $r)if($r['status']==='published'&&isset($r['newPlace']))$places[$r['placeId']]=$r['newPlace'];return $places;
}
function communityIdentity(string $dir,string $key,?array $user):?array {
 if($user&&!($user['mustChangePassword']??true)){
  $id=hash('sha256','personal|'.$key);$profile=readRecord($dir.'/users/'.$id.'.json')??['id'=>$id,'name'=>'','email'=>'','language'=>$user['language']??'he'];return $profile;
 }
 $id=(string)($_SESSION['communityUser']??'');
 if(!preg_match('/^[a-f0-9]{64}$/D',$id)||(int)($_SESSION['communityIssued']??0)<time()-604800)return null;
 return readRecord($dir.'/users/'.$id.'.json');
}
function communityMail(string $private,string $to,string $subject,string $body):bool {
 if(!filter_var($to,FILTER_VALIDATE_EMAIL)||strpbrk($to,"\r\n"))return false;
 $html='<html><body style="background:#f3f5f7;font:16px/1.7 Arial;color:#082c59"><main style="max-width:640px;margin:auto;background:white;padding:28px;border-top:5px solid #caa04b"><img src="https://wroc-love.com/assets/logo.png" alt="WROC-LOVE" width="80">'.$body.'</main></body></html>';
 // A local integration test uses a private outbox; production never reads a request-controlled transport flag.
 if(PHP_SAPI==='cli-server'&&in_array($_SERVER['REMOTE_ADDR']??'',['127.0.0.1','::1'],true)&&is_file($private.'/community-test-mail')){
  saveRecord(communityDir($private).'/mail-'.bin2hex(random_bytes(8)).'.json',['to'=>$to,'subject'=>$subject,'html'=>$html]);return true;
 }
 return mail($to,$subject,$html,implode("\r\n",['From: WROC-LOVE <requests@wroc-love.com>','MIME-Version: 1.0','Content-Type: text/html; charset=UTF-8']));
}
function communityNotifyOwners(string $private,array $record):void {
 $path=dirname($private).'/trip-requests-private/config.php';if(!is_file($path))return;$config=require $path;
 foreach(($config['recipients']??[]) as $i=>$to){$body=$i===0?'<div dir="rtl"><h1>הצעת תוכן חדשה</h1><p>הצעה ממתינה לבדיקה פרטית. לא פורסם תוכן אוטומטית.</p>':'<div><h1>New community contribution</h1><p>A private proposal is ready for review. Nothing has been published automatically.</p>';$body.='<p dir="auto">'.h($record['title']).'</p><a href="https://api.wroc-love.com/personal-trips/?action=community&amp;view=review">'.($i===0?'פתיחת תיבת ההצעות':'Open the review inbox').'</a></div>';communityMail($private,(string)$to,'WROC-LOVE: new contribution',$body);}
}
function communityAccepted(string $dir,string $identity):int {
 $signatures=[];foreach(communityRecords($dir) as $r)if($r['contributor']===$identity&&$r['status']==='published'){
  $hashes=array_column($r['files'],'hash');sort($hashes);$signatures[hash('sha256',json_encode([$r['placeId'],$r['publishedText']??$r['text'],$hashes]))]=true;
 }return count($signatures);
}
function communityPublic(array $r,string $dir):array {
 $profile=readRecord($dir.'/users/'.$r['contributor'].'.json');$count=communityAccepted($dir,$r['contributor']);
 $media=[];foreach($r['files'] as $i=>$f){if(!empty($f['excluded']))continue;if($f['type']==='image'&&!empty($f['published']))$media[]=['type'=>'image','url'=>'https://api.wroc-love.com/personal-trips/?action=community-media&id='.$r['id'].'&file='.$i];if($f['type']==='video'&&!empty($f['youtube']))$media[]=['type'=>'video','url'=>$f['youtube']];}
 return ['id'=>$r['id'],'placeId'=>$r['placeId'],'place'=>$r['placeName'],'title'=>$r['publishedTitle']??$r['title'],'text'=>$r['publishedText']??$r['text'],'language'=>$r['language'],'kind'=>$r['kind'],'credit'=>$r['credit'],'acceptedContributions'=>$count,'media'=>$media,'publishedAt'=>$r['reviewedAt'],'newPlace'=>$r['newPlace']??null,'translations'=>$r['translations']??new stdClass()];
}
function communityView(array $r,bool $admin):array {
 $out=$r;unset($out['contributor'],$out['fingerprint']);foreach($out['files'] as $i=>&$f){unset($f['path']);$f['preview']='?action=community-media&preview=1&id='.$r['id'].'&file='.$i;}return $out;
}
function communityUpload(string $source,string $filename,string $destination):array {
 $size=filesize($source);if(!$size||$size>41943040)throw new RuntimeException('tooLarge');$mime=(new finfo(FILEINFO_MIME_TYPE))->file($source);$images=['image/jpeg'=>'jpg','image/png'=>'png','image/webp'=>'webp','image/gif'=>'gif'];$videos=['video/mp4'=>'mp4','video/quicktime'=>'mov','video/webm'=>'webm'];
 if(isset($images[$mime])){$g=getimagesize($source);if(!$g||$g[0]*$g[1]>20000000||$size>15728640)throw new RuntimeException('unsupported');$type='image';$ext=$images[$mime];}
 elseif(isset($videos[$mime])){$head=file_get_contents($source,false,null,0,16);if(($mime==='video/webm'&&substr($head,0,4)!=="\x1a\x45\xdf\xa3")||($mime!=='video/webm'&&substr($head,4,4)!=='ftyp'))throw new RuntimeException('unsupported');$type='video';$ext=$videos[$mime];}else throw new RuntimeException('unsupported');
 $hash=hash_file('sha256',$source);$path=$hash.'.'.$ext;if(!copy($source,$destination.'/'.$path))throw new RuntimeException('storage');chmod($destination.'/'.$path,0600);
 return ['path'=>$path,'name'=>mb_substr(basename($filename),0,160),'mime'=>$mime,'type'=>$type,'size'=>$size,'hash'=>$hash];
}
function communityAlbumSource(string $private,string $key,?array $user,string $entryId,string $customer):array {
 if(!$user||($user['mustChangePassword']??true))throw new RuntimeException('auth');$owner=$key;$effective=$user;
 if($customer!==''){if(!isOwnerAdmin($user))throw new RuntimeException('auth');$entry=ownerCustomer($private,$customer);if(!$entry)throw new RuntimeException('missing');$owner=$customer;$effective=$entry['record'];}
 require_once __DIR__.'/album-repository.php';$ref=(string)($effective['route']??'');$route=readRecord($private.'/routes/'.$ref.'.json');if(!$route)throw new RuntimeException('missing');$repo=new AlbumRepository($private,$owner,$route+['_albumReference'=>$ref]);
 foreach($repo->read()['entries'] as $entry)if($entry['id']===$entryId&&!isset($entry['deletedAt'])){
  $media=isset($entry['mediaUrl'])?$repo->media($entryId):null;return ['entry'=>$entry,'media'=>$media,'place'=>$route['places'][$entry['placeId']]??null];
 }throw new RuntimeException('missing');
}
function communityDispatch(string $private,string $key,?array $user,string $action,string $method):never {
 try{
  $dir=communityDir($private);$identity=communityIdentity($dir,$key,$user);$admin=isOwnerAdmin($user)&&!($user['mustChangePassword']??true);
  if($action==='community'){header('Content-Type: text/html; charset=utf-8');require __DIR__.'/community-page.php';exit;}
  $origin=$_SERVER['HTTP_ORIGIN']??'';$allowed=['https://wroc-love.com','https://www.wroc-love.com'];if(in_array($origin,$allowed,true)){header('Access-Control-Allow-Origin: '.$origin);header('Vary: Origin');}
  if($action==='community-public'){
   if($method!=='GET')jsonReply(['error'=>'invalid'],405);$items=[];foreach(communityRecords($dir) as $r)if($r['status']==='published')$items[]=communityPublic($r,$dir);jsonReply(['items'=>$items]);
  }
  if($action==='community-media'){
   if($method!=='GET')jsonReply(['error'=>'invalid'],405);$id=(string)($_GET['id']??'');if(!communityId($id))throw new RuntimeException('missing');$r=readRecord($dir.'/items/'.$id.'/item.json');$i=filter_var($_GET['file']??null,FILTER_VALIDATE_INT);if(!$r||$i===false||$i===null||!isset($r['files'][$i]))throw new RuntimeException('missing');$f=$r['files'][$i];$preview=($_GET['preview']??'')==='1';
   if($preview){if(!$admin&&(!$identity||$r['contributor']!==$identity['id']))throw new RuntimeException('auth');$name=$f['path'];$mime=$f['mime'];}
   else{if($r['status']!=='published'||$f['type']!=='image'||empty($f['published'])||!empty($f['excluded']))throw new RuntimeException('missing');$name=$f['published'];$mime='image/jpeg';}
   if(!preg_match('/^[a-f0-9]{64}(?:-public)?\.(jpg|png|webp|gif|mp4|mov|webm)$/D',$name))throw new RuntimeException('missing');$path=$dir.'/items/'.$id.'/'.$name;if(!is_file($path))throw new RuntimeException('missing');header('Content-Type: '.$mime);header('Content-Length: '.filesize($path));header('Content-Disposition: '.($f['type']==='video'?'attachment':'inline').'; filename="contribution.'.($preview?pathinfo($name,PATHINFO_EXTENSION):'jpg').'"');session_write_close();readfile($path);exit;
  }
  if($action!=='community-api')jsonReply(['error'=>'missing'],404);
  $op=(string)($_GET['op']??'state');
  if($method==='GET'){
   if($op==='state'){
    $source=null;if(!empty($_GET['albumEntry'])&&$user)$source=communityAlbumSource($private,$key,$user,(string)$_GET['albumEntry'],(string)($_GET['customer']??''));
    $accepted=$identity?communityAccepted($dir,$identity['id']):0;
    jsonReply(['csrf'=>$_SESSION['csrf'],'signedIn'=>$identity!==null,'admin'=>$admin,'profile'=>$identity?['name'=>$identity['name'],'accepted'=>$accepted]:null,'places'=>communityPlaces($dir),'albumSource'=>$source?['entry'=>$source['entry'],'place'=>$source['place']]:null]);
   }
   if($op==='my'){if(!$identity)throw new RuntimeException('auth');jsonReply(['items'=>array_values(array_map(fn($r)=>communityView($r,false),array_filter(communityRecords($dir),fn($r)=>$r['contributor']===$identity['id'])))]);}
   if($op==='review'){if(!$admin)throw new RuntimeException('auth');$items=[];foreach(communityRecords($dir) as $r){$item=communityView($r,true);$profile=readRecord($dir.'/users/'.$r['contributor'].'.json');$item['possibleDuplicates']=array_values(array_map(fn($other)=>$other['id'],array_filter(communityRecords($dir),fn($other)=>$other['id']!==$r['id']&&count(array_intersect(array_column($other['files'],'hash'),array_column($r['files'],'hash')))>0)));$item['submitter']=['name'=>$profile['name']??'','email'=>$profile['email']??''];$items[]=$item;}jsonReply(['items'=>$items]);}
   throw new RuntimeException('invalid');
  }
  if($method!=='POST')jsonReply(['error'=>'invalid'],405);
  if(!csrfValid())jsonReply(['error'=>'csrf'],403);
  $data=json_decode((string)($_POST['payload']??'{}'),true,32,JSON_THROW_ON_ERROR);if(!is_array($data))throw new RuntimeException('invalid');
  if($op==='signout'){unset($_SESSION['user'],$_SESSION['version'],$_SESSION['issued'],$_SESSION['communityUser'],$_SESSION['communityIssued']);session_regenerate_id(true);$_SESSION['csrf']=bin2hex(random_bytes(32));jsonReply(['ok'=>true]);}
  if($op==='send-link'){
   if(!rateLimit($private,'community-signin',6))throw new RuntimeException('rate');$email=communityText($data,'email',180);$language=communityText($data,'language',2);if(!filter_var($email,FILTER_VALIDATE_EMAIL)||strpbrk($email,"\r\n")||!in_array($language,['he','en','de','pl','cs'],true))throw new RuntimeException('invalid');
   $token=bin2hex(random_bytes(32));$hash=hash('sha256',$token);saveRecord($dir.'/tokens/'.$hash.'.json',['email'=>strtolower($email),'language'=>$language,'expires'=>time()+900]);
   $labels=['he'=>'כניסה להצעות התוכן שלך','en'=>'Sign in to your contributions','pl'=>'Zaloguj się do swoich propozycji','de'=>'Bei deinen Beiträgen anmelden','cs'=>'Přihlásit se ke svým příspěvkům'];$url='https://api.wroc-love.com/personal-trips/?action=community&token='.$token.'&lang='.$language;
   if(!communityMail($private,$email,'WROC-LOVE: '.$labels[$language],'<div dir="'.($language==='he'?'rtl':'ltr').'"><h1>'.h($labels[$language]).'</h1><p><a href="'.h($url).'">'.h($labels[$language]).'</a></p><p>15 minutes. WROC-LOVE</p></div>'))throw new RuntimeException('mail');jsonReply(['ok'=>true]);
  }
  if($op==='consume-link'){
   if(!rateLimit($private,'community-token',15))throw new RuntimeException('rate');$token=communityText($data,'token',64);if(!preg_match('/^[a-f0-9]{64}$/D',$token))throw new RuntimeException('auth');$path=$dir.'/tokens/'.hash('sha256',$token).'.json';$lock=fopen($dir.'/auth.lock','c');chmod($dir.'/auth.lock',0600);if(!$lock||!flock($lock,LOCK_EX))throw new RuntimeException('storage');$record=readRecord($path);if(!$record||isset($record['used'])||$record['expires']<time())throw new RuntimeException('expired');$record['used']=true;saveRecord($path,$record);flock($lock,LOCK_UN);fclose($lock);
   $id=hash_hmac('sha256','community|'.$record['email'],(string)file_get_contents($private.'/server-key'));$profile=readRecord($dir.'/users/'.$id.'.json')??['id'=>$id,'email'=>$record['email'],'name'=>'','language'=>$record['language']];saveRecord($dir.'/users/'.$id.'.json',$profile);session_regenerate_id(true);$_SESSION['communityUser']=$id;$_SESSION['communityIssued']=time();$_SESSION['csrf']=bin2hex(random_bytes(32));jsonReply(['ok'=>true]);
  }
  if(!$identity)throw new RuntimeException('auth');
  $lock=fopen($dir.'/write.lock','c');chmod($dir.'/write.lock',0600);if(!$lock||!flock($lock,LOCK_EX))throw new RuntimeException('storage');
  if($op==='submit'){
   if(!rateLimit($private,'community-submit',15))throw new RuntimeException('rate');$id=communityText($data,'id',36);if(!communityId($id))throw new RuntimeException('invalid');$fingerprintData=$data;unset($fingerprintData['version']);$fileHashes=[];foreach((array)($_FILES['files']['tmp_name']??[]) as $tmp)if(is_string($tmp)&&is_uploaded_file($tmp))$fileHashes[]=hash_file('sha256',$tmp);$fingerprint=hash('sha256',json_encode([$fingerprintData,$fileHashes],JSON_THROW_ON_ERROR));$folder=$dir.'/items/'.$id;$old=readRecord($folder.'/item.json');
   if($old){if($old['contributor']!==$identity['id'])throw new RuntimeException('auth');if(($old['fingerprint']??'')===$fingerprint)jsonReply(['ok'=>true,'item'=>communityView($old,false)]);if(($data['version']??null)!==$old['version'])throw new RuntimeException('conflict');if(!in_array($old['status'],['pending','needs-info'],true))throw new RuntimeException('invalid');}
   if(($data['consent']??false)!==true)throw new RuntimeException('consent');$language=communityText($data,'language',2);$kind=communityText($data,'kind',20);if(!in_array($language,['he','en','de','pl','cs'],true)||!in_array($kind,['media','tip','correction','new-place'],true))throw new RuntimeException('invalid');
   $name=communityText($data,'credit',80);$title=communityText($data,'title',160);$text=communityText($data,'text',4000);$placeId=communityText($data,'placeId',120);$placeName=communityText($data,'placeName',160);if($title===''||($text===''&&empty($_FILES['files'])&&empty($data['albumEntry'])&&empty($old['files'])))throw new RuntimeException('invalid');$places=communityPlaces($dir);if($placeId!==''&&!isset($places[$placeId]))throw new RuntimeException('invalid');if($placeId==='')$kind='new-place';
   $disk=0;foreach(glob($dir.'/items/*/*')?:[] as $stored)if(is_file($stored))$disk+=filesize($stored);if($disk>2147483648)throw new RuntimeException('quota');if(!is_dir($folder))mkdir($folder,0700);$files=$old['files']??[];$remove=$data['removeHashes']??[];if(!is_array($remove))throw new RuntimeException('invalid');foreach($remove as $hash)if(!is_string($hash)||!preg_match('/^[a-f0-9]{64}$/D',$hash))throw new RuntimeException('invalid');$files=array_values(array_filter($files,fn($f)=>!in_array($f['hash'],$remove,true)));$incoming=$_FILES['files']??null;$count=$incoming?count((array)$incoming['name']):0;if(count($files)+$count>5)throw new RuntimeException('tooLarge');$total=array_sum(array_column($files,'size'));
   for($i=0;$i<$count;$i++){if($incoming['error'][$i]!==UPLOAD_ERR_OK||!is_uploaded_file($incoming['tmp_name'][$i]))throw new RuntimeException('tooLarge');$f=communityUpload($incoming['tmp_name'][$i],$incoming['name'][$i],$folder);$total+=$f['size'];if(!in_array($f['hash'],array_column($files,'hash'),true))$files[]=$f;}
   $albumEntry=communityText($data,'albumEntry',36);if($albumEntry!==''){$source=communityAlbumSource($private,$key,$user,$albumEntry,communityText($data,'customer',64));if($source['media']){$f=communityUpload($source['media']['path'],$source['media']['filename'],$folder);if(!in_array($f['hash'],array_column($files,'hash'),true)){$files[]=$f;$total+=$f['size'];}}}
   if($text===''&&!count($files))throw new RuntimeException('invalid');if($total>62914560||count($files)>5)throw new RuntimeException('tooLarge');$used=0;foreach(communityRecords($dir) as $r)if($r['contributor']===$identity['id']&&$r['id']!==$id)$used+=array_sum(array_column($r['files'],'size'));if($used+$total>209715200)throw new RuntimeException('quota');
   $r=['id'=>$id,'version'=>($old['version']??0)+1,'contributor'=>$identity['id'],'createdAt'=>$old['createdAt']??gmdate('c'),'status'=>'pending','fingerprint'=>$fingerprint,'kind'=>$kind,'placeId'=>$placeId,'placeName'=>$placeId!==''?($places[$placeId]['name'][$language]??$places[$placeId]['name']['en']):$placeName,'title'=>$title,'text'=>$text,'language'=>$language,'credit'=>$name,'locationHint'=>communityText($data,'locationHint',500),'consent'=>['publication'=>true,'version'=>'2026-10-24','at'=>gmdate('c'),'onlySelectedItems'=>true],'files'=>$files,'feedback'=>''];
   $identity['name']=$name;$identity['language']=$language;saveRecord($dir.'/users/'.$identity['id'].'.json',$identity);saveRecord($folder.'/item.json',$r);flock($lock,LOCK_UN);fclose($lock);communityNotifyOwners($private,$r);jsonReply(['ok'=>true,'item'=>communityView($r,false)],201);
  }
  $id=communityText($data,'id',36);if(!communityId($id))throw new RuntimeException('invalid');$folder=$dir.'/items/'.$id;$r=readRecord($folder.'/item.json');if(!$r)throw new RuntimeException('missing');if(($data['version']??null)!==$r['version'])throw new RuntimeException('conflict');
  if($op==='withdraw'){if(!$admin&&$r['contributor']!==$identity['id'])throw new RuntimeException('auth');$r['status']='withdrawn';$r['consent']['publication']=false;$r['consent']['withdrawnAt']=gmdate('c');}
  elseif($op==='moderate'){
   if(!$admin)throw new RuntimeException('auth');if($r['status']==='withdrawn'||!($r['consent']['publication']??false))throw new RuntimeException('consent');$decision=communityText($data,'decision',20);if(!in_array($decision,['published','needs-info','declined','pending'],true))throw new RuntimeException('invalid');$r['feedback']=communityText($data,'feedback',1500);
   if($decision==='published'){
    if(($data['reviewedRights']??false)!==true||($data['reviewedPlace']??false)!==true)throw new RuntimeException('consent');$placeId=communityText($data,'placeId',120);$places=communityPlaces($dir);
    if($placeId===''){$lat=filter_var($data['lat']??null,FILTER_VALIDATE_FLOAT);$lng=filter_var($data['lng']??null,FILTER_VALIDATE_FLOAT);$placeName=communityText($data,'placeName',160);if($lat===false||$lng===false||$lat<-90||$lat>90||$lng<-180||$lng>180||$placeName==='')throw new RuntimeException('invalid');$placeId='community-'.$id;$r['newPlace']=['id'=>$placeId,'name'=>array_fill_keys(['he','en','pl','de','cs'],$placeName),'coordinates'=>['lat'=>$lat,'lng'=>$lng]];}
    elseif(!isset($places[$placeId]))throw new RuntimeException('invalid');else unset($r['newPlace']);
    $r['placeId']=$placeId;$r['placeName']=$r['newPlace']['name']['en']??$places[$placeId]['name'][$r['language']]??$places[$placeId]['name']['en'];$r['publishedTitle']=communityText($data,'publishedTitle',160)?:$r['title'];$r['publishedText']=communityText($data,'publishedText',4000)?:$r['text'];
    foreach($r['files'] as $i=>&$f){$f['excluded']=in_array($i,$data['excludeFiles']??[],true);if($f['excluded'])continue;if($f['type']==='image'){$bytes=file_get_contents($folder.'/'.$f['path']);$img=imagecreatefromstring($bytes);if(!$img)throw new RuntimeException('unsupported');$out=$f['hash'].'-public.jpg';if(!imagejpeg($img,$folder.'/'.$out,88))throw new RuntimeException('storage');chmod($folder.'/'.$out,0600);$f['published']=$out;}
     else{$url=(string)($data['youtube'][$i]??'');if(!preg_match('~^https://www\.youtube\.com/watch\?v=[A-Za-z0-9_-]{11}$~D',$url)||($data['publicYouTubeVerified']??false)!==true)throw new RuntimeException('youtube');$f['youtube']=$url;}}
    unset($f);
   }
   $r['status']=$decision;$r['reviewedAt']=gmdate('c');$r['reviewedBy']=$key;ownerAudit($private,$key,$r['contributor'],'community-'.$decision);
  }else throw new RuntimeException('invalid');
  $r['version']++;saveRecord($folder.'/item.json',$r);if($r['status']==='published'&&isset($r['newPlace'])){$canonical=readRecord($dir.'/places.json')??[];$canonical[$r['placeId']]=$r['newPlace'];saveRecord($dir.'/places.json',$canonical);}flock($lock,LOCK_UN);fclose($lock);
  $profile=readRecord($dir.'/users/'.$r['contributor'].'.json');if(!empty($profile['email'])){$labels=['he'=>'עדכון להצעת התוכן שלך','en'=>'Your contribution has an update','pl'=>'Aktualizacja Twojej propozycji','de'=>'Neuigkeiten zu deinem Beitrag','cs'=>'Aktualizace vašeho příspěvku'];$l=$profile['language']??'en';communityMail($private,$profile['email'],'WROC-LOVE: '.$labels[$l],'<div dir="'.($l==='he'?'rtl':'ltr').'"><h1>'.h($labels[$l]).'</h1><p dir="auto">'.h($r['title']).'</p><p dir="auto">'.h($r['feedback']).'</p><a href="https://api.wroc-love.com/personal-trips/?action=community&amp;view=my&amp;lang='.$l.'">'.h($labels[$l]).'</a></div>');}
  jsonReply(['ok'=>true,'item'=>communityView($r,$admin)]);
 }catch(Throwable $e){$code=$e->getMessage();$known=['invalid','auth','missing','expired','rate','consent','tooLarge','unsupported','storage','quota','youtube','conflict','mail'];if(!in_array($code,$known,true))$code='storage';jsonReply(['error'=>$code],$code==='auth'?403:($code==='missing'?404:($code==='conflict'?409:($code==='storage'||$code==='mail'?503:400))));}
}
