import Link from "next/link";
import { Banner } from "@prisma/client";

export function PromoBanner({ banner }: { banner: Banner }) {
  return (
    <Link href={banner.link} className="block mx-5">
      <div className="promo-banner relative rounded-[30px] overflow-hidden p-6 min-h-[140px] flex flex-col justify-center">
        <div className="relative z-10">
          <h3 className="text-2xl font-black text-[#111111] leading-tight mb-1">
            {banner.title}
          </h3>
          {banner.subtitle && (
            <p className="text-xs text-[#7A7A7A] mb-3 max-w-[200px]">
              {banner.subtitle}
            </p>
          )}
          <span className="inline-flex items-center bg-[#111111] text-white text-xs font-bold px-5 py-2.5 rounded-full uppercase tracking-wide hover:bg-[#222222] transition-colors">
            {banner.cta}
          </span>
        </div>
      </div>
    </Link>
  );
}
