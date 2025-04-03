"use client";

import type { businessPointType } from "@/@types/business-point-type";
import { useSearchBusinessPoints } from "@/hooks/use-app-queries/use-search-business-points";
import { createContext, useState } from "react";

interface FilterBusinessPointsContextType {
  businessPointsFiltered: businessPointType[];
  accessQuery: (value: string) => void;
}

interface FilterBusinessPointsContextProps {
  children: React.ReactNode;
}

export const FilterBusinessPointsContext = createContext(
  {} as FilterBusinessPointsContextType,
);

export function FilterBusinessPointsContextProvider({
  children,
}: FilterBusinessPointsContextProps) {
  const [query, setQuery] = useState("");

  const { data: businessPointsFiltered = [] } = useSearchBusinessPoints({
    query,
  });

  const accessQuery = (value: string) => {
    setQuery(value);
  };

  return (
    <FilterBusinessPointsContext.Provider
      value={{ businessPointsFiltered, accessQuery }}
    >
      {children}
    </FilterBusinessPointsContext.Provider>
  );
}
