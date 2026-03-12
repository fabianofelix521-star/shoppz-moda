"use client";

import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";

export function CartSummary() {
  const items = useCartStore((s) => s.items);
  const total = useCartStore((s) => s.total());

  const subtotal = total;
  const shipping = subtotal > 200 ? 0 : 15;
  const grandTotal = subtotal + shipping;

  return (
    <div className="space-y-3 glass-card rounded-[24px] p-5">
      <div className="flex justify-between text-sm text-[#7A7A7A]">
        <span>Subtotal ({items.length} itens)</span>
        <span>{formatPrice(subtotal)}</span>
      </div>
      <div className="flex justify-between text-sm text-[#7A7A7A]">
        <span>Envio</span>
        <span>{shipping === 0 ? "Grátis" : formatPrice(shipping)}</span>
      </div>
      <div className="border-t border-[#E8E8E8] pt-3 flex justify-between">
        <span className="text-base font-bold text-[#111111]">Total</span>
        <span className="text-base font-bold text-[#111111]">
          {formatPrice(grandTotal)}
        </span>
      </div>
    </div>
  );
}
