import { useCallback, useEffect, useMemo, useState } from 'react';
import { Loader2, Upload, Trash2, ImageOff, Images } from 'lucide-react';
import { api, type GalleryItem, type WorkArea } from '../lib/api';
import { cropToRatioWebp } from '../lib/imageUtils';

const AREAS: { slug: WorkArea; label: string }[] = [
  { slug: 'redes',      label: 'Redes informáticas' },
  { slug: 'electricas', label: 'Instalaciones eléctricas' },
  { slug: 'camaras',    label: 'Cámaras / Seguridad' },
  { slug: 'wifi',       label: 'Antenas WiFi' },
  { slug: 'sai',        label: 'Sistemas SAI' },
  { slug: 'controles',  label: 'Controles de acceso' },
];

export default function Trabajos() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploadingArea, setUploadingArea] = useState<WorkArea | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.gallery.list();
      setItems(res.items);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudieron cargar las fotos');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const byArea = useMemo(() => {
    const m: Record<string, GalleryItem[]> = {};
    for (const it of items) (m[it.area] ??= []).push(it);
    return m;
  }, [items]);

  const addPhoto = async (area: WorkArea, file: File) => {
    setUploadingArea(area);
    setError(null);
    try {
      const b64 = await cropToRatioWebp(file, 3, 4);        // mismo recorte 3:4 + WebP que ya se usa
      const { url } = await api.uploadImage(b64, `work-${area}`);
      await api.gallery.add(area, url);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudo subir la foto');
    } finally {
      setUploadingArea(null);
    }
  };

  const removePhoto = async (it: GalleryItem) => {
    if (!window.confirm('¿Eliminar esta foto? No se puede deshacer.')) return;
    setBusyId(it.id);
    setError(null);
    try {
      await api.gallery.remove(it.id);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudo eliminar');
    } finally {
      setBusyId(null);
    }
  };

  const saveTitle = async (it: GalleryItem, title: string) => {
    if ((it.title ?? '') === title.trim()) return;
    setBusyId(it.id);
    try {
      await api.gallery.update(it.id, { title });
      setItems((prev) => prev.map((p) => (p.id === it.id ? { ...p, title: title.trim() || null } : p)));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudo guardar el título');
    } finally {
      setBusyId(null);
    }
  };

  if (loading) return <div className="mt-10 flex justify-center"><Loader2 className="h-6 w-6 animate-spin text-brand" /></div>;

  return (
    <div className="mx-auto max-w-4xl pb-16">
      <h1 className="text-2xl font-extrabold tracking-tight">Trabajos realizados</h1>
      <p className="mt-1 text-neutral-500">
        Añade todas las fotos que quieras de cada área. Se recortan solas al formato vertical (3:4)
        y se optimizan al subirlas. Se muestran en la home, en la sección «Trabajos realizados».
      </p>

      {error && (
        <div className="mt-4 rounded-lg border-l-4 border-red-500 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>
      )}

      <div className="mt-6 space-y-6">
        {AREAS.map((area) => {
          const photos = byArea[area.slug] ?? [];
          return (
            <div key={area.slug} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">{area.label}</h2>
                <span className="text-sm text-neutral-400">{photos.length} foto(s)</span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {photos.map((it) => (
                  <div key={it.id} className="group">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50">
                      <img src={it.image_url} alt={it.title ?? area.label} className="h-full w-full object-cover" />
                      <button
                        type="button"
                        disabled={busyId === it.id}
                        onClick={() => removePhoto(it)}
                        title="Eliminar foto"
                        className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-red-600 shadow-sm transition-colors hover:bg-red-600 hover:text-white disabled:opacity-50"
                      >
                        {busyId === it.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                    <input
                      type="text"
                      defaultValue={it.title ?? ''}
                      placeholder="Título (opcional)"
                      onBlur={(e) => saveTitle(it, e.target.value)}
                      className="mt-1.5 w-full rounded-md border border-neutral-200 px-2 py-1 text-xs outline-none focus:border-brand"
                    />
                  </div>
                ))}

                {/* Tile para añadir foto */}
                <button
                  type="button"
                  disabled={uploadingArea === area.slug}
                  onClick={() => document.getElementById(`file-${area.slug}`)?.click()}
                  className="flex aspect-[3/4] flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-neutral-300 text-neutral-400 transition-colors hover:border-brand hover:text-brand disabled:opacity-60"
                >
                  {uploadingArea === area.slug
                    ? <><Loader2 className="h-6 w-6 animate-spin" /><span className="text-xs">Subiendo…</span></>
                    : <><Upload className="h-6 w-6" /><span className="text-xs font-medium">Añadir foto</span></>}
                </button>
                <input
                  id={`file-${area.slug}`}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && addPhoto(area.slug, e.target.files[0])}
                />
              </div>

              {photos.length === 0 && (
                <p className="mt-3 flex items-center gap-1.5 text-xs text-neutral-400">
                  <ImageOff className="h-3.5 w-3.5" /> Aún no hay fotos en esta área. Esta área no aparecerá en la web hasta que subas alguna.
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex items-center gap-2 rounded-2xl border border-brand/30 bg-brand/5 p-5 text-sm text-neutral-600">
        <Images className="h-5 w-5 shrink-0 text-brand" />
        Las fotos aparecen en la web al instante tras subirlas. Puedes borrar cualquiera con la papelera.
      </div>
    </div>
  );
}
