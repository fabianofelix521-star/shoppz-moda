import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
  Globe,
} from "lucide-react";
import { getPublicSettings } from "@/actions/admin";

const shopLinks = [
  { href: "/products", label: "Todos os Produtos" },
  { href: "/products?category=women", label: "Feminino" },
  { href: "/products?category=men", label: "Masculino" },
  { href: "/products?category=accessories", label: "Acessórios" },
  { href: "/products?category=shoes", label: "Calçados" },
];

const defaultHelp = [
  { href: "/help/shipping", label: "Envio e Entrega" },
  { href: "/help/returns", label: "Trocas e Devoluções" },
  { href: "/help/faq", label: "Perguntas Frequentes" },
  { href: "/help/contact", label: "Fale Conosco" },
  { href: "/help/sizing", label: "Guia de Tamanhos" },
];

const defaultLegal = [
  { href: "/privacy", label: "Política de Privacidade" },
  { href: "/terms", label: "Termos de Uso" },
  { href: "/cookies", label: "Política de Cookies" },
];

const defaultDescription =
  "Descubra a moda que combina com seu estilo. Roupas premium, bolsas, sapatos e acessórios com entrega para todo o Brasil.";

const defaultContact = {
  email: "support@shoppzmoda.com.br",
  phone: "+55 (11) 4000-0199",
  address: "Av. Paulista, 1000 - São Paulo, SP 01310-100",
};

function parseJSON<T>(raw: string | undefined, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export async function Footer() {
  const settings = await getPublicSettings([
    "footer_description",
    "footer_help",
    "footer_contact",
    "footer_legal",
    "footer_social",
    "logo_url",
  ]);

  const description = settings.footer_description || defaultDescription;
  const helpLinks = parseJSON<{ label: string; href: string }[]>(
    settings.footer_help,
    defaultHelp,
  );
  const legalLinks = parseJSON<{ label: string; href: string }[]>(
    settings.footer_legal,
    defaultLegal,
  );
  const contact = parseJSON<{
    email: string;
    phone: string;
    address: string;
  }>(settings.footer_contact, defaultContact);
  const social = parseJSON<{
    instagram: string;
    facebook: string;
    twitter: string;
    website: string;
  }>(settings.footer_social, {
    instagram: "",
    facebook: "",
    twitter: "",
    website: "",
  });
  const logoUrl = settings.logo_url || "";

  const socialEntries = [
    { url: social.instagram, icon: Instagram, label: "Instagram" },
    { url: social.facebook, icon: Facebook, label: "Facebook" },
    { url: social.twitter, icon: Twitter, label: "Twitter" },
    { url: social.website, icon: Globe, label: "Website" },
  ].filter((s) => s.url);

  return (
    <footer className="mt-10 border-t border-[#E8E8E8] bg-[#111111] text-white">
      <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            {logoUrl ? (
              <img
                src={logoUrl}
                alt="Logo"
                className="h-10 w-auto object-contain"
              />
            ) : (
              <h3 className="text-xl font-bold tracking-tight">shoppz moda</h3>
            )}
            <p className="mt-3 text-sm leading-6 text-white/60">
              {description}
            </p>
            {socialEntries.length > 0 && (
              <div className="mt-5 flex items-center gap-4">
                {socialEntries.map(({ url, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/50 transition hover:text-white"
                    aria-label={label}
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            )}
            {socialEntries.length === 0 && (
              <div className="mt-5 flex items-center gap-4">
                <span className="text-white/50">
                  <Instagram size={20} />
                </span>
                <span className="text-white/50">
                  <Facebook size={20} />
                </span>
                <span className="text-white/50">
                  <Twitter size={20} />
                </span>
              </div>
            )}
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-white/80">
              Loja
            </h4>
            <ul className="mt-4 space-y-2.5">
              {shopLinks.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-white/50 transition hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-white/80">
              Ajuda
            </h4>
            <ul className="mt-4 space-y-2.5">
              {helpLinks.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-white/50 transition hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-white/80">
              Contato
            </h4>
            <ul className="mt-4 space-y-2.5">
              {contact.email && (
                <li className="flex items-center gap-2 text-sm text-white/50">
                  <Mail size={14} className="shrink-0" />
                  {contact.email}
                </li>
              )}
              {contact.phone && (
                <li className="flex items-center gap-2 text-sm text-white/50">
                  <Phone size={14} className="shrink-0" />
                  {contact.phone}
                </li>
              )}
              {contact.address && (
                <li className="flex items-start gap-2 text-sm text-white/50">
                  <MapPin size={14} className="mt-0.5 shrink-0" />
                  {contact.address}
                </li>
              )}
            </ul>
            <div className="mt-5">
              <h4 className="text-sm font-semibold uppercase tracking-widest text-white/80">
                Legal
              </h4>
              <ul className="mt-3 space-y-2">
                {legalLinks.map(({ href, label }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-white/50 transition hover:text-white"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center gap-3 border-t border-white/10 pt-8 sm:flex-row sm:justify-between">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Shoppz Moda. Todos os direitos
            reservados.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-white/40">Visa</span>
            <span className="text-xs text-white/40">Mastercard</span>
            <span className="text-xs text-white/40">PayPal</span>
            <span className="text-xs text-white/40">Apple Pay</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
