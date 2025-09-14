import { BusinessPointPreviewType } from "@/@types/business-point-preview-type";
import { getBusinessPointsPreviewUser } from "@/actions/get/business-point/get-business-point-preview-user";
import { QUERY_KEY_CACHE } from "@/constants/query-key-cache";
import { useQuery } from "@tanstack/react-query";

interface Props {
  profileId: string;
}

export function useGetBusinessPointPreviewUser({ profileId }: Props) {
  const { data, isLoading, error, refetch } = useQuery<
    BusinessPointPreviewType[]
  >({
    queryKey: [QUERY_KEY_CACHE.BPPD],
    queryFn: () => getBusinessPointsPreviewUser(),
    staleTime: 1000 * 60 * 60,
    enabled: Boolean(profileId),
  });

  return { data, isLoading, error, refetch };
}
