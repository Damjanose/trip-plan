import type { TripInputParsed } from "./schema/input.js";

export const SYSTEM_PROMPT = `You are a travel itinerary planner. Return JSON only. No markdown. No commentary.

Rules:
- Output must match the provided JSON shape exactly.
- JSON keys and enum codes stay in English forever.
- Translate human-readable strings (title, style, why, see, place, base, accommodation, date, weekday) into the requested language (lang).
- Create exactly the requested number of alternative plans (planCount). Each plan must cover durationDays days.
- Prefer a realistic pace: avoid rushing, minimize unnecessary travel, group nearby places.
- Day structure should follow a closed chain when a base/accommodation exists: leave base, visit places, optionally rest at accommodation midday, return to overnight place.
- First day may start with arrival/transfer from base kind (airport/port/hotel/cityCenter). Last day may end with departure.
- Block kind must be one of: arrival, transfer, visit, meal, rest, return, departure.
- Block transport must be one of: walk, public, taxi, car, train, bus, ferry (omit when not needed).
- Respect transport preference, pets, tripType, mustSee, cities, custom notes.
- Use approximate travelMinutes and stay windows via start/end times (HH:MM) when known.
- Keep each plan clearly different (route order, focus, or pace), not tiny wording changes.`;

export function buildUserPrompt(input: {
  trip: TripInputParsed;
  planCount: number;
  schemaDescription: string;
  repairHint?: string;
}): string {
  const { trip, planCount, schemaDescription, repairHint } = input;

  const lines: string[] = [
    "Generate trip itinerary plans from this request:",
    "",
    JSON.stringify(
      {
        country: trip.country,
        durationDays: trip.durationDays,
        lang: trip.lang,
        people: trip.people ?? null,
        base: trip.base ?? null,
        tripType: trip.tripType ?? null,
        cities: trip.cities ?? null,
        mustSee: trip.mustSee ?? null,
        custom: trip.custom ?? null,
        transport: trip.transport ?? null,
        pets: trip.pets ?? null,
        startDate: trip.startDate ?? null,
        accommodation: trip.accommodation ?? null,
        planCount,
      },
      null,
      2,
    ),
    "",
    "Return a single JSON object matching this schema description:",
    schemaDescription,
  ];

  if (repairHint) {
    lines.push(
      "",
      "Your previous JSON failed validation. Fix these issues and return corrected JSON only:",
      repairHint,
    );
  }

  return lines.join("\n");
}

export function schemaDescription(): string {
  return [
    "{",
    '  "plans": [',
    "    {",
    '      "title": string,',
    '      "base"?: string,',
    '      "accommodation"?: string,',
    '      "style"?: string,',
    '      "days": [',
    "        {",
    '          "date"?: string,',
    '          "weekday"?: string,',
    '          "title": string,',
    '          "blocks": [',
    "            {",
    '              "start"?: "HH:MM",',
    '              "end"?: "HH:MM",',
    '              "place": string,',
    '              "kind": "arrival"|"transfer"|"visit"|"meal"|"rest"|"return"|"departure",',
    '              "transport"?: "walk"|"public"|"taxi"|"car"|"train"|"bus"|"ferry",',
    '              "travelMinutes"?: number,',
    '              "why"?: string,',
    '              "see"?: string[]',
    "            }",
    "          ]",
    "        }",
    "      ]",
    "    }",
    "  ]",
    "}",
  ].join("\n");
}
