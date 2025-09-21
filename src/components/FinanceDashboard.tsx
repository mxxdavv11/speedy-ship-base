import { TrendingUp, TrendingDown, DollarSign, Package, Users, BarChart3 } from "lucide-react";
import { ModernCard } from "./ModernCard";
import { TechBadge } from "./TechBadge";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ComponentType<any>;
}

const MetricCard = ({ title, value, change, isPositive, icon: Icon }: MetricCardProps) => (
  <ModernCard className="p-6 hover:shadow-glow transition-all">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-3xl font-bold mt-1">{value}</p>
        <div className="flex items-center mt-2">
          {isPositive ? (
            <TrendingUp className="w-4 h-4 text-accent-green mr-1" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
          )}
          <span className={`text-sm ${isPositive ? 'text-accent-green' : 'text-red-500'}`}>
            {change}
          </span>
        </div>
      </div>
      <div className="w-12 h-12 bg-gradient-primary/10 rounded-xl flex items-center justify-center">
        <Icon className="w-6 h-6 text-primary" />
      </div>
    </div>
  </ModernCard>
);

export const FinanceDashboard = ({ userRole }: { userRole: string }) => {
  const metrics = [
    {
      title: "Общий доход",
      value: "₽2,847,392",
      change: "+12.5%",
      isPositive: true,
      icon: DollarSign
    },
    {
      title: "Заказов обработано",
      value: "1,247",
      change: "+8.1%",
      isPositive: true,
      icon: Package
    },
    {
      title: "Активных клиентов",
      value: "342",
      change: "+23.7%",
      isPositive: true,
      icon: Users
    },
    {
      title: "Средний чек",
      value: "₽2,284",
      change: "-3.2%",
      isPositive: false,
      icon: BarChart3
    }
  ];

  const recentOrders = [
    { id: "ORD-2024-001", client: "ИП Иванов", amount: "₽45,320", status: "completed", date: "2024-01-15" },
    { id: "ORD-2024-002", client: "ООО Техносфера", amount: "₽123,450", status: "processing", date: "2024-01-14" },
    { id: "ORD-2024-003", client: "Мегамаркет", amount: "₽78,900", status: "shipped", date: "2024-01-13" },
    { id: "ORD-2024-004", client: "Wildberries", amount: "₽234,560", status: "completed", date: "2024-01-12" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-accent-green bg-accent-green/10';
      case 'processing': return 'text-primary-blue bg-primary-blue/10';
      case 'shipped': return 'text-accent-orange bg-accent-orange/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Завершен';
      case 'processing': return 'В обработке';
      case 'shipped': return 'Отправлен';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Финансовая аналитика
          </h2>
          <p className="text-muted-foreground mt-1">
            {userRole === 'Владелец' ? 'Полный обзор доходов и расходов' : 'Ваши показатели работы'}
          </p>
        </div>
        <TechBadge variant="glow">Live</TechBadge>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={metric.title} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
            <MetricCard {...metric} />
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <ModernCard glass className="p-6">
          <h3 className="text-xl font-semibold mb-4">Доходы по месяцам</h3>
          <div className="space-y-3">
            {[
              { month: "Январь", amount: 890000, percentage: 85 },
              { month: "Декабрь", amount: 750000, percentage: 72 },
              { month: "Ноябрь", amount: 680000, percentage: 65 },
              { month: "Октябрь", amount: 920000, percentage: 88 },
            ].map((item) => (
              <div key={item.month} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-gradient-primary rounded-full"></div>
                  <span className="font-medium">{item.month}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-primary rounded-full transition-all duration-1000"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <span className="font-mono text-sm font-semibold min-w-[80px] text-right">
                    ₽{item.amount.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ModernCard>

        {/* Top Categories */}
        <ModernCard glass className="p-6">
          <h3 className="text-xl font-semibold mb-4">Топ категории</h3>
          <div className="space-y-4">
            {[
              { category: "Электроника", revenue: "₽1,234,567", growth: "+15.3%", color: "bg-primary-blue" },
              { category: "Одежда", revenue: "₽987,432", growth: "+8.7%", color: "bg-primary-violet" },
              { category: "Дом и сад", revenue: "₽756,891", growth: "+22.1%", color: "bg-accent-green" },
              { category: "Спорт", revenue: "₽543,210", growth: "-2.3%", color: "bg-accent-orange" },
            ].map((item, index) => (
              <div key={item.category} className="flex items-center justify-between p-3 rounded-lg bg-surface-light/50">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 ${item.color} rounded-full opacity-80`}></div>
                  <div>
                    <p className="font-medium">{item.category}</p>
                    <p className="text-sm text-muted-foreground">{item.revenue}</p>
                  </div>
                </div>
                <span className={`text-sm font-mono ${item.growth.startsWith('+') ? 'text-accent-green' : 'text-red-500'}`}>
                  {item.growth}
                </span>
              </div>
            ))}
          </div>
        </ModernCard>
      </div>

      {/* Recent Orders */}
      <ModernCard glass className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Последние заказы</h3>
          <button className="text-primary hover:text-primary/80 text-sm font-medium">
            Посмотреть все →
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-3 px-2 font-medium text-muted-foreground">ID заказа</th>
                <th className="text-left py-3 px-2 font-medium text-muted-foreground">Клиент</th>
                <th className="text-left py-3 px-2 font-medium text-muted-foreground">Сумма</th>
                <th className="text-left py-3 px-2 font-medium text-muted-foreground">Статус</th>
                <th className="text-left py-3 px-2 font-medium text-muted-foreground">Дата</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-border/20 hover:bg-surface-light/30 transition-colors">
                  <td className="py-4 px-2 font-mono text-sm">{order.id}</td>
                  <td className="py-4 px-2 font-medium">{order.client}</td>
                  <td className="py-4 px-2 font-mono font-semibold">{order.amount}</td>
                  <td className="py-4 px-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </td>
                  <td className="py-4 px-2 text-muted-foreground text-sm">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ModernCard>
    </div>
  );
};