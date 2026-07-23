import { useEffect, useRef, useState } from 'react';
import { Loader2, Check, Upload, ImageOff } from 'lucide-react';
import { api, type ContentItem } from '../lib/api';
import { cropToRatioWebp, compressImage } from '../lib/imageUtils';

const SECTION_LABELS: Record<string, string> = {
  work: 'Trabajos realizados',
  hero: 'Cabecera (Hero)',
  about: 'Sobre nosotros',
  numbers: 'Números',
  contacto: 'Contacto',
};
const SECTION_HINT: Record<string, string> = {
  work: 'Las 4 fotos se recortan automáticamente al formato vertical del hueco (3:4) y se optimizan al subirlas.',
};
const SECTION_ORDER = ['work', 'hero', 'about', 'numbers', 'contacto'];

// Ratio de recorte centrado para imágenes, por sección/clave. null = solo comprimir.
function cropRatio(section: string, key: string): [number, number] | null {
  if (section === 'work') return [3, 4];
  if (section === 'about' && key === 'avatar') return [1, 1];
  return null;
}

const inputCls = 'w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20';

export default function Contenido() {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [values, setValues] = useState<Record<string, string>>({});
  const [dirty, setDirty] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  const keyOf = (i: { section: string; content_key: string }) => `${i.section}.${i.content_key}`;

  const load = async () => {
    setLoading(true); setError(null);
    try {
      const res = await api.content.list();
      setItems(res.items);
      const v: Record<string, string> = {};
      res.items.forEach((i) => { v[keyOf(i)] = i.value ?? ''; });
      setValues(v);
      setDirty(new Set());
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudo cargar el contenido');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { load(); }, []);

  const setVal = (k: string, val: string) => {
    setValues((p) => ({ ...p, [k]: val }));
    setDirty((p) => new Set(p).add(k));
    setOk(false);
  };

  const save = async () => {
    setSaving(true); setError(null);
    try {
      const payload = items
        .filter((i) => dirty.has(keyOf(i)))
        .map((i) => ({ section: i.section, content_key: i.content_key, value: values[keyOf(i)] ?? '' }));
      if (payload.length) await api.content.save(payload);
      setDirty(new Set());
      setOk(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudo guardar');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="mt-10 flex justify-center"><Loader2 className="h-6 w-6 animate-spin text-brand" /></div>;

  const sections = [...new Set(items.map((i) => i.section))]
    .filter((s) => s !== 'work') // La galería "Trabajos realizados" tiene su propia página (multi-foto por área).
    .sort((a, b) => (SECTION_ORDER.indexOf(a) + 1 || 99) - (SECTION_ORDER.indexOf(b) + 1 || 99));

  return (
    <div className="mx-auto max-w-3xl pb-24">
      <h1 className="text-2xl font-extrabold tracking-tight">Contenido de la web</h1>
      <p className="mt-1 text-neutral-500">Edita textos e imágenes de las distintas secciones.</p>

      {error && <div className="mt-4 rounded-lg border-l-4 border-red-500 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}

      <div className="mt-6 space-y-6">
        {sections.map((section) => (
          <div key={section} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold">{SECTION_LABELS[section] ?? section}</h2>
            {SECTION_HINT[section] && <p className="mt-1 text-sm text-neutral-500">{SECTION_HINT[section]}</p>}
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {items.filter((i) => i.section === section).map((i) => {
                const k = keyOf(i);
                if (i.value_type === 'image') {
                  return <ImageContentField key={k} label={i.label} url={values[k] || ''} ratio={cropRatio(i.section, i.content_key)} folder={i.section} onUrl={(u) => setVal(k, u)} />;
                }
                return (
                  <div key={k} className={i.value_type === 'textarea' ? 'sm:col-span-2' : ''}>
                    <label className="mb-1 block text-sm font-semibold">{i.label}</label>
                    {i.value_type === 'textarea'
                      ? <textarea rows={3} className={inputCls} value={values[k] ?? ''} onChange={(e) => setVal(k, e.target.value)} />
                      : <input type={i.value_type === 'number' ? 'number' : 'text'} className={inputCls} value={values[k] ?? ''} onChange={(e) => setVal(k, e.target.value)} />}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Barra de guardado fija */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-neutral-200 bg-white/95 px-4 py-3 backdrop-blur md:left-64">
        <div className="mx-auto flex max-w-3xl items-center justify-end gap-3">
          {ok && <span className="text-sm text-emerald-600">Guardado ✓</span>}
          {dirty.size > 0 && <span className="text-sm text-neutral-500">{dirty.size} cambio(s) sin guardar</span>}
          <button onClick={save} disabled={saving || dirty.size === 0}
            className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-bold text-brand-ink hover:bg-brand-dark disabled:opacity-50">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />} Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
}

function ImageContentField({ label, url, ratio, folder, onUrl }: {
  label: string; url: string; ratio: [number, number] | null; folder: string; onUrl: (u: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handle = async (file: File) => {
    setUploading(true); setErr(null);
    try {
      const b64 = ratio ? await cropToRatioWebp(file, ratio[0], ratio[1]) : await compressImage(file);
      const { url: newUrl } = await api.uploadImage(b64, folder);
      onUrl(newUrl);
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Error al subir');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="mb-1 block text-sm font-semibold">{label}</label>
      <div className="overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50">
        <div className={ratio ? '' : 'flex h-32 items-center justify-center'} style={ratio ? { aspectRatio: `${ratio[0]} / ${ratio[1]}`, maxHeight: 200 } : undefined}>
          {url
            ? <img src={url} alt={label} className="h-full w-full object-cover" />
            : <div className="flex h-full w-full items-center justify-center text-neutral-300"><ImageOff className="h-6 w-6" /></div>}
        </div>
        <div className="p-2">
          <input ref={inputRef} type="file" accept="image/*" className="hidden"
            onChange={(e) => e.target.files?.[0] && handle(e.target.files[0])} />
          <button type="button" onClick={() => inputRef.current?.click()} disabled={uploading}
            className="inline-flex items-center gap-1.5 rounded-md border border-neutral-300 px-2.5 py-1.5 text-xs font-medium hover:bg-neutral-100 disabled:opacity-50">
            {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
            {uploading ? 'Subiendo…' : 'Cambiar imagen'}
          </button>
          {ratio && <span className="ml-2 text-xs text-neutral-400">Se recorta a {ratio[0]}:{ratio[1]}</span>}
        </div>
      </div>
      {err && <p className="mt-1 text-xs text-red-600">{err}</p>}
    </div>
  );
}
