import { z } from "zod";
import { openingHoursSchema } from "./business-point.schema";

export const updateBusinessPointStepOneSchema = z.object({
  name: z.string().min(6, { message: "Nome muito curto." }).max(100).optional(),
  description: z
    .string()
    .min(10, { message: "Descrição insuficiente." })
    .max(400)
    .optional(),
  categoryId: z
    .string()
    .min(1, { message: "Selecione uma categoria" })
    .optional(),
  highlight: z
    .string()
    .min(10, { message: "Muito curto.." })
    .max(100, { message: "Muito longo. (max = 100 caracteres)" })
    .optional(),
  openingHours: openingHoursSchema.optional(),
});
export type UpdateBusinessPointFormDataStepOneType = z.infer<
  typeof updateBusinessPointStepOneSchema
>;

export const updateBusinessPointStepTwoSchema = z.object({
  location: z.object({
    x: z.string().min(6, { message: "Preencha corretamente" }).optional(),
    y: z.string().min(6, { message: "Preencha corretamente" }).optional(),
  }),
});
export type UpdateBusinessPointFormDataStepTwoType = z.infer<
  typeof updateBusinessPointStepTwoSchema
>;

export type UpdateBusinessPointFormDataMerged =
  UpdateBusinessPointFormDataStepOneType &
    UpdateBusinessPointFormDataStepTwoType;
