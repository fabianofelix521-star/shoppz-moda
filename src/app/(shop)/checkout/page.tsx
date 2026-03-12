"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart-store";
import { CartSummary } from "@/components/cart/cart-summary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BackButton } from "@/components/shared/back-button";
import { createOrder } from "@/actions/orders";
import { CheckCircle } from "lucide-react";

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setLoading(true);
    setError("");

    try {
      await createOrder(
        items.map((i) => ({
          productId: i.productId,
          size: i.size,
          quantity: i.quantity,
        })),
      );
      clearCart();
      setSuccess(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Algo deu errado";
      if (message === "Unauthorized") {
        router.push("/auth/login?redirect=/checkout");
        return;
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-5 text-center mx-auto max-w-3xl">
        <div className="w-20 h-20 rounded-full bg-[#FFF1ED] flex items-center justify-center mb-6">
          <CheckCircle size={40} className="text-[#E24A2B]" />
        </div>
        <h1 className="text-2xl font-bold text-[#111111] mb-2">
          Pedido Realizado!
        </h1>
        <p className="text-sm text-[#7A7A7A] mb-8">
          Obrigado pela sua compra. Seu pedido está sendo processado.
        </p>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => router.push("/orders")}>
            Ver Pedidos
          </Button>
          <Button variant="primary" onClick={() => router.push("/products")}>
            Continuar Comprando
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mx-auto max-w-3xl">
      <div className="flex items-center gap-3 px-5 pt-2 pb-4">
        <BackButton />
        <h1 className="text-lg font-bold text-[#111111]">Finalizar Compra</h1>
      </div>

      <div className="px-5 space-y-6 pb-36">
        {/* Shipping info */}
        <div className="glass-card rounded-[24px] p-5 space-y-4">
          <h2 className="text-sm font-semibold text-[#111111]">
            Endereço de Entrega
          </h2>
          <Input placeholder="Nome Completo" defaultValue="" />
          <Input placeholder="Endereço" defaultValue="" />
          <div className="grid grid-cols-2 gap-3">
            <Input placeholder="Cidade" defaultValue="" />
            <Input placeholder="Estado" defaultValue="" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input placeholder="CEP" defaultValue="" />
            <Input placeholder="País" defaultValue="BR" />
          </div>
        </div>

        {/* Payment info (mock) */}
        <div className="glass-card rounded-[24px] p-5 space-y-4">
          <h2 className="text-sm font-semibold text-[#111111]">Pagamento</h2>
          <Input placeholder="Número do Cartão" defaultValue="" />
          <div className="grid grid-cols-2 gap-3">
            <Input placeholder="MM/YY" defaultValue="12/28" />
            <Input placeholder="CVC" defaultValue="123" />
          </div>
        </div>

        {/* Summary */}
        <CartSummary />

        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={handleCheckout}
          disabled={loading || items.length === 0}
        >
          {loading ? "Processando..." : "Finalizar Pedido"}
        </Button>
      </div>
    </div>
  );
}
