import { useEffect, useState } from "react";
import { ModernCard } from "./ModernCard";
import { TechBadge } from "./TechBadge";
import { Activity, Shield, Zap, TrendingUp, X } from "lucide-react";

interface TechStatsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TechStats = ({ isOpen, onClose }: TechStatsProps) => {
  const [uptime, setUptime] = useState(99.9);
  const [processed, setProcessed] = useState(1247);
  const [satisfaction, setSatisfaction] = useState(98.7);

  useEffect(() => {
    if (!isOpen) return;
    
    const interval = setInterval(() => {
      setProcessed(prev => prev + Math.floor(Math.random() * 3));
      setUptime(prev => Math.min(99.99, prev + Math.random() * 0.01));
      setSatisfaction(prev => Math.min(100, prev + Math.random() * 0.1));
    }, 5000);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const stats = [
    {
      icon: Activity,
      label: "Uptime",
      value: uptime.toFixed(2),
      suffix: "%",
      color: "text-accent-green",
      gradient: "bg-gradient-to-r from-accent-green/20 to-accent-green/10"
    },
    {
      icon: Zap,
      label: "Заказов обработано",
      value: processed.toLocaleString(),
      suffix: "",
      color: "text-primary-blue",
      gradient: "bg-gradient-to-r from-primary-blue/20 to-primary-blue/10"
    },
    {
      icon: Shield,
      label: "Удовлетворенность",
      value: satisfaction.toFixed(1),
      suffix: "%",
      color: "text-primary-violet",
      gradient: "bg-gradient-to-r from-primary-violet/20 to-primary-violet/10"
    },
    {
      icon: TrendingUp,
      label: "Рост скорости",
      value: "156",
      suffix: "%",
      color: "text-accent-orange",
      gradient: "bg-gradient-to-r from-accent-orange/20 to-accent-orange/10"
    }
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />
      
      {/* Stats Panel */}
      <div className="fixed bottom-20 left-6 z-50 animate-slide-up">
        <ModernCard glass className="p-6 w-80">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent-green rounded-full animate-pulse"></div>
              <TechBadge className="text-sm font-mono">Live Stats</TechBadge>
            </div>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-4">
            {stats.map((stat, index) => (
              <div key={stat.label} className={`flex items-center gap-3 p-3 rounded-lg ${stat.gradient} animate-fade-in`} style={{ animationDelay: `${index * 100}ms` }}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                  <div className="font-mono font-bold text-lg">
                    {stat.value}{stat.suffix}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-border/50">
            <div className="text-xs text-muted-foreground text-center">
              Обновляется каждые 5 секунд
            </div>
          </div>
        </ModernCard>
      </div>
    </>
  );
};