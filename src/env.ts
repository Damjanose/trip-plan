export const PLAN_TRIP_PROVIDERS = ["openai", "anthropic", "gemini"] as const;

export type PlanTripProviderName = (typeof PLAN_TRIP_PROVIDERS)[number];

export type PlanTripEnv = {
  provider: PlanTripProviderName;
  apiKey: string;
  maxPlans: number;
  /** Optional model override for the selected provider. */
  model?: string;
  /**
   * OpenAI-compatible API root (no trailing slash), e.g. https://api.z.ai/api/paas/v4.
   * Requests go to `${openaiBaseUrl}/chat/completions`.
   */
  openaiBaseUrl?: string;
};

function isProviderName(value: string): value is PlanTripProviderName {
  return (PLAN_TRIP_PROVIDERS as readonly string[]).includes(value);
}

export function readPlanTripEnv(
  env: Record<string, string | undefined> = process.env,
): PlanTripEnv {
  const providerRaw = env.PLAN_TRIP_PROVIDER?.trim();
  if (!providerRaw) {
    throw new Error(
      "Missing PLAN_TRIP_PROVIDER. Set it to openai, anthropic, or gemini.",
    );
  }
  if (!isProviderName(providerRaw)) {
    throw new Error(
      `Unknown PLAN_TRIP_PROVIDER "${providerRaw}". Use openai, anthropic, or gemini.`,
    );
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
      throw new Error(
        `Invalid PLAN_TRIP_MAX_PLANS "${maxPlansRaw}". Use a positive integer.`,
      );
    }
    maxPlans = parsed;
  }

  const model = env.PLAN_TRIP_MODEL?.trim() || undefined;
  const openaiBaseUrl =
    env.PLAN_TRIP_OPENAI_BASE_URL?.trim().replace(/\/$/, "") || undefined;

  return {
    provider: providerRaw,
    apiKey,
    maxPlans,
    model,
    openaiBaseUrl,
  };
}
