import { z, ZodError } from "zod";
import { readPlanTripEnv } from "./env.js";
import {
  buildEditPrompt,
  buildUserPrompt,
  EDIT_SYSTEM_PROMPT,
  schemaDescription,
  SYSTEM_PROMPT,
} from "./prompt.js";
import { getProvider, type ItineraryProvider } from "./providers/index.js";
import { tripInputSchema, type TripInput } from "./schema/input.js";
import { tripPlansJsonSchema } from "./schema/json-schema.js";
import {
  itineraryPlanSchema,
  tripPlansSchema,
  type ItineraryPlan,
  type TripPlans,
} from "./schema/output.js";

const MAX_ATTEMPTS = 2;

function formatZodError(error: ZodError): string {
  return error.issues
    .map((issue) => `${issue.path.join(".") || "(root)"}: ${issue.message}`)
    .join("; ");
}

function clampPlans(plans: TripPlans, planCount: number): TripPlans {
  return {
    plans: plans.plans.slice(0, planCount),
  };
}

function providerFromEnv(): { provider: ItineraryProvider; maxPlans: number } {
  const env = readPlanTripEnv();
  return {
    provider: getProvider(env.provider, env.apiKey, env.model, env.openaiBaseUrl),
    maxPlans: env.maxPlans,
  };
}

/**
 * Calls the provider and validates the JSON against tripPlansSchema (plus an
 * optional extra check). Retries once, feeding the validation errors back.
 */
async function generateValidPlans(
  provider: ItineraryProvider,
  system: string,
  buildUser: (repairHint?: string) => string,
  extraCheck?: (plans: TripPlans) => string | undefined,
): Promise<TripPlans> {
  let repairHint: string | undefined;
  let lastError: Error | undefined;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const raw = await provider.generate({
      system,
      user: buildUser(repairHint),
      schema: tripPlansJsonSchema,
    });

    const result = tripPlansSchema.safeParse(raw);
    const problem = result.success
      ? extraCheck?.(result.data)
      : formatZodError(result.error);
    if (result.success && !problem) {
      return result.data;
    }

    lastError = new Error(`Invalid itinerary JSON from ${provider.name}: ${problem}`);
    repairHint = problem;
  }

  throw lastError ?? new Error("Failed to generate a valid itinerary.");
}

/**
 * Validates trip input, calls the configured AI provider, and returns
 * structured itinerary plans. Retries once if the model JSON fails Zod validation.
 */
export async function generateItinerary(
  input: TripInput,
): Promise<TripPlans> {
  const parsed = tripInputSchema.parse(input);
  const { provider, maxPlans } = providerFromEnv();
  const requested = parsed.planCount ?? maxPlans;
  const planCount = Math.min(requested, maxPlans);
  const description = schemaDescription();

  const plans = await generateValidPlans(provider, SYSTEM_PROMPT, (repairHint) =>
    buildUserPrompt({
      trip: parsed,
      planCount,
      schemaDescription: description,
      repairHint,
    }),
  );
  return clampPlans(plans, planCount);
}

export const editItineraryInputSchema = z.object({
  plan: itineraryPlanSchema,
  instruction: z.string().trim().min(1).max(2000),
  lang: z.string().min(1).default("en"),
  /** The original request, so the model keeps preferences the plan text does not show. */
  trip: tripInputSchema.optional(),
});

export type EditItineraryInput = z.input<typeof editItineraryInputSchema>;

/**
 * Revises one existing plan from a free-text change request. Returns the whole
 * revised plan with the same number of days. Retries once on invalid JSON.
 */
export async function editItinerary(
  input: EditItineraryInput,
): Promise<ItineraryPlan> {
  const parsed = editItineraryInputSchema.parse(input);
  const { provider } = providerFromEnv();
  const description = schemaDescription();
  const dayCount = parsed.plan.days.length;

  const plans = await generateValidPlans(
    provider,
    EDIT_SYSTEM_PROMPT,
    (repairHint) =>
      buildEditPrompt({
        plan: parsed.plan,
        instruction: parsed.instruction,
        lang: parsed.lang,
        trip: parsed.trip,
        schemaDescription: description,
        repairHint,
      }),
    (result) => {
      const days = result.plans[0]?.days.length;
      return days === dayCount
        ? undefined
        : `plans[0].days: expected exactly ${dayCount} days, got ${days}`;
    },
  );
  // Checked by generateValidPlans: tripPlansSchema requires at least one plan.
  return plans.plans[0] as ItineraryPlan;
}
