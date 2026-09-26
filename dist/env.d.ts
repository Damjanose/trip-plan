export declare const PLAN_TRIP_PROVIDERS: readonly ["openai", "anthropic", "gemini"];
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
export declare function readPlanTripEnv(env?: Record<string, string | undefined>): PlanTripEnv;
//# sourceMappingURL=env.d.ts.map