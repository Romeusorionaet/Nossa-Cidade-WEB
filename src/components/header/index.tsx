"use client";

import { HoverBackgroundIndicator } from "./hover-background-Indicator";
import { MobileSideMenu } from "./mobile-side-menu";
import "@/assets/styles/utilities/bg-rise-fade.css";
import { InputHeader } from "./input-header";
import { Equal } from "lucide-react";
import { useContext } from "react";
import Link from "next/link";
import { useHoverBackground } from "@/hooks/use-hover-background";
import { MobileSideMenuFormContext } from "@/contexts/mobile-side-menu-provider";
import { useScroll } from "@/hooks/use-scroll";
import { SubMenu } from "../sub-menu";
import "@/assets/styles/utilities/custom-animations.css";
import { MAIN_LIST_NAVIGATION } from "@/constants/main-list-navigation";
import { APP_ROUTES } from "@/constants/app-routes";

export function Header() {
  const { eventIndicator, handleEventMenu, handleMouseLeave, navRef } =
    useHoverBackground();

  const { scrolled } = useScroll();

  const { handleSideMenu } = useContext(MobileSideMenuFormContext);

  return (
    <header
      onMouseLeave={handleMouseLeave}
      data-value={eventIndicator.visible}
      data-scroll={scrolled}
      className="fixed top-0 left-0 z-20 w-screen duration-300 data-[scroll=true]:bg-white/70 data-[scroll=true]:text-black data-[scroll=true]:backdrop-blur-sm data-[value=true]:text-black data-[scroll=true]:max-md:h-24"
    >
      <MobileSideMenu />

      <div className="relative flex w-full items-center justify-between gap-2 p-[clamp(1rem,2.5vw,3rem)] max-md:flex-wrap">
        <div className="absolute top-0 left-0 flex w-full items-end max-md:hidden">
          <SubMenu
            menuIndex={eventIndicator.index}
            eventIndicator={eventIndicator}
          />
        </div>

        <nav className="max-md:hidden">
          {eventIndicator.visible && (
            <HoverBackgroundIndicator eventIndicator={eventIndicator} />
          )}

          <ul ref={navRef} className="flex gap-0.5 lg:gap-2">
            {MAIN_LIST_NAVIGATION.map((item, index) => {
              const isHovered =
                eventIndicator.visible && eventIndicator.index === index;

              return (
                <li
                  key={item}
                  onMouseEnter={() => handleEventMenu(index)}
                  onClick={() => handleEventMenu(index)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleEventMenu(index);
                    }
                  }}
                  data-value={eventIndicator.visible}
                  className="bg-rise-fade group cursor-pointer font-medium before:bg-transparent hover:text-white data-[value=true]:hover:before:bg-blue-500 md:p-[clamp(0.60rem,0.95vw,1.4rem)] md:py-[clamp(0.60rem,0.95vw,1.4rem]"
                >
                  <div className="overflow-hidden">
                    <span
                      data-content={item}
                      data-value={isHovered}
                      className="bg-rise-fade-content group-hover:animate-rise-from-bottom before:content-[attr(data-content)] data-[event=true]:bg-blue-500 data-[value=true]:text-white"
                    >
                      {item}
                    </span>
                  </div>
                </li>
              );
            })}
            <li
              data-scroll={scrolled}
              data-value={eventIndicator.visible}
              className="bg-rise-fade group cursor-pointer font-medium hover:border-transparent data-[scroll=true]:border-black data-[value=true]:border-black data-[value=true]:hover:text-white data-[value=true]:hover:before:bg-blue-500 md:border"
            >
              <Link href="#">
                <div className="overflow-hidden">
                  <span className="bg-rise-fade-content group-hover:animate-rise-from-bottom before:content-['Notícias']">
                    Notícias
                  </span>
                </div>
              </Link>
            </li>
          </ul>
        </nav>

        <nav className="z-10 lg:flex lg:w-full lg:items-center lg:justify-center">
          <ul className="flex items-center gap-3">
            <li
              data-scroll={scrolled}
              className="data-[scroll=true]:hidden max-[850px]:hidden md:-ml-20 lg:ml-8"
            >
              <Link
                href={APP_ROUTES.public.dashboard}
                className="text-[clamp(0.90rem,1.4vw,1.9rem)] font-medium tracking-wider uppercase"
              >
                Nossa Cidade
              </Link>
            </li>
            <li className="md:hidden">
              <button
                type="button"
                onClick={() => handleSideMenu()}
                className="border-none"
              >
                <Equal className="h-7.5 w-7.5" />
              </button>
            </li>
            <li
              data-scroll={scrolled}
              className="data-[scroll=true]:flex min-[850px]:hidden"
            >
              <Link href={APP_ROUTES.public.dashboard}>Nossa Cidade</Link>
            </li>
          </ul>
        </nav>

        <div className="flex max-md:flex-col-reverse">
          <div
            data-scroll={scrolled}
            className="flex duration-300 max-md:absolute max-md:top-[4rem] max-md:left-2 max-md:w-[95%] max-md:justify-center data-[scroll=true]:max-md:justify-start md:w-auto md:pr-2 lg:w-64 lg:justify-end 2xl:w-96"
          >
            <InputHeader
              eventIndicatorVisible={eventIndicator.visible}
              scrolled={scrolled}
            />
          </div>

          <nav data-scroll={scrolled} className="flex items-center gap-2">
            <Link
              href={APP_ROUTES.public.auth.signIn}
              data-value={eventIndicator.visible}
              className="bg-rise-fade group px-3 py-2 data-[value=true]:hover:before:bg-blue-500 md:p-[clamp(0.60rem,0.95vw,1.4rem)]"
            >
              <div className="overflow-hidden">
                <span className="bg-rise-fade-content group-hover:animate-rise-from-bottom text-black group-hover:text-white group-hover:duration-300 before:content-['Login']">
                  login_
                </span>
              </div>
            </Link>
            <Link
              href={APP_ROUTES.public.auth.signUp}
              data-value={eventIndicator.visible}
              className="bg-rise-fade group rounded-full px-4 py-2 font-medium text-black data-[value=true]:bg-blue-500 data-[value=true]:text-white md:p-[clamp(0.60rem,0.95vw,1.4rem)] md:px-6"
            >
              <div className="overflow-hidden">
                <span className="bg-rise-fade-content group-hover:animate-rise-from-bottom before:content-['Registrar']">
                  Registrar
                </span>
              </div>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
