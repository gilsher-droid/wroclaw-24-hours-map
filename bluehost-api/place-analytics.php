<?php
declare(strict_types=1);
// Aggregate counters only. No addresses, IPs, cookies, questions or customer IDs are stored.
function place_analytics_events(): array {
    return ['page_view','map_open','place_open','experience_open','interactive_maps_click','news_ticker_click','outbound_link_click','place_impression','photo_open','photo_view','video_open','guide_open','video_start','video_progress','video_complete','ai_open','ai_service_click','nearby_open','nearby_search','navigation_click','social_click','booking_click','personal_map_request','community_submit','place_save'];
}
function place_analytics_clean(array $event, array $catalog): ?array {
    if (!is_string($event['event']??null) || !in_array($event['event'],place_analytics_events(),true)) return null;
    $row=['event'=>$event['event']];
    $sets=[
        'site_language'=>['he','en','pl','de','cs'],
        'provider'=>['chatgpt','gemini','facebook','instagram','youtube'],
        'media_kind'=>['guide','visit'],
        'link_type'=>['social','navigation','official_site','booking'],
        'radius_band'=>['up-to-500','501-1000','over-1000'],
        'traffic_source'=>['direct','google','facebook','instagram','bing','youtube','other'],
        'source_surface'=>['website','map','nearby','experiences','personal_trip','experience_map','map_nearby','guided_map','guided_map_deeplink','news_ticker','product_navigation','map_product','campaign_landing','homepage'],
    ];
    foreach($sets as $key=>$values) if(is_string($event[$key]??null)&&in_array($event[$key],$values,true)) $row[$key]=$event[$key];
    foreach(['canonical_place_id'=>'places','canonical_experience_id'=>'experiences'] as $key=>$group) {
        $id=$event[$key]??'';
        if(is_string($id)&&isset($catalog[$group][$id])) $row[$key]=$id;
    }
    $product=$event['product_id']??'';
    if(is_string($product)&&in_array($product,['wroclaw-24-hours','wroclaw-four-days','wroclaw-christmas','lifestyle-guide','lower-silesia-excursions','cultural-adventure','guided-city-map'],true)) $row['product_id']=$product;
    $category=$event['category']??'';
    if(is_string($category)&&in_array($category,['all','eat','coffee','drink','museums','sights','parks','waterside','dwarfs','shopping','heritage','question-0','question-1','question-2','question-3','question-4'],true)) $row['category']=$category;
    if(in_array((int)($event['video_percent']??0),[25,50,75,100],true)) $row['video_percent']=(int)$event['video_percent'];
    $row['site_language']=$row['site_language']??'he';
    ksort($row);return $row;
}
function place_analytics_dir(): string { return __DIR__.'/place-analytics-state'; }
function place_analytics_write(array $rows, bool $test=false, ?string $directory=null): void {
    $directory=$directory??place_analytics_dir();
    if(!is_dir($directory)&&!@mkdir($directory,0700,true)&&!is_dir($directory)) throw new RuntimeException('Storage unavailable');
    $day=(new DateTimeImmutable('now',new DateTimeZone('Europe/Warsaw')))->format('Y-m-d');
    $path=$directory.'/'.($test?'test-':'').$day.'.json';
    $file=fopen($directory.'/.write.lock','c+');if(!$file||!flock($file,LOCK_EX)) throw new RuntimeException('Storage unavailable');
    try {
        $raw=is_file($path)?file_get_contents($path):'';
        if($raw!==''&&($value=json_decode($raw,true))===null) throw new RuntimeException('Corrupt aggregate');
        $value=$raw!==''?$value:['date'=>$day,'firstRecordedAt'=>gmdate('c'),'rows'=>[]];
        if(count($value['rows'])+count($rows)>50000) throw new RuntimeException('Daily capacity reached');
        foreach($rows as $row) {
            $key=hash('sha256',json_encode($row));
            if(!isset($value['rows'][$key])) $value['rows'][$key]=['dimensions'=>$row,'count'=>0];
            $value['rows'][$key]['count']++;
        }
        $value['updatedAt']=gmdate('c');$json=json_encode($value,JSON_THROW_ON_ERROR);
        $temp=tempnam($directory,'.aggregate-');if($temp===false) throw new RuntimeException('Storage unavailable');
        try {if(file_put_contents($temp,$json)!==strlen($json)||!chmod($temp,0600)||!rename($temp,$path)) throw new RuntimeException('Storage unavailable');} finally {if(is_file($temp)) unlink($temp);}
    } finally {flock($file,LOCK_UN);fclose($file);}
    // Keep 90 completed Warsaw calendar days, plus today. Tests are separate counters.
    $cutoff=(new DateTimeImmutable('today',new DateTimeZone('Europe/Warsaw')))->modify('-90 days')->format('Y-m-d');
    foreach(glob($directory.'/*.json')?:[] as $old) if(preg_match('/^(?:test-)?(\d{4}-\d{2}-\d{2})\.json$/',basename($old),$m)&&$m[1]<$cutoff) @unlink($old);
}
function place_analytics_report(int $days=7, ?string $directory=null, bool $test=false): array {
    $directory=$directory??place_analytics_dir();$rows=[];$totals=[];$daily=[];$first=null;$updated=null;
    $start=(new DateTimeImmutable('today',new DateTimeZone('Europe/Warsaw')))->modify('-'.($days-1).' days')->format('Y-m-d');
    foreach(glob($directory.'/*.json')?:[] as $file) {
        if(!preg_match($test?'/^test-(\d{4}-\d{2}-\d{2})\.json$/':'/^(\d{4}-\d{2}-\d{2})\.json$/',basename($file),$m)||$m[1]<$start||$m[1]>(new DateTimeImmutable('today',new DateTimeZone('Europe/Warsaw')))->format('Y-m-d')) continue;
        $handle=fopen($file,'r');if(!$handle||!flock($handle,LOCK_SH)) throw new RuntimeException('Report unavailable');
        try {$day=json_decode(stream_get_contents($handle),true,512,JSON_THROW_ON_ERROR);} finally {flock($handle,LOCK_UN);fclose($handle);}
        $first=$first===null?$day['firstRecordedAt']:min($first,$day['firstRecordedAt']);$updated=$updated===null?$day['updatedAt']:max($updated,$day['updatedAt']);
        foreach($day['rows'] as $key=>$r) {
            $r['count']=(int)$r['count'];
            if(!isset($rows[$key])) $rows[$key]=['dimensions'=>$r['dimensions'],'count'=>0];
            $rows[$key]['count']+=$r['count'];$event=$r['dimensions']['event'];
            $totals[$event]=($totals[$event]??0)+$r['count'];$daily[$m[1]][$event]=($daily[$m[1]][$event]??0)+$r['count'];
        }
    }
    return ['schema'=>1,'test'=>$test,'source'=>'First-party consented event counters','timezone'=>'Europe/Warsaw','days'=>$days,'start'=>$start,'end'=>(new DateTimeImmutable('now',new DateTimeZone('Europe/Warsaw')))->format('Y-m-d'),'firstRecordedAt'=>$first,'updatedAt'=>$updated,'generatedAt'=>gmdate('c'),'totals'=>$totals,'daily'=>$daily,'rows'=>array_values($rows)];
}
