self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = request.url;

  if (url.includes("style.json") || url.includes("tiles.json")) {
    console.log("[SW] Interceptando:", url);

    event.respondWith(
      caches.open("maplibre-cache").then(async (cache) => {
        const cached = await cache.match(request);
        if (cached) {
          console.log("[SW] Servindo do cache:", url);
          return cached;
        }

        console.log("[SW] Buscando da rede e salvando:", url);
        const response = await fetch(request);
        cache.put(request, response.clone());
        return response;
      }),
    );
  }
});
