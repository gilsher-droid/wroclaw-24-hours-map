"""Only synthetic accounts and maps. Exercise actual PHP authorization, scope and private aggregate storage."""
import hashlib, importlib.util, json, pathlib, shutil, subprocess, unittest, urllib.request, http.cookiejar, re, concurrent.futures
from urllib.parse import urlencode
spec=importlib.util.spec_from_file_location('owners',pathlib.Path(__file__).with_name('personal-trip-owner-admin.test.py'))
m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
class Usage(unittest.TestCase):
 setUpClass=classmethod(m.OwnerAccess.setUpClass.__func__)
 tearDownClass=classmethod(m.OwnerAccess.tearDownClass.__func__)
 req=m.OwnerAccess.req
 login=m.OwnerAccess.login
 key=m.OwnerAccess.key
 get=m.OwnerAccess.get
 def setUp(self):
  m.OwnerAccess.setUp(self)
  self.folder=self.private/'map-usage'
  if self.folder.exists():shutil.rmtree(self.folder)
  self.before={f.name:f.read_bytes() for f in (self.private/'users').glob('*.json')}
  self.csrf=self.login(self.client,'owner')
 def post(self,action,values=None,headers=None,client=None):
  return self.req(client or self.client,'?action='+action,urlencode(values or {'csrf':self.csrf}).encode(),{'Content-Type':'application/x-www-form-urlencoded',**(headers or {})})
 def activate(self,excluded=False):
  values={'csrf':self.csrf}
  if excluded:values['excluded[]']=self.bob
  self.assertEqual(self.post('usage-activate',values)[0],200)
 def context(self,client=None,scope=''):
  return json.loads(self.req(client or self.client,'?action=album-context'+scope)[1])
 def opened(self,client=None,scope='',csrf=None,token=None,values=None):
  c=client or self.client;ctx=self.context(c,scope)
  return self.req(c,'?action=album-open'+scope,urlencode(values or {}).encode(),{'Content-Type':'application/x-www-form-urlencoded','X-CSRF-Token':csrf or ctx['csrf'],'X-Map-Open-Token':ctx['usageToken'] if token is None else token})
 def state(self,account):
  scope=hashlib.sha256((account+'|WL-000000000000').encode()).hexdigest();p=self.folder/(scope+'.json')
  return json.loads(p.read_text()) if p.exists() else None
 def client_for(self,name):
  c=urllib.request.build_opener(urllib.request.HTTPCookieProcessor(http.cookiejar.CookieJar()));self.login(c,name);return c
 def test_activation_owner_only_csrf_idempotence_no_fabricated_history(self):
  anonymous=urllib.request.build_opener();self.assertEqual(self.post('usage-activate',client=anonymous)[0],403)
  alice=self.client_for('alice');self.assertEqual(self.post('usage-activate',client=alice)[0],403)
  self.assertEqual(self.post('usage-activate',{'csrf':'wrong'})[0],403)
  self.assertEqual(self.get('?action=usage-activate')[0],405)
  self.assertEqual(self.post('usage-activate',{'csrf':self.csrf,'excluded[]':'../bad'})[0],400)
  self.opened(alice);self.assertIsNone(self.state(self.alice))
  self.activate(True);before=(self.folder/'activation.json').read_bytes();self.activate(False);self.assertEqual((self.folder/'activation.json').read_bytes(),before)
  self.assertIsNone(self.state(self.alice));page=self.get('?action=admin')[1]
  self.assertIn(b'No customer opening measured since',page);self.assertIn(b'Demo / test map',page)
 def test_valid_customer_opening_deduplicates_and_background_does_not_count(self):
  self.activate();alice=self.client_for('alice');ctx=self.context(alice)
  for action in ['album','route','album-context','album-list']:
   self.req(alice,'?action='+action,headers={'X-CSRF-Token':ctx['csrf']})
  self.assertIsNone(self.state(self.alice))
  self.assertEqual(self.opened(alice)[0],200);s=self.state(self.alice);self.assertEqual(s['customer']['count'],1);self.assertEqual(s['customer']['firstAt'],s['customer']['lastAt'])
  for _ in range(5):self.assertEqual(self.opened(alice)[0],200)
  other_session=self.client_for('alice');self.opened(other_session);self.assertEqual(self.state(self.alice),s)
  self.assertEqual(self.state(self.alice)['owner']['count'],0)
 def test_owner_and_demo_do_not_increment_customer_and_actor_flags_are_ignored(self):
  self.activate(True)
  self.assertEqual(self.opened(scope='&customer='+self.alice,values={'owner':'false','customer':self.bob})[0],200)
  self.assertEqual(self.state(self.alice)['owner']['count'],1);self.assertEqual(self.state(self.alice)['customer']['count'],0)
  alice=self.client_for('alice');self.opened(alice,values={'owner':'true','customer':self.bob,'reference':'WL-999999999999'})
  self.assertEqual(self.state(self.alice)['customer']['count'],1)
  bob=self.client_for('bob');self.opened(bob);self.assertEqual(self.state(self.bob)['excluded']['count'],1);self.assertEqual(self.state(self.bob)['customer']['count'],0)
  for f,b in self.before.items():self.assertEqual((self.private/'users'/f).read_bytes(),b)
 def test_auth_scope_token_methods_and_role_revocation(self):
  self.activate();anonymous=urllib.request.build_opener();self.assertEqual(self.post('album-open',client=anonymous)[0],401)
  alice=self.client_for('alice');ctx=self.context(alice)
  self.assertEqual(self.req(alice,'?action=album-open',headers={'X-CSRF-Token':ctx['csrf']})[0],405)
  self.assertEqual(self.opened(alice,csrf='wrong')[0],403);self.assertEqual(self.opened(alice,token='wrong')[0],409)
  self.assertEqual(self.req(alice,'?action=album-open&customer='+self.bob,b'',{'X-CSRF-Token':ctx['csrf'],'X-Map-Open-Token':ctx['usageToken']})[0],403)
  self.assertEqual(self.req(alice,'?action=admin')[0],403)
  self.assertIsNone(self.state(self.alice))
  path=self.private/'users'/f'{self.alice}.json';u=json.loads(path.read_text());u['route']='WL-111111111111';path.write_text(json.dumps(u));(self.private/'routes/WL-111111111111.json').write_text(json.dumps(self.route))
  self.assertEqual(self.opened(alice,token=ctx['usageToken'])[0],409)
  u['disabled']=True;path.write_text(json.dumps(u));self.assertEqual(self.post('album-open',client=alice)[0],401)
 def php(self,code):
  source=self.private.parent/'usage-test.php';source.write_text('<?php require '+json.dumps(str(self.private.parent/'public/personal-trips/owner-admin.php'))+';require '+json.dumps(str(self.private.parent/'public/personal-trips/map-usage.php'))+';'+code)
  return subprocess.check_output([m.module.PHP,str(source)],text=True)
 def test_fixed_window_boundary_atomic_concurrency_and_minimal_storage(self):
  # Deterministic server clock supplied only through a local CLI test, never HTTP input.
  code='$u=new PersonalMapUsage('+json.dumps(str(self.private))+');$u->activate([],1000);$p=["route"=>"WL-000000000000"];'
  self.php(code+'foreach([1000,1001,2799,2800,2801] as $now)$u->record("'+self.alice+'",$p,[], $now);')
  s=self.state(self.alice);self.assertEqual(s['customer'],{'count':2,'firstAt':1000,'lastAt':2800})
  script=self.private.parent/'usage-concurrent.php';script.write_text('<?php require '+json.dumps(str(self.private.parent/'public/personal-trips/owner-admin.php'))+';require '+json.dumps(str(self.private.parent/'public/personal-trips/map-usage.php'))+';(new PersonalMapUsage('+json.dumps(str(self.private))+'))->record("'+self.alice+'",["route"=>"WL-000000000000"],[],4600);')
  with concurrent.futures.ThreadPoolExecutor(max_workers=8) as ex:list(ex.map(lambda _:subprocess.check_call([m.module.PHP,str(script)]),range(16)))
  self.assertEqual(self.state(self.alice)['customer']['count'],3)
  self.assertEqual(set(s),{'version','customer','owner','excluded'})
  for p in self.folder.iterdir():
   self.assertEqual(p.stat().st_mode&0o777,0o600);self.assertLess(p.stat().st_size,16385)
  text=''.join(p.read_text() for p in self.folder.glob('*.json'));self.assertNotIn('synthetic-only',text);self.assertNotIn('127.0.0.1',text);self.assertNotIn('alice',text)
 def test_corrupt_storage_not_reported_as_zero_and_does_not_change_account(self):
  self.activate();alice=self.client_for('alice');self.opened(alice)
  scope=hashlib.sha256((self.alice+'|WL-000000000000').encode()).hexdigest();(self.folder/(scope+'.json')).write_text('{broken')
  self.assertEqual(self.opened(alice)[0],503);self.assertIn(b'Usage measurement unavailable',self.get('?action=admin')[1])

if __name__=='__main__':unittest.main()
