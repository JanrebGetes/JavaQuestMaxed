// Service worker: runs separately from the game itself, in the background.
// Its only job is making the app usable offline once installed — it never
// touches game state (XP, cleared quests, etc.). Saved progress lives in
// localStorage (see script.js), which this file does not touch.

// Bump this version string any time the app files change. Old caches with a
// different name are deleted in 'activate' below.
const CACHE_NAME = 'java-quest-maxed-v1';

// The core "app shell" — every file needed to run the game with zero network
// access. Pre-cached on install.
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './drills.js',
  './script.js',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png'
];

// Fires when the service worker is first registered (or a new version appears):
// downloads every file in ASSETS into a fresh named cache.
self.addEventListener('install', (event) => {
  self.skipWaiting(); // activate the new version immediately
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Fires after install: deletes caches from older versions so stale game files
// can't be served by mistake, then takes control of open tabs.
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k.startsWith('java-quest-maxed-') && k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// NETWORK-FIRST: when online, always fetch the newest file (and refresh the
// cache with it) so updates to the game show up immediately. When offline,
// fall back to the cached copy. (The old cache-first approach could keep
// serving an outdated version after an update.)
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request).then((response) => {
      if (response.ok && event.request.url.startsWith(self.location.origin)) {
        const clone = response.clone(); // a Response body can only be read once
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
      }
      return response;
    }).catch(() =>
      caches.match(event.request).then((cached) =>
        cached || (event.request.mode === 'navigate' ? caches.match('./index.html') : Response.error())
      )
    )
  );
});
