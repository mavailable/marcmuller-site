// AUTO-GENERATED par @marc/cms-engine — ne pas editer. Regenerer : npx cms-engine-scaffold
import { CmsApp } from '@marc/cms-engine';
import type { CmsConfig } from '@marc/cms-engine';
import { crmModule } from '@marc/cms-engine/modules/crm';
import { boardModule } from '@marc/cms-engine/modules/board';
import { marketingModule } from '@marc/cms-engine/modules/marketing';
import { cockpitModule } from '../cms-modules/cockpit';
export default function AdminIsland({ config }: { config: CmsConfig }) {
  return <CmsApp config={config} modules={[crmModule, boardModule, marketingModule, cockpitModule]} />;
}
