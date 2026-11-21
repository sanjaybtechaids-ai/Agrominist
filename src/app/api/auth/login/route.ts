import { z } from 'zod';
import { handleApiError, ok, parseJson } from '@/lib/api';
import { requestJson } from '@/lib/supabase';

const schema = z.object({ email: z.string().email(), password: z.string().min(8) });

export async function POST(request: Request) {
  try {
    const { email, password } = await parseJson(request, schema);
    const session = await requestJson('/auth/v1/token?grant_type=password', { method: 'POST', body: JSON.stringify({ email, password }) });
    return ok(session);
  } catch (error) { return handleApiError(error); }
}
