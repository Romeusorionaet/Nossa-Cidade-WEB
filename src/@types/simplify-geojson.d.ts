declare module "simplify-geojson" {
  import type { Feature, FeatureCollection, Geometry } from "geojson";

  type GeoJSONInput = Feature | FeatureCollection | Geometry;

  export default function simplify(
    geojson: GeoJSONInput,
    tolerance?: number,
    highQuality?: boolean,
  ): FeatureCollection;
}
