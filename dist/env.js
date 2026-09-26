export const PLAN_TRIP_PROVIDERS = ["openai", "anthropic", "gemini"];
function isProviderName(value) {
    return PLAN_TRIP_PROVIDERS.includes(value);
}
export function readPlanTripEnv(env = process.env) {
    const providerRaw = env.PLAN_TRIP_PROVIDER?.trim();
    if (!providerRaw) {
        throw new Error("Missing PLAN_TRIP_PROVIDER. Set it to openai, anthropic, or gemini.");
    }
    if (!isProviderName(providerRaw)) {
        throw new Error(`Unknown PLAN_TRIP_PROVIDER "${providerRaw}". Use openai, anthropic, or gemini.`);
    }
    const apiKey = env.PLAN_TRIP_API_KEY?.trim();
    if (!apiKey) {
        throw new Error("Missing PLAN_TRIP_API_KEY.");
    }
    const maxPlansRaw = env.PLAN_TRIP_MAX_PLANS?.trim();
    let maxPlans = 3;
    if (maxPlansRaw) {
        const parsed = Number(maxPlansRaw);
        if (!Number.isInteger(parsed) || parsed < 1) {
            throw new Error(`Invalid PLAN_TRIP_MAX_PLANS "${maxPlansRaw}". Use a positive integer.`);
        }
        maxPlans = parsed;
    }
    const model = env.PLAN_TRIP_MODEL?.trim() || undefined;
    const openaiBaseUrl = env.PLAN_TRIP_OPENAI_BASE_URL?.trim().replace(/\/$/, "") || undefined;
    return {
        provider: providerRaw,
        apiKey,
        maxPlans,
        model,
        openaiBaseUrl,
    };
}
//# sourceMappingURL=env.js.map