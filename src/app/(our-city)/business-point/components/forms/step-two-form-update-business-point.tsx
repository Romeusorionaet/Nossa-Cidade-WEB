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
      className="space-y-6"
    >
      <div className="flex flex-col gap-4 space-y-10">
        <label className="space-y-2">
          <span>Localização</span>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Latitude"
              className="p-1"
              {...register("location.x")}
              onChange={(e) => setValue("location.x", e.target.value)}
            />
            <FormError errors={errors.location?.x?.message} />

            <input
              type="text"
              placeholder="Longitude"
              className="p-1"
              {...register("location.y")}
              onChange={(e) => setValue("location.y", e.target.value)}
            />
            <FormError errors={errors.location?.y?.message} />
          </div>
        </label>

        <div>
          <button
            type="button"
            onClick={() => handleFillLocation()}
            className="w-44"
          >
            Preencher com a minha localização
          </button>

          <button
            type="button"
            onClick={() =>
              handleSearchLocation({
                lat: Number(getValues("location.x")),
                lng: Number(getValues("location.y")),
              })
            }
          >
            buscar
          </button>
        </div>
        <span>
          Atenção, ao preencher com a sua localização, fique atento que a sua
          localização seja o local extato do seu ponto comercial na qual esta
          registrando.
        </span>

        {businessLocation && <UserLocationMap />}
      </div>

      <button type="submit">atualizar</button>
    </form>
  );
}
