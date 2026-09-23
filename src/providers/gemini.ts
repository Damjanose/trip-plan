import { extractJson, type ItineraryProvider } from "./types.js";

const DEFAULT_MODEL = "gemini-2.0-flash";

type GeminiGenerateResponse = {
  candidates?: Array<{
    content?: { parts?: Array<{ text?: string }> };
  }>;
  error?: { message?: string };
};

/** Gemini accepts a JSON Schema subset; strip fields it often rejects. */
function toGeminiSchema(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(toGeminiSchema);
  }
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, child] of Object.entries(
      value as Record<string, unknown>,
    )) {
      if (key === "additionalProperties") continue;
      out[key] = toGeminiSchema(child);
    }
    return out;
  }
  return value;
}

export function createGeminiProvider(
  apiKey: string,
  model = DEFAULT_MODEL,
): ItineraryProvider {
  return {
    name: "gemini",
    async generate({ system, user, schema }) {
      const url = new URL(
        `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
      );
      url.searchParams.set("key", apiKey);

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: system }] },
          contents: [{ role: "user", parts: [{ text: user }] }],
          generationConfig: {
            temperature: 0.4,
            responseMimeType: "application/json",
            responseSchema: toGeminiSchema(schema),
          },
        }),
      });

      const data = (await response.json()) as GeminiGenerateResponse;
      if (!response.ok) {
        throw new Error(
          `Gemini error (${response.status}): ${data.error?.message ?? response.statusText}`,
        );
      }

      const text = data.candidates?.[0]?.content?.parts
        ?.map((part) => part.text ?? "")
        .join("");

      if (!text) {
        throw new Error("Gemini returned an empty response.");
      }
      return extractJson(text);
    },
  };
}
