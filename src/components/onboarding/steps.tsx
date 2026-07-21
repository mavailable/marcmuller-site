// Les 5 etapes du formulaire /onboarding — champs conformes a
// skills/wf-onboarding/SKILL.md (conditionnels par type de client).

import { Field, TextInput, TextArea, SelectInput, RadioGroup, UploadZone } from './fields';
import {
  CLIENT_TYPES, DISCIPLINES, NB_ADHERENTS, NB_PRODUITS, PLATEFORMES, PAIEMENTS,
  PAYS, CANAUX, OBJECTIFS, BUDGETS, DEADLINES, RECAP_SECTIONS, clientTypeLabel,
} from './onboarding-data';
import type { Data, UploadedFile } from './onboarding-data';

export interface StepProps {
  d: Data;
  set: (field: string) => (value: string) => void;
  errors: Record<string, string>;
}

const condClass = 'rounded-xl bg-secondary-100 border border-secondary-300 p-4 mt-2 animate-[fadeIn_150ms_ease-in-out]';

export function Step1({ d, set, errors }: StepProps) {
  const type = d.type_client || '';
  return (
    <>
      <div className="grid sm:grid-cols-2 gap-x-4">
        <TextInput id="prenom" label="Prénom" value={d.prenom || ''} onChange={set('prenom')} required error={errors.prenom} />
        <TextInput id="nom" label="Nom" value={d.nom || ''} onChange={set('nom')} required error={errors.nom} />
      </div>
      <TextInput id="activite" label="Nom de votre activité" hint="Nom commercial ou nom d'artiste." value={d.activite || ''} onChange={set('activite')} required error={errors.activite} />
      <SelectInput id="type_client" label="Vous êtes..." value={type} onChange={set('type_client')} options={CLIENT_TYPES} required error={errors.type_client} />

      {type === 'entreprise-locale' && (
        <div className={condClass}>
          <TextInput id="siret" label="SIRET" hint="Si votre activité est en France." value={d.siret || ''} onChange={set('siret')} />
          <TextInput id="adresse" label="Adresse physique" value={d.adresse || ''} onChange={set('adresse')} />
          <TextInput id="zone_intervention" label="Zone d'intervention" placeholder="Ex : Nancy et 30 km autour" value={d.zone_intervention || ''} onChange={set('zone_intervention')} />
          <TextArea id="horaires" label="Horaires d'ouverture" rows={2} placeholder="Ex : mardi au samedi, 9h-18h" value={d.horaires || ''} onChange={set('horaires')} />
        </div>
      )}
      {type === 'artiste-createur' && (
        <div className={condClass}>
          <SelectInput id="discipline" label="Discipline artistique" value={d.discipline || ''} onChange={set('discipline')} options={DISCIPLINES} />
          <TextInput id="nom_scene" label="Nom de scène" value={d.nom_scene || ''} onChange={set('nom_scene')} />
        </div>
      )}
      {type === 'freelance-consultant' && (
        <div className={condClass}>
          <TextInput id="expertise" label="Domaine d'expertise" value={d.expertise || ''} onChange={set('expertise')} />
          <TextInput id="certifications" label="Certifications, labels" value={d.certifications || ''} onChange={set('certifications')} />
          <TextInput id="zone_intervention" label="Zone d'intervention" value={d.zone_intervention || ''} onChange={set('zone_intervention')} />
        </div>
      )}
      {type === 'association' && (
        <div className={condClass}>
          <TextArea id="objet_social" label="Objet social" rows={2} value={d.objet_social || ''} onChange={set('objet_social')} />
          <SelectInput id="nb_adherents" label="Nombre d'adhérents" value={d.nb_adherents || ''} onChange={set('nb_adherents')} options={NB_ADHERENTS} />
          <TextInput id="statut_juridique" label="Statut juridique" placeholder="Ex : association loi 1901" value={d.statut_juridique || ''} onChange={set('statut_juridique')} />
        </div>
      )}
      {type === 'e-commerce' && (
        <div className={condClass}>
          <SelectInput id="nb_produits" label="Nombre de produits" value={d.nb_produits || ''} onChange={set('nb_produits')} options={NB_PRODUITS} />
          <SelectInput id="plateforme_actuelle" label="Plateforme actuelle" value={d.plateforme_actuelle || ''} onChange={set('plateforme_actuelle')} options={PLATEFORMES} />
          <SelectInput id="paiement" label="Moyen de paiement souhaité" value={d.paiement || ''} onChange={set('paiement')} options={PAIEMENTS} />
        </div>
      )}
    </>
  );
}

