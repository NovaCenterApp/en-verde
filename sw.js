/* En Verde: guarda la app en el teléfono para que abra sin internet.
   Primero intenta traer la versión nueva; si no hay conexión, abre la guardada. Los datos (Supabase) no pasan por aquí. */
var CACHE = 'enverde-app-v2';
var FILES = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './apple-touch-icon.png', './icon-maskable.png', './splash.jpg'];
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(FILES); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) { return Promise.all(ks.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); })); })
    .then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  var u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== self.location.origin) return;      // solo los archivos de la app
  e.respondWith(fetch(e.request).then(function (r) {
    if (r && r.ok) { var cp = r.clone(); caches.open(CACHE).then(function (c) { c.put(e.request.mode === 'navigate' ? './index.html' : e.request, cp); }); }
    return r;
  }).catch(function () {
    return caches.match(e.request.mode === 'navigate' ? './index.html' : e.request, { ignoreSearch: true }).then(function (r) { return r || caches.match('./index.html'); });
  }));
});
