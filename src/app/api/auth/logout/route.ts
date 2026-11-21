import { handleApiError, ok } from '@/lib/api';
import { requestJson, tokenFromRequest } from '@/lib/supabase';
export async function POST(request: Request) { try { const token = tokenFromRequest(request); if (!token) return ok({ loggedOut: true }); await requestJson('/auth/v1/logout', { method: 'POST' }, token); return ok({ loggedOut: true }); } catch (error) { return handleApiError(error); } }