export function Step2({ d, set, errors }: StepProps) {
  return (
    <>
      <TextInput id="email" label="Email" type="email" value={d.email || ''} onChange={set('email')} required error={errors.email} />
      <TextInput id="email_confirm" label="Confirmez votre email" type="email" value={d.email_confirm || ''} onChange={set('email_confirm')} required error={errors.email_confirm} />
      <TextInput id="telephone" label="Téléphone" type="tel" placeholder="+33 6..." value={d.telephone || ''} onChange={set('telephone')} />
      <div className="grid sm:grid-cols-2 gap-x-4">
        <TextInput id="ville" label="Ville" value={d.ville || ''} onChange={set('ville')} required error={errors.ville} />
        <SelectInput id="pays" label="Pays" value={d.pays || 'France'} onChange={set('pays')} options={PAYS} required error={errors.pays} />
      </div>
      <RadioGroup name="canal_prefere" label="Comment préférez-vous échanger ?" value={d.canal_prefere || ''} onChange={set('canal_prefere')} options={CANAUX} required error={errors.canal_prefere} />
    </>
  );
}

export function Step3(props: StepProps & {
  files: UploadedFile[]; slugHint: string; uploadError: string;
  onUploaded: (f: UploadedFile) => void; onRemove: (key: string) => void; onError: (msg: string) => void;
}) {
  const { d, set, files, slugHint, uploadError, onUploaded, onRemove, onError } = props;
  const zone = { files, slugHint, onUploaded, onRemove, onError };
  return (
    <>
      <p className="text-sm text-primary-600 mb-4">
        Tout est optionnel ici. Envoyez ce que vous avez, on complète ensemble ensuite.
      </p>
      <UploadZone kind="logo" label="Votre logo" hint="SVG, PNG ou JPG. 5 Mo max." accept=".svg,.png,.jpg,.jpeg,image/svg+xml,image/png,image/jpeg" {...zone} />
      <UploadZone kind="photo" label="Photos de votre activité" hint="Jusqu'à 10 photos, 5 Mo max chacune." accept=".png,.jpg,.jpeg,.webp,image/png,image/jpeg,image/webp" multiple maxFiles={10} {...zone} />
      <UploadZone kind="charte" label="Charte graphique" hint="PDF ou image, si vous en avez une." accept=".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg" {...zone} />
      {uploadError && <p className="text-sm text-red-600 mb-4" role="alert">{uploadError}</p>}
      <TextInput id="couleurs" label="Couleurs préférées" placeholder="bleu marine, bois, naturel..." value={d.couleurs || ''} onChange={set('couleurs')} />
      <TextArea id="sites_aimes" label="Exemples de sites que vous aimez" placeholder="Collez 2-3 adresses de sites qui vous plaisent" value={d.sites_aimes || ''} onChange={set('sites_aimes')} />
    </>
  );
}

