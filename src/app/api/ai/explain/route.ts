import { z } from 'zod';
import { fail, handleApiError, ok, parseJson } from '@/lib/api';
import { explainVerifiedFacts } from '@/lib/gemini';
import { requireRole } from '@/lib/supabase';

const schema = z.object({
  facts: z.array(z.string().trim().min(1).max(800)).min(1).max(12),
  language: z.enum(['en', 'ta', 'hi', 'te', 'kn', 'ml']).default('en'),
});

export async function POST(request: Request) {
  try {
    await requireRole(request, 'FARMER', 'ADMIN');
    const { facts, language } = await parseJson(request, schema);
    const result = await explainVerifiedFacts(facts, language ?? 'en');
    return ok({ ...result, status: 'AI_EXPLANATION', source: 'Gemini; explanation of supplied verified facts only' });
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('Gemini')) {
      return fail('AI_PROVIDER_ERROR', 'The explanation service is currently unavailable.', 502);
    }
    return handleApiError(error);
  }
}
