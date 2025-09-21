import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ModernCardProps {
  children: ReactNode;
  className?: string;
  glass?: boolean;
  glow?: boolean;
  floating?: boolean;
}

export const ModernCard = ({ 
  children, 
  className, 
  glass = false, 
  glow = false, 
  floating = false 
}: ModernCardProps) => {
  return (
    <div
      className={cn(
        "rounded-xl border transition-spring hover:scale-[1.02]",
        glass && "glass-card",
        glow && "pulse-glow",
        floating && "floating",
        !glass && "bg-card shadow-card",
        className
      )}
    >
      {children}
    </div>
  );
};