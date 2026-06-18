import { useState, type FormEvent } from 'react';
import { Loader2, KeyRound, Check } from 'lucide-react';
import { api } from '../lib/api';
import { useAuth } from '../store/AuthContext';

const inputCls =
  'w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20';

export default function MiCuenta() {
  const { user } = useAuth();
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setDone(false);
    if (next.length < 8) {
      setError('La nueva contraseña debe tener al menos 8 caracteres.');
      return;
    }
    if (next !== confirm) {
      setError('La nueva contraseña y su confirmación no coinciden.');
      return;
    }
    setBusy(true);
    try {
      await api.account.changePassword(current, next);
      setDone(true);
      setCurrent('');
      setNext('');
      setConfirm('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo cambiar la contraseña.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-2xl font-extrabold tracking-tight">Mi cuenta</h1>
      <p className="mt-1 text-neutral-500">
        {user?.email} · {user?.role === 'super_admin' ? 'Super administrador' : 'Administrador'}
      </p>

      <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand/15 text-brand">
            <KeyRound className="h-5 w-5" />
          </span>
          <h2 className="font-bold">Cambiar contraseña</h2>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border-l-4 border-red-500 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}
        {done && (
          <div className="mb-4 flex items-center gap-2 rounded-lg border-l-4 border-emerald-500 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            <Check className="h-4 w-4" /> Contraseña actualizada correctamente.
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          {/* Campo oculto de usuario para que los gestores de contraseñas asocien la cuenta. */}
          <input type="text" autoComplete="username" value={user?.email ?? ''} readOnly hidden />
          <div>
            <label className="mb-1 block text-sm font-semibold">Contraseña actual</label>
            <input
              type="password"
              autoComplete="current-password"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              className={inputCls}
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold">Nueva contraseña</label>
            <input
              type="password"
              autoComplete="new-password"
              value={next}
              onChange={(e) => setNext(e.target.value)}
              className={inputCls}
              required
            />
            <p className="mt-1 text-xs text-neutral-400">Mínimo 8 caracteres.</p>
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold">Repetir nueva contraseña</label>
            <input
              type="password"
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className={inputCls}
              required
            />
          </div>
          <button
            type="submit"
            disabled={busy}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand py-2.5 text-sm font-bold text-brand-ink transition-colors hover:bg-brand-dark disabled:opacity-60"
          >
            {busy && <Loader2 className="h-4 w-4 animate-spin" />}
            Guardar contraseña
          </button>
        </form>
      </div>
    </div>
  );
}
