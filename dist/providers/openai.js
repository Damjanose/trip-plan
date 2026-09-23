import { extractJson } from "./types.js";
const DEFAULT_MODEL = "gpt-4o-mini";
export function createOpenAIProvider(apiKey, model = DEFAULT_MODEL) {
    return {
        name: "openai",
        async generate({ system, user, schema }) {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model,
                    temperature: 0.4,
                    messages: [
                        { role: "system", content: system },
                        { role: "user", content: user },
                    ],
                    response_format: {
                        type: "json_schema",
                        json_schema: {
                            name: "trip_plans",
                            strict: false,
                            schema,
                        },
                    },
                }),
            });
            const data = (await response.json());
            if (!response.ok) {
                throw new Error(`OpenAI error (${response.status}): ${data.error?.message ?? response.statusText}`);
            }
            const content = data.choices?.[0]?.message?.content;
            if (!content) {
                throw new Error("OpenAI returned an empty response.");
            }
            return extractJson(content);
        },
    };
}
//# sourceMappingURL=openai.js.map