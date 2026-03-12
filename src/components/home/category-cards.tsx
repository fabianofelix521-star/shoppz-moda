import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Category } from "@/types";

export function CategoryCards({ categories }: { categories: Category[] }) {
  const women = categories.find((c) => c.slug === "women");
  const men = categories.find((c) => c.slug === "men");

  return (
    <div className="flex gap-3 px-5 overflow-x-auto scrollbar-hide lg:gap-5">
      {women && (
        <CategoryCard name="Feminino" slug="women" image={women.image || ""} />
      )}
      {men && (
        <CategoryCard name="Masculino" slug="men" image={men.image || ""} />
      )}
    </div>
  );
}

function CategoryCard({
  name,
  slug,
  image,
}: {
  name: string;
  slug: string;
  image: string;
}) {
  return (
    <Link
      href={`/products?category=${slug}`}
      className="relative flex-1 min-w-[150px] aspect-[4/5] rounded-[30px] overflow-hidden group"
    >
      {image ? (
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="50vw"
        />
      ) : (
        <div className="absolute inset-0 bg-[#F3F3F3]" />
      )}
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-between p-4">
        <div />
        <div className="flex items-end justify-between">
          <span className="bg-white/90 backdrop-blur-sm text-[#111111] text-xs font-semibold px-4 py-1.5 rounded-full">
            {name}
          </span>
          <div className="w-10 h-10 rounded-full bg-[#E24A2B] flex items-center justify-center shadow-lg shadow-[#E24A2B]/30 group-hover:scale-110 transition-transform">
            <ArrowRight size={18} className="text-white" />
          </div>
        </div>
      </div>
    </Link>
  );
}
