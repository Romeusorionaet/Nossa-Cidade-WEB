import { maplibreglStyleCached as maplibreglStyle } from "@/actions/services/maplibregl";
import maplibregl from "maplibre-gl";
import { useCallback, useRef } from "react";
import bbox from "@turf/bbox";
import type { FeatureCollection, Geometry, GeoJsonProperties } from "geojson";

export function useProviderMapContainer() {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const mapRef = useRef<maplibregl.Map | null>(null);

  const providerMapContainer = useCallback(async () => {
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

    if (!mapRef.current) {
      const style = await maplibreglStyle();

      const map = new maplibregl.Map({
        container: mapContainerRef.current as HTMLElement,
        style,
        maxBounds: bounds,
      });

      map.jumpTo({
        center: [-35.131645, -6.378825],
        zoom: 15,
        bearing: 0,
        pitch: 0,
      });

      mapRef.current = map;
    }

    return { mapRef: mapRef.current, geojson };
  }, []);

  return { providerMapContainer, mapContainerRef };
}
