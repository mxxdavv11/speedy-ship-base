import { BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsButtonProps {
  onClick: () => void;
  isActive?: boolean;
}

export const StatsButton = ({ onClick, isActive = false }: StatsButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-14 h-14 rounded-full shadow-elegant flex items-center justify-center transition-all duration-300 hover:scale-110 glass-card backdrop-blur-md group relative",
        isActive 
          ? "bg-gradient-accent pulse-glow" 
          : "bg-gradient-primary"
      )}
      aria-label="Показать живую статистику"
    >
      <BarChart3 className="w-6 h-6 text-white" />
      
      {/* Tooltip */}
      <div className="absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        {isActive ? "Скрыть статистику" : "Живая статистика"}
        <div className="absolute top-1/2 -translate-y-1/2 left-full w-2 h-2 bg-gray-900 rotate-45"></div>
      </div>
      
      {/* Live indicator */}
      {isActive && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent-green rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        </div>
      )}
    </button>
  );
};