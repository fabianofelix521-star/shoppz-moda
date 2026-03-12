"use client";

import { SlidersHorizontal, ArrowDownUp } from "lucide-react";

export function FilterBar({
  sort,
  onSortChange,
}: {
  sort: string;
  onSortChange: (sort: string) => void;
}) {
  return (
    <div className="flex items-center justify-between px-5 py-3">
      <button className="flex items-center gap-1.5 text-sm text-[#111111] font-medium border border-[#E8E8E8] rounded-[24px] px-4 py-2 hover:bg-[#FFF1ED] transition-colors">
        <SlidersHorizontal size={16} />
        Filtros
      </button>
      <button
        onClick={() => {
          const sortOptions = ["newest", "price-asc", "price-desc", "popular"];
          const current = sortOptions.indexOf(sort);
          const next = (current + 1) % sortOptions.length;
          onSortChange(sortOptions[next]);
        }}
        className="flex items-center gap-1.5 text-sm text-[#111111] font-medium border border-[#E8E8E8] rounded-[24px] px-4 py-2 hover:bg-[#FFF1ED] transition-colors"
      >
        <ArrowDownUp size={16} />
        Ordenar
      </button>
    </div>
  );
}
