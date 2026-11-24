<?php
declare(strict_types=1);
/** First-party aggregate counters. All identity and map scope come from authenticated server records. */
final class PersonalMapUsage {
 public const WINDOW=1800;
 private string $dir;
 public function __construct(string $private) {
  $this->dir=$private.'/map-usage';
  if(!is_dir($this->dir)&&!mkdir($this->dir,0700,true)&&!is_dir($this->dir))throw new RuntimeException('usage storage');
  chmod($this->dir,0700);
 }
 public static function scope(string $account,string $reference): string {
  if(!preg_match('/^[a-f0-9]{64}$/D',$account)||!preg_match('/^WL-[A-Z0-9]{12}$/D',$reference))throw new RuntimeException('usage scope');
  return hash('sha256',$account.'|'.$reference);
 }
 private function locked(string $name,bool $write,callable $fn): mixed {
  $lock=fopen($this->dir.'/'.$name.'.lock','c+');if(!$lock)throw new RuntimeException('usage storage');chmod($this->dir.'/'.$name.'.lock',0600);
  try{if(!flock($lock,$write?LOCK_EX:LOCK_SH))throw new RuntimeException('usage lock');return $fn();}finally{flock($lock,LOCK_UN);fclose($lock);}
 }
 private function load(string $name): ?array {
  $path=$this->dir.'/'.$name.'.json';if(!is_file($path))return null;
  if(filesize($path)>16384)throw new RuntimeException('usage storage');
  $data=json_decode((string)file_get_contents($path),true,16,JSON_THROW_ON_ERROR);if(!is_array($data))throw new RuntimeException('usage storage');return $data;
 }
 private function save(string $name,array $data): void {
  $json=json_encode($data,JSON_THROW_ON_ERROR);if(strlen($json)>16384)throw new RuntimeException('usage bound');
  $tmp=tempnam($this->dir,'.atomic-');if(!$tmp)throw new RuntimeException('usage storage');chmod($tmp,0600);
  try{if(file_put_contents($tmp,$json)!==strlen($json)||!rename($tmp,$this->dir.'/'.$name.'.json'))throw new RuntimeException('usage storage');}finally{if(is_file($tmp))unlink($tmp);}
 }
 public function activation(): ?array {
  return $this->locked('activation',false,function(){
   $a=$this->load('activation');if($a===null)return null;
   if(($a['version']??null)!==1||!is_int($a['startedAt']??null)||$a['startedAt']<1||!is_array($a['excluded']??null)||count($a['excluded'])>100)throw new RuntimeException('usage configuration');
   foreach($a['excluded'] as $scope=>$class)if(!preg_match('/^[a-f0-9]{64}$/D',(string)$scope)||!in_array($class,['demo','test'],true))throw new RuntimeException('usage configuration');return $a;
  });
 }
 public function activate(array $excluded,int $now): array {
  if(count($excluded)>100||$now<1)throw new RuntimeException('usage configuration');
  foreach($excluded as $scope=>$class)if(!preg_match('/^[a-f0-9]{64}$/D',(string)$scope)||!in_array($class,['demo','test'],true))throw new RuntimeException('usage configuration');
  return $this->locked('activation',true,function()use($excluded,$now){$old=$this->load('activation');if($old!==null)return $old;$state=['version'=>1,'startedAt'=>$now,'excluded'=>$excluded];$this->save('activation',$state);return $state;});
 }
 private function emptyBucket(): array {return ['count'=>0,'firstAt'=>null,'lastAt'=>null];}
 private function readState(string $scope): array {
  $state=$this->load($scope)??['version'=>1,'customer'=>$this->emptyBucket(),'owner'=>$this->emptyBucket(),'excluded'=>$this->emptyBucket()];
  if(($state['version']??null)!==1)throw new RuntimeException('usage state');
  foreach(['customer','owner','excluded'] as $class){$b=$state[$class]??null;if(!is_array($b)||!is_int($b['count']??null)||$b['count']<0||$b['count']>1000000000)throw new RuntimeException('usage state');if($b['count']===0){if(($b['firstAt']??null)!==null||($b['lastAt']??null)!==null)throw new RuntimeException('usage state');}elseif(!is_int($b['firstAt']??null)||!is_int($b['lastAt']??null)||$b['firstAt']<1||$b['lastAt']<$b['firstAt'])throw new RuntimeException('usage state');}
  return $state;
 }
 public function record(string $account,array $mapUser,array $actor,int $now): void {
  $scope=self::scope($account,(string)($mapUser['route']??''));$a=$this->activation();if($a===null||$now<$a['startedAt'])return;
  $class=isOwnerAdmin($actor)?'owner':(isset($a['excluded'][$scope])?'excluded':'customer');
  $this->locked($scope,true,function()use($scope,$class,$now){$s=$this->readState($scope);$b=&$s[$class];if($b['lastAt']!==null&&$now<$b['lastAt']+self::WINDOW)return;if($b['count']>=1000000000)throw new RuntimeException('usage bound');$b['count']++;$b['firstAt']??=$now;$b['lastAt']=$now;$this->save($scope,$s);});
 }
 public function summary(string $account,string $reference): array {
  $scope=self::scope($account,$reference);$a=$this->activation();
  return ['activation'=>$a,'classification'=>$a['excluded'][$scope]??'customer','counters'=>$this->locked($scope,false,fn()=>$this->readState($scope))];
 }
}
function personalUsageToken(string $private,string $account,array $mapUser): string {
 $scope=PersonalMapUsage::scope($account,(string)($mapUser['route']??''));
 return hash_hmac('sha256',$scope.'|'.(string)$_SESSION['csrf'],(string)file_get_contents($private.'/server-key'));
}
function personalUsageActivate(string $private,string $key,?array $user,string $method): never {
 if(!$user||!isOwnerAdmin($user)||($user['mustChangePassword']??true))jsonReply(['error'=>'owner required'],403);
 if($method!=='POST')jsonReply(['error'=>'invalid'],405);
 if(!csrfValid())jsonReply(['error'=>'csrf'],403);
 $excluded=[];$input=$_POST['excluded']??[];if(!is_array($input)||count($input)>100)jsonReply(['error'=>'invalid'],400);
 foreach($input as $account){if(!is_string($account)||!($entry=ownerCustomer($private,$account)))jsonReply(['error'=>'invalid map'],400);$excluded[PersonalMapUsage::scope($account,(string)$entry['record']['route'])]='demo';}
 try{(new PersonalMapUsage($private))->activate($excluded,time());}catch(Throwable){jsonReply(['error'=>'usage unavailable'],503);}
 header('Location: ?action=admin',true,303);exit;
}
function personalUsageHtml(?array $summary): void {
 if($summary===null){echo '<p role="status">Usage measurement unavailable. No zero-use claim is made.</p>';return;}
 $a=$summary['activation'];if($a===null){echo '<p>Usage measurement has not started.</p>';return;}
 $date=gmdate('Y-m-d H:i:s',$a['startedAt']).' UTC';$stats=$summary['counters'];
 if($summary['classification']!=='customer'){echo '<p><strong>Demo / test map. Excluded from customer opening counts.</strong></p>';}
 else{$b=$stats['customer'];if($b['count']===0)echo '<p>No customer opening measured since '.h($date).'.</p>';else{echo '<dl><dt>Measured customer openings</dt><dd>'.(int)$b['count'].'</dd><dt>First measured opening</dt><dd>'.h(gmdate('Y-m-d H:i:s',$b['firstAt']).' UTC').'</dd><dt>Last measured opening</dt><dd>'.h(gmdate('Y-m-d H:i:s',$b['lastAt']).' UTC').'</dd></dl>';}}
 echo '<p>Owner openings (separate): '.(int)$stats['owner']['count'].'</p>';
 if($summary['classification']!=='customer')echo '<p>Demo / test openings (separate): '.(int)$stats['excluded']['count'].'</p>';
}
