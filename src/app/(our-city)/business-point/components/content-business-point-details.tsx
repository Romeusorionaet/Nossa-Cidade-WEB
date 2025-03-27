"use client";

import { BusinessPointDetailsType } from "@/@types/business-point-details-type";
import { BusinessPointOverviewType } from "@/@types/business-point-overview-type";
import { getBusinessPointOverview } from "@/actions/get/business-point/get-business-point-overview";
import { getSharedItemsAssociatedBusinessPoint } from "@/actions/get/business-point/get-shared-items-associated-business-point";
import { OpeningHoursList } from "@/components/opening-hours-list";
import { BaseUrls } from "@/constants/base-urls";
import { orderDays, weekDays } from "@/constants/week-days-order";
import { checkBusinessStatus } from "@/utils/check-business-status";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";

export function ContentBusinessPointDetails({ id }: { id: string }) {
  const [businessPointDetails, setBusinessPointDetails] =
    useState<BusinessPointDetailsType>();
  const [showDetails, setShowDetails] = useState(false);
  const {
    data: businessPoint,
    isLoading,
    error,
  } = useQuery<BusinessPointOverviewType>({
    queryKey: ["businessPointDetails", id],
    queryFn: () => getBusinessPointOverview(id),
    staleTime: 1000 * 60 * 60,
    enabled: !!id,
  });

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

  return (
    <section className="px-4 pt-10 pb-20">
      <h1 className="text-center">{businessPoint.name}</h1>

      <div className="mt-10">
        <p className="text-center">{businessPoint.highlight}</p>

        <p className="mt-10 text-base">{businessPoint.address}</p>

        {image1 && (
          <div className="h-[600px] w-full">
            <Image
              src={`${BaseUrls.IMG}/${image1}`}
              alt=""
              width={1000}
              height={1000}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <p className="mt-5 text-justify">{businessPoint.description}</p>

        <div className="mt-10">
          <h2>Horários</h2>

          <p className="font-bold">
            {checkBusinessStatus(businessPoint.openingHours)}
          </p>

          <div className="w-full md:w-1/3">
            <OpeningHoursList
              openingHours={businessPoint.openingHours}
              orderDays={orderDays}
              weekDays={weekDays}
            />
          </div>
        </div>

        {image2 && (
          <div className="mt-10 h-[600px] w-full">
            <Image
              src={`${BaseUrls.IMG}/${image2}`}
              alt=""
              width={1000}
              height={1000}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <button
          type="button"
          onClick={handleGetBusinessPointDetails}
          data-value={showDetails}
          className="mt-10 data-[value=true]:hidden"
        >
          Saber mais
        </button>

        <div
          data-value={showDetails}
          className="mt-10 space-y-6 data-[value=false]:hidden"
        >
          <div className="space-y-4">
            <h4>Destaque</h4>

            <ul className="list-inside list-disc">
              <li>Ingredientes frescos e selecionados</li>
              <li>Atendimento rápido e de qualidade</li>
              <li>Ambiente aconchegante e familiar</li>
              <li>
                Opções para dietas especiais (vegetariano, sem glúten, etc.)
              </li>
              <li>Promoções exclusivas toda semana</li>
            </ul>
          </div>

          {businessPointDetails?.serviceOptions?.length ? (
            <div className="space-y-4">
              <h4>Opções de serviço</h4>
              <ul className="list-inside list-disc">
                {businessPointDetails.serviceOptions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {businessPointDetails?.payments?.length ? (
            <div className="space-y-4">
              <h4>Pagamentos</h4>
              <ul className="list-inside list-disc">
                {businessPointDetails.payments.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {businessPointDetails?.menu?.length ? (
            <div className="space-y-4">
              <h4>Menu</h4>
              <ul className="list-inside list-disc">
                {businessPointDetails.menu.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {businessPointDetails?.amenities?.length ? (
            <div className="space-y-4">
              <h4>Comodidade</h4>
              <ul className="list-inside list-disc">
                {businessPointDetails.amenities?.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {businessPointDetails?.audience?.length ? (
            <div className="space-y-4">
              <h4>Público</h4>
              <ul className="list-inside list-disc">
                {businessPointDetails?.audience?.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {businessPointDetails?.accessibility?.length ? (
            <div className="space-y-4">
              <h4>Acessibilidade</h4>
              <ul className="list-inside list-disc">
                {businessPointDetails?.accessibility?.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {businessPointDetails?.planning?.length ? (
            <div className="space-y-4">
              <h4>planejamento</h4>
              <ul className="list-inside list-disc">
                {businessPointDetails?.planning?.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {businessPointDetails?.pets?.length ? (
            <div className="space-y-4">
              <h4>Aimais de estimação</h4>
              <ul className="list-inside list-disc">
                {businessPointDetails?.pets?.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {businessPointDetails?.categories?.length ? (
            <div className="space-y-4">
              <h4>Categorias</h4>
              <ul className="list-inside list-disc">
                {businessPointDetails?.categories?.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
