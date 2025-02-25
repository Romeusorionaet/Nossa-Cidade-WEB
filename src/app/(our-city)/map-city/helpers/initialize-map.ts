import { maplibreglTiles } from "@/actions/services/maplibregl";
import type { markers } from "@/constants/markers";
import type { businessPointType } from "@/core/@types/business-points";
import { checkBusinessStatus } from "@/utils/check-business-status";
import { getMarkerElement } from "@/utils/get-marker-element";
import maplibregl from "maplibre-gl";
import type { RefObject } from "react";
import { popupContent } from "./popup-content";

interface Props {
  mapContainerRef: RefObject<HTMLDivElement | null>;
  providerMapContainer: () => Promise<maplibregl.Map>;
  handlePointRoute: ({ lat, lng }: { lat: number; lng: number }) => void;
  businessPointsFiltered: businessPointType[];
  pointsToShow: businessPointType[] | undefined;
  businessPointNotFound: boolean;
  businessPointCategories:
    | {
        id: string;
        name: string;
      }[]
    | undefined;
  markersRef: RefObject<maplibregl.Marker[]>;
}

export async function initializeMap({
  mapContainerRef,
  providerMapContainer,
  handlePointRoute,
  businessPointsFiltered,
  pointsToShow,
  businessPointNotFound,
  businessPointCategories,
  markersRef,
}: Props) {
  if (!mapContainerRef.current) return;

  const map = await providerMapContainer();

  map.on("load", async () => {
    const style = map.getStyle();
    if (!style.layers) return;

    const layers = style.layers;
    let labelLayerId: string | undefined = undefined;

    for (const layer of layers) {
      if (layer.type === "symbol" && layer.layout?.["text-field"]) {
        labelLayerId = layer.id;
        break;
      }
    }

    if (!map.getSource("openmaptiles")) {
      map.addSource("openmaptiles", {
        url: await maplibreglTiles(),
        type: "vector",
      });
    }

    if (!map.getLayer("3d-buildings")) {
      map.addLayer(
        {
          id: "3d-buildings",
          source: "openmaptiles",
          "source-layer": "building",
          type: "fill-extrusion",
          minzoom: 15,
          filter: ["!=", ["get", "hide_3d"], true],
          paint: {
            "fill-extrusion-color": [
              "interpolate",
              ["linear"],
              ["get", "render_height"],
              0,
              "#aaa",
              100,
              "#666",
            ],
          },
        },
        labelLayerId,
      );
    }

    map.easeTo({ pitch: 60, bearing: 0, duration: 2000 });

    map.setLight({
      anchor: "viewport",
      color: "white",
      intensity: 0.8,
      position: [2, 100, 90],
    });

    map.getStyle().layers?.forEach((layer) => {
      if (layer.id.includes("poi")) {
        map.removeLayer(layer.id);
      }
    });
  });

  let currentMarker: maplibregl.Marker | null = null;
  map.on("click", (e) => {
    const { lng, lat } = e.lngLat;
    handlePointRoute({ lat, lng });

    if (currentMarker) {
      currentMarker.remove();
    }

    currentMarker = new maplibregl.Marker({
      element: getMarkerElement({ icon: "click", size: "small", name: "" }),
    })
      .setLngLat([lng, lat])
      .addTo(map);
  });

  const filteredIds = new Set(businessPointsFiltered.map((point) => point.id));

  markersRef.current.forEach((marker) => {
    const markerId = marker.getElement().dataset.id;

    if (markerId) {
      marker.getElement().style.display = filteredIds.has(markerId)
        ? "block"
        : "none";
    }
  });

  pointsToShow?.forEach(
    async ({ id, location, name, categoryId, openingHours }) => {
      if (
        businessPointNotFound &&
        markersRef.current.some(
          (marker) => marker.getElement().dataset.id === id,
        )
      )
        return;

      const category = businessPointCategories?.find(
        (category) => category.id === categoryId,
      );
      const iconName = category?.name.replace(/\s+/g, "_");
      const status = checkBusinessStatus(openingHours);

      const popup = new maplibregl.Popup().setDOMContent(
        popupContent({ name, status, id }),
      );

      const markerElement = getMarkerElement({
        icon: iconName as keyof typeof markers,
        size: "medium",
        name: "",
      });

      markerElement.dataset.id = id;

      const marker = new maplibregl.Marker({ element: markerElement })
        .setLngLat([location.latitude, location.longitude])
        .setPopup(popup)
        .addTo(map);

      markersRef.current.push(marker);
    },
  );

  return () => map.remove();
}
