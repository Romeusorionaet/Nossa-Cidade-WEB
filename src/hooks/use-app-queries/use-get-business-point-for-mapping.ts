import { businessPointType } from "@/@types/business-point-type";
import { getBusinessPointForMapping } from "@/actions/get/business-point/get-business-point-for-mapping";
import { QUERY_KEY_CACHE } from "@/constants/query-key-cache";
import { useQuery } from "@tanstack/react-query";

export function useGetBusinessPointForMapping() {
  const { data, isLoading, error } = useQuery<businessPointType[]>({
    queryKey: [QUERY_KEY_CACHE.ABPFM],
    queryFn: () => getBusinessPointForMapping(),
    staleTime: 1000 * 60 * 60,
  });

  return { data, isLoading, error };
}
