"use client";

import { getBusinessPointCategories } from "@/actions/get/business-point/get-business-point-categories";
import { FormError } from "@/components/form/form-error";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { ManageTags } from "../manage-tags";
import { FormUpdateStepOneBusinessPointContext } from "@/contexts/form-update-step-one-business-point.context";
import { DAYS_OF_WEEK_DDD } from "@/constants/day-of-week-ddd";
import { QUERY_KEY_CACHE } from "@/constants/query-key-cache";

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
    isLoading: isLoadingCategories,
    error,
  } = useQuery<{ id: string; name: string }[]>({
    queryKey: [QUERY_KEY_CACHE.CF],
    queryFn: () => getBusinessPointCategories(),
    staleTime: 1000 * 60 * 60, // 60 minutes
  });

  return (
    <form
      id="business-point-form"
      onSubmit={handleSubmit(handleUpdateStepOneBusinessPointForm)}
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

      <button type="submit">atualizar</button>
    </form>
  );
}
