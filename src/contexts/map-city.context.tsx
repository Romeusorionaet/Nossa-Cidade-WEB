import { useGetBusinessPointForMapping } from "@/hooks/use-app-queries/use-get-business-point-for-mapping";
import { useGetBusinessPointCategories } from "@/hooks/use-app-queries/use-get-business-point-categories";
import { FilterBusinessPointsContext } from "./filter-business-points.context";
import { useProviderMapContainer } from "@/hooks/use-provider-map-container";
import { initializeMap } from "@/app/map-city/helpers/initialize-map";
import { businessPointType } from "@/@types/business-point-type";
import {
  SetStateAction,
  createContext,
  useContext,
  ReactNode,
  RefObject,
  useEffect,
  Dispatch,
  useState,
  useRef,
} from "react";

interface MapCityContextType {
  togglePointType: boolean;
  startPoint: [number, number];
  endPoint: [number, number];
  accessQuery: (value: string) => void;
  setTogglePointType: Dispatch<SetStateAction<boolean>>;
  setStartPoint: Dispatch<SetStateAction<[number, number]>>;
  setEndPoint: Dispatch<SetStateAction<[number, number]>>;
  businessPointNotFound: boolean;
  businessPointsFiltered: businessPointType[];
  providerMapContainer: () => Promise<any>;
  mapContainerRef: RefObject<HTMLDivElement | null>;
}

interface MapCityContextProps {
  children: ReactNode;
}

export const MapCityContext = createContext({} as MapCityContextType);

export function MapCityContextProvider({ children }: MapCityContextProps) {
  const { mapContainerRef, providerMapContainer } = useProviderMapContainer();
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const [togglePointType, setTogglePointType] = useState(false);
  const [startPoint, setStartPoint] = useState<[number, number]>([0, 0]);
  const [endPoint, setEndPoint] = useState<[number, number]>([0, 0]);
  const { businessPointsFiltered, accessQuery } = useContext(
    FilterBusinessPointsContext,
  );

  const businessPointNotFound = businessPointsFiltered.length === 0;

  const { data: businessPoints } = useGetBusinessPointForMapping();
  const { data: businessPointCategories } = useGetBusinessPointCategories();

  const stateSetters = {
    setTogglePointType,
    setStartPoint,
    setEndPoint,
  };

  const handlePointRoute = ({ lat, lng }: { lat: number; lng: number }) => {
    setTogglePointType((prev) => {
      if (!prev) {
        setStartPoint([lng, lat]);
      } else {
        setEndPoint([lng, lat]);
      }
      return prev;
    });
  };

  const pointsToShow = businessPointNotFound
    ? businessPoints
    : businessPointsFiltered;

  useEffect(() => {
    if (pointsToShow !== undefined) {
      const initialize = async () => {
        return await initializeMap({
          mapContainerRef,
          providerMapContainer,
          handlePointRoute,
          businessPointsFiltered,
          pointsToShow,
          businessPointCategories,
          markersRef,
        });
      };

      initialize();
    }
  }, [pointsToShow, mapContainerRef, providerMapContainer]);

  return (
    <MapCityContext.Provider
      value={{
        businessPointsFiltered,
        businessPointNotFound,
        mapContainerRef,
        togglePointType,
        startPoint,
        endPoint,
        providerMapContainer,
        accessQuery,
        ...stateSetters,
      }}
    >
      {children}
    </MapCityContext.Provider>
  );
}
