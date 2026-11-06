import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const source=readFileSync(new URL('../bluehost-api/public/personal-trips/owner-access.js',import.meta.url),'utf8');
const {facebookDestination:parse}=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));

test('Facebook destinations submit typed identifiers without external URL strings',()=>{
 const payload={...parse('https://www.facebook.com/messages/t/123456789/','messenger'),...parse('https://www.facebook.com/groups/2525899074519424/posts/2635717483537582/?comment_id=2639976959778301','thread')};
 assert.deepEqual(payload,{fbKind:'direct',fbRecipient:'123456789',threadKind:'group',threadGroup:'2525899074519424',threadPost:'2635717483537582',threadComment:'2639976959778301',threadReply:''});
 assert.ok(!new URLSearchParams(payload).toString().includes('https'));
 for(const v of Object.values(payload))assert.match(v,/^[A-Za-z0-9]*$/);
});
test('Business Suite links retain exact mailbox and conversation identity',()=>{
 assert.deepEqual(parse('https://business.facebook.com/latest/inbox/all/?asset_id=123&business_id=456&mailbox_id=789&selected_item_id=101112','messenger'),{fbKind:'business',fbAsset:'123',fbBusiness:'456',fbMailbox:'789',fbRecipient:'101112'});
 assert.deepEqual(parse('https://www.messenger.com/t/123456789','messenger'),{fbKind:'direct',fbRecipient:'123456789'});
});
test('Public post, permalink and reel formats preserve exact comment and reply IDs',()=>{
 for(const url of ['https://facebook.com/123/posts/pfbidABCDEFGHI/?comment_id=456&reply_comment_id=789','https://facebook.com/permalink.php?id=123&story_fbid=pfbidABCDEFGHI&comment_id=456&reply_comment_id=789'])assert.deepEqual(parse(url,'thread'),{threadKind:'page',threadPage:'123',threadPost:'pfbidABCDEFGHI',threadComment:'456',threadReply:'789'});
 assert.deepEqual(parse('https://facebook.com/reel/123/?comment_id=456','thread'),{threadKind:'reel',threadPost:'123',threadComment:'456',threadReply:''});
 assert.deepEqual(parse('https://facebook.com/groups/123/permalink/456/','thread'),{threadKind:'group',threadGroup:'123',threadPost:'456',threadComment:'',threadReply:''});
});
test('Arbitrary domains, redirect credentials, malformed IDs and ambiguous queries are rejected',()=>{
 for(const url of ['http://facebook.com/groups/123/posts/456','https://facebook.com.evil.test/groups/123/posts/456','https://user:pass@facebook.com/groups/123/posts/456','https://facebook.com:8443/groups/123/posts/456','https://facebook.com/groups/123/posts/456/?comment_id=1&comment_id=2','https://facebook.com/groups/123/posts/456/?comment_id=abc','https://facebook.com/share/example','javascript:alert(1)','https://facebook.com/groups/123/posts/pfbidABC%2FDEF'])assert.throws(()=>parse(url,'thread'),url);
 for(const url of ['https://business.facebook.com/latest/inbox/all/?asset_id=123','https://business.facebook.com/latest/inbox/all/?asset_id=123&selected_item_id=123/456','https://facebook.com/messages/t/name','https://facebook.com/groups/123/posts/456'])assert.throws(()=>parse(url,'messenger'),url);
});
test('Absent channels remain absent, and the native form cannot submit raw URL fields',()=>{
 assert.deepEqual(parse('','messenger'),{fbKind:'none'});assert.deepEqual(parse(' ','thread'),{threadKind:'none'});
 const php=readFileSync(new URL('../bluehost-api/public/personal-trips/owner-access.php',import.meta.url),'utf8');
 assert.ok(php.includes('data-messenger-url'));assert.ok(php.includes('data-thread-url'));
 assert.ok(!php.includes('name="messenger"'));assert.ok(!php.includes('name="publicThread"'));
 assert.ok(php.includes('button class="reset" data-needs-destinations disabled'));assert.ok(php.includes('type="module"'));
});
