"""Authenticated customer-owned route additions, using synthetic users and an isolated temporary server."""
import importlib.util,pathlib,unittest,json,hashlib,urllib.request,http.cookiejar,urllib.parse
spec=importlib.util.spec_from_file_location('album_fixture',pathlib.Path(__file__).with_name('personal-trip-album-server.test.py'));fixture=importlib.util.module_from_spec(spec);spec.loader.exec_module(fixture)
class Nearby(fixture.PrivateAlbum):
 def setUp(self):
  super().setUp()
  import shutil
  shutil.rmtree(self.private/'nearby-stops',ignore_errors=True)
 def add_stop(self,place='ostrow',day=0,client=None,csrf=None):
  body=urllib.parse.urlencode({'placeId':place,'day':day,'csrf':self.csrf if csrf is None else csrf}).encode()
  status,raw,_=self.req(client or self.client,'?action=nearby-add',body,{'Content-Type':'application/x-www-form-urlencoded','X-CSRF-Token':self.csrf if csrf is None else csrf});return status,json.loads(raw)
 def test_nearby_auth_validation(self):
  self.assertEqual(self.add_stop(client=urllib.request.build_opener())[0],401)
  self.assertEqual(self.add_stop(csrf='invalid')[0],403)
  self.assertEqual(self.add_stop(place='../../users/admin')[0],400)
  self.assertEqual(self.add_stop(day=-1)[0],400)
  self.assertEqual(self.add_stop(day=999)[0],400)
 def test_nearby_persists_and_deduplicates_without_changing_base(self):
  before=(self.private/'routes/WL-000000000000.json').read_bytes()
  status,d=self.add_stop();self.assertEqual(status,200);self.assertFalse(d['duplicate']);self.assertEqual(d['route']['days'][0]['stops'][-1]['placeId'],'ostrow')
  self.assertEqual(self.add_stop()[1]['duplicate'],True)
  _,raw,_=self.req(self.client,'?action=route');route=json.loads(raw);self.assertEqual(sum(s['placeId']=='ostrow'for s in route['days'][0]['stops']),1)
  self.assertEqual(before,(self.private/'routes/WL-000000000000.json').read_bytes())
  status,raw,_=self.req(self.client,'?action=album-context');self.assertEqual(status,200);self.assertIn('ostrow',json.loads(raw)['route']['places'])
 def test_nearby_shared_base_remains_customer_isolated(self):
  self.assertEqual(self.add_stop()[0],200)
  bob=urllib.request.build_opener(urllib.request.HTTPCookieProcessor(http.cookiejar.CookieJar()));self.login(bob,'bob')
  _,raw,_=self.req(bob,'?action=route');self.assertNotIn('ostrow',json.loads(raw)['places'])
  key=hashlib.sha256(b'bob').hexdigest();self.assertEqual(self.req(self.client,'?action=route&customer='+key)[0],403)
for name in dir(fixture.PrivateAlbum):
 if name.startswith('test_'):setattr(Nearby,name,None)
if __name__=='__main__':unittest.main()
