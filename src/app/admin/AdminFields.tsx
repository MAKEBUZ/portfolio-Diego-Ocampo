'use client';

import { useId, useRef, useState, type ReactNode } from 'react';
import { FileText, ImagePlus, Plus, Upload, X } from 'lucide-react';

export function Field({
  label,
  value,
  onChange,
  area = false,
  full = false,
  type = 'text',
  help,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  area?: boolean;
  full?: boolean;
  type?: string;
  help?: string;
}) {
  const id = useId();
  return (
    <label className={`field ${full ? 'full-width' : ''}`}>
      <span>{label}</span>
      {area ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={5}
          aria-describedby={help ? id : undefined}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-describedby={help ? id : undefined}
        />
      )}
      {help && <small id={id}>{help}</small>}
    </label>
  );
}

export function TextList({
  label,
  value,
  onChange,
  limit = 20,
}: {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  limit?: number;
}) {
  const id = useId();
  const [draft, setDraft] = useState('');
  const [error, setError] = useState('');
  function add() {
    if (!draft.trim()) return;
    const additions = draft
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    const next = [...new Set([...value, ...additions])];
    if (next.length > limit || additions.some((s) => s.length > 100)) {
      setError(`Máximo ${limit} elementos, de hasta 100 caracteres cada uno.`);
      return;
    }
    if (next.length !== value.length) onChange(next);
    setDraft('');
    setError('');
  }
  return (
    <div className="field full-width tag-field">
      <label htmlFor={id}>
        {label}{' '}
        <span className="field-count" aria-hidden="true">
          {value.length}/{limit}
        </span>
      </label>
      <div className="tag-editor">
        <div className="tag-items" aria-label={label}>
          {value.map((item, index) => (
            <span className="admin-tag" key={`${item}-${index}`}>
              {item}
              <button
                type="button"
                aria-label={`Quitar ${item}`}
                onClick={() => onChange(value.filter((_, i) => i !== index))}
              >
                <X size={13} />
              </button>
            </span>
          ))}
        </div>
        <div className="tag-add-row">
          <input
            id={id}
            value={draft}
            placeholder="Escribe para añadir…"
            aria-describedby={`${id}-help`}
            onChange={(e) => {
              setDraft(e.target.value);
              setError('');
            }}
            onBlur={add}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ',') {
                e.preventDefault();
                add();
              }
            }}
          />
          <button type="button" aria-label={`Añadir a ${label}`} onClick={add}>
            <Plus size={16} /> Añadir
          </button>
        </div>
      </div>
      <small id={`${id}-help`}>
        {error || 'Añade con Enter o una coma. Pulsa × para quitar un elemento.'}
      </small>
    </div>
  );
}

// Content URLs are editable; only load previews from local paths or HTTP(S).
function previewUrl(value: string) {
  return /^\/(?!\/)/.test(value) || /^https?:\/\//i.test(value) ? value : '';
}
export function MediaPreview({
  value,
  label,
  pdf = false,
}: {
  value: string;
  label: string;
  pdf?: boolean;
}) {
  const [failedUrl, setFailedUrl] = useState<string | null>(null);
  const safe = previewUrl(value);
  return (
    <div className={`media-preview ${pdf ? 'document-preview' : ''}`}>
      {pdf ? (
        <>
          <FileText size={30} />
          <span>{value ? 'Hoja de vida · PDF' : 'Añade tu hoja de vida'}</span>
          {safe && (
            <a href={safe} target="_blank" rel="noreferrer">
              Abrir documento ↗
            </a>
          )}
        </>
      ) : safe && failedUrl !== safe ? (
        // Uploaded files and external URLs are dynamic; native images support both sources.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={safe} alt={label} onError={() => setFailedUrl(safe)} />
      ) : (
        <>
          <ImagePlus size={28} />
          <span>{value ? 'No se pudo cargar la imagen' : 'Tu próxima imagen empieza aquí'}</span>
        </>
      )}
    </div>
  );
}

export function UploadField({
  label,
  value,
  onChange,
  onError,
  onUploadChange,
  pdf = false,
  optional = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onError: (message: string) => void;
  onUploadChange: (delta: number) => void;
  pdf?: boolean;
  optional?: boolean;
}) {
  const id = useId();
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const uploadLock = useRef(false);
  async function upload(file?: File) {
    if (!file || uploadLock.current) return;
    if (file.size > 5 * 1024 * 1024) {
      onError('El archivo supera los 5 MB.');
      return;
    }
    if (
      !(pdf ? ['application/pdf'] : ['image/jpeg', 'image/png', 'image/webp']).includes(file.type)
    ) {
      onError(pdf ? 'Selecciona un archivo PDF.' : 'Selecciona una imagen JPG, PNG o WebP.');
      return;
    }
    uploadLock.current = true;
    setUploading(true);
    onUploadChange(1);
    try {
      const form = new FormData();
      form.append('file', file);
      const response = await fetch('/api/admin/upload', { method: 'POST', body: form });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      onChange(data.url);
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Error al subir el archivo.');
    } finally {
      uploadLock.current = false;
      setUploading(false);
      onUploadChange(-1);
    }
  }
  return (
    <div className="field full-width media-field">
      <label htmlFor={id}>{label}</label>
      <div
        className={`media-upload ${dragging ? 'dragging' : ''}`}
        aria-busy={uploading}
        onDragOver={(e) => {
          e.preventDefault();
          if (!e.currentTarget.closest('fieldset')?.disabled) setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          if (!e.currentTarget.closest('fieldset')?.disabled) void upload(e.dataTransfer.files[0]);
        }}
      >
        <MediaPreview value={value} label={`Vista previa: ${label}`} pdf={pdf} />
        <div className="media-upload-copy">
          <strong>
            {uploading
              ? 'Subiendo archivo…'
              : pdf
                ? 'Tu CV, siempre a mano.'
                : 'Dale una imagen a tu historia.'}
          </strong>
          <small>
            Arrastra aquí o selecciona un archivo.
            <br />
            {pdf ? 'PDF' : 'JPG, PNG o WebP'} · Máximo 5 MB
          </small>
          <label className="upload-button">
            <Upload size={15} />
            {pdf ? 'Subir PDF' : 'Subir imagen'}
            <input
              type="file"
              aria-label={`Subir archivo: ${label}`}
              accept={pdf ? 'application/pdf' : 'image/jpeg,image/png,image/webp'}
              disabled={uploading}
              onChange={(e) => {
                void upload(e.target.files?.[0]);
                e.target.value = '';
              }}
            />
          </label>
        </div>
      </div>
      <div className="media-url-row">
        <input
          id={id}
          value={value}
          disabled={uploading}
          onChange={(e) => onChange(e.target.value)}
          placeholder={pdf ? 'O pega la URL del PDF' : 'O pega la URL de una imagen'}
        />
        {optional && value && (
          <button
            type="button"
            className="media-clear"
            onClick={() => onChange('')}
            disabled={uploading}
            aria-label={`Quitar imagen: ${label}`}
          >
            <X size={17} />
          </button>
        )}
      </div>
    </div>
  );
}

export function Panel({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="admin-panel">
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      {children}
    </section>
  );
}
