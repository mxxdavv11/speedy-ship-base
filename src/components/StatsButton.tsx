import { BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";
interface StatsButtonProps {
  onClick: () => void;
  isActive?: boolean;
}
export const StatsButton = ({
  onClick,
  isActive = false
}: StatsButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "fixed bottom-24 right-6 z-40 p-4 rounded-full shadow-lg transition-all duration-300",
        "bg-primary text-primary-foreground hover:scale-110",
        isActive && "ring-4 ring-primary/50"
      )}
      aria-label="Statistics"
    >
      <BarChart3 className="w-6 h-6" />
    </button>
  );
};