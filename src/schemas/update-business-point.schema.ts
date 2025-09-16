import { z } from "zod";
import { openingHoursSchema } from "./business-point.schema";

export const updateBusinessPointSchema = z.object({
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
  location: z.object({
    longitude: z
      .string()
      .min(6, { message: "Preencha corretamente" })
      .optional(),
    latitude: z
      .string()
      .min(6, { message: "Preencha corretamente" })
      .optional(),
  }),
});
export type UpdateBusinessPointFormDataType = z.infer<
  typeof updateBusinessPointSchema
>;
