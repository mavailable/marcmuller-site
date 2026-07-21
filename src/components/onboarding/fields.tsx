// Primitives de champs du formulaire /onboarding. Style : tokens marcm
// (primary=charcoal, secondary=beige, accent=terracotta), tactile >= 44px,
// labels toujours visibles, erreurs sous le champ.

import type { ReactNode } from 'react';
import type { UploadedFile } from './onboarding-data';

const inputClass =
  'w-full px-4 py-3 min-h-[44px] rounded-xl border bg-white text-primary-900 ' +
  'placeholder:text-primary-400 focus:outline-none focus:border-accent-500 transition-colors';

function borderClass(error?: string) {
  return error ? 'border-red-500' : 'border-secondary-500';
}

export function Field({ label, htmlFor, required, error, hint, children }: {
  label: string; htmlFor?: string; required?: boolean; error?: string; hint?: string; children: ReactNode;
}) {
  return (
    <div className="mb-4">
      <label htmlFor={htmlFor} className="block text-sm font-medium text-primary-800 mb-1.5">
        {label} {required && <span className="text-accent-600" aria-hidden="true">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-primary-500 mt-1">{hint}</p>}
      {error && <p className="text-sm text-red-600 mt-1" role="alert">{error}</p>}
    </div>
  );
}

export function TextInput(props: {
  id: string; label: string; value: string; onChange: (v: string) => void;
  type?: string; placeholder?: string; required?: boolean; error?: string; hint?: string;
}) {
  const { id, label, value, onChange, type = 'text', placeholder, required, error, hint } = props;
  return (
    <Field label={label} htmlFor={id} required={required} error={error} hint={hint}>
      <input
        id={id} type={type} value={value} placeholder={placeholder}
        required={required} aria-required={required} aria-invalid={!!error}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputClass} ${borderClass(error)}`}
      />
    </Field>
  );
}

export function TextArea(props: {
  id: string; label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; required?: boolean; error?: string; hint?: string; maxLength?: number; rows?: number;
}) {
  const { id, label, value, onChange, placeholder, required, error, hint, maxLength, rows = 3 } = props;
  return (
    <Field label={label} htmlFor={id} required={required} error={error} hint={hint}>
      <textarea
        id={id} value={value} placeholder={placeholder} rows={rows} maxLength={maxLength}
        required={required} aria-required={required} aria-invalid={!!error}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputClass} ${borderClass(error)}`}
      />
    </Field>
  );
}

export function SelectInput(props: {
  id: string; label: string; value: string; onChange: (v: string) => void;
  options: string[] | { value: string; label: string }[];
  required?: boolean; error?: string; hint?: string; placeholder?: string;
}) {
  const { id, label, value, onChange, options, required, error, hint, placeholder = 'Choisissez...' } = props;
  const opts = options.map((o) => (typeof o === 'string' ? { value: o, label: o } : o));
  return (
    <Field label={label} htmlFor={id} required={required} error={error} hint={hint}>
      <select
        id={id} value={value} required={required} aria-required={required} aria-invalid={!!error}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputClass} ${borderClass(error)}`}
      >
        <option value="">{placeholder}</option>
        {opts.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </Field>
  );
}

export function RadioGroup(props: {
  name: string; label: string; value: string; onChange: (v: string) => void;
  options: string[]; required?: boolean; error?: string;
}) {
  const { name, label, value, onChange, options, required, error } = props;
  return (
    <Field label={label} required={required} error={error}>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={label}>
        {options.map((o) => (
          <label
            key={o}
            className={`inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl border cursor-pointer transition-colors ${
              value === o ? 'border-accent-500 bg-accent-50 text-primary-900' : 'border-secondary-500 bg-white text-primary-700'
            }`}
          >
            <input
              type="radio" name={name} value={o} checked={value === o}
              onChange={() => onChange(o)} className="accent-[#E86C47]"
            />
            {o}
          </label>
        ))}
      </div>
    </Field>
  );
}

export function UploadZone(props: {
  kind: UploadedFile['kind']; label: string; hint: string; accept: string;
  multiple?: boolean; maxFiles?: number;
  files: UploadedFile[]; slugHint: string;
  onUploaded: (f: UploadedFile) => void; onRemove: (key: string) => void; onError: (msg: string) => void;
}) {
  const { kind, label, hint, accept, multiple, maxFiles = 1, files, slugHint, onUploaded, onRemove, onError } = props;
  const mine = files.filter((f) => f.kind === kind);

  async function handleFiles(list: FileList | null) {
    if (!list) return;
    for (const file of Array.from(list).slice(0, maxFiles - mine.length)) {
      if (file.size > 5 * 1024 * 1024) {
        onError(`${file.name} : fichier trop lourd (max 5 Mo)`);
        continue;
      }
      const fd = new FormData();
      fd.append('file', file);
      fd.append('slug_hint', slugHint);
      fd.append('botcheck', '');
      try {
        const resp = await fetch('/api/onboarding-upload', { method: 'POST', body: fd });
        const out = await resp.json();
        if (!resp.ok || !out.ok) throw new Error(out.error || `erreur ${resp.status}`);
        onUploaded({ key: out.key, name: file.name, kind });
      } catch (e) {
        onError(`${file.name} : envoi impossible (${(e as Error).message})`);
      }
    }
  }

  return (
    <Field label={label} hint={hint}>
      <div className="rounded-xl border border-dashed border-secondary-600 bg-secondary-100 p-4">
        <input
          type="file" accept={accept} multiple={multiple}
          disabled={mine.length >= maxFiles}
          aria-label={label}
          onChange={(e) => { void handleFiles(e.target.files); e.target.value = ''; }}
          className="block w-full text-sm text-primary-700 file:mr-3 file:px-4 file:py-2.5 file:min-h-[44px] file:rounded-lg file:border-0 file:bg-accent-500 file:text-white file:cursor-pointer"
        />
        {mine.length > 0 && (
          <ul className="mt-3 space-y-1.5">
            {mine.map((f) => (
              <li key={f.key} className="flex items-center justify-between text-sm text-primary-800 bg-white rounded-lg px-3 py-2">
                <span className="truncate">{f.name}</span>
                <button type="button" onClick={() => onRemove(f.key)} className="text-primary-500 hover:text-red-600 ml-3 min-h-[44px] px-2">
                  Retirer
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Field>
  );
}
