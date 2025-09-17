export function simulateRouteAlongPath({
  userMarker,
  coordinates,
  interval = 200,
}: {
  userMarker: maplibregl.Marker;
  coordinates: [number, number][];
  interval?: number;
}) {
  let index = 0;

  const timer = setInterval(() => {
    if (index >= coordinates.length) {
      clearInterval(timer);
      return;
    }

    const [lng, lat] = coordinates[index];
    userMarker.setLngLat([lng, lat]);
    index++;
  }, interval);
}
