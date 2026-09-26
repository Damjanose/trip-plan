import { createAnthropicProvider } from "./anthropic.js";
import { createGeminiProvider } from "./gemini.js";
import { createOpenAIProvider } from "./openai.js";
export { extractJson } from "./types.js";
export function getProvider(provider, apiKey, model, openaiBaseUrl) {
    switch (provider) {
        case "openai":
            return createOpenAIProvider(apiKey, model, openaiBaseUrl);
        case "anthropic":
            return createAnthropicProvider(apiKey, model);
        case "gemini":
            return createGeminiProvider(apiKey, model);
        default: {
            const _exhaustive = provider;
            throw new Error(`Unsupported provider: ${_exhaustive}`);
        }
    }
}
//# sourceMappingURL=index.js.map