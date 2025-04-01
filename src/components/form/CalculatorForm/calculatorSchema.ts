import { z } from "zod";

export const calculatorSchema = z.object({
  energy: z.number(),
  onSiteWUE: z.number(),
  offSiteWUE: z.number(),
  PUE: z.number(),
});

export type CalculatorSchemaType = z.infer<typeof calculatorSchema>;
