import { getWakeUpApi } from "@/actions/get/user/get-wake-up-api";
import { QUERY_KEY_CACHE } from "@/constants/query-key-cache";
import { useQuery } from "@tanstack/react-query";

export function useWakeUpApi() {
  const { isLoading, error } = useQuery({
    queryKey: [QUERY_KEY_CACHE.WakeUpApi],
    queryFn: () => getWakeUpApi(),
    staleTime: 0,
    retry: false,
  });
  return { isLoading, error };
}
