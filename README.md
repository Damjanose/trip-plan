# plan-trip

TypeScript library that turns a fixed trip request into structured itinerary plans. Another project imports this package; there is no HTTP API and no UI.

## Environment

Copy `.env.example` and set values in the process that imports this package:

| Variable | Required | Description |
| --- | --- | --- |
| `PLAN_TRIP_PROVIDER` | yes | `openai`, `anthropic`, or `gemini` |
| `PLAN_TRIP_API_KEY` | yes | API key for the chosen provider |
| `PLAN_TRIP_MAX_PLANS` | no | Cap on how many plans can be requested (default `3`) |
| `PLAN_TRIP_MODEL` | no | Model override for the selected provider |

Defaults when `PLAN_TRIP_MODEL` is unset:

- OpenAI: `gpt-4o-mini`
- Anthropic: `claude-sonnet-4-20250514`
- Gemini: `gemini-2.0-flash`

`planCount` on the input cannot exceed `PLAN_TRIP_MAX_PLANS`.

## Usage

```ts
import { generateItinerary } from "plan-trip";

const plans = await generateItinerary({
  country: "Japan",
  durationDays: 3,
  lang: "en",
  people: 2,
  base: { kind: "airport", name: "Kansai Airport" },
  tripType: "romantic",
  cities: ["Kyoto"],
  mustSee: "Fushimi Inari",
  custom: "No nightlife. Walk when the walk is short.",
  transport: "public",
  pets: false,
  planCount: 3,
});
```

`generateItinerary` validates the input, clamps `planCount`, calls the configured provider, validates the JSON against the output schema, and retries once if validation fails.

## Language

`lang` controls readable text in the plans (`title`, `style`, `why`, `see`, place names). JSON keys and fixed codes (`kind`, `transport`) stay in English.

## Output shape

```ts
{
  plans: [
    {
      title: string;
      base?: string;
      accommodation?: string;
      style?: string;
      days: [
        {
          date?: string;
          weekday?: string;
          title: string;
          blocks: [
            {
              start?: string;
              end?: string;
              place: string;
              kind: "arrival" | "transfer" | "visit" | "meal" | "rest" | "return" | "departure";
              transport?: "walk" | "public" | "taxi" | "car" | "train" | "bus" | "ferry";
              travelMinutes?: number;
              why?: string;
              see?: string[];
            }
          ];
        }
      ];
    }
  ];
}
```
