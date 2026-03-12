import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "dark" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-semibold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none rounded-full",
          {
            "bg-[#E24A2B] text-white hover:bg-[#c9401f] shadow-lg shadow-[#E24A2B]/25":
              variant === "primary",
            "bg-[#111111] text-white hover:bg-[#222222] shadow-lg shadow-black/15":
              variant === "secondary" || variant === "dark",
            "border border-[#E8E8E8] bg-white text-[#111111] hover:bg-[#fafafa]":
              variant === "outline",
            "bg-transparent text-[#7A7A7A] hover:bg-[#F8E7EC]/50":
              variant === "ghost",
            "bg-red-600 text-white hover:bg-red-700": variant === "danger",
          },
          {
            "text-xs px-3.5 py-1.5": size === "sm",
            "text-sm px-5 py-2.5": size === "md",
            "text-base px-8 py-3.5": size === "lg",
            "p-2.5": size === "icon",
          },
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
export { Button };
