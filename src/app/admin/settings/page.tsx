export const dynamic = 'force-dynamic';

import { adminGetSetting } from "@/actions/admin";
import { SettingsForm } from "./settings-form";
import { AiApiKeyForm } from "../ai-api-key-form";

export default async function AdminSettingsPage() {
  const [
    footerDescriptionRaw,
    footerHelpRaw,
    footerContactRaw,
    footerLegalRaw,
    footerSocialRaw,
    logoUrl,
  ] = await Promise.all([
    adminGetSetting("footer_description"),
    adminGetSetting("footer_help"),
    adminGetSetting("footer_contact"),
    adminGetSetting("footer_legal"),
    adminGetSetting("footer_social"),
    adminGetSetting("logo_url"),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Configurações</h1>
      <AiApiKeyForm />
      <SettingsForm
        initialData={{
          footerDescription: footerDescriptionRaw,
          footerHelp: footerHelpRaw,
          footerContact: footerContactRaw,
          footerLegal: footerLegalRaw,
          footerSocial: footerSocialRaw,
          logoUrl,
        }}
      />
    </div>
  );
}
