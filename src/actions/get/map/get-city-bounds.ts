export async function getCityBounds() {
  const response = await fetch(
    "/data/geojson/bounds/canguaretama-rn-bounds.json",
  );
  const bounds: [number, number, number, number] = await response.json();

  return bounds;
}
