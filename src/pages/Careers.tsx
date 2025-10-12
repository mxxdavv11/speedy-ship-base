import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Briefcase, Clock, Users, TrendingUp, CheckCircle2, ArrowLeft } from "lucide-react";
import { ModernCard } from "@/components/ModernCard";

const COLORS = {
  pink: "#FF2E92",
  purple: "#5A0B7A",
  dark: "#1E1B4B",
  lightBg: "#F9FAFB"
};

const VACANCIES = [
  {
    id: 1,
    title: "Оператор склада",
    location: "Москва, Котельники",
    type: "Полная занятость",
    salary: "от 60 000 ₽",
    experience: "Без опыта",
    description: "Приемка, размещение и комплектация товаров на складе. Работа с ТСД.",
    requirements: ["Ответственность", "Внимательность", "Физическая выносливость"],
    benefits: ["График 2/2", "Официальное оформление", "Бесплатное питание"]
  },
  {
    id: 2,
    title: "Менеджер по работе с маркетплейсами",
    location: "Москва (офис/удаленно)",
    type: "Полная занятость",
    salary: "от 80 000 ₽",
    experience: "От 1 года",
    description: "Управление товарами на Wildberries, Ozon. Работа с аналитикой и продвижением.",
    requirements: ["Опыт работы с маркетплейсами", "Знание Excel", "Аналитический склад ума"],
    benefits: ["Гибкий график", "Бонусы за результат", "Обучение и развитие"]
  },
  {
    id: 3,
    title: "Кладовщик",
    location: "Москва, Котельники",
    type: "Полная занятость",
    salary: "от 65 000 ₽",
    experience: "От 6 месяцев",
    description: "Учет товаров, контроль остатков, работа в 1С и WMS.",
    requirements: ["Опыт работы на складе", "Знание 1С", "Внимательность"],
    benefits: ["5/2 график", "ДМС", "Корпоративный транспорт"]
  },
  {
    id: 4,
    title: "Водитель-экспедитор",
    location: "Москва и область",
    type: "Полная занятость",
    salary: "от 90 000 ₽",
    experience: "От 2 лет",
    description: "Доставка грузов по маршруту. Категория B, C. Работа на автомобиле компании.",
    requirements: ["Права категории B, C", "Опыт от 2 лет", "Знание Москвы"],
    benefits: ["Корпоративный автомобиль", "ДМС", "Топливо за счет компании"]
  },
  {
    id: 5,
    title: "Фотограф товаров",
    location: "Москва, Котельники",
    type: "Полная/частичная занятость",
    salary: "от 70 000 ₽",
    experience: "От 1 года",
    description: "Предметная съемка товаров для маркетплейсов. Обработка фото.",
    requirements: ["Опыт предметной съемки", "Знание Photoshop/Lightroom", "Портфолио"],
    benefits: ["Свободный график", "Оборудованная студия", "Творческая команда"]
  },
  {
    id: 6,
    title: "Упаковщик",
    location: "Москва, Котельники",
    type: "Полная/частичная занятость",
    salary: "от 55 000 ₽",
    experience: "Без опыта",
    description: "Упаковка товаров для отправки на маркетплейсы.",
    requirements: ["Аккуратность", "Внимательность", "Готовность к обучению"],
    benefits: ["Гибкий график", "Обучение за счет компании", "Бесплатное питание"]
  }
];

const STATS = [
  { icon: Users, value: "50+", label: "Сотрудников в команде" },
  { icon: TrendingUp, value: "30%", label: "Средний рост зарплаты в год" },
  { icon: CheckCircle2, value: "95%", label: "Довольных сотрудников" }
];

export default function Careers() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");

  const filteredVacancies = VACANCIES.filter(vacancy => {
    const matchesSearch = vacancy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vacancy.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || vacancy.type === selectedType;
    const matchesLocation = selectedLocation === "all" || vacancy.location.includes(selectedLocation);
    return matchesSearch && matchesType && matchesLocation;
  });

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

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/10 via-primary-violet/10 to-accent-green/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Присоединяйтесь к команде супергероев Полка+
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Мы создаем будущее фулфилмента в России. Станьте частью инновационной команды!
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {STATS.map((stat, idx) => (
              <ModernCard key={idx} glass className="p-6">
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </ModernCard>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ModernCard className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Поиск вакансий..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Type Filter */}
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
              >
                <option value="all">Все типы</option>
                <option value="Полная занятость">Полная занятость</option>
                <option value="Полная/частичная занятость">Частичная занятость</option>
              </select>
            </div>

            {/* Location Filter */}
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
              >
                <option value="all">Все локации</option>
                <option value="Москва">Москва</option>
                <option value="Котельники">Котельники</option>
                <option value="удаленно">Удаленно</option>
              </select>
            </div>
          </div>
        </ModernCard>
      </section>

      {/* Vacancies List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">
            Открытые вакансии
          </h2>
          <p className="text-muted-foreground">
            Найдено вакансий: {filteredVacancies.length}
          </p>
        </div>

        <div className="space-y-6">
          {filteredVacancies.map((vacancy) => (
            <ModernCard key={vacancy.id} className="p-6 hover:shadow-elegant transition-all cursor-pointer">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{vacancy.title}</h3>
                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {vacancy.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {vacancy.type}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      {vacancy.experience}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary mb-2">
                    {vacancy.salary}
                  </div>
                  <button 
                    className="px-6 py-2 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity font-medium"
                  >
                    Откликнуться
                  </button>
                </div>
              </div>

              <p className="text-muted-foreground mb-4">
                {vacancy.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Требования:</h4>
                  <ul className="space-y-1">
                    {vacancy.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-accent-green mt-0.5 flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Мы предлагаем:</h4>
                  <ul className="space-y-1">
                    {vacancy.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ModernCard>
          ))}
        </div>

        {filteredVacancies.length === 0 && (
          <ModernCard className="p-12 text-center">
            <div className="text-muted-foreground">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg">По вашему запросу ничего не найдено</p>
              <p className="text-sm mt-2">Попробуйте изменить параметры поиска</p>
            </div>
          </ModernCard>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-primary py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Не нашли подходящую вакансию?
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Отправьте нам свое резюме, и мы свяжемся с вами при появлении подходящей позиции
          </p>
          <button 
            className="px-8 py-3 rounded-xl bg-white text-primary font-semibold hover:scale-105 transition-transform"
          >
            Отправить резюме
          </button>
        </div>
      </section>
    </div>
  );
}
