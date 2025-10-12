import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileText } from "lucide-react";
import { ModernCard } from "@/components/ModernCard";

const COLORS = {
  pink: "#FF2E92",
  purple: "#5A0B7A",
  dark: "#1E1B4B",
  lightBg: "#F9FAFB"
};

export default function Terms() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.lightBg }}>
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

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-4xl font-bold">Пользовательское соглашение</h1>
        </div>

        <ModernCard glass className="p-8 space-y-6">
          <div>
            <p className="text-muted-foreground mb-4">
              Дата вступления в силу: {new Date().toLocaleDateString('ru-RU')}
            </p>
          </div>

          <section>
            <h2 className="text-2xl font-semibold mb-3">1. Термины и определения</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li><strong>Сервис</strong> — платформа Полка+ и все связанные услуги</li>
              <li><strong>Пользователь</strong> — лицо, использующее сервис</li>
              <li><strong>Контент</strong> — любая информация, размещенная на платформе</li>
              <li><strong>Услуги</strong> — фулфилмент-услуги, предоставляемые Полка+</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">2. Предмет соглашения</h2>
            <p className="text-muted-foreground">
              Настоящее соглашение регулирует отношения между Полка+ и пользователями при использовании сервиса. 
              Используя сервис, вы соглашаетесь с условиями данного соглашения.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">3. Регистрация и учетная запись</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Для использования сервиса необходима регистрация</li>
              <li>Вы обязаны предоставлять достоверную информацию</li>
              <li>Вы несете ответственность за безопасность своей учетной записи</li>
              <li>Запрещено передавать доступ к аккаунту третьим лицам</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">4. Права и обязанности пользователя</h2>
            <p className="text-muted-foreground mb-2">Пользователь обязуется:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Использовать сервис в соответствии с законодательством РФ</li>
              <li>Не нарушать права других пользователей</li>
              <li>Не размещать запрещенные товары</li>
              <li>Своевременно оплачивать услуги</li>
              <li>Соблюдать правила маркетплейсов</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Права и обязанности Полка+</h2>
            <p className="text-muted-foreground mb-2">Полка+ обязуется:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Предоставлять услуги надлежащего качества</li>
              <li>Обеспечивать сохранность товаров</li>
              <li>Своевременно обрабатывать заказы</li>
              <li>Консультировать по вопросам сервиса</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">6. Стоимость и оплата</h2>
            <p className="text-muted-foreground">
              Стоимость услуг определяется действующими тарифами. Оплата производится на основании выставленных счетов. 
              Задержка оплаты может привести к приостановке предоставления услуг.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">7. Ответственность сторон</h2>
            <p className="text-muted-foreground">
              Каждая сторона несет ответственность за неисполнение своих обязательств в соответствии с 
              законодательством РФ. Полка+ не несет ответственности за действия маркетплейсов и служб доставки.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">8. Изменение условий</h2>
            <p className="text-muted-foreground">
              Полка+ оставляет за собой право изменять условия соглашения. Актуальная версия всегда доступна на сайте. 
              Продолжая использовать сервис после внесения изменений, вы соглашаетесь с новыми условиями.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">9. Расторжение соглашения</h2>
            <p className="text-muted-foreground">
              Любая сторона может расторгнуть соглашение, уведомив об этом другую сторону не менее чем за 30 дней. 
              При расторжении необходимо урегулировать все взаиморасчеты.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">10. Контактная информация</h2>
            <p className="text-muted-foreground">
              ООО "Полка Плюс"<br />
              ИНН: 1234567890<br />
              Email: legal@polkaplus.ru<br />
              Телефон: +7 (846) 123-45-67<br />
              Адрес: г. Самара, ул. Складская, д. 10
            </p>
          </section>
        </ModernCard>
      </section>
    </div>
  );
}
