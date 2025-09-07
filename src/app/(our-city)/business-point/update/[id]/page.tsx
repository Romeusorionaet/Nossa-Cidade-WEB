import { queryClient } from "@/lib/query-client";
import { getBusinessPointOverview } from "@/actions/get/business-point/get-business-point-overview";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { QUERY_KEY_CACHE } from "@/constants/query-key-cache";
import { BackNavigation } from "@/components/back-navigation";
import { FormUpdateBusinessPoint } from "../../components/forms/form-update-business-point";

interface ParamsProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Update({ params }: ParamsProps) {
  const { id } = await params;

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY_CACHE.BPD],
    queryFn: () => getBusinessPointOverview(id),
    staleTime: 0,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <main className="space-y-10 py-28">
      <BackNavigation />

      <HydrationBoundary state={dehydratedState}>
        <FormUpdateBusinessPoint />
      </HydrationBoundary>
    </main>
  );
}
