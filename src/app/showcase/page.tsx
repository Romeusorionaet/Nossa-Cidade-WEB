import { SearchInput } from "./components/search-input";
import { FilterSidebar } from "./components/filter-sidebar";
import { SectionProducts } from "./components/section-products";

export default function Showcase() {
  return (
    <div className="flex flex-col p-4 lg:flex-row">
      <aside className="flex flex-col justify-between gap-4 rounded-md border border-blue-500 p-2 lg:w-1/5">
        <div>
          <SearchInput />
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

        <SectionProducts />
      </main>
    </div>
  );
}
