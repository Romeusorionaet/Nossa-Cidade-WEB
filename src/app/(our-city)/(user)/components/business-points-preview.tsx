"use client";

import { getBusinessPointsPreviewUser } from "@/actions/get/business-point/get-business-point-preview-user";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { UserContext } from "@/contexts/user.context";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link";
import { BusinessPointPreviewType } from "@/@types/business-point-preview-type";

export function BusinessPointsPreview() {
  const { profile } = useContext(UserContext);

  const {
    data: businessPointsPreviewData,
    isLoading,
    error,
  } = useQuery<BusinessPointPreviewType[]>({
    queryKey: ["businessPointPreviewData"],
    queryFn: () => getBusinessPointsPreviewUser(),
    staleTime: 1000 * 60 * 60,
    enabled: !!profile.publicId,
  });

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
            <Link href="/business-point/edit">Editar</Link>
            <Link href={`/business-point/details/${item.id}`}>Visualizar</Link>
            <Link href={`/business-point/register-image/${item.id}`}>
              Adicone imagem
            </Link>
            <button type="button">Desativar</button>
            <Link href={`/business-point/register-details/${item.id}`}>
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
