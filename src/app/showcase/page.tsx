"use client";

import { useState } from "react";
import { ProductCard } from "./components/product-card";
import { SearchInput } from "./components/search-input";
import { FilterSidebar } from "./components/filter-sidebar";

export default function Showcase() {
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col p-4 lg:flex-row">
      <aside className="flex flex-col justify-between gap-4 rounded-md border border-blue-500 p-2 lg:w-1/5">
        <div>
          <SearchInput value={search} onChange={setSearch} />
          <FilterSidebar />
        </div>

        <button
          type="button"
          className="mx-auto w-full max-w-48 rounded-md bg-blue-500 p-2 text-white"
        >
          Buscar
        </button>
      </aside>
      <main className="lg:w-4/5">
        <div className="w-full border border-blue-500" />

        <div className="mt-2 flex flex-wrap justify-center gap-2">
          <ProductCard
            image="https://www.bing.com/th?id=OPHS.tR%2bZJ%2bpHRRC00w474C474&o=5&pid=21.1&w=148&h=216&qlt=100&dpr=1&bw=6&bc=FFFFFF"
            hoverImage="https://www.bing.com/th?id=OPHS.Mjs7PJud5CCA2A474C474&o=5&pid=21.1&w=148&h=216&qlt=100&dpr=1&bw=6&bc=FFFFFF"
            name="Camiseta Estilosa"
            price={59.9}
            merchants="Loja X"
            slug="teste"
          />

          <ProductCard
            image="https://www.bing.com/th?id=OPHS.tR%2bZJ%2bpHRRC00w474C474&o=5&pid=21.1&w=148&h=216&qlt=100&dpr=1&bw=6&bc=FFFFFF"
            hoverImage="https://www.bing.com/th?id=OPHS.Mjs7PJud5CCA2A474C474&o=5&pid=21.1&w=148&h=216&qlt=100&dpr=1&bw=6&bc=FFFFFF"
            name="Camiseta Estilosa"
            price={59.9}
            merchants="Loja X"
            slug="teste"
          />
          <ProductCard
            image="https://www.bing.com/th?id=OPHS.tR%2bZJ%2bpHRRC00w474C474&o=5&pid=21.1&w=148&h=216&qlt=100&dpr=1&bw=6&bc=FFFFFF"
            hoverImage="https://www.bing.com/th?id=OPHS.Mjs7PJud5CCA2A474C474&o=5&pid=21.1&w=148&h=216&qlt=100&dpr=1&bw=6&bc=FFFFFF"
            name="Camiseta Estilosa"
            price={59.9}
            merchants="Loja X"
            slug="teste"
          />
          <ProductCard
            image="https://www.bing.com/th?id=OPHS.tR%2bZJ%2bpHRRC00w474C474&o=5&pid=21.1&w=148&h=216&qlt=100&dpr=1&bw=6&bc=FFFFFF"
            hoverImage="https://www.bing.com/th?id=OPHS.Mjs7PJud5CCA2A474C474&o=5&pid=21.1&w=148&h=216&qlt=100&dpr=1&bw=6&bc=FFFFFF"
            name="Camiseta Estilosa"
            price={59.9}
            merchants="Loja X"
            slug="teste"
          />
          <ProductCard
            image="https://www.bing.com/th?id=OPHS.tR%2bZJ%2bpHRRC00w474C474&o=5&pid=21.1&w=148&h=216&qlt=100&dpr=1&bw=6&bc=FFFFFF"
            hoverImage="https://www.bing.com/th?id=OPHS.Mjs7PJud5CCA2A474C474&o=5&pid=21.1&w=148&h=216&qlt=100&dpr=1&bw=6&bc=FFFFFF"
            name="Camiseta Estilosa"
            price={59.9}
            merchants="Loja X"
            slug="teste"
          />
          <ProductCard
            image="https://www.bing.com/th?id=OPHS.tR%2bZJ%2bpHRRC00w474C474&o=5&pid=21.1&w=148&h=216&qlt=100&dpr=1&bw=6&bc=FFFFFF"
            hoverImage="https://www.bing.com/th?id=OPHS.Mjs7PJud5CCA2A474C474&o=5&pid=21.1&w=148&h=216&qlt=100&dpr=1&bw=6&bc=FFFFFF"
            name="Camiseta Estilosa"
            price={59.9}
            merchants="Loja X"
            slug="teste"
          />
          <ProductCard
            image="https://www.bing.com/th?id=OPHS.tR%2bZJ%2bpHRRC00w474C474&o=5&pid=21.1&w=148&h=216&qlt=100&dpr=1&bw=6&bc=FFFFFF"
            hoverImage="https://www.bing.com/th?id=OPHS.Mjs7PJud5CCA2A474C474&o=5&pid=21.1&w=148&h=216&qlt=100&dpr=1&bw=6&bc=FFFFFF"
            name="Camiseta Estilosa"
            price={59.9}
            merchants="Loja X"
            slug="teste"
          />
        </div>
      </main>
    </div>
  );
}
