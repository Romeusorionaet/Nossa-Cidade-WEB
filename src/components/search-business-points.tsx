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
    <>
      <input
        type="text"
        defaultValue={query}
        placeholder="farmácia"
        onChange={(e) => setQuery(e.target.value)}
        className="rounded-md p-1 text-black"
        required
      />
      <button
        type="button"
        onClick={() => handleSaveQuery()}
        className="rounded-md bg-black p-1"
      >
        Buscar
      </button>
    </>
  );
}
