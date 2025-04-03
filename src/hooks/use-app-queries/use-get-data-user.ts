import { getDataUser } from "@/actions/get/user/get-data.user";
import { QUERY_KEY_CACHE } from "@/constants/query-key-cache";
import { useQuery } from "@tanstack/react-query";

interface Props {
  username?: string;
}

export function useGetDataUser({ username }: Props) {
  const { data, refetch, error, isLoading } = useQuery({
    queryKey: [QUERY_KEY_CACHE.PROFILE],
    queryFn: () => getDataUser(),
    enabled: !username,
  });

  return { data, isLoading, error, refetch };
}
