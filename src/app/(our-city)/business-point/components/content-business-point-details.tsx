"use client";

import type { businessPointDetailsType } from "@/@types/business-point-details-type";
import { getBusinessPointDetails } from "@/actions/get/business-point/get-business-point-details";
import { OpeningHoursList } from "@/components/opening-hours-list";
import { orderDays, weekDays } from "@/constants/week-days-order";
import { checkBusinessStatus } from "@/utils/check-business-status";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export function ContentBusinessPointDetails({ id }: { id: string }) {
  const { data: businessPoint } = useQuery<businessPointDetailsType>({
    queryKey: ["businessPointDetails", id],
    queryFn: async () => await getBusinessPointDetails(id),
    staleTime: 1000 * 60 * 60,
  });

  if (!businessPoint) {
    return <p>Dados não encontrado</p>;
  }

  return (
    <section className="px-4 pt-10 pb-20 text-black">
      <h1 className="text-center">{businessPoint.name}</h1>

      <div className="mt-10">
        <p className="text-center">
          Especialista em produtos de qualidade e preços baixo.
        </p>

        <p className="mt-10 text-base">
          Praça Augusto Severo, 123 - Centro, Canguaretama - RN, 59190-000
        </p>

        <div className="h-[600px] w-full">
          <Image
            src="/imgs/others/ex-1.png"
            alt=""
            width={1000}
            height={1000}
            className="h-full w-full object-cover"
          />
        </div>

        <p className="mt-5 text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, culpa
          aperiam praesentium error at tempore quas distinctio adipisci eum
          doloribus mollitia nobis, quisquam libero maiores unde numquam quaerat
          rerum voluptate.
        </p>

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

        <div className="mt-10 h-[600px] w-full">
          <Image
            src="/imgs/others/ex-2.png"
            alt=""
            width={1000}
            height={1000}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="mt-10 space-y-6">
          <h2>Saber mais</h2>

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

          <div className="space-y-4">
            <h4>Opções de serviço</h4>

            <ul className="list-inside list-disc">
              <li>Entrega no mesmo dia</li>
              <li>Pedido por telefone ou app</li>
              <li>Serviço de self-service</li>
              <li>
                Opções de menu para dietas especiais (vegetariano, sem glúten,
                etc.)
              </li>
              <li>Happy hour com descontos especiais</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4>Pagamentos</h4>

            <ul className="list-inside list-disc">
              <li>Cartão de crédito</li>
              <li>Cartão de débito</li>
              <li>Pagamentos por dispositvo móvel via NFC</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4>Menu</h4>

            <ul className="list-inside list-disc">
              <li>Alimentação</li>
              <li>Salgado</li>
              <li>Bebidas</li>
              <li>Sobremesas</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4>Comodidade</h4>

            <ul className="list-inside list-disc">
              <li>Banheiro</li>
              <li>Bar local</li>
              <li>Bom para levar crianças</li>
              <li>Estacionamento</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4>Público</h4>

            <ul className="list-inside list-disc">
              <li>Público</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4>Acessibilidade</h4>

            <ul className="list-inside list-disc">
              <li>Rampa de acesso para cadeirantes</li>
              <li>Cardápio em braille</li>
              <li>Mesas adaptadas para cadeiras de rodas</li>
              <li>Atendimento prioritário para pessoas com deficiência</li>
              <li>Banheiro acessível</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4>planejamento</h4>

            <ul className="list-inside list-disc">
              <li>Aceita reserva</li>
              <li>Atendimento para eventos e festas</li>
              <li>Opções de combos e cardápios personalizados</li>
              <li>Horário de funcionamento estendido</li>
              <li>Programação de promoções e descontos sazonais</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4>Aimais de estimação</h4>

            <ul className="list-inside list-disc">
              <li>Cães de pequeno e médio porte</li>
              <li>Gatos</li>
              <li>Cães-guia e de assistência</li>
              <li>Animais em transporte adequado (como caixa de transporte)</li>
              <li>Regras específicas para a permanência de pets no local</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
