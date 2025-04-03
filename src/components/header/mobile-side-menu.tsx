import { ArrowLeft, CornerDownRight, Plus, X } from "lucide-react";
import { useContext, useState } from "react";
import Link from "next/link";
import { MobileSideMenuFormContext } from "@/contexts/mobile-side-menu-provider";
import { AppStoreLinks } from "../app-store-links";
import { merchantMenu } from "@/constants/sub-menu-list/merchant-menu";
import { mapMenu } from "@/constants/sub-menu-list/map-menu";
import { resourcesMenu } from "@/constants/sub-menu-list/resources-menu";
import { pricesMenu } from "@/constants/sub-menu-list/prices-menu";

export function MobileSideMenu() {
  const { sideMenuIsOpen, handleSideMenu } = useContext(
    MobileSideMenuFormContext,
  );

  const [menuItem, setMenuItem] = useState<string>("");
  const [subMenuIsOpen, setSubMenuIsOpen] = useState(false);

  const handleSubMenuAside = (item: string) => {
    setMenuItem(item);
    setSubMenuIsOpen((prevState) => !prevState);
  };

  return (
    <aside
      aria-label="Menu lateral"
      data-value={sideMenuIsOpen}
      className="absolute z-30 w-full bg-black text-white duration-300 data-[value=false]:-ml-[800px] md:hidden"
    >
      <aside
        aria-label="Sub Menu lateral"
        data-value={subMenuIsOpen}
        className="absolute z-40 w-full bg-black text-white duration-300 data-[value=false]:-ml-[800px]"
      >
        <div className="relative w-full pt-16">
          <h1 className="text-center text-lg">{menuItem}</h1>
          <button
            type="button"
            onClick={() => handleSubMenuAside("")}
            className="absolute top-2 left-3"
          >
            <ArrowLeft size={32} />
          </button>
        </div>

        <nav className="h-screen w-full overflow-auto px-4 pb-44">
          <ul
            data-value={menuItem === "Comerciantes"}
            className="mt-12 space-y-3 text-2xl data-[value=false]:hidden"
          >
            {merchantMenu.map((resource) => (
              <li key={resource.title}>
                {resource.title}
                {resource.items.length > 0 && (
                  <ul className="mt-6 space-y-2 opacity-50">
                    {resource.items.map((item) => (
                      <li key={item.label} className="flex">
                        <CornerDownRight size={18} /> {item.label}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          <ul
            data-value={menuItem === "Mapa"}
            className="mt-12 space-y-3 text-2xl data-[value=false]:hidden"
          >
            {mapMenu.map((resource) => (
              <li key={resource.title}>
                {resource.title}
                {resource.items.length > 0 && (
                  <ul className="mt-6 space-y-2 opacity-50">
                    {resource.items.map((item) => (
                      <li key={item.label} className="flex">
                        <CornerDownRight size={18} /> {item.label}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          <ul
            data-value={menuItem === "Recursos"}
            className="mt-12 space-y-3 text-2xl data-[value=false]:hidden"
          >
            {resourcesMenu.map((resource) => (
              <li key={resource.title}>
                {resource.title}
                {resource.items.length > 0 && (
                  <ul className="mt-6 space-y-2 opacity-50">
                    {resource.items.map((item) => (
                      <li key={item.label} className="flex">
                        <CornerDownRight size={18} /> {item.label}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          <ul
            data-value={menuItem === "Prices"}
            className="mt-12 space-y-3 text-2xl data-[value=false]:hidden"
          >
            {pricesMenu.map((resource) => (
              <li key={resource.title}>
                {resource.title}
                {resource.items.length > 0 && (
                  <ul className="mt-6 space-y-2 opacity-50">
                    {resource.items.map((item) => (
                      <li key={item.label} className="flex">
                        <CornerDownRight size={18} /> {item.label}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <section
        id="section-active-sub-menu"
        className="relative h-screen w-full px-4"
      >
        <button
          type="button"
          onClick={() => handleSideMenu()}
          className="absolute top-2 right-3 z-40"
        >
          <X size={32} />
        </button>
        <div className="w-full pt-16">
          <h1 className="text-center text-xs uppercase">Nossa Cidade</h1>
        </div>

        <ul className="mt-14 space-y-3 text-2xl">
          <li>
            <button
              type="button"
              onClick={() => handleSubMenuAside("Comerciantes")}
              className="flex items-center gap-1"
            >
              Comerciantes <Plus size={16} />
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => handleSubMenuAside("Mapa")}
              className="flex items-center gap-1"
            >
              Mapa <Plus size={16} />
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => handleSubMenuAside("Recursos")}
              className="flex items-center gap-1"
            >
              Recursos <Plus size={16} />
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => handleSubMenuAside("Prices")}
              className="flex items-center gap-1"
            >
              Preços <Plus size={16} />
            </button>
          </li>
          <li>
            <Link
              href="#"
              className="inline-block w-56 rounded-full border px-5 py-4 text-center"
            >
              Notícias
            </Link>
          </li>
        </ul>

        <div className="mt-48">
          <Link
            href="#"
            className="inline-block w-full rounded-full border bg-white p-4 text-center text-black"
          >
            Registrar
          </Link>

          <AppStoreLinks />
        </div>
      </section>
    </aside>
  );
}
