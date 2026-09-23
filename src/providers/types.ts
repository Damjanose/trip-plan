export type ItineraryProviderGenerateArgs = {
  prompt: string;
  /** JSON Schema or provider-specific schema description for structured output. */
  schema: unknown;
};

export type ItineraryProvider = {
  readonly name: string;
  generate(args: ItineraryProviderGenerateArgs): Promise<unknown>;
};
