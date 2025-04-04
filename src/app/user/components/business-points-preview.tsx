"use client";

import { useContext } from "react";
import { UserContext } from "@/contexts/user.context";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link";
import { useGetBusinessPointPreviewUser } from "@/hooks/use-app-queries/use-get-business-point-preview-user";
import { APP_ROUTES } from "@/constants/app-routes";

export function BusinessPointsPreview() {
  const { profile } = useContext(UserContext);

  const {
    data: businessPointsPreviewData,
    isLoading,
    error,
  } = useGetBusinessPointPreviewUser({ profileId: profile.publicId });

  if (!profile.publicId) {
    return <p>Faça login</p>;
  }

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  if (error || !businessPointsPreviewData) {
    return <p>Erro ao carregar os dados.</p>;
  }

  return (
    <section className="flex flex-col gap-4 border border-black">
      {businessPointsPreviewData.map((item) => (
        <div key={item.id} className="w-96 bg-zinc-400">
          <div className="mb-6 flex flex-col">
            <Link href="#" className="cursor-not-allowed opacity-50">
              Editar (função em desenvolvimento)
            </Link>
            <Link
              href={`${APP_ROUTES.public.businessPoint.details}/${item.id}`}
            >
              Visualizar
            </Link>
            <Link
              href={`${APP_ROUTES.public.businessPoint.saveImage}/${item.id}`}
            >
              Imagens do ponto comercial
            </Link>
            <button type="button">Desativar</button>
            <Link
              href={`${APP_ROUTES.public.businessPoint.registerDetails}/${item.id}`}
            >
              Adicionar detalhes
            </Link>
          </div>

          <p>{item.name}</p>
          <p>{item.status}</p>
          <p>Em análise: {item.awaitingApproval ? "sim" : "não"}</p>
          <p>
            Criado:
            {format(
              new Date(item.createdAt),
              "dd 'de' MMMM 'de' yyyy 'às' HH:mm",
              {
                locale: ptBR,
              },
            )}
          </p>
          <p>
            Atualizado
            {format(
              new Date(item.updatedAt),
              "dd 'de' MMMM 'de' yyyy 'às' HH:mm",
              {
                locale: ptBR,
              },
            )}
          </p>
        </div>
      ))}
    </section>
  );
}
