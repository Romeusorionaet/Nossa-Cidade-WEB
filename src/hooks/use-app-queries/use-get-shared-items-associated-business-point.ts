import { ListItemsForBusinessPointDetailsType } from "@/@types/list-items-for-business-point-details-type";
import { getSharedItemsAssociatedBusinessPoint } from "@/actions/get/business-point/get-shared-items-associated-business-point";
import { QUERY_KEY_CACHE } from "@/constants/query-key-cache";
import { useQuery } from "@tanstack/react-query";

interface Props {
  businessPointId: string;
  profileId: string;
}

export function useGetSharedItemsAssociatedBusinessPoint({
  businessPointId,
  profileId,
}: Props) {
  const { data, isLoading, error, refetch } =
    useQuery<ListItemsForBusinessPointDetailsType>({
      queryKey: [QUERY_KEY_CACHE.SIABP],
      queryFn: () => getSharedItemsAssociatedBusinessPoint(businessPointId),
      enabled: Boolean(profileId),
    });
  return { data, isLoading, error, refetch };
}
