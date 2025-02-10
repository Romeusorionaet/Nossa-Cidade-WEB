'use client'

import { UserContextProvider } from '@/contexts/user.context'
import { queryClient } from '@/lib/query-client'
import { QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <UserContextProvider>{children}</UserContextProvider>
      </SessionProvider>
    </QueryClientProvider>
  )
}
