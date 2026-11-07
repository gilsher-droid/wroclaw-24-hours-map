"""Verify owner access with real PHP sessions and isolated synthetic accounts."""
import hashlib, importlib.util, json, pathlib, unittest, urllib.request, http.cookiejar, re, html, copy, time
from urllib.parse import urlencode
spec=importlib.util.spec_from_file_location('album_tests',pathlib.Path(__file__).with_name('personal-trip-album-server.test.py'))
module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)
Base=module.PrivateAlbum

class OwnerAccess(unittest.TestCase):
 @classmethod
 def setUpClass(cls):
  Base.setUpClass.__func__(cls)
  cls.original_user=json.loads((cls.private/'users'/f'{hashlib.sha256(b"alice").hexdigest()}.json').read_text())
 tearDownClass=classmethod(Base.tearDownClass.__func__)
 req=Base.req
 login=Base.login
 def key(self,name):return hashlib.sha256(name.encode()).hexdigest()
 def setUp(self):
  for p in (self.private/'rate').glob('*.json'):p.unlink()
  self.owner=self.key('owner');self.alice=self.key('alice');self.bob=self.key('bob')
  for name in ['alice','bob']:
   (self.private/'users'/f'{self.key(name)}.json').write_text(json.dumps(self.original_user))
   path=self.private/'users'/f'{self.key(name)}.json';d=json.loads(path.read_text());d.pop('role',None);d['mustChangePassword']=False;path.write_text(json.dumps(d))
  record=json.loads((self.private/'users'/f'{self.alice}.json').read_text())
  record.update(role='owner-admin',route=None)
  (self.private/'users'/f'{self.owner}.json').write_text(json.dumps(record))
  self.client=urllib.request.build_opener(urllib.request.HTTPCookieProcessor(http.cookiejar.CookieJar()))
 def get(self,query):return self.req(self.client,query)
 def test_customer_and_anonymous_cannot_gain_owner_access(self):
  self.assertEqual(self.get('?action=album-context&customer='+self.bob)[0],403)
  self.login(self.client,'alice')
  self.assertEqual(self.get('?action=admin')[0],403)
  self.assertEqual(self.get('?action=album-context&customer='+self.bob)[0],403)
  self.assertEqual(self.get('?action=route&customer='+self.bob)[0],403)
 def test_owner_lists_all_and_new_accounts_automatically(self):
  self.login(self.client,'owner');status,page,_=self.get('?action=admin')
  self.assertEqual(status,200);self.assertIn(self.alice.encode(),page);self.assertIn(self.bob.encode(),page)
  self.assertNotIn(b'passwordHash',page);self.assertNotIn(b'synthetic-only',page)
  future=self.private/'users'/f'{self.key("future")}.json';future.write_text((self.private/'users'/f'{self.alice}.json').read_text())
  self.assertIn(self.key('future').encode(),self.get('?action=admin')[1]);future.unlink()
 def test_owner_link_survives_login_and_initial_customer_password(self):
  status,page,_=self.get('?action=album&customer='+self.alice);self.assertEqual(status,200);self.assertIn(b'autocomplete="username"',page)
  path=self.private/'users'/f'{self.alice}.json';d=json.loads(path.read_text());d['mustChangePassword']=True;path.write_text(json.dumps(d))
  self.login(self.client,'owner');status,page,_=self.get('?action=album&customer='+self.alice)
  self.assertEqual(status,200);self.assertIn(b'album-bootstrap.js',page)
  status,raw,_=self.get('?action=album-context&customer='+self.alice);self.assertEqual(status,200);self.assertEqual(json.loads(raw)['managedOwner'],self.alice)
  self.assertTrue(json.loads(path.read_text())['mustChangePassword'])
 def test_explicit_scope_keeps_tabs_isolated_and_writes_to_customer(self):
  csrf=self.login(self.client,'owner')
  for customer,title in [(self.alice,'Owner edit A'),(self.bob,'Owner edit B')]:
   status,raw,_=self.req(self.client,'?action=album-list&customer='+customer,headers={'X-CSRF-Token':csrf});self.assertEqual(status,200);v=json.loads(raw)['version']
   data=urlencode({'csrf':csrf,'payload':json.dumps({'version':v,'data':{'title':title}})}).encode()
   self.assertEqual(self.req(self.client,'?action=album-meta&customer='+customer,data,{'Content-Type':'application/x-www-form-urlencoded'})[0],200)
  for customer,title in [(self.alice,'Owner edit A'),(self.bob,'Owner edit B')]:
   raw=self.req(self.client,'?action=album-list&customer='+customer,headers={'X-CSRF-Token':csrf})[1];self.assertEqual(json.loads(raw)['meta']['title'],title)
  self.req(self.client,'?action=logout',urlencode({'csrf':csrf}).encode(),{'Content-Type':'application/x-www-form-urlencoded'})
  csrf=self.login(self.client,'alice');raw=self.req(self.client,'?action=album-list',headers={'X-CSRF-Token':csrf})[1];self.assertEqual(json.loads(raw)['meta']['title'],'Owner edit A')
 def test_revocation_and_invalid_targets_and_csrf(self):
  csrf=self.login(self.client,'owner')
  self.assertEqual(self.get('?action=album-context&customer=../server-key')[0],404)
  self.assertEqual(self.get('?action=album-context&customer='+self.owner)[0],404)
  self.assertEqual(self.req(self.client,'?action=album-meta&customer='+self.alice,b'payload={}',{'Content-Type':'application/x-www-form-urlencoded'})[0],403)
  path=self.private/'users'/f'{self.owner}.json';d=json.loads(path.read_text());d.pop('role');path.write_text(json.dumps(d))
  self.assertEqual(self.get('?action=admin')[0],403)
  self.assertEqual(self.get('?action=album-context&customer='+self.alice)[0],403)
 def test_audit_has_scope_and_no_passwords(self):
  self.login(self.client,'owner');self.get('?action=album&customer='+self.alice)
  audit=self.private/'owner-access.jsonl';self.assertTrue(audit.is_file());self.assertEqual(audit.stat().st_mode&0o777,0o600)
  records=[json.loads(s) for s in audit.read_text().splitlines()];self.assertTrue(any(r['actor']==self.owner and r['customer']==self.alice for r in records));self.assertNotIn('synthetic-only',audit.read_text())
 def test_media_urls_keep_customer_scope(self):
  import base64
  self.csrf=self.login(self.client,'alice');self.v=0
  raw=self.req(self.client,'?action=album-list',headers={'X-CSRF-Token':self.csrf})[1];self.v=json.loads(raw)['version']
  png=base64.b64decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=')
  entry=Base.entry(self);self.assertEqual(Base.call(self,'add',entry,file=png)[0],200)
  csrf=self.login(self.client,'owner');raw=self.req(self.client,'?action=album-list&customer='+self.alice,headers={'X-CSRF-Token':csrf})[1]
  media=next(e for e in json.loads(raw)['entries'] if e['id']==entry['id'])['mediaUrl'];self.assertIn('&customer='+self.alice,media)
  self.assertEqual(self.get(media)[1],png);self.assertEqual(self.get(media.replace(self.alice,self.bob))[0],404)
 def test_owner_password_cannot_be_changed_to_four_digit_code(self):
  csrf=self.login(self.client,'owner')
  data=urlencode({'csrf':csrf,'current':'synthetic-only','new':'1234','confirm':'1234'}).encode()
  self.assertEqual(self.req(self.client,'?action=password',data,{'Content-Type':'application/x-www-form-urlencoded'})[0],400)

 def reset_form(self):
  status,page,_=self.get('?action=owner-access&customer='+self.alice)
  self.assertEqual(status,200)
  return re.search(b'name="intent" value="([^"]+)"',page)[1].decode()
 def test_reopening_dashboard_bridge_preserves_pending_form_and_revocation(self):
  dashboard=self.root/'public/owner-dashboard';dashboard.mkdir(exist_ok=True)
  (dashboard/'owner-auth.php').write_text('<?php function owner_expired($state,$now){return ($state["last_activity"]??0)<$now-1800;}')
  state=self.root/'owner-dashboard-state';state.mkdir(exist_ok=True)
  (state/'map-owners.json').write_text(json.dumps({'synthetic-owner':'owner'}))
  # Test-only login fixture; no production endpoint or real account involved.
  (self.root/'public/seed-dashboard.php').write_text('<?php session_name("__Secure-wroc_owner"); session_start(); $_SESSION=["owner"=>"synthetic-owner","last_activity"=>time()];')
  self.req(self.client,'../seed-dashboard.php')
  status,page,_=self.get('?action=owner-entry');self.assertEqual(status,200)
  self.csrf=re.search(b'name="csrf-token" content="([^"]+)"',page)[1].decode()
  intent=self.reset_form()
  status,page,_=self.get('?action=owner-entry');self.assertEqual(status,200)
  self.assertEqual(re.search(b'name="csrf-token" content="([^"]+)"',page)[1].decode(),self.csrf)
  before=(self.private/'users'/f'{self.alice}.json').read_bytes()
  status,page,_=self.post_reset(intent,checkOnly='1');self.assertEqual(status,200)
  self.assertIn(b'Delivery details verified',page)
  self.assertEqual(before,(self.private/'users'/f'{self.alice}.json').read_bytes())
  path=self.private/'users'/f'{self.owner}.json';record=json.loads(path.read_text());record.pop('role');path.write_text(json.dumps(record))
  self.assertEqual(self.get('?action=owner-entry')[0],403)
  self.assertEqual(self.post_reset(intent,checkOnly='1')[0],403)
 def post_reset(self,form_intent,**values):
  data={'csrf':self.csrf,'intent':form_intent,'username':'alice','email':'alice@example.test','contactFormat':'facebook-ids-v1','fbKind':'direct','fbRecipient':'123','threadKind':'group','threadGroup':'789','threadPost':'123','threadComment':'456','identityConfirmed':'1',**values}
  return self.req(self.client,'?action=owner-access-reset&customer='+self.alice,urlencode(data).encode(),{'Content-Type':'application/x-www-form-urlencoded'})
 def newest_event(self):
  record=json.loads((self.private/'users'/f'{self.alice}.json').read_text())
  return json.loads((self.private/'access-resets'/f'{record["accessResetId"]}.json').read_text())
 def temporary_code(self,page):
  text=html.unescape(page.decode())
  return re.search(r'Temporary code:\n(\d{4})',text)[1]
 def test_reset_authorization_csrf_methods_and_identity(self):
  self.assertEqual(self.get('?action=owner-access&customer='+self.alice)[0],403)
  self.csrf=self.login(self.client,'alice')
  self.assertEqual(self.get('?action=owner-access&customer='+self.bob)[0],403)
  self.csrf=self.login(self.client,'owner');intent=self.reset_form();before=(self.private/'users'/f'{self.alice}.json').read_bytes()
  self.assertEqual(self.get('?action=owner-access-reset&customer='+self.alice)[0],405)
  for fields,expected in [({'csrf':'wrong'},403),({'username':'bob'},400),({'identityConfirmed':''},400),({'email':'bad\r\nBcc: intruder@example.test'},400),({'messenger':'https://facebook.com.evil.test/123'},400),({'publicThread':'javascript:alert(1)'},400),({'intent':'0'*64},400),({'contactFormat':''},400),({'threadKind':'external'},400),({'threadGroup':'https://evil.test'},400),({'threadPost':'../server-key'},400),({'fbKind':'direct','fbRecipient':'123/456'},400),({'fbKind':'business','fbAsset':'abc'},400)]:
   self.assertEqual(self.post_reset(intent,**fields)[0],expected)
   self.assertEqual((self.private/'users'/f'{self.alice}.json').read_bytes(),before)
  self.assertEqual(self.req(self.client,'?action=owner-access-reset&customer='+self.owner,urlencode({'csrf':self.csrf}).encode(),{'Content-Type':'application/x-www-form-urlencoded'})[0],404)
 def test_reset_revokes_old_sessions_preserves_customer_data_and_is_idempotent(self):
  old_client=urllib.request.build_opener(urllib.request.HTTPCookieProcessor(http.cookiejar.CookieJar()));self.login(old_client,'alice')
  self.csrf=self.login(self.client,'owner');intent=self.reset_form()
  before=json.loads((self.private/'users'/f'{self.alice}.json').read_text());other=(self.private/'users'/f'{self.bob}.json').read_bytes()
  routes={p.name:p.read_bytes() for p in (self.private/'routes').glob('*')}
  status,page,_=self.post_reset(intent);self.assertEqual(status,200);code=self.temporary_code(page);event=self.newest_event()
  self.assertEqual(self.req(old_client,'?action=album-context')[0],401)
  changed=json.loads((self.private/'users'/f'{self.alice}.json').read_text())
  for field in set(before)-{'passwordHash','mustChangePassword','sessionVersion'}:self.assertEqual(changed[field],before[field])
  self.assertTrue(changed['mustChangePassword']);self.assertEqual(changed['sessionVersion'],before['sessionVersion']+1)
  self.assertEqual(other,(self.private/'users'/f'{self.bob}.json').read_bytes());self.assertEqual(routes,{p.name:p.read_bytes() for p in (self.private/'routes').glob('*')})
  self.assertEqual(self.post_reset(intent)[0],200);self.assertEqual(self.newest_event(),event)
  for p in (self.private/'access-resets').glob('*'):self.assertEqual(p.stat().st_mode&0o777,0o600)
  self.assertNotIn('code',event['sealed']);self.assertNotIn(code,(self.private/'access-resets'/f'{event["id"]}.json').read_text())
  self.assertNotIn(code,(self.private/'owner-access.jsonl').read_text())
 def test_temporary_signin_forces_new_code_and_expires(self):
  self.csrf=self.login(self.client,'owner');status,page,_=self.post_reset(self.reset_form());code=self.temporary_code(page);event=self.newest_event()
  customer=urllib.request.build_opener(urllib.request.HTTPCookieProcessor(http.cookiejar.CookieJar()))
  raw=self.req(customer,'')[1];csrf=re.search(b'name="csrf-token" content="([^"]+)"',raw)[1].decode()
  status,page,_=self.req(customer,'?action=login',urlencode({'csrf':csrf,'username':'alice','password':code}).encode(),{'Content-Type':'application/x-www-form-urlencoded'})
  self.assertEqual(status,200);self.assertIn('בחרו סיסמה אישית'.encode(),page)
  token=re.search(b'name="csrf-token" content="([^"]+)"',page)[1].decode()
  self.assertEqual(self.req(customer,'?action=album-context')[0],403)
  path=self.private/'users'/f'{self.alice}.json';d=json.loads(path.read_text());d['temporaryCodeExpiresAt']=int(time.time())-1;path.write_text(json.dumps(d))
  self.assertEqual(self.req(customer,'?action=password',urlencode({'csrf':token,'current':code,'new':'7842','confirm':'7842'}).encode(),{'Content-Type':'application/x-www-form-urlencoded'})[0],401)
  # Expired codes cannot be used by a fresh client, either.
  fresh=urllib.request.build_opener(urllib.request.HTTPCookieProcessor(http.cookiejar.CookieJar()));raw=self.req(fresh,'')[1];csrf=re.search(b'name="csrf-token" content="([^"]+)"',raw)[1].decode()
  self.assertEqual(self.req(fresh,'?action=login',urlencode({'csrf':csrf,'username':'alice','password':code}).encode(),{'Content-Type':'application/x-www-form-urlencoded'})[0],401)
  self.assertNotIn(code.encode(),self.get('?action=owner-access&customer='+self.alice+'&event='+event['id'])[1])
 def test_customer_changes_temporary_code_and_old_code_is_not_reusable(self):
  self.csrf=self.login(self.client,'owner');_,page,_=self.post_reset(self.reset_form());code=self.temporary_code(page);event=self.newest_event()
  c=urllib.request.build_opener(urllib.request.HTTPCookieProcessor(http.cookiejar.CookieJar()));_,raw,_=self.req(c,'');csrf=re.search(b'name="csrf-token" content="([^"]+)"',raw)[1].decode()
  _,page,_=self.req(c,'?action=login',urlencode({'csrf':csrf,'username':'alice','password':code}).encode(),{'Content-Type':'application/x-www-form-urlencoded'});csrf=re.search(b'name="csrf-token" content="([^"]+)"',page)[1].decode()
  self.assertEqual(self.req(c,'?action=password',urlencode({'csrf':csrf,'current':code,'new':code,'confirm':code}).encode(),{'Content-Type':'application/x-www-form-urlencoded'})[0],400)
  new='7842' if code!='7842' else '9264'
  self.assertEqual(self.req(c,'?action=password',urlencode({'csrf':csrf,'current':code,'new':new,'confirm':new}).encode(),{'Content-Type':'application/x-www-form-urlencoded'})[0],200)
  record=json.loads((self.private/'users'/f'{self.alice}.json').read_text());self.assertFalse(record['mustChangePassword']);self.assertNotIn('accessResetId',record);self.assertNotIn('temporaryCodeExpiresAt',record)
  self.assertEqual(self.req(c,'?action=album-context')[0],200)
  page=self.get('?action=owner-access&customer='+self.alice+'&event='+event['id'])[1];self.assertNotIn(code.encode(),page)
 def test_delivery_state_is_truthful_and_public_update_has_no_credentials(self):
  self.csrf=self.login(self.client,'owner');_,page,_=self.post_reset(self.reset_form());code=self.temporary_code(page);event=self.newest_event()
  self.assertIn(b'Automatic email is not connected',page);self.assertNotIn(b'id="copy-publicThread"',page)
  def confirm(channel,receipt):return self.req(self.client,'?action=owner-access-confirm&customer='+self.alice,urlencode({'csrf':self.csrf,'event':event['id'],'channel':channel,'receipt':receipt}).encode(),{'Content-Type':'application/x-www-form-urlencoded'})
  self.assertEqual(confirm('publicThread','comment-123')[0],400)
  status,page,_=confirm('email','sent-message-123');self.assertEqual(status,200)
  self.assertEqual(self.newest_event()['channels']['email']['state'],'owner-confirmed')
  public=html.unescape(re.search(rb'id="copy-publicThread"[^>]*>(.*?)</textarea>',page,re.S)[1].decode())
  for secret in [code,self.alice,'alice@example.test','customer=','Username']:self.assertNotIn(secret,public)
  self.assertEqual(confirm('publicThread','comment-123')[0],200)
 def test_delivery_check_validates_same_payload_without_resetting_any_account(self):
  self.csrf=self.login(self.client,'owner');before={p.name:p.read_bytes() for p in (self.private/'users').glob('*.json')}
  data={'csrf':self.csrf,'intent':self.reset_form(),'identityConfirmed':'1','checkOnly':'1','contactFormat':'facebook-ids-v1','username':'alice','email':'alice@example.test','fbKind':'business','fbAsset':'123','fbRecipient':'456','fbBusiness':'789','fbMailbox':'123','threadKind':'group','threadGroup':'123','threadPost':'456','threadComment':'789'}
  status,page,_=self.req(self.client,'?action=owner-access-reset&customer='+self.alice,urlencode(data).encode(),{'Content-Type':'application/x-www-form-urlencoded'})
  self.assertEqual(status,200);self.assertIn(b'Delivery details verified. No access code was changed.',page)
  self.assertIn(b'https://business.facebook.com/latest/inbox/messenger?asset_id=123&amp;selected_item_id=456&amp;business_id=789&amp;mailbox_id=123',page)
  self.assertIn(b'https://www.facebook.com/groups/123/posts/456/?comment_id=789',page)
  self.assertEqual(before,{p.name:p.read_bytes() for p in (self.private/'users').glob('*.json')})
  data['csrf']='wrong';self.assertEqual(self.req(self.client,'?action=owner-access-reset&customer='+self.alice,urlencode(data).encode(),{'Content-Type':'application/x-www-form-urlencoded'})[0],403)
 def test_reset_event_recovers_a_prepared_write_and_limits_repeated_resets(self):
  self.csrf=self.login(self.client,'owner');intent=self.reset_form();before=(self.private/'users'/f'{self.alice}.json').read_bytes()
  _,page,_=self.post_reset(intent);code=self.temporary_code(page);event=self.newest_event()
  # Simulate interruption after writing the encrypted event, before user commit.
  path=self.private/'access-resets'/f'{event["id"]}.json';event['state']='prepared';path.write_text(json.dumps(event));(self.private/'users'/f'{self.alice}.json').write_bytes(before)
  status,page,_=self.post_reset(intent);self.assertEqual(status,200);self.assertEqual(self.temporary_code(page),code);self.assertEqual(self.newest_event()['state'],'ready')
  for _ in range(2):self.assertEqual(self.post_reset(self.reset_form())[0],200)
  current=(self.private/'users'/f'{self.alice}.json').read_bytes();self.assertEqual(self.post_reset(self.reset_form())[0],400);self.assertEqual(current,(self.private/'users'/f'{self.alice}.json').read_bytes())
 def test_all_five_languages_have_private_and_credential_free_public_copy(self):
  self.csrf=self.login(self.client,'owner');path=self.private/'users'/f'{self.alice}.json'
  for lang,subject in [('he','המפה האישית'),('en','Your personal map'),('pl','Twoja osobista mapa'),('de','Deine persönliche Karte'),('cs','Vaše osobní mapa')]:
   for rate in (self.private/'rate').glob('*.json'):rate.unlink()
   record=json.loads(path.read_text());record['language']=lang;path.write_text(json.dumps(record))
   status,page,_=self.post_reset(self.reset_form());self.assertEqual(status,200);self.assertIn(subject.encode(),page)
   self.assertIn(('view=map&amp;lang='+lang).encode(),page)
 def test_missing_language_disabled_targets_and_revoked_owner_fail_closed(self):
  self.csrf=self.login(self.client,'owner');intent=self.reset_form();path=self.private/'users'/f'{self.alice}.json';record=json.loads(path.read_text());record.pop('language');path.write_text(json.dumps(record))
  self.assertEqual(self.post_reset(intent)[0],400)
  record['language']='en';record['disabled']=True;path.write_text(json.dumps(record));self.assertEqual(self.post_reset(intent)[0],400)
  record['disabled']=False;path.write_text(json.dumps(record));owner=self.private/'users'/f'{self.owner}.json';d=json.loads(owner.read_text());d['role']='customer';owner.write_text(json.dumps(d));self.assertEqual(self.post_reset(intent)[0],403)

if __name__=='__main__':unittest.main(defaultTest='OwnerAccess')
