import { DAYS_OF_WEEK_DDD } from "@/constants/day-of-week-ddd";
import { z } from "zod";

export const openingHoursSchema = z.object(
  Object.fromEntries(
    DAYS_OF_WEEK_DDD.map((day) => [
      day,
      z.object({
        abertura: z.string().min(5, "Horário inválido").nullable(),
        fechamento: z.string().min(5, "Horário inválido").nullable(),
      }),
    ]),
  ),
);

export const locationSchema = z.object({
  latitude: z
    .string()
    .min(6, { message: "Preencha corretamente" })
    .regex(/^[-+]?[0-9]*\.?[0-9]+$/, { message: "Latitude inválida" }),
  longitude: z
    .string()
    .min(6, { message: "Preencha corretamente" })
    .regex(/^[-+]?[0-9]*\.?[0-9]+$/, { message: "Longitude inválida" }),
});

export const businessPointSchema = z.object({
  categoryId: z.string().min(1, { message: "Selecione uma categoria" }),
  name: z
    .string()
    .min(6, { message: "Nome muito curto." })
    .max(45, { message: "Nome muito longo." }),
  description: z
    .string()
    .min(10, { message: "Descrição insuficiente." })
    .max(500, { message: "Descrição muito longo." }),
  highlight: z
    .string()
    .min(10, { message: "Muito curto.." })
    .max(100, { message: "Muito longo. (max = 100 caracteres)" })
    .optional(),
  location: locationSchema,
  address: z.object({
    street: z.string().min(1, { message: "Rua obrigatório" }),
    houseNumber: z.coerce
      .number()
      .min(1, { message: "Número da casa obrigatório" }),
    neighborhood: z.string().min(1, { message: "Nome da rua obrigatório" }),
  }),
  openingHours: openingHoursSchema,
});

export type BusinessPointFormData = z.infer<typeof businessPointSchema>;
