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
    refetch,
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
      await refetch();

      return;
    }

    alert(messageError);
  };

  const hasImage = imageBusinessPoint.length > 0;

  return (
    <section>
      <ul className="flex flex-wrap justify-center gap-4">
        {hasImage ? (
          imageBusinessPoint.map((item) => (
            <li key={item.id}>
              <div className="w- h-96 border border-zinc-300">
                <Image
                  src={`${BASE_URLS.img}/${item.url}`}
                  alt=""
                  width={400}
                  height={400}
                  className="h-full w-full object-cover"
                />
              </div>

              <button
                type="button"
                onClick={() => handleDeleteImage(item.id)}
                className="mt-2 rounded-md bg-red-400 p-1 font-light text-white duration-300 hover:bg-red-500"
              >
                Deletar
              </button>
            </li>
          ))
        ) : (
          <p className="opacity-50">Não há imagens</p>
        )}
      </ul>
    </section>
  );
}
