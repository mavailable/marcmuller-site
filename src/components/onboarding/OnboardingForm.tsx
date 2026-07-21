// Island /onboarding : navigation 5 etapes, autosave localStorage, upload R2,
// soumission Web3Forms (webhook lead-inbound same-origin). client:load.

import { useEffect, useRef, useState } from 'react';
import { Step1, Step2, Step3, Step4, Step5 } from './steps';
import { STEP_TITLES, validateStep, slugifyLite, TYPE_CONDITIONAL_FIELDS } from './onboarding-data';
import type { Data, UploadedFile, ClientType } from './onboarding-data';

const DRAFT_KEY = 'wf-onboarding-draft';
const WEB3FORMS_KEY = 'dccda1f5-4e63-4b9f-9c66-f5ce76f0dfdd';
// Champs a ne pas transmettre a Web3Forms
const LOCAL_ONLY = ['email_confirm'];

export default function OnboardingForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<Data>({ pays: 'France' });
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadError, setUploadError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const restored = useRef(false);

  // restauration du brouillon
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const draft = JSON.parse(raw);
        if (draft && typeof draft === 'object' && draft.data) {
          if (draft.savedAt && Date.now() - draft.savedAt > 30 * 24 * 3600 * 1000) {
            localStorage.removeItem(DRAFT_KEY);
          } else {
            const clean = Object.fromEntries(Object.entries(draft.data).filter(([, v]) => typeof v === 'string'));
            setData({ pays: 'France', ...clean });
            setFiles(Array.isArray(draft.files) ? draft.files : []);
            setStep(Number(draft.step) >= 1 && Number(draft.step) <= 5 ? Number(draft.step) : 1);
          }
        }
      }
    } catch { /* brouillon corrompu : on repart de zero */ }
    restored.current = true;
  }, []);

  // autosave (debounce 500 ms) — jamais les fichiers eux-memes, juste les cles R2
  useEffect(() => {
    if (!restored.current) return;
    const t = setTimeout(() => {
      try { localStorage.setItem(DRAFT_KEY, JSON.stringify({ step, data, files, savedAt: Date.now() })); } catch { /* quota */ }
    }, 500);
    return () => clearTimeout(t);
  }, [step, data, files]);

  const set = (field: string) => (value: string) =>
    setData((d) => {
      const next = { ...d, [field]: value };
      // bascule de type : purge les conditionnels de l'ancien type (sauf champs partages avec le nouveau)
      if (field === 'type_client' && d.type_client && d.type_client !== value) {
        const keep = TYPE_CONDITIONAL_FIELDS[value as ClientType] || [];
        for (const f of TYPE_CONDITIONAL_FIELDS[d.type_client as ClientType] || []) {
          if (!keep.includes(f)) delete next[f];
        }
      }
      return next;
    });

  function goToStep(n: number) {
    setErrors({});
    setStep(n);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function goNext() {
    const errs = validateStep(step, data);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    goToStep(Math.min(5, step + 1));
  }

  async function submit() {
    const errs = validateStep(5, data);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSubmitting(true);

    const payload = new FormData();
    payload.append('form_source', 'onboarding');
    payload.append('botcheck', '');
    for (const [k, v] of Object.entries(data)) {
      if (LOCAL_ONLY.includes(k)) continue;
      if (v && v.trim()) payload.append(k, v.trim());
    }
    payload.append('message', [
      data.objectif && `Objectif : ${data.objectif}`,
      data.budget && `Budget : ${data.budget}`,
      data.freins && `Freins : ${data.freins}`,
    ].filter(Boolean).join('\n'));
    payload.append('r2_keys', JSON.stringify(files.map((f) => f.key)));
    if (files.length > 0) {
      payload.append('fichiers_noms', files.map((f) => `${f.kind}: ${f.name}`).join(', '));
    }

    // 1. Ecriture critique : notre endpoint same-origin (CRM + archive + queue + notification).
    //    Le webhook Web3Forms est devenu une feature Pro (07/2026) : on ne depend plus de lui.
    let sent = false;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const resp = await fetch('/api/lead-inbound', { method: 'POST', body: payload, signal: controller.signal });
      sent = resp.ok;
    } catch { /* reseau ou timeout : sent reste false, le brouillon est conserve */ }
    clearTimeout(timeout);
    if (!sent) {
      setSubmitting(false);
      setSubmitError("L'envoi n'a pas abouti. Vos réponses sont conservées sur cet appareil : réessayez dans un instant, ou écrivez-moi directement à marc@muller.im.");
      return;
    }

    // 2. Email natif Web3Forms best-effort (SANS champ webhook), simple filet de notification.
    const w3f = new FormData();
    w3f.append('access_key', WEB3FORMS_KEY);
    w3f.append('subject', `[Onboarding] ${data.prenom || ''} ${data.nom || ''} - ${data.activite || ''} (${data.type_client || ''})`);
    w3f.append('from_name', 'Onboarding marcm.fr');
    for (const [k, v] of payload.entries()) w3f.append(k, v);
    const wc = new AbortController();
    const wt = setTimeout(() => wc.abort(), 5000);
    try {
      await fetch('https://api.web3forms.com/submit', { method: 'POST', body: w3f, signal: wc.signal });
    } catch { /* best-effort : la notification /notify-marc et l'archive font foi */ }
    clearTimeout(wt);

    try { localStorage.removeItem(DRAFT_KEY); } catch { /* rien */ }
    window.location.href = `/merci-onboarding/?prenom=${encodeURIComponent(data.prenom || '')}`;
  }

  const slugHint = slugifyLite(data.activite || '') || 'prospect';

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <p className="text-sm font-medium text-primary-800 mb-2">
          Étape {step}/5 : {STEP_TITLES[step - 1]}
          <span className="text-primary-500 font-normal"> ({step - 1}/5 complétées)</span>
        </p>
        <div className="h-2 rounded-full bg-secondary-300" role="progressbar" aria-valuemin={1} aria-valuemax={5} aria-valuenow={step} aria-label="Progression du formulaire">
          <div className="h-2 rounded-full bg-accent-500 transition-all duration-300" style={{ width: `${(step / 5) * 100}%` }} />
        </div>
        <ol className="hidden md:flex justify-between mt-2 text-xs text-primary-500">
          {STEP_TITLES.map((t, i) => (
            <li key={t} className={i + 1 === step ? 'text-accent-600 font-semibold' : i + 1 < step ? 'text-primary-700' : ''}>
              {i + 1 < step ? '✓ ' : ''}{i + 1}. {t}
            </li>
          ))}
        </ol>
      </div>

      {/* Etape courante */}
      <div className="rounded-2xl bg-white border border-secondary-300 shadow-sm p-5 sm:p-8">
        {step === 1 && <Step1 d={data} set={set} errors={errors} />}
        {step === 2 && <Step2 d={data} set={set} errors={errors} />}
        {step === 3 && (
          <Step3
            d={data} set={set} errors={errors}
            files={files} slugHint={slugHint} uploadError={uploadError}
            onUploaded={(f) => { setUploadError(''); setFiles((fs) => [...fs, f]); }}
            onRemove={(key) => setFiles((fs) => fs.filter((f) => f.key !== key))}
            onError={setUploadError}
          />
        )}
        {step === 4 && <Step4 d={data} set={set} errors={errors} />}
        {step === 5 && <Step5 d={data} set={set} errors={errors} files={files} goToStep={goToStep} />}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        {step > 1 ? (
          <button type="button" onClick={() => goToStep(step - 1)} className="px-6 py-2.5 min-h-[44px] rounded-lg border border-secondary-500 text-primary-800 hover:bg-secondary-100 transition-colors">
            Précédent
          </button>
        ) : <span />}
        {step < 5 ? (
          <button type="button" onClick={goNext} className="px-8 py-3 min-h-[44px] rounded-lg bg-accent-500 text-white font-medium shadow-md hover:bg-accent-600 transition-colors">
            Suivant
          </button>
        ) : (
          <button type="button" onClick={() => void submit()} disabled={submitting} className="px-8 py-3 min-h-[44px] rounded-lg bg-accent-500 text-white font-medium shadow-md hover:bg-accent-600 transition-colors disabled:opacity-60">
            {submitting ? 'Envoi en cours...' : 'Je valide mes infos'}
          </button>
        )}
      </div>
      {submitError && step === 5 && (
        <p className="text-sm text-red-600 mt-4 text-center" role="alert">{submitError}</p>
      )}
      <p className="text-xs text-primary-500 mt-4 text-center">
        Vos réponses sont sauvegardées automatiquement sur cet appareil. Vous pouvez revenir plus tard.
      </p>
    </div>
  );
}
