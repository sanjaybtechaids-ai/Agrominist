import { z } from 'zod';
import { handleApiError, ok, parseJson } from '@/lib/api';
import { requestJson } from '@/lib/supabase';

const schema = z.object({ email: z.string().email() });

export async function POST(request: Request) {
  try {
    const { email } = await parseJson(request, schema);
    await requestJson('/auth/v1/resend', {
      method: 'POST',
      body: JSON.stringify({ type: 'signup', email }),
    });
    return ok({ requested: true });
  } catch (error) {
    return handleApiError(error);
  }
}
