"use client";

import "@/assets/styles/utilities/no-spinner-input-number.css";
import { UserContextProvider } from "@/contexts/user.context";
import { QueryClientProvider } from "@tanstack/react-query";
import "@/assets/styles/utilities/background-section.css";
import { useEffect, useRef, type ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { queryClient } from "@/lib/query-client";
import WakeUpAPI from "@/components/wake-up-api";
import "@/assets/styles/base/globals.css";
import LocomotiveScroll, {
  type ILocomotiveScrollOptions,
} from "locomotive-scroll";
import {
  maplibreglStyleCached,
  maplibreglTilesCached,
} from "@/actions/services/maplibregl";

interface CustomLocomotiveScrollOptions extends ILocomotiveScrollOptions {
  el?: HTMLElement | null;
}

export default function ClientProviders({ children }: { children: ReactNode }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollContainerRef.current) return;

    const locomotiveScroll = new LocomotiveScroll({
      el: scrollContainerRef.current,
      smooth: true,
    } as CustomLocomotiveScrollOptions);

    return () => {
      locomotiveScroll.destroy();
    };
  }, []);

  useEffect(() => {
    maplibreglStyleCached();
    maplibreglTilesCached();
  }, []);

  return (
    <div ref={scrollContainerRef}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <UserContextProvider>
            <WakeUpAPI />
            {children}
          </UserContextProvider>
        </SessionProvider>
      </QueryClientProvider>
    </div>
  );
}
