export const dynamic = "force-dynamic";

import { adminGetDashboardStats } from "@/actions/admin";
import { formatPrice } from "@/lib/utils";
import { Package, ShoppingCart, Users, DollarSign } from "lucide-react";

export default async function AdminDashboard() {
  const stats = await adminGetDashboardStats();

  const cards = [
    {
      label: "Produtos",
      value: stats.products.toString(),
      icon: Package,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Pedidos",
      value: stats.orders.toString(),
      icon: ShoppingCart,
      color: "bg-green-50 text-green-600",
    },
    {
      label: "Usuários",
      value: stats.users.toString(),
      icon: Users,
      color: "bg-purple-50 text-purple-600",
    },
    {
      label: "Receita",
      value: formatPrice(stats.revenue),
      icon: DollarSign,
      color: "bg-orange-50 text-orange-600",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Painel Admin</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-2xl p-5 border border-gray-200"
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.color}`}
              >
                <card.icon size={20} />
              </div>
              <span className="text-sm text-gray-500 font-medium">
                {card.label}
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
