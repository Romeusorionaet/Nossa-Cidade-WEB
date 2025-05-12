import Link from "next/link";
import { StepOneFormUpdateBusinessPoint } from "../../components/forms/step-one-form-update-business-point";
import { StepTwoFormUpdateBusinessPoint } from "../../components/forms/step-two-form-update-business-point";
import { queryClient } from "@/lib/query-client";
import { getBusinessPointOverview } from "@/actions/get/business-point/get-business-point-overview";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { QUERY_KEY_CACHE } from "@/constants/query-key-cache";
import { BackNavigation } from "@/components/back-navigation";

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
    <main className="py-28">
      <BackNavigation />

      <HydrationBoundary state={dehydratedState}>
        <StepOneFormUpdateBusinessPoint />

        <div className="mx-4 mt-10 md:mx-10">
          <h2>Atualizar localização</h2>
          <StepTwoFormUpdateBusinessPoint />
        </div>
      </HydrationBoundary>
    </main>
  );
}
