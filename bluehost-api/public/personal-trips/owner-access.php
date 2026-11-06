<?php
declare(strict_types=1);

// All records and credentials stay outside the document root.
function accessDir(string $private): string {
 $dir=$private.'/access-resets';
 if(!is_dir($dir)&&!mkdir($dir,0700,true)&&!is_dir($dir))throw new RuntimeException('Storage unavailable');
 return $dir;
}
function accessLocked(string $private,string $customer,callable $operation): mixed {
 $lock=fopen(accessDir($private).'/'.$customer.'.lock','c');
 if(!$lock)throw new RuntimeException('Storage unavailable');
 chmod(accessDir($private).'/'.$customer.'.lock',0600);
 try {if(!flock($lock,LOCK_EX))throw new RuntimeException('Storage unavailable');return $operation();}
 finally {flock($lock,LOCK_UN);fclose($lock);}
}
function accessCredentialValid(array $record): bool {
 return !($record['mustChangePassword']??false)||!isset($record['temporaryCodeExpiresAt'])||(int)$record['temporaryCodeExpiresAt']>time();
}
function accessSeal(string $private,array $payload): array {
 $iv=random_bytes(12);$tag='';
 $key=hash_hmac('sha256','personal-map-access-reset-v1',(string)file_get_contents($private.'/server-key'),true);
 $cipher=openssl_encrypt(json_encode($payload,JSON_THROW_ON_ERROR),'aes-256-gcm',$key,OPENSSL_RAW_DATA,$iv,$tag,'wroc-access-v1');
 if($cipher===false)throw new RuntimeException('Encryption unavailable');
 return ['iv'=>base64_encode($iv),'tag'=>base64_encode($tag),'cipher'=>base64_encode($cipher)];
}
function accessOpen(string $private,array $sealed): array {
 $key=hash_hmac('sha256','personal-map-access-reset-v1',(string)file_get_contents($private.'/server-key'),true);
 $raw=openssl_decrypt(base64_decode($sealed['cipher'],true),'aes-256-gcm',$key,OPENSSL_RAW_DATA,base64_decode($sealed['iv'],true),base64_decode($sealed['tag'],true),'wroc-access-v1');
 if($raw===false)throw new RuntimeException('Saved delivery is unavailable');
 return json_decode($raw,true,512,JSON_THROW_ON_ERROR);
}
function accessFacebookUrl(string $url): bool {
 $p=parse_url($url);
 return $url===''||($p&&($p['scheme']??'')==='https'&&in_array(strtolower($p['host']??''),['www.facebook.com','facebook.com','business.facebook.com','www.messenger.com','messenger.com'],true)&&!isset($p['user'])&&!isset($p['pass'])&&!isset($p['port']));
}
function accessContact(array $input,string $customer,array $record): array {
 $username=strtolower(trim((string)($input['username']??'')));
 if(strlen($username)>254||!hash_equals($customer,userKey($username)))throw new InvalidArgumentException('The username does not match this customer.');
 $lang=(string)($record['language']??'');
 if(!in_array($lang,['he','en','pl','de','cs'],true))throw new InvalidArgumentException('Save the original request language before resetting access.');
 $email=trim((string)($input['email']??''));
 if($email!==''&&(!filter_var($email,FILTER_VALIDATE_EMAIL)||preg_match('/[\r\n]/',$email)))throw new InvalidArgumentException('Enter a valid customer email.');
 $contact=['username'=>$username,'email'=>$email,'language'=>$lang];
 foreach(['messenger','publicThread'] as $field){$url=trim((string)($input[$field]??''));if(strlen($url)>2000||!accessFacebookUrl($url))throw new InvalidArgumentException('Use a verified Facebook conversation or comment link.');$contact[$field]=$url;}
 return $contact;
}
function accessCurrent(array $event,?array $record): bool {
 return $record!==null&&($event['state']??'')==='ready'&&($record['accessResetId']??'')===$event['id']&&($record['mustChangePassword']??false)&&!($record['disabled']??false)&&accessCredentialValid($record)&&(int)$record['sessionVersion']===(int)$event['version'];
}
function accessReset(string $private,string $actor,string $customer,array $input): array {
 $intent=(string)($input['intent']??'');
 if(!preg_match('/^[a-f0-9]{64}$/D',$intent)||($_SESSION['accessIntent'][$intent]['customer']??'')!==$customer||(int)($_SESSION['accessIntent'][$intent]['at']??0)<time()-3600)throw new InvalidArgumentException('This form expired. Open the customer again.');
 if(($input['identityConfirmed']??'')!=='1')throw new InvalidArgumentException('Confirm the customer identity and private delivery details.');
 return accessLocked($private,$customer,function()use($private,$actor,$customer,$input,$intent){
  $entry=ownerCustomer($private,$customer);if(!$entry||($entry['record']['disabled']??false))throw new InvalidArgumentException('This customer is unavailable.');
  $record=$entry['record'];$contact=accessContact($input,$customer,$record);
  $id=hash_hmac('sha256',$customer.'|'.$intent,(string)file_get_contents($private.'/server-key'));
  $path=accessDir($private).'/'.$id.'.json';$event=readRecord($path);
  if($event){
   // Complete an interrupted transaction without generating a second code.
   if($event['state']==='prepared'){
    if(($record['accessResetId']??'')!==$id){
     if((int)$record['sessionVersion']!==(int)$event['baseVersion'])throw new InvalidArgumentException('Access changed. Open a fresh reset form.');
     $payload=accessOpen($private,$event['sealed']);$record=accessApply($record,$event,$payload['hash']);saveRecord($private.'/users/'.$customer.'.json',$record);
    }
    $event['state']='ready';saveRecord($path,$event);
   }
   return $event;
  }
  if(!rateLimit($private,'owner-access-reset-'.$customer,3))throw new InvalidArgumentException('Too many resets. Try again in 15 minutes.');
  do{$code=str_pad((string)random_int(0,9999),4,'0',STR_PAD_LEFT);}while(in_array($code,['0000','1111','1234','1960','2026','4321'],true)||preg_match('/^(\d)\1{3}$/D',$code)||password_verify($code,$record['passwordHash']));
  $event=['id'=>$id,'customer'=>$customer,'actor'=>$actor,'createdAt'=>gmdate('c'),'expiresAt'=>time()+86400,'baseVersion'=>(int)$record['sessionVersion'],'version'=>(int)$record['sessionVersion']+1,'state'=>'prepared','contact'=>$contact,'title'=>(string)($entry['route']['title']??'WROC-LOVE'),'channels'=>['email'=>['state'=>$contact['email']!==''?'pending':'not-provided'],'messenger'=>['state'=>$contact['messenger']!==''?'pending':'not-provided'],'publicThread'=>['state'=>$contact['publicThread']!==''?'pending':'not-provided']],'sealed'=>accessSeal($private,['code'=>$code,'hash'=>password_hash($code,PASSWORD_DEFAULT)])];
  ownerAudit($private,$actor,$customer,'access-reset-requested');
  saveRecord($path,$event);$record=accessApply($record,$event,accessOpen($private,$event['sealed'])['hash']);saveRecord($private.'/users/'.$customer.'.json',$record);
  $event['state']='ready';saveRecord($path,$event);return $event;
 });
}
function accessApply(array $record,array $event,string $hash): array {
 $record['passwordHash']=$hash;$record['mustChangePassword']=true;$record['sessionVersion']=$event['version'];$record['temporaryCodeExpiresAt']=$event['expiresAt'];$record['accessResetId']=$event['id'];return $record;
}
function accessMessages(array $event,string $code): array {
 $c=$event['contact'];$lang=$c['language'];$url='https://api.wroc-love.com/personal-trips/?action=album&view=map&lang='.$lang;
 $copy=[
 'he'=>['המפה האישית שלך ופרטי הכניסה המעודכנים','המפה האישית שלך זמינה גם בטלפון וגם במחשב.','שם משתמש','קוד זמני','הקוד הזמני תקף ל־24 שעות. בכניסה הראשונה יש לבחור קוד אישי חדש בן ארבע ספרות. המפה והזיכרונות שלך נשמרו.','WROC-LOVE','פרטי הכניסה למפה האישית נשלחו אליך בהודעה פרטית.'],
 'en'=>['Your personal map and updated access details','Your personal map is available on your phone and computer.','Username','Temporary code','The temporary code expires in 24 hours. On your first sign-in, choose a new personal four-digit code. Your map and memories have been preserved.','WROC-LOVE','Your personal-map access details have been sent privately.'],
 'pl'=>['Twoja osobista mapa i nowe dane logowania','Twoja osobista mapa jest dostępna na telefonie i komputerze.','Nazwa użytkownika','Kod tymczasowy','Kod tymczasowy jest ważny przez 24 godziny. Przy pierwszym logowaniu wybierz nowy osobisty kod złożony z czterech cyfr. Twoja mapa i wspomnienia zostały zachowane.','WROC-LOVE','Dane logowania do osobistej mapy zostały wysłane w wiadomości prywatnej.'],
 'de'=>['Deine persönliche Karte und neue Zugangsdaten','Deine persönliche Karte ist auf dem Handy und Computer verfügbar.','Benutzername','Vorläufiger Code','Der vorläufige Code ist 24 Stunden gültig. Wähle bei der ersten Anmeldung einen neuen persönlichen vierstelligen Code. Deine Karte und Erinnerungen bleiben erhalten.','WROC-LOVE','Die Zugangsdaten für deine persönliche Karte wurden privat gesendet.'],
 'cs'=>['Vaše osobní mapa a nové přihlašovací údaje','Vaše osobní mapa je dostupná v telefonu i počítači.','Uživatelské jméno','Dočasný kód','Dočasný kód platí 24 hodin. Při prvním přihlášení zvolte nový osobní čtyřmístný kód. Vaše mapa a vzpomínky zůstaly zachovány.','WROC-LOVE','Přihlašovací údaje k osobní mapě byly odeslány soukromě.']
 ][$lang]??throw new InvalidArgumentException('Unsupported language');
 return ['subject'=>$copy[0],'private'=>implode("\n\n",[$copy[1],$event['title'],$url,$copy[2].":\n".$c['username'],$copy[3].":\n".$code,$copy[4],$copy[5]]),'public'=>$copy[6]];
}
function accessPrivateDelivered(array $event): bool {
 foreach(['email','messenger'] as $channel)if(in_array($event['channels'][$channel]['state'],['sent','owner-confirmed'],true))return true;
 return false;
}
function accessDispatch(string $private,string $actor,?array $user,string $action,string $method): never {
 if(!isOwnerAdmin($user)||($user['mustChangePassword']??true))jsonReply(['error'=>'Owner access required'],403);
 $customer=(string)($_GET['customer']??'');$entry=ownerCustomer($private,$customer);if(!$entry)jsonReply(['error'=>'Customer not found'],404);
 try {
  if($action==='owner-access-reset'){
   if($method!=='POST')jsonReply(['error'=>'POST required'],405);
   if(!csrfValid())jsonReply(['error'=>'Refresh the page and try again'],403);
   $event=accessReset($private,$actor,$customer,$_POST);header('Location: ?'.http_build_query(['action'=>'owner-access','customer'=>$customer,'event'=>$event['id']]),true,303);exit;
  }
  if($action==='owner-access-confirm'){
   if($method!=='POST')jsonReply(['error'=>'POST required'],405);
   if(!csrfValid())jsonReply(['error'=>'Refresh the page and try again'],403);
   $id=(string)($_POST['event']??'');if(!preg_match('/^[a-f0-9]{64}$/D',$id))throw new InvalidArgumentException('Invalid delivery');
   accessLocked($private,$customer,function()use($private,$customer,$actor,$id){
    $path=accessDir($private).'/'.$id.'.json';$event=readRecord($path);if(!$event||$event['customer']!==$customer)throw new InvalidArgumentException('Delivery not found');
    $channel=(string)($_POST['channel']??'');$receipt=trim((string)($_POST['receipt']??''));
    if(!in_array($channel,['email','messenger','publicThread'],true)||strlen($receipt)<3||strlen($receipt)>500||preg_match('/[\r\n]/',$receipt))throw new InvalidArgumentException('Enter the sent-message ID or permalink, without credentials.');
    if($event['channels'][$channel]['state']==='not-provided')throw new InvalidArgumentException('No destination was provided.');
    if($channel==='publicThread'&&!accessPrivateDelivered($event))throw new InvalidArgumentException('Confirm private delivery before posting the public update.');
    if($channel!=='publicThread'&&!accessCurrent($event,readRecord($private.'/users/'.$customer.'.json')))throw new InvalidArgumentException('This code was replaced, used or expired. Do not send it.');
    if(preg_match('/[?&](customer|password|code|token)=/i',$receipt))throw new InvalidArgumentException('Use a message ID or permalink without credentials.');
    ownerAudit($private,$actor,$customer,'access-delivery-confirmed-'.$channel);
    $event['channels'][$channel]=['state'=>'owner-confirmed','at'=>gmdate('c'),'actor'=>$actor,'receipt'=>$receipt];saveRecord($path,$event);
   });
   header('Location: ?'.http_build_query(['action'=>'owner-access','customer'=>$customer,'event'=>$id]),true,303);exit;
  }
  if($action!=='owner-access'||$method!=='GET')jsonReply(['error'=>'Not found'],404);
  accessPage($private,$customer,$entry);
 }catch(InvalidArgumentException $e){http_response_code(400);accessPage($private,$customer,$entry,$e->getMessage());}
 catch(Throwable $e){jsonReply(['error'=>'The access update could not be completed. Open this customer again before retrying.'],503);}
}
function accessPage(string $private,string $customer,array $entry,string $error=''): never {
 $id=(string)($_GET['event']??$entry['record']['accessResetId']??'');$event=preg_match('/^[a-f0-9]{64}$/D',$id)?readRecord(accessDir($private).'/'.$id.'.json'):null;
 if($event&&$event['customer']!==$customer)$event=null;
 $active=$event&&accessCurrent($event,readRecord($private.'/users/'.$customer.'.json'));
 $messages=$active?accessMessages($event,accessOpen($private,$event['sealed'])['code']):null;
 $saved=$event['contact']??($entry['record']['deliveryContact']??[]);
 $_SESSION['accessIntent']=array_filter($_SESSION['accessIntent']??[],static fn($i)=>(int)$i['at']>time()-3600);
 $intent=bin2hex(random_bytes(32));$_SESSION['accessIntent'][$intent]=['customer'=>$customer,'at'=>time()];
 header('Content-Type: text/html; charset=utf-8');
 ?><!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="csrf-token" content="<?=h($_SESSION['csrf'])?>"><title>Customer access | WROC-LOVE</title><link rel="stylesheet" href="./owner-access.css?v=<?=substr(hash_file('sha256',__DIR__.'/owner-access.css'),0,12)?>"><script src="./owner-access.js?v=<?=substr(hash_file('sha256',__DIR__.'/owner-access.js'),0,12)?>" defer></script></head><body><header><a href="/owner-dashboard/">Owner dashboard</a><a href="?action=admin">All personal maps</a></header><main><p class="eyebrow">WROC-LOVE · Customer access</p><h1 dir="auto"><?=h((string)$entry['route']['title'])?></h1><p><?=h((string)$entry['record']['route'])?></p><a href="?action=album&amp;customer=<?=h($customer)?>">Open map and album as owner</a>
 <?php if($error!==''):?><p class="notice error" role="alert"><?=h($error)?></p><?php endif;?>
 <?php if($event):?><section><h2>Access reset and delivery</h2><p class="notice"><?= $active?'Access was reset. Previous sessions were signed out. The temporary code expires in 24 hours and must be changed at first sign-in.':'This temporary code has been used, replaced or expired. It is no longer available to send.'?></p><p>Created <?=h($event['createdAt'])?> · Code expires <?=h(gmdate('c',$event['expiresAt']))?></p>
 <?php foreach(['email'=>'Customer email','messenger'=>'Private Messenger','publicThread'=>'Public conversation'] as $channel=>$label):$state=$event['channels'][$channel];?>
 <article class="delivery"><h3><?=h($label)?> <span class="badge"><?=h($state['state']==='owner-confirmed'?'Sent, confirmed by owner':ucfirst(str_replace('-',' ',$state['state'])))?></span></h3><p dir="auto"><?=h((string)$event['contact'][$channel])?></p>
 <?php if($channel==='email'):?><p>Sender: WROC-LOVE<br>wroc.love121121@gmail.com</p><p class="muted">Automatic email is not connected. Send from the signed-in business Gmail account, then record the sent-message ID below.</p><?php elseif($channel==='messenger'):?><p class="muted">Send in the verified private conversation, then record the message receipt below.</p><?php else:?><p class="muted">The public update is available after private delivery is confirmed. It contains no code, username or private map link.</p><?php endif;?>
 <?php if($messages&&($channel!=='publicThread'||accessPrivateDelivered($event))&&$state['state']==='pending'):?>
 <?php if($channel==='email'):?><label>Email subject<input readonly value="<?=h($messages['subject'])?>"></label><?php endif;?>
 <label><?= $channel==='publicThread'?'Public update':'Private message, including map link and temporary code'?><textarea readonly id="copy-<?=h($channel)?>" rows="<?= $channel==='publicThread'?'3':'13'?>" dir="auto"><?=h($messages[$channel==='publicThread'?'public':'private'])?></textarea></label><button type="button" data-copy="copy-<?=h($channel)?>">Copy message</button>
 <?php endif;?>
 <?php if($channel!=='email'&&$event['contact'][$channel]!==''):?><a target="_blank" rel="noopener noreferrer" href="<?=h($event['contact'][$channel])?>">Open conversation</a><?php endif;?>
 <?php if($state['state']==='owner-confirmed'):?><p>Receipt: <?=h($state['receipt'])?><br><?=h($state['at'])?></p><?php elseif(($active||$channel==='publicThread')&&$state['state']!=='not-provided'&&($channel!=='publicThread'||accessPrivateDelivered($event))):?>
 <form method="post" action="?action=owner-access-confirm&amp;customer=<?=h($customer)?>"><input type="hidden" name="csrf" value="<?=h($_SESSION['csrf'])?>"><input type="hidden" name="event" value="<?=h($id)?>"><input type="hidden" name="channel" value="<?=h($channel)?>"><label>Sent-message ID or permalink<input name="receipt" required minlength="3" maxlength="500" autocomplete="off"></label><button>Confirm sent</button></form><?php endif;?></article><?php endforeach;?></section><?php endif;?>
 <section><h2><?= $event?'Create another temporary code':'Reset customer access'?></h2><p>The map, album and memories stay intact. Resetting signs out this customer on all devices. A different temporary four-digit code is generated for each reset.</p><form method="post" action="?action=owner-access-reset&amp;customer=<?=h($customer)?>"><input type="hidden" name="csrf" value="<?=h($_SESSION['csrf'])?>"><input type="hidden" name="intent" value="<?=h($intent)?>"><label>Verified customer username<input name="username" required maxlength="254" autocomplete="off" value="<?=h((string)($saved['username']??''))?>"></label><label>Customer email<input type="email" name="email" maxlength="254" value="<?=h((string)($saved['email']??''))?>"></label><label>Verified private Messenger conversation URL<input type="url" name="messenger" maxlength="2000" value="<?=h((string)($saved['messenger']??''))?>"></label><label>Existing public comment or conversation URL<input type="url" name="publicThread" maxlength="2000" value="<?=h((string)($saved['publicThread']??''))?>"></label><p>Customer language: <?=h((string)($entry['record']['language']??'Missing'))?></p><label class="check"><input type="checkbox" name="identityConfirmed" value="1" required>I verified that the username and private delivery destinations belong to this customer.</label><button class="reset">Reset access and prepare delivery</button></form></section><p id="copy-status" role="status"></p></main></body></html><?php exit;
}
