import { Package, Truck, CheckCircle, AlertCircle, Clock, MapPin } from "lucide-react";
import { ModernCard } from "./ModernCard";
import { TechBadge } from "./TechBadge";

export const OrdersDashboard = ({ userRole }: { userRole: string }) => {
  const orderStats = [
    { label: "В обработке", count: 23, color: "text-primary-blue", bg: "bg-primary-blue/10", icon: Clock },
    { label: "Готовы к отправке", count: 45, color: "text-accent-orange", bg: "bg-accent-orange/10", icon: Package },
    { label: "В пути", count: 67, color: "text-primary-violet", bg: "bg-primary-violet/10", icon: Truck },
    { label: "Доставлены", count: 234, color: "text-accent-green", bg: "bg-accent-green/10", icon: CheckCircle },
  ];

  const urgentOrders = [
    {
      id: "URG-001",
      client: "Wildberries",
      type: "Срочная отправка",
      deadline: "Сегодня 18:00",
      priority: "high",
      items: 45
    },
    {
      id: "URG-002", 
      client: "Ozon",
      type: "Экспресс доставка",
      deadline: "Завтра 12:00",
      priority: "medium",
      items: 23
    },
    {
      id: "URG-003",
      client: "Яндекс.Маркет",
      type: "Возврат товара",
      deadline: "Сегодня 20:00", 
      priority: "high",
      items: 12
    },
  ];

  const warehouseActivity = [
    { area: "Зона A", activity: "Приемка товара", progress: 75, workers: 3 },
    { area: "Зона B", activity: "Упаковка заказов", progress: 92, workers: 5 },
    { area: "Зона C", activity: "Отгрузка", progress: 48, workers: 2 },
    { area: "Зона D", activity: "Инвентаризация", progress: 100, workers: 1 },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500 bg-red-50';
      case 'medium': return 'text-amber-600 bg-amber-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return 'Высокий';
      case 'medium': return 'Средний';
      case 'low': return 'Низкий';
      default: return priority;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Управление заказами
          </h2>
          <p className="text-muted-foreground mt-1">
            {userRole === 'Владелец' ? 'Полный контроль над всеми заказами' : 'Отслеживание ваших заказов'}
          </p>
        </div>
        <div className="flex gap-2">
          <TechBadge variant="accent">Активно: 135 заказов</TechBadge>
        </div>
      </div>

      {/* Order Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {orderStats.map((stat, index) => (
          <div key={stat.label} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
            <ModernCard className="p-6 hover:shadow-glow transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.count}</p>
                </div>
                <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </ModernCard>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Urgent Orders */}
        <div className="lg:col-span-2">
          <ModernCard glass className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                Срочные заказы
              </h3>
              <TechBadge variant="glow">3 активных</TechBadge>
            </div>
            
            <div className="space-y-4">
              {urgentOrders.map((order) => (
                <div key={order.id} className="p-4 rounded-xl bg-surface-light/50 border border-border/50 hover:border-primary/50 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-medium">{order.id}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(order.priority)}`}>
                        {getPriorityText(order.priority)}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">{order.items} позиций</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{order.client}</p>
                      <p className="text-sm text-muted-foreground">{order.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-red-600">До: {order.deadline}</p>
                      <button className="text-xs text-primary hover:text-primary/80">
                        Подробнее →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ModernCard>
        </div>

        {/* Warehouse Activity */}
        <ModernCard glass className="p-6">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Активность склада
          </h3>
          
          <div className="space-y-4">
            {warehouseActivity.map((area) => (
              <div key={area.area} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{area.area}</p>
                    <p className="text-sm text-muted-foreground">{area.activity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-mono">{area.progress}%</p>
                    <p className="text-xs text-muted-foreground">{area.workers} раб.</p>
                  </div>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-primary rounded-full transition-all duration-1000"
                    style={{ width: `${area.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </ModernCard>
      </div>

      {/* Order Timeline */}
      <ModernCard glass className="p-6">
        <h3 className="text-xl font-semibold mb-6">Лента заказов в реальном времени</h3>
        
        <div className="space-y-4 max-h-80 overflow-y-auto">
          {[
            { time: "14:32", action: "Новый заказ получен", client: "Wildberries", amount: "₽23,450", status: "new" },
            { time: "14:28", action: "Заказ отправлен", client: "Ozon", amount: "₽15,670", status: "shipped" },
            { time: "14:25", action: "Упаковка завершена", client: "Яндекс.Маркет", amount: "₽8,990", status: "packed" },
            { time: "14:20", action: "Оплата получена", client: "Мегамаркет", amount: "₽34,520", status: "paid" },
            { time: "14:15", action: "Товар на складе", client: "Lamoda", amount: "₽12,340", status: "received" },
            { time: "14:10", action: "Заказ доставлен", client: "AliExpress", amount: "₽7,890", status: "delivered" },
          ].map((event, index) => (
            <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-surface-light/30 transition-colors">
              <div className="flex-shrink-0">
                <div className="w-2 h-2 bg-gradient-primary rounded-full animate-pulse"></div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{event.action}</p>
                    <p className="text-sm text-muted-foreground">{event.client}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-semibold">{event.amount}</p>
                    <p className="text-xs text-muted-foreground">{event.time}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ModernCard>
    </div>
  );
};