/** Shared JSON Schema for providers that accept structured output. */
export declare const tripPlansJsonSchema: {
    readonly type: "object";
    readonly additionalProperties: false;
    readonly required: readonly ["plans"];
    readonly properties: {
        readonly plans: {
            readonly type: "array";
            readonly minItems: 1;
            readonly items: {
                readonly type: "object";
                readonly additionalProperties: false;
                readonly required: readonly ["title", "days"];
                readonly properties: {
                    readonly title: {
                        readonly type: "string";
                    };
                    readonly base: {
                        readonly type: "string";
                    };
                    readonly accommodation: {
                        readonly type: "string";
                    };
                    readonly style: {
                        readonly type: "string";
                    };
                    readonly days: {
                        readonly type: "array";
                        readonly minItems: 1;
                        readonly items: {
                            readonly type: "object";
                            readonly additionalProperties: false;
                            readonly required: readonly ["title", "blocks"];
                            readonly properties: {
                                readonly date: {
                                    readonly type: "string";
                                };
                                readonly weekday: {
                                    readonly type: "string";
                                };
                                readonly title: {
                                    readonly type: "string";
                                };
                                readonly blocks: {
                                    readonly type: "array";
                                    readonly minItems: 1;
                                    readonly items: {
                                        readonly type: "object";
                                        readonly additionalProperties: false;
                                        readonly required: readonly ["place", "kind"];
                                        readonly properties: {
                                            readonly start: {
                                                readonly type: "string";
                                            };
                                            readonly end: {
                                                readonly type: "string";
                                            };
                                            readonly place: {
                                                readonly type: "string";
                                            };
                                            readonly kind: {
                                                readonly type: "string";
                                                readonly enum: readonly ["arrival", "transfer", "visit", "meal", "rest", "return", "departure"];
                                            };
                                            readonly transport: {
                                                readonly type: "string";
                                                readonly enum: readonly ["walk", "public", "taxi", "car", "train", "bus", "ferry"];
                                            };
                                            readonly travelMinutes: {
                                                readonly type: "number";
                                                readonly minimum: 0;
                                            };
                                            readonly why: {
                                                readonly type: "string";
                                            };
                                            readonly see: {
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "string";
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
    };
};
//# sourceMappingURL=json-schema.d.ts.map