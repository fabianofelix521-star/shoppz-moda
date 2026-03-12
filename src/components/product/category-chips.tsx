"use client";

import { Badge } from "@/components/ui/badge";
import { Category } from "@prisma/client";

export function CategoryChips({
  categories,
  selected,
  onSelect,
}: {
  categories: Category[];
  selected: string;
  onSelect: (slug: string) => void;
}) {
  return (
    <div className="flex gap-2 px-5 overflow-x-auto scrollbar-hide pb-2">
      <Badge
        variant={selected === "" ? "active" : "default"}
        onClick={() => onSelect("")}
        className="whitespace-nowrap cursor-pointer"
      >
        View all
      </Badge>
      {categories.map((cat) => (
        <Badge
          key={cat.id}
          variant={selected === cat.slug ? "active" : "default"}
          onClick={() => onSelect(cat.slug)}
          className="whitespace-nowrap cursor-pointer"
        >
          {cat.name}
        </Badge>
      ))}
    </div>
  );
}
