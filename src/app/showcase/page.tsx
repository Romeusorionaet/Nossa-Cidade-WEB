import { SearchInput } from "./components/search-input";
import { FilterSidebar } from "./components/filter-sidebar";
import { SectionProducts } from "./components/section-products";
import Link from "next/link";
import { OurCityLogo } from "@/components/our-city-logo";
import { APP_ROUTES } from "@/constants/app-routes";

export default function Showcase() {
  return (
    <div className="flex flex-col p-4 lg:flex-row">
      <aside className="flex flex-col justify-between gap-4 rounded-md border border-blue-500 p-2 lg:w-1/5">
        <div>
          <div className="flex justify-between">
            <SearchInput />
            <Link
              title="sair"
              href={APP_ROUTES.public.mapCity}
              className="underline"
            >
              Mapa
            </Link>
            <Link href={APP_ROUTES.public.dashboard}>
              <OurCityLogo />
            </Link>
          </div>
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
