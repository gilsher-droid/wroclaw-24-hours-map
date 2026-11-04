import unittest, tempfile, pathlib, subprocess, shutil, json, urllib.request, urllib.error, socket, time, concurrent.futures
ROOT=pathlib.Path(__file__).resolve().parents[1]
PHP=shutil.which('php') or '/opt/homebrew/bin/php'
class Counters(unittest.TestCase):
 @classmethod
 def setUpClass(cls):
  cls.tmp=tempfile.TemporaryDirectory();cls.base=pathlib.Path(cls.tmp.name);public=cls.base/'public';public.mkdir()
  shutil.copy(ROOT/'bluehost-api/place-analytics.php',cls.base)
  shutil.copytree(ROOT/'bluehost-api/public/place-events',public/'place-events')
  (public/'report.php').write_text("<?php require dirname(__DIR__).'/place-analytics.php'; echo json_encode(place_analytics_report(7,null,isset($_GET['test'])));")
  shutil.copy(ROOT/'bluehost-api/owner-dashboard/place-report.php',public/'protected.php')
  sock=socket.socket();sock.bind(('127.0.0.1',0));port=sock.getsockname()[1];sock.close();cls.url=f'http://127.0.0.1:{port}'
  cls.server=subprocess.Popen([PHP,'-S',f'127.0.0.1:{port}','-t',str(public)],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
  for _ in range(100):
   try:urllib.request.urlopen(cls.url+'/report.php');break
   except OSError:time.sleep(.02)
 @classmethod
 def tearDownClass(cls):cls.server.terminate();cls.server.wait();cls.tmp.cleanup()
 def request(self,body=None,origin='https://wroc-love.com',path='/place-events/'):
  data=json.dumps(body).encode() if body is not None else None
  request=urllib.request.Request(self.url+path,data=data,headers={'Origin':origin,'Content-Type':'text/plain;charset=UTF-8'})
  try:
   with urllib.request.urlopen(request) as r:return r.status,r.read(),r.headers
  except urllib.error.HTTPError as r:return r.code,r.read(),r.headers
 def test_validation_privacy_and_isolated_reports(self):
  event={'event':'ai_open','canonical_place_id':'opera','site_language':'en','question':'SECRET','email':'secret@example.com','latitude':51.1}
  body={'version':1,'consent':True,'events':[event],'test':True}
  self.assertEqual(self.request(body,origin='https://attacker.example')[0],403)
  self.assertEqual(self.request({**body,'consent':False})[0],400)
  self.assertEqual(self.request({**body,'events':[{'event':'unknown'}]})[0],400)
  self.assertEqual(self.request({**body,'events':[event]*21})[0],400)
  self.assertEqual(self.request({**body,'garbage':'x'*16001})[0],413)
  status,_,headers=self.request(body);self.assertEqual(status,204);self.assertEqual(headers['Access-Control-Allow-Origin'],'https://wroc-love.com')
  test=json.loads(self.request(path='/report.php?test=1')[1]);self.assertEqual(test['totals']['ai_open'],1);self.assertTrue(test['test'])
  prod=json.loads(self.request(path='/report.php')[1]);self.assertNotIn('ai_open',prod['totals'])
  raw=''.join(p.read_text() for p in (self.base/'place-analytics-state').glob('*.json'));self.assertNotIn('SECRET',raw);self.assertNotIn('secret@example',raw);self.assertNotIn('latitude',raw)
  self.assertEqual(self.request(path='/protected.php')[0],401)
 def test_concurrent_writers_do_not_lose_counts(self):
  code="require $argv[1];for($i=0;$i<25;$i++)place_analytics_write([['event'=>'place_open','site_language'=>'he']],false,$argv[2]);"
  with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:list(pool.map(lambda _:subprocess.run([PHP,'-r',code,str(self.base/'place-analytics.php'),str(self.base/'concurrent')],check=True),range(4)))
  data=json.loads(next((self.base/'concurrent').glob('*.json')).read_text());self.assertEqual(sum(r['count'] for r in data['rows'].values()),100)
if __name__=='__main__':unittest.main()
