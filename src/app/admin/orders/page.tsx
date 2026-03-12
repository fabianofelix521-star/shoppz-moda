export const dynamic = "force-dynamic";

import { adminGetOrders } from "@/actions/admin";
import { formatPrice } from "@/lib/utils";
import { AdminOrderActions } from "./actions";

const statusLabel: Record<string, string> = {
  PENDING: "Pendente",
  PROCESSING: "Processando",
  SHIPPED: "Enviado",
  DELIVERED: "Entregue",
  CANCELLED: "Cancelado",
};

export default async function AdminOrdersPage() {
  const orders = await adminGetOrders();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Pedidos</h1>
        <span className="text-sm text-gray-500">{orders.length} total</span>
      </div>

      {/* Mobile cards */}
      <div className="lg:hidden space-y-3">
        {orders.map((order: any) => (
          <div
            key={order.id}
            className="bg-white rounded-2xl border border-gray-200 p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  #{order.id.slice(-8).toUpperCase()}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(order.createdAt).toLocaleDateString("pt-BR")}
                </p>
              </div>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  order.status === "DELIVERED"
                    ? "bg-green-100 text-green-700"
                    : order.status === "CANCELLED"
                      ? "bg-red-100 text-red-700"
                      : order.status === "SHIPPED"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {statusLabel[order.status] || order.status}
              </span>
            </div>
            <div className="text-sm text-gray-600 mb-1">
              {order.user.name} · {order.user.email}
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <span className="font-medium text-gray-900">
                  {formatPrice(order.total)}
                </span>
                <span className="text-gray-400 mx-2">·</span>
                <span className="text-gray-500">
                  {order.items.length}{" "}
                  {order.items.length === 1 ? "item" : "itens"}
                </span>
              </div>
              <AdminOrderActions
                orderId={order.id}
                currentStatus={order.status}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden lg:block bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 text-left">
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                Pedido
              </th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                Cliente
              </th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                Itens
              </th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                Total
              </th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                Status
              </th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((order: any) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <p className="text-sm font-medium text-gray-900">
                    #{order.id.slice(-8).toUpperCase()}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString("pt-BR")}
                  </p>
                </td>
                <td className="px-4 py-3">
                  <p className="text-sm text-gray-900">{order.user.name}</p>
                  <p className="text-xs text-gray-400">{order.user.email}</p>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {order.items.length}
                </td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                  {formatPrice(order.total)}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      order.status === "DELIVERED"
                        ? "bg-green-100 text-green-700"
                        : order.status === "CANCELLED"
                          ? "bg-red-100 text-red-700"
                          : order.status === "SHIPPED"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {statusLabel[order.status] || order.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <AdminOrderActions
                    orderId={order.id}
                    currentStatus={order.status}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
