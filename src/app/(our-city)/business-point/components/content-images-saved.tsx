"use client";

import { ImageBusinessPointType } from "@/@types/business-point-overview-type";
import { deleteBusinessPointImage } from "@/actions/delete/delete-business-point-image";
import { getImageBusinessPoint } from "@/actions/get/business-point/get-image-business-point";
import { BASE_URLS } from "@/constants/base-urls";
import { QUERY_KEY_CACHE } from "@/constants/query-key-cache";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export function ContentImagesSaved({ id }: { id: string }) {
  const {
    data: imageBusinessPoint,
    isLoading,
    error,
  } = useQuery<ImageBusinessPointType[]>({
    queryKey: [QUERY_KEY_CACHE.IBP, id],
    queryFn: () => getImageBusinessPoint(id),
    staleTime: 1000 * 60 * 60,
    enabled: !!id,
  });

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  if (error || !imageBusinessPoint) {
    return <p>Erro ao carregar os dados.</p>;
  }

  const handleDeleteImage = async (id: string) => {
    const { messageError, messageSuccess } = await deleteBusinessPointImage(id);

    if (messageSuccess) {
      alert(messageSuccess);

      return;
    }

    alert(messageError);
  };

  const hasImage = imageBusinessPoint.length > 0;

  return (
    <section>
      <ul>
        {hasImage &&
          imageBusinessPoint.map((item) => (
            <li key={item.id}>
              <div className="h-96 w-96">
                <Image
                  src={`${BASE_URLS.img}/${item.url}`}
                  alt=""
                  width={400}
                  height={400}
                  className="h-full w-full object-cover"
                />
              </div>
              <button type="button" onClick={() => handleDeleteImage(item.id)}>
                Deletar
              </button>
            </li>
          ))}
      </ul>
    </section>
  );
}
