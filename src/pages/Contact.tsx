import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Phone, Mail, Clock, MessageCircle, Send } from "lucide-react";
import { ModernCard } from "@/components/ModernCard";
import { toast } from "sonner";

const COLORS = {
  pink: "#FF2E92",
  purple: "#5A0B7A",
  dark: "#1E1B4B",
  lightBg: "#F9FAFB"
};

export default function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Спасибо! Мы свяжемся с вами в ближайшее время.");
    setFormData({ name: "", phone: "", email: "", message: "" });
  };

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

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
            Контакты
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Свяжитесь с нами удобным способом — мы всегда готовы помочь
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Контактная информация */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Как с нами связаться</h2>
            
            <div className="space-y-6 mb-8">
              <ModernCard className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Телефон</h3>
                    <p className="text-muted-foreground mb-1">+7 986 000-63-00</p>
                    <p className="text-sm text-muted-foreground">Звонки принимаются 24/7</p>
                  </div>
                </div>
              </ModernCard>

              <ModernCard className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent-green/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-accent-green" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Email</h3>
                    <p className="text-muted-foreground mb-1">polkapluss@yandex.ru</p>
                    <p className="text-sm text-muted-foreground">Ответим в течение часа</p>
                  </div>
                </div>
              </ModernCard>

              <ModernCard className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-violet/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary-violet" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Адрес</h3>
                    <p className="text-muted-foreground mb-1">г. Самара, ул. Складская, д. 10</p>
                    <p className="text-sm text-muted-foreground">Офис и складской комплекс</p>
                  </div>
                </div>
              </ModernCard>

              <ModernCard className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent-orange/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-accent-orange" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Режим работы</h3>
                    <p className="text-muted-foreground mb-1">Офис: Пн-Пт 9:00 - 18:00</p>
                    <p className="text-muted-foreground">Склад: 24/7</p>
                  </div>
                </div>
              </ModernCard>

              <ModernCard className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Мессенджеры</h3>
                    <div className="flex gap-3">
                      <a href="https://wa.me/78461234567" target="_blank" rel="noopener noreferrer" className="text-accent-green hover:underline">WhatsApp</a>
                      <a href="https://t.me/polkaplus" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Telegram</a>
                    </div>
                  </div>
                </div>
              </ModernCard>
            </div>
          </div>

          {/* Форма обратной связи */}
          <div>
            <ModernCard glass className="p-8">
              <h2 className="text-2xl font-bold mb-6">Оставьте заявку</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Ваше имя *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange('name')}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Иван Иванов"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Телефон *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange('phone')}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={handleChange('email')}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Сообщение</label>
                  <textarea
                    value={formData.message}
                    onChange={handleChange('message')}
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                    placeholder="Расскажите о вашем проекте..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 rounded-xl bg-gradient-primary text-white font-semibold hover:scale-105 transition-transform flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Отправить заявку
                </button>
              </form>
            </ModernCard>
          </div>
        </div>
      </section>
    </div>
  );
}
