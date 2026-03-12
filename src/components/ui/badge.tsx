import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "active" | "outline";
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium transition-all cursor-pointer",
        {
          "border border-[#E8E8E8] text-[#7A7A7A] hover:border-[#111111] hover:text-[#111111]":
            variant === "default",
          "bg-[#111111] text-white": variant === "active",
          "border border-[#E8E8E8] text-[#7A7A7A] hover:border-[#111111]":
            variant === "outline",
        },
        className,
      )}
      {...props}
    />
  );
}
