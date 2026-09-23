import { type TripInput } from "./schema/input.js";
import { type TripPlans } from "./schema/output.js";
/**
 * Validates trip input, calls the configured AI provider, and returns
 * structured itinerary plans. Retries once if the model JSON fails Zod validation.
 */
export declare function generateItinerary(input: TripInput): Promise<TripPlans>;
//# sourceMappingURL=generate.d.ts.map