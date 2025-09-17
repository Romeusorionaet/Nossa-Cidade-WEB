import maplibregl from "maplibre-gl";
import { RefObject } from "react";

interface Props {
  routeMarkersRef: RefObject<maplibregl.Marker[]>;
  userMarker: maplibregl.Marker;
  mapRef: maplibregl.Map;
}

export function watchUserLocation({
  routeMarkersRef,
  userMarker,
  mapRef,
}: Props) {
  if ("geolocation" in navigator) {
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        userMarker.setLngLat([longitude, latitude]);

        mapRef.easeTo({
          center: [longitude, latitude],
          duration: 500,
        });
      },
      (err) => {
        console.error("Erro ao obter localização:", err.message);
      },
      { enableHighAccuracy: true },
    );

    routeMarkersRef.current.push({
      stop: () => navigator.geolocation.clearWatch(watchId),
    } as any);
  }
}
