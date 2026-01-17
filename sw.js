const CACHE_NAME = 'bookgadi-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://static.wixstatic.com/media/843689_96e5733ee867434ebc36b1205fc1ddc4~mv2.png'
];

// Service Worker Install करना और फाइल्स को सेव करना
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// नेटवर्क से रिक्वेस्ट लेना
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// पुराने कैश (Cache) को डिलीट करना
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});
