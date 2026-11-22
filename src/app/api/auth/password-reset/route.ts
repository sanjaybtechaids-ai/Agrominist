import { z } from 'zod';
import { handleApiError, ok, parseJson } from '@/lib/api';
import { requestJson } from '@/lib/supabase';

const schema = z.object({ email: z.string().email() });

export async function POST(request: Request) {
  try {
    const { email } = await parseJson(request, schema);
    const redirectTo = new URL('/', request.url).toString();
    await requestJson('/auth/v1/recover', {
      method: 'POST',
      body: JSON.stringify({ email, redirect_to: redirectTo }),
    });
    // Keep the response non-enumerating even if the provider does not disclose account status.
    return ok({ requested: true });
  } catch (error) {
    return handleApiError(error);
  }
}
