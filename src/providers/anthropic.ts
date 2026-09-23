import type { ItineraryProvider } from "./types.js";

export function createAnthropicProvider(_apiKey: string): ItineraryProvider {
  return {
    name: "anthropic",
    async generate() {
      throw new Error("Anthropic provider is not implemented yet.");
    },
  };
}
