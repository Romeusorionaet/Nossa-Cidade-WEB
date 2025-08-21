import type { businessPointType } from "@/@types/business-point-type";
import { checkBusinessStatus } from "@/utils/check-business-status";
import {
  getMarkerElement,
  sizesIcon,
  sizesName,
} from "@/utils/get-marker-element";
import { popupContent } from "./popup-content";
import { MARKERS } from "@/constants/markers";
import { type RefObject } from "react";
import maplibregl from "maplibre-gl";

interface Props {
  mapContainerRef: RefObject<HTMLDivElement | null>;
  providerMapContainer: () => Promise<maplibregl.Map>;
  handlePointRoute: ({ lat, lng }: { lat: number; lng: number }) => void;
  businessPointsFiltered: businessPointType[];
  pointsToShow: businessPointType[] | undefined;
  businessPointCategories:
    | {
        id: string;
        name: string;
      }[]
    | undefined;
  markersMap: Map<string, maplibregl.Marker>;
}

export async function initializeMap({
  mapContainerRef,
  providerMapContainer,
  handlePointRoute,
  businessPointsFiltered,
  pointsToShow,
  businessPointCategories,
  markersMap,
}: Props) {
  if (!mapContainerRef.current) return;

  const map = await providerMapContainer();

  map.on("load", async () => {
    const style = map.getStyle();
    style.layers
      ?.filter((layer) => layer.id.includes("poi"))
      .forEach((layer) => map.removeLayer(layer.id));

    if (!map.getLayer("buildings-2d")) {
      map.addLayer({
        id: "buildings-2d",
        source: "openmaptiles",
        "source-layer": "building",
        type: "fill",
        paint: {
          "fill-color": "#ccc",
          "fill-outline-color": "#aaa",
          "fill-opacity": 0.6,
        },
      });
    }

    map.jumpTo({
      pitch: 45,
      bearing: -17.6,
      center: map.getCenter(),
      zoom: map.getZoom(),
    });

    map.setLight({
      anchor: "viewport",
      color: "white",
      intensity: 0.8,
      position: [2, 100, 90],
    });

    style.layers
      .filter((layer) => layer.id.includes("poi"))
      .forEach((layer) => map.removeLayer(layer.id));
  });

  let currentMarker: maplibregl.Marker | null = null;
  map.on("click", (e) => {
    const { lng, lat } = e.lngLat;
    handlePointRoute({ lat, lng });

    if (currentMarker) {
      currentMarker.remove();
    }

    currentMarker = new maplibregl.Marker({
      element: getMarkerElement({
        icon: "click",
        sizeIcon: "small",
        sizeName: "small",
        name: "",
      }),
    })
      .setLngLat([lng, lat])
      .addTo(map);
  });

  map.on("zoom", () => {
    const zoom = map.getZoom();

    let sizeIcon: keyof typeof sizesIcon;
    let sizeName: keyof typeof sizesName;

    if (zoom >= 16.5) {
      sizeIcon = "large";
      sizeName = "large";
    } else if (zoom >= 15.5) {
      sizeIcon = "medium";
      sizeName = "medium";
    } else {
      sizeIcon = "small";
      sizeName = "small";
    }

    markersMap.forEach((marker) => {
      const el = marker.getElement();
      const iconEl = el.querySelector<HTMLElement>("div");
      const nameEl = el.querySelector<HTMLElement>("span");

      if (iconEl) {
        iconEl.style.fontSize = sizesIcon[sizeIcon] ?? "16px";
      }

      if (nameEl) {
        nameEl.style.fontSize = sizesName[sizeName] ?? "12px";
        nameEl.style.display = zoom > 15.5 ? "inline" : "none";
      }
    });
  });

  const filteredIds = new Set(businessPointsFiltered.map((p) => p.id));

  markersMap.forEach((marker, id) => {
    const el = marker.getElement();
    const shouldBeVisible = filteredIds.has(id);
    el.style.display = shouldBeVisible ? "block" : "none";
  });

  pointsToShow?.forEach(({ id, location, name, categoryId, openingHours }) => {
    if (!markersMap.has(id)) {
      const category = businessPointCategories?.find(
        (category) => category.id === categoryId,
      );
      const iconName = category?.name.replace(/\s+/g, "_");
      const status = checkBusinessStatus(openingHours);

      const popup = new maplibregl.Popup().setDOMContent(
        popupContent({ name, status, id }),
      );

      const markerElement = getMarkerElement({
        icon: iconName?.toLocaleLowerCase() as keyof typeof MARKERS,
        sizeIcon: "medium",
        sizeName: "medium",
        name: name,
      });

      markerElement.dataset.id = id;

      const marker = new maplibregl.Marker({ element: markerElement })
        .setLngLat([location.latitude, location.longitude])
        .setPopup(popup)
        .addTo(map);

      markersMap.set(id, marker);
    }
  });
}
