import unittest, tempfile, pathlib, subprocess, json, datetime
ROOT=pathlib.Path(__file__).resolve().parents[1]
PHP='/opt/homebrew/bin/php'

class BusinessReports(unittest.TestCase):
 def setUp(self):
  self.tmp=tempfile.TemporaryDirectory();self.base=pathlib.Path(self.tmp.name)
  self.catalog={'businessMapping':{'version':1,'labels':{'cafe':'Café','restaurant':'Restaurant','museum':'Museum','ice-cream':'Ice cream shop'},'places':{
   'both':{'name':'Multi-type venue','types':['cafe','restaurant']},'cafe-only':{'name':'Café','types':['cafe']},'museum-only':{'name':'Museum','types':['museum']}}}}
  (self.base/'catalog.json').write_text(json.dumps(self.catalog))
  for n in range(1,16):
   day=f'2026-10-{n:02}';rows={}
   events=[({'event':'place_open','canonical_place_id':'both','site_language':'en','product_id':'lifestyle-guide'},2),
           ({'event':'place_open','canonical_place_id':'cafe-only','site_language':'he','product_id':'lifestyle-guide'},3),
           ({'event':'place_open','canonical_place_id':'museum-only','site_language':'en','product_id':'cultural-adventure'},7),
           ({'event':'map_open','canonical_place_id':'both','site_language':'en'},11),
           ({'event':'place_open','site_language':'en'},5),
           ({'event':'navigation_click','canonical_place_id':'both','site_language':'en'},1),
           ({'event':'outbound_link_click','canonical_place_id':'both','link_type':'navigation','site_language':'en'},1)]
   for i,(d,c) in enumerate(events):rows[str(i)]={'dimensions':d,'count':c}
   (self.base/(day+'.json')).write_text(json.dumps({'date':day,'firstRecordedAt':day+'T10:00:00+00:00','updatedAt':day+'T12:00:00+00:00','rows':rows}))
  (self.base/'test-2026-10-15.json').write_text(json.dumps({'date':'2026-10-15','firstRecordedAt':'2026-10-15T10:00:00Z','rows':{'qa':{'dimensions':{'event':'place_open','canonical_place_id':'both'},'count':999}}}))
 def tearDown(self):self.tmp.cleanup()
 def report(self,selection=None,now='2026-10-16T00:10:00+02:00'):
  code="require $argv[1];require $argv[2];$c=json_decode(file_get_contents($argv[3]),true);echo json_encode(business_analytics_report($c,json_decode($argv[4],true),$argv[5],new DateTimeImmutable($argv[6])));"
  r=subprocess.run([PHP,'-r',code,str(ROOT/'bluehost-api/place-analytics.php'),str(ROOT/'bluehost-api/business-analytics.php'),str(self.base/'catalog.json'),json.dumps(selection or {}),str(self.base),now],capture_output=True,text=True)
  if r.returncode:raise RuntimeError(r.stderr)
  return json.loads(r.stdout)
 def test_true_type_place_language_map_filters_and_overlap(self):
  all=self.report();cafe=self.report({'type':'cafe'});rest=self.report({'type':'restaurant'});one=self.report({'type':'cafe','place':'both'})
  self.assertEqual(all['current']['start'],'2026-10-09');self.assertEqual(all['current']['end'],'2026-10-15')
  self.assertEqual(all['current']['totals']['place_open'],84)
  self.assertEqual(cafe['current']['totals']['place_open'],35)
  self.assertEqual(rest['current']['totals']['place_open'],14)
  self.assertEqual(one['current']['totals']['place_open'],14)
  self.assertEqual(self.report({'type':'cafe','language':'en'})['current']['totals']['place_open'],14)
  self.assertEqual(self.report({'type':'cafe','map':'cultural-adventure'})['current']['totals']['place_open'],0)
  self.assertNotIn('map_open',one['current']['totals'])
  self.assertEqual(one['current']['observed']['unassignedPlaceEvents'],35)
  self.assertEqual(one['current']['totals']['navigation_click'],7)
  self.assertIsNone(one['current']['users']);self.assertFalse(one['availability']['uniqueUsers'])
  self.assertTrue(one['comparable']);self.assertEqual(one['previous']['start'],'2026-10-02')
 def test_missing_is_not_zero_and_no_backfilled_history(self):
  long=self.report({'days':28});self.assertFalse(long['current']['complete']);self.assertIsNone(long['current']['totals'])
  self.assertIsNone(long['previous']['totals']);self.assertFalse(long['comparable']);self.assertEqual(long['firstFullDay'],'2026-10-02')
  (self.base/'2026-10-12.json').unlink();partial=self.report({'type':'cafe'})
  self.assertIsNone(partial['current']['totals']);self.assertIsNone(partial['current']['daily']['2026-10-12'])
  self.assertEqual(partial['current']['observed']['totals']['place_open'],30)
 def test_empty_classification_unavailable_and_validation(self):
  empty=self.report({'type':'ice-cream'});self.assertEqual(empty['selectedPlaceIds'],[]);self.assertIsNone(empty['current']['totals'])
  for s in [{'type':'invented'},{'place':'not-canonical'},{'type':'cafe','place':'museum-only'},{'end':'2026-10-16'},{'end':'2026-02-30'},{'days':1},{'language':'xx'},{'map':'private-user-map'}]:
   with self.assertRaises(RuntimeError):self.report(s)
 def test_corrupt_file_fails_closed(self):
  (self.base/'2026-10-12.json').write_text('{broken')
  with self.assertRaises(RuntimeError):self.report()

if __name__=='__main__':unittest.main()
