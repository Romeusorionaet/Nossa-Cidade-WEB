import { useGetBusinessPointForMapping } from "./use-app-queries/use-get-business-point-for-mapping";
import { useGetBusinessPointCategories } from "./use-app-queries/use-get-business-point-categories";
import { FilterBusinessPointsContext } from "@/contexts/filter-business-points.context";
import { useProviderMapContainer } from "./use-provider-map-container";
import { initializeMap } from "@/app/map-city/helpers/initialize-map";
import { useContext, useEffect, useRef, useState } from "react";

export function useMapCity() {
  const { mapContainerRef, providerMapContainer } = useProviderMapContainer();
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const [togglePointType, setTogglePointType] = useState(false);
  const [startPoint, setStartPoint] = useState<[number, number]>([0, 0]);
  const [endPoint, setEndPoint] = useState<[number, number]>([0, 0]);
  const [isMapLoading, setIsMapLoading] = useState(true);

  const { businessPointsFiltered, accessQuery } = useContext(
    FilterBusinessPointsContext,
  );
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

  const existPointsToShow =
    !isLoadingBusinessPoint && !isLoadingBusinessPointCategory;

  useEffect(() => {
    if (existPointsToShow) {
      initializeMap({
        mapContainerRef,
        providerMapContainer,
        handlePointRoute,
        businessPointsFiltered,
        pointsToShow,
        businessPointCategories,
        markersRef,
      }).then(() => setIsMapLoading(false));
    }
  }, [pointsToShow, mapContainerRef, providerMapContainer, existPointsToShow]);

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
  };
}
