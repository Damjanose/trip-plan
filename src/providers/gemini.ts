import type { ItineraryProvider } from "./types.js";

export function createGeminiProvider(_apiKey: string): ItineraryProvider {
  return {
    name: "gemini",
    async generate() {
      throw new Error("Gemini provider is not implemented yet.");
    },
  };
}
