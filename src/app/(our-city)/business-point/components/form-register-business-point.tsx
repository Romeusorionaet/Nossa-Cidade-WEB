"use client";

import { FormError } from "@/components/form/form-error";
import { useContext, useEffect } from "react";
import { ControlLocationForBusinessPointContext } from "@/contexts/control-location-for-business-point.context";
import { FormBusinessPointContext } from "@/contexts/form-business-point.context";
import { ManageTags } from "./manage-tags";
import dynamic from "next/dynamic";
import { DAYS_OF_WEEK_DDD } from "@/constants/day-of-week-ddd";
import "@/assets/styles/utilities/form-items.css";
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
      className="mx-auto max-w-4xl space-y-8 rounded-xl bg-white p-8 shadow-md"
    >
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <label className="flex flex-col space-y-1">
          <span className="text-sm font-medium">Nome</span>
          <input type="text" {...register("name")} className="input-style" />
          <FormError errors={errors.name?.message} />
        </label>

        <label className="col-span-full flex flex-col space-y-1">
          <span className="text-sm font-medium">Descrição</span>
          <textarea
            {...register("description")}
            className="input-style resize-none"
            rows={3}
          />
          <FormError errors={errors.description?.message} />
        </label>

        <label htmlFor="category" className="flex flex-col space-y-1">
          <span className="text-sm font-medium text-gray-800">Categoria</span>
          {isLoadingCategories ? (
            <div className="h-10 w-full animate-pulse rounded bg-zinc-200" />
          ) : (
            <select
              id="category"
              {...register("categoryId")}
              className="input-style"
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
      </section>

      <section className="space-y-2">
        <p className="text-sm font-medium">
          Selecione os itens inclusos no seu ponto comercial{" "}
          <span className="text-gray-500">(opcional)</span>:
        </p>
        {isLoadingCategories ? (
          <p className="text-gray-500">Carregando categorias...</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {categories
              ?.slice()
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => handleSelect(category.id)}
                  className={`rounded-full border px-3 py-1 text-sm transition-colors ${
                    selectedCategories.includes(category.id)
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-gray-300 bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {category.name}
                </button>
              ))}
          </div>
        )}
      </section>

      <section className="space-y-4">
        <label className="flex flex-col space-y-2">
          <span className="text-sm font-medium">
            Localização (Latitude e Longitude)
          </span>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Latitude"
              {...register("location.latitude")}
              onChange={(e) => setValue("location.latitude", e.target.value)}
              className="input-style w-full"
            />
            <input
              type="text"
              placeholder="Longitude"
              {...register("location.longitude")}
              onChange={(e) => setValue("location.longitude", e.target.value)}
              className="input-style w-full"
            />
          </div>
          <div className="flex gap-2 text-xs text-red-500">
            <FormError errors={errors.location?.latitude?.message} />
            <FormError errors={errors.location?.longitude?.message} />
          </div>
        </label>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleFillLocation}
            className="btn-secondary"
          >
            Usar minha localização
          </button>
          <button
            type="button"
            onClick={() =>
              handleSearchLocation({
                lat: Number(getValues("location.latitude")),
                lng: Number(getValues("location.longitude")),
              })
            }
            className="btn-secondary"
          >
            Buscar no mapa
          </button>
        </div>

        <p className="text-xs text-gray-500">
          Atenção: Certifique-se de que a localização está correta e representa
          seu ponto comercial.
        </p>

        {businessLocation && <UserLocationMap />}
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <label className="flex flex-col">
          <span className="text-sm font-medium">Rua</span>
          <input
            type="text"
            {...register("address.street")}
            className="input-style"
          />
          <FormError errors={errors.address?.street?.message} />
        </label>

        <label className="flex flex-col">
          <span className="text-sm font-medium">Número</span>
          <input
            type="text"
            {...register("address.houseNumber")}
            className="input-style"
          />
          <FormError errors={errors.address?.houseNumber?.message} />
        </label>

        <label className="flex flex-col">
          <span className="text-sm font-medium">Bairro</span>
          <input
            type="text"
            {...register("address.neighborhood")}
            className="input-style"
          />
          <FormError errors={errors.address?.neighborhood?.message} />
        </label>
      </section>

      <div className="flex flex-wrap justify-center gap-2">
        {DAYS_OF_WEEK_DDD.map((day) => (
          <fieldset key={day} className="rounded-lg border border-zinc-200 p-4">
            <legend className="mb-2 font-semibold text-zinc-700">
              {day.toUpperCase()}
            </legend>
            <div className="flex flex-col gap-4 sm:flex-row">
              <label className="flex flex-col text-sm">
                <span className="mb-1">Abertura</span>
                <input
                  type="time"
                  {...register(`openingHours.${day}.abertura` as const)}
                  className="input-field"
                />
                {errors.openingHours?.[day]?.abertura && (
                  <FormError
                    errors={errors.openingHours[day]?.abertura?.message}
                  />
                )}
              </label>

              <label className="flex flex-col text-sm">
                <span className="mb-1">Fechamento</span>
                <input
                  type="time"
                  {...register(`openingHours.${day}.fechamento` as const)}
                  className="input-field"
                />
                {errors.openingHours?.[day]?.fechamento && (
                  <FormError
                    errors={errors.openingHours[day]?.fechamento?.message}
                  />
                )}
              </label>
            </div>
          </fieldset>
        ))}
      </div>

      <label className="flex flex-col space-y-2">
        <span className="text-sm font-medium">
          Destaque algo especial do seu ponto comercial
        </span>
        <input type="text" {...register("highlight")} className="input-style" />
        <FormError errors={errors.highlight?.message} />
      </label>

      <ManageTags />

      <div className="flex justify-end">
        <button type="submit" className="btn-primary">
          Enviar
        </button>
      </div>
    </form>
  );
}
