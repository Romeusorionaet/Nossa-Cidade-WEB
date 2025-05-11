"use client";

import { FormError } from "@/components/form/form-error";
import { ControlLocationForBusinessPointContext } from "@/contexts/control-location-for-business-point.context";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UpdateBusinessPointFormDataStepTwoType,
  updateBusinessPointStepTwoSchema,
} from "@/schemas/update-business-point.schema";
import dynamic from "next/dynamic";
import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { updateBusinessPointOverview } from "@/actions/put/business-point/update-business-point-overview";
import { QUERY_KEY_CACHE } from "@/constants/query-key-cache";
const UserLocationMap = dynamic(() => import("../user-location-map"), {
  ssr: false,
});

type LocationType = {
  location: {
    x?: string | undefined;
    y?: string | undefined;
  };
};

export function StepTwoFormUpdateBusinessPoint() {
  const { id } = useParams();
  const businessPointId = id as string;

  const router = useRouter();

  const { handleGetUserLocation, businessLocation, handleSearchLocation } =
    useContext(ControlLocationForBusinessPointContext);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors, isLoading: isLoadingForm },
  } = useForm<UpdateBusinessPointFormDataStepTwoType>({
    resolver: zodResolver(updateBusinessPointStepTwoSchema),
  });

  const queryClient = useQueryClient();
  const cachedData = queryClient.getQueryData<LocationType>([
    QUERY_KEY_CACHE.BPD,
  ]);

  useEffect(() => {
    if (businessLocation.lat !== 0) {
      setValue("location.x", businessLocation.lat.toString());
      setValue("location.y", businessLocation.lng.toString());
    } else if (cachedData) {
      reset({
        location: {
          x: cachedData.location.x?.toString(),
          y: cachedData.location.y?.toString(),
        },
      });
    }
  }, [businessLocation, cachedData, reset, setValue]);

  const handleFillLocation = async () => {
    await handleGetUserLocation();
  };

  const handleUpdateBusinessPointFormStepTwo = async (
    baseData: UpdateBusinessPointFormDataStepTwoType,
  ) => {
    const { messageError, messageSuccess } = await updateBusinessPointOverview({
      businessPoint: baseData,
      businessPointId,
    });

    if (messageSuccess) {
      alert(messageSuccess);
      router.push("/user/my-business-points");
      return;
    }

    alert(messageError);
  };

  return (
    <form
      id="business-point-form"
      onSubmit={handleSubmit(handleUpdateBusinessPointFormStepTwo)}
      className="space-y-8"
    >
      <div className="space-y-6">
        <label className="block space-y-2">
          <span className="font-medium">Localização</span>
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Latitude"
                className="rounded-md border border-zinc-700 bg-zinc-900 p-2 text-sm text-white placeholder:text-zinc-400"
                {...register("location.x")}
                onChange={(e) => setValue("location.x", e.target.value)}
              />
              <FormError errors={errors.location?.x?.message} />
            </div>

            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Longitude"
                className="rounded-md border border-zinc-700 bg-zinc-900 p-2 text-sm text-white placeholder:text-zinc-400"
                {...register("location.y")}
                onChange={(e) => setValue("location.y", e.target.value)}
              />
              <FormError errors={errors.location?.y?.message} />
            </div>
          </div>
        </label>

        <div className="flex flex-wrap gap-4">
          <button
            type="button"
            onClick={handleFillLocation}
            className="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
          >
            Usar minha localização atual
          </button>

          <button
            type="button"
            onClick={() =>
              handleSearchLocation({
                lat: Number(getValues("location.x")),
                lng: Number(getValues("location.y")),
              })
            }
            className="rounded-md bg-emerald-600 px-4 py-2 text-white transition hover:bg-emerald-700"
          >
            Buscar no mapa
          </button>
        </div>

        <p className="text-sm text-zinc-400">
          <strong className="text-yellow-400">Atenção:</strong> certifique-se de
          que a localização fornecida represente com precisão o endereço do seu
          ponto comercial.
        </p>

        {businessLocation && (
          <div className="rounded-md border border-zinc-700">
            <UserLocationMap />
          </div>
        )}
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="w-full max-w-48 rounded-md bg-green-600 py-2 font-semibold text-white transition hover:bg-green-700"
        >
          Atualizar
        </button>
      </div>
    </form>
  );
}
