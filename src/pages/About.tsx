import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Users, Target, Award, TrendingUp, MapPin, Clock } from "lucide-react";
import { ModernCard } from "@/components/ModernCard";

const COLORS = {
  pink: "#FF2E92",
  purple: "#5A0B7A",
  dark: "#1E1B4B",
  lightBg: "#F9FAFB"
};

export default function About() {
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
              onClick={() => navigate('/')}
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
            О компании Полка+
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Современный фулфилмент-оператор в Самаре, который помогает бизнесу расти на маркетплейсах
          </p>
        </div>
      </section>

      {/* Основная информация */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold mb-6">Кто мы?</h2>
            <p className="text-muted-foreground text-lg mb-4">
              Полка+ — это команда профессионалов, которая занимается комплексной логистикой для маркетплейсов. 
              Мы взяли на себя все сложности работы с Wildberries, Ozon и другими площадками, чтобы вы могли 
              сосредоточиться на развитии своего бизнеса.
            </p>
            <p className="text-muted-foreground text-lg mb-4">
              Наш современный складской комплекс в Самаре оснащен передовыми технологиями учета и хранения товаров.
              Мы гарантируем сохранность вашей продукции и оперативную обработку заказов.
            </p>
          </div>
          
          <ModernCard glass className="p-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Локация</h3>
                  <p className="text-muted-foreground">Самара, удобный доступ к транспортным узлам</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent-green/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-accent-green" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Режим работы</h3>
                  <p className="text-muted-foreground">24/7 обработка и мониторинг заказов</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-violet/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-primary-violet" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Команда</h3>
                  <p className="text-muted-foreground">Более 50 опытных специалистов</p>
                </div>
              </div>
            </div>
          </ModernCard>
        </div>

        {/* Наши ценности */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Наши ценности</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ModernCard className="p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Точность</h3>
              <p className="text-muted-foreground">
                Мы гарантируем 99.9% точность при обработке заказов и инвентаризации товаров
              </p>
            </ModernCard>
            
            <ModernCard className="p-6 text-center">
              <div className="w-16 h-16 bg-accent-green/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-accent-green" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Рост</h3>
              <p className="text-muted-foreground">
                Мы растем вместе с вашим бизнесом, масштабируя мощности под ваши потребности
              </p>
            </ModernCard>
            
            <ModernCard className="p-6 text-center">
              <div className="w-16 h-16 bg-primary-violet/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-primary-violet" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Качество</h3>
              <p className="text-muted-foreground">
                Высокие стандарты обслуживания и индивидуальный подход к каждому клиенту
              </p>
            </ModernCard>
          </div>
        </div>

        {/* Наши достижения */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "1000+", label: "Обработанных заказов в день" },
            { value: "500+", label: "Довольных клиентов" },
            { value: "5000м²", label: "Складских площадей" },
            { value: "99.9%", label: "Точность обработки" }
          ].map((stat, idx) => (
            <ModernCard key={idx} glass className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </ModernCard>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-primary py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Готовы начать сотрудничество?
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Оставьте заявку, и мы свяжемся с вами в течение часа
          </p>
          <button 
            onClick={() => navigate('/')}
            className="px-8 py-3 rounded-xl bg-white text-primary font-semibold hover:scale-105 transition-transform"
          >
            Оставить заявку
          </button>
        </div>
      </section>
    </div>
  );
}
