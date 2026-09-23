export type ItineraryProviderGenerateArgs = {
    system: string;
    user: string;
    /** JSON Schema object for providers that support structured output. */
    schema: unknown;
};
export type ItineraryProvider = {
    readonly name: string;
    generate(args: ItineraryProviderGenerateArgs): Promise<unknown>;
};
export declare function extractJson(text: string): unknown;
//# sourceMappingURL=types.d.ts.map