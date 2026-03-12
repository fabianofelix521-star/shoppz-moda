import { getPublicSetting } from "@/actions/admin";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface HelpLink {
  label: string;
  href: string;
  content?: string;
}

export default async function HelpPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const raw = await getPublicSetting("footer_help");

  let helpLinks: HelpLink[] = [];
  try {
    helpLinks = JSON.parse(raw);
  } catch {
    notFound();
  }

  const page = helpLinks.find((h) => h.href === `/help/${slug}`);

  if (!page || !page.content) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 mb-6"
      >
        <ArrowLeft size={16} />
        Voltar
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">{page.label}</h1>
      <div className="prose prose-sm max-w-none text-gray-600 whitespace-pre-wrap leading-7">
        {page.content}
      </div>
    </div>
  );
}
