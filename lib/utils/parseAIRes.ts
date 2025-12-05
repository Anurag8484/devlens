export function safeParseAI(jsonString: string) {
  let cleaned = jsonString.trim();
  cleaned = cleaned.replace(/```json|```/g, "").trim();
  return JSON.parse(cleaned);
}
