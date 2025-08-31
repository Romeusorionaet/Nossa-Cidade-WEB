"use client";

import { openRouteServiceDriveCar } from "@/actions/services/open-route-services";
import { getMarkerElement } from "@/utils/get-marker-element";
import { useRef, useState } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import maplibregl from "maplibre-gl";
import "@/assets/styles/utilities/scrollbar.css";
import { SearchBusinessPoint } from "@/components/search-business-points";
import { checkBusinessStatus } from "@/utils/check-business-status";
import { ArrowLeftSquare, ArrowRightSquare } from "lucide-react";
import { OpeningHoursList } from "@/components/opening-hours-list";
import { WEEK_DAYS } from "@/constants/week-days-order";
import { DAYS_OF_WEEK_DDD } from "@/constants/day-of-week-ddd";
import { useMapCity } from "@/hooks/use-map-city";
import { resetMarkersVisibility } from "../helpers/marker";
import { useRouter } from "next/navigation";
import { routeControlUI } from "../helpers/route-control-ui";

interface TravelInfo {
  duration: number;
  distanceKm: number;
}

export function MapComponent() {
  const {
    markersMap,
    pointRoute,
    filterBusinessPoints,
    isMapLoading,
    mapContainerRef,
    providerMapContainer,
    businessPointNotFound,
    businessPointsFiltered,
    isLoadingBusinessPoint,
    isLoadingBusinessPointCategory,
  } = useMapCity();

  const {
    togglePointType,
    setTogglePointType,
    startPoint,
    setStartPoint,
    endPoint,
    setEndPoint,
    handleChangeArea,
  } = routeControlUI(pointRoute);

  const routeMarkersRef = useRef<maplibregl.Marker[]>([]);
  const [travelInfo, setTravelInfo] = useState<TravelInfo | null>(null);
  const [toggleWindowSearch, setToggleWindowSearch] = useState(false);
  const [isOpenAsideControl, setIsOpenAsideControl] = useState(true);

  const router = useRouter();

  const myLocation: [number, number] = [-35.134496, -6.375401]; // TODO for while

  const handleAsideRouteControl = () => {
    isOpenAsideControl
      ? setIsOpenAsideControl(false)
      : setIsOpenAsideControl(true);
  };

  const handleAsideSearch = () => {
    toggleWindowSearch
      ? setToggleWindowSearch(false)
      : setToggleWindowSearch(true);
  };

  const handleCleanSearch = () => {
    setToggleWindowSearch(false);
    filterBusinessPoints("");
    resetMarkersVisibility(markersMap);
  };

  const handlePlotRoute = async (
    start: [number, number],
    end: [number, number],
  ) => {
    const map = await providerMapContainer();

    if (!start[0] || !end[1]) {
      alert("Selecione os pontos de início e fim antes de traçar a rota.");
      return;
    }

    setStartPoint(start);
    setEndPoint(end);

    routeMarkersRef.current.forEach((marker) => marker.remove());
    routeMarkersRef.current = [];

    const startMarker = new maplibregl.Marker({ color: "red" })
      .setLngLat(start)
      .addTo(map);
    const endMarker = new maplibregl.Marker({
      element: getMarkerElement({
        icon: "dot",
        sizeIcon: "small",
        sizeName: "small",
        name: "",
      }),
    })
      .setLngLat(end)
      .addTo(map);

    routeMarkersRef.current.push(startMarker, endMarker);

    await openRouteServiceDriveCar({
      startPoint: start,
      endPoint: end,
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

    setTogglePointType("");
  };

  const handleSetLocation = () => {
    setStartPoint(myLocation);
    setTogglePointType("start");
  };

  const handleSelectedPlotRoute = async ({
    lat,
    lng,
  }: {
    lat: number;
    lng: number;
  }) => {
    const newStart = myLocation;
    const newEnd = [lat, lng] as [number, number];

    await handlePlotRoute(newStart, newEnd);

    setToggleWindowSearch(false);
  };

  const handleCleanRoute = async () => {
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
    setStartPoint([0, 0]);
    setEndPoint([0, 0]);
    setTogglePointType("start");
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="relative h-screen overflow-hidden">
      <button
        type="button"
        onClick={() => handleGoBack()}
        className="online-block absolute top-0 left-0 z-30 rounded-br-md border bg-white p-2 text-base text-black"
      >
        Sair
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

      {travelInfo && (
        <div className="absolute top-12 left-1 rounded-md bg-white p-2 md:top-16">
          <span>🚗</span>
          <p className="text-sm text-black">
            {travelInfo.duration.toFixed(2)} min
          </p>
          <p className="text-sm text-black">
            {travelInfo.distanceKm.toFixed(2)} km
          </p>
        </div>
      )}

      {startPoint[0] && (
        <aside className="absolute top-1 right-1 rounded-md bg-white p-2 text-black">
          <div>
            {isOpenAsideControl ? (
              <button type="button" onClick={() => handleAsideRouteControl()}>
                <ArrowRightSquare />
              </button>
            ) : (
              <button type="button" onClick={() => handleAsideRouteControl()}>
                <ArrowLeftSquare />
              </button>
            )}
          </div>

          <div
            data-value={isOpenAsideControl}
            className="space-y-3 data-[value=false]:hidden"
          >
            <div>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => handleSetLocation()}
                  className="w-full rounded-xs border p-1 text-sm"
                >
                  Inserir minha 📍
                </button>

                <p className="text-sm">Início:</p>
              </div>
              <button
                type="button"
                onClick={() => handleChangeArea("start")}
                data-value={togglePointType === "start"}
                className="h-14 w-full rounded-md border p-1 data-[value=true]:border-red-500"
              >
                <p className="text-xs opacity-60">
                  lat: {startPoint[0].toFixed(6)}
                </p>
                <p className="text-xs opacity-60">
                  lng: {startPoint[1].toFixed(6)}
                </p>
              </button>
            </div>

            <div>
              <p className="text-sm">Fim:</p>

              <button
                type="button"
                onClick={() => handleChangeArea("end")}
                data-value={togglePointType === "end"}
                className="h-14 w-full rounded-md border text-xs data-[value=true]:border-red-500"
              >
                {endPoint[1] && (
                  <div>
                    <div>
                      <p className="text-xs opacity-60">
                        lat: {endPoint[0].toFixed(6)}
                      </p>
                      <p className="text-xs opacity-60">
                        lng: {endPoint[1].toFixed(6)}
                      </p>
                    </div>
                  </div>
                )}
              </button>
            </div>

            <div className="flex flex-col space-y-2">
              <button
                type="button"
                onClick={() => handlePlotRoute(startPoint, endPoint)}
                className="w-full rounded-xs border p-1 text-sm"
              >
                traçar rota
              </button>

              <button
                type="button"
                onClick={() => handleCleanRoute()}
                className="rounded-xs border p-1 text-sm"
              >
                Limpar rota
              </button>
            </div>
          </div>
        </aside>
      )}

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
                  onClick={() =>
                    handleSelectedPlotRoute({
                      lat: item.location.latitude,
                      lng: item.location.longitude,
                    })
                  }
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
