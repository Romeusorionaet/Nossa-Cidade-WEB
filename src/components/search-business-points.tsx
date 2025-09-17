"use client";

import { useState } from "react";

interface Props {
  filterBusinessPoints: (value: string) => void;
  handleCleanRoute: () => Promise<void>;
}

export function SearchBusinessPoint({
  filterBusinessPoints,
  handleCleanRoute,
}: Props) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    filterBusinessPoints(query);
    handleCleanRoute();
  };

  return (
    <div className="flex h-10 w-full max-w-[620px] items-center rounded-md bg-white">
      <button
        type="button"
        onClick={() => handleSearch()}
        className="h-full rounded-l-md bg-zinc-500 p-1 text-sm text-white hover:bg-zinc-600"
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
