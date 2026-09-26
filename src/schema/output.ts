import { z } from "zod";

export const blockKindSchema = z.enum([
  "arrival",
  "transfer",
  "visit",
  "meal",
  "rest",
  "return",
  "departure",
]);

export const blockTransportSchema = z.enum([
  "walk",
  "public",
  "taxi",
  "car",
  "train",
  "bus",
  "ferry",
]);

export const itineraryBlockSchema = z.object({
  start: z.string().min(1).optional(),
  end: z.string().min(1).optional(),
  place: z.string().min(1),
  kind: blockKindSchema,
  transport: blockTransportSchema.optional(),
  travelMinutes: z.number().nonnegative().optional(),
  why: z.string().optional(),
  see: z.array(z.string()).optional(),
  /** Practical line under the place: route, duration, tickets, booking tips. */
  details: z.string().optional(),
  /** Marks a standout moment (birthday dinner, the cruise); rendered in the accent colour. */
  highlight: z.boolean().optional(),
});

export const itineraryDaySchema = z.object({
  date: z.string().optional(),
  weekday: z.string().optional(),
  title: z.string().min(1),
  /** Short label (2–5 words) for the "Trip at a glance" table. */
  theme: z.string().optional(),
  /** The one thing not to miss that day. */
  highlight: z.string().optional(),
  /** Set only for a special day (e.g. "Birthday"); rendered as an accented day. */
  occasion: z.string().optional(),
  blocks: z.array(itineraryBlockSchema).min(1),
});

export const itineraryLogisticsSchema = z.object({
  arrival: z.string().optional(),
  departure: z.string().optional(),
  base: z.string().optional(),
  nearestTransit: z.string().optional(),
});

export const itineraryNoteSchema = z.object({
  label: z.string().min(1),
  text: z.string().min(1),
});

export const itineraryPlanSchema = z.object({
  title: z.string().min(1),
  base: z.string().optional(),
  accommodation: z.string().optional(),
  style: z.string().optional(),
  /** Guide label under the title, e.g. "Couple Trip Guide". */
  subtitle: z.string().optional(),
  /** Trip-wide occasion line, e.g. "Birthday on the 27th". */
  occasion: z.string().optional(),
  logistics: itineraryLogisticsSchema.optional(),
  transportTips: z.array(z.string().min(1)).optional(),
  notes: z.array(itineraryNoteSchema).optional(),
  days: z.array(itineraryDaySchema).min(1),
});

export const tripPlansSchema = z.object({
  plans: z.array(itineraryPlanSchema).min(1),
});

export type BlockKind = z.infer<typeof blockKindSchema>;
export type BlockTransport = z.infer<typeof blockTransportSchema>;
export type ItineraryBlock = z.infer<typeof itineraryBlockSchema>;
export type ItineraryDay = z.infer<typeof itineraryDaySchema>;
export type ItineraryLogistics = z.infer<typeof itineraryLogisticsSchema>;
export type ItineraryNote = z.infer<typeof itineraryNoteSchema>;
export type ItineraryPlan = z.infer<typeof itineraryPlanSchema>;
export type TripPlans = z.infer<typeof tripPlansSchema>;
