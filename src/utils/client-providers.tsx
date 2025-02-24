"use client";

import { FilterBusinessPointsContextProvider } from "@/contexts/filter-business-points";
import { UserContextProvider } from "@/contexts/user.context";
import { queryClient } from "@/lib/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import LocomotiveScroll, {
  type ILocomotiveScrollOptions,
} from "locomotive-scroll";
import { SessionProvider } from "next-auth/react";
import { useEffect, useRef, type ReactNode } from "react";

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

  return (
    <div ref={scrollContainerRef}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <UserContextProvider>
            <FilterBusinessPointsContextProvider>
              {children}
            </FilterBusinessPointsContextProvider>
          </UserContextProvider>
        </SessionProvider>
      </QueryClientProvider>
    </div>
  );
}
