'use client'

import { getBusinessPointDetails } from '@/actions/get/business-point/get-business-point-details'
import { useQuery } from '@tanstack/react-query'

export function ContentBusinessPointDetails({ id }: { id: string }) {
  const { data: businessPointDetails } = useQuery<any>({
    queryKey: ['businessPointDetails', id],
    queryFn: async () => await getBusinessPointDetails(id),
    staleTime: 1000 * 60 * 60,
  })

  return (
    <div>
      <p>{businessPointDetails && businessPointDetails.name}</p>
    </div>
  )
}
