"""Real PHP requests, synthetic users/queue only; no email or production writes."""
import hashlib, importlib.util, json, pathlib, unittest, urllib.request, http.cookiejar, re, subprocess, shutil
from urllib.parse import urlencode
spec=importlib.util.spec_from_file_location('owners',pathlib.Path(__file__).with_name('personal-trip-owner-admin.test.py'))
m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
class Approval(unittest.TestCase):
 setUpClass=classmethod(m.OwnerAccess.setUpClass.__func__)
 tearDownClass=classmethod(m.OwnerAccess.tearDownClass.__func__)
 req=m.OwnerAccess.req
 login=m.OwnerAccess.login
 key=m.OwnerAccess.key
 get=m.OwnerAccess.get
 def setUp(self):
  m.OwnerAccess.setUp(self)
  self.queue=self.private.parent/'trip-requests-private'
  if self.queue.exists():shutil.rmtree(self.queue)
  (self.queue/'requests').mkdir(parents=True)
  self.ref='WL-123456789ABC'
  self.path=self.queue/'requests'/'synthetic.json'
  self.path.write_text(json.dumps({'reference':self.ref,'createdAt':'2026-11-18T12:00:00Z','status':'pending-owner-approval','source':'website','approvalRequired':True,'details':{'name':'Synthetic','email':'synthetic@example.invalid','language':'en'}}))
  for name in ['newcustomer','unapproved']:
   (self.private/'users'/f'{self.key(name)}.json').unlink(missing_ok=True)
  (self.private/'routes'/f'{self.ref}.json').unlink(missing_ok=True)
  # Same activation operation used by installer; only existing customer bindings survive.
  php=self.private.parent/'activate.php'
  php.write_text('<?php require '+json.dumps(str(self.private.parent/'public/personal-trips/request-approval.php'))+'; echo json_encode(approvalActivate('+json.dumps(str(self.private))+'));')
  self.assertEqual(subprocess.run([m.module.PHP,str(php)],capture_output=True).returncode,0)
 def post(self,action,**kw):
  return self.req(self.client,'?action='+action,urlencode({'csrf':getattr(self,'csrf','wrong'),'reference':self.ref,'format':'json',**kw}).encode(),{'Content-Type':'application/x-www-form-urlencoded'})
 def sign_owner(self):self.csrf=self.login(self.client,'owner')
 def test_pending_cannot_start_provision_or_release_and_public_cannot_approve(self):
  self.assertEqual(self.post('request-decision',decision='approved')[0],403)
  self.csrf=self.login(self.client,'alice')
  self.assertEqual(self.post('request-decision',decision='approved')[0],403)
  self.sign_owner()
  for a in ['request-start','request-provision','request-delivery-release']:
   self.assertEqual(self.post(a,username='newcustomer',route=json.dumps(self.route))[0],409)
  self.assertEqual(self.post('request-decision',csrf='wrong',decision='approved')[0],403)
  self.assertFalse((self.private/'users'/f'{self.key("newcustomer")}.json').exists())
 def test_approval_idempotence_and_provision_preserves_existing(self):
  self.sign_owner();before={p.name:p.read_bytes() for p in (self.private/'users').glob('*.json')}
  self.assertEqual(self.post('request-decision',decision='approved')[0],200)
  first=json.loads(self.path.read_text())['approval']
  self.assertEqual(self.post('request-decision',decision='approved')[0],200)
  self.assertEqual(json.loads(self.path.read_text())['approval'],first)
  self.assertEqual(self.post('request-decision',decision='rejected')[0],409)
  self.assertEqual(self.post('request-start')[0],200);pid=json.loads(self.path.read_text())['production']['id']
  self.post('request-start');self.assertEqual(json.loads(self.path.read_text())['production']['id'],pid)
  args={'username':'newcustomer','route':json.dumps(self.route)}
  self.assertEqual(self.post('request-provision',**args)[0],200)
  user=(self.private/'users'/f'{self.key("newcustomer")}.json').read_bytes()
  self.assertEqual(self.post('request-provision',**args)[0],200)
  self.assertEqual((self.private/'users'/f'{self.key("newcustomer")}.json').read_bytes(),user)
  self.assertEqual(self.post('request-provision',username='alice',route=json.dumps(self.route))[0],409)
  self.assertEqual(self.post('request-delivery-release')[0],200)
  for name,data in before.items():self.assertEqual((self.private/'users'/name).read_bytes(),data)
 def test_direct_documented_instruction_needs_no_second_decision(self):
  self.sign_owner()
  self.assertEqual(self.post('request-direct-approve',evidence='chat:synthetic-owner-instruction:case-1')[0],200)
  self.assertEqual(self.post('request-start')[0],200)
  a=json.loads(self.path.read_text())['approval'];self.assertEqual(a['method'],'direct-owner-instruction');self.assertEqual(a['actor'],self.key('owner'))
 def test_direct_new_case_is_recorded_once_without_dashboard_confirmation(self):
  self.sign_owner();args={'evidence':'chat:synthetic-direct-case-2','name':'Synthetic direct customer','language':'en'}
  first=self.post('request-direct-create',**args);second=self.post('request-direct-create',**args)
  self.assertEqual(first[0],200);self.assertEqual(json.loads(first[1])['reference'],json.loads(second[1])['reference'])
  r=next(json.loads(p.read_text()) for p in (self.queue/'requests').glob('owner-*.json'))
  self.assertEqual(r['source'],'direct-owner-instruction');self.assertEqual(r['approval']['decision'],'approved')
 def test_public_source_flags_are_ignored_and_no_map_is_created(self):
  import uuid
  public=self.private.parent/'public/trip-requests';public.mkdir(exist_ok=True)
  shutil.copy(m.module.ROOT/'bluehost-api/public/trip-requests/index.php',public/'index.php')
  (self.queue/'config.php').write_text("<?php return ['recipients'=>['owner@example.invalid','other@example.invalid'],'rateSalt'=>'synthetic-only'];")
  request={'requestId':str(uuid.uuid4()),'name':'Synthetic visitor','email':'synthetic@example.invalid','language':'en','consent':True,'website':'','arrival':'','days':2,'adults':2,'children':0,'transport':'walk','pace':'balanced','budget':'mid','interests':[],'approved':True,'source':'owner-approved'}
  url=self.base.replace('/personal-trips/','/trip-requests/')
  before=list((self.private/'users').glob('*.json'));beforeRoutes=list((self.private/'routes').glob('*.json'))
  req=urllib.request.Request(url,data=json.dumps(request).encode(),headers={'Content-Type':'application/json','Origin':'https://wroc-love.com'})
  with urllib.request.urlopen(req) as response:self.assertEqual(response.status,201);first=json.load(response)
  with urllib.request.urlopen(req) as response:self.assertEqual(json.load(response)['reference'],first['reference'])
  saved=json.loads((self.queue/'requests'/(request['requestId']+'.json')).read_text())
  self.assertEqual(saved['source'],'website');self.assertEqual(saved['status'],'pending-owner-approval');self.assertNotIn('approval',saved)
  self.assertEqual(list((self.private/'users').glob('*.json')),before);self.assertEqual(list((self.private/'routes').glob('*.json')),beforeRoutes)
 def test_host_verification_is_isolated_and_owner_only(self):
  self.assertEqual(self.post('request-verify')[0],403)
  self.sign_owner();status,raw,_=self.post('request-verify')
  self.assertEqual(status,200);result=json.loads(raw);self.assertTrue(all(result['checks'].values()));self.assertEqual(result['realCustomerWrites'],0)
  self.assertEqual(list(self.queue.glob('approval-check-*')),[])
 def test_missing_active_policy_fails_closed_and_cannot_rebaseline(self):
  (self.queue/'approval-policy.json').unlink()
  self.sign_owner()
  self.assertEqual(self.post('request-activate')[0],503)
  self.client=urllib.request.build_opener(urllib.request.HTTPCookieProcessor(http.cookiejar.CookieJar()))
  _,page,_=self.req(self.client,'');csrf=re.search(b'name="csrf-token" content="([^\"]+)"',page)[1].decode()
  status,raw,_=self.req(self.client,'?action=login',urlencode({'csrf':csrf,'username':'alice','password':'synthetic-only'}).encode(),{'Content-Type':'application/x-www-form-urlencoded'})
  self.assertEqual(status,403)
 def test_historical_installed_map_is_not_offered_for_preparation_again(self):
  r=json.loads(self.path.read_text());r['reference']='WL-000000000000';r['status']='received';self.path.write_text(json.dumps(r))
  self.sign_owner();status,page,_=self.get('?action=requests');self.assertEqual(status,200)
  self.assertIn(b'existing-map-preserved',page);self.assertNotIn(b'Approve preparation',page)
 def test_declined_request_cannot_proceed(self):
  self.sign_owner();self.assertEqual(self.post('request-decision',decision='rejected')[0],200)
  self.assertEqual(self.post('request-start')[0],409)
 def test_new_manual_files_cannot_bypass_gate_and_legacy_still_opens(self):
  u=json.loads((self.private/'users'/f'{self.alice}.json').read_text());u['route']=self.ref
  (self.private/'users'/f'{self.key("unapproved")}.json').write_text(json.dumps(u))
  (self.private/'routes'/f'{self.ref}.json').write_text(json.dumps(self.route))
  # Login redirect itself lands on a server-side refusal, before any map/album data.
  _,page,_=self.req(self.client,'');csrf=re.search(b'name="csrf-token" content="([^"]+)"',page)[1].decode()
  status,raw,_=self.req(self.client,'?action=login',urlencode({'csrf':csrf,'username':'unapproved','password':'synthetic-only'}).encode(),{'Content-Type':'application/x-www-form-urlencoded'})
  self.assertEqual(status,403);self.assertIn(b'owner_approval_required',raw)
  self.assertEqual(self.req(self.client,'?action=album-list')[0],403)
  self.client=urllib.request.build_opener(urllib.request.HTTPCookieProcessor(http.cookiejar.CookieJar()))
  self.login(self.client,'alice');self.assertEqual(self.req(self.client,'?action=route')[0],200)
if __name__=='__main__':unittest.main()
