"use client";

import { FilterBusinessPointsContextProvider } from "@/contexts/filter-business-points";
import { UserContextProvider } from "@/contexts/user.context";
import { queryClient } from "@/lib/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <UserContextProvider>
          <FilterBusinessPointsContextProvider>
            {children}
          </FilterBusinessPointsContextProvider>
        </UserContextProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
