"use client";

import { BusinessPointDetailsType } from "@/@types/business-point-details-type";
import { getSharedItemsAssociatedBusinessPoint } from "@/actions/get/business-point/get-shared-items-associated-business-point";
import { OpeningHoursList } from "@/components/opening-hours-list";
import { BASE_URLS } from "@/constants/base-urls";
import { DAYS_OF_WEEK_DDD } from "@/constants/day-of-week-ddd";
import { WEEK_DAYS } from "@/constants/week-days-order";
import { useBusinessPointOverview } from "@/hooks/use-app-queries/use-business-point-overview,";
import { checkBusinessStatus } from "@/utils/check-business-status";
import Image from "next/image";
import { useState } from "react";
import { DetailsSection } from "./details-section";
import { useRouter } from "next/navigation";

export function ContentBusinessPointDetails({ id }: { id: string }) {
  const [businessPointDetails, setBusinessPointDetails] =
    useState<BusinessPointDetailsType>();
  const [showDetails, setShowDetails] = useState(false);
  const {
    data: businessPoint,
    isLoading,
    error,
  } = useBusinessPointOverview(id);

  const router = useRouter();

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  if (error || !businessPoint) {
    return <p>Erro ao carregar os dados.</p>;
  }

  const image1 = businessPoint.imageUrls?.[0]?.url;
  const image2 = businessPoint.imageUrls?.[1]?.url;

  const handleGetBusinessPointDetails = async () => {
    const result: BusinessPointDetailsType =
      await getSharedItemsAssociatedBusinessPoint(id);
    setBusinessPointDetails(result);
    setShowDetails((prev) => !prev);
  };

  const handleBackNavigation = () => {
    router.back();
  };

  const options = [
    ["Opções de serviço", businessPointDetails?.serviceOptions],
    ["Pagamentos", businessPointDetails?.payments],
    ["Menu", businessPointDetails?.menu],
    ["Comodidade", businessPointDetails?.amenities],
    ["Público", businessPointDetails?.audience],
    ["Acessibilidade", businessPointDetails?.accessibility],
    ["Planejamento", businessPointDetails?.planning],
    ["Animais de estimação", businessPointDetails?.pets],
    ["Categorias", businessPointDetails?.categories],
  ];

  return (
    <section className="mx-auto max-w-screen-lg px-4 pt-10 pb-20">
      <div className="px-10 py-6">
        <button
          type="button"
          onClick={() => handleBackNavigation()}
          className="hover:underline"
        >
          Voltar
        </button>
      </div>

      <h1 className="text-center text-2xl font-bold uppercase">
        {businessPoint.name}
      </h1>

      <div className="mt-10 space-y-10">
        <p className="text-center text-zinc-300">{businessPoint.highlight}</p>

        <div className="space-y-1 text-center text-base text-zinc-400">
          <p>
            {businessPoint.neighborhood} - {businessPoint.street} -{" "}
            {businessPoint.houseNumber}
          </p>
          <p>Canguaretama - RN</p>
        </div>

        {image1 && (
          <div className="h-[400px] w-full md:h-[500px]">
            <Image
              src={`${BASE_URLS.img}/${image1}`}
              alt="Imagem do estabelecimento"
              width={1000}
              height={1000}
              className="h-full w-full rounded-lg object-cover shadow-md"
            />
          </div>
        )}

        <p className="text-justify text-zinc-300">
          {businessPoint.description}
        </p>

        <div className="space-y-4">
          <h2 className="text-lg font-bold">Horários</h2>

          <p className="font-bold">
            {checkBusinessStatus(businessPoint.openingHours)}
          </p>

          <div className="w-full md:w-1/2">
            <OpeningHoursList
              openingHours={businessPoint.openingHours}
              orderDays={DAYS_OF_WEEK_DDD}
              weekDays={WEEK_DAYS}
            />
          </div>
        </div>

        {image2 && (
          <div className="h-[400px] w-full md:h-[500px]">
            <Image
              src={`${BASE_URLS.img}/${image2}`}
              alt="Imagem adicional"
              width={1000}
              height={1000}
              className="h-full w-full rounded-lg object-cover shadow-md"
            />
          </div>
        )}

        <button
          type="button"
          onClick={handleGetBusinessPointDetails}
          data-value={showDetails}
          className="mx-auto mt-10 block rounded-md bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700 data-[value=true]:hidden"
        >
          Saber mais
        </button>

        <div
          data-value={showDetails}
          className="mt-10 space-y-8 data-[value=false]:hidden"
        >
          <DetailsSection
            title="Destaque"
            items={[
              "Ingredientes frescos e selecionados",
              "Atendimento rápido e de qualidade",
              "Ambiente aconchegante e familiar",
              "Opções para dietas especiais (vegetariano, sem glúten, etc.)",
              "Promoções exclusivas toda semana",
            ]}
          />

          {Object.entries(options).map(([title, items]) =>
            items?.length ? (
              <div key={title}>
                <DetailsSection title={title} items={items as string[]} />
              </div>
            ) : null,
          )}
        </div>
      </div>
    </section>
  );
}
