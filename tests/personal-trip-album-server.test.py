"""Exercise actual PHP sessions and multipart endpoints with synthetic users only."""
import base64, http.cookiejar, io, json, os, pathlib, re, shutil, socket, subprocess, tempfile, time, unittest, urllib.request, urllib.error, uuid, zipfile
ROOT=pathlib.Path(__file__).resolve().parents[1]
PHP=os.environ.get('PHP_BINARY') or shutil.which('php')
class PrivateAlbum(unittest.TestCase):
 @classmethod
 def setUpClass(cls):
  if not PHP: raise RuntimeError('PHP 8.1+ required; privacy tests must not be skipped')
  cls.tmp=tempfile.TemporaryDirectory(); cls.root=pathlib.Path(cls.tmp.name)
  shutil.copytree(ROOT/'bluehost-api/public/personal-trips',cls.root/'public/personal-trips')
  private=cls.root/'personal-trips-private';cls.private=private
  for f in ['sessions','users','routes','rate']: (private/f).mkdir(parents=True,exist_ok=True)
  (private/'server-key').write_text('synthetic-test-key-only')
  cls.route={'title':'Synthetic test trip','days':[{'stops':[{'placeId':'rynek'}],'food':[]}],'places':{'rynek':{'name':'Public example'}}}
  (private/'routes/WL-000000000000.json').write_text(json.dumps(cls.route))
  import hashlib
  hashed=subprocess.check_output([PHP,'-r','echo password_hash("synthetic-only",PASSWORD_DEFAULT);'],text=True)
  for name in ['alice','bob']:
   (private/'users'/f'{hashlib.sha256(name.encode()).hexdigest()}.json').write_text(json.dumps({'passwordHash':hashed,'mustChangePassword':False,'sessionVersion':0,'route':'WL-000000000000','language':'en'}))
  with socket.socket() as s:s.bind(('127.0.0.1',0));port=s.getsockname()[1]
  cls.base=f'http://127.0.0.1:{port}/personal-trips/'
  cls.log=open(cls.root/'server.log','w');cls.server=subprocess.Popen([PHP,'-d','upload_max_filesize=64M','-d','post_max_size=68M','-S',f'127.0.0.1:{port}','-t',str(cls.root/'public')],stdout=cls.log,stderr=cls.log)
  for _ in range(60):
   try:urllib.request.urlopen(cls.base,timeout=.5);break
   except Exception:time.sleep(.1)
 @classmethod
 def tearDownClass(cls):cls.server.terminate();cls.server.wait();cls.log.close();cls.tmp.cleanup()
 def setUp(self):self.client=urllib.request.build_opener(urllib.request.HTTPCookieProcessor(http.cookiejar.CookieJar()));self.csrf=self.login(self.client,'alice');self.state=self.call('list')[1];self.v=self.state['version']
 def req(self,client,url,body=None,headers=None,method=None):
  request=urllib.request.Request(self.base+url,data=body,headers=headers or {},method=method)
  try:r=client.open(request)
  except urllib.error.HTTPError as e:r=e
  raw=r.read();return r.status,raw,r.headers
 def login(self,c,name):
  _,page,_=self.req(c,'');token=re.search(b'name="csrf-token" content="([^"]+)"',page)[1].decode()
  from urllib.parse import urlencode
  status,page,_=self.req(c,'?action=login',urlencode({'csrf':token,'username':name,'password':'synthetic-only'}).encode(),{'Content-Type':'application/x-www-form-urlencoded'})
  assert status==200
  return re.search(b'name="csrf-token" content="([^"]+)"',page)[1].decode()
 def call(self,action,data=None,file=None,csrf=None,version=None,client=None):
  body=None;headers={'X-CSRF-Token':csrf if csrf is not None else self.csrf}
  if data is not None:
   boundary='TestBoundary'+uuid.uuid4().hex;parts=[]
   for key,value in {'csrf':csrf if csrf is not None else self.csrf,'payload':json.dumps({'version':self.v if version is None else version,'data':data})}.items():parts.append(f'--{boundary}\r\nContent-Disposition: form-data; name="{key}"\r\n\r\n{value}\r\n'.encode())
   if file:parts.append(f'--{boundary}\r\nContent-Disposition: form-data; name="file"; filename="test.png"\r\nContent-Type: image/png\r\n\r\n'.encode()+file+b'\r\n')
   parts.append(f'--{boundary}--\r\n'.encode());body=b''.join(parts);headers['Content-Type']='multipart/form-data; boundary='+boundary
  status,raw,h=self.req(client or self.client,'?action=album-'+action,body,headers);value=json.loads(raw)
  if status==200 and 'version' in value:self.v=value['version']
  return status,value,h
 def entry(self,**kw):return {'id':str(uuid.uuid4()),'placeId':'rynek','day':0,'caption':'A safe caption','text':'A personal memory','date':'2026-10-22',**kw}
 def test_01_auth_and_csrf(self):
  anonymous=urllib.request.build_opener();self.assertEqual(self.call('list',client=anonymous)[0],401)
  self.assertEqual(self.call('add',self.entry(),csrf='wrong')[0],403)
 def test_02_membership_and_conflict(self):
  self.assertEqual(self.call('add',self.entry(placeId='not-assigned'))[0],400)
  old=self.v;self.assertEqual(self.call('add',self.entry())[0],200)
  self.assertEqual(self.call('meta',{'title':'stale'},version=old)[0],409)
 def test_03_media_and_owner_isolation(self):
  png=base64.b64decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=')
  e=self.entry();self.assertEqual(self.call('add',e,file=png)[0],200)
  _,s,_=self.call('list');found=next(x for x in s['entries'] if x['id']==e['id']);self.assertNotIn('blob',found)
  url=found['mediaUrl'];status,raw,h=self.req(self.client,url);self.assertEqual(status,200);self.assertEqual(raw,png);self.assertIn('no-store',h['Cache-Control'])
  status,raw,h=self.req(self.client,url,headers={'Range':'bytes=1-4'});self.assertEqual((status,raw),(206,png[1:5]));self.assertEqual(h['Content-Range'],f'bytes 1-4/{len(png)}')
  self.assertEqual(self.req(self.client,url,headers={'Range':'bytes=9999-'})[0],416)
  bob=urllib.request.build_opener(urllib.request.HTTPCookieProcessor(http.cookiejar.CookieJar()));self.login(bob,'bob');self.assertEqual(self.req(bob,url)[0],404)
  self.assertEqual(self.req(urllib.request.build_opener(),url)[0],401)
  self.assertEqual(self.call('add',self.entry(),file=png)[1].get('duplicate'),e['id'])
 def test_04_fake_image_rejected(self):self.assertEqual(self.call('add',self.entry(),file=b'<script>not an image</script>')[0],400)
 def test_05_restore_and_export(self):
  e=self.entry();self.call('add',e);self.call('patch',{'id':e['id'],'values':{'deletedAt':1}});_,s,_=self.call('list');self.assertTrue(next(x for x in s['entries'] if x['id']==e['id']).get('deletedAt'))
  self.call('restore',{});_,s,_=self.call('list');self.assertNotIn('deletedAt',next(x for x in s['entries'] if x['id']==e['id']))
  status,raw,h=self.req(self.client,'?action=album-export');self.assertEqual(status,200)
  with zipfile.ZipFile(io.BytesIO(raw)) as z:self.assertIn(e['id'],z.read('album.json').decode());self.assertIn('README.txt',z.namelist())
 def test_06_persist_new_session_and_no_direct_private_files(self):
  self.call('meta',{'title':'Cross device title'});fresh=urllib.request.build_opener(urllib.request.HTTPCookieProcessor(http.cookiejar.CookieJar()));fresh_csrf=self.login(fresh,'alice');self.assertEqual(self.call('list',client=fresh,csrf=fresh_csrf)[1]['meta']['title'],'Cross device title')
  self.assertEqual(self.req(fresh,'../personal-trips-private/server-key')[0],404)
 def test_07_validation_and_readonly_methods(self):
  self.assertEqual(self.call('add',self.entry(text='x'*5001))[0],400)
  self.assertEqual(self.call('add',self.entry(date='2026-02-31'))[0],400)
  self.assertEqual(self.req(self.client,'?action=album-meta')[0],405)
 def test_08_album_links_survive_signin(self):
  fresh=urllib.request.build_opener(urllib.request.HTTPCookieProcessor(http.cookiejar.CookieJar()))
  status,raw,_=self.req(fresh,'?action=album&place=rynek&day=0');self.assertEqual(status,200);self.assertIn(b'autocomplete="username"',raw)
  token=re.search(b'name="csrf-token" content="([^"]+)"',raw)[1].decode()
  from urllib.parse import urlencode
  status,raw,_=self.req(fresh,'?action=login',urlencode({'csrf':token,'username':'alice','password':'synthetic-only'}).encode(),{'Content-Type':'application/x-www-form-urlencoded'})
  self.assertEqual(status,200);self.assertIn(b'album-bootstrap.js',raw)
 def test_09_revision_recovery_permissions(self):
  self.call('meta',{'title':'Recovery'});paths=list((self.private/'albums').rglob('revisions/*.json'));self.assertTrue(paths)
  for path in paths:self.assertEqual(path.stat().st_mode&0o777,0o600)
if __name__=='__main__':unittest.main()
