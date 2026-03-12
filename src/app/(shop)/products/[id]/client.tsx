"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Share2,
  Star,
  ChevronLeft,
  Maximize2,
  MessageCircle,
} from "lucide-react";
import { FavoriteButton } from "@/components/shared/favorite-button";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { formatPrice, cn } from "@/lib/utils";
import { ProductWithImages } from "@/types";
import { useRouter } from "next/navigation";

export function ProductDetailClient({
  product,
}: {
  product: ProductWithImages;
}) {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "");
  const [expanded, setExpanded] = useState(false);
  const [galleryExpanded, setGalleryExpanded] = useState(false);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      image: product.images[0]?.url || "",
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-5 px-5 pb-24 mx-auto max-w-7xl lg:pb-10">
      {/* Top bar: back + favorite + share */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <button
          onClick={() => router.back()}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/85 text-[#111111] shadow-[0_10px_30px_rgba(17,17,17,0.06)] backdrop-blur-xl"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2">
          <FavoriteButton
            productId={product.id}
            size={20}
            className="h-11 w-11"
          />
          <button className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/85 text-[#111111] shadow-[0_10px_30px_rgba(17,17,17,0.06)] backdrop-blur-xl">
            <Share2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Desktop 2-column layout wrapper */}
      <div className="lg:flex lg:gap-8">
        {/* Left column: Gallery */}
        <div className="lg:flex-1 lg:max-w-[55%]">
          {/* Gallery: main image + thumbnails side by side */}
          <div className="flex gap-3">
            <div className="flex-1">
              <div className="glass-card relative overflow-hidden rounded-[30px] bg-[#F2F2F2] p-3">
                {product.images[selectedImage] ? (
                  <div
                    className={cn(
                      "relative w-full overflow-hidden rounded-[28px] bg-[#F2F2F2] transition-all duration-300",
                      galleryExpanded ? "h-[520px]" : "h-[420px]",
                    )}
                  >
                    <Image
                      src={product.images[selectedImage].url}
                      alt={product.images[selectedImage].alt || product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 500px"
                      priority
                    />
                  </div>
                ) : (
                  <div
                    className={cn(
                      "flex w-full items-center justify-center rounded-[28px] bg-[#F2F2F2]",
                      galleryExpanded ? "h-[520px]" : "h-[420px]",
                    )}
                  >
                    <span className="text-[#A0A0A0]">Sem imagem</span>
                  </div>
                )}
                <button
                  onClick={() => setGalleryExpanded((v) => !v)}
                  className="absolute bottom-6 right-6 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/75 bg-white/85 text-[#111111] shadow-[0_10px_30px_rgba(17,17,17,0.08)] backdrop-blur-xl"
                >
                  <Maximize2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Thumbnails column */}
            {product.images.length > 1 && (
              <div className="flex w-[78px] flex-col gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImage(i)}
                    className={cn(
                      "overflow-hidden rounded-[22px] border bg-white/80 p-1 transition",
                      selectedImage === i
                        ? "border-[#E24A2B] shadow-[0_12px_30px_rgba(226,74,43,0.16)]"
                        : "border-[#E8E8E8]",
                    )}
                  >
                    <div className="relative h-[92px] w-full overflow-hidden rounded-[18px]">
                      <Image
                        src={img.url}
                        alt={img.alt || `Thumbnail ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="78px"
                      />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
        </div>
        {/* Right column: Product info + sizes + description */}
        <div className="lg:flex-1 lg:space-y-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#7A7A7A]">
              {product.brand}
            </p>
            <h1 className="mt-2 text-[2rem] font-bold leading-[1.02] tracking-[-0.05em] text-[#111111]">
              {product.name}
            </h1>
            <div className="mt-3 flex items-center justify-between gap-3">
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold tracking-[-0.04em] text-[#111111]">
                  {formatPrice(product.price)}
                </span>
                {product.compareAt && (
                  <span className="pb-1 text-sm text-[#A0A0A0] line-through">
                    {formatPrice(product.compareAt)}
                  </span>
                )}
              </div>
              {product.rating > 0 && (
                <div className="inline-flex items-center gap-1 rounded-full bg-[#FFF1ED] px-3 py-1.5 text-sm font-semibold text-[#E24A2B]">
                  <Star className="h-4 w-4 fill-current" />
                  {product.rating.toFixed(1).replace(".", ",")}
                  {product.reviewCount > 0 && (
                    <span className="text-[#B66655]">
                      ({product.reviewCount})
                    </span>
                  )}
                </div>
              )}
            </div>
            <p className="mt-2 text-sm text-[#7A7A7A]">
              {product.category.name}
            </p>
          </div>

          {/* Size selector in Surface card */}
          {product.sizes.length > 0 && product.sizes[0] !== "ONE SIZE" && (
            <div className="glass-card rounded-[30px] p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-base font-semibold text-[#111111]">
                  Selecione o tamanho:
                </h2>
                <button className="text-sm font-semibold text-[#E24A2B]">
                  Guia de tamanhos
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "rounded-full border px-5 py-3 text-sm font-semibold transition",
                      selectedSize === size
                        ? "border-[#E24A2B] bg-[#F8E7EC] text-[#111111]"
                        : "border-[#E8E8E8] bg-white text-[#111111]",
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Description in Surface card */}
          <div className="glass-card rounded-[30px] p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-base font-semibold text-[#111111]">
                  Descrição
                </h2>
                <p className="mt-3 text-sm leading-7 text-[#7A7A7A]">
                  {product.description}
                </p>
              </div>
              <button
                onClick={() => setExpanded((v) => !v)}
                className="shrink-0 text-sm font-semibold text-[#E24A2B]"
              >
                {expanded ? "Mostrar menos" : "Ler mais"}
              </button>
            </div>
          </div>
        </div>
        {/* close right column */}
      </div>
      {/* close desktop 2-column wrapper */}

      {/* Floating bottom bar */}
      <div className="pointer-events-none fixed bottom-5 left-0 right-0 z-40 px-4">
        <div className="pointer-events-auto mx-auto flex max-w-[480px] items-center gap-2.5 rounded-full border border-white/70 bg-white/76 p-2 shadow-[0_18px_60px_rgba(17,17,17,0.12)] backdrop-blur-2xl lg:max-w-3xl">
          <button
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFF1ED] text-[#E24A2B] transition hover:bg-[#F8E7EC]"
            title="Ajuda por IA"
          >
            <MessageCircle className="h-5 w-5" />
          </button>
          <Button
            variant="dark"
            size="md"
            className="h-11 min-w-[120px] flex-1"
            onClick={handleAddToCart}
          >
            {added ? "Adicionado!" : "Carrinho"}
          </Button>
          <Button
            variant="primary"
            size="md"
            className="h-11 min-w-[120px] flex-1"
            onClick={() => {
              handleAddToCart();
              router.push("/checkout");
            }}
          >
            Comprar
          </Button>
        </div>
      </div>
    </div>
  );
}
