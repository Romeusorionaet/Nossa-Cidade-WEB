import { getImageBusinessPoint } from "@/actions/get/business-point/get-image-business-point";
import { QUERY_KEY_CACHE } from "@/constants/query-key-cache";
import { useQuery } from "@tanstack/react-query";

export function useGetImageBusinessPoints(id: string) {
  const { data, isLoading, error, refetch } = useQuery<
    ImageBusinessPointType[]
  >({
    queryKey: [QUERY_KEY_CACHE.IBP, id],
    queryFn: () => getImageBusinessPoint(id),
    staleTime: 1000 * 60 * 60,
    enabled: Boolean(id),
  });
  return { data, isLoading, error, refetch };
}
