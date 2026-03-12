"use client";

import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import { CartItemRow } from "@/components/cart/cart-item";
import { CartSummary } from "@/components/cart/cart-summary";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/shared/back-button";

export default function CartPage() {
  const items = useCartStore((s) => s.items);

  return (
    <div className="min-h-screen mx-auto max-w-7xl">
      <div className="flex items-center gap-3 px-5 pt-2 pb-4">
        <BackButton />
        <h1 className="text-lg font-bold text-[#111111]">Sacola de Compras</h1>
        <span className="text-sm text-[#A0A0A0] ml-auto">
          {items.length} itens
        </span>
      </div>

      {items.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title="Sua sacola está vazia"
          description="Parece que você ainda não adicionou nada"
        >
          <Link href="/products">
            <Button variant="primary" size="lg">
              Começar a Comprar
            </Button>
          </Link>
        </EmptyState>
      ) : (
        <div className="px-5 pb-36 lg:pb-10 lg:flex lg:gap-8">
          <div className="space-y-3 lg:flex-1">
            {items.map((item) => (
              <CartItemRow key={`${item.productId}-${item.size}`} item={item} />
            ))}
          </div>

          <div className="mt-3 lg:mt-0 lg:w-80 lg:shrink-0 space-y-4">
            <CartSummary />
            <Link href="/checkout">
              <Button variant="primary" size="lg" className="w-full mt-4">
                Finalizar Compra
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
