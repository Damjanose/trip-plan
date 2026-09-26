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
    /** Practical line under the place: route, duration, tickets, booking tips. */
    details: z.ZodOptional<z.ZodString>;
    /** Marks a standout moment (birthday dinner, the cruise); rendered in the accent colour. */
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
}>;
export declare const itineraryDaySchema: z.ZodObject<{
    date: z.ZodOptional<z.ZodString>;
    weekday: z.ZodOptional<z.ZodString>;
    title: z.ZodString;
    /** Short label (2–5 words) for the "Trip at a glance" table. */
    theme: z.ZodOptional<z.ZodString>;
    /** The one thing not to miss that day. */
    highlight: z.ZodOptional<z.ZodString>;
    /** Set only for a special day (e.g. "Birthday"); rendered as an accented day. */
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
        /** Practical line under the place: route, duration, tickets, booking tips. */
        details: z.ZodOptional<z.ZodString>;
        /** Marks a standout moment (birthday dinner, the cruise); rendered in the accent colour. */
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
}>;
export declare const itineraryLogisticsSchema: z.ZodObject<{
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
}>;
export declare const itineraryNoteSchema: z.ZodObject<{
    label: z.ZodString;
    text: z.ZodString;
}, "strip", z.ZodTypeAny, {
    label: string;
    text: string;
}, {
    label: string;
    text: string;
}>;
export declare const itineraryPlanSchema: z.ZodObject<{
    title: z.ZodString;
    base: z.ZodOptional<z.ZodString>;
    accommodation: z.ZodOptional<z.ZodString>;
    style: z.ZodOptional<z.ZodString>;
    /** Guide label under the title, e.g. "Couple Trip Guide". */
    subtitle: z.ZodOptional<z.ZodString>;
    /** Trip-wide occasion line, e.g. "Birthday on the 27th". */
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
        /** Short label (2–5 words) for the "Trip at a glance" table. */
        theme: z.ZodOptional<z.ZodString>;
        /** The one thing not to miss that day. */
        highlight: z.ZodOptional<z.ZodString>;
        /** Set only for a special day (e.g. "Birthday"); rendered as an accented day. */
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
            /** Practical line under the place: route, duration, tickets, booking tips. */
            details: z.ZodOptional<z.ZodString>;
            /** Marks a standout moment (birthday dinner, the cruise); rendered in the accent colour. */
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
export declare const tripPlansSchema: z.ZodObject<{
    plans: z.ZodArray<z.ZodObject<{
        title: z.ZodString;
        base: z.ZodOptional<z.ZodString>;
        accommodation: z.ZodOptional<z.ZodString>;
        style: z.ZodOptional<z.ZodString>;
        /** Guide label under the title, e.g. "Couple Trip Guide". */
        subtitle: z.ZodOptional<z.ZodString>;
        /** Trip-wide occasion line, e.g. "Birthday on the 27th". */
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
            /** Short label (2–5 words) for the "Trip at a glance" table. */
            theme: z.ZodOptional<z.ZodString>;
            /** The one thing not to miss that day. */
            highlight: z.ZodOptional<z.ZodString>;
            /** Set only for a special day (e.g. "Birthday"); rendered as an accented day. */
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
                /** Practical line under the place: route, duration, tickets, booking tips. */
                details: z.ZodOptional<z.ZodString>;
                /** Marks a standout moment (birthday dinner, the cruise); rendered in the accent colour. */
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
    }[];
}>;
export type BlockKind = z.infer<typeof blockKindSchema>;
export type BlockTransport = z.infer<typeof blockTransportSchema>;
export type ItineraryBlock = z.infer<typeof itineraryBlockSchema>;
export type ItineraryDay = z.infer<typeof itineraryDaySchema>;
export type ItineraryLogistics = z.infer<typeof itineraryLogisticsSchema>;
export type ItineraryNote = z.infer<typeof itineraryNoteSchema>;
export type ItineraryPlan = z.infer<typeof itineraryPlanSchema>;
export type TripPlans = z.infer<typeof tripPlansSchema>;
//# sourceMappingURL=output.d.ts.map