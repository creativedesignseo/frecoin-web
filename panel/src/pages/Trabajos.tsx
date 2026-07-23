import { useCallback, useEffect, useMemo, useState, type CSSProperties } from 'react';
import { Loader2, Trash2, Images, Plus, GripVertical, UploadCloud } from 'lucide-react';
import {
  DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy, useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
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
  const [dragOverArea, setDragOverArea] = useState<WorkArea | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  // showSpinner solo en la carga inicial; los refrescos tras subir/borrar no
  // deben tapar toda la página con el spinner. No limpia el error (para que un
  // aviso de reordenado fallido no se borre al resincronizar).
  const load = useCallback(async (showSpinner = false) => {
    if (showSpinner) setLoading(true);
    try {
      const res = await api.gallery.list();
      setItems(res.items);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudieron cargar las fotos');
    } finally {
      if (showSpinner) setLoading(false);
    }
  }, []);

  useEffect(() => { load(true); }, [load]);

  const byArea = useMemo(() => {
    const m: Record<string, GalleryItem[]> = {};
    for (const it of items) (m[it.area] ??= []).push(it);
    return m;
  }, [items]);

  const addFiles = async (area: WorkArea, files: FileList | File[]) => {
    const list = Array.from(files).filter((f) => f.type.startsWith('image/'));
    if (!list.length) return;
    setUploadingArea(area);
    setError(null);
    try {
      for (const file of list) {
        const b64 = await cropToRatioWebp(file, 3, 4);          // recorte 3:4 + WebP
        const { url } = await api.uploadImage(b64, `work-${area}`);
        await api.gallery.add(area, url);
      }
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

  const saveField = async (it: GalleryItem, field: 'title' | 'description', value: string) => {
    if ((it[field] ?? '') === value.trim()) return;
    setBusyId(it.id);
    try {
      await api.gallery.update(it.id, { [field]: value });
      setItems((prev) => prev.map((p) => (p.id === it.id ? { ...p, [field]: value.trim() || null } : p)));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudo guardar');
    } finally {
      setBusyId(null);
    }
  };

  const onDragEnd = (area: WorkArea) => (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const areaItems = byArea[area] ?? [];
    const oldIndex = areaItems.findIndex((i) => i.id === active.id);
    const newIndex = areaItems.findIndex((i) => i.id === over.id);
    if (oldIndex < 0 || newIndex < 0) return;
    const reordered = arrayMove(areaItems, oldIndex, newIndex);
    setError(null);
    // Optimista: recolocar este área (se renderiza por AREAS, el orden del array externo no importa).
    setItems((prev) => [...prev.filter((i) => i.area !== area), ...reordered]);
    api.gallery.reorder(area, reordered.map((i) => i.id)).catch(() => {
      setError('No se pudo guardar el nuevo orden. Recargo la lista.');
      load();
    });
  };

  if (loading) return <div className="mt-10 flex justify-center"><Loader2 className="h-6 w-6 animate-spin text-brand" /></div>;

  return (
    <div className="mx-auto max-w-4xl pb-16">
      <h1 className="text-2xl font-extrabold tracking-tight">Trabajos realizados</h1>
      <p className="mt-1 text-neutral-500">
        Añade las fotos de cada área. Puedes <strong>arrastrar imágenes desde tu ordenador</strong> y soltarlas,
        o usar el botón «Añadir foto». <strong>Arrastra una foto</strong> (icono ⠿) para cambiar su orden. Cada foto
        lleva título y descripción, que se muestran en la web.
      </p>

      {error && (
        <div className="mt-4 rounded-lg border-l-4 border-red-500 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>
      )}

      <div className="mt-6 space-y-6">
        {AREAS.map((area) => {
          const photos = byArea[area.slug] ?? [];
          const busyUpload = uploadingArea === area.slug;
          const isOver = dragOverArea === area.slug;
          const inputId = `file-${area.slug}`;
          return (
            <div
              key={area.slug}
              onDragOver={(e) => { e.preventDefault(); if (dragOverArea !== area.slug) setDragOverArea(area.slug); }}
              onDragLeave={() => setDragOverArea((cur) => (cur === area.slug ? null : cur))}
              onDrop={(e) => {
                e.preventDefault();
                setDragOverArea(null);
                if (e.dataTransfer.files?.length) addFiles(area.slug, e.dataTransfer.files);
              }}
              className={`rounded-2xl border bg-white p-6 shadow-sm transition-colors ${isOver ? 'border-brand ring-2 ring-brand/30' : 'border-neutral-200'}`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold">{area.label}</h2>
                  <p className="text-xs text-neutral-400">{photos.length} foto(s)</p>
                </div>
                <div>
                  <button
                    type="button"
                    disabled={busyUpload}
                    onClick={() => document.getElementById(inputId)?.click()}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-sm font-bold text-brand-ink transition-colors hover:bg-brand-dark disabled:opacity-60"
                  >
                    {busyUpload ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                    {busyUpload ? 'Subiendo…' : 'Añadir foto'}
                  </button>
                  <input
                    id={inputId}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.length) addFiles(area.slug, e.target.files);
                      e.target.value = ''; // permite re-seleccionar el mismo archivo / reintentar
                    }}
                  />
                </div>
              </div>

              {photos.length === 0 ? (
                <div className="mt-4 flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-neutral-300 py-12 text-neutral-400">
                  <UploadCloud className="h-7 w-7" />
                  <p className="text-sm">Arrastra fotos aquí o pulsa «Añadir foto».</p>
                  <p className="text-xs">Esta área no aparece en la web hasta que subas alguna.</p>
                </div>
              ) : (
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd(area.slug)}>
                  <SortableContext items={photos.map((p) => p.id)} strategy={rectSortingStrategy}>
                    <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                      {photos.map((it) => (
                        <SortablePhoto
                          key={it.id}
                          item={it}
                          busy={busyId === it.id}
                          onRemove={() => removePhoto(it)}
                          onSaveTitle={(v) => saveField(it, 'title', v)}
                          onSaveDesc={(v) => saveField(it, 'description', v)}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex items-center gap-2 rounded-2xl border border-brand/30 bg-brand/5 p-5 text-sm text-neutral-600">
        <Images className="h-5 w-5 shrink-0 text-brand" />
        Los cambios (fotos, orden, títulos y descripciones) se reflejan en la web al instante.
      </div>
    </div>
  );
}

function SortablePhoto({
  item, busy, onRemove, onSaveTitle, onSaveDesc,
}: {
  item: GalleryItem;
  busy: boolean;
  onRemove: () => void;
  onSaveTitle: (v: string) => void;
  onSaveDesc: (v: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id });
  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : undefined,
    opacity: isDragging ? 0.85 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="group">
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50">
        <img src={item.image_url} alt={item.title ?? ''} className="h-full w-full object-cover" draggable={false} />
        {/* Asa de arrastre — reordena sin interferir con los campos de texto */}
        <button
          type="button"
          {...attributes}
          {...listeners}
          title="Arrastra para reordenar"
          className="absolute left-1.5 top-1.5 flex h-7 w-7 cursor-grab touch-none items-center justify-center rounded-full bg-white/90 text-neutral-500 shadow-sm active:cursor-grabbing"
        >
          <GripVertical className="h-4 w-4" />
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={onRemove}
          title="Eliminar foto"
          className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-red-600 shadow-sm transition-colors hover:bg-red-600 hover:text-white disabled:opacity-50"
        >
          {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
        </button>
      </div>
      <input
        type="text"
        defaultValue={item.title ?? ''}
        placeholder="Título"
        onBlur={(e) => onSaveTitle(e.target.value)}
        className="mt-1.5 w-full rounded-md border border-neutral-200 px-2 py-1 text-xs font-medium outline-none focus:border-brand"
      />
      <textarea
        defaultValue={item.description ?? ''}
        placeholder="Descripción (opcional)"
        rows={2}
        onBlur={(e) => onSaveDesc(e.target.value)}
        className="mt-1 w-full resize-none rounded-md border border-neutral-200 px-2 py-1 text-xs outline-none focus:border-brand"
      />
    </div>
  );
}
