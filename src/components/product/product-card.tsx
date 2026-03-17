"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { FavoriteButton } from "@/components/shared/favorite-button";
import { formatPrice } from "@/lib/utils";
import { ProductWithImages } from "@/types";

export function ProductCard({ product }: { product: ProductWithImages }) {
  const image = product.images[0]?.url;

  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="glass-card rounded-[24px] p-3 mb-1">
        <div className="relative aspect-[3/4] rounded-[20px] overflow-hidden bg-[#F3F3F3] mb-2.5">
          {image && (
            <Image
              src={image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 50vw, 250px"
            />
          )}
          <FavoriteButton
            productId={product.id}
            className="absolute top-2 right-2"
            size={16}
          />
          {product.rating > 0 && (
            <div className="absolute top-2 left-2 flex items-center gap-1 bg-[#FFF1ED] rounded-full px-2 py-0.5">
              <Star size={10} className="fill-[#E24A2B] text-[#E24A2B]" />
              <span className="text-[10px] font-semibold text-[#E24A2B]">
                {product.rating.toFixed(1)}
              </span>
            </div>
          )}
        </div>
        <div className="px-0.5">
          <p className="text-[11px] text-[#A0A0A0] font-medium uppercase tracking-wider">
            {product.brand}
          </p>
          <h3 className="text-sm font-medium text-[#111111] truncate mt-0.5">
            {product.name}
          </h3>
          <p className="text-sm font-bold text-[#111111] mt-1">
            {formatPrice(product.price)}
          </p>
        </div>
      </div>
    </Link>
  );
}
