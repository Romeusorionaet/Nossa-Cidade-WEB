import { searchBusinessPoints } from "@/actions/get/business-point/search-business-points";
import { QUERY_KEY_CACHE } from "@/constants/query-key-cache";
import { useQuery } from "@tanstack/react-query";

interface Props {
  query?: string;
}

export function useSearchBusinessPoints({ query }: Props) {
  const { data, error, isLoading } = useQuery({
    queryKey: [QUERY_KEY_CACHE.BPF, query],
    queryFn: () => (query ? searchBusinessPoints(query) : Promise.resolve([])),
    staleTime: 1000 * 60 * 60,
    enabled: Boolean(query),
  });

  return { data, isLoading, error };
}
