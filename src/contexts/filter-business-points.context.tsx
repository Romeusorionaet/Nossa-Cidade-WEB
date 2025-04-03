"use client";

import type { businessPointType } from "@/@types/business-point-type";
import { searchBusinessPoints } from "@/actions/get/business-point/search-business-points";
import { QUERY_KEY_CACHE } from "@/constants/query-key-cache";
import { useQuery } from "@tanstack/react-query";
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

  const { data: businessPointsFiltered = [] } = useQuery({
    queryKey: [QUERY_KEY_CACHE.BPF, query],
    queryFn: () => (query ? searchBusinessPoints(query) : Promise.resolve([])),
    staleTime: 1000 * 60 * 60, // 60 minutes
    enabled: !!query,
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
