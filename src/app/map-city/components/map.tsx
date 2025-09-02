"use client";

import { openRouteServiceDriveCar } from "@/actions/services/open-route-services";
import { useRef, useState } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import maplibregl from "maplibre-gl";
import "@/assets/styles/utilities/scrollbar.css";
import { SearchBusinessPoint } from "@/components/search-business-points";
import { checkBusinessStatus } from "@/utils/check-business-status";
import { OpeningHoursList } from "@/components/opening-hours-list";
import { WEEK_DAYS } from "@/constants/week-days-order";
import { DAYS_OF_WEEK_DDD } from "@/constants/day-of-week-ddd";
import { useMapCity } from "@/hooks/use-map-city";
import { useRouter } from "next/navigation";
import { LogOut, Slash } from "lucide-react";

interface TravelInfo {
  duration: number;
  distanceKm: number;
}

export function MapComponent() {
  const {
    mapContainerRef,
    providerMapContainer,
    pointRoute,
    filterBusinessPoints,
    businessPointsFiltered,
    businessPointNotFound,
    isMapLoading,
    isLoadingBusinessPoint,
    isLoadingBusinessPointCategory,
    handlePointRoute,
  } = useMapCity();

  const routeMarkersRef = useRef<maplibregl.Marker[]>([]);
  const [travelInfo, setTravelInfo] = useState<TravelInfo | null>(null);
  const [toggleWindowSearch, setToggleWindowSearch] = useState(false);
  const [isOpenAsideRouteControl, setIsOpenAsideRouteControl] = useState(false);

  const router = useRouter();

  const myLocation: [number, number] = [-35.134496, -6.375401]; // TODO for while
  const hasPointRoute = Boolean(pointRoute[0]);

  const handleAsideSearch = () => {
    toggleWindowSearch
      ? setToggleWindowSearch(false)
      : setToggleWindowSearch(true);
  };

  const handleCleanSearch = () => {
    setToggleWindowSearch(false);
    filterBusinessPoints("");
  };

  const handlePlotRoute = async () => {
    setToggleWindowSearch(false);

    const map = await providerMapContainer();

    routeMarkersRef.current.forEach((marker) => marker.remove());
    routeMarkersRef.current = [];

    const startMarker = new maplibregl.Marker({ color: "red" })
      .setLngLat(myLocation)
      .addTo(map);

    routeMarkersRef.current.push(startMarker);

    await openRouteServiceDriveCar({
      startPoint: myLocation,
      endPoint: [pointRoute[0], pointRoute[1]],
    }).then((data) => {
      if (!data.features || data.features.length === 0) {
        alert("Não foi possível encontrar uma rota.");
        return;
      }

      const route = data.features[0].geometry.coordinates;
      const duration = data.features[0]?.properties?.segments[0]?.duration;
      const distanceKm = data.features[0]?.properties?.summary?.distance / 1000;

      setTravelInfo({
        duration: duration / 60,
        distanceKm,
      });

      if (!route) {
        alert("A rota não contém geometria.");
        return;
      }

      const routeGeoJSON: GeoJSON.Feature<GeoJSON.LineString> = {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: route,
        },
      };

      if (map.getSource("route")) {
        (map.getSource("route") as maplibregl.GeoJSONSource).setData(
          routeGeoJSON,
        );
      } else {
        map.addSource("route", {
          type: "geojson",
          data: routeGeoJSON,
        });

        map.addLayer({
          id: "route",
          type: "line",
          source: "route",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#007cbf",
            "line-width": 5,
          },
        });
      }
    });
  };

  const handleCleanRoute = async () => {
    setIsOpenAsideRouteControl(false);
    handlePointRoute({ lat: 0, lng: 0 });

    const map = await providerMapContainer();

    if (!map) return;

    routeMarkersRef.current.forEach((marker) => marker.remove());
    routeMarkersRef.current = [];

    if (map.getLayer("route")) {
      map.removeLayer("route");
    }

    if (map.getSource("route")) {
      map.removeSource("route");
    }

    setTravelInfo(null);
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="relative h-screen overflow-hidden">
      <button
        type="button"
        title="sair"
        onClick={() => handleGoBack()}
        className="online-block absolute top-0 left-0 z-30 rounded-br-md p-2 text-base text-black hover:bg-white/50"
      >
        <LogOut />
      </button>

      {isMapLoading && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center">
          <svg
            className="mb-4 h-12 w-12 animate-spin text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <title>Loading Map</title>
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
          <p className="text-2xl font-semibold text-gray-700 drop-shadow">
            Carregando mapa...
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Aguarde, estamos preparando os dados para você
          </p>
        </div>
      )}

      <div ref={mapContainerRef} className="h-full w-full overflow-hidden" />

      {(isLoadingBusinessPoint || isLoadingBusinessPointCategory) && (
        <div className="absolute top-4 right-4 z-50 flex animate-pulse items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 p-3 shadow-md">
          <svg
            className="h-5 w-5 animate-spin text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <title>Loading data</title>
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
          <p className="text-sm font-medium text-blue-700">
            Carregando dados do mapa...
          </p>
        </div>
      )}

      <aside
        data-value={!!travelInfo}
        className="absolute top-12 left-1 rounded-md bg-white/50 p-2 data-[value=false]:hidden md:top-16"
      >
        <div className="flex items-center gap-0.5">
          <span className="inline-block">🚗</span>
          <p className="inline-block text-black max-md:text-xs">
            {travelInfo?.duration.toFixed(1)} min
          </p>
          <Slash width={10} />
          <p className="inline-block text-black max-md:text-xs">
            {travelInfo?.distanceKm.toFixed(1)} km
          </p>
        </div>
      </aside>

      <aside
        data-value={isOpenAsideRouteControl || hasPointRoute}
        className="absolute top-1 right-1 flex flex-col gap-2 rounded-md bg-white/30 p-1 text-black data-[value=false]:hidden"
      >
        <button
          type="button"
          onClick={() => handlePlotRoute()}
          className="w-full rounded-xs border bg-slate-700 p-1 text-sm text-white hover:bg-slate-950"
        >
          traçar rota
        </button>

        <button
          type="button"
          onClick={() => handleCleanRoute()}
          className="rounded-xs border bg-red-900 p-1 text-sm text-white hover:bg-red-950"
        >
          Limpar rota
        </button>
      </aside>

      {!businessPointNotFound && (
        <button
          type="button"
          onClick={() => handleAsideSearch()}
          className="absolute right-1 bottom-20 rounded-full bg-white p-5 text-black duration-300 hover:bg-green-200 md:bottom-12"
        >
          <p className="text-2xl">🗺️</p>
          <span className="absolute top-0 right-7 flex h-5 w-5 items-center justify-center rounded-full bg-green-200 text-sm">
            {businessPointsFiltered.length}
          </span>
        </button>
      )}

      <aside
        data-value={toggleWindowSearch}
        onWheel={(e) => e.stopPropagation()}
        className="absolute top-0 z-20 h-full w-full rounded-md bg-white p-1 text-black data-[value=false]:hidden max-md:pb-10 md:h-3/4 md:max-w-96"
      >
        <div className="relative h-10">
          <button
            type="button"
            onClick={() => handleAsideSearch()}
            className="absolute top-1 right-0 h-9 w-8 cursor-pointer rounded-full bg-slate-400 p-1 text-xl text-white"
          >
            X
          </button>
          <h2 className="border-b text-center text-xl">Resultado da busca</h2>
        </div>

        <div className="scrollbar mt-4 flex h-[85%] w-full flex-col overflow-auto rounded-md p-1">
          {businessPointsFiltered.map((item) => (
            <div
              key={item.id}
              className="mb-2 rounded-xs border bg-slate-100 p-2"
            >
              <div className="flex justify-between">
                <p className="text-sm font-bold">{item.name}</p>
                <p className="text-sm">
                  {checkBusinessStatus(item.openingHours)}
                </p>
              </div>

              <OpeningHoursList
                openingHours={item.openingHours}
                orderDays={DAYS_OF_WEEK_DDD}
                weekDays={WEEK_DAYS}
              />

              <div className="mt-2 flex w-full justify-end">
                <button
                  type="button"
                  onClick={() => handlePlotRoute()}
                  className="cursor-pointer border p-1 text-xs"
                >
                  traçar rota
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => handleCleanSearch()}
          className="mt-5 cursor-pointer rounded-md border p-1 text-sm"
        >
          Limpar busca
        </button>
      </aside>

      <div className="absolute right-0 bottom-1 z-10 flex w-full justify-end px-1 md:bottom-1 md:w-2/3">
        <SearchBusinessPoint filterBusinessPoints={filterBusinessPoints} />
      </div>
    </div>
  );
}
