export function extractJson(text) {
    const trimmed = text.trim();
    try {
        return JSON.parse(trimmed);
    }
    catch {
        const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
        if (fenced?.[1]) {
            return JSON.parse(fenced[1].trim());
        }
        const start = trimmed.indexOf("{");
        const end = trimmed.lastIndexOf("}");
        if (start >= 0 && end > start) {
            return JSON.parse(trimmed.slice(start, end + 1));
        }
        throw new Error("Model response did not contain valid JSON.");
    }
}
//# sourceMappingURL=types.js.map