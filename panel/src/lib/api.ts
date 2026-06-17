// Cliente de la API PHP del panel. Same-origin (frecoin.es/panel → frecoin.es/admin/api),
// así que usamos cookie de sesión (credentials:'include') + token CSRF en escrituras.

const API_BASE = '/admin/api';

let csrfToken: string | null = null;
export function setCsrf(token: string | null) { csrfToken = token; }

export interface AdminUser {
  id: number;
  email: string;
  role: 'super_admin' | 'admin';
  name: string | null;
}

async function request<T>(path: string, opts: RequestInit = {}): Promise<T> {
  const method = (opts.method || 'GET').toUpperCase();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(opts.headers as Record<string, string> | undefined),
  };
  if (['POST', 'PUT', 'DELETE'].includes(method) && csrfToken) {
    headers['X-CSRF-Token'] = csrfToken;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...opts,
    method,
    headers,
    credentials: 'include',
  });

  let data: unknown = null;
  const text = await res.text();
  if (text) {
    try { data = JSON.parse(text); } catch { data = { error: text }; }
  }

  if (!res.ok) {
    const msg = (data as { error?: string } | null)?.error || `Error ${res.status}`;
    throw Object.assign(new Error(msg), { status: res.status });
  }
  return data as T;
}

export const api = {
  login: (email: string, password: string) =>
    request<{ user: AdminUser; csrf: string }>('/auth.php', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  whoami: () => request<{ user: AdminUser; csrf: string }>('/auth.php', { method: 'GET' }),

  logout: () => request<{ ok: boolean }>('/auth.php', { method: 'DELETE' }),
};
