self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (
    request.url.includes("style.json") ||
    request.url.includes("tiles.json")
  ) {
    event.respondWith(
      caches.open("maplibre-cache").then(async (cache) => {
        const cached = await cache.match(request);
        if (cached) return cached;

        const response = await fetch(request);
        cache.put(request, response.clone());
        return response;
      }),
    );
  }
});
