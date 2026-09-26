import { extractJson, type ItineraryProvider } from "./types.js";

const DEFAULT_MODEL = "gpt-4o-mini";
const DEFAULT_BASE_URL = "https://api.openai.com/v1";

type OpenAIChatResponse = {
  choices?: Array<{
    message?: { content?: string | null };
  }>;
  error?: { message?: string };
};

export function createOpenAIProvider(
  apiKey: string,
  model = DEFAULT_MODEL,
  baseUrl = DEFAULT_BASE_URL,
): ItineraryProvider {
  const root = baseUrl.replace(/\/$/, "");
  const completionsUrl = `${root}/chat/completions`;
  const useJsonSchema = root === DEFAULT_BASE_URL;

  return {
    name: "openai",
    async generate({ system, user, schema }) {
      const body: Record<string, unknown> = {
        model,
        temperature: 0.4,
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
      };
      // Official OpenAI supports json_schema; many OpenAI-compatible hosts (e.g. Z.AI) do not.
      if (useJsonSchema) {
        body.response_format = {
          type: "json_schema",
          json_schema: {
            name: "trip_plans",
            strict: false,
            schema,
          },
        };
      }

      const response = await fetch(completionsUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "Accept-Language": "en-US,en",
        },
        body: JSON.stringify(body),
      });

      const data = (await response.json()) as OpenAIChatResponse;
      if (!response.ok) {
        throw new Error(
          `OpenAI error (${response.status}): ${data.error?.message ?? response.statusText}`,
        );
      }

      const content = data.choices?.[0]?.message?.content;
      if (!content) {
        throw new Error("OpenAI returned an empty response.");
      }
      return extractJson(content);
    },
  };
}
