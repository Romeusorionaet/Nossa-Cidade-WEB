import { daysOfWeek } from "@/constants/day-of-week";
import { z } from "zod";

export const openingHoursSchema = z.object(
  Object.fromEntries(
    daysOfWeek.map((day) => [
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
    .max(100, { message: "Nome muito longo." }),
  description: z
    .string()
    .min(10, { message: "Descrição insuficiente." })
    .max(400, { message: "Descrição muito longo." }),
  highlight: z
    .string()
    .min(10, { message: "Muito curto.." })
    .max(100, { message: "Muito longo. (max = 100 caracteres)" })
    .optional(),
  location: locationSchema,
  street: z.string().min(1, { message: "Campo obrigatório" }),
  houseNumber: z.string().min(1, { message: "Campo obrigatório" }),
  neighborhood: z.string().min(1, { message: "Campo obrigatório" }),
  openingHours: openingHoursSchema,
});

export type BusinessPointFormData = z.infer<typeof businessPointSchema>;
