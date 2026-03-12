"use client";

import { adminUpdateOrderStatus } from "@/actions/admin";
import { useRouter } from "next/navigation";

const statusFlow: Record<string, { next: string; label: string }> = {
  PENDING: { next: "PROCESSING", label: "Processar" },
  PROCESSING: { next: "SHIPPED", label: "Marcar Enviado" },
  SHIPPED: { next: "DELIVERED", label: "Marcar Entregue" },
};

export function AdminOrderActions({
  orderId,
  currentStatus,
}: {
  orderId: string;
  currentStatus: string;
}) {
  const router = useRouter();
  const flow = statusFlow[currentStatus];

  if (!flow) return <span className="text-xs text-gray-400">—</span>;

  return (
    <button
      onClick={async () => {
        await adminUpdateOrderStatus(orderId, flow.next);
        router.refresh();
      }}
      className="text-xs font-medium text-blue-600 hover:underline"
    >
      {flow.label}
    </button>
  );
}
