"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import Link from "next/link";
import { useFavoritesStore } from "@/store/favorites-store";
import { ProductGrid } from "@/components/product/product-grid";
import { EmptyState } from "@/components/shared/empty-state";
import { ProductGridSkeleton } from "@/components/shared/loading";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/shared/back-button";
import { ProductWithImages } from "@/types";

export default function FavoritesPage() {
  const ids = useFavoritesStore((s) => s.ids);
  const [products, setProducts] = useState<ProductWithImages[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (ids.length === 0) {
      setProducts([]);
      setLoading(false);
      return;
    }

    fetch(`/api/products?ids=${ids.join(",")}`)
      .then((r) => r.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [ids]);

  return (
    <div className="min-h-screen mx-auto max-w-7xl space-y-4">
      <div className="flex items-center gap-3 px-5 pt-2 pb-0">
        <BackButton />
        <h1 className="text-lg font-bold text-[#111111]">Favoritos</h1>
        <span className="text-sm text-[#A0A0A0] ml-auto">
          {ids.length} itens
        </span>
      </div>

      {loading ? (
        <ProductGridSkeleton />
      ) : products.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="Nenhum favorito ainda"
          description="Comece a adicionar itens que você ama"
        >
          <Link href="/products">
            <Button variant="primary" size="lg">
              Ver Produtos
            </Button>
          </Link>
        </EmptyState>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
}
