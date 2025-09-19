import { checkBusinessStatus } from "@/utils/check-business-status";
import { popupContent } from "./popup-content";
import { type RefObject } from "react";
import maplibregl from "maplibre-gl";
import { loadMapIcons } from "./load-map-icons";

interface Props {
  mapContainerRef: RefObject<HTMLDivElement | null>;
  providerMapContainer: () => Promise<{
    mapRef: maplibregl.Map;
  }>;
  handlePointRoute: ({ lat, lng }: { lat: number; lng: number }) => void;
  pointsToShow: businessPointType[] | undefined;
  businessPointCategories:
    | {
        id: string;
        searchName: string;
      }[]
    | undefined;
}

export async function initializeMap({
  mapContainerRef,
  providerMapContainer,
  handlePointRoute,
  pointsToShow,
  businessPointCategories,
}: Props) {
  if (!mapContainerRef.current) return;

  const { mapRef } = await providerMapContainer();

  const createGeoJSON = () => ({
    type: "FeatureCollection" as const,
    features:
      pointsToShow?.map((point) => {
        const category = businessPointCategories?.find(
          (c) => c.id === point.categoryId,
        );
        const iconName = category?.searchName;

        return {
          type: "Feature" as const,
          properties: {
            id: point.id,
            name: point.name,
            icon: iconName ?? "default",
            status: checkBusinessStatus(point.openingHours),
          },
          geometry: {
            type: "Point" as const,
            coordinates: [point.location.longitude, point.location.latitude],
          },
        };
      }) ?? [],
  });

  const icons = businessPointCategories?.map((c) => c.searchName) ?? [
    "default",
  ];

  mapRef.on("load", async () => {
    mapRef
      .getStyle()
      .layers?.filter((layer) => layer.id.includes("poi"))
      .forEach((layer) => mapRef.removeLayer(layer.id));

    await loadMapIcons(mapRef, icons);

    if (!mapRef.getSource("points")) {
      mapRef.addSource("points", {
        type: "geojson",
        data: createGeoJSON(),
        cluster: true,
        clusterRadius: 50,
      });

      mapRef.addSource("mask", {
        type: "geojson",
        data: "/data/geojson/masks/canguaretama-rn-mask.geojson",
      });
      mapRef.addLayer({
        id: "mask-layer",
        type: "fill",
        source: "mask",
        paint: { "fill-color": "black", "fill-opacity": 0.5 },
      });
      mapRef.addLayer({
        id: "clusters",
        type: "circle",
        source: "points",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": "#FFFDF5",
          "circle-stroke-color": "#4D4D4D",
          "circle-stroke-width": 1,
          "circle-radius": [
            "step",
            ["get", "point_count"],
            12,
            100,
            18,
            750,
            24,
          ],
        },
      });
      mapRef.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "points",
        filter: ["has", "point_count"],
        layout: {
          "text-field": "{point_count_abbreviated}",
          "text-font": ["Open Sans"],
          "text-size": 12,
        },
        paint: { "text-color": "#000" },
      });
      mapRef.addLayer({
        id: "unclustered-point",
        type: "symbol",
        source: "points",
        filter: ["!", ["has", "point_count"]],
        layout: {
          "icon-image": ["get", "icon"],
          "icon-allow-overlap": false,
          "icon-ignore-placement": false,
          "icon-size": 0.8,
        },
      });

      if (window.matchMedia("(hover: hover)").matches) {
        mapRef.on("mouseenter", "unclustered-point", () => {
          mapRef.getCanvas().style.cursor = "pointer";
        });
        mapRef.on("mouseleave", "unclustered-point", () => {
          mapRef.getCanvas().style.cursor = "";
        });
      }
    }

    mapRef.on("click", "unclustered-point", (e) => {
      const feature = e.features?.[0];
      if (!feature) return;

      const coordinates =
        feature.geometry.type === "Point"
          ? feature.geometry.coordinates
          : [0, 0];
      const { name, status, id } = feature.properties as any;

      new maplibregl.Popup({
        closeButton: false,
        closeOnMove: true,
        focusAfterOpen: true,
      })
        .setLngLat(coordinates as [number, number])
        .setDOMContent(popupContent({ name, status, id }))
        .addTo(mapRef);

      handlePointRoute({ lat: coordinates[1], lng: coordinates[0] });
    });
  });

  let previousPointIds: Set<string> = new Set();
  const updatePointsChunked = (newData: GeoJSON.FeatureCollection) => {
    const source = mapRef.getSource("points") as maplibregl.GeoJSONSource;
    if (!source) return;

    const newIds = new Set(newData.features.map((f) => f.properties?.id));
    const isChanged =
      newIds.size !== previousPointIds.size ||
      Array.from(newIds).some((id) => !previousPointIds.has(id));

    if (isChanged) {
      source.setData(newData);
      previousPointIds = newIds;
    }
  };

  updatePointsChunked(createGeoJSON());

  return;
}
