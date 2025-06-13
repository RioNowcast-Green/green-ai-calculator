import { z } from "zod";

export const calculatorSchema = z.object({
  time: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), {
      message: "Time must be a number",
    }),
  onSiteWUE: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), {
      message: "onSiteWUE must be a number",
    }),
  PUE: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), {
      message: "PUE must be a number",
    }),
});

export type CalculatorSchemaType = z.infer<typeof calculatorSchema>;
