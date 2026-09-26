# plan-trip

TypeScript library that turns a fixed trip request into structured itinerary plans. Another project imports this package; there is no HTTP API and no UI.

You pass trip details in. The library calls your AI provider with a fixed prompt and returns JSON plans shaped like a day-by-day itinerary (times, places, transport, rest, return).

**Wiring this into a backend + frontend?** Use [INTEGRATION.md](INTEGRATION.md). It has a paste-ready brief for another AI or developer: locked rules (secrets on server only), what to ask before coding, and backend/frontend task lists.

## Implementation structure

```text
plan-trip/
├── src/
│   ├── index.ts              # Public exports
│   ├── generate.ts           # generateItinerary: validate → call AI → validate → retry
│   ├── env.ts                # PLAN_TRIP_* environment reader
│   ├── prompt.ts             # System + user prompts
│   ├── schema/
│   │   ├── input.ts          # Zod input contract (TripInput)
│   │   ├── output.ts         # Zod output contract (TripPlans)
│   │   └── json-schema.ts    # JSON Schema sent to providers
│   └── providers/
│       ├── index.ts          # Selects openai | anthropic | gemini
│       ├── types.ts          # Provider interface + JSON extract helper
│       ├── openai.ts
│       ├── anthropic.ts
│       └── gemini.ts
├── dist/                     # Built JS + .d.ts (after npm run build)
├── .env.example
├── INTEGRATION.md            # How to wire backend + frontend
├── package.json
└── tsconfig.json
```

Flow:

1. Caller invokes `generateItinerary(input)`.
2. Input is validated with Zod; `planCount` is clamped by `PLAN_TRIP_MAX_PLANS`.
3. Env selects the provider and API key.
4. The model returns JSON; the library validates it and retries once on failure.
5. Caller receives `TripPlans` and renders or stores it.

## Where to put the API key and secrets

The library reads secrets from **process environment variables**, not from the trip JSON and not from source files.

| Variable | Required | Description |
| --- | --- | --- |
| `PLAN_TRIP_PROVIDER` | yes | `openai`, `anthropic`, or `gemini` |
| `PLAN_TRIP_API_KEY` | yes | Your provider secret key |
| `PLAN_TRIP_MAX_PLANS` | no | Cap on requested plans (default `3`) |
| `PLAN_TRIP_MODEL` | no | Optional model override |

Defaults when `PLAN_TRIP_MODEL` is unset:

- OpenAI: `gpt-4o-mini`
- Anthropic: `claude-sonnet-4-20250514`
- Gemini: `gemini-2.0-flash`

`planCount` in the request cannot exceed `PLAN_TRIP_MAX_PLANS`.

### Local development (this repo or your app)

1. Copy the example file:

```bash
cp .env.example .env
```

2. Fill in the values in `.env` (never commit this file — it is gitignored):

```bash
PLAN_TRIP_PROVIDER=openai
PLAN_TRIP_API_KEY=sk-your-real-key-here
PLAN_TRIP_MAX_PLANS=3
# PLAN_TRIP_MODEL=gpt-4o-mini
```

3. Load them before running Node:

```bash
export $(grep -v '^#' .env | xargs)
node try.mjs
```

Or set them inline for a one-off run:

```bash
PLAN_TRIP_PROVIDER=openai PLAN_TRIP_API_KEY=sk-... node try.mjs
```

In your own Node app you can also load `.env` with `dotenv` / your framework’s env loader. The variables must exist on `process.env` when `generateItinerary` runs.

### Deployed apps

Put the same names in your host’s secret store (Vercel / Railway / Fly / Docker Compose `environment`, CI secrets, Kubernetes secrets). Do not bake the key into the image or the client bundle.

### Python or other languages

Set `PLAN_TRIP_*` on the parent process, or pass them into the Node child (`subprocess` `env=`). The bridge inherits them.

### Never

- Put the key inside the trip input JSON
- Commit `.env` or hardcode the key in source
- Send `PLAN_TRIP_API_KEY` to the browser

## Quick try (new users)

Requires Node.js 18+.

```bash
git clone <this-repo-url> plan-trip
cd plan-trip
npm install
npm run build
cp .env.example .env
# edit .env and set PLAN_TRIP_API_KEY
```

Create `try.mjs` at the repo root:

```js
import { generateItinerary } from "./dist/index.js";

const plans = await generateItinerary({
  country: "Italy",
  durationDays: 3,
  lang: "en",
  base: { kind: "airport", name: "Bari Airport" },
  tripType: "relaxed",
  cities: ["Monopoli", "Polignano a Mare"],
  transport: "car",
  planCount: 1,
});

console.log(JSON.stringify(plans, null, 2));
```

```bash
export $(grep -v '^#' .env | xargs)
node try.mjs
```

## Wire into your project

For a full **backend API + frontend form** integration (two consumer apps), follow [INTEGRATION.md](INTEGRATION.md).

This package is native ESM TypeScript/JavaScript. Other languages call it through Node.

### TypeScript / Node (recommended)

```bash
# local path while developing
npm install ../plan-trip

# or after publish
npm install plan-trip
```

```ts
import { generateItinerary, type TripInput, type TripPlans } from "plan-trip";

export async function buildTrip(input: TripInput): Promise<TripPlans> {
  return generateItinerary(input);
}
```

Ensure `PLAN_TRIP_PROVIDER` and `PLAN_TRIP_API_KEY` are set in that process (see [Where to put the API key and secrets](#where-to-put-the-api-key-and-secrets)).

### JavaScript (Node ESM)

```js
import { generateItinerary } from "plan-trip";

const plans = await generateItinerary({
  country: "Japan",
  durationDays: 3,
  lang: "en",
  planCount: 2,
});
```

### Next.js / Nest / Express

Import `generateItinerary` only on the **server** (API route, server action, Nest service). Never expose `PLAN_TRIP_API_KEY` to the browser.

```ts
// app/api/itinerary/route.ts (Next.js App Router example)
import { generateItinerary } from "plan-trip";

export async function POST(req: Request) {
  const body = await req.json();
  const plans = await generateItinerary(body);
  return Response.json(plans);
}
```

### Python

1. Keep `plan-trip` built (`npm run build`).
2. Add a bridge script, e.g. `bridges/plan_trip.mjs`:

```js
import { generateItinerary } from "plan-trip";

const input = JSON.parse(process.argv[2] ?? "{}");
const plans = await generateItinerary(input);
process.stdout.write(JSON.stringify(plans));
```

3. From Python (env must include `PLAN_TRIP_*`):

```python
import json
import os
import subprocess

def generate_itinerary(payload: dict) -> dict:
    env = os.environ.copy()
    result = subprocess.run(
        ["node", "bridges/plan_trip.mjs", json.dumps(payload)],
        check=True,
        capture_output=True,
        text=True,
        env=env,
    )
    return json.loads(result.stdout)

plans = generate_itinerary({
    "country": "Japan",
    "durationDays": 3,
    "lang": "en",
    "planCount": 1,
})
```

### Other languages (Go, Ruby, PHP, …)

Same pattern: spawn `node` with JSON input, set `PLAN_TRIP_*` on the child, parse JSON from stdout.

## Input JSON (accepted format)

Pass an object like this to `generateItinerary`. Only `country` and `durationDays` are required.

```json
{
  "country": "Japan",
  "durationDays": 3,
  "lang": "en",
  "people": 2,
  "base": {
    "kind": "airport",
    "name": "Kansai Airport"
  },
  "tripType": "romantic",
  "cities": ["Kyoto", "Osaka"],
  "mustSee": "Fushimi Inari",
  "custom": "No nightlife. Walk when the walk is short.",
  "transport": "public",
  "pets": false,
  "planCount": 3,
  "startDate": "2026-06-13",
  "accommodation": "Hotel near Kyoto Station"
}
```

### Field reference

| Field | Required | Type | Notes |
| --- | --- | --- | --- |
| `country` | **yes** | string | Destination country |
| `durationDays` | **yes** | positive integer | Length of the trip in days |
| `lang` | no | string | Output language for readable text (default `"en"`) |
| `people` | no | positive integer | Party size |
| `base` | no | object | Start / overnight reference |
| `base.kind` | if `base` | `"airport"` \| `"port"` \| `"hotel"` \| `"cityCenter"` | |
| `base.name` | if `base` | string | e.g. `"Kansai Airport"` |
| `tripType` | no | string | e.g. `"friends"`, `"family"`, `"romantic"`, `"relaxed"` |
| `cities` | no | string[] | Preferred cities |
| `mustSee` | no | string | Must-include place or attraction |
| `custom` | no | string | Free-text constraints |
| `transport` | no | `"public"` \| `"taxi"` \| `"car"` | Preference for the plan |
| `pets` | no | boolean | Whether travelers have pets |
| `planCount` | no | positive integer | How many alternative plans (capped by env) |
| `startDate` | no | string | First day, free format or ISO date |
| `accommodation` | no | string | Lodging name used in the plan |

Minimal valid input:

```json
{
  "country": "Japan",
  "durationDays": 3
}
```

## Output JSON (example)

`generateItinerary` resolves to an object with a `plans` array. Readable strings follow `lang`. Codes (`kind`, `transport`) stay in English.

```json
{
  "plans": [
    {
      "title": "Kyoto on foot and by train",
      "base": "Kyoto",
      "accommodation": "Hotel near Kyoto Station",
      "style": "Romantic pace, public transport, no nightlife.",
      "days": [
        {
          "date": "13 June",
          "weekday": "Saturday",
          "title": "Arrival day – Fushimi Inari and the old town",
          "blocks": [
            {
              "start": "10:00",
              "end": "10:00",
              "place": "Kansai Airport",
              "kind": "arrival"
            },
            {
              "start": "10:30",
              "end": "11:45",
              "place": "Fushimi Inari",
              "kind": "visit",
              "transport": "train",
              "travelMinutes": 75,
              "why": "Iconic shrine and a strong first stop from the airport.",
              "see": ["Torii gates", "Mountain trails"]
            },
            {
              "start": "12:15",
              "end": "13:30",
              "place": "Nishiki Market",
              "kind": "visit",
              "transport": "train",
              "travelMinutes": 20,
              "why": "Easy lunch stop in the center.",
              "see": ["Food stalls", "Side streets"]
            },
            {
              "start": "14:00",
              "end": "16:00",
              "place": "Hotel near Kyoto Station",
              "kind": "rest",
              "transport": "walk",
              "travelMinutes": 15,
              "why": "Check in, shower, and rest."
            },
            {
              "start": "17:00",
              "end": "21:00",
              "place": "Gion",
              "kind": "visit",
              "transport": "bus",
              "travelMinutes": 20,
              "why": "Evening walk without nightlife.",
              "see": ["Hanamikoji", "Yasaka Shrine"]
            },
            {
              "start": "21:30",
              "place": "Hotel near Kyoto Station",
              "kind": "return",
              "transport": "taxi",
              "travelMinutes": 15
            }
          ]
        }
      ]
    }
  ]
}
```

### Output codes

| Field | Allowed values |
| --- | --- |
| `blocks[].kind` | `arrival`, `transfer`, `visit`, `meal`, `rest`, `return`, `departure` |
| `blocks[].transport` | `walk`, `public`, `taxi`, `car`, `train`, `bus`, `ferry` |

### Travel-guide fields (all optional)

These drive the printed trip guide (day headers, "Trip at a glance" table, transport strategy, practical notes). Older plans without them stay valid.

| Level | Field | Meaning |
| --- | --- | --- |
| plan | `subtitle` | Guide label, e.g. "Couple Trip Guide" |
| plan | `occasion` | Trip-wide occasion line, e.g. "Birthday on the 27th" |
| plan | `logistics` | `{ arrival, departure, base, nearestTransit }` |
| plan | `transportTips` | 2–4 bullets: tickets/app, airport ↔ city |
| plan | `notes` | 3–6 `{ label, text }` practical notes |
| day | `theme` | 2–5 word label for the summary table |
| day | `highlight` | The one thing not to miss |
| day | `occasion` | Set only on the special day, e.g. "Birthday" |
| block | `details` | How-to line: route, duration, tickets, how long to stay |
| block | `highlight` | `true` on the standout moments of an occasion |

## Editing a plan

`editItinerary({ plan, instruction, lang, trip? })` revises one existing plan from a free-text change request ("swap the museum on day 2 for a food tour") and resolves to the whole revised plan. It keeps the same number of days (retries once, then throws if the model changes it), changes only what the request needs, and treats the instruction as travel preferences only. Pass the original `trip` input when you have it so unshown preferences (pets, transport) are kept.

## Public exports

| Export | Use |
| --- | --- |
| `generateItinerary` | Main entry |
| `editItinerary` / `editItineraryInputSchema` | Revise one plan from a change request |
| `TripInput` / `TripPlans` | Types for callers |
| `tripInputSchema` / `tripPlansSchema` | Zod schemas if you validate outside |
| `readPlanTripEnv` | Read env without generating |
| `getProvider` | Advanced: pick a provider manually |