export function Step4({ d, set, errors }: StepProps) {
  const type = d.type_client || '';
  return (
    <>
      <TextInput id="url_site" label="Votre site actuel" type="url" placeholder="https://..." hint="Si vous avez déjà un site." value={d.url_site || ''} onChange={set('url_site')} />
      <TextArea id="reseaux" label="Vos réseaux sociaux" placeholder="Instagram, Facebook, LinkedIn... collez les liens" value={d.reseaux || ''} onChange={set('reseaux')} />
      <TextInput id="fiche_google" label="Votre fiche Google" type="url" placeholder="Lien Google Maps de votre établissement" value={d.fiche_google || ''} onChange={set('fiche_google')} />
      <SelectInput id="objectif" label="Objectif principal du site" value={d.objectif || ''} onChange={set('objectif')} options={OBJECTIFS} required error={errors.objectif} />
      {d.objectif === 'Autre' && (
        <TextInput id="objectif_autre" label="Précisez votre objectif" value={d.objectif_autre || ''} onChange={set('objectif_autre')} required error={errors.objectif_autre} />
      )}
      <TextArea id="freins" label="Qu'est-ce qui vous empêche d'avoir un site aujourd'hui ?" value={d.freins || ''} onChange={set('freins')} />
      <div className="grid sm:grid-cols-2 gap-x-4">
        <SelectInput id="budget" label="Budget envisagé" value={d.budget || ''} onChange={set('budget')} options={BUDGETS} />
        <SelectInput id="deadline" label="Deadline" value={d.deadline || ''} onChange={set('deadline')} options={DEADLINES} />
      </div>

      {type === 'entreprise-locale' && (
        <div className={condClass}>
          <RadioGroup name="avis_google" label="Avez-vous des avis Google ?" value={d.avis_google || ''} onChange={set('avis_google')} options={['Oui', 'Non']} />
          {d.avis_google === 'Oui' && (
            <TextInput id="nb_avis" label="Combien, environ ?" type="number" value={d.nb_avis || ''} onChange={set('nb_avis')} />
          )}
        </div>
      )}
      {type === 'e-commerce' && (
        <div className={condClass}>
          <RadioGroup name="catalogue_pret" label="Catalogue produits prêt ?" value={d.catalogue_pret || ''} onChange={set('catalogue_pret')} options={['Oui', 'Non', 'En cours']} />
          <RadioGroup name="photos_produits" label="Photos produits disponibles ?" value={d.photos_produits || ''} onChange={set('photos_produits')} options={['Oui', 'Non']} />
        </div>
      )}
      {type === 'artiste-createur' && (
        <div className={condClass}>
          <RadioGroup name="book" label="Avez-vous un book ou portfolio en ligne ?" value={d.book || ''} onChange={set('book')} options={['Oui', 'Non']} />
          {d.book === 'Oui' && (
            <TextInput id="book_url" label="Le lien de votre book" type="url" value={d.book_url || ''} onChange={set('book_url')} />
          )}
        </div>
      )}

      <TextArea id="autre" label="Autre chose à me dire ?" maxLength={500} value={d.autre || ''} onChange={set('autre')} />
    </>
  );
}

export function Step5(props: StepProps & { files: UploadedFile[]; goToStep: (n: number) => void }) {
  const { d, set, errors, files, goToStep } = props;
  return (
    <>
      <p className="text-sm text-primary-600 mb-4">
        Relisez vos informations. Cliquez sur « Modifier » pour revenir sur une section.
      </p>
      {RECAP_SECTIONS.map((section) => {
        const rows = section.fields
          .map(([id, label]) => [label, id === 'type_client' ? clientTypeLabel(d[id] || '') : (d[id] || '')] as [string, string])
          .filter(([, v]) => v.trim() !== '');
        const fileCount = section.step === 3 ? files.length : 0;
        if (rows.length === 0 && fileCount === 0) return null;
        return (
          <div key={section.step} className="rounded-xl border border-secondary-300 bg-white p-4 mb-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-primary-900">{section.title}</h3>
              <button type="button" onClick={() => goToStep(section.step)} className="text-sm text-accent-600 hover:text-accent-700 min-h-[44px] px-2">
                Modifier
              </button>
            </div>
            <dl className="text-sm space-y-1">
              {rows.map(([label, value]) => (
                <div key={label} className="flex gap-2">
                  <dt className="text-primary-500 shrink-0">{label} :</dt>
                  <dd className="text-primary-900 break-words">{value}</dd>
                </div>
              ))}
              {fileCount > 0 && (
                <div className="flex gap-2">
                  <dt className="text-primary-500 shrink-0">Fichiers :</dt>
                  <dd className="text-primary-900">{fileCount} envoyé{fileCount > 1 ? 's' : ''}</dd>
                </div>
              )}
            </dl>
          </div>
        );
      })}

      <label className={`flex items-start gap-3 rounded-xl border p-4 cursor-pointer ${errors.rgpd ? 'border-red-500' : 'border-secondary-400'}`}>
        <input
          type="checkbox" checked={d.rgpd === 'oui'}
          onChange={(e) => set('rgpd')(e.target.checked ? 'oui' : '')}
          className="mt-1 h-5 w-5 accent-[#E86C47]"
        />
        <span className="text-sm text-primary-700">
          J'accepte que ces informations soient utilisées pour préparer ma proposition et mon site.
          Elles ne sont jamais transmises à des tiers en dehors des sous-traitants techniques nommés
          dans la <a href="/politique-confidentialite/" target="_blank" rel="noopener" className="underline text-accent-600">politique de confidentialité</a> (Cloudflare, Web3Forms).
          Suppression sur simple demande à marc@muller.im.
        </span>
      </label>
      {errors.rgpd && <p className="text-sm text-red-600 mt-2" role="alert">{errors.rgpd}</p>}
    </>
  );
}
