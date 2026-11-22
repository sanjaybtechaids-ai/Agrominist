import { SupabaseConfigError } from '@/lib/api';

type GeminiResponse = {
  candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
};

function configuration() {
  const key = process.env.AI_API_KEY;
  const provider = process.env.AI_PROVIDER ?? 'gemini';
  if (!key || provider !== 'gemini') {
    throw new SupabaseConfigError('Gemini is not configured. Set AI_PROVIDER=gemini and AI_API_KEY server-side.');
  }
  return { key, model: process.env.GEMINI_MODEL ?? 'gemini-flash-latest' };
}

export async function explainVerifiedFacts(facts: string[], language: string) {
  const { key, model } = configuration();
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: `You are Agronomist's explanation assistant. Reply in ${language}. Explain only the verified facts supplied by the application in plain, concise language. Do not add agricultural, fertilizer, pesticide, weather, yield, profit, or market-price facts. Do not turn missing data into advice. If the supplied facts are insufficient, say what information is unavailable and recommend consulting a qualified local agricultural extension officer where appropriate.` }],
      },
      contents: [{ role: 'user', parts: [{ text: `Verified application facts:\n${facts.map((fact) => `- ${fact}`).join('\n')}\n\nExplain these facts for the farmer.` }] }],
      generationConfig: { temperature: 0.2, maxOutputTokens: 500 },
    }),
    signal: AbortSignal.timeout(12_000),
  });
  if (!response.ok) throw new Error('Gemini could not generate an explanation.');
  const data = await response.json() as GeminiResponse;
  const text = data.candidates?.[0]?.content?.parts?.map((part) => part.text ?? '').join('').trim();
  if (!text) throw new Error('Gemini returned no explanation.');
  return { text, model };
}
