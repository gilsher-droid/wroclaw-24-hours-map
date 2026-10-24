"""Verify owner access with real PHP sessions and isolated synthetic accounts."""
import hashlib, importlib.util, json, pathlib, unittest, urllib.request, http.cookiejar
from urllib.parse import urlencode
spec=importlib.util.spec_from_file_location('album_tests',pathlib.Path(__file__).with_name('personal-trip-album-server.test.py'))
module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)
Base=module.PrivateAlbum

class OwnerAccess(unittest.TestCase):
 setUpClass=classmethod(Base.setUpClass.__func__)
 tearDownClass=classmethod(Base.tearDownClass.__func__)
 req=Base.req
 login=Base.login
 def key(self,name):return hashlib.sha256(name.encode()).hexdigest()
 def setUp(self):
  for p in (self.private/'rate').glob('*.json'):p.unlink()
  self.owner=self.key('owner');self.alice=self.key('alice');self.bob=self.key('bob')
  for name in ['alice','bob']:
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

if __name__=='__main__':unittest.main(defaultTest='OwnerAccess')
