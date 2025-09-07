import { getGeojsonAndBounds } from "@/actions/get/map/get-geojson-and-bounds";
import { maplibreglStyleCached as maplibreglStyle } from "@/actions/services/maplibregl";
import maplibregl from "maplibre-gl";
import { useCallback, useRef } from "react";

export function useProviderMapContainer() {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const mapRef = useRef<maplibregl.Map | null>(null);

  const providerMapContainer = useCallback(async () => {
    const { geojson, bounds } = await getGeojsonAndBounds();

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
