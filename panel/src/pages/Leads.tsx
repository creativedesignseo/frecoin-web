import { useEffect, useState, useCallback } from 'react';
import { Loader2, Mail, Phone, Inbox } from 'lucide-react';
import { api, type Lead, type LeadCounts, type LeadStatus } from '../lib/api';

const STATUS_META: Record<LeadStatus, { label: string; cls: string }> = {
  new:     { label: 'Nuevo',      cls: 'bg-brand/15 text-brand-dark' },
  read:    { label: 'Leído',      cls: 'bg-blue-100 text-blue-700' },
  handled: { label: 'Gestionado', cls: 'bg-emerald-100 text-emerald-700' },
  spam:    { label: 'Spam',       cls: 'bg-neutral-200 text-neutral-600' },
};

const FILTERS: { key: LeadStatus | 'all'; label: string }[] = [
  { key: 'all', label: 'Todos' },
  { key: 'new', label: 'Nuevos' },
  { key: 'read', label: 'Leídos' },
  { key: 'handled', label: 'Gestionados' },
  { key: 'spam', label: 'Spam' },
];

function fmtDate(iso: string): string {
  const d = new Date(iso.replace(' ', 'T'));
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }) +
    ' · ' + d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
}

export default function Leads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [counts, setCounts] = useState<LeadCounts | null>(null);
  const [filter, setFilter] = useState<LeadStatus | 'all'>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<number | null>(null);

  const load = useCallback(async (f: LeadStatus | 'all') => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.leads.list(f === 'all' ? undefined : f);
      setLeads(res.leads);
      setCounts(res.counts);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudieron cargar los leads');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(filter); }, [filter, load]);

  const changeStatus = async (id: number, status: LeadStatus) => {
    setSavingId(id);
    try {
      await api.leads.updateStatus(id, status);
      // Refresca contadores y respeta el filtro activo.
      await load(filter);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudo actualizar');
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-2xl font-extrabold tracking-tight">Mensajes de contacto</h1>
      <p className="mt-1 text-neutral-500">Solicitudes que llegan desde el formulario de la web.</p>

      {/* Filtros */}
      <div className="mt-6 flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const active = filter === f.key;
          const n = f.key === 'all' ? counts?.total : counts?.[f.key];
          return (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                active ? 'bg-brand-ink text-white' : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
              }`}
            >
              {f.label}{typeof n === 'number' ? ` (${n})` : ''}
            </button>
          );
        })}
      </div>

      {error && (
        <div className="mt-4 rounded-lg border-l-4 border-red-500 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>
      )}

      {loading ? (
        <div className="mt-10 flex justify-center"><Loader2 className="h-6 w-6 animate-spin text-brand" /></div>
      ) : leads.length === 0 ? (
        <div className="mt-10 flex flex-col items-center gap-2 rounded-2xl border border-dashed border-neutral-300 py-16 text-neutral-400">
          <Inbox className="h-8 w-8" />
          <p>No hay mensajes en esta vista.</p>
        </div>
      ) : (
        <div className="mt-5 space-y-3">
          {leads.map((lead) => (
            <div key={lead.id} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">{lead.name || '(sin nombre)'}</h3>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${STATUS_META[lead.status].cls}`}>
                      {STATUS_META[lead.status].label}
                    </span>
                  </div>
                  {lead.service && <p className="mt-0.5 text-sm font-medium text-brand-dark">{lead.service}</p>}
                </div>
                <span className="text-xs text-neutral-400">{fmtDate(lead.created_at)}</span>
              </div>

              {lead.message && <p className="mt-3 text-sm text-neutral-700">{lead.message}</p>}

              <div className="mt-3 flex flex-wrap gap-4 text-sm text-neutral-500">
                {lead.email && (
                  <a href={`mailto:${lead.email}`} className="inline-flex items-center gap-1.5 hover:text-brand-dark">
                    <Mail className="h-4 w-4" /> {lead.email}
                  </a>
                )}
                {lead.phone && (
                  <a href={`tel:${lead.phone}`} className="inline-flex items-center gap-1.5 hover:text-brand-dark">
                    <Phone className="h-4 w-4" /> {lead.phone}
                  </a>
                )}
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-neutral-100 pt-3">
                <span className="text-xs text-neutral-400">Marcar como:</span>
                {(['new', 'read', 'handled', 'spam'] as LeadStatus[]).map((s) => (
                  <button
                    key={s}
                    disabled={savingId === lead.id || lead.status === s}
                    onClick={() => changeStatus(lead.id, s)}
                    className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors disabled:opacity-40 ${
                      lead.status === s ? 'bg-neutral-100 text-neutral-400' : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
                    }`}
                  >
                    {STATUS_META[s].label}
                  </button>
                ))}
                {savingId === lead.id && <Loader2 className="h-4 w-4 animate-spin text-brand" />}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
