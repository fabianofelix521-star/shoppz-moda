"use client";

import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { useCartStore, LocalCartItem } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";

export function CartItemRow({ item }: { item: LocalCartItem }) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="glass-card rounded-[24px] p-4 flex gap-4">
      <div className="w-20 h-24 rounded-[18px] overflow-hidden bg-[#F3F3F3] flex-shrink-0 relative">
        {item.image && (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            sizes="80px"
          />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-[#111111] truncate">
              {item.name}
            </h3>
            <p className="text-xs text-[#A0A0A0] mt-0.5">Tam: {item.size}</p>
          </div>
          <button
            onClick={() => removeItem(item.productId, item.size)}
            className="p-1 text-[#A0A0A0] hover:text-[#111111]"
          >
            <X size={16} />
          </button>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-3 bg-[#F3F3F3] rounded-full px-1 py-0.5">
            <button
              onClick={() =>
                updateQuantity(item.productId, item.size, item.quantity - 1)
              }
              className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-[#E8E8E8] transition-colors"
            >
              <Minus size={14} />
            </button>
            <span className="text-sm font-semibold w-5 text-center">
              {item.quantity}
            </span>
            <button
              onClick={() =>
                updateQuantity(item.productId, item.size, item.quantity + 1)
              }
              className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-[#E8E8E8] transition-colors"
            >
              <Plus size={14} />
            </button>
          </div>
          <span className="text-sm font-bold text-[#111111]">
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  );
}
