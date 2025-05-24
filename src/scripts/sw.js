// self.addEventListener("push", (event) => {
//   console.log("Service worker pushing...");

//   async function chainPromise() {
//     await self.registration.showNotification("Perhatian", {
//       body: "Cerita baru telah ditambahkan",
//     });
//   }

//   event.waitUntil(chainPromise());
// });

// const CACHE_NAME = "maricerita-v3";
// const urlsToCache = [
//   "/",
//   "/index.html",
//   "/app.bundle.js",
//   "/app.css",
//   "/images/hero.png",
//   "/favicon.png",
//   "/images/logo.png",
//   "/manifest.json",
//   "/sw.bundle.js",
// ];



// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
//   );
//   self.skipWaiting();
// });

// self.addEventListener("activate", (event) => {
//   event.waitUntil(
//     caches
//       .keys()
//       .then((cacheNames) =>
//         Promise.all(
//           cacheNames
//             .filter((name) => name !== CACHE_NAME)
//             .map((name) => caches.delete(name))
//         )
//       )
//   );
//   self.clients.claim();
// });

// self.addEventListener("fetch", (event) => {
//   if (event.request.method !== "GET") return;

//   event.respondWith(
//     caches.match(event.request).then((cachedResponse) => {
//       return (
//         cachedResponse ||
//         fetch(event.request).catch(() => caches.match("./index.html"))
//       );
//     })
//   );
// });


const CACHE_NAME = "maricerita-v3";
const urlsToCache = [
  "/",
  "/index.html",
  "/app.bundle.js",
  "/app.css",
  "/images/hero.png",
  "/favicon.png",
  "/images/logo.png",
  "/manifest.json",
  "/sw.bundle.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      for (const url of urlsToCache) {
        try {
          await cache.add(url);
          console.log(`Cached successfully: ${url}`);
        } catch (err) {
          console.error(`Failed to cache: ${url}`, err);
        }
      }
    })()
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => caches.delete(name))
        )
      )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request).catch(() => caches.match("./index.html"))
      );
    })
  );
});

self.addEventListener("push", (event) => {
  console.log("Service worker pushing...");

  async function chainPromise() {
    await self.registration.showNotification("Perhatian", {
      body: "Cerita baru telah ditambahkan",
    });
  }

  event.waitUntil(chainPromise());
});
