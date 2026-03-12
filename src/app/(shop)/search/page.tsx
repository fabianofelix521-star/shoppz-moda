"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { BackButton } from "@/components/shared/back-button";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="min-h-screen mx-auto max-w-3xl">
      <div className="flex items-center gap-3 px-5 pt-2 pb-4">
        <BackButton />
        <h1 className="text-lg font-bold text-[#111111]">Buscar</h1>
      </div>

      <div className="px-5">
        <form onSubmit={handleSearch} className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A0A0A0]"
          />
          <input
            type="text"
            placeholder="Buscar produtos, marcas..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-[22px] border border-[#E8E8E8] bg-[#fafafa] pl-11 pr-4 py-3 text-sm focus:border-[#E24A2B] focus:outline-none focus:ring-2 focus:ring-[#E24A2B]/20"
            autoFocus
          />
        </form>

        <div className="mt-8 space-y-3">
          <p className="text-xs font-semibold text-[#A0A0A0] uppercase tracking-wider">
            Buscas Populares
          </p>
          {["Vestidos", "Bolsas", "Sapatos", "Jaquetas", "Blusas"].map(
            (term) => (
              <button
                key={term}
                onClick={() => router.push(`/products?q=${term.toLowerCase()}`)}
                className="flex items-center gap-2 text-sm text-[#111111] py-2 hover:text-[#E24A2B] transition-colors"
              >
                <Search size={14} className="text-[#A0A0A0]" />
                {term}
              </button>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
