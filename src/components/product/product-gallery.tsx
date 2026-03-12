"use client";

import { useState } from "react";
import Image from "next/image";
import { ProductImage } from "@prisma/client";
import { cn } from "@/lib/utils";

export function ProductGallery({ images }: { images: ProductImage[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];

  if (!images.length) {
    return (
      <div className="aspect-square rounded-[30px] bg-[#F3F3F3] flex items-center justify-center">
        <span className="text-[#A0A0A0]">Sem imagem</span>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Main image */}
      <div className="relative aspect-[4/5] rounded-[30px] overflow-hidden bg-[#F3F3F3]">
        {activeImage && (
          <Image
            src={activeImage.url}
            alt={activeImage.alt || "Imagem do produto"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 500px"
            priority
          />
        )}
      </div>

      {/* Thumbnails overlay */}
      {images.length > 1 && (
        <div className="absolute right-3 top-3 flex flex-col gap-2">
          {images.slice(0, 4).map((img, i) => (
            <button
              key={img.id}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "w-12 h-12 rounded-xl overflow-hidden border-2 transition-all",
                i === activeIndex
                  ? "border-[#E24A2B] shadow-lg"
                  : "border-white/60 opacity-70 hover:opacity-100",
              )}
            >
              <Image
                src={img.url}
                alt={img.alt || `Miniatura ${i + 1}`}
                width={48}
                height={48}
                className="object-cover w-full h-full"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
