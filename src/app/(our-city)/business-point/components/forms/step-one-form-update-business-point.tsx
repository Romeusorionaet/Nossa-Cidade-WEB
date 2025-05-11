"use client";

import { FormError } from "@/components/form/form-error";
import { useContext } from "react";
import { ManageTags } from "../manage-tags";
import { FormUpdateStepOneBusinessPointContext } from "@/contexts/form-update-step-one-business-point.context";
import { DAYS_OF_WEEK_DDD } from "@/constants/day-of-week-ddd";
import { useGetBusinessPointCategories } from "@/hooks/use-app-queries/use-get-business-point-categories";

export function StepOneFormUpdateBusinessPoint() {
  const {
    errors,
    handleUpdateStepOneBusinessPointForm,
    handleSubmit,
    isLoadingForm,
    register,
  } = useContext(FormUpdateStepOneBusinessPointContext);

  const {
    data: categories,
    error,
    isLoading: isLoadingCategories,
  } = useGetBusinessPointCategories();

  return (
    <form
      id="business-point-form"
      onSubmit={handleSubmit(handleUpdateStepOneBusinessPointForm)}
      className="mx-auto max-w-3xl space-y-8 rounded-xl bg-white p-6 shadow-lg"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm font-bold text-zinc-700">
          Nome
        </label>
        <input
          id="name"
          type="text"
          {...register("name")}
          className="input-field uppercase"
        />
        <FormError errors={errors.name?.message} />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="description"
          className="text-sm font-bold text-zinc-700"
        >
          Descrição
        </label>
        <textarea
          id="description"
          {...register("description")}
          className="input-field h-24 resize-none border border-zinc-200 p-1"
        />
        <FormError errors={errors.description?.message} />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="category"
          className={`text-sm font-bold ${
            error ? "text-red-500" : "text-zinc-700"
          }`}
        >
          Categoria
        </label>
        {isLoadingCategories ? (
          <div className="h-10 w-32 animate-pulse rounded bg-zinc-200" />
        ) : (
          <select
            id="category"
            {...register("categoryId")}
            className="input-field w-full max-w-xs rounded-md border border-zinc-200"
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
      </div>

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

      <div className="flex flex-col gap-2">
        <label htmlFor="highlight" className="text-sm font-bold text-zinc-700">
          Frase de destaque
        </label>
        <input
          id="highlight"
          type="text"
          {...register("highlight")}
          className="input-field"
          placeholder="Ex: Ambiente familiar, atendimento 24h..."
        />
        <FormError errors={errors.highlight?.message} />
      </div>

      <ManageTags />

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoadingForm}
          className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoadingForm ? "Atualizando..." : "Atualizar"}
        </button>
      </div>
    </form>
  );
}
