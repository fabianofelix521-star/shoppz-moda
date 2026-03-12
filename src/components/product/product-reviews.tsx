"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
}

// Mock reviews for display (will be replaced by DB data later)
const mockReviews: Review[] = [
  {
    id: "1",
    author: "Maria S.",
    rating: 5,
    date: "2026-02-15",
    comment:
      "Produto incrível! A qualidade do tecido é excelente e o caimento ficou perfeito. Recomendo muito!",
  },
  {
    id: "2",
    author: "João P.",
    rating: 4,
    date: "2026-02-10",
    comment:
      "Muito bom, entrega rápida e o produto veio conforme a descrição. Só achei o tamanho um pouco grande.",
  },
  {
    id: "3",
    author: "Ana L.",
    rating: 5,
    date: "2026-01-28",
    comment:
      "Amei! Superou minhas expectativas. O acabamento é impecável e o preço está ótimo.",
  },
  {
    id: "4",
    author: "Carlos R.",
    rating: 3,
    date: "2026-01-20",
    comment:
      "O produto é bom, mas a cor é um pouco diferente da foto. No geral, estou satisfeito.",
  },
];

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={cn(
            star <= rating
              ? "fill-[#F5A623] text-[#F5A623]"
              : "fill-none text-[#D1D1D1]",
          )}
        />
      ))}
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ProductReviews({ productId }: { productId: string }) {
  const [showAll, setShowAll] = useState(false);
  const reviews = mockReviews;
  const averageRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  const displayedReviews = showAll ? reviews : reviews.slice(0, 3);

  return (
    <section className="mt-8 px-5 pb-10 mx-auto max-w-7xl">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-[#111111]">
          Avaliações dos Clientes
        </h2>
        <div className="flex items-center gap-2">
          <StarRating rating={Math.round(averageRating)} size={16} />
          <span className="text-sm font-semibold text-[#111111]">
            {averageRating.toFixed(1)}
          </span>
          <span className="text-sm text-[#7A7A7A]">
            ({reviews.length} avaliações)
          </span>
        </div>
      </div>

      {/* Rating summary bar */}
      <div className="glass-card rounded-[20px] p-5 mb-5">
        <div className="flex items-center gap-6 lg:gap-10">
          <div className="text-center">
            <p className="text-4xl font-black text-[#111111]">
              {averageRating.toFixed(1)}
            </p>
            <StarRating rating={Math.round(averageRating)} size={12} />
            <p className="text-xs text-[#7A7A7A] mt-1">
              {reviews.length} avaliações
            </p>
          </div>
          <div className="flex-1 space-y-1.5">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = reviews.filter((r) => r.rating === star).length;
              const pct =
                reviews.length > 0 ? (count / reviews.length) * 100 : 0;
              return (
                <div key={star} className="flex items-center gap-2">
                  <span className="text-xs font-medium text-[#7A7A7A] w-3">
                    {star}
                  </span>
                  <Star size={10} className="fill-[#F5A623] text-[#F5A623]" />
                  <div className="flex-1 h-2 bg-[#F3F3F3] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#F5A623] rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-xs text-[#A0A0A0] w-6 text-right">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Reviews list */}
      <div className="space-y-3">
        {displayedReviews.map((review) => (
          <div key={review.id} className="glass-card rounded-[18px] p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#FFF1ED] flex items-center justify-center text-xs font-bold text-[#E24A2B]">
                  {review.author.charAt(0)}
                </div>
                <span className="text-sm font-semibold text-[#111111]">
                  {review.author}
                </span>
              </div>
              <span className="text-xs text-[#A0A0A0]">
                {new Date(review.date).toLocaleDateString("pt-BR", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
            <StarRating rating={review.rating} />
            <p className="text-sm text-[#555555] mt-2 leading-relaxed">
              {review.comment}
            </p>
          </div>
        ))}
      </div>

      {reviews.length > 3 && !showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="mt-4 w-full py-2.5 text-sm font-medium text-[#E24A2B] border border-[#E24A2B]/20 rounded-full hover:bg-[#FFF1ED] transition-colors"
        >
          Ver todas as {reviews.length} avaliações
        </button>
      )}
    </section>
  );
}
