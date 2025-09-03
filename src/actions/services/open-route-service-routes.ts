"use server";

type TravelMode = "driving-car" | "cycling-road" | "foot-walking";

interface Props {
  startPoint: [number, number];
  endPoint: [number, number];
  mode: TravelMode;
}

interface RouteResult {
  routeGeoJSON: GeoJSON.Feature<GeoJSON.LineString>;
  durationMinutes: number;
  distanceKm: number;
}

export async function openRouteServiceRoutes({
  startPoint,
  endPoint,
  mode,
}: Props): Promise<RouteResult | null> {
  try {
    const response = await fetch(
      `https://api.openrouteservice.org/v2/directions/${mode}?api_key=${process.env.OPENROUTESERVICE_KEY}&start=${startPoint[0]},${startPoint[1]}&end=${endPoint[0]},${endPoint[1]}`,
    );

    if (!response.ok) {
      console.error("Erro na API do OpenRouteService:", response.statusText);
      return null;
    }

    const data = await response.json();

    if (!data.features || data.features.length === 0) {
      console.warn("Nenhuma rota encontrada.");
      return null;
    }

    const route = data.features[0].geometry?.coordinates;
    const duration = data.features[0]?.properties?.segments[0]?.duration;
    const distanceKm = data.features[0]?.properties?.summary?.distance / 1000;

    if (!route || !duration || !distanceKm) {
      console.warn("Dados de rota incompletos.");
      return null;
    }

    const routeGeoJSON: GeoJSON.Feature<GeoJSON.LineString> = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: route,
      },
    };

    return {
      routeGeoJSON,
      durationMinutes: duration / 60,
      distanceKm,
    };
  } catch (err) {
    console.error("Erro ao buscar rota:", err);
    return null;
  }
}
