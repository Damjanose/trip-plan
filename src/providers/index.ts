import type { PlanTripProviderName } from "../env.js";
import { createAnthropicProvider } from "./anthropic.js";
import { createGeminiProvider } from "./gemini.js";
import { createOpenAIProvider } from "./openai.js";
import type { ItineraryProvider } from "./types.js";

export type { ItineraryProvider, ItineraryProviderGenerateArgs } from "./types.js";

export function getProvider(
  provider: PlanTripProviderName,
  apiKey: string,
): ItineraryProvider {
  switch (provider) {
    case "openai":
      return createOpenAIProvider(apiKey);
    case "anthropic":
      return createAnthropicProvider(apiKey);
    case "gemini":
      return createGeminiProvider(apiKey);
    default: {
      const _exhaustive: never = provider;
      throw new Error(`Unsupported provider: ${_exhaustive}`);
    }
  }
}
