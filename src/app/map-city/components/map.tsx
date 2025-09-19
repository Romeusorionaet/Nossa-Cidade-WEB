"use client";

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
import { Bike, Car, Footprints, Locate, LogOut, Route } from "lucide-react";
import { openRouteServiceRoutes } from "@/actions/services/open-route-service-routes";
import { drawRouteLayer } from "../helpers/draw-route-layer";
import { AVG_SPEEDS } from "@/constants/avg-speeds";
import Link from "next/link";
import { APP_ROUTES } from "@/constants/app-routes";
import { getUserCurrentLocation } from "@/utils/get-user-current-location";
import { watchUserLocation } from "@/utils/watch-user-location";

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
  const [travelInfo, setTravelInfo] = useState<TravelInfoType | null>(null);
  const [toggleWindowSearch, setToggleWindowSearch] = useState(false);
  const [isOpenAsideRouteControl, setIsOpenAsideRouteControl] = useState(false);
  const [isLoadingPlotRoute, setIsLoadingPlotRoute] = useState(false);

  const hasPointRoute = Boolean(pointRoute[0]);

  const handleAsideSearch = () => {
    toggleWindowSearch
      ? setToggleWindowSearch(false)
      : setToggleWindowSearch(true);
  };

  const handleCleanSearch = () => {
    setToggleWindowSearch(false);
    filterBusinessPoints("");
    handleCleanRoute();
  };

  const cleanOldRoute = () => {
    routeMarkersRef.current.forEach((marker: any) => {
      if (marker.stop) {
        marker.stop();
      } else if (marker.remove) {
        marker.remove();
      }
    });
    routeMarkersRef.current = [];
  };

  const handlePlotRoute = async ({
    lng,
    lat,
  }: {
    lng: number;
    lat: number;
  }) => {
    setIsLoadingPlotRoute(true);
    cleanOldRoute();

    const { latitude, longitude, error } = await getUserCurrentLocation();

    if (error) {
      setIsLoadingPlotRoute(false);
      console.error(error);

      return;
    }

    setToggleWindowSearch(false);

    const { mapRef } = await providerMapContainer();

    const userMarker = new maplibregl.Marker({ color: "red" })
      .setLngLat([longitude, latitude])
      .addTo(mapRef);
    routeMarkersRef.current.push(userMarker);

    const drawRoute = async (
      start: [number, number],
      end: [number, number],
    ) => {
      const baseRoute = await openRouteServiceRoutes({
        startPoint: start,
        endPoint: end,
        mode: "driving-car",
      });

      setIsLoadingPlotRoute(false);

      if (!baseRoute) {
        alert("Não foi possível encontrar a rota.");
        return;
      }

      drawRouteLayer(mapRef, baseRoute.routeGeoJSON, "route-base");

      setTravelInfo({
        car: {
          distanceKm: baseRoute.distanceKm,
          durationMinutes: (baseRoute.distanceKm / AVG_SPEEDS.car) * 60,
        },
        motorcycle: {
          distanceKm: baseRoute.distanceKm,
          durationMinutes: (baseRoute.distanceKm / AVG_SPEEDS.motorcycle) * 60,
        },
        walking: {
          distanceKm: baseRoute.distanceKm,
          durationMinutes: (baseRoute.distanceKm / AVG_SPEEDS.walking) * 60,
        },
      });

      // simulateRouteAlongPath({
      //   userMarker,
      //   coordinates: currentRouteCoordinates,
      //   interval: 200,
      // });
    };

    await drawRoute([longitude, latitude], [lng, lat]);

    watchUserLocation({ routeMarkersRef, userMarker, mapRef });
  };

  const handleCleanRoute = async () => {
    setIsOpenAsideRouteControl(false);
    handlePointRoute({ lat: 0, lng: 0 });
    cleanOldRoute();

    const { mapRef } = await providerMapContainer();

    if (!mapRef) return;

    routeMarkersRef.current.forEach((marker) => marker.remove());
    routeMarkersRef.current = [];

    if (mapRef.getLayer("route-base")) {
      mapRef.removeLayer("route-base");
    }

    if (mapRef.getSource("route-base")) {
      mapRef.removeSource("route-base");
    }

    // stopUserTracking?.();
    setTravelInfo(null);
    // stopUserTracking = null;
  };

  const handleLocateUser = async () => {
    if (!navigator.geolocation) return;

    try {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
          });
        },
      );

      const { latitude, longitude } = position.coords;

      const { mapRef } = await providerMapContainer();

      mapRef.flyTo({
        center: [longitude, latitude],
        zoom: 15,
        essential: true,
      });

      const userMarker = new maplibregl.Marker({ color: "#007AFF" })
        .setLngLat([longitude, latitude])
        .addTo(mapRef);

      routeMarkersRef.current.push(userMarker);
    } catch (error) {
      console.warn("Erro ao pegar localização:", error);
      alert("Não foi possível obter sua localização.");
    }
  };

  return (
    <div className="relative h-screen overflow-hidden">
      <Link
        title="sair"
        href={APP_ROUTES.public.showcase}
        className="online-block fixed top-0 left-0 z-30 rounded-br-md bg-white/80 p-2 text-base text-black hover:bg-white/50"
      >
        <LogOut />
      </Link>

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
        {travelInfo?.car && (
          <div className="flex items-center gap-2 border-b border-blue-500 text-black max-md:text-xs">
            <Route width={16} />
            <span className="inline-block">
              {travelInfo.car.distanceKm.toFixed(1)} km
            </span>
          </div>
        )}

        {travelInfo?.car && (
          <div className="flex items-center gap-2">
            <Car width={16} />

            <p className="inline-block text-black max-md:text-xs">
              {travelInfo.car.durationMinutes.toFixed(1)} min
            </p>
          </div>
        )}
        {travelInfo?.motorcycle && (
          <div className="flex items-center gap-2">
            <Bike width={16} />
            <p className="inline-block text-black max-md:text-xs">
              {travelInfo.motorcycle.durationMinutes.toFixed(1)} min
            </p>
          </div>
        )}
        {travelInfo?.walking && (
          <div className="flex items-center gap-2">
            <Footprints width={16} />
            <p className="inline-block text-black max-md:text-xs">
              {travelInfo.walking.durationMinutes.toFixed(1)} min
            </p>
          </div>
        )}
      </aside>

      <aside
        data-value={isOpenAsideRouteControl || hasPointRoute}
        className="absolute top-1 right-1 flex flex-col gap-2 rounded-md bg-white/30 p-1 text-black data-[value=false]:hidden"
      >
        <button
          type="button"
          onClick={() =>
            handlePlotRoute({ lng: pointRoute[0], lat: pointRoute[1] })
          }
          disabled={isLoadingPlotRoute}
          data-value={isLoadingPlotRoute}
          className="w-full rounded-xs border bg-slate-700 p-1 text-sm text-white hover:bg-slate-950 data-[value=true]:cursor-not-allowed data-[value=true]:opacity-50"
        >
          traçar rota
        </button>

        <button
          type="button"
          onClick={() => handleCleanRoute()}
          disabled={isLoadingPlotRoute}
          data-value={isLoadingPlotRoute}
          className="rounded-xs border bg-red-900 p-1 text-sm text-white hover:bg-red-950 data-[value=true]:cursor-not-allowed data-[value=true]:opacity-50"
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
                  onClick={() =>
                    handlePlotRoute({
                      lng: item.location.longitude,
                      lat: item.location.latitude,
                    })
                  }
                  disabled={isLoadingPlotRoute}
                  data-value={isLoadingPlotRoute}
                  className="cursor-pointer border p-1 text-xs data-[value=true]:cursor-not-allowed data-[value=true]:opacity-50"
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
          disabled={isLoadingPlotRoute}
          data-value={isLoadingPlotRoute}
          className="mt-5 cursor-pointer rounded-md border p-1 text-sm data-[value=true]:cursor-not-allowed data-[value=true]:opacity-50"
        >
          Limpar busca
        </button>
      </aside>

      <div className="fixed right-0 bottom-1 z-10 flex w-full items-center justify-between gap-8 px-1 md:bottom-1">
        <button
          title="localização"
          type="button"
          onClick={handleLocateUser}
          className="h-1/2 rounded bg-white p-2 shadow"
        >
          <Locate className="h-4 w-4" />
        </button>

        <SearchBusinessPoint
          filterBusinessPoints={filterBusinessPoints}
          handleCleanRoute={handleCleanRoute}
        />
      </div>
    </div>
  );
}
