import { z } from "zod";
export declare const baseKindSchema: z.ZodEnum<["airport", "port", "hotel", "cityCenter"]>;
export declare const tripTransportPreferenceSchema: z.ZodEnum<["public", "taxi", "car"]>;
export declare const tripBaseSchema: z.ZodObject<{
    kind: z.ZodEnum<["airport", "port", "hotel", "cityCenter"]>;
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    kind: "airport" | "port" | "hotel" | "cityCenter";
    name: string;
}, {
    kind: "airport" | "port" | "hotel" | "cityCenter";
    name: string;
}>;
export declare const tripInputSchema: z.ZodObject<{
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
}>;
export type TripInput = z.input<typeof tripInputSchema>;
export type TripInputParsed = z.output<typeof tripInputSchema>;
export type TripBase = z.infer<typeof tripBaseSchema>;
export type BaseKind = z.infer<typeof baseKindSchema>;
export type TripTransportPreference = z.infer<typeof tripTransportPreferenceSchema>;
//# sourceMappingURL=input.d.ts.map