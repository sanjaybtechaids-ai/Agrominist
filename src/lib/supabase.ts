import { SupabaseConfigError, SupabaseRequestError } from '@/lib/api';

const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, '');
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function config() {
  if (!baseUrl || !anonKey) throw new SupabaseConfigError('Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.');
  return { baseUrl, anonKey };
}

async function request<T>(path: string, init: RequestInit = {}, accessToken?: string): Promise<T> {
  const { baseUrl: url, anonKey: key } = config();
  const response = await fetch(`${url}${path}`, {
    ...init,
    headers: { apikey: key, Authorization: `Bearer ${accessToken ?? key}`, ...(init.headers ?? {}) },
    cache: 'no-store',
  });
  if (!response.ok) {
    const payload = await response.json().catch(() => null) as { message?: string; error_description?: string; code?: string } | null;
    throw new SupabaseRequestError(response.status, payload?.code ?? 'SUPABASE_ERROR', payload?.error_description ?? payload?.message ?? 'Database request failed.');
  }
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

export function tokenFromRequest(request: Request) {
  const value = request.headers.get('authorization');
  return value?.startsWith('Bearer ') ? value.slice(7) : undefined;
}

export async function currentUser(request: Request) {
  const token = tokenFromRequest(request);
  if (!token) throw new SupabaseRequestError(401, 'UNAUTHENTICATED', 'A bearer session token is required.');
  return requestJson<{ id: string; email?: string; user_metadata?: Record<string, unknown> }>('/auth/v1/user', {}, token);
}

export async function requestJson<T>(path: string, init: RequestInit = {}, token?: string) {
  return request<T>(path, { ...init, headers: { 'Content-Type': 'application/json', ...(init.headers ?? {}) } }, token);
}

export async function database<T>(path: string, init: RequestInit = {}, token?: string) {
  return request<T>(`/rest/v1/${path}`, { ...init, headers: { Accept: 'application/json', ...(init.headers ?? {}) } }, token);
}

export async function profileFor(request: Request) {
  const user = await currentUser(request);
  const token = tokenFromRequest(request)!;
  const profiles = await database<Array<{ id: string; role: 'FARMER' | 'CUSTOMER' | 'ADMIN'; full_name: string | null }>>(
    `profiles?id=eq.${encodeURIComponent(user.id)}&select=id,role,full_name`, {}, token,
  );
  const profile = profiles[0];
  if (!profile) throw new SupabaseRequestError(403, 'PROFILE_MISSING', 'Your user profile has not been initialized.');
  return { user, profile, token };
}

export async function requireRole(request: Request, ...roles: Array<'FARMER' | 'CUSTOMER' | 'ADMIN'>) {
  const context = await profileFor(request);
  if (!roles.includes(context.profile.role)) throw new SupabaseRequestError(403, 'FORBIDDEN', 'You do not have permission to perform this action.');
  return context;
}
