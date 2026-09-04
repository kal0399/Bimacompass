/**
 * BimaCompass — Progressive Web App Service Worker
 * Underwritten by Legal Redressal Counsel & System Integrity Desk
 * 
 * Strategy Profile: 
 * - Network-First, Cache-Fallback for Document / Client-Shell routing
 * - Stale-While-Revalidate for style templates, scripts, and media resources
 * - Network-Only bypass for active server telemetry and real-time legal release APIs
 */

const CACHE_NAME = 'bima-compass-vault-v1';
const OFFLINE_SHELL_URLS = [
  '/',
  '/index.html',
  '/favicon.svg',
  '/manifest.json',
  '/sitemap.xml',
  '/google573dda10fb21271c.html'
];

// 1. Installation Phase — Cache the immutable core shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 [Service Worker] Pre-caching Core Off-Line Shell resources');
        return cache.addAll(OFFLINE_SHELL_URLS);
      })
      .then(() => self.skipWaiting())
  );
});

// 2. Activation Phase — Evict stale cache legacies of previous runs
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('🧹 [Service Worker] Evicting outdated cache allocation:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Fetch Pipeline Interdiction & Smart Offline Caching
self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  // Exclude real-time server APIs (like telemetry logs, auth, maps) from local caching rules
  if (requestUrl.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(event.request).catch(() => {
        // Return a structured offline error block for API calls so client triggers fallback
        return new Response(
          JSON.stringify({ offline: true, error: 'Real-time telemetry unavailable in offline status.' }),
          { headers: { 'Content-Type': 'application/json' } }
        );
      })
    );
    return;
  }

  // Handle HTML document / navigation route queries
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Clone and update the live shell in background
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put('/', responseClone);
          });
          return response;
        })
        .catch(() => {
          // User is completely disconnected, serve the local static shell
          return caches.match('/') || caches.match('/index.html');
        })
    );
    return;
  }

  // Handle static assets (JS, CSS, SVGs, Fonts)
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Serve immediately from cache, but trigger network update in background (Stale-While-Revalidate)
        fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, networkResponse);
              });
            }
          })
          .catch(() => {
            // Ignore error, client is fully disconnected, cached asset suffices
          });
        return cachedResponse;
      }

      // Dynamic caching for newly encountered resources
      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return response;
      });
    })
  );
});
