"use client";

import { deleteBusinessPointImage } from "@/actions/delete/delete-business-point-image";
import { BASE_URLS } from "@/constants/base-urls";
import { useGetImageBusinessPoints } from "@/hooks/use-app-queries/use-get-image-business-point";
import Image from "next/image";

export function ContentImagesSaved({ id }: { id: string }) {
  const {
    data: imageBusinessPoint,
    error,
    isLoading,
  } = useGetImageBusinessPoints(id);

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
