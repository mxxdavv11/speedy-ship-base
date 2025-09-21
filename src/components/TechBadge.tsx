import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TechBadgeProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "accent" | "glow";
}

export const TechBadge = ({ children, className, variant = "default" }: TechBadgeProps) => {
  const variants = {
    default: "bg-surface-light text-foreground border border-border",
    accent: "bg-gradient-accent text-white shadow-card",
    glow: "bg-primary text-primary-foreground pulse-glow"
  };

  return (
    <div
      className={cn(
        "inline-flex items-center px-4 py-2 rounded-full text-sm font-mono font-medium transition-smooth hover:scale-105",
        variants[variant],
        className
      )}
    >
      {children}
    </div>
  );
};