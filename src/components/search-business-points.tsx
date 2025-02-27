"use client";

import { FilterBusinessPointsContext } from "@/contexts/filter-business-points";
import { useContext, useState } from "react";

export function SearchBusinessPoint() {
  const [query, setQuery] = useState("");
  const { accessQuery } = useContext(FilterBusinessPointsContext);

  const handleSaveQuery = () => {
    accessQuery(query);
  };
  return (
    <div className="flex w-full max-w-[620px] items-center rounded-md bg-white max-md:h-16">
      <button
        type="button"
        onClick={() => handleSaveQuery()}
        className="h-full rounded-l-md bg-black p-1 text-sm text-white"
      >
        Buscar
      </button>
      <div className="w-full rounded-tr-md bg-white">
        <input
          type="text"
          defaultValue={query}
          placeholder="farmácia"
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-1 pl-4 text-black outline-none"
          required
        />
      </div>
    </div>
  );
}
