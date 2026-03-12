"use client";

import { useState, useTransition } from "react";
import {
  Save,
  Check,
  Plus,
  Trash2,
  Upload,
  Instagram,
  Facebook,
  Twitter,
  Globe,
  ChevronDown,
  ChevronUp,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { adminSaveSetting } from "@/actions/admin";

interface LinkItem {
  label: string;
  href: string;
  content?: string;
}

interface ContactInfo {
  email: string;
  phone: string;
  address: string;
}

interface SocialLinks {
  instagram: string;
  facebook: string;
  twitter: string;
  website: string;
}

interface SettingsFormProps {
  initialData: {
    footerDescription: string;
    footerHelp: string;
    footerContact: string;
    footerLegal: string;
    footerSocial: string;
    logoUrl: string;
  };
}

const defaultHelp: LinkItem[] = [
  { label: "Envio e Entrega", href: "/help/shipping" },
  { label: "Trocas e Devoluções", href: "/help/returns" },
  { label: "Perguntas Frequentes", href: "/help/faq" },
  { label: "Fale Conosco", href: "/help/contact" },
  { label: "Guia de Tamanhos", href: "/help/sizing" },
];

const defaultContact: ContactInfo = {
  email: "support@shoppzmoda.com.br",
  phone: "+55 (11) 4000-0199",
  address: "Av. Paulista, 1000 - São Paulo, SP 01310-100",
};

const defaultLegal: LinkItem[] = [
  { label: "Política de Privacidade", href: "/privacy" },
  { label: "Termos de Uso", href: "/terms" },
  { label: "Política de Cookies", href: "/cookies" },
];

const defaultSocial: SocialLinks = {
  instagram: "",
  facebook: "",
  twitter: "",
  website: "",
};

function parseJSON<T>(raw: string, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function SettingsForm({ initialData }: SettingsFormProps) {
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState<string | null>(null);

  // State
  const [description, setDescription] = useState(
    initialData.footerDescription ||
      "Descubra a moda que combina com seu estilo. Roupas premium, bolsas, sapatos e acessórios com entrega para todo o Brasil.",
  );
  const [helpLinks, setHelpLinks] = useState<LinkItem[]>(
    parseJSON(initialData.footerHelp, defaultHelp),
  );
  const [contact, setContact] = useState<ContactInfo>(
    parseJSON(initialData.footerContact, defaultContact),
  );
  const [legalLinks, setLegalLinks] = useState<LinkItem[]>(
    parseJSON(initialData.footerLegal, defaultLegal),
  );
  const [social, setSocial] = useState<SocialLinks>(
    parseJSON(initialData.footerSocial, defaultSocial),
  );
  const [logoUrl, setLogoUrl] = useState(initialData.logoUrl || "");

  function saveSection(key: string, value: string) {
    startTransition(async () => {
      await adminSaveSetting(key, value);
      setSaved(key);
      setTimeout(() => setSaved(null), 2000);
    });
  }

  function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setLogoUrl(result);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Logo */}
      <section className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-base font-bold text-gray-900 mb-4">Logo da Loja</h2>
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt="Logo"
                className="object-contain w-full h-full"
              />
            ) : (
              <span className="text-xs text-gray-400 text-center px-2">
                Sem logo
              </span>
            )}
          </div>
          <div className="space-y-2">
            <label className="inline-flex items-center gap-2 cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-xl transition-colors">
              <Upload size={16} />
              Enviar Logo
              <input
                type="file"
                accept="image/png,image/webp,image/jpeg,image/svg+xml"
                className="hidden"
                onChange={handleLogoUpload}
              />
            </label>
            <p className="text-xs text-gray-400">PNG, WebP, SVG ou JPEG</p>
            {logoUrl && (
              <button
                onClick={() => setLogoUrl("")}
                className="text-xs text-red-500 hover:underline"
              >
                Remover logo
              </button>
            )}
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <SaveButton
            onClick={() => saveSection("logo_url", logoUrl)}
            pending={isPending}
            saved={saved === "logo_url"}
          />
        </div>
      </section>

      {/* Footer description */}
      <section className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-base font-bold text-gray-900 mb-4">
          Descrição da Loja (Rodapé)
        </h2>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:border-gray-400 focus:outline-none resize-none"
        />
        <div className="mt-3 flex justify-end">
          <SaveButton
            onClick={() => saveSection("footer_description", description)}
            pending={isPending}
            saved={saved === "footer_description"}
          />
        </div>
      </section>

      {/* Help Links with Policy Content */}
      <section className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-gray-900">
              Páginas de Ajuda
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Edite o título, link e o conteúdo de cada política
            </p>
          </div>
          <button
            onClick={() =>
              setHelpLinks([...helpLinks, { label: "", href: "", content: "" }])
            }
            className="text-xs text-blue-600 hover:underline flex items-center gap-1"
          >
            <Plus size={14} /> Adicionar
          </button>
        </div>
        <div className="space-y-3">
          {helpLinks.map((link, i) => (
            <HelpLinkEditor
              key={i}
              link={link}
              onChange={(updated) => {
                const arr = [...helpLinks];
                arr[i] = updated;
                setHelpLinks(arr);
              }}
              onDelete={() =>
                setHelpLinks(helpLinks.filter((_, idx) => idx !== i))
              }
            />
          ))}
        </div>
        <div className="mt-3 flex justify-end">
          <SaveButton
            onClick={() =>
              saveSection("footer_help", JSON.stringify(helpLinks))
            }
            pending={isPending}
            saved={saved === "footer_help"}
          />
        </div>
      </section>

      {/* Contact */}
      <section className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-base font-bold text-gray-900 mb-4">Contato</h2>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">
              E-mail
            </label>
            <Input
              value={contact.email}
              onChange={(e) =>
                setContact({ ...contact, email: e.target.value })
              }
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">
              Telefone
            </label>
            <Input
              value={contact.phone}
              onChange={(e) =>
                setContact({ ...contact, phone: e.target.value })
              }
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">
              Endereço
            </label>
            <Input
              value={contact.address}
              onChange={(e) =>
                setContact({ ...contact, address: e.target.value })
              }
            />
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <SaveButton
            onClick={() =>
              saveSection("footer_contact", JSON.stringify(contact))
            }
            pending={isPending}
            saved={saved === "footer_contact"}
          />
        </div>
      </section>

      {/* Legal Links */}
      <section className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-gray-900">Links Legais</h2>
          <button
            onClick={() =>
              setLegalLinks([...legalLinks, { label: "", href: "" }])
            }
            className="text-xs text-blue-600 hover:underline flex items-center gap-1"
          >
            <Plus size={14} /> Adicionar
          </button>
        </div>
        <div className="space-y-3">
          {legalLinks.map((link, i) => (
            <div key={i} className="flex items-center gap-2">
              <Input
                placeholder="Título"
                value={link.label}
                onChange={(e) => {
                  const updated = [...legalLinks];
                  updated[i] = { ...updated[i], label: e.target.value };
                  setLegalLinks(updated);
                }}
                className="flex-1"
              />
              <Input
                placeholder="/privacy, /terms..."
                value={link.href}
                onChange={(e) => {
                  const updated = [...legalLinks];
                  updated[i] = { ...updated[i], href: e.target.value };
                  setLegalLinks(updated);
                }}
                className="flex-1"
              />
              <button
                onClick={() =>
                  setLegalLinks(legalLinks.filter((_, idx) => idx !== i))
                }
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
        <div className="mt-3 flex justify-end">
          <SaveButton
            onClick={() =>
              saveSection("footer_legal", JSON.stringify(legalLinks))
            }
            pending={isPending}
            saved={saved === "footer_legal"}
          />
        </div>
      </section>

      {/* Social */}
      <section className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-base font-bold text-gray-900 mb-4">
          Redes Sociais
        </h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Instagram size={18} className="text-gray-400 shrink-0" />
            <Input
              placeholder="https://instagram.com/..."
              value={social.instagram}
              onChange={(e) =>
                setSocial({ ...social, instagram: e.target.value })
              }
            />
          </div>
          <div className="flex items-center gap-3">
            <Facebook size={18} className="text-gray-400 shrink-0" />
            <Input
              placeholder="https://facebook.com/..."
              value={social.facebook}
              onChange={(e) =>
                setSocial({ ...social, facebook: e.target.value })
              }
            />
          </div>
          <div className="flex items-center gap-3">
            <Twitter size={18} className="text-gray-400 shrink-0" />
            <Input
              placeholder="https://x.com/..."
              value={social.twitter}
              onChange={(e) =>
                setSocial({ ...social, twitter: e.target.value })
              }
            />
          </div>
          <div className="flex items-center gap-3">
            <Globe size={18} className="text-gray-400 shrink-0" />
            <Input
              placeholder="https://seusite.com.br"
              value={social.website}
              onChange={(e) =>
                setSocial({ ...social, website: e.target.value })
              }
            />
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <SaveButton
            onClick={() => saveSection("footer_social", JSON.stringify(social))}
            pending={isPending}
            saved={saved === "footer_social"}
          />
        </div>
      </section>
    </div>
  );
}

function HelpLinkEditor({
  link,
  onChange,
  onDelete,
}: {
  link: LinkItem;
  onChange: (updated: LinkItem) => void;
  onDelete: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <div className="flex items-center gap-2 p-3 bg-gray-50">
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="p-1 text-gray-400 hover:text-gray-600"
        >
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        <FileText size={14} className="text-gray-400 shrink-0" />
        <Input
          placeholder="Título (ex: Envio e Entrega)"
          value={link.label}
          onChange={(e) => onChange({ ...link, label: e.target.value })}
          className="flex-1 !border-0 !bg-transparent !shadow-none text-sm font-medium"
        />
        <button
          onClick={onDelete}
          className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>
      {expanded && (
        <div className="p-3 space-y-3 border-t border-gray-200">
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">
              Link / URL
            </label>
            <Input
              placeholder="/help/shipping"
              value={link.href}
              onChange={(e) => onChange({ ...link, href: e.target.value })}
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">
              Conteúdo da Política
            </label>
            <textarea
              value={link.content || ""}
              onChange={(e) => onChange({ ...link, content: e.target.value })}
              rows={8}
              placeholder="Digite aqui o texto completo da política. Ex: Nossa política de envio garante entrega em até 7 dias úteis..."
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:border-gray-400 focus:outline-none resize-y"
            />
            <p className="text-xs text-gray-400 mt-1">
              Este texto será exibido quando o cliente acessar esta página de
              ajuda.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function SaveButton({
  onClick,
  pending,
  saved,
}: {
  onClick: () => void;
  pending: boolean;
  saved: boolean;
}) {
  return (
    <Button
      variant="primary"
      size="md"
      onClick={onClick}
      disabled={pending}
      className="gap-1.5"
    >
      {saved ? (
        <>
          <Check size={16} /> Salvo
        </>
      ) : (
        <>
          <Save size={16} /> {pending ? "Salvando..." : "Salvar"}
        </>
      )}
    </Button>
  );
}
