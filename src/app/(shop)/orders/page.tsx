export const dynamic = "force-dynamic";

import { getOrders } from "@/actions/orders";
import { BackButton } from "@/components/shared/back-button";
import { EmptyState } from "@/components/shared/empty-state";
import { formatPrice } from "@/lib/utils";
import { OrderItem } from "@/types";
import { Package } from "lucide-react";
import Image from "next/image";

export default async function OrdersPage() {
  const orders = await getOrders();

  return (
    <div className="min-h-screen mx-auto max-w-3xl space-y-4">
      <div className="flex items-center gap-3 px-5 pt-2 pb-0">
        <BackButton />
        <h1 className="text-lg font-bold text-[#111111]">Meus Pedidos</h1>
      </div>

      {orders.length === 0 ? (
        <EmptyState
          icon={Package}
          title="Nenhum pedido ainda"
          description="Seu histórico de pedidos aparecerá aqui"
        />
      ) : (
        <div className="px-5 space-y-4 pb-8 -mt-1">
          {orders.map((order) => (
            <div
              key={order.id}
              className="glass-card rounded-[24px] p-4 space-y-3"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-[#A0A0A0] font-medium">
                    Pedido #{order.id.slice(-8).toUpperCase()}
                  </p>
                  <p className="text-xs text-[#A0A0A0]">
                    {new Date(order.createdAt).toLocaleDateString("pt-BR", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <span className="text-xs font-semibold bg-[#FFF1ED] text-[#E24A2B] px-3 py-1 rounded-full capitalize">
                  {order.status.toLowerCase()}
                </span>
              </div>

              <div className="flex gap-2 overflow-x-auto">
                {order.items.map((item: OrderItem) => (
                  <div
                    key={item.id}
                    className="w-16 h-16 rounded-xl overflow-hidden bg-[#F3F3F3] flex-shrink-0 relative"
                  >
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-[#E8E8E8]">
                <span className="text-xs text-[#7A7A7A]">
                  {order.items.length} itens
                </span>
                <span className="text-sm font-bold text-[#111111]">
                  {formatPrice(order.total)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
