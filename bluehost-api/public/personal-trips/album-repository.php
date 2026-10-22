<?php
declare(strict_types=1);
/** Private owner-scoped storage. No caller-supplied paths or public asset URLs. */
final class AlbumRepository {
 public const TOTAL=209715200, IMAGE=15728640, VIDEO=62914560, COUNT=60;
 private string $dir; private array $route;
 public function __construct(string $private,string $owner,array $route) {
  if(!preg_match('/^[a-f0-9]{64}$/D',$owner))throw new RuntimeException('invalid');
  $this->route=$route;$ids=array_keys($route['places']);sort($ids);$scope=hash('sha256',(string)($route['_albumReference']??json_encode($ids,JSON_THROW_ON_ERROR)));$this->dir=$private.'/albums/'.$owner.'/'.$scope;
  foreach([$private.'/albums',$this->dir,$this->dir.'/media',$this->dir.'/revisions'] as $dir){if(!is_dir($dir)&&!mkdir($dir,0700,true)&&!is_dir($dir))throw new RuntimeException('storage');chmod($dir,0700);}
 }
 private function load():array {
  $path=$this->dir.'/album.json';if(!is_file($path))return ['version'=>0,'entries'=>[],'meta'=>['title'=>'','coverId'=>null]];
  $data=json_decode((string)file_get_contents($path),true,512,JSON_THROW_ON_ERROR);
  if(!is_array($data)||!isset($data['version'],$data['entries'],$data['meta'])||!is_array($data['entries']))throw new RuntimeException('storage');return $data;
 }
 private function save(array $data):void {
  $json=json_encode($data,JSON_UNESCAPED_UNICODE|JSON_THROW_ON_ERROR);$tmp=tempnam($this->dir,'.atomic-');if($tmp===false)throw new RuntimeException('storage');chmod($tmp,0600);
  try{if(file_put_contents($tmp,$json,LOCK_EX)===false)throw new RuntimeException('storage');
   // A recovery revision must persist before acknowledging the new manifest.
   $rev=$this->dir.'/revisions/'.sprintf('%02d',$data['version']%30).'.json';if(!copy($tmp,$rev))throw new RuntimeException('storage');chmod($rev,0600);
   if(!rename($tmp,$this->dir.'/album.json'))throw new RuntimeException('storage');
  }finally{if(is_file($tmp))unlink($tmp);}
 }
 private function lock(bool $write,callable $fn):mixed {
  $lock=fopen($this->dir.'/lock','c+');if(!$lock)throw new RuntimeException('storage');chmod($this->dir.'/lock',0600);
  try{if(!flock($lock,$write?LOCK_EX:LOCK_SH))throw new RuntimeException('storage');return $fn($this->load());}finally{flock($lock,LOCK_UN);fclose($lock);}
 }
 public function read():array {return $this->lock(false,fn($s)=>$this->present($s));}
 private function present(array $s):array {
  foreach($s['entries'] as &$e){if(isset($e['blob'])){$e['mediaUrl']='?action=album-media&id='.$e['id'];unset($e['blob']);}if(isset($e['posterBlob'])){$e['posterUrl']='?action=album-media&id='.$e['id'].'&poster=1';unset($e['posterBlob']);}}
  return $s;
 }
 private function text(mixed $v,int $max):string {if(!is_string($v)||!mb_check_encoding($v,'UTF-8')||mb_strlen($v)>$max)throw new RuntimeException('invalid');return trim($v);}
 private function membership(string $place,int $day):bool {if(!isset($this->route['places'][$place],$this->route['days'][$day]))return false;foreach(array_merge($this->route['days'][$day]['stops']??[],$this->route['days'][$day]['food']??[]) as $s)if(($s['placeId']??'')===$place)return true;return false;}
 private function fields(array $e):array {
  $date=$this->text($e['date']??'',10);if($date!==''&&(!preg_match('/^\d{4}-\d{2}-\d{2}$/D',$date)||date('Y-m-d',strtotime($date))!==$date))throw new RuntimeException('invalid');
  return ['caption'=>$this->text($e['caption']??'',500),'text'=>$this->text($e['text']??'',5000),'date'=>$date];
 }
 private function inspect(array $upload,bool $poster=false):array {
  $path=$upload['path'];$size=filesize($path);$mime=(new finfo(FILEINFO_MIME_TYPE))->file($path);
  $images=['image/jpeg'=>'jpg','image/png'=>'png','image/webp'=>'webp','image/gif'=>'gif'];$videos=['video/mp4'=>'mp4','video/quicktime'=>'mov','video/webm'=>'webm'];
  if(isset($images[$mime])){if($size>($poster?1048576:self::IMAGE))throw new RuntimeException('tooLarge');$g=getimagesize($path);if(!$g||$g[0]*$g[1]>60000000||($poster&&($g[0]>1920||$g[1]>1920)))throw new RuntimeException('unsupported');$type='image';$ext=$images[$mime];}
  elseif(!$poster&&isset($videos[$mime])){if($size>self::VIDEO)throw new RuntimeException('tooLarge');$prefix=file_get_contents($path,false,null,0,16);if(($mime==='video/webm'&&substr($prefix,0,4)!=="\x1a\x45\xdf\xa3")||($mime!=='video/webm'&&substr($prefix,4,4)!=='ftyp'))throw new RuntimeException('unsupported');$type='video';$ext=$videos[$mime];}
  else throw new RuntimeException('unsupported');if(!$size)throw new RuntimeException('unsupported');
  return ['path'=>$path,'size'=>$size,'type'=>$type,'mime'=>$mime,'digest'=>hash_file('sha256',$path),'ext'=>$ext];
 }
 private function keep(array $f):string {$name=$f['digest'].'.'.$f['ext'];$dest=$this->dir.'/media/'.$name;if(!is_file($dest)){if(!copy($f['path'],$dest))throw new RuntimeException('storage');chmod($dest,0600);}return $name;}
 public function mutate(int $version,string $op,array $input,?array $upload=null,?array $poster=null):array {
  $file=$upload?$this->inspect($upload):null;$thumb=$poster?$this->inspect($poster,true):null;
  return $this->lock(true,function($s)use($version,$op,$input,$file,$thumb){
   if($version!==$s['version'])throw new RuntimeException('conflict');$result=[];$entries=&$s['entries'];
   if($op==='add'){
    $id=(string)($input['id']??'');$place=(string)($input['placeId']??'');$day=$input['day']??null;
    if(!preg_match('/^[a-f0-9-]{36}$/D',$id)||!is_int($day)||!$this->membership($place,$day))throw new RuntimeException('invalid');
    foreach($entries as $e){if($e['id']===$id)return ['added'=>$id,'version'=>$s['version']];if($file&&!isset($e['deletedAt'])&&$e['placeId']===$place&&($e['fingerprint']??'')===$file['digest'])return ['duplicate'=>$e['id'],'version'=>$s['version']];}
    if(count(array_filter($entries,fn($e)=>!isset($e['deletedAt'])))>=self::COUNT||count($entries)>=300)throw new RuntimeException('quota');
    $bytes=max(array_sum(array_map(fn($e)=>($e['file']['size']??0)+($e['poster']['size']??0),$entries)),array_sum(array_map('filesize',glob($this->dir.'/media/*')?:[])));if($bytes+($file['size']??0)+($thumb['size']??0)>self::TOTAL)throw new RuntimeException('quota');
    $e=$this->fields($input)+['id'=>$id,'placeId'=>$place,'day'=>$day,'order'=>count($entries),'createdAt'=>(int)round(microtime(true)*1000),'included'=>true,'type'=>$file?$file['type']:'note'];
    if(!$file&&$e['caption']===''&&$e['text']==='')throw new RuntimeException('emptyNote');
    if($file){$filename=$this->text($input['filename']??'memory',255);$e['blob']=$this->keep($file);$e['file']=['size'=>$file['size'],'type'=>$file['mime']];$e['filename']=$filename;$e['fingerprint']=$file['digest'];if($thumb){$e['posterBlob']=$this->keep($thumb);$e['poster']=['size'=>$thumb['size'],'type'=>$thumb['mime']];}}
    $entries[]=$e;$result=['added'=>$id];
   }elseif($op==='patch'){
    $found=false;foreach($entries as &$e){if($e['id']!==($input['id']??''))continue;$found=true;$values=$input['values']??[];if(!is_array($values))throw new RuntimeException('invalid');$fields=$this->fields(array_merge($e,array_intersect_key($values,array_flip(['caption','text','date']))));$e=array_merge($e,$fields);if(isset($values['included'])){if(!is_bool($values['included']))throw new RuntimeException('invalid');$e['included']=$values['included'];}if(isset($values['deletedAt']))$e['deletedAt']=(int)round(microtime(true)*1000);break;}unset($e);if(!$found)throw new RuntimeException('missing');
   }elseif($op==='meta'){
    if(array_key_exists('title',$input))$s['meta']['title']=$this->text($input['title'],100);
    if(array_key_exists('coverId',$input)){$valid=$input['coverId']===null;foreach($entries as $e)if($e['id']===$input['coverId']&&$e['type']==='image'&&!isset($e['deletedAt']))$valid=true;if(!$valid)throw new RuntimeException('invalid');$s['meta']['coverId']=$input['coverId'];}
   }elseif($op==='move'){
    $id=$input['id']??'';$delta=$input['delta']??0;if(!in_array($delta,[-1,1],true))throw new RuntimeException('invalid');$current=null;foreach($entries as $e)if($e['id']===$id&&!isset($e['deletedAt']))$current=$e;if(!$current)throw new RuntimeException('missing');$group=array_values(array_filter($entries,fn($e)=>$e['day']===$current['day']&&!isset($e['deletedAt'])));usort($group,fn($a,$b)=>$a['order']<=>$b['order']?:$a['createdAt']<=>$b['createdAt']?:strcmp($a['id'],$b['id']));$i=array_search($id,array_column($group,'id'));if(isset($group[$i+$delta])){[$group[$i],$group[$i+$delta]]=[$group[$i+$delta],$group[$i]];$orders=array_flip(array_column($group,'id'));foreach($entries as &$e)if(isset($orders[$e['id']]))$e['order']=$orders[$e['id']];unset($e);}
   }elseif($op==='restore'){$idx=null;foreach($entries as $i=>$e)if(isset($e['deletedAt'])&&($idx===null||$e['deletedAt']>$entries[$idx]['deletedAt']))$idx=$i;if($idx!==null){if(count(array_filter($entries,fn($e)=>!isset($e['deletedAt'])))>=self::COUNT)throw new RuntimeException('quota');unset($entries[$idx]['deletedAt']);}}
   else throw new RuntimeException('invalid');
   $s['version']++;$this->save($s);return $result+['version'=>$s['version']];
  });
 }
 public function media(string $id,bool $poster=false):array {return $this->lock(false,function($s)use($id,$poster){foreach($s['entries'] as $e)if($e['id']===$id&&!isset($e['deletedAt'])){$blob=$e[$poster?'posterBlob':'blob']??'';if(!preg_match('/^[a-f0-9]{64}\.(jpg|png|webp|gif|mp4|mov|webm)$/D',$blob))break;$p=$this->dir.'/media/'.$blob;if(!is_file($p))throw new RuntimeException('missing');return ['path'=>$p,'mime'=>$e[$poster?'poster':'file']['type'],'filename'=>$e['filename']??'memory'];}throw new RuntimeException('missing');});}
 public function export():string {
  return $this->lock(false,function($s){if(!class_exists('ZipArchive'))throw new RuntimeException('storage');$path=tempnam($this->dir,'.export-');chmod($path,0600);$zip=new ZipArchive();if($zip->open($path,ZipArchive::OVERWRITE)!==true)throw new RuntimeException('storage');$clean=$s;
   foreach($clean['entries'] as &$e){foreach(['blob','posterBlob'] as $field){if(isset($e[$field])){$name=$e[$field];$zip->addFile($this->dir.'/media/'.$name,'media/'.$name);$e[$field]='media/'.$name;}}}unset($e);$zip->addFromString('album.json',json_encode($clean,JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT|JSON_THROW_ON_ERROR));$zip->addFromString('README.txt',"Private WROC-LOVE album backup. album.json contains captions, stories, place IDs, days and ordering. media/ contains originals and previews. Keep this archive private.\n");if(!$zip->close())throw new RuntimeException('storage');return $path;});
 }
}
