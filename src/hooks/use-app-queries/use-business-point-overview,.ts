import { BusinessPointOverviewType } from "@/@types/business-point-overview-type";
import { getBusinessPointOverview } from "@/actions/get/business-point/get-business-point-overview";
import { QUERY_KEY_CACHE } from "@/constants/query-key-cache";
import { useQuery } from "@tanstack/react-query";

export function useBusinessPointOverview(id: string) {
  const { data, isLoading, error } = useQuery<BusinessPointOverviewType>({
    queryKey: [QUERY_KEY_CACHE.BPD, id],
    queryFn: () => getBusinessPointOverview(id),
    staleTime: 1000 * 60 * 60,
    enabled: Boolean(id),
  });

  return { data, isLoading, error };
}
