"use client";

import { Heart } from "lucide-react";
import { useFavoritesStore } from "@/store/favorites-store";
import { cn } from "@/lib/utils";

export function FavoriteButton({
  productId,
  className,
  size = 20,
}: {
  productId: string;
  className?: string;
  size?: number;
}) {
  const { toggle, isFavorite } = useFavoritesStore();
  const active = isFavorite(productId);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(productId);
      }}
      className={cn(
        "flex items-center justify-center rounded-full glass-card p-2 transition-all hover:scale-110 active:scale-95",
        className,
      )}
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart
        size={size}
        className={cn(
          "transition-colors",
          active ? "fill-[#E24A2B] text-[#E24A2B]" : "text-[#7A7A7A]",
        )}
      />
    </button>
  );
}
