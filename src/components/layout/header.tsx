"use client";

import { useState, useEffect } from "react";
import { Search, Heart, ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cart-store";
import { cn } from "@/lib/utils";

const desktopNav = [
  { href: "/", label: "Início" },
  { href: "/products?category=women", label: "Feminino" },
  { href: "/products?category=men", label: "Masculino" },
  { href: "/products?category=accessories", label: "Acessórios" },
  { href: "/products?category=shoes", label: "Calçados" },
];

export function Header({ logoUrl }: { logoUrl?: string }) {
  const pathname = usePathname();
  const count = useCartStore((s) => s.count());
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-40 glass-card rounded-none border-x-0 border-t-0">
      <div className="flex items-center justify-between px-5 py-4 mx-auto max-w-7xl">
        <Link href="/" className="flex items-center gap-1">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt="Logo"
              className="h-9 w-auto object-contain"
            />
          ) : (
            <span className="text-xl font-bold text-[#111111] tracking-tight">
              shoppz moda
            </span>
          )}
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {desktopNav.map(({ href, label }) => {
            const isActive =
              href === "/"
                ? pathname === "/"
                : pathname.startsWith(href.split("?")[0]);
            return (
              <Link
                key={label}
                href={href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  isActive
                    ? "text-[#E24A2B]"
                    : "text-[#7A7A7A] hover:text-[#111111]",
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {/* Desktop icons */}
          <Link
            href="/products?q="
            className="hidden lg:flex w-9 h-9 items-center justify-center rounded-full hover:bg-[#FFF1ED] transition-colors"
          >
            <Search size={18} className="text-[#111111]" />
          </Link>
          <Link
            href="/favorites"
            className="hidden lg:flex w-9 h-9 items-center justify-center rounded-full hover:bg-[#FFF1ED] transition-colors"
          >
            <Heart size={18} className="text-[#111111]" />
          </Link>
          <Link
            href="/cart"
            className="hidden lg:flex w-9 h-9 items-center justify-center rounded-full hover:bg-[#FFF1ED] transition-colors relative"
          >
            <ShoppingBag size={18} className="text-[#111111]" />
            {mounted && count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#E24A2B] text-white text-[10px] font-bold rounded-full min-w-4 h-4 flex items-center justify-center px-1">
                {count}
              </span>
            )}
          </Link>
          <Link
            href="/profile"
            className="hidden lg:flex w-9 h-9 items-center justify-center rounded-full hover:bg-[#FFF1ED] transition-colors"
          >
            <User size={18} className="text-[#111111]" />
          </Link>

          {/* Mobile icons */}
          <Link
            href="/cart"
            className="flex lg:hidden w-9 h-9 items-center justify-center rounded-full hover:bg-[#FFF1ED] transition-colors relative"
          >
            <ShoppingBag size={18} className="text-[#111111]" />
            {mounted && count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#E24A2B] text-white text-[10px] font-bold rounded-full min-w-4 h-4 flex items-center justify-center px-1">
                {count}
              </span>
            )}
          </Link>
          <Link
            href="/profile"
            className="flex lg:hidden w-9 h-9 items-center justify-center rounded-full hover:bg-[#FFF1ED] transition-colors"
          >
            <User size={18} className="text-[#111111]" />
          </Link>
        </div>
      </div>
    </header>
  );
}
