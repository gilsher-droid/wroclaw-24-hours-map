import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";
import { runInNewContext } from "node:vm";

const root = resolve(import.meta.dirname, "..");

function loadCatalog() {
  const window = {};
  runInNewContext(readFileSync(resolve(root, "data/place-catalog.js"), "utf8"), { window, console });
  return window.WROC_CATALOG;
}

test("every canonical social item remains a direct Facebook or Instagram link", () => {
  const catalog = loadCatalog();
  const uniqueUrls = new Set();

  for (const place of Object.values(catalog.places)) {
    for (const post of place.socialPosts) {
      assert.ok(["facebook", "instagram"].includes(post.platform), `${place.id}: supported platform`);
      assert.match(post.url, /^https:\/\/(?:www\.)?(?:facebook\.com|instagram\.com)\//, `${place.id}: public social URL`);
      assert.equal(post.contentRef, undefined, `${place.id}: direct link must not carry contentRef`);
      assert.equal(post.originalLanguage, undefined, `${place.id}: direct link must not carry preview metadata`);
      uniqueUrls.add(post.url);
    }
  }

  assert.ok(uniqueUrls.size >= 57, "preserve all historical links while adding localized posts");
  const localized = JSON.parse(readFileSync(resolve(root, "data/localized-social-posts.json"), "utf8"));
  for (const [id, posts] of Object.entries(localized)) {
    for (const post of posts) {
      const place = catalog.getPlace(id);
      assert.ok(place.socialPosts.some(item => item.platform === post.platform && item.url === post.url), `${id}: retain every verified historical post`);
      if(id === "four-domes" && post.platform === "instagram" && post.language === "he"){assert.equal(catalog.getSocialPost(place,post.platform,post.language),null,"reviewed wrong-account Hebrew action stays hidden");continue;}
      const active = posts.filter(item => !place.socialPosts.find(row => row.platform === item.platform && row.url === item.url)?.routingExcluded);
      const preferred = active.find(item => item.platform === post.platform && item.language === post.language && catalog.socialPostKind(item.url,item.platform) === "post-candidate");
      if (preferred) assert.equal(catalog.getSocialPost(place, post.platform, post.language)?.url, preferred.url, `${id}: route to first currently verified matching-language post`);
      else assert.notEqual(catalog.getSocialPost(place, post.platform, post.language)?.url, post.url, `${id}: unverified historical post stays hidden`);
    }
  }
});

test("the supplied priority links stay on their existing canonical places", () => {
  const catalog = loadCatalog();
  const urls = (placeId) => catalog.getPlace(placeId).socialPosts.map((post) => post.url);

  assert.ok(urls("ksiaz-castle").includes("https://www.facebook.com/share/p/19UBPN184V/"));
  assert.ok(urls("church-of-peace-swidnica").includes("https://www.instagram.com/p/Dbf-bApnAo5/?img_index=1"));
  assert.ok(urls("kaplica-czaszek-czermna").includes("https://www.instagram.com/p/Dbf9RSWnOB8/?img_index=1"));
  assert.ok(urls("glowny").includes("https://www.facebook.com/share/r/1Kx6Fvn9c2/"));
  assert.ok(urls("zoo-wroclaw").includes("https://www.instagram.com/wroclaw.lowersilesia/p/DcTZronDED-/"));
  assert.ok(urls("pergola").includes("https://www.facebook.com/share/p/1CHRnrqLwQ/"));
  assert.ok(urls("pergola").includes("https://www.instagram.com/p/Dcn4ySrisOr/?img_index=1"));
});

test("all products render plain social anchors without a preview interceptor", () => {
  for (const file of ["map.html", "premium.html", "moshe.html", "lifestyle.html", "excursions.html"]) {
    const html = readFileSync(resolve(root, file), "utf8");
    assert.doesNotMatch(html, /social-preview\.(?:js|css)/, `${file}: no preview assets`);
  }

  for (const file of ["app.js", "premium.js", "lifestyle.js", "excursions.js"]) {
    const script = readFileSync(resolve(root, file), "utf8");
    assert.doesNotMatch(script, /WROC_SOCIAL_PREVIEW|data-social-content-ref/, `${file}: no click interception`);
  }
});

test("all canonical places use only the selected language post or matching channel", () => {
  const catalog = loadCatalog();
  const pages = {he:"61591964083308",en:"61595036942289",pl:"61595207664875",de:"61595239823399",cs:"61594716405964"};
  for (const place of Object.values(catalog.places)) for (const lang of Object.keys(pages)) for (const platform of ["facebook","instagram"]) {
    const result = catalog.getSocialPost(place, platform, lang);
    const exact = place.socialPosts.find(p => p.platform === platform && !p.routingExcluded && p.context !== "historical-cross-account" && !(lang === "he" && platform === "instagram" && p.url.toLowerCase().startsWith("https://www.instagram.com/wroclaw.lowersilesia/")) && p.language === lang && catalog.socialPostKind(p.url,platform)==="post-candidate" && !p.url.includes('/groups/'));
    const legacy = lang === "he" && place.socialPosts.find(p => p.platform === platform && !p.routingExcluded && p.context !== "historical-cross-account" && !(lang === "he" && platform === "instagram" && p.url.toLowerCase().startsWith("https://www.instagram.com/wroclaw.lowersilesia/")) && !p.language && catalog.socialPostKind(p.url,platform)==="post-candidate" && !p.url.includes('/groups/'));
    if(place.id === "four-domes" && platform === "instagram" && lang === "he") assert.equal(result,null,"reviewed wrong-account action");
    else if (exact || legacy) assert.equal(result.url, (exact || legacy).url);
    else assert.equal(result,null,"no account fallback: "+place.id);
  }
});

test("new language posts take priority without leaking to another map language", () => {
  const catalog = loadCatalog();
  const place = { socialPosts: [{platform:"facebook",url:"https://www.facebook.com/posts/old/"},{platform:"facebook",language:"pl",url:"https://www.facebook.com/posts/polish/"}] };
  assert.equal(catalog.getSocialPost(place, "facebook", "pl").url, "https://www.facebook.com/posts/polish/");
  assert.equal(catalog.getSocialPost(place, "facebook", "he").url, "https://www.facebook.com/posts/old/");
  assert.equal(catalog.getSocialPost(place, "facebook", "de"),null);
});


test("Hebrew maps exclude verified historical posts from the English Instagram account", () => {
  const catalog = loadCatalog();
  for (const id of ["arche-klasztor", "aleja-bielany", "wieza-cisnien-borek"]) {
    const place = catalog.getPlace(id);
    assert.ok(place.socialPosts.some(p => p.context === "historical-cross-account"));
    const verified = JSON.parse(readFileSync(resolve(root, "data/localized-social-posts.json"), "utf8"))[id]?.find(p => p.platform === "instagram" && p.language === "he");
    const result = catalog.getSocialPost(place, "instagram", "he");
    assert.equal(result?.url ?? null, verified?.url || null);
    assert.ok(!place.socialPosts.some(p => p.context === "historical-cross-account" && p.url === result?.url));
  }
});


test("reviewed unrelated legacy posts are retained without being selected for exact place routing", () => {
  const catalog = loadCatalog();
  const exclusions = JSON.parse(readFileSync(resolve(root, "data/social-post-routing-exclusions.json"), "utf8"));
  for (const review of exclusions) {
    const place = catalog.getPlace(review.placeId);
    const legacy = place.socialPosts.find(post => post.platform === review.platform && post.url === review.url);
    assert.ok(legacy?.routingExcluded, `${review.placeId}: retain excluded historical record`);
    assert.notEqual(catalog.getSocialPost(place, review.platform, "he")?.url, review.url);
  }
  const place = {socialPosts: [
    {platform: "facebook", language: "he", url: "https://www.facebook.com/wrong/", routingExcluded: true},
    {platform: "facebook", language: "he", url: "https://www.facebook.com/posts/exact/"}
  ]};
  assert.equal(catalog.getSocialPost(place, "facebook", "he").url, "https://www.facebook.com/posts/exact/");
});


test("explicit English Instagram account paths never route from Hebrew maps", () => {
  const catalog = loadCatalog();
  const ids = ["boguslawskiego", "chatka", "dobra-paczkarnia-kuznicza", "dwarf-info", "glowny", "hala", "hala-targowa", "jolie-kurzy-targ", "jolie-plac-solny", "ossolineum", "pan-precel", "pan-precel-olawska", "papa", "zoo-wroclaw"];
  for (const id of ids) {
    const place = catalog.getPlace(id);
    assert.ok(place.socialPosts.some(p => p.platform === "instagram" && p.url.startsWith("https://www.instagram.com/wroclaw.lowersilesia/")), id);
    const selected = catalog.getSocialPost(place, "instagram", "he");
    if (!selected) assert.equal(catalog.getSocialPostState(place,"instagram","he").post,null,id);
    else assert.ok(!selected.url.startsWith("https://www.instagram.com/wroclaw.lowersilesia/"), id);
  }
  const generic = {socialPosts: [{platform:"instagram",url:"https://www.instagram.com/p/unknown-owner/"}]};
  assert.equal(catalog.getSocialPost(generic,"instagram","he").url,generic.socialPosts[0].url);
  const english = {socialPosts:[{platform:"instagram",language:"en",url:"https://www.instagram.com/wroclaw.lowersilesia/p/english-post/"}]};
  assert.equal(catalog.getSocialPost(english,"instagram","en").url,english.socialPosts[0].url);
});

test('Borek exposes reviewed place posts and its newly verified Hebrew Instagram post', () => {
  const catalog = loadCatalog();
  const place = catalog.getPlace('wieza-cisnien-borek');
  assert.equal(place.links.socialProfileFallback, false);
  const replacement = JSON.parse(readFileSync(resolve(root, 'data/october19-verified-social-connections.json'), 'utf8')).find(row => row.canonicalId === 'wieza-cisnien-borek' && row.platform === 'instagram' && row.language === 'he');
  assert.ok(replacement);
  assert.equal(catalog.getSocialPost(place, 'instagram', 'he')?.url, replacement.url);
  const audit = JSON.parse(readFileSync(resolve(root, 'data/borek-social-audit.json'), 'utf8'));
  assert.equal(audit.entries.length, 10);
  for (const row of audit.entries.filter(row => row.status === 'verified-post')) {
    assert.equal(catalog.getSocialPost(place, row.platform, row.language)?.url, row.url);
    assert.ok(row.contentReviewed && row.account && row.checkedAt && row.evidence.length);
  }
});
