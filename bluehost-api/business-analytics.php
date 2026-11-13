<?php
declare(strict_types=1);
// Read existing consented, anonymous aggregate files. Never infer users from counts.
function business_analytics_report(array $catalog, array $selection=[], ?string $directory=null, ?DateTimeImmutable $now=null): array {
    $mapping=$catalog['businessMapping']??null;
    if(($mapping['version']??null)!==1) throw new RuntimeException('Business mapping unavailable');
    $directory=$directory??place_analytics_dir();
    $now=($now??new DateTimeImmutable('now',new DateTimeZone('Europe/Warsaw')))->setTimezone(new DateTimeZone('Europe/Warsaw'));
    $today=$now->setTime(0,0);$last=$today->modify('-1 day')->format('Y-m-d');
    $days=(int)($selection['days']??7);$end=$selection['end']??$last;
    $type=$selection['type']??'all';$place=$selection['place']??'';$lang=$selection['language']??'';$map=$selection['map']??'';
    if(!in_array($days,[7,28,90],true)||!is_string($end)||!preg_match('/^\d{4}-\d{2}-\d{2}$/D',$end)||$end>$last) throw new InvalidArgumentException('Invalid completed window');
    $endDate=DateTimeImmutable::createFromFormat('!Y-m-d',$end,new DateTimeZone('Europe/Warsaw'));
    if(!$endDate||$endDate->format('Y-m-d')!==$end) throw new InvalidArgumentException('Invalid end date');
    if(!is_string($type)||($type!=='all'&&!isset($mapping['labels'][$type]))) throw new InvalidArgumentException('Invalid business type');
    if(!is_string($place)||($place!==''&&!isset($mapping['places'][$place]))) throw new InvalidArgumentException('Invalid canonical place');
    if(!is_string($lang)||!in_array($lang,['','he','en','pl','de','cs'],true)) throw new InvalidArgumentException('Invalid language');
    if(!is_string($map)||($map!==''&&!in_array($map,['wroclaw-24-hours','wroclaw-four-days','wroclaw-christmas','lifestyle-guide','lower-silesia-excursions','cultural-adventure','guided-city-map'],true))) throw new InvalidArgumentException('Invalid map');
    $members=array_filter($mapping['places'],fn($p)=>$type==='all'||in_array($type,$p['types'],true));
    if($place!==''&&!isset($members[$place])) throw new InvalidArgumentException('Place outside selected type');
    $start=$endDate->modify('-'.($days-1).' days')->format('Y-m-d');
    $previousEnd=$endDate->modify('-'.$days.' days');$previousStart=$previousEnd->modify('-'.($days-1).' days')->format('Y-m-d');
    $files=[];$first=null;$updated=null;
    foreach(glob($directory.'/*.json')?:[] as $file) {
        if(!preg_match('/^(\d{4}-\d{2}-\d{2})\.json$/D',basename($file),$m)) continue; // test-* is never business traffic
        $handle=fopen($file,'r');if(!$handle||!flock($handle,LOCK_SH)) throw new RuntimeException('Report unavailable');
        try {$data=json_decode(stream_get_contents($handle),true,512,JSON_THROW_ON_ERROR);} finally {flock($handle,LOCK_UN);fclose($handle);}
        if(($data['date']??null)!==$m[1]||!is_array($data['rows']??null)||!is_string($data['firstRecordedAt']??null)) throw new RuntimeException('Invalid aggregate');
        $first=$first===null?$data['firstRecordedAt']:min($first,$data['firstRecordedAt']);
        if($m[1]<=$end) $updated=$updated===null?($data['updatedAt']??null):max($updated,$data['updatedAt']??'');
        if($m[1]>=$previousStart&&$m[1]<=$end)$files[$m[1]]=$data;
    }
    // Protected deployment metadata preserves the verified earliest observation after retention rolls over.
    // It does not assert that a missing daily file had zero activity.
    $coveragePath=$directory.'/business-coverage.json';
    if(is_file($coveragePath)) {
        $coverage=json_decode(file_get_contents($coveragePath),true,512,JSON_THROW_ON_ERROR);
        $known=$coverage['firstRecordedAt']??null;
        if(!is_string($known)||!preg_match('/^\d{4}-\d{2}-\d{2}T/', $known))throw new RuntimeException('Invalid coverage metadata');
        new DateTimeImmutable($known);
        $first=$first===null?$known:min($first,$known);
    }
    $firstFullDay=$first?(new DateTimeImmutable($first))->setTimezone(new DateTimeZone('Europe/Warsaw'))->modify('+1 day')->format('Y-m-d'):null;
    $keys=['place_impression','place_open','outbound_link_click','navigation_click'];
    $window=function(string $a,string $b) use($files,$firstFullDay,$keys,$members,$place,$lang,$map,$mapping) {
        $counts=array_fill_keys($keys,0);$website=array_fill_keys(array_merge($keys,['map_open','page_view']),0);$daily=[];$leaders=[];$missing=[];$unassigned=0;$recordDates=[];
        for($d=new DateTimeImmutable($a);$d->format('Y-m-d')<=$b;$d=$d->modify('+1 day')) {
            $date=$d->format('Y-m-d');$daily[$date]=null;
            if(!isset($files[$date])){$missing[]=$date;continue;}
            $recordDates[]=$date;$daily[$date]=array_fill_keys($keys,0);
            foreach($files[$date]['rows'] as $r) {
                $v=$r['dimensions']??[];$n=$r['count']??null;
                if(!is_int($n)||$n<0||!is_string($v['event']??null))throw new RuntimeException('Invalid aggregate row');
                if(($lang!==''&&($v['site_language']??'')!==$lang)||($map!==''&&($v['product_id']??'')!==$map))continue;
                $e=$v['event'];if(array_key_exists($e,$website))$website[$e]+=$n;
                if(!in_array($e,$keys,true))continue; // a map opening is never a business/place opening
                $id=$v['canonical_place_id']??'';
                if(!isset($mapping['places'][$id])){$unassigned+=$n;continue;}
                if(!isset($members[$id])||($place!==''&&$id!==$place))continue;
                $counts[$e]+=$n;$daily[$date][$e]+=$n;
                if(!isset($leaders[$id]))$leaders[$id]=['id'=>$id,'name'=>$mapping['places'][$id]['name'],'events'=>array_fill_keys($keys,0)];
                $leaders[$id]['events'][$e]+=$n;
            }
        }
        $complete=$firstFullDay!==null&&$a>=$firstFullDay&&!$missing&&count($members)>0;
        usort($leaders,fn($a,$b)=>($b['events']['place_open']<=>$a['events']['place_open'])?:strcmp($a['id'],$b['id']));
        return ['start'=>$a,'end'=>$b,'complete'=>$complete,'missingDays'=>$missing,'totals'=>$complete?$counts:null,'websiteTotals'=>$complete?$website:null,
          'observed'=>['totals'=>$members?$counts:array_fill_keys($keys,null),'websiteTotals'=>$website,'recordedDates'=>$recordDates,'leaders'=>array_values($leaders),'unassignedPlaceEvents'=>$unassigned],
          'daily'=>$daily,'users'=>null,'reason'=>$complete?null:(!$members?'No data available: no canonical places have an explicit classification for this business type.':'No data available for the complete selected window. Recorded subsets below are partial, not full-window totals.')];
    };
    $current=$window($start,$end);$previous=$window($previousStart,$previousEnd->format('Y-m-d'));
    return ['schema'=>2,'source'=>'First-party consented event counters','timezone'=>'Europe/Warsaw','generatedAt'=>gmdate('c'),'updatedAt'=>$updated,
      'firstRecordedAt'=>$first,'firstFullDay'=>$firstFullDay,'days'=>$days,'selection'=>['type'=>$type,'place'=>$place,'language'=>$lang,'map'=>$map],
      'current'=>$current,'previous'=>$previous,'comparable'=>$current['complete']&&$previous['complete'],
      'businessMapping'=>$mapping,'selectedPlaceIds'=>array_keys($place!==''?[$place=>$members[$place]]:$members),
      'availability'=>['uniqueUsers'=>false,'countries'=>false,'campaigns'=>false,'trafficSources'=>'Only coarse tagged-link source is stored; no session attribution report is provided'],
      'notes'=>['No user identifiers are stored. Unique users cannot be derived or summed.','Map openings are site/map activity, not attributed to a business.','Outbound clicks include navigation clicks; never add the two metrics.','Missing daily records and time before collection are unavailable, not zero.','Classification uses the current canonical catalog; multi-category places count once per selection. Category totals overlap.','Test counters and private customer maps are excluded. No physical visit, booking, purchase or customer is measured.']];
}
