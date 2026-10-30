<?php
declare(strict_types=1);
// Public-place additions are isolated per authenticated customer, even when base routes are shared.
function nearbyPublicPlaces():array {static $places=null;if($places===null){$places=json_decode((string)file_get_contents(__DIR__.'/nearby-places.json'),true,512,JSON_THROW_ON_ERROR);}return $places;}
function nearbyRoutePlace(array $p,string $language):array {
 $l=fn($v)=>is_string($v)?$v:($v[$language]??$v['en']??'');
 $photos=array_map(fn($v)=>str_starts_with($v,'/')?'https://wroc-love.com'.$v:$v,$p['media']['photos']??[]);
 return ['id'=>$p['id'],'name'=>$l($p['name']),'localName'=>$p['localName']??'','description'=>$l($p['description']??''),'coordinates'=>$p['location']['coordinates'],'photos'=>$photos,'videos'=>$p['media']['videos']??[],'website'=>$p['links']['website']??'','guideVideos'=>$p['media']['guideVideos']??null];
}
function nearbyMerge(string $private,string $key,array $route,string $language='he'):array {
 $extra=readRecord($private.'/nearby-stops/'.$key.'.json');if(!$extra)return $route;$public=nearbyPublicPlaces();
 foreach($extra['stops']??[] as $item){$id=$item['id']??'';$day=$item['day']??-1;if(!isset($public[$id],$route['days'][$day]))continue;$ids=array_column(array_merge($route['days'][$day]['stops'],$route['days'][$day]['food']??[]),'placeId');if(in_array($id,$ids,true))continue;$route['places'][$id]=nearbyRoutePlace($public[$id],$language);$route['days'][$day]['stops'][]=['placeId'=>$id,'note'=>'','kind'=>'nearby'];}
 return $route;
}
function nearbyDispatch(string $private,string $key,?array $user,string $action,string $method):never {
 if(!$user||($user['mustChangePassword']??true))jsonReply(['error'=>'auth'],401);
 if($action!=='nearby-add'||$method!=='POST')jsonReply(['error'=>'invalid'],405);
 if(!csrfValid())jsonReply(['error'=>'auth'],403);
 $id=(string)($_POST['placeId']??'');$day=filter_var($_POST['day']??null,FILTER_VALIDATE_INT);$public=nearbyPublicPlaces();$p=$public[$id]??null;
 $reference=(string)($user['route']??'');if(!preg_match('/^WL-[A-Z0-9]{12}$/D',$reference))jsonReply(['error'=>'missing'],404);
 $route=readRecord($private.'/routes/'.$reference.'.json');if(!$route||$day===false||$day===null||$day<0||!isset($route['days'][$day])||!$p||in_array($p['status']??'',['private','hidden','excluded','deleted','rejected'],true))jsonReply(['error'=>'invalid'],400);
 $dir=$private.'/nearby-stops';if(!is_dir($dir)&&!mkdir($dir,0700,true)&&!is_dir($dir))jsonReply(['error'=>'storage'],500);
 $lock=fopen($dir.'/'.$key.'.lock','c');if(!$lock||!flock($lock,LOCK_EX))jsonReply(['error'=>'storage'],500);chmod($dir.'/'.$key.'.lock',0600);
 try{$state=readRecord($dir.'/'.$key.'.json')??['stops'=>[]];$current=nearbyMerge($private,$key,$route,$user['language']??'he');$ids=array_column(array_merge($current['days'][$day]['stops'],$current['days'][$day]['food']??[]),'placeId');$duplicate=count(array_intersect($ids,array_merge([$id],$p['aliases']??[])))>0;
 if(!$duplicate){if(count($state['stops'])>=100)jsonReply(['error'=>'limit'],400);$state['stops'][]=['id'=>$id,'day'=>$day];saveRecord($dir.'/'.$key.'.json',$state);}
 }finally{flock($lock,LOCK_UN);fclose($lock);}
 jsonReply(['ok'=>true,'duplicate'=>$duplicate,'route'=>nearbyMerge($private,$key,$route,$user['language']??'he')]);
}
