"""Real PHP integration: login links, isolated submissions, moderation and publication."""
import base64,hashlib,http.cookiejar,importlib.util,json,pathlib,re,unittest,urllib.request,uuid
from urllib.parse import urlencode
spec=importlib.util.spec_from_file_location('album_fixture',pathlib.Path(__file__).with_name('personal-trip-album-server.test.py'));module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module);Fixture=module.PrivateAlbum
class Contributions(unittest.TestCase):
 setUpClass=classmethod(Fixture.setUpClass.__func__)
 tearDownClass=classmethod(Fixture.tearDownClass.__func__)
 req=Fixture.req
 def client(self):return urllib.request.build_opener(urllib.request.HTTPCookieProcessor(http.cookiejar.CookieJar()))
 def setUp(self):
  for p in (self.private/'rate').glob('*.json'):p.unlink()
  (self.private/'community-test-mail').touch()
  config=self.root/'trip-requests-private';config.mkdir(exist_ok=True);(config/'config.php').write_text("<?php return ['recipients'=>['owner@example.test','other-owner@example.test']];")
  self.c=self.client();self.state=self.call(self.c,'state')[1]
 def call(self,c,op,data=None,files=None,csrf=None,action='community-api'):
  headers={};body=None
  if data is not None:
   boundary='CommunityTest'+uuid.uuid4().hex;parts=[]
   for key,value in {'csrf':csrf or self.state['csrf'],'payload':json.dumps(data)}.items():parts.append(f'--{boundary}\r\nContent-Disposition: form-data; name="{key}"\r\n\r\n{value}\r\n'.encode())
   for name,raw in files or []:parts.append(f'--{boundary}\r\nContent-Disposition: form-data; name="files[]"; filename="{name}"\r\nContent-Type: application/octet-stream\r\n\r\n'.encode()+raw+b'\r\n')
   parts.append(f'--{boundary}--\r\n'.encode());body=b''.join(parts);headers['Content-Type']='multipart/form-data; boundary='+boundary
  status,raw,h=self.req(c,'?action='+action+'&op='+op,body,headers)
  return status,json.loads(raw),h
 def email_login(self,email='visitor@example.test'):
  self.assertEqual(self.call(self.c,'send-link',{'email':email,'language':'en'})[0],200)
  messages=[json.loads(p.read_text()) for p in (self.private/'community').glob('mail-*.json')];message=next(m for m in reversed(messages) if m['to']==email and 'token=' in m['html'])
  token=re.search(r'token=([a-f0-9]{64})',message['html'])[1]
  self.assertEqual(self.call(self.c,'consume-link',{'token':token})[0],200);self.state=self.call(self.c,'state')[1];return token
 def owner(self):
  key=hashlib.sha256(b'owner').hexdigest();record=json.loads((self.private/'users'/f'{hashlib.sha256(b"alice").hexdigest()}.json').read_text());record['role']='owner-admin';record['route']=None;(self.private/'users'/f'{key}.json').write_text(json.dumps(record));c=self.client();Fixture.login(self,c,'owner');csrf=self.call(c,'state')[1]['csrf'];return c,csrf
 def proposal(self,**kw):return {'id':str(uuid.uuid4()),'version':0,'kind':'tip','placeId':'rynek','title':'A visitor contribution','text':'A unique synthetic tip '+uuid.uuid4().hex,'credit':'Visitor','language':'en','consent':True,**kw}
 def publish(self,c,csrf,item,**kw):return self.call(c,'moderate',{'id':item['id'],'version':item['version'],'decision':'published','placeId':item['placeId'],'publishedTitle':item['title'],'publishedText':item['text'],'reviewedRights':True,'reviewedPlace':True,**kw},csrf=csrf)
 def test_01_requires_auth_consent_and_csrf(self):
  self.assertFalse(self.state['signedIn']);self.assertEqual(self.call(self.c,'submit',self.proposal())[0],403)
  self.email_login();self.assertTrue(self.state['signedIn']);self.assertEqual(self.call(self.c,'submit',self.proposal(consent=False))[1]['error'],'consent');self.assertEqual(self.call(self.c,'submit',self.proposal(),csrf='invalid')[0],403)
 def test_02_magic_link_single_use_and_no_role_escalation(self):
  token=self.email_login('not-an-owner@example.test');self.assertFalse(self.state['admin']);self.assertEqual(self.call(self.c,'review')[0],403);self.assertEqual(self.call(self.c,'consume-link',{'token':token})[1]['error'],'expired')
  path=next((self.private/'community/tokens').glob('*.json'));self.assertNotIn(token,path.read_text());self.assertEqual(path.stat().st_mode&0o777,0o600)
 def test_03_pending_private_and_submit_retry_idempotent(self):
  self.email_login('private@example.test');proposal=self.proposal();status,data,_=self.call(self.c,'submit',proposal);self.assertEqual(status,201);self.assertEqual(data['item']['status'],'pending')
  self.assertEqual(self.call(self.c,'submit',proposal)[0],200)
  public=self.call(self.client(),'ignored',action='community-public')[1]['items'];self.assertNotIn(proposal['id'],[r['id'] for r in public]);self.assertEqual(sum(r['id']==proposal['id'] for r in self.call(self.c,'my')[1]['items']),1)
  self.assertEqual(self.call(self.client(),'my')[0],403)
 def test_04_moderation_publish_credit_and_withdraw(self):
  self.email_login('publish@example.test');item=self.call(self.c,'submit',self.proposal(text='<script>not executable</script>'))[1]['item'];owner,csrf=self.owner()
  self.assertEqual(self.publish(owner,csrf,item,reviewedRights=False)[1]['error'],'consent');item=self.publish(owner,csrf,item)[1]['item'];self.assertEqual(item['status'],'published')
  public=next(x for x in self.call(self.client(),'public',action='community-public')[1]['items'] if x['id']==item['id']);self.assertEqual(public['credit'],'Visitor');self.assertNotIn('email',json.dumps(public));self.assertNotIn('contributor',public);self.assertEqual(self.call(self.c,'state')[1]['profile']['accepted'],1)
  self.assertEqual(self.call(self.c,'withdraw',{'id':item['id'],'version':item['version']})[0],200);self.assertNotIn(item['id'],[x['id'] for x in self.call(self.client(),'public',action='community-public')[1]['items']]);self.assertEqual(self.call(self.c,'state')[1]['profile']['accepted'],0)
  withdrawn=self.call(self.c,'my')[1]['items'];withdrawn=next(x for x in withdrawn if x['id']==item['id']);self.assertEqual(self.publish(owner,csrf,withdrawn)[1]['error'],'consent')
 def test_05_private_media_then_sanitized_public_photo(self):
  self.email_login('photo@example.test');png=base64.b64decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=');item=self.call(self.c,'submit',self.proposal(kind='media'),files=[('picture.png',png),('copy.png',png)])[1]['item'];self.assertEqual(len(item['files']),1)
  self.assertEqual(self.req(self.client(),item['files'][0]['preview'])[0],403);self.assertEqual(self.req(self.c,item['files'][0]['preview'])[1],png)
  self.assertEqual(self.req(self.client(),'?action=community-media&id='+item['id']+'&file=0')[0],404)
  owner,csrf=self.owner();item=self.publish(owner,csrf,item)[1]['item'];status,raw,h=self.req(self.client(),'?action=community-media&id='+item['id']+'&file=0');self.assertEqual(status,200);self.assertEqual(h['Content-Type'],'image/jpeg');self.assertNotEqual(raw,png)
 def test_06_review_feedback_and_update_conflict(self):
  self.email_login('feedback@example.test');proposal=self.proposal();item=self.call(self.c,'submit',proposal)[1]['item'];owner,csrf=self.owner();item=self.call(owner,'moderate',{'id':item['id'],'version':item['version'],'decision':'needs-info','feedback':'Please identify the exact entrance'},csrf=csrf)[1]['item'];self.assertEqual(item['status'],'needs-info')
  changed={**proposal,'text':'Updated content','version':1};self.assertEqual(self.call(self.c,'submit',changed)[0],409);changed['version']=item['version'];self.assertEqual(self.call(self.c,'submit',changed)[1]['item']['status'],'pending')
 def test_07_new_place_requires_verified_coordinates(self):
  self.email_login('new-place@example.test');item=self.call(self.c,'submit',self.proposal(placeId='',placeName='Synthetic new place',kind='new-place'))[1]['item'];owner,csrf=self.owner();self.assertEqual(self.publish(owner,csrf,item,placeName='Synthetic place')[1]['error'],'invalid')
  item=self.publish(owner,csrf,item,placeName='Synthetic place',lat=51.12,lng=17.04)[1]['item'];self.assertEqual(item['placeId'],'community-'+item['id']);self.assertEqual(item['newPlace']['coordinates']['lat'],51.12)
 def test_08_video_never_public_as_raw_file(self):
  self.email_login('video@example.test');video=b'\x00\x00\x00\x18ftypmp42\x00\x00\x00\x00mp42isom'+b'\x00'*100
  status,r,_=self.call(self.c,'submit',self.proposal(kind='media'),files=[('visit.mp4',video)]);self.assertEqual(status,201);item=r['item'];owner,csrf=self.owner();self.assertEqual(self.publish(owner,csrf,item)[1]['error'],'youtube');self.assertEqual(self.req(self.client(),'?action=community-media&id='+item['id']+'&file=0')[0],404)
 def test_10_single_album_item_only_and_other_owner_denied(self):
  self.client=self.c;self.csrf=Fixture.login(self,self.c,'alice');self.v=0
  # Use the existing album HTTP helper without changing its endpoint semantics.
  oldcall=self.call;self.call=lambda *a,**kw:None
  try:
   _,raw,_=self.req(self.c,'?action=album-list',headers={'X-CSRF-Token':self.csrf});self.v=json.loads(raw)['version']
   first=Fixture.entry(self,text='Selected note');second=Fixture.entry(self,text='Unselected private note')
   self.assertEqual(Fixture.call(self,'add',first)[0],200);self.assertEqual(Fixture.call(self,'add',second)[0],200)
  finally:self.call=oldcall
  _,raw,_=self.req(self.c,'?action=community-api&op=state&albumEntry='+first['id']);source=json.loads(raw);self.assertEqual(source['albumSource']['entry']['text'],'Selected note');self.assertNotIn('Unselected private note',raw.decode());self.state=source
  other=hashlib.sha256(b'bob').hexdigest();self.assertEqual(self.req(self.c,'?action=community-api&op=state&albumEntry='+first['id']+'&customer='+other)[0],403)
  proposal=self.proposal(text='Selected note',albumEntry=first['id']);item=self.call(self.c,'submit',proposal)[1]['item'];self.assertEqual(item['text'],'Selected note');self.assertNotIn('Unselected private note',json.dumps(item))
 def test_09_owner_has_no_access_via_community_email_only(self):
  self.email_login('owner@example.test');self.assertFalse(self.state['admin']);self.assertEqual(self.call(self.c,'review')[0],403)
if __name__=='__main__':unittest.main(defaultTest='Contributions')
