import maplibregl from "maplibre-gl";

const loadedIcons = new Set<string>();

export async function loadMapIcons(
  map: maplibregl.Map,
  icons: string[],
): Promise<void> {
  for (const name of icons) {
    if (loadedIcons.has(name)) continue;

    const response = await map.loadImage(`/imgs/map/${name}.png`);
    const image = response.data;
    if (image && !map.hasImage(name)) {
      map.addImage(name, image);
      loadedIcons.add(name);
    }
  }
}
