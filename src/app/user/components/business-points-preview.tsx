"use client";

import { useContext } from "react";
import { UserContext } from "@/contexts/user.context";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link";
import { useGetBusinessPointPreviewUser } from "@/hooks/use-app-queries/use-get-business-point-preview-user";
import { APP_ROUTES } from "@/constants/app-routes";
import { BusinessPointStatus } from "@/enums/business-point-status";
import { toggleBusinessPointActive } from "@/actions/patch/business-point/toggle-business-point-active";

export function BusinessPointsPreview() {
  const { profile } = useContext(UserContext);

  const {
    data: businessPointsPreviewData,
    isLoading,
    error,
  } = useGetBusinessPointPreviewUser({ profileId: profile.publicId });

  const handleToggleActiveBusinessPoint = async (id: string) => {
    const { messageError, messageSuccess } = await toggleBusinessPointActive({
      businessPointId: id,
    });

    if (messageSuccess) {
      alert(messageSuccess);
      return;
    }

    alert(messageError);
  };

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
    <section className="grid grid-cols-1 gap-6 p-2 sm:grid-cols-2 lg:grid-cols-3">
      {businessPointsPreviewData.map((item) => (
        <div
          key={item.id}
          className="rounded-2xl bg-white p-4 shadow-md transition-shadow duration-300 hover:shadow-lg"
        >
          <div className="mb-4 flex flex-col gap-2 text-sm text-zinc-700">
            <div className="flex items-center justify-between">
              {item.hasPendingDraft ? (
                <p className="inline-block text-xs">
                  Pedido de atualização pendente
                </p>
              ) : (
                <Link
                  href={`${APP_ROUTES.public.businessPoint.update}/${item.id}`}
                  className="text-blue-600"
                  title="Função em desenvolvimento"
                >
                  ✏️ Editar
                </Link>
              )}
            </div>
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
            <Link
              href={`${APP_ROUTES.public.businessPoint.registerDetails}/${item.id}`}
              className="text-blue-600 hover:underline"
            >
              ➕ Adicionar detalhes
            </Link>

            <button
              type="button"
              onClick={() => handleToggleActiveBusinessPoint(item.id)}
              className="w-24 rounded-md border hover:bg-zinc-300"
            >
              {item.status === BusinessPointStatus.ACTIVE
                ? "❌ Desativar"
                : "✔️ Ativar"}
            </button>
          </div>

          <div className="space-y-1 text-sm text-zinc-800">
            <p className="text-lg font-semibold uppercase">{item.name}</p>
            <p>
              Status:{" "}
              {item.status === BusinessPointStatus.ACTIVE ? "Ativo" : "Inativo"}
            </p>
            <p>Acessível no mapa: {item.awaitingApproval ? "Não" : "Sim"}</p>
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
