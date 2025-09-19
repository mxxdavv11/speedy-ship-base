import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Truck, RotateCcw, BarChart3, Shield, Clock } from "lucide-react";

const services = [
  {
    icon: Package,
    title: "Складские услуги",
    description: "Безопасное хранение товаров на современных складах с контролем температуры и влажности"
  },
  {
    icon: BarChart3,
    title: "Обработка заказов",
    description: "Быстрая комплектация и упаковка заказов с интеграцией в ваши системы"
  },
  {
    icon: Truck,
    title: "Доставка",
    description: "Отправка по всей России через проверенных партнеров с отслеживанием"
  },
  {
    icon: RotateCcw,
    title: "Возвраты",
    description: "Полный цикл обработки возвратов и обмена товаров"
  },
  {
    icon: Shield,
    title: "Страхование",
    description: "Полное страхование груза от повреждений и утери"
  },
  {
    icon: Clock,
    title: "24/7 поддержка",
    description: "Круглосуточная техническая поддержка и мониторинг процессов"
  }
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-gradient-subtle">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Наши услуги
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Комплексное решение для вашей логистики от приемки товара до доставки клиенту
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-card transition-all duration-300 hover:-translate-y-2 border-0 bg-card/50 backdrop-blur">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;