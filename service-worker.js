self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("meds-cache").then(cache => {
      return cache.addAll([
        "index.html",
        "style.css",
        "app.js",
        "components/navbar.js",
        "components/card.js",
        "components/meds.js",
        "components/home.js",
        "components/history.js",
        "components/stats.js",
        "manifest.json"
      ]);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});