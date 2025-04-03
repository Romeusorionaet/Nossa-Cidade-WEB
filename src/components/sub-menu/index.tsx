import { SubMenuItem } from "@/components/sub-menu/sub-menu-item";
import { useEffect, useRef } from "react";
import { pricesMenu } from "@/constants/sub-menu-list/prices-menu";
import { resourcesMenu } from "@/constants/sub-menu-list/resources-menu";
import { merchantMenu } from "@/constants/sub-menu-list/merchant-menu";
import { mapMenu } from "@/constants/sub-menu-list/map-menu";

export interface SubMenuProps {
  eventIndicator: { visible: boolean };
  menuIndex: number | null;
}

export const SubMenu = ({ eventIndicator, menuIndex }: SubMenuProps) => {
  const submenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (eventIndicator.visible && submenuRef.current) {
        const activeSubmenu =
          submenuRef.current.querySelector<HTMLUListElement>(
            `ul[data-value="true"]`,
          );
        const firstItem = activeSubmenu?.querySelector<HTMLAnchorElement>("a");

        if (e.key === "Enter" && firstItem) {
          firstItem.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [eventIndicator.visible, menuIndex]);

  return (
    <div
      inert={!eventIndicator.visible}
      data-value={eventIndicator.visible}
      className="w-full -translate-y-96 bg-white pt-[clamp(5rem,8vw,12rem)] transition-all duration-500 ease-out data-[value=false]:opacity-20 data-[value=true]:translate-y-0"
    >
      <div
        data-value={eventIndicator.visible}
        className="hidden w-full items-end px-5 pb-6 data-[value=true]:flex lg:px-7 xl:px-12 xl:pb-10"
      >
        <nav ref={submenuRef} className="w-full">
          <ul
            id="submenu-merchant"
            role="menubar"
            inert={menuIndex !== 0}
            data-value={menuIndex === 0}
            className="flex w-full data-[value=false]:hidden"
          >
            {merchantMenu.map((section, index) => (
              <SubMenuItem
                key={index}
                title={section.title}
                items={section.items}
              />
            ))}
          </ul>

          <ul
            id="submenu-map"
            role="menubar"
            inert={menuIndex !== 1}
            data-value={menuIndex === 1}
            className="flex w-full data-[value=false]:hidden"
          >
            {mapMenu.map((section, index) => (
              <SubMenuItem
                key={index}
                title={section.title}
                items={section.items}
              />
            ))}
          </ul>

          <ul
            id="submenu-prices"
            role="menubar"
            inert={menuIndex !== 2}
            data-value={menuIndex === 2}
            className="flex w-full data-[value=false]:hidden"
          >
            {pricesMenu.map((section, index) => (
              <SubMenuItem
                key={index}
                title={section.title}
                items={section.items}
              />
            ))}
          </ul>

          <ul
            id="submenu-resources"
            role="menubar"
            inert={menuIndex !== 3}
            data-value={menuIndex === 3}
            className="flex w-full data-[value=false]:hidden"
          >
            {resourcesMenu.map((section, index) => (
              <SubMenuItem
                key={index}
                title={section.title}
                items={section.items}
              />
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};
