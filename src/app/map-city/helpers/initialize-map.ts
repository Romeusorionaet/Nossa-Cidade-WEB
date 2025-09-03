import type { businessPointType } from "@/@types/business-point-type";
import { checkBusinessStatus } from "@/utils/check-business-status";
import { popupContent } from "./popup-content";
import { type RefObject } from "react";
import maplibregl from "maplibre-gl";
import { loadMapIcons } from "./load-map-icons";

interface Props {
  mapContainerRef: RefObject<HTMLDivElement | null>;
  providerMapContainer: () => Promise<maplibregl.Map>;
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

  const map = await providerMapContainer();

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

    const icons = businessPointCategories?.map((c) =>
      c.name.replace(/\s+/g, "_").toLowerCase(),
    ) ?? ["default"];

    await loadMapIcons(map, icons);

    if (!map.getSource("points")) {
      map.addSource("points", {
        type: "geojson",
        data: createGeoJSON(),
        cluster: false,
        clusterRadius: 50,
      });

      map.addLayer({
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
            0.1,
            15,
            0.5,
            18,
            1,
          ],
        },
      });
    }

    map.on("click", "points-layer", (e) => {
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
        .addTo(map);

      handlePointRoute({ lat: coordinates[1], lng: coordinates[0] });
    });

    map.on(
      "mouseenter",
      "points-layer",
      // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
      () => (map.getCanvas().style.cursor = "pointer"),
    );
    map.on(
      "mouseleave",
      "points-layer",
      // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
      () => (map.getCanvas().style.cursor = ""),
    );
  });

  const updatePoints = () => {
    const source = map.getSource("points") as maplibregl.GeoJSONSource;
    if (!source) return;
    source.setData(createGeoJSON());
  };

  updatePoints();

  return;
}
