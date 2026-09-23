import type { ItineraryProvider } from "./types.js";

export function createOpenAIProvider(_apiKey: string): ItineraryProvider {
  return {
    name: "openai",
    async generate() {
      throw new Error("OpenAI provider is not implemented yet.");
    },
  };
}
