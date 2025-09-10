"use client";

import "@/assets/styles/utilities/no-spinner-input-number.css";
import { UserContextProvider } from "@/contexts/user.context";
import { QueryClientProvider } from "@tanstack/react-query";
import "@/assets/styles/utilities/background-section.css";
import { useRef, type ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { queryClient } from "@/lib/query-client";
import WakeUpAPI from "@/components/wake-up-api";
import "@/assets/styles/base/globals.css";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

export default function ClientProviders({ children }: { children: ReactNode }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useSmoothScroll(scrollContainerRef);

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
