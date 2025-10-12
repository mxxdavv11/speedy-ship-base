import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, User, ArrowRight } from "lucide-react";
import { ModernCard } from "@/components/ModernCard";

const COLORS = {
  pink: "#FF2E92",
  purple: "#5A0B7A",
  dark: "#1E1B4B",
  lightBg: "#F9FAFB"
};

const BLOG_POSTS = [
  {
    id: 1,
    title: "Как выбрать фулфилмент-оператора для маркетплейсов",
    excerpt: "Разбираем ключевые критерии выбора фулфилмент-партнера и на что обратить внимание при принятии решения.",
    date: "15 марта 2025",
    author: "Команда Полка+",
    category: "Советы",
    readTime: "5 мин"
  },
  {
    id: 2,
    title: "Тренды e-commerce 2025: что ждет маркетплейсы",
    excerpt: "Анализируем главные тренды электронной коммерции и делимся прогнозами развития маркетплейсов в России.",
    date: "10 марта 2025",
    author: "Аналитический отдел",
    category: "Аналитика",
    readTime: "7 мин"
  },
  {
    id: 3,
    title: "Оптимизация логистики: как сократить расходы на 30%",
    excerpt: "Практические советы по оптимизации логистических процессов и снижению затрат на доставку.",
    date: "5 марта 2025",
    author: "Отдел логистики",
    category: "Кейсы",
    readTime: "6 мин"
  },
  {
    id: 4,
    title: "Упаковка товаров для маркетплейсов: лучшие практики",
    excerpt: "Как правильно упаковывать товары для Wildberries и Ozon, чтобы минимизировать возвраты и повысить лояльность.",
    date: "1 марта 2025",
    author: "Отдел упаковки",
    category: "Советы",
    readTime: "4 мин"
  },
  {
    id: 5,
    title: "Интеграция с API маркетплейсов: автоматизация процессов",
    excerpt: "Рассказываем, как автоматизировать работу с Wildberries и Ozon через API и какие преимущества это дает.",
    date: "25 февраля 2025",
    author: "IT-отдел",
    category: "Технологии",
    readTime: "8 мин"
  },
  {
    id: 6,
    title: "Сезонные колебания спроса: как подготовиться к пикам",
    excerpt: "Делимся опытом подготовки к праздничным периодам и сезонным всплескам заказов на маркетплейсах.",
    date: "20 февраля 2025",
    author: "Команда Полка+",
    category: "Кейсы",
    readTime: "5 мин"
  }
];

export default function Blog() {
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
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/10 via-primary-violet/10 to-accent-green/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Блог Полка+
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Полезные статьи о фулфилменте, логистике и работе с маркетплейсами
          </p>
        </div>
      </section>

      {/* Статьи */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <ModernCard key={post.id} className="p-6 hover:shadow-elegant transition-all cursor-pointer group">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                  {post.category}
                </span>
                <span className="text-sm text-muted-foreground">{post.readTime}</span>
              </div>
              
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              
              <p className="text-muted-foreground mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </span>
                </div>
                
                <button className="flex items-center gap-1 text-primary hover:gap-2 transition-all">
                  Читать
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
                <User className="w-4 h-4" />
                {post.author}
              </div>
            </ModernCard>
          ))}
        </div>
      </section>
    </div>
  );
}
