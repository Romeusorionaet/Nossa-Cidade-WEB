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
    <section className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3">
      {businessPointsPreviewData.map((item) => (
        <div
          key={item.id}
          className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg"
        >
          <div className="mb-4 flex flex-col gap-2 text-sm text-zinc-700">
            <Link
              href={`${APP_ROUTES.public.businessPoint.update}/${item.id}`}
              className="text-blue-600"
              title="Função em desenvolvimento"
            >
              ✏️ Editar
            </Link>
            <Link
              href={`${APP_ROUTES.public.businessPoint.details}/${item.id}`}
              className="text-blue-600 hover:underline"
            >
              🔍 Visualizar
            </Link>
            <Link
              href={`${APP_ROUTES.public.businessPoint.saveImage}/${item.id}`}
              className="text-blue-600 hover:underline"
            >
              🖼️ Imagens do ponto comercial
            </Link>
            <button
              type="button"
              className="text-left text-red-600 hover:underline"
            >
              ❌ Desativar
            </button>
            <Link
              href={`${APP_ROUTES.public.businessPoint.registerDetails}/${item.id}`}
              className="text-blue-600 hover:underline"
            >
              ➕ Adicionar detalhes
            </Link>
          </div>

          <div className="space-y-1 text-sm text-zinc-800">
            <p className="text-lg font-semibold uppercase">{item.name}</p>
            <p>Status: {item.status}</p>
            <p>Em análise: {item.awaitingApproval ? "Sim" : "Não"}</p>
            <p>
              Criado em:{" "}
              {format(
                new Date(item.createdAt),
                "dd 'de' MMMM 'de' yyyy 'às' HH:mm",
                {
                  locale: ptBR,
                },
              )}
            </p>
            <p>
              Atualizado em:{" "}
              {format(
                new Date(item.updatedAt),
                "dd 'de' MMMM 'de' yyyy 'às' HH:mm",
                {
                  locale: ptBR,
                },
              )}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
