import { Sparkles } from "lucide-react";

export function EmptyState({
  icon: Icon = Sparkles,
  title,
  description,
  children,
}: {
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div className="w-20 h-20 rounded-full bg-[#FFF1ED] flex items-center justify-center mb-6">
        <Icon size={32} className="text-[#E24A2B]" />
      </div>
      <h3 className="text-lg font-semibold text-[#111111] mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-[#7A7A7A] max-w-xs mb-6">{description}</p>
      )}
      {children}
    </div>
  );
}
