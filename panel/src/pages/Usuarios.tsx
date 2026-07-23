import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { Navigate } from 'react-router';
import {
  Loader2, UserPlus, Trash2, KeyRound, RefreshCw, Check, ShieldCheck, User as UserIcon,
} from 'lucide-react';
import { api, type AdminUserFull, type AdminRole } from '../lib/api';
import { useAuth } from '../store/AuthContext';

const inputCls =
  'w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20';

// Genera una contraseña aleatoria robusta (para entregar al nuevo usuario).
function genPassword(): string {
  const sets = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';
  const arr = new Uint32Array(14);
  crypto.getRandomValues(arr);
  return Array.from(arr, (n) => sets[n % sets.length]).join('');
}

function fmtDate(iso: string | null): string {
  if (!iso) return '—';
  const d = new Date(iso.replace(' ', 'T'));
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function Usuarios() {
  const { user: me } = useAuth();
  const [users, setUsers] = useState<AdminUserFull[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Alta de usuario.
  const [cEmail, setCEmail] = useState('');
  const [cName, setCName] = useState('');
  const [cRole, setCRole] = useState<AdminRole>('admin');
  const [cPass, setCPass] = useState('');
  const [creating, setCreating] = useState(false);
  const [created, setCreated] = useState<string | null>(null);

  // Acciones por fila.
  const [actingId, setActingId] = useState<number | null>(null);
  const [resetId, setResetId] = useState<number | null>(null);
  const [resetValue, setResetValue] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.users.list();
      setUsers(res.users);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudieron cargar los usuarios');
    } finally {
      setLoading(false);
    }
  }, []);

  // Solo carga si es super_admin (evita un GET innecesario a users.php si un admin
  // normal llega a la ruta antes de ser redirigido).
  useEffect(() => { if (me?.role === 'super_admin') load(); }, [load, me]);

  // Solo super_admin entra aquí (el backend también lo fuerza con 403).
  if (me && me.role !== 'super_admin') return <Navigate to="/" replace />;

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setCreated(null);
    if (cPass.length < 8) { setError('La contraseña debe tener al menos 8 caracteres.'); return; }
    setCreating(true);
    try {
      await api.users.create({ email: cEmail.trim(), name: cName.trim(), role: cRole, password: cPass });
      setCreated(`Usuario ${cEmail.trim()} creado. Contraseña: ${cPass}`);
      setCEmail(''); setCName(''); setCRole('admin'); setCPass('');
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo crear el usuario');
    } finally {
      setCreating(false);
    }
  };

  const runAction = async (id: number, fn: () => Promise<unknown>): Promise<boolean> => {
    setActingId(id);
    setError(null);
    try {
      await fn();
      await load();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo completar la acción');
      return false;
    } finally {
      setActingId(null);
    }
  };

  const changeRole = (u: AdminUserFull, role: AdminRole) =>
    runAction(u.id, () => api.users.update(u.id, { role }));

  const toggleActive = (u: AdminUserFull) =>
    runAction(u.id, () => api.users.update(u.id, { active: u.active !== 1 }));

  const doReset = async (u: AdminUserFull) => {
    if (resetValue.length < 8) { setError('La contraseña debe tener al menos 8 caracteres.'); return; }
    const ok = await runAction(u.id, () => api.users.update(u.id, { new_password: resetValue }));
    // Solo cerrar/limpiar si de verdad se guardó (antes se cerraba aunque fallara).
    if (ok) { setResetId(null); setResetValue(''); }
  };

  const doDelete = (u: AdminUserFull) => {
    if (!window.confirm(`¿Eliminar al usuario ${u.email}? Esta acción no se puede deshacer.`)) return;
    runAction(u.id, () => api.users.remove(u.id));
  };

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-extrabold tracking-tight">Usuarios</h1>
      <p className="mt-1 text-neutral-500">
        Da acceso al panel a otras personas y gestiona sus permisos. Solo el super administrador
        puede crear usuarios y cambiar roles.
      </p>

      {error && (
        <div className="mt-4 rounded-lg border-l-4 border-red-500 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>
      )}

      {/* Alta de usuario */}
      <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand/15 text-brand">
            <UserPlus className="h-5 w-5" />
          </span>
          <h2 className="font-bold">Añadir usuario</h2>
        </div>

        {created && (
          <div className="mb-4 rounded-lg border-l-4 border-emerald-500 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            <div className="flex items-center gap-2 font-semibold"><Check className="h-4 w-4" /> Usuario creado</div>
            <p className="mt-1 break-all">{created}</p>
            <p className="mt-1 text-xs text-emerald-600">Copia la contraseña y entrégasela; no se volverá a mostrar.</p>
          </div>
        )}

        <form onSubmit={handleCreate} className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-semibold">Email</label>
            <input type="email" value={cEmail} onChange={(e) => setCEmail(e.target.value)} className={inputCls} required />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold">Nombre</label>
            <input type="text" value={cName} onChange={(e) => setCName(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold">Rol</label>
            <select value={cRole} onChange={(e) => setCRole(e.target.value as AdminRole)} className={inputCls}>
              <option value="admin">Administrador</option>
              <option value="super_admin">Super administrador</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold">Contraseña</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={cPass}
                onChange={(e) => setCPass(e.target.value)}
                className={inputCls}
                placeholder="mín. 8 caracteres"
                required
              />
              <button
                type="button"
                onClick={() => setCPass(genPassword())}
                title="Generar contraseña"
                className="shrink-0 rounded-lg border border-neutral-300 px-3 text-neutral-600 hover:bg-neutral-100"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={creating}
              className="flex items-center justify-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-bold text-brand-ink transition-colors hover:bg-brand-dark disabled:opacity-60"
            >
              {creating && <Loader2 className="h-4 w-4 animate-spin" />}
              Crear usuario
            </button>
          </div>
        </form>
      </div>

      {/* Lista de usuarios */}
      {loading ? (
        <div className="mt-10 flex justify-center"><Loader2 className="h-6 w-6 animate-spin text-brand" /></div>
      ) : (
        <div className="mt-6 space-y-3">
          {users.map((u) => {
            const isSelf = me?.id === u.id;
            const busy = actingId === u.id;
            return (
              <div key={u.id} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${u.role === 'super_admin' ? 'bg-brand/15 text-brand' : 'bg-neutral-100 text-neutral-500'}`}>
                        {u.role === 'super_admin' ? <ShieldCheck className="h-4.5 w-4.5" /> : <UserIcon className="h-4.5 w-4.5" />}
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="truncate font-bold">{u.name || u.email}</h3>
                          {isSelf && <span className="rounded bg-brand/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-brand-dark">Tú</span>}
                          {u.active !== 1 && <span className="rounded bg-neutral-200 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-neutral-500">Inactivo</span>}
                        </div>
                        {u.name && <p className="truncate text-sm text-neutral-500">{u.email}</p>}
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-neutral-400">
                      Último acceso: {fmtDate(u.last_login)} · Creado: {fmtDate(u.created_at)}
                    </p>
                  </div>
                  {busy && <Loader2 className="h-5 w-5 animate-spin text-brand" />}
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-neutral-100 pt-3">
                  <select
                    value={u.role}
                    disabled={busy || isSelf}
                    onChange={(e) => changeRole(u, e.target.value as AdminRole)}
                    title={isSelf ? 'No puedes cambiar tu propio rol' : 'Cambiar rol'}
                    className="rounded-md border border-neutral-200 px-2.5 py-1.5 text-xs font-medium text-neutral-700 disabled:opacity-50"
                  >
                    <option value="admin">Administrador</option>
                    <option value="super_admin">Super administrador</option>
                  </select>

                  <button
                    disabled={busy || isSelf}
                    onClick={() => toggleActive(u)}
                    className="rounded-md border border-neutral-200 bg-white px-2.5 py-1.5 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-100 disabled:opacity-50"
                  >
                    {u.active === 1 ? 'Desactivar' : 'Activar'}
                  </button>

                  <button
                    disabled={busy}
                    onClick={() => { setResetId(resetId === u.id ? null : u.id); setResetValue(''); }}
                    className="inline-flex items-center gap-1 rounded-md border border-neutral-200 bg-white px-2.5 py-1.5 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-100 disabled:opacity-50"
                  >
                    <KeyRound className="h-3.5 w-3.5" /> Restablecer contraseña
                  </button>

                  {!isSelf && (
                    <button
                      disabled={busy}
                      onClick={() => doDelete(u)}
                      className="ml-auto inline-flex items-center gap-1 rounded-md border border-red-200 bg-white px-2.5 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Eliminar
                    </button>
                  )}
                </div>

                {resetId === u.id && (
                  <div className="mt-3 flex flex-wrap items-center gap-2 rounded-lg bg-neutral-50 p-3">
                    <input
                      type="text"
                      value={resetValue}
                      onChange={(e) => setResetValue(e.target.value)}
                      placeholder="Nueva contraseña (mín. 8)"
                      className="min-w-0 flex-1 rounded-md border border-neutral-300 px-2.5 py-1.5 text-sm outline-none focus:border-brand"
                    />
                    <button
                      type="button"
                      onClick={() => setResetValue(genPassword())}
                      title="Generar"
                      className="rounded-md border border-neutral-300 px-2.5 py-1.5 text-neutral-600 hover:bg-neutral-100"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => doReset(u)}
                      className="rounded-md bg-brand px-3 py-1.5 text-sm font-bold text-brand-ink hover:bg-brand-dark disabled:opacity-60"
                    >
                      Guardar
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
