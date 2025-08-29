"use client";

import { useState } from "react";

export function SearchInput() {
  const [search, setSearch] = useState("");

  return (
    <input
      placeholder="Buscar produto..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="mb-4 rounded-md border p-1"
    />
  );
}
