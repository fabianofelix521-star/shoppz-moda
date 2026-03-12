"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, Share2 } from "lucide-react";
import { BackButton } from "@/components/shared/back-button";
import { CategoryChips } from "@/components/product/category-chips";
import { FilterBar } from "@/components/product/filter-bar";
import { ProductGrid } from "@/components/product/product-grid";
import { ProductGridSkeleton } from "@/components/shared/loading";
import { EmptyState } from "@/components/shared/empty-state";
import { formatNumber } from "@/lib/utils";
import { ProductWithImages, SortOption, Category } from "@/types";

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductGridSkeleton />}>
      <ProductsContent />
    </Suspense>
  );
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [products, setProducts] = useState<ProductWithImages[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const category = searchParams.get("category") || "";
  const sort = (searchParams.get("sort") || "newest") as SortOption;
  const search = searchParams.get("q") || "";
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(search);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (category) params.set("category", category);
      if (sort) params.set("sort", sort);
      if (search) params.set("q", search);

      const res = await fetch(`/api/products?${params.toString()}`);
      const data = await res.json();
      setProducts(data.products);
      setTotal(data.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [category, sort, search]);

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then(setCategories);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="min-h-screen mx-auto max-w-7xl">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 pt-2 pb-3">
        <BackButton />
        <div className="text-center">
          <h1 className="text-base font-bold text-[#111111]">
            Itens Populares
          </h1>
          <p className="text-xs text-[#A0A0A0]">{formatNumber(total)} itens</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#FFF1ED] transition-colors"
          >
            <Search size={20} className="text-[#111111]" />
          </button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#FFF1ED] transition-colors">
            <Share2 size={20} className="text-[#111111]" />
          </button>
        </div>
      </div>

      {/* Search bar */}
      {searchOpen && (
        <div className="px-5 pb-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateParams("q", searchQuery);
            }}
          >
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-[22px] border border-[#E8E8E8] bg-[#fafafa] px-4 py-2.5 text-sm focus:border-[#E24A2B] focus:outline-none focus:ring-2 focus:ring-[#E24A2B]/20"
              autoFocus
            />
          </form>
        </div>
      )}

      {/* Category chips */}
      <CategoryChips
        categories={categories}
        selected={category}
        onSelect={(slug) => updateParams("category", slug)}
      />

      {/* Filter bar */}
      <FilterBar sort={sort} onSortChange={(s) => updateParams("sort", s)} />

      {/* Products grid */}
      {loading ? (
        <ProductGridSkeleton />
      ) : products.length === 0 ? (
        <EmptyState
          title="Nenhum produto encontrado"
          description="Tente ajustar seus filtros ou termos de busca"
        />
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
}
