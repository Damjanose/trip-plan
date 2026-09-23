import { readPlanTripEnv } from "./env.js";
import { buildUserPrompt, schemaDescription, SYSTEM_PROMPT } from "./prompt.js";
import { getProvider } from "./providers/index.js";
import { tripInputSchema } from "./schema/input.js";
import { tripPlansJsonSchema } from "./schema/json-schema.js";
import { tripPlansSchema } from "./schema/output.js";
const MAX_ATTEMPTS = 2;
function formatZodError(error) {
    return error.issues
        .map((issue) => `${issue.path.join(".") || "(root)"}: ${issue.message}`)
        .join("; ");
}
function clampPlans(plans, planCount) {
    return {
        plans: plans.plans.slice(0, planCount),
    };
}
/**
 * Validates trip input, calls the configured AI provider, and returns
 * structured itinerary plans. Retries once if the model JSON fails Zod validation.
 */
export async function generateItinerary(input) {
    const parsed = tripInputSchema.parse(input);
    const env = readPlanTripEnv();
    const requested = parsed.planCount ?? env.maxPlans;
    const planCount = Math.min(requested, env.maxPlans);
    const provider = getProvider(env.provider, env.apiKey, env.model);
    const description = schemaDescription();
    let repairHint;
    let lastError;
    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
        const user = buildUserPrompt({
            trip: parsed,
            planCount,
            schemaDescription: description,
            repairHint,
        });
        const raw = await provider.generate({
            system: SYSTEM_PROMPT,
            user,
            schema: tripPlansJsonSchema,
        });
        const result = tripPlansSchema.safeParse(raw);
        if (result.success) {
            return clampPlans(result.data, planCount);
        }
        lastError = new Error(`Invalid itinerary JSON from ${provider.name}: ${formatZodError(result.error)}`);
        repairHint = formatZodError(result.error);
    }
    throw lastError ?? new Error("Failed to generate a valid itinerary.");
}
//# sourceMappingURL=generate.js.map