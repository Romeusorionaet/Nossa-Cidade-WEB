import type { businessPointType } from "@/@types/business-point-type";
import { checkBusinessStatus } from "@/utils/check-business-status";
import { popupContent } from "./popup-content";
import { type RefObject } from "react";
import maplibregl from "maplibre-gl";
import { loadMapIcons } from "./load-map-icons";
import type { FeatureCollection, Geometry, GeoJsonProperties } from "geojson";
import simplify from "simplify-geojson";

interface Props {
  mapContainerRef: RefObject<HTMLDivElement | null>;
  providerMapContainer: () => Promise<{
    mapRef: maplibregl.Map;
    geojson: FeatureCollection<Geometry, GeoJsonProperties>;
  }>;
  handlePointRoute: ({ lat, lng }: { lat: number; lng: number }) => void;
  pointsToShow: businessPointType[] | undefined;
  businessPointCategories:
    | {
        id: string;
        name: string;
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

  const { mapRef, geojson } = await providerMapContainer();

  const createGeoJSON = () => ({
    type: "FeatureCollection" as const,
    features:
      pointsToShow?.map((point) => {
        const category = businessPointCategories?.find(
          (c) => c.id === point.categoryId,
        );
        const iconName =
          category?.name.replace(/\s+/g, "_").toLowerCase() ?? "default";

        return {
          type: "Feature" as const,
          properties: {
            id: point.id,
            name: point.name,
            icon: iconName,
            status: checkBusinessStatus(point.openingHours),
          },
          geometry: {
            type: "Point" as const,
            coordinates: [point.location.latitude, point.location.longitude], // TODO: inverter depois
          },
        };
      }) ?? [],
  });

  mapRef.on("load", async () => {
    mapRef
      .getStyle()
      .layers?.filter((layer) => layer.id.includes("poi"))
      .forEach((layer) => mapRef.removeLayer(layer.id));

    const icons = businessPointCategories?.map((c) =>
      c.name.replace(/\s+/g, "_").toLowerCase(),
    ) ?? ["default"];

    await loadMapIcons(mapRef, icons);

    if (!mapRef.getSource("points")) {
      mapRef.addSource("points", {
        type: "geojson",
        data: createGeoJSON(),
        cluster: true,
        clusterRadius: 50,
      });

      const simplifiedGeojson = simplify(geojson, 0.01);

      mapRef.addSource("canguaretama", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: simplifiedGeojson.features,
        },
      });

      mapRef.addSource("mask", {
        type: "geojson",
        data: "/data/geojson/canguaretama-mask.geojson",
      });

      mapRef.addLayer({
        id: "mask-layer",
        type: "fill",
        source: "mask",
        paint: { "fill-color": "black", "fill-opacity": 0.5 },
      });

      mapRef.addLayer({
        id: "points-layer",
        type: "symbol",
        source: "points",
        layout: {
          "icon-image": ["get", "icon"],
          "icon-allow-overlap": true,
          "icon-ignore-placement": true,
          "icon-size": [
            "interpolate",
            ["linear"],
            ["zoom"],
            12,
            0.3,
            14,
            0.6,
            16,
            1,
          ],
        },
      });

      mapRef.on(
        "mouseenter",
        "points-layer",
        // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
        () => (mapRef.getCanvas().style.cursor = "pointer"),
      );
      mapRef.on(
        "mouseleave",
        "points-layer",
        // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
        () => (mapRef.getCanvas().style.cursor = ""),
      );
    }

    mapRef.on("click", "points-layer", (e) => {
      const feature = e.features?.[0];
      if (!feature) return;

      const coordinates =
        feature.geometry.type === "Point"
          ? feature.geometry.coordinates
          : [0, 0];
      const { name, status, id } = feature.properties as any;

      new maplibregl.Popup()
        .setLngLat(coordinates as [number, number])
        .setDOMContent(popupContent({ name, status, id }))
        .addTo(mapRef);

      handlePointRoute({ lat: coordinates[1], lng: coordinates[0] });
    });
  });

  let previousFeatures: string | null = null;
  const updatePointsChunked = (newData: GeoJSON.FeatureCollection) => {
    const source = mapRef.getSource("points") as maplibregl.GeoJSONSource;
    if (!source) return;

    const str = JSON.stringify(newData.features);
    if (str !== previousFeatures) {
      source.setData(newData);
      previousFeatures = str;
    }
  };

  updatePointsChunked(createGeoJSON());

  return;
}
