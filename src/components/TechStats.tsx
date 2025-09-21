import { useEffect, useState } from "react";
import { ModernCard } from "./ModernCard";
import { TechBadge } from "./TechBadge";
import { Activity, Shield, Zap, TrendingUp } from "lucide-react";

export const TechStats = () => {
  const [uptime, setUptime] = useState(99.9);
  const [processed, setProcessed] = useState(1247);
  const [satisfaction, setSatisfaction] = useState(98.7);

  useEffect(() => {
    const interval = setInterval(() => {
      setProcessed(prev => prev + Math.floor(Math.random() * 3));
      setUptime(prev => Math.min(99.99, prev + Math.random() * 0.01));
      setSatisfaction(prev => Math.min(100, prev + Math.random() * 0.1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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
    <div className="fixed bottom-20 left-6 z-40">
      <ModernCard glass className="p-4 w-64 animate-slide-up">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 bg-accent-green rounded-full animate-pulse"></div>
          <TechBadge className="text-xs font-mono">Live Stats</TechBadge>
        </div>
        
        <div className="space-y-3">
          {stats.map((stat, index) => (
            <div key={stat.label} className={`flex items-center gap-3 p-2 rounded-lg ${stat.gradient}`}>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
              <div className="flex-1">
                <div className="text-xs text-muted-foreground">{stat.label}</div>
                <div className="font-mono font-bold">
                  {stat.value}{stat.suffix}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ModernCard>
    </div>
  );
};