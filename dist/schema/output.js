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
});
export const itineraryDaySchema = z.object({
    date: z.string().optional(),
    weekday: z.string().optional(),
    title: z.string().min(1),
    blocks: z.array(itineraryBlockSchema).min(1),
});
export const itineraryPlanSchema = z.object({
    title: z.string().min(1),
    base: z.string().optional(),
    accommodation: z.string().optional(),
    style: z.string().optional(),
    days: z.array(itineraryDaySchema).min(1),
});
export const tripPlansSchema = z.object({
    plans: z.array(itineraryPlanSchema).min(1),
});
//# sourceMappingURL=output.js.map