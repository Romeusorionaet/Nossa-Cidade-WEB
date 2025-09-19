import { getCityBounds } from "@/actions/get/map/get-city-bounds";
import { maplibreglStyleCached as maplibreglStyle } from "@/actions/services/maplibregl";
import maplibregl from "maplibre-gl";
import { useCallback, useRef } from "react";

export function useProviderMapContainer() {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const mapRef = useRef<maplibregl.Map | null>(null);

  const providerMapContainer = useCallback(async () => {
    const bounds = await getCityBounds();

    if (!mapRef.current) {
      const style = await maplibreglStyle();

      const map = new maplibregl.Map({
        container: mapContainerRef.current as HTMLElement,
        style,
        maxBounds: bounds,
        pixelRatio: Math.min(window.devicePixelRatio, 1),
        fadeDuration: 0,
      });

      map.fitBounds(bounds, {
        padding: 20,
        animate: false,
        zoom: 12.8,
        pitch: 0,
        bearing: 0,
      });

      mapRef.current = map;
    }

    return { mapRef: mapRef.current };
  }, []);

  return { providerMapContainer, mapContainerRef };
}
