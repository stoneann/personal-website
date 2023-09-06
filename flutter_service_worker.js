'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"canvaskit/canvaskit.js": "76f7d822f42397160c5dfc69cbc9b2de",
"canvaskit/canvaskit.wasm": "f48eaf57cada79163ec6dec7929486ea",
"canvaskit/chromium/canvaskit.js": "8c8392ce4a4364cbb240aa09b5652e05",
"canvaskit/chromium/canvaskit.wasm": "fc18c3010856029414b70cae1afc5cd9",
"canvaskit/skwasm.js": "1df4d741f441fa1a4d10530ced463ef8",
"canvaskit/skwasm.wasm": "6711032e17bf49924b2b001cef0d3ea3",
"canvaskit/skwasm.worker.js": "19659053a277272607529ef87acf9d8a",
"flutter.js": "6fef97aeca90b426343ba6c5c9dc5d4a",
"main.dart.js": "a06c18c4a2d226239440e056428d68d5",
"version.json": "11e1a177d57c5da2bc6e3a6acc3010f4",
"assets/images/background.jpg": "a7360646ac3cb008e4e728e76600b814",
"assets/images/icons/irenic.png": "f5ffd8482caf523c0cebf49479ea2927",
"assets/images/icons/piazza.png": "bac8e0b25ab51443eaee986895c1e8ad",
"assets/images/icons/house.png": "5e644e86eee5ca815efd7462752cbc89",
"assets/images/icons/famfoodie.png": "698d76aa90259f17f176b54f0ab2a3ea",
"assets/images/kitchen/61024013074__5EEE5422-7D57-409E-9882-54EA2CC48171.JPG": "099ee583c24fae35d46c5b8316fddc68",
"assets/images/kitchen/IMG_6235.JPEG": "39c8d6d9f476c12954d83d8a4a9eeefc",
"assets/images/kitchen/IMG_5105.JPEG": "89b224531df65cdd6427cdc4d9583ac6",
"assets/images/kitchen/IMG_5103.JPEG": "cef4666d6cfc4a0a859eb90711f01a65",
"assets/images/kitchen/IMG_4025.JPEG": "61f7ed80df9fb6038942258e88ea7665",
"assets/images/kitchen/IMG_3991.JPEG": "b5f432d0f08f9a5ecf1d729813943071",
"assets/images/kitchen/IMG_3869.JPEG": "8053a8df2d98eb79bbc5a8f71cb3e12a",
"assets/images/kitchen/IMG_3035.JPEG": "375aa0625a0d6072ddd683a4d1d139b6",
"assets/images/kitchen/64006610363__FD5A4CFB-3335-4AE4-9723-67C1D938A85E.fullsizerender.JPEG": "fcca5ac3bdfb1014b400da3fd7eacf33",
"assets/images/kitchen/IMG_1772.JPEG": "f8e7b80a048d2a8af2c9c444b2062f57",
"assets/images/kitchen/IMG_2370.JPEG": "21b5a76be5a256bf887e38afe95bdb2d",
"assets/images/kitchen/IMG_5041.JPEG": "6ea1f39ae129137cea85f986167f1a20",
"assets/images/kitchen/IMG_9999.JPEG": "1bab52517f20eb7d33ebf55eb7239787",
"assets/images/kitchen/70579581434__20339971-56CA-4187-B187-86A0E40011EB.fullsizerender.JPEG": "031d794845b0409f6fbd16330ad77cfe",
"assets/images/kitchen/70630399083__AA91B4AA-9B5F-4DD6-95A5-E4DE766DC33F.fullsizerender.JPEG": "55b2ef7706b662c9a43f61c2745421a6",
"assets/images/kitchen/70630455679__73C2F837-90E8-42CE-B193-53724E845ABF.fullsizerender.JPEG": "160ebdc44250c456ef29f56c707fe18a",
"assets/images/kitchen/IMG_6427.JPEG": "dd805626c02950069952ddd87b93aaf7",
"assets/images/Resume%2520-%2520Master.pdf": "3579a20f3ccf400072bd2ca8fb56d0ac",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "57d849d738900cfd590e9adc7e208250",
"assets/fonts/MaterialIcons-Regular.otf": "62ec8220af1fb03e1c20cfa38781e17e",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"assets/AssetManifest.json": "d1cd50aa80b7df3904a70ab2aa6c0502",
"assets/AssetManifest.smcbin": "f051e83e6a7749986fc2e27fe22dcc3e",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/NOTICES": "e8dbc2b9d9137530b5d7b05609c4ba8b",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"manifest.json": "3fc29f9294b755bca0378065b89e216e",
"index.html": "1c78c400e71193159b6ca7af97567187",
"/": "1c78c400e71193159b6ca7af97567187"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
