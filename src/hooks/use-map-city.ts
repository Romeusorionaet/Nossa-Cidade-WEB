import { useGetBusinessPointForMapping } from "./use-app-queries/use-get-business-point-for-mapping";
import { useGetBusinessPointCategories } from "./use-app-queries/use-get-business-point-categories";
import { useProviderMapContainer } from "./use-provider-map-container";
import { initializeMap } from "@/app/map-city/helpers/initialize-map";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSearchBusinessPoints } from "./use-app-queries/use-search-business-points";

export function useMapCity() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const { data: businessPointsFiltered = [] } = useSearchBusinessPoints({
    query,
  });

  const filterBusinessPoints = (value: string) => {
    setQuery(value);
  };

  const { mapContainerRef, providerMapContainer } = useProviderMapContainer();
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const [pointRoute, setPointRoute] = useState([0, 0]);
  const [isMapLoading, setIsMapLoading] = useState(true);

  const businessPointNotFound = businessPointsFiltered.length === 0;

  const { data: businessPoints, isLoading: isLoadingBusinessPoint } =
    useGetBusinessPointForMapping();
  const {
    data: businessPointCategories,
    isLoading: isLoadingBusinessPointCategory,
  } = useGetBusinessPointCategories();

  const handlePointRoute = ({ lat, lng }: { lat: number; lng: number }) => {
    setPointRoute([lng, lat]);
  };

  const pointsToShow = businessPointNotFound
    ? [...(businessPoints ?? [])]
    : [...(businessPointsFiltered ?? [])];

  const isReady = !isLoadingBusinessPoint && !isLoadingBusinessPointCategory;

  useEffect(() => {
    if (isReady) {
      initializeMap({
        mapContainerRef,
        providerMapContainer,
        handlePointRoute,
        pointsToShow,
        businessPointCategories,
      }).then(() => setIsMapLoading(false));
    }
  }, [pointsToShow, mapContainerRef, providerMapContainer, isReady]);

  return {
    mapContainerRef,
    providerMapContainer,
    markersRef,
    pointRoute,
    filterBusinessPoints,
    businessPointsFiltered,
    businessPointNotFound,
    isMapLoading,
    isLoadingBusinessPoint,
    isLoadingBusinessPointCategory,
    handlePointRoute,
  };
}
