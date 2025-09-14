import { getListItemsForBusinessPointDetails } from "@/actions/get/business-point/get-list-items-for-business-point-details";
import { QUERY_KEY_CACHE } from "@/constants/query-key-cache";
import { useQuery } from "@tanstack/react-query";

interface Props {
  profileId: string;
}

export function useGetListItemsForBusinessPointDetails({ profileId }: Props) {
  const { data, isLoading, error } =
    useQuery<ListItemsForBusinessPointDetailsType>({
      queryKey: [QUERY_KEY_CACHE.LIFBPD],
      queryFn: () => getListItemsForBusinessPointDetails(),
      enabled: Boolean(profileId),
    });

  return { data, isLoading, error };
}
