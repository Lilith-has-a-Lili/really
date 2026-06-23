// sw.js - 简洁可用的Service Worker
const CACHE_NAME = 'csyos-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/index-YamY73pN.js',
  '/assets/rolldown-runtime-CMxvf4Kt.js',
  '/assets/vendor-pdf-D2vT3ju6.js',
  '/assets/dist-BcvA-GRa.js',
  '/assets/definitions-BdWVgBTV.js',
  '/assets/haptics-DpcZkU6l.js',
  '/assets/jsx-runtime-DDrWIXeu.js',
  '/assets/react-ICqv4BO6.js',
  '/assets/types-BzM9yekO.js',
  '/assets/storage-CO_P6eOB.js',
  '/assets/apiRequestLedger-nkZkkXOY.js',
  '/assets/backendConfig-zNmUg0b0.js',
  '/assets/characterStore-DrshSiXL.js',
  '/assets/runtimeConfig-LnDFd7sY.js',
  '/assets/vectorMemorySyncState-9VIEqyfY.js',
  '/assets/backendClient-50_bwcBm.js',
  '/assets/jszip.min-Uer3KtZc.js',
  '/assets/db-CNLxxBIm.js',
  '/assets/index-Df4yHm2o.css',
  '/icons/icon-96.webp',
  '/icons/icon-192.webp',
  '/icons/icon-256.webp',
  '/images/taoyuan-splash-bg-v3.webp',
  '/fonts/taoyuan-splash-poem.woff2'
];

// 安装时缓存核心资源
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// 激活时清理旧缓存
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 拦截请求：优先使用缓存，fallback到网络
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 命中缓存则返回
        if (response) {
          return response;
        }
        // 否则发起网络请求并缓存
        return fetch(event.request).then(
          networkResponse => {
            // 只缓存成功且非跨域的资源
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            return networkResponse;
          }
        );
      })
  );
});
