"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function BackButton({ className }: { className?: string }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className={cn(
        "flex items-center justify-center w-10 h-10 rounded-full glass-card hover:scale-105 transition-all active:scale-95",
        className,
      )}
      aria-label="Voltar"
    >
      <ArrowLeft size={20} className="text-[#111111]" />
    </button>
  );
}
