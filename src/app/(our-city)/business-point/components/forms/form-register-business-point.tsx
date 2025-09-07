"use client";

import { FormError } from "@/components/form/form-error";
import { useContext, useState } from "react";
import { DAYS_OF_WEEK_DDD } from "@/constants/day-of-week-ddd";
import "@/assets/styles/utilities/form-items.css";
import { useGetBusinessPointCategories } from "@/hooks/use-app-queries/use-get-business-point-categories";
import { CircleCheck } from "lucide-react";
import { FormRegisterBusinessPointContext } from "@/contexts/form-register-business-point.context";
import { ManageTags } from "../manage-tags";

export function FormRegisterBusinessPoint() {
  const [locationFound, setLocationFound] = useState(false);
  const {
    errors,
    handleBusinessPointForm,
    handleSubmit,
    isLoadingForm,
    register,
    setValue,
    handleSelect,
    selectedCategories,
  } = useContext(FormRegisterBusinessPointContext);

  const myLocation: [number, number] = [-35.13145819818388, -6.378905610634973]; // TODO for while

  const handleGetBusinessPointLocation = () => {
    if (!navigator.geolocation) {
      console.error("Geolocalização não é suportada pelo seu navegador.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setValue("location.longitude", myLocation[0].toString());
        setValue("location.latitude", myLocation[1].toString());
        setLocationFound(true);
      },
      (error) => {
        console.error("Erro ao obter localização:", error.message);
      },
    );
  };

  const {
    data: categories,
    isLoading: isLoadingCategories,
    error,
  } = useGetBusinessPointCategories();

  return (
    <form
      id="business-point-form"
      onSubmit={handleSubmit(handleBusinessPointForm)}
      className="mx-auto max-w-4xl space-y-8 rounded-xl bg-white p-2 shadow-md"
    >
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
        <h3>
          Para registrar a localização do seu ponto comercial, dirija-se ao
          local exato do seu negócio e clique no botão abaixo:{" "}
          <strong className="underline">Buscar localização</strong>.
        </h3>

        <p className="text-xs text-gray-500">
          Atenção: Certifique-se de que a localização está correta e representa
          seu ponto comercial.
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleGetBusinessPointLocation()}
            disabled={locationFound}
            className="btn-secondary disabled:cursor-not-allowed disabled:opacity-50"
          >
            Buscar localização
          </button>

          <CircleCheck
            data-value={locationFound}
            className="text-green-500 data-[value=false]:hidden"
          />
        </div>
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
        <button
          type="submit"
          disabled={isLoadingForm}
          className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          Enviar
        </button>
      </div>
    </form>
  );
}
