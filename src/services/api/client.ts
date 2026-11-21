const SESSION_KEY = 'agronomist-session-token';

export function getSessionToken() { return typeof window === 'undefined' ? null : localStorage.getItem(SESSION_KEY); }
export function setSessionToken(token: string) { localStorage.setItem(SESSION_KEY, token); }
export function clearSessionToken() { localStorage.removeItem(SESSION_KEY); }

export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = getSessionToken();
  const response = await fetch(path, { ...init, headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(init.headers ?? {}) } });
  const body = await response.json();
  if (!response.ok) throw new Error(body?.error?.message ?? 'Request failed');
  return body.data as T;
}
