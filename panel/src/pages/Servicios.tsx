import { useEffect, useRef, useState } from 'react';
import { Loader2, Pencil, ArrowLeft, Check, Wrench, Upload, ImageOff, X } from 'lucide-react';
import { api, type Service, type ServiceUpdate } from '../lib/api';
import { compressImage } from '../lib/imageUtils';

function priceLabel(s: Service): string {
  if (s.price === null || s.price === '') return 'Sin precio';
  const n = Number(s.price);
  const amount = Number.isInteger(n) ? String(n) : n.toFixed(2);
  return `${s.price_unit ? s.price_unit + ' ' : ''}${amount} €${s.price_note ? ' ' + s.price_note : ''}`.trim();
}

export default function Servicios() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Service | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.services.list();
      setServices(res.services);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudieron cargar los servicios');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  if (loading) {
    return <div className="mt-10 flex justify-center"><Loader2 className="h-6 w-6 animate-spin text-brand" /></div>;
  }

  if (editing) {
    return <ServiceEditor service={editing} onBack={() => setEditing(null)} onSaved={() => { setEditing(null); load(); }} />;
  }

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-2xl font-extrabold tracking-tight">Servicios y precios</h1>
      <p className="mt-1 text-neutral-500">Edita los textos y el precio de cada servicio. Los cambios se publican en la web.</p>

      {error && <div className="mt-4 rounded-lg border-l-4 border-red-500 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}

      <div className="mt-6 space-y-3">
        {services.map((s) => (
          <div key={s.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/15 text-brand"><Wrench className="h-4 w-4" /></span>
                <h3 className="font-bold">{s.name}</h3>
                {s.active === 0 && <span className="rounded-full bg-neutral-200 px-2 py-0.5 text-xs text-neutral-600">Oculto</span>}
              </div>
              <p className="mt-1 text-sm text-neutral-500">{s.tagline}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className={`text-sm font-semibold ${s.price ? 'text-brand-dark' : 'text-neutral-400'}`}>{priceLabel(s)}</span>
              <button
                onClick={() => setEditing(s)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-2 text-sm font-medium hover:bg-neutral-100"
              >
                <Pencil className="h-4 w-4" /> Editar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-semibold">{label}</label>
      {children}
      {hint && <p className="mt-1 text-xs text-neutral-400">{hint}</p>}
    </div>
  );
}

const inputCls = 'w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20';

// Imágenes por defecto de cada servicio (las que muestra la web si no subes una
// propia). Deben coincidir con src/data/services.ts. Cada servicio tiene UNA imagen
// hero y UNA de beneficios — no es una galería (esa es la sección "Trabajos").
const SERVICE_DEFAULT_IMAGES: Record<string, { hero: string; benefits: string }> = {
  'redes-informaticas':       { hero: '/assets/services/redes/hero-server-rack.jpg', benefits: '/assets/services/redes/data-center.jpg' },
  'instalaciones-electricas': { hero: '/assets/services/electricas/hero.jpg',        benefits: '/assets/services/electricas/benefits.jpg' },
  'camaras-videovigilancia':  { hero: '/assets/services/camaras/hero.jpg',           benefits: '/assets/services/camaras/benefits.jpg' },
  'antenas-wifi':             { hero: '/assets/services/wifi/hero.jpg',               benefits: '/assets/services/wifi/benefits.jpg' },
  'sai':                      { hero: '/assets/services/sai/hero.webp',               benefits: '/assets/services/sai/benefits.webp' },
  'controles-de-acceso':      { hero: '/assets/services/accesos/hero.jpg',            benefits: '/assets/services/accesos/benefits.jpg' },
};

function ImageField({ label, url, defaultUrl, alt, onUrl, onAlt }: {
  label: string; url: string; defaultUrl?: string; alt: string; onUrl: (u: string) => void; onAlt: (a: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handle = async (file: File) => {
    setUploading(true); setErr(null);
    try {
      const b64 = await compressImage(file);
      const { url: newUrl } = await api.uploadImage(b64, 'services');
      onUrl(newUrl);
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Error al subir');
    } finally {
      setUploading(false);
    }
  };

  const isCustom = !!url;                 // hay imagen propia subida
  const shown = url || defaultUrl || '';  // lo que se ve: propia, o la por defecto de la web

  return (
    <div>
      <label className="mb-1 block text-sm font-semibold">{label}</label>
      <div className="overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50">
        <div className="relative">
          {shown
            ? <img src={shown} alt={alt} className="h-32 w-full object-cover" />
            : <div className="flex h-32 items-center justify-center text-neutral-300"><ImageOff className="h-6 w-6" /></div>}
        </div>
        <div className="flex flex-wrap items-center gap-2 p-2">
          <input ref={inputRef} type="file" accept="image/*" className="hidden"
            onChange={(e) => { if (e.target.files?.[0]) handle(e.target.files[0]); e.target.value = ''; }} />
          <button type="button" onClick={() => inputRef.current?.click()} disabled={uploading}
            className="inline-flex items-center gap-1.5 rounded-md border border-neutral-300 px-2.5 py-1.5 text-xs font-medium hover:bg-neutral-100 disabled:opacity-50">
            {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
            {uploading ? 'Subiendo…' : shown ? 'Reemplazar imagen' : 'Subir imagen'}
          </button>
          {isCustom && (
            <button type="button" onClick={() => onUrl('')} disabled={uploading}
              className="inline-flex items-center gap-1.5 rounded-md border border-neutral-200 px-2.5 py-1.5 text-xs font-medium text-neutral-600 hover:bg-neutral-100 disabled:opacity-50">
              <X className="h-3.5 w-3.5" /> Quitar
            </button>
          )}
        </div>
      </div>
      <input className={`${inputCls} mt-2 text-xs`} value={alt} onChange={(e) => onAlt(e.target.value)}
        placeholder="Texto alternativo (accesibilidad / SEO)" />
      {err && <p className="mt-1 text-xs text-red-600">{err}</p>}
    </div>
  );
}

function ServiceEditor({ service, onBack, onSaved }: { service: Service; onBack: () => void; onSaved: () => void }) {
  const [form, setForm] = useState({
    name: service.name,
    tagline: service.tagline,
    meta_title: service.meta_title,
    meta_description: service.meta_description,
    hero_h1: service.hero_h1,
    hero_paragraph: service.hero_paragraph,
    hero_image: service.hero_image,
    hero_image_alt: service.hero_image_alt,
    benefits_image: service.benefits_image,
    benefits_image_alt: service.benefits_image_alt,
    price: service.price ?? '',
    price_unit: service.price_unit,
    price_note: service.price_note,
    active: service.active === 1,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const set = (k: keyof typeof form, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));
  const defaults = SERVICE_DEFAULT_IMAGES[service.slug];

  const save = async () => {
    setSaving(true);
    setError(null);
    try {
      const payload: ServiceUpdate = {
        name: form.name, tagline: form.tagline,
        meta_title: form.meta_title, meta_description: form.meta_description,
        hero_h1: form.hero_h1, hero_paragraph: form.hero_paragraph,
        hero_image: form.hero_image, hero_image_alt: form.hero_image_alt,
        benefits_image: form.benefits_image, benefits_image_alt: form.benefits_image_alt,
        price_unit: form.price_unit, price_note: form.price_note,
        active: form.active,
        price: form.price === '' ? null : Number(form.price),
      };
      await api.services.update(service.id, payload);
      onSaved();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudo guardar');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <button onClick={onBack} className="mb-4 inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-800">
        <ArrowLeft className="h-4 w-4" /> Volver a servicios
      </button>
      <h1 className="text-2xl font-extrabold tracking-tight">{service.name}</h1>
      <p className="mt-1 text-sm text-neutral-400">/{service.slug}</p>

      {error && <div className="mt-4 rounded-lg border-l-4 border-red-500 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}

      <div className="mt-6 space-y-5 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <Field label="Nombre"><input className={inputCls} value={form.name} onChange={(e) => set('name', e.target.value)} /></Field>
        <Field label="Lema (tagline)"><input className={inputCls} value={form.tagline} onChange={(e) => set('tagline', e.target.value)} /></Field>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Field label="Precio (€)" hint="Vacío = sin precio">
            <input type="number" min="0" step="0.01" className={inputCls} value={form.price} onChange={(e) => set('price', e.target.value)} />
          </Field>
          <Field label="Prefijo" hint='ej. "desde"'>
            <input className={inputCls} value={form.price_unit} onChange={(e) => set('price_unit', e.target.value)} placeholder="desde" />
          </Field>
          <Field label="Nota" hint='ej. "/mes", "+ IVA"'>
            <input className={inputCls} value={form.price_note} onChange={(e) => set('price_note', e.target.value)} placeholder="+ IVA" />
          </Field>
        </div>

        <Field label="Titular (H1)"><input className={inputCls} value={form.hero_h1} onChange={(e) => set('hero_h1', e.target.value)} /></Field>
        <Field label="Párrafo de cabecera">
          <textarea rows={3} className={inputCls} value={form.hero_paragraph} onChange={(e) => set('hero_paragraph', e.target.value)} />
        </Field>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ImageField label="Imagen principal (hero)" url={form.hero_image} defaultUrl={defaults?.hero} alt={form.hero_image_alt}
            onUrl={(u) => set('hero_image', u)} onAlt={(a) => set('hero_image_alt', a)} />
          <ImageField label="Imagen de beneficios" url={form.benefits_image} defaultUrl={defaults?.benefits} alt={form.benefits_image_alt}
            onUrl={(u) => set('benefits_image', u)} onAlt={(a) => set('benefits_image_alt', a)} />
        </div>

        <div className="border-t border-neutral-100 pt-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-neutral-400">SEO</p>
          <div className="space-y-4">
            <Field label="Meta título"><input className={inputCls} value={form.meta_title} onChange={(e) => set('meta_title', e.target.value)} /></Field>
            <Field label="Meta descripción">
              <textarea rows={2} className={inputCls} value={form.meta_description} onChange={(e) => set('meta_description', e.target.value)} />
            </Field>
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.active} onChange={(e) => set('active', e.target.checked)} className="h-4 w-4 rounded border-neutral-300 text-brand focus:ring-brand" />
          Servicio visible en la web
        </label>
      </div>

      <div className="mt-5 flex gap-3">
        <button onClick={onBack} className="rounded-lg border border-neutral-300 px-5 py-2.5 text-sm font-medium hover:bg-neutral-100">Cancelar</button>
        <button onClick={save} disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-bold text-brand-ink hover:bg-brand-dark disabled:opacity-60">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />} Guardar cambios
        </button>
      </div>
    </div>
  );
}
