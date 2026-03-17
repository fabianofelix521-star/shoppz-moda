import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/product/product-card";
import { ProductWithImages } from "@/types";

export function PopularItems({ products }: { products: ProductWithImages[] }) {
  return (
    <section className="px-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-[#111111]">Itens populares</h2>
        <Link
          href="/products?sort=popular"
          className="flex items-center gap-1 text-[#E24A2B] text-sm font-medium hover:underline"
        >
          Ver todos
          <ArrowRight size={14} />
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
