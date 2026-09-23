import { extractJson } from "./types.js";
const DEFAULT_MODEL = "claude-sonnet-4-20250514";
export function createAnthropicProvider(apiKey, model = DEFAULT_MODEL) {
    return {
        name: "anthropic",
        async generate({ system, user }) {
            const response = await fetch("https://api.anthropic.com/v1/messages", {
                method: "POST",
                headers: {
                    "x-api-key": apiKey,
                    "anthropic-version": "2023-06-01",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model,
                    max_tokens: 8192,
                    temperature: 0.4,
                    system: `${system}\n\nRespond with a single JSON object only.`,
                    messages: [{ role: "user", content: user }],
                }),
            });
            const data = (await response.json());
            if (!response.ok) {
                throw new Error(`Anthropic error (${response.status}): ${data.error?.message ?? response.statusText}`);
            }
            const text = data.content
                ?.filter((part) => part.type === "text" && part.text)
                .map((part) => part.text)
                .join("\n");
            if (!text) {
                throw new Error("Anthropic returned an empty response.");
            }
            return extractJson(text);
        },
    };
}
//# sourceMappingURL=anthropic.js.map