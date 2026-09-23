# Integrating plan-trip into backend + frontend

This package is a **library only**. It does not ship an HTTP API or a UI. Wire it like this:

```text
Frontend (form)  --HTTP JSON-->  Backend (API)  --import-->  plan-trip  --AI-->  provider
                                      ^
                                      |
                         PLAN_TRIP_* secrets live here only
```

Use this file as the brief when asking an AI (or a human) to implement the other two projects. Point them at this repo’s [README.md](README.md) for the full input/output JSON.

---

## Paste-ready brief for another AI

Copy everything below the line into the backend and/or frontend chat.

---

**Context:** We already have a TypeScript package `plan-trip` that exports `generateItinerary(input) → Promise<TripPlans>`. There is no server and no UI in that repo. You must wire **two** consumer projects: a **backend** and a **frontend**.

**Do this first:** ask me for any missing specifics in the checklist below before writing a lot of code. Do not invent auth, routes, or UI branding without asking.

### Locked decisions (do not change)

1. Secrets (`PLAN_TRIP_PROVIDER`, `PLAN_TRIP_API_KEY`, optional `PLAN_TRIP_MAX_PLANS`, `PLAN_TRIP_MODEL`) live **only on the backend** process env. Never send the API key to the browser. Never put it in the trip request body.
2. Request body from frontend → backend must match the `plan-trip` input JSON (see README). Required fields: `country`, `durationDays`. Everything else optional.
3. Backend response body must be the `plan-trip` output JSON: `{ "plans": [ ... ] }` (or wrap it once, e.g. `{ "data": { "plans": [...] } }`, but keep the inner shape exact).
4. Backend calls `generateItinerary` from `plan-trip` (Node/TS). Python/other stacks must use a Node bridge as documented in the README.
5. Frontend only: collect fields, POST to the backend, show loading/error, render the returned plans. No AI calls from the client.

### Ask me before coding if unknown

- Backend stack (Express, Nest, Next API routes, Fastify, …) and repo path
- Frontend stack (React, Next, Vue, …) and repo path
- How `plan-trip` is installed (`file:../plan-trip`, npm, monorepo workspace)
- API path and method (default suggestion: `POST /api/itinerary`)
- Auth required? (none / session / JWT / API key for our users)
- Persist trips in a database? (yes/no; if yes, which DB)
- How to display plans (timeline of blocks, cards, markdown later)
- Default `lang` and whether the UI has a language picker
- Timeout / max duration expectations (AI calls can take 10–60s)

### Backend tasks

1. Install / link `plan-trip`; run `npm run build` in that package if using a local path.
2. Set env: `PLAN_TRIP_PROVIDER`, `PLAN_TRIP_API_KEY`, optionally `PLAN_TRIP_MAX_PLANS`, `PLAN_TRIP_MODEL`.
3. Add `POST` endpoint that:
   - Parses JSON body
   - Optionally validates with `tripInputSchema` or trusts `generateItinerary` to throw on bad input
   - Calls `await generateItinerary(body)`
   - Returns `200` + plans JSON
   - Maps Zod / missing-env errors to `400`, provider failures to `502`/`500`
4. Do not log the API key. Do not expose env to the client.

Suggested minimal handler (Node):

```ts
import { generateItinerary } from "plan-trip";

// POST /api/itinerary
export async function createItinerary(req, res) {
  try {
    const plans = await generateItinerary(req.body);
    res.status(200).json(plans);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed";
    const status = /Missing PLAN_TRIP|Invalid|expected/i.test(message) ? 400 : 502;
    res.status(status).json({ error: message });
  }
}
```

### Frontend tasks

1. Form fields aligned with input JSON:
   - Required: country, durationDays
   - Optional: lang, people, base.kind + base.name, tripType, cities, mustSee, custom, transport, pets, planCount, startDate, accommodation
2. On submit: `POST` that JSON to the backend endpoint (credentials as your auth requires).
3. UI states: idle, loading (AI may be slow), error message, success with plan list.
4. Render each plan’s `days` → `blocks` (time, place, kind, transport, travelMinutes, why, see). Do not invent fields the API did not return.
5. Never import `plan-trip` or call the AI provider from the browser.

### Contract examples

**Request**

```http
POST /api/itinerary
Content-Type: application/json

{
  "country": "Japan",
  "durationDays": 3,
  "lang": "en",
  "people": 2,
  "base": { "kind": "airport", "name": "Kansai Airport" },
  "tripType": "romantic",
  "cities": ["Kyoto"],
  "mustSee": "Fushimi Inari",
  "custom": "No nightlife.",
  "transport": "public",
  "pets": false,
  "planCount": 2
}
```

**Success response**

```http
200 OK
Content-Type: application/json

{
  "plans": [
    {
      "title": "...",
      "base": "...",
      "days": [
        {
          "title": "...",
          "blocks": [
            {
              "place": "...",
              "kind": "visit",
              "transport": "train",
              "travelMinutes": 75
            }
          ]
        }
      ]
    }
  ]
}
```

**Error response**

```http
400 | 502
Content-Type: application/json

{ "error": "human-readable message" }
```

### Done when

- [ ] Backend generates plans with a real `PLAN_TRIP_API_KEY` without the key appearing in frontend code or network payloads
- [ ] Frontend can submit a full (and a minimal) form and display at least one plan’s day blocks
- [ ] Invalid input shows a clear error; missing server env fails loudly on the server, not with a blank page

---

## Default recommendations (if the user says “just pick”)

Use these only when the user explicitly allows defaults:

| Choice | Default |
| --- | --- |
| API | `POST /api/itinerary` |
| Response | Raw `{ plans: [...] }` (no wrapper) |
| Auth | None for first slice |
| Persist | No (stateless generate) |
| Frontend display | Vertical day timeline of blocks |
| `planCount` UI default | `1` (cheaper); max from env |

## Related docs

- Full field tables and local try steps: [README.md](README.md)
- Env template: [.env.example](.env.example)
