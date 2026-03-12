"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  FolderOpen,
  Image,
  ShoppingCart,
  ArrowLeft,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", icon: LayoutDashboard, label: "Painel" },
  { href: "/admin/products", icon: Package, label: "Produtos" },
  { href: "/admin/categories", icon: FolderOpen, label: "Categorias" },
  { href: "/admin/banners", icon: Image, label: "Banners" },
  { href: "/admin/orders", icon: ShoppingCart, label: "Pedidos" },
  { href: "/admin/settings", icon: Settings, label: "Configurações" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const sidebarContent = (
    <>
      <Link
        href="/"
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6 px-3"
      >
        <ArrowLeft size={16} />
        Voltar à Loja
      </Link>

      <h2 className="text-lg font-bold text-gray-900 px-3 mb-4">Admin</h2>

      <nav className="space-y-1">
        {links.map(({ href, icon: Icon, label }) => {
          const isActive =
            href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                isActive
                  ? "bg-gray-900 text-white"
                  : "text-gray-600 hover:bg-gray-100",
              )}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>
    </>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setOpen(true)}
          className="p-1.5 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <Menu size={22} className="text-gray-700" />
        </button>
        <span className="text-sm font-bold text-gray-900">Admin</span>
        <Link href="/" className="text-xs text-gray-500">
          Loja
        </Link>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-white p-4 flex flex-col shadow-xl">
            <button
              onClick={() => setOpen(false)}
              className="self-end mb-2 p-1.5 rounded-xl hover:bg-gray-100"
            >
              <X size={20} className="text-gray-500" />
            </button>
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-56 bg-white border-r border-gray-200 p-4 flex-col">
        {sidebarContent}
      </aside>
    </>
  );
}
