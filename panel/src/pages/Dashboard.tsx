import { FileText, Wrench, Inbox } from 'lucide-react';
import { useAuth } from '../store/AuthContext';

const CARDS = [
  { label: 'Leads recibidos', value: '—', icon: Inbox, note: 'Disponible en la fase de Leads' },
  { label: 'Artículos del blog', value: '—', icon: FileText, note: 'Disponible en la fase de Blog' },
  { label: 'Servicios activos', value: '—', icon: Wrench, note: 'Disponible en la fase de Servicios' },
];

export default function Dashboard() {
  const { user } = useAuth();
  const firstName = (user?.name || user?.email || '').split(' ')[0].split('@')[0];

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-2xl font-extrabold tracking-tight">Hola, {firstName} 👋</h1>
      <p className="mt-1 text-neutral-500">
        Este es tu panel de administración. Desde aquí podrás editar el blog, los servicios y
        precios, los textos e imágenes de la web, y ver los mensajes de contacto.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {CARDS.map((c) => (
          <div key={c.label} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-neutral-500">{c.label}</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand/15 text-brand">
                <c.icon className="h-5 w-5" />
              </span>
            </div>
            <div className="mt-3 text-3xl font-extrabold">{c.value}</div>
            <p className="mt-1 text-xs text-neutral-400">{c.note}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-brand/30 bg-brand/5 p-5">
        <h2 className="font-bold text-brand-ink">Plataforma en construcción</h2>
        <p className="mt-1 text-sm text-neutral-600">
          El acceso y la base ya funcionan. Las siguientes secciones (Leads, Blog, Servicios y
          Contenido) se irán activando por fases. El menú de la izquierda las muestra marcadas
          como «pronto».
        </p>
      </div>
    </div>
  );
}
