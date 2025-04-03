"use client";

import { FormError } from "@/components/form/form-error";
import { useContext, useEffect } from "react";
import { ControlLocationForBusinessPointContext } from "@/contexts/control-location-for-business-point.context";
import { FormBusinessPointContext } from "@/contexts/form-business-point.context";
import { ManageTags } from "./manage-tags";
import dynamic from "next/dynamic";
import { DAYS_OF_WEEK_DDD } from "@/constants/day-of-week-ddd";
import { useGetBusinessPointCategories } from "@/hooks/use-app-queries/use-get-business-point-categories";
const UserLocationMap = dynamic(() => import("./user-location-map"), {
  ssr: false,
});

export function FormRegisterBusinessPoint() {
  const { handleGetUserLocation, businessLocation, handleSearchLocation } =
    useContext(ControlLocationForBusinessPointContext);
  const {
    errors,
    handleBusinessPointForm,
    handleSubmit,
    isLoadingForm,
    register,
    setValue,
    getValues,
    handleSelect,
    selectedCategories,
  } = useContext(FormBusinessPointContext);

  const {
    data: categories,
    isLoading: isLoadingCategories,
    error,
  } = useGetBusinessPointCategories();

  useEffect(() => {
    setValue("location.latitude", businessLocation.lat.toString());
    setValue("location.longitude", businessLocation.lng.toString());
  }, [businessLocation]);

  const handleFillLocation = async () => {
    await handleGetUserLocation();
  };

  return (
    <form
      id="business-point-form"
      onSubmit={handleSubmit(handleBusinessPointForm)}
      className="space-y-6"
    >
      <div className="flex flex-col gap-4 space-y-10">
        <label className="space-y-2">
          <span>Nome</span>
          <input type="text" {...register("name")} />
          <FormError errors={errors.name?.message} />
        </label>

        <label className="flex">
          <span>Descrição</span>
          <textarea {...register("description")} />
          <FormError errors={errors.description?.message} />
        </label>

        <label htmlFor="category" className="flex flex-col">
          <p
            data-value={error}
            className="flex gap-2 data-[value=true]:text-red-500"
          >
            Categoria
          </p>
          {isLoadingCategories ? (
            <div className="h-8 w-24 animate-pulse rounded-lg bg-zinc-800" />
          ) : (
            <select
              id="category"
              {...register("categoryId")}
              className="w-56 rounded-lg bg-black/80 p-1 text-white"
            >
              <option value="">Selecione</option>
              {categories
                ?.slice()
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>
          )}
          <FormError errors={errors.categoryId?.message} />
        </label>
      </div>

      <div>
        <p>
          Selecione apenas os itens a seguir na qual o seu ponto comercial tem
          de incluso.
        </p>

        <span>Opcional</span>

        {isLoadingCategories ? (
          <p>carregando....</p>
        ) : (
          <div className="flex flex-wrap gap-1">
            {categories
              ?.slice()
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => handleSelect(category.id)}
                  className={`rounded-lg border px-3 py-1 transition-colors ${
                    selectedCategories.includes(category.id)
                      ? "border-blue-500 bg-blue-500 text-white"
                      : "border-gray-400 bg-gray-200 text-black hover:bg-gray-300"
                  }`}
                >
                  {category.name}
                </button>
              ))}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4 space-y-10">
        <label className="space-y-2">
          <span>Localização</span>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Latitude"
              className="p-1"
              {...register("location.latitude")}
              onChange={(e) => setValue("location.latitude", e.target.value)}
            />
            <FormError errors={errors.location?.latitude?.message} />

            <input
              type="text"
              placeholder="Longitude"
              className="p-1"
              {...register("location.longitude")}
              onChange={(e) => setValue("location.longitude", e.target.value)}
            />
            <FormError errors={errors.location?.longitude?.message} />
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
                lat: Number(getValues("location.latitude")),
                lng: Number(getValues("location.longitude")),
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

      <div className="flex flex-col gap-4">
        <label>
          Rua
          <input type="text" {...register("address.street")} />
          <FormError errors={errors.address?.street?.message} />
        </label>

        <label>
          Número do local
          <input type="text" {...register("address.houseNumber")} />
          <FormError errors={errors.address?.houseNumber?.message} />
        </label>

        <label>
          Bairro
          <input type="text" {...register("address.neighborhood")} />
          <FormError errors={errors.address?.neighborhood?.message} />
        </label>
      </div>

      <div>
        {DAYS_OF_WEEK_DDD.map((day) => (
          <fieldset key={day}>
            <legend>{day.toUpperCase()}</legend>
            <label>
              Abertura:
              <input
                type="time"
                {...register(`openingHours.${day}.abertura` as const)}
              />
              {errors.openingHours?.[day]?.abertura && (
                <FormError
                  errors={errors.openingHours[day]?.abertura?.message}
                />
              )}
            </label>
            <label>
              Fechamento:
              <input
                type="time"
                {...register(`openingHours.${day}.fechamento` as const)}
              />
              {errors.openingHours?.[day]?.fechamento && (
                <FormError
                  errors={errors.openingHours[day]?.fechamento?.message}
                />
              )}
            </label>
          </fieldset>
        ))}
      </div>

      <label className="space-y-2">
        <span>
          Agora escreva uma frase de efeito ou algo de especial que seu ponto
          comercial oferece de diferente
        </span>
        <input type="text" {...register("highlight")} />
        <FormError errors={errors.highlight?.message} />
      </label>

      <ManageTags />

      <button type="submit">Enviar</button>
    </form>
  );
}
