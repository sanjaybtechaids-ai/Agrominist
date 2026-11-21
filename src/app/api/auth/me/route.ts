import { handleApiError, ok } from '@/lib/api';
import { profileFor } from '@/lib/supabase';
export async function GET(request: Request) { try { const { user, profile } = await profileFor(request); return ok({ user: { id: user.id, email: user.email }, profile }); } catch (error) { return handleApiError(error); } }
