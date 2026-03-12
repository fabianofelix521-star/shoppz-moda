"use client";

import { cn } from "@/lib/utils";

export function SizeSelector({
  sizes,
  selected,
  onSelect,
}: {
  sizes: string[];
  selected: string;
  onSelect: (size: string) => void;
}) {
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold text-[#111111]">Select size:</h4>
      <div className="flex gap-2 flex-wrap">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSelect(size)}
            className={cn(
              "min-w-[44px] h-11 px-3 rounded-full text-sm font-medium transition-all border-2",
              selected === size
                ? "bg-[#F8E7EC] text-[#E24A2B] border-[#E24A2B]"
                : "bg-white text-[#7A7A7A] border-[#E8E8E8] hover:border-[#111111]",
            )}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
