// Cliente de la API PHP del panel. Same-origin (frecoin.es/panel → frecoin.es/admin/api),
// así que usamos cookie de sesión (credentials:'include') + token CSRF en escrituras.

const API_BASE = '/admin/api';

let csrfToken: string | null = null;
export function setCsrf(token: string | null) { csrfToken = token; }

export type AdminRole = 'super_admin' | 'admin';

export interface AdminUser {
  id: number;
  email: string;
  role: AdminRole;
  name: string | null;
}

// Vista completa para la gestión de usuarios (solo super_admin).
export interface AdminUserFull {
  id: number;
  email: string;
  name: string | null;
  role: AdminRole;
  active: number;
  last_login: string | null;
  created_at: string;
}

export type LeadStatus = 'new' | 'read' | 'handled' | 'spam';

export interface Lead {
  id: number;
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string | null;
  source: string;
  status: LeadStatus;
  created_at: string;
}

export interface LeadCounts {
  new: number;
  read: number;
  handled: number;
  spam: number;
  total: number;
}

export interface Service {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  meta_title: string;
  meta_description: string;
  hero_h1: string;
  hero_paragraph: string;
  hero_image: string;
  hero_image_alt: string;
  benefits_image: string;
  benefits_image_alt: string;
  price: string | null;
  price_unit: string;
  price_note: string;
  active: number;
  sort_order: number;
}

export type ServiceUpdate = Partial<
  Pick<Service, 'name' | 'tagline' | 'meta_title' | 'meta_description' | 'hero_h1' | 'hero_paragraph' | 'hero_image' | 'hero_image_alt' | 'benefits_image' | 'benefits_image_alt' | 'price_unit' | 'price_note'>
> & { price?: number | null; active?: boolean };

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

  leads: {
    list: (status?: LeadStatus) =>
      request<{ leads: Lead[]; counts: LeadCounts }>(
        `/leads.php${status ? `?status=${status}` : ''}`
      ),
    updateStatus: (id: number, status: LeadStatus) =>
      request<{ ok: boolean }>(`/leads.php?id=${id}`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
      }),
  },

  services: {
    list: () => request<{ services: Service[] }>('/services.php'),
    update: (id: number, data: ServiceUpdate) =>
      request<{ ok: boolean; service: Service }>(`/services.php?id=${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
  },

  uploadImage: (imageBase64: string, folder = 'services') =>
    request<{ url: string; publicId: string }>('/upload.php', {
      method: 'POST',
      body: JSON.stringify({ imageBase64, folder }),
    }),

  content: {
    list: (section?: string) =>
      request<{ items: ContentItem[] }>(`/content.php${section ? `?section=${section}` : ''}`),
    save: (items: { section: string; content_key: string; value: string }[]) =>
      request<{ ok: boolean }>('/content.php', {
        method: 'PUT',
        body: JSON.stringify({ items }),
      }),
  },

  // Cuenta propia: cualquier usuario cambia su contraseña.
  account: {
    changePassword: (current_password: string, new_password: string) =>
      request<{ ok: boolean }>('/account.php', {
        method: 'PUT',
        body: JSON.stringify({ current_password, new_password }),
      }),
  },

  // Galería "Trabajos realizados": añadir/listar/editar/borrar/reordenar fotos por área.
  gallery: {
    list: () => request<{ items: GalleryItem[] }>('/gallery.php'),
    add: (area: WorkArea, image_url: string, title = '', description = '') =>
      request<{ ok: boolean; item: GalleryItem }>('/gallery.php', {
        method: 'POST',
        body: JSON.stringify({ area, image_url, title, description }),
      }),
    update: (
      id: number,
      data: { title?: string; description?: string; active?: boolean; sort_order?: number },
    ) =>
      request<{ ok: boolean; item: GalleryItem }>(`/gallery.php?id=${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    reorder: (area: WorkArea, ids: number[]) =>
      request<{ ok: boolean }>('/gallery.php?action=reorder', {
        method: 'PUT',
        body: JSON.stringify({ area, ids }),
      }),
    remove: (id: number) =>
      request<{ ok: boolean }>(`/gallery.php?id=${id}`, { method: 'DELETE' }),
  },

  // Gestión de usuarios (solo super_admin).
  users: {
    list: () => request<{ users: AdminUserFull[] }>('/users.php'),
    create: (data: { email: string; name: string; role: AdminRole; password: string }) =>
      request<{ ok: boolean; user: AdminUserFull }>('/users.php', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: (
      id: number,
      data: { name?: string; role?: AdminRole; active?: boolean; new_password?: string },
    ) =>
      request<{ ok: boolean; user: AdminUserFull }>(`/users.php?id=${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    remove: (id: number) =>
      request<{ ok: boolean }>(`/users.php?id=${id}`, { method: 'DELETE' }),
  },
};

export interface ContentItem {
  section: string;
  content_key: string;
  value_type: 'text' | 'textarea' | 'html' | 'image' | 'number';
  value: string | null;
  label: string;
  sort_order: number;
}

// Galería "Trabajos realizados": una foto por fila, agrupadas por área.
export type WorkArea = 'redes' | 'electricas' | 'camaras' | 'wifi' | 'sai' | 'controles';

export interface GalleryItem {
  id: number;
  area: WorkArea;
  image_url: string;
  title: string | null;
  description: string | null;
  active: number;
  sort_order: number;
}
