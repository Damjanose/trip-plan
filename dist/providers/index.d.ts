import type { PlanTripProviderName } from "../env.js";
import type { ItineraryProvider } from "./types.js";
export type { ItineraryProvider, ItineraryProviderGenerateArgs } from "./types.js";
export { extractJson } from "./types.js";
export declare function getProvider(provider: PlanTripProviderName, apiKey: string, model?: string, openaiBaseUrl?: string): ItineraryProvider;
//# sourceMappingURL=index.d.ts.map