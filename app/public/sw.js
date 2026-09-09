// Minimal app-shell service worker. Its only job is to (a) satisfy Chromium's
// PWA installability check (a controlling service worker is required before
// `beforeinstallprompt` will ever fire) and (b) deliver the offline support
// `install.subtitle` already promises ("Works offline and opens like an app").
//
// Strategy: stale-while-revalidate for GET requests only. Every response that
// comes back OK is cached; every request is answered from cache immediately
// if present, while a network fetch runs in the background to refresh it for
// next time. Never touches non-GET requests (forms, API calls) or opaque
// cross-origin failures.
const CACHE_NAME = 'ap-guide-shell-v1';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.add('/'))
      .catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const network = fetch(event.request)
        .then((response) => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
