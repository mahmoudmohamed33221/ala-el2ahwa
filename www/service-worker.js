// service-worker.js — كاش بسيط لتشغيل المنصة والألعاب أوفلاين
const CACHE_NAME = 'ala-el2ahwa-v4';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './icons/games/ludo.png',
  './games/domino/index.html',
  './games/ludo/index.html',
  './vendor/qrcode.min.js'
  // لما تضيف لعبة جديدة، ضيف هنا: './games/<اسم-اللعبة>/index.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// نجيب أحدث نسخة من الملفات الأول (network-first)، ونستخدم الكاش بس لو مفيش اتصال
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
