import bbox from "@turf/bbox";
import type { FeatureCollection, Geometry, GeoJsonProperties } from "geojson";

export async function getGeojsonAndBounds() {
  const response = await fetch("/data/geojson/canguaretama-rn.geojson");
  const geojson: FeatureCollection<Geometry, GeoJsonProperties> =
    await response.json();

  const polygonFeatures: FeatureCollection<Geometry, GeoJsonProperties> = {
    type: "FeatureCollection",
    features: geojson.features.filter(
      (f) =>
        f.geometry.type === "Polygon" || f.geometry.type === "MultiPolygon",
    ),
  };

  const fullBounds = bbox(polygonFeatures);
  const bounds: [number, number, number, number] = [
    fullBounds[0],
    fullBounds[1],
    fullBounds[2],
    fullBounds[3],
  ];

  return { geojson, bounds };
}
