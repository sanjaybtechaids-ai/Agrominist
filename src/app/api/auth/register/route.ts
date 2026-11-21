import { z } from 'zod';
import { handleApiError, ok, parseJson } from '@/lib/api';
import { requestJson } from '@/lib/supabase';

const schema = z.object({ fullName: z.string().trim().min(2).max(120), email: z.string().email(), password: z.string().min(12).max(128), role: z.enum(['FARMER', 'CUSTOMER']), preferredLanguage: z.enum(['en', 'ta', 'hi', 'te', 'kn', 'ml']).default('en') });
export async function POST(request: Request) {
  try {
    const body = await parseJson(request, schema);
    const result = await requestJson('/auth/v1/signup', { method: 'POST', body: JSON.stringify({ email: body.email, password: body.password, data: { full_name: body.fullName, role: body.role, preferred_language: body.preferredLanguage } }) });
    return ok(result, 201);
  } catch (error) { return handleApiError(error); }
}
