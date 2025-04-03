import { getBusinessPointCategories } from "@/actions/get/business-point/get-business-point-categories";
import { QUERY_KEY_CACHE } from "@/constants/query-key-cache";
import { useQuery } from "@tanstack/react-query";

export function useGetBusinessPointCategories() {
  const { data, isLoading, error } = useQuery<{ id: string; name: string }[]>({
    queryKey: [QUERY_KEY_CACHE.CF],
    queryFn: () => getBusinessPointCategories(),
    staleTime: 1000 * 60 * 60,
  });

  return { data, isLoading, error };
}
