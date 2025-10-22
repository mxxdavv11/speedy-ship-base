import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Package, Gift, Truck, RefreshCw, CheckCircle2 } from "lucide-react";
import { ModernCard } from "@/components/ModernCard";

const COLORS = {
  pink: "#FF2E92",
  purple: "#5A0B7A",
  dark: "#1E1B4B",
  lightBg: "#F9FAFB"
};

const SERVICES = [
  {
    icon: Package,
    title: "Складские услуги",
    description: "Профессиональное хранение товаров на современном складе с системой WMS",
    features: [
      "Хранение на паллетах и стеллажах",
      "Контроль температурного режима",
      "24/7 видеонаблюдение",
      "Онлайн-мониторинг остатков",
      "Инвентаризация и отчетность"
    ],
    pricing: "от 40 ₽/короб в день"
  },
  {
    icon: Gift,
    title: "Упаковка заказов",
    description: "Качественная упаковка товаров с соблюдением всех требований маркетплейсов",
    features: [
      "Упаковка в BOPP-пакеты",
      "Упаковка в zip-lock пакеты",
      "Формирование бандлов",
      "Маркировка Честный ЗНАК",
      "Подготовка к FBO/FBS"
    ],
    pricing: "от 7 ₽/товар"
  },
  {
    icon: Truck,
    title: "Доставка",
    description: "Быстрая и надежная доставка до складов маркетплейсов и конечных покупателей",
    features: [
      "Доставка до WB, Ozon, Яндекс",
      "Консолидация грузов",
      "Экспресс-доставка",
      "Доставка по России",
      "Трекинг отправлений"
    ],
    pricing: "от 400 ₽/м³"
  },
  {
    icon: RefreshCw,
    title: "Обработка возвратов",
    description: "Полный цикл обработки возвратов с маркетплейсов",
    features: [
      "Приемка возвратов",
      "Контроль качества товара",
      "Дефектовка и фото",
      "Перемаркировка",
      "Возврат в оборот"
    ],
    pricing: "от 50 ₽/товар"
  }
];

export default function Services() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.lightBg }}>
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-lg font-semibold hover:opacity-80 transition-opacity"
              style={{ color: COLORS.dark }}
            >
              <ArrowLeft className="w-5 h-5" />
              Полка+
            </button>
            <button 
              onClick={() => navigate('/contact')}
              className="px-6 py-2.5 rounded-xl font-medium text-white transition-all hover:scale-105"
              style={{ background: `linear-gradient(135deg, ${COLORS.pink} 0%, ${COLORS.purple} 100%)` }}
            >
              Связаться с нами
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/10 via-primary-violet/10 to-accent-green/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Наши услуги
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Комплексные решения для вашего бизнеса на маркетплейсах
          </p>
        </div>
      </section>

      {/* Услуги */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pb-20">
        <div className="space-y-12">
          {SERVICES.map((service, idx) => (
            <ModernCard key={idx} glass className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold mb-3">{service.title}</h2>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <div className="text-2xl font-bold text-primary">{service.pricing}</div>
                </div>
                
                <div className="lg:col-span-2">
                  <h3 className="font-semibold mb-4 text-lg">Что входит в услугу:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {service.features.map((feature, featureIdx) => (
                      <div key={featureIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-accent-green mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button 
                    onClick={() => navigate('/contact')}
                    className="mt-6 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity font-medium"
                  >
                    Заказать услугу
                  </button>
                </div>
              </div>
            </ModernCard>
          ))}
        </div>

        {/* Дополнительные услуги */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-12">Дополнительные услуги</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Фотосъемка товаров", description: "Профессиональная предметная съемка", price: "от 150 ₽/SKU" },
              { title: "Создание поставок", description: "Формирование документов для МП", price: "от 10 ₽" },
              { title: "Аудит товаров", description: "Контроль качества и остатков", price: "от 100 ₽/месяц" }
            ].map((addon, idx) => (
              <ModernCard key={idx} className="p-6">
                <h3 className="font-semibold mb-2">{addon.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{addon.description}</p>
                <div className="text-lg font-bold text-primary">{addon.price}</div>
              </ModernCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-primary py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Нужна консультация?
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Оставьте заявку, и наши специалисты помогут подобрать оптимальный пакет услуг
          </p>
          <button 
            onClick={() => navigate('/contact')}
            className="px-8 py-3 rounded-xl bg-white text-primary font-semibold hover:scale-105 transition-transform"
          >
            Получить консультацию
          </button>
        </div>
      </section>
    </div>
  );
}
