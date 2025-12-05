export function safeParseAI(input: string) {
  if (!input || typeof input !== "string") return null;

  // Step 1: Extract JSON inside ``` ``` if present
  const blockMatch = input.match(/```(?:json)?([\s\S]*?)```/);
  let candidate = blockMatch ? blockMatch[1] : input;

  // Step 2: Remove junk around JSON
  candidate = candidate.trim();

  // Step 3: Fix accidental single quotes → double quotes
  // Only when JSON is clearly invalid
  if (candidate.includes("'") && !candidate.includes('"')) {
    candidate = candidate.replace(/'/g, '"');
  }

  // Step 4: Try JSON.parse safely
  try {
    return JSON.parse(candidate);
  } catch (err) {
    console.warn("❌ JSON parse failed. Attempting fallback extraction…");

    // Step 5: Find first { ... } JSON block manually
    const braceMatch = candidate.match(/\{[\s\S]*\}/);
    if (braceMatch) {
      try {
        return JSON.parse(braceMatch[0]);
      } catch (innerErr) {}
    }

    console.error("❌ FINAL FAILURE — cannot parse AI JSON:", input);
    return null; // Fail gracefully
  }
}
