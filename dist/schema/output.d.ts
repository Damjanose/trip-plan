import { z } from "zod";
export declare const blockKindSchema: z.ZodEnum<["arrival", "transfer", "visit", "meal", "rest", "return", "departure"]>;
export declare const blockTransportSchema: z.ZodEnum<["walk", "public", "taxi", "car", "train", "bus", "ferry"]>;
export declare const itineraryBlockSchema: z.ZodObject<{
    start: z.ZodOptional<z.ZodString>;
    end: z.ZodOptional<z.ZodString>;
    place: z.ZodString;
    kind: z.ZodEnum<["arrival", "transfer", "visit", "meal", "rest", "return", "departure"]>;
    transport: z.ZodOptional<z.ZodEnum<["walk", "public", "taxi", "car", "train", "bus", "ferry"]>>;
    travelMinutes: z.ZodOptional<z.ZodNumber>;
    why: z.ZodOptional<z.ZodString>;
    see: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    kind: "arrival" | "transfer" | "visit" | "meal" | "rest" | "return" | "departure";
    place: string;
    transport?: "public" | "taxi" | "car" | "walk" | "train" | "bus" | "ferry" | undefined;
    start?: string | undefined;
    end?: string | undefined;
    travelMinutes?: number | undefined;
    why?: string | undefined;
    see?: string[] | undefined;
}, {
    kind: "arrival" | "transfer" | "visit" | "meal" | "rest" | "return" | "departure";
    place: string;
    transport?: "public" | "taxi" | "car" | "walk" | "train" | "bus" | "ferry" | undefined;
    start?: string | undefined;
    end?: string | undefined;
    travelMinutes?: number | undefined;
    why?: string | undefined;
    see?: string[] | undefined;
}>;
export declare const itineraryDaySchema: z.ZodObject<{
    date: z.ZodOptional<z.ZodString>;
    weekday: z.ZodOptional<z.ZodString>;
    title: z.ZodString;
    blocks: z.ZodArray<z.ZodObject<{
        start: z.ZodOptional<z.ZodString>;
        end: z.ZodOptional<z.ZodString>;
        place: z.ZodString;
        kind: z.ZodEnum<["arrival", "transfer", "visit", "meal", "rest", "return", "departure"]>;
        transport: z.ZodOptional<z.ZodEnum<["walk", "public", "taxi", "car", "train", "bus", "ferry"]>>;
        travelMinutes: z.ZodOptional<z.ZodNumber>;
        why: z.ZodOptional<z.ZodString>;
        see: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        kind: "arrival" | "transfer" | "visit" | "meal" | "rest" | "return" | "departure";
        place: string;
        transport?: "public" | "taxi" | "car" | "walk" | "train" | "bus" | "ferry" | undefined;
        start?: string | undefined;
        end?: string | undefined;
        travelMinutes?: number | undefined;
        why?: string | undefined;
        see?: string[] | undefined;
    }, {
        kind: "arrival" | "transfer" | "visit" | "meal" | "rest" | "return" | "departure";
        place: string;
        transport?: "public" | "taxi" | "car" | "walk" | "train" | "bus" | "ferry" | undefined;
        start?: string | undefined;
        end?: string | undefined;
        travelMinutes?: number | undefined;
        why?: string | undefined;
        see?: string[] | undefined;
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
    }[];
    date?: string | undefined;
    weekday?: string | undefined;
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
    }[];
    date?: string | undefined;
    weekday?: string | undefined;
}>;
export declare const itineraryPlanSchema: z.ZodObject<{
    title: z.ZodString;
    base: z.ZodOptional<z.ZodString>;
    accommodation: z.ZodOptional<z.ZodString>;
    style: z.ZodOptional<z.ZodString>;
    days: z.ZodArray<z.ZodObject<{
        date: z.ZodOptional<z.ZodString>;
        weekday: z.ZodOptional<z.ZodString>;
        title: z.ZodString;
        blocks: z.ZodArray<z.ZodObject<{
            start: z.ZodOptional<z.ZodString>;
            end: z.ZodOptional<z.ZodString>;
            place: z.ZodString;
            kind: z.ZodEnum<["arrival", "transfer", "visit", "meal", "rest", "return", "departure"]>;
            transport: z.ZodOptional<z.ZodEnum<["walk", "public", "taxi", "car", "train", "bus", "ferry"]>>;
            travelMinutes: z.ZodOptional<z.ZodNumber>;
            why: z.ZodOptional<z.ZodString>;
            see: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            kind: "arrival" | "transfer" | "visit" | "meal" | "rest" | "return" | "departure";
            place: string;
            transport?: "public" | "taxi" | "car" | "walk" | "train" | "bus" | "ferry" | undefined;
            start?: string | undefined;
            end?: string | undefined;
            travelMinutes?: number | undefined;
            why?: string | undefined;
            see?: string[] | undefined;
        }, {
            kind: "arrival" | "transfer" | "visit" | "meal" | "rest" | "return" | "departure";
            place: string;
            transport?: "public" | "taxi" | "car" | "walk" | "train" | "bus" | "ferry" | undefined;
            start?: string | undefined;
            end?: string | undefined;
            travelMinutes?: number | undefined;
            why?: string | undefined;
            see?: string[] | undefined;
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
        }[];
        date?: string | undefined;
        weekday?: string | undefined;
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
        }[];
        date?: string | undefined;
        weekday?: string | undefined;
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
        }[];
        date?: string | undefined;
        weekday?: string | undefined;
    }[];
    base?: string | undefined;
    accommodation?: string | undefined;
    style?: string | undefined;
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
        }[];
        date?: string | undefined;
        weekday?: string | undefined;
    }[];
    base?: string | undefined;
    accommodation?: string | undefined;
    style?: string | undefined;
}>;
export declare const tripPlansSchema: z.ZodObject<{
    plans: z.ZodArray<z.ZodObject<{
        title: z.ZodString;
        base: z.ZodOptional<z.ZodString>;
        accommodation: z.ZodOptional<z.ZodString>;
        style: z.ZodOptional<z.ZodString>;
        days: z.ZodArray<z.ZodObject<{
            date: z.ZodOptional<z.ZodString>;
            weekday: z.ZodOptional<z.ZodString>;
            title: z.ZodString;
            blocks: z.ZodArray<z.ZodObject<{
                start: z.ZodOptional<z.ZodString>;
                end: z.ZodOptional<z.ZodString>;
                place: z.ZodString;
                kind: z.ZodEnum<["arrival", "transfer", "visit", "meal", "rest", "return", "departure"]>;
                transport: z.ZodOptional<z.ZodEnum<["walk", "public", "taxi", "car", "train", "bus", "ferry"]>>;
                travelMinutes: z.ZodOptional<z.ZodNumber>;
                why: z.ZodOptional<z.ZodString>;
                see: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                kind: "arrival" | "transfer" | "visit" | "meal" | "rest" | "return" | "departure";
                place: string;
                transport?: "public" | "taxi" | "car" | "walk" | "train" | "bus" | "ferry" | undefined;
                start?: string | undefined;
                end?: string | undefined;
                travelMinutes?: number | undefined;
                why?: string | undefined;
                see?: string[] | undefined;
            }, {
                kind: "arrival" | "transfer" | "visit" | "meal" | "rest" | "return" | "departure";
                place: string;
                transport?: "public" | "taxi" | "car" | "walk" | "train" | "bus" | "ferry" | undefined;
                start?: string | undefined;
                end?: string | undefined;
                travelMinutes?: number | undefined;
                why?: string | undefined;
                see?: string[] | undefined;
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
            }[];
            date?: string | undefined;
            weekday?: string | undefined;
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
            }[];
            date?: string | undefined;
            weekday?: string | undefined;
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
            }[];
            date?: string | undefined;
            weekday?: string | undefined;
        }[];
        base?: string | undefined;
        accommodation?: string | undefined;
        style?: string | undefined;
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
            }[];
            date?: string | undefined;
            weekday?: string | undefined;
        }[];
        base?: string | undefined;
        accommodation?: string | undefined;
        style?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    plans: {
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
            }[];
            date?: string | undefined;
            weekday?: string | undefined;
        }[];
        base?: string | undefined;
        accommodation?: string | undefined;
        style?: string | undefined;
    }[];
}, {
    plans: {
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
            }[];
            date?: string | undefined;
            weekday?: string | undefined;
        }[];
        base?: string | undefined;
        accommodation?: string | undefined;
        style?: string | undefined;
    }[];
}>;
export type BlockKind = z.infer<typeof blockKindSchema>;
export type BlockTransport = z.infer<typeof blockTransportSchema>;
export type ItineraryBlock = z.infer<typeof itineraryBlockSchema>;
export type ItineraryDay = z.infer<typeof itineraryDaySchema>;
export type ItineraryPlan = z.infer<typeof itineraryPlanSchema>;
export type TripPlans = z.infer<typeof tripPlansSchema>;
//# sourceMappingURL=output.d.ts.map