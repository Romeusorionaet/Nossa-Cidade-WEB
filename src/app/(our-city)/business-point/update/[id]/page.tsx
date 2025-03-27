import Link from "next/link";
import { StepOneFormUpdateBusinessPoint } from "../../components/forms/step-one-form-update-business-point";
import { StepTwoFormUpdateBusinessPoint } from "../../components/forms/step-two-form-update-business-point";
import { queryClient } from "@/lib/query-client";
import { getBusinessPointOverview } from "@/actions/get/business-point/get-business-point-overview";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

interface ParamsProps {
  params: {
    id: string;
  };
}

export default async function Update({ params }: ParamsProps) {
  const { id } = await params;

  await queryClient.prefetchQuery({
    queryKey: ["businessPointData"],
    queryFn: () => getBusinessPointOverview(id),
    staleTime: 0,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <main className="mx-auto w-full max-w-[1080px] pt-28">
      <Link href="/user/my-business-points" className="ml-4 hover:underline">
        Voltar
      </Link>

      <HydrationBoundary state={dehydratedState}>
        <StepOneFormUpdateBusinessPoint />

        <h2>Atualizar localização</h2>
        <StepTwoFormUpdateBusinessPoint />
      </HydrationBoundary>
    </main>
  );
}
