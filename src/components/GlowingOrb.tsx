import { cn } from "@/lib/utils";

interface GlowingOrbProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  color?: "blue" | "violet" | "green" | "orange";
}

export const GlowingOrb = ({ 
  className, 
  size = "md", 
  color = "blue" 
}: GlowingOrbProps) => {
  const sizes = {
    sm: "w-16 h-16",
    md: "w-24 h-24", 
    lg: "w-32 h-32"
  };

  const colors = {
    blue: "bg-primary-blue",
    violet: "bg-primary-violet",
    green: "bg-accent-green",
    orange: "bg-accent-orange"
  };

  return (
    <div
      className={cn(
        "rounded-full blur-3xl opacity-20 floating pulse-glow",
        sizes[size],
        colors[color],
        className
      )}
    />
  );
};