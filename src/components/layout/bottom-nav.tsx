"use client";

import { useState, useEffect } from "react";
import { Home, Heart, ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";

const navItems = [
  { href: "/", icon: Home, label: "Início" },
  { href: "/favorites", icon: Heart, label: "Favoritos" },
  { href: "/cart", icon: ShoppingBag, label: "Sacola" },
  { href: "/profile", icon: User, label: "Perfil" },
];

export function BottomNav() {
  const pathname = usePathname();
  const count = useCartStore((s) => s.count());
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Hide on product detail pages
  if (/^\/products\/[^/]+$/.test(pathname)) return null;

  return (
    <nav className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-40px)] max-w-[calc(32rem-40px)] lg:hidden">
      <div className="glass-card flex items-center justify-around rounded-[28px] h-[64px] px-3">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 rounded-2xl transition-all relative",
                isActive
                  ? "bg-[#111111] text-white px-5 py-2"
                  : "text-[#A0A0A0] hover:text-[#7A7A7A] px-3 py-2",
              )}
            >
              <div className="relative">
                <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
                {label === "Sacola" && mounted && count > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 bg-[#E24A2B] text-white text-[10px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
                    {count}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
