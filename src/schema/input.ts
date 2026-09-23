import { z } from "zod";

export const baseKindSchema = z.enum([
  "airport",
  "port",
  "hotel",
  "cityCenter",
]);

export const tripTransportPreferenceSchema = z.enum([
  "public",
  "taxi",
  "car",
]);

export const tripBaseSchema = z.object({
  kind: baseKindSchema,
  name: z.string().min(1),
});

export const tripInputSchema = z.object({
  country: z.string().min(1),
  durationDays: z.number().int().positive(),
  lang: z.string().min(1).default("en"),
  people: z.number().int().positive().optional(),
  base: tripBaseSchema.optional(),
  tripType: z.string().min(1).optional(),
  cities: z.array(z.string().min(1)).optional(),
  mustSee: z.string().min(1).optional(),
  custom: z.string().min(1).optional(),
  transport: tripTransportPreferenceSchema.optional(),
  pets: z.boolean().optional(),
  planCount: z.number().int().positive().optional(),
  startDate: z.string().min(1).optional(),
  accommodation: z.string().min(1).optional(),
});

export type TripInput = z.input<typeof tripInputSchema>;
export type TripInputParsed = z.output<typeof tripInputSchema>;
export type TripBase = z.infer<typeof tripBaseSchema>;
export type BaseKind = z.infer<typeof baseKindSchema>;
export type TripTransportPreference = z.infer<
  typeof tripTransportPreferenceSchema
>;
