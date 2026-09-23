import { readPlanTripEnv } from "./env.js";
import { getProvider } from "./providers/index.js";
import { tripInputSchema, type TripInput } from "./schema/input.js";
import type { TripPlans } from "./schema/output.js";

/**
 * Validates trip input, reads env (provider, key, max plans), clamps planCount,
 * and selects the provider. Model generation is not implemented in setup.
 */
export async function generateItinerary(
  input: TripInput,
): Promise<TripPlans> {
  const parsed = tripInputSchema.parse(input);
  const env = readPlanTripEnv();
  const requested = parsed.planCount ?? env.maxPlans;
  const planCount = Math.min(requested, env.maxPlans);

  // Ensure the configured provider can be selected with the given key.
  getProvider(env.provider, env.apiKey);

  throw new Error(
    `plan-trip setup is ready (provider "${env.provider}", planCount ${planCount}). Model generation is not implemented yet.`,
  );
}
