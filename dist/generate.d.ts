import { z } from "zod";
import { type TripInput } from "./schema/input.js";
import { type ItineraryPlan, type TripPlans } from "./schema/output.js";
/**
 * Validates trip input, calls the configured AI provider, and returns
 * structured itinerary plans. Retries once if the model JSON fails Zod validation.
 */
export declare function generateItinerary(input: TripInput): Promise<TripPlans>;
export declare const editItineraryInputSchema: z.ZodObject<{
    plan: z.ZodObject<{
        title: z.ZodString;
        base: z.ZodOptional<z.ZodString>;
        accommodation: z.ZodOptional<z.ZodString>;
        style: z.ZodOptional<z.ZodString>;
        subtitle: z.ZodOptional<z.ZodString>;
        occasion: z.ZodOptional<z.ZodString>;
        logistics: z.ZodOptional<z.ZodObject<{
            arrival: z.ZodOptional<z.ZodString>;
            departure: z.ZodOptional<z.ZodString>;
            base: z.ZodOptional<z.ZodString>;
            nearestTransit: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            base?: string | undefined;
            arrival?: string | undefined;
            departure?: string | undefined;
            nearestTransit?: string | undefined;
        }, {
            base?: string | undefined;
            arrival?: string | undefined;
            departure?: string | undefined;
            nearestTransit?: string | undefined;
        }>>;
        transportTips: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        notes: z.ZodOptional<z.ZodArray<z.ZodObject<{
            label: z.ZodString;
            text: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            label: string;
            text: string;
        }, {
            label: string;
            text: string;
        }>, "many">>;
        days: z.ZodArray<z.ZodObject<{
            date: z.ZodOptional<z.ZodString>;
            weekday: z.ZodOptional<z.ZodString>;
            title: z.ZodString;
            theme: z.ZodOptional<z.ZodString>;
            highlight: z.ZodOptional<z.ZodString>;
            occasion: z.ZodOptional<z.ZodString>;
            blocks: z.ZodArray<z.ZodObject<{
                start: z.ZodOptional<z.ZodString>;
                end: z.ZodOptional<z.ZodString>;
                place: z.ZodString;
                kind: z.ZodEnum<["arrival", "transfer", "visit", "meal", "rest", "return", "departure"]>;
                transport: z.ZodOptional<z.ZodEnum<["walk", "public", "taxi", "car", "train", "bus", "ferry"]>>;
                travelMinutes: z.ZodOptional<z.ZodNumber>;
                why: z.ZodOptional<z.ZodString>;
                see: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                details: z.ZodOptional<z.ZodString>;
                highlight: z.ZodOptional<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                kind: "arrival" | "transfer" | "visit" | "meal" | "rest" | "return" | "departure";
                place: string;
                transport?: "public" | "taxi" | "car" | "walk" | "train" | "bus" | "ferry" | undefined;
                start?: string | undefined;
                end?: string | undefined;
                travelMinutes?: number | undefined;
                why?: string | undefined;
                see?: string[] | undefined;
                details?: string | undefined;
                highlight?: boolean | undefined;
            }, {
                kind: "arrival" | "transfer" | "visit" | "meal" | "rest" | "return" | "departure";
                place: string;
                transport?: "public" | "taxi" | "car" | "walk" | "train" | "bus" | "ferry" | undefined;
                start?: string | undefined;
                end?: string | undefined;
                travelMinutes?: number | undefined;
                why?: string | undefined;
                see?: string[] | undefined;
                details?: string | undefined;
                highlight?: boolean | undefined;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            title: string;
            blocks: {
                kind: "arrival" | "transfer" | "visit" | "meal" | "rest" | "return" | "departure";
                place: string;
                transport?: "public" | "taxi" | "car" | "walk" | "train" | "bus" | "ferry" | undefined;
                start?: string | undefined;
                end?: string | undefined;
                travelMinutes?: number | undefined;
                why?: string | undefined;
                see?: string[] | undefined;
                details?: string | undefined;
                highlight?: boolean | undefined;
            }[];
            highlight?: string | undefined;
            date?: string | undefined;
            weekday?: string | undefined;
            theme?: string | undefined;
            occasion?: string | undefined;
        }, {
            title: string;
            blocks: {
                kind: "arrival" | "transfer" | "visit" | "meal" | "rest" | "return" | "departure";
                place: string;
                transport?: "public" | "taxi" | "car" | "walk" | "train" | "bus" | "ferry" | undefined;
                start?: string | undefined;
                end?: string | undefined;
                travelMinutes?: number | undefined;
                why?: string | undefined;
                see?: string[] | undefined;
                details?: string | undefined;
                highlight?: boolean | undefined;
            }[];
            highlight?: string | undefined;
            date?: string | undefined;
            weekday?: string | undefined;
            theme?: string | undefined;
            occasion?: string | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        title: string;
        days: {
            title: string;
            blocks: {
                kind: "arrival" | "transfer" | "visit" | "meal" | "rest" | "return" | "departure";
                place: string;
                transport?: "public" | "taxi" | "car" | "walk" | "train" | "bus" | "ferry" | undefined;
                start?: string | undefined;
                end?: string | undefined;
                travelMinutes?: number | undefined;
                why?: string | undefined;
                see?: string[] | undefined;
                details?: string | undefined;
                highlight?: boolean | undefined;
            }[];
            highlight?: string | undefined;
            date?: string | undefined;
            weekday?: string | undefined;
            theme?: string | undefined;
            occasion?: string | undefined;
        }[];
        base?: string | undefined;
        accommodation?: string | undefined;
        occasion?: string | undefined;
        style?: string | undefined;
        subtitle?: string | undefined;
        logistics?: {
            base?: string | undefined;
            arrival?: string | undefined;
            departure?: string | undefined;
            nearestTransit?: string | undefined;
        } | undefined;
        transportTips?: string[] | undefined;
        notes?: {
            label: string;
            text: string;
        }[] | undefined;
    }, {
        title: string;
        days: {
            title: string;
            blocks: {
                kind: "arrival" | "transfer" | "visit" | "meal" | "rest" | "return" | "departure";
                place: string;
                transport?: "public" | "taxi" | "car" | "walk" | "train" | "bus" | "ferry" | undefined;
                start?: string | undefined;
                end?: string | undefined;
                travelMinutes?: number | undefined;
                why?: string | undefined;
                see?: string[] | undefined;
                details?: string | undefined;
                highlight?: boolean | undefined;
            }[];
            highlight?: string | undefined;
            date?: string | undefined;
            weekday?: string | undefined;
            theme?: string | undefined;
            occasion?: string | undefined;
        }[];
        base?: string | undefined;
        accommodation?: string | undefined;
        occasion?: string | undefined;
        style?: string | undefined;
        subtitle?: string | undefined;
        logistics?: {
            base?: string | undefined;
            arrival?: string | undefined;
            departure?: string | undefined;
            nearestTransit?: string | undefined;
        } | undefined;
        transportTips?: string[] | undefined;
        notes?: {
            label: string;
            text: string;
        }[] | undefined;
    }>;
    instruction: z.ZodString;
    lang: z.ZodDefault<z.ZodString>;
    /** The original request, so the model keeps preferences the plan text does not show. */
    trip: z.ZodOptional<z.ZodObject<{
        country: z.ZodString;
        durationDays: z.ZodNumber;
        lang: z.ZodDefault<z.ZodString>;
        people: z.ZodOptional<z.ZodNumber>;
        base: z.ZodOptional<z.ZodObject<{
            kind: z.ZodEnum<["airport", "port", "hotel", "cityCenter"]>;
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            kind: "airport" | "port" | "hotel" | "cityCenter";
            name: string;
        }, {
            kind: "airport" | "port" | "hotel" | "cityCenter";
            name: string;
        }>>;
        tripType: z.ZodOptional<z.ZodString>;
        cities: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        mustSee: z.ZodOptional<z.ZodString>;
        custom: z.ZodOptional<z.ZodString>;
        transport: z.ZodOptional<z.ZodEnum<["public", "taxi", "car"]>>;
        pets: z.ZodOptional<z.ZodBoolean>;
        planCount: z.ZodOptional<z.ZodNumber>;
        startDate: z.ZodOptional<z.ZodString>;
        accommodation: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        country: string;
        durationDays: number;
        lang: string;
        people?: number | undefined;
        base?: {
            kind: "airport" | "port" | "hotel" | "cityCenter";
            name: string;
        } | undefined;
        tripType?: string | undefined;
        cities?: string[] | undefined;
        mustSee?: string | undefined;
        custom?: string | undefined;
        transport?: "public" | "taxi" | "car" | undefined;
        pets?: boolean | undefined;
        planCount?: number | undefined;
        startDate?: string | undefined;
        accommodation?: string | undefined;
    }, {
        country: string;
        durationDays: number;
        lang?: string | undefined;
        people?: number | undefined;
        base?: {
            kind: "airport" | "port" | "hotel" | "cityCenter";
            name: string;
        } | undefined;
        tripType?: string | undefined;
        cities?: string[] | undefined;
        mustSee?: string | undefined;
        custom?: string | undefined;
        transport?: "public" | "taxi" | "car" | undefined;
        pets?: boolean | undefined;
        planCount?: number | undefined;
        startDate?: string | undefined;
        accommodation?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    lang: string;
    plan: {
        title: string;
        days: {
            title: string;
            blocks: {
                kind: "arrival" | "transfer" | "visit" | "meal" | "rest" | "return" | "departure";
                place: string;
                transport?: "public" | "taxi" | "car" | "walk" | "train" | "bus" | "ferry" | undefined;
                start?: string | undefined;
                end?: string | undefined;
                travelMinutes?: number | undefined;
                why?: string | undefined;
                see?: string[] | undefined;
                details?: string | undefined;
                highlight?: boolean | undefined;
            }[];
            highlight?: string | undefined;
            date?: string | undefined;
            weekday?: string | undefined;
            theme?: string | undefined;
            occasion?: string | undefined;
        }[];
        base?: string | undefined;
        accommodation?: string | undefined;
        occasion?: string | undefined;
        style?: string | undefined;
        subtitle?: string | undefined;
        logistics?: {
            base?: string | undefined;
            arrival?: string | undefined;
            departure?: string | undefined;
            nearestTransit?: string | undefined;
        } | undefined;
        transportTips?: string[] | undefined;
        notes?: {
            label: string;
            text: string;
        }[] | undefined;
    };
    instruction: string;
    trip?: {
        country: string;
        durationDays: number;
        lang: string;
        people?: number | undefined;
        base?: {
            kind: "airport" | "port" | "hotel" | "cityCenter";
            name: string;
        } | undefined;
        tripType?: string | undefined;
        cities?: string[] | undefined;
        mustSee?: string | undefined;
        custom?: string | undefined;
        transport?: "public" | "taxi" | "car" | undefined;
        pets?: boolean | undefined;
        planCount?: number | undefined;
        startDate?: string | undefined;
        accommodation?: string | undefined;
    } | undefined;
}, {
    plan: {
        title: string;
        days: {
            title: string;
            blocks: {
                kind: "arrival" | "transfer" | "visit" | "meal" | "rest" | "return" | "departure";
                place: string;
                transport?: "public" | "taxi" | "car" | "walk" | "train" | "bus" | "ferry" | undefined;
                start?: string | undefined;
                end?: string | undefined;
                travelMinutes?: number | undefined;
                why?: string | undefined;
                see?: string[] | undefined;
                details?: string | undefined;
                highlight?: boolean | undefined;
            }[];
            highlight?: string | undefined;
            date?: string | undefined;
            weekday?: string | undefined;
            theme?: string | undefined;
            occasion?: string | undefined;
        }[];
        base?: string | undefined;
        accommodation?: string | undefined;
        occasion?: string | undefined;
        style?: string | undefined;
        subtitle?: string | undefined;
        logistics?: {
            base?: string | undefined;
            arrival?: string | undefined;
            departure?: string | undefined;
            nearestTransit?: string | undefined;
        } | undefined;
        transportTips?: string[] | undefined;
        notes?: {
            label: string;
            text: string;
        }[] | undefined;
    };
    instruction: string;
    lang?: string | undefined;
    trip?: {
        country: string;
        durationDays: number;
        lang?: string | undefined;
        people?: number | undefined;
        base?: {
            kind: "airport" | "port" | "hotel" | "cityCenter";
            name: string;
        } | undefined;
        tripType?: string | undefined;
        cities?: string[] | undefined;
        mustSee?: string | undefined;
        custom?: string | undefined;
        transport?: "public" | "taxi" | "car" | undefined;
        pets?: boolean | undefined;
        planCount?: number | undefined;
        startDate?: string | undefined;
        accommodation?: string | undefined;
    } | undefined;
}>;
export type EditItineraryInput = z.input<typeof editItineraryInputSchema>;
/**
 * Revises one existing plan from a free-text change request. Returns the whole
 * revised plan with the same number of days. Retries once on invalid JSON.
 */
export declare function editItinerary(input: EditItineraryInput): Promise<ItineraryPlan>;
//# sourceMappingURL=generate.d.ts.map