export const dynamic = "force-dynamic";

import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/shared/back-button";
import {
  Package,
  Heart,
  MapPin,
  Settings,
  LogOut,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  const user = session.user;
  const isAdmin = (user as Record<string, unknown>).role === "ADMIN";

  const menuItems = [
    { href: "/orders", icon: Package, label: "Meus Pedidos" },
    { href: "/favorites", icon: Heart, label: "Favoritos" },
    { href: "/profile", icon: MapPin, label: "Endereços" },
    { href: "/profile", icon: Settings, label: "Configurações" },
  ];

  return (
    <div className="min-h-screen mx-auto max-w-3xl space-y-4">
      <div className="flex items-center gap-3 px-5 pt-2 pb-0">
        <BackButton />
        <h1 className="text-lg font-bold text-[#111111]">Perfil</h1>
      </div>

      {/* User info */}
      <div className="px-5 pb-6">
        <div className="glass-card flex items-center gap-4 rounded-[24px] p-5">
          <div className="w-14 h-14 rounded-full bg-[#E24A2B] flex items-center justify-center text-white text-xl font-bold">
            {user.name?.charAt(0) || "U"}
          </div>
          <div>
            <h2 className="text-base font-bold text-[#111111]">{user.name}</h2>
            <p className="text-sm text-[#7A7A7A]">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="px-5 space-y-1">
        {menuItems.map(({ href, icon: Icon, label }) => (
          <Link
            key={label}
            href={href}
            className="flex items-center gap-3 px-4 py-3.5 rounded-2xl hover:bg-[#FFF1ED] transition-colors"
          >
            <Icon size={20} className="text-[#7A7A7A]" />
            <span className="text-sm font-medium text-[#111111] flex-1">
              {label}
            </span>
            <ChevronRight size={16} className="text-[#A0A0A0]" />
          </Link>
        ))}

        {isAdmin && (
          <Link
            href="/admin"
            className="flex items-center gap-3 px-4 py-3.5 rounded-2xl hover:bg-[#FFF1ED] transition-colors"
          >
            <ShieldCheck size={20} className="text-[#E24A2B]" />
            <span className="text-sm font-medium text-[#E24A2B] flex-1">
              Painel Admin
            </span>
            <ChevronRight size={16} className="text-[#A0A0A0]" />
          </Link>
        )}

        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <button
            type="submit"
            className="flex items-center gap-3 px-4 py-3.5 rounded-2xl hover:bg-[#FFF1ED] transition-colors w-full text-left"
          >
            <LogOut size={20} className="text-[#7A7A7A]" />
            <span className="text-sm font-medium text-[#111111]">Sair</span>
          </button>
        </form>
      </div>
    </div>
  );
}
