import { z } from "zod";

export const calculatorSchema = z.object({
  days: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), {
      message: "Days must be a number",
    }),
  hours: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), {
      message: "Hours must be a number",
    }),
  minutes: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), {
      message: "Minutes must be a number",
    }),
  seconds: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), {
      message: "Seconds must be a number",
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
  energyConsumed: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : 0))
    .refine((val) => !isNaN(val), {
      message: "Energy consumed must be a number",
    }),
});

export type CalculatorSchemaType = z.infer<typeof calculatorSchema>;
