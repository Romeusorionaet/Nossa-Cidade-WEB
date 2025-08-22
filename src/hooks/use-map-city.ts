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

  const accessQuery = (value: string) => {
    setQuery(value);
  };

  const { mapContainerRef, providerMapContainer, markersMap } =
    useProviderMapContainer();
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const [togglePointType, setTogglePointType] = useState(false);
  const [startPoint, setStartPoint] = useState<[number, number]>([0, 0]);
  const [endPoint, setEndPoint] = useState<[number, number]>([0, 0]);
  const [isMapLoading, setIsMapLoading] = useState(true);

  const businessPointNotFound = businessPointsFiltered.length === 0;

  const { data: businessPoints, isLoading: isLoadingBusinessPoint } =
    useGetBusinessPointForMapping();
  const {
    data: businessPointCategories,
    isLoading: isLoadingBusinessPointCategory,
  } = useGetBusinessPointCategories();

  const pointsToShow = businessPointNotFound
    ? businessPoints
    : businessPointsFiltered;

  const handlePointRoute = ({ lat, lng }: { lat: number; lng: number }) => {
    setTogglePointType((prev) => {
      if (!prev) setStartPoint([lng, lat]);
      else setEndPoint([lng, lat]);
      return !prev;
    });
  };

  const isLoadingPointsToShow =
    !isLoadingBusinessPoint && !isLoadingBusinessPointCategory;

  useEffect(() => {
    if (isLoadingPointsToShow) {
      initializeMap({
        mapContainerRef,
        providerMapContainer,
        handlePointRoute,
        businessPointsFiltered,
        pointsToShow,
        businessPointCategories,
        markersMap,
      }).then(() => setIsMapLoading(false));
    }
  }, [
    pointsToShow,
    mapContainerRef,
    providerMapContainer,
    isLoadingPointsToShow,
  ]);

  return {
    mapContainerRef,
    providerMapContainer,
    markersRef,
    togglePointType,
    setTogglePointType,
    startPoint,
    setStartPoint,
    endPoint,
    setEndPoint,
    accessQuery,
    businessPointsFiltered,
    businessPointNotFound,
    pointsToShow,
    isMapLoading,
    isLoadingBusinessPoint,
    isLoadingBusinessPointCategory,
    handlePointRoute,
    markersMap,
  };
}
