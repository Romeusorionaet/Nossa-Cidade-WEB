"use client";

import { useState } from "react";
import { ProductCard } from "./components/product-card";
import { CategoryTabs } from "./components/category-tabs";
import { SearchInput } from "./components/search-input";
import { FilterSidebar } from "./components/filter-sidebar";

export default function Showcase() {
  const [categorySelected, setCategorySelected] = useState("all");
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col gap-6 p-4 lg:flex-row">
      <aside className="rounded-md p-2 lg:w-1/5 lg:shadow-xl">
        <SearchInput value={search} onChange={setSearch} />
        <FilterSidebar />
      </aside>
      <main className="lg:w-4/5">
        <CategoryTabs
          selected={categorySelected}
          onSelect={setCategorySelected}
        />

        <div className="mt-2 w-full border border-blue-500" />

        <div className="mt-4 flex flex-wrap justify-center gap-6">
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
