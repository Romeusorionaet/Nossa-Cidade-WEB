"use client";

import type { businessPointType } from "@/@types/business-point-type";
import { useSearchBusinessPoints } from "@/hooks/use-app-queries/use-search-business-points";
import { useSearchParams } from "next/navigation";
import { createContext, useEffect, useState } from "react";

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
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  const { data: businessPointsFiltered = [] } = useSearchBusinessPoints({
    query,
  });

  const accessQuery = (value: string) => {
    setQuery(value);
  };

  useEffect(() => {
    if (!query) {
      const fetchQuery = () => {
        accessQuery(query as string);
      };

      fetchQuery();
    }
  }, [query]);

  return (
    <FilterBusinessPointsContext.Provider
      value={{ businessPointsFiltered, accessQuery }}
    >
      {children}
    </FilterBusinessPointsContext.Provider>
  );
}
