/** Shared JSON Schema for providers that accept structured output. */
export const tripPlansJsonSchema = {
    type: "object",
    additionalProperties: false,
    required: ["plans"],
    properties: {
        plans: {
            type: "array",
            minItems: 1,
            items: {
                type: "object",
                additionalProperties: false,
                required: ["title", "days"],
                properties: {
                    title: { type: "string" },
                    base: { type: "string" },
                    accommodation: { type: "string" },
                    style: { type: "string" },
                    days: {
                        type: "array",
                        minItems: 1,
                        items: {
                            type: "object",
                            additionalProperties: false,
                            required: ["title", "blocks"],
                            properties: {
                                date: { type: "string" },
                                weekday: { type: "string" },
                                title: { type: "string" },
                                blocks: {
                                    type: "array",
                                    minItems: 1,
                                    items: {
                                        type: "object",
                                        additionalProperties: false,
                                        required: ["place", "kind"],
                                        properties: {
                                            start: { type: "string" },
                                            end: { type: "string" },
                                            place: { type: "string" },
                                            kind: {
                                                type: "string",
                                                enum: [
                                                    "arrival",
                                                    "transfer",
                                                    "visit",
                                                    "meal",
                                                    "rest",
                                                    "return",
                                                    "departure",
                                                ],
                                            },
                                            transport: {
                                                type: "string",
                                                enum: [
                                                    "walk",
                                                    "public",
                                                    "taxi",
                                                    "car",
                                                    "train",
                                                    "bus",
                                                    "ferry",
                                                ],
                                            },
                                            travelMinutes: { type: "number", minimum: 0 },
                                            why: { type: "string" },
                                            see: {
                                                type: "array",
                                                items: { type: "string" },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};
//# sourceMappingURL=json-schema.js.map