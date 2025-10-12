import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield } from "lucide-react";
import { ModernCard } from "@/components/ModernCard";

const COLORS = {
  pink: "#FF2E92",
  purple: "#5A0B7A",
  dark: "#1E1B4B",
  lightBg: "#F9FAFB"
};

export default function Privacy() {
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
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-4xl font-bold">Политика конфиденциальности</h1>
        </div>

        <ModernCard glass className="p-8 space-y-6">
          <div>
            <p className="text-muted-foreground mb-4">
              Дата последнего обновления: {new Date().toLocaleDateString('ru-RU')}
            </p>
          </div>

          <section>
            <h2 className="text-2xl font-semibold mb-3">1. Общие положения</h2>
            <p className="text-muted-foreground">
              Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сервиса Полка+. 
              Мы уважаем вашу конфиденциальность и обязуемся защищать ваши персональные данные.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">2. Какие данные мы собираем</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>ФИО, контактный телефон и электронная почта</li>
              <li>ИНН компании и реквизиты организации</li>
              <li>Информация о товарах и заказах</li>
              <li>Технические данные (IP-адрес, cookies, данные браузера)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">3. Цели обработки данных</h2>
            <p className="text-muted-foreground mb-2">Мы используем ваши данные для:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Предоставления услуг фулфилмента</li>
              <li>Обработки заказов и ведения учета</li>
              <li>Связи с вами по вопросам сервиса</li>
              <li>Улучшения качества наших услуг</li>
              <li>Выполнения договорных обязательств</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">4. Защита данных</h2>
            <p className="text-muted-foreground">
              Мы применяем современные технические и организационные меры для защиты ваших персональных данных от 
              несанкционированного доступа, изменения, раскрытия или уничтожения. Доступ к данным имеют только 
              уполномоченные сотрудники, которые обязаны соблюдать конфиденциальность.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Передача данных третьим лицам</h2>
            <p className="text-muted-foreground">
              Мы не передаем ваши персональные данные третьим лицам, за исключением случаев, необходимых для 
              оказания услуг (например, службы доставки, маркетплейсы) или когда это требуется законом.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">6. Ваши права</h2>
            <p className="text-muted-foreground mb-2">Вы имеете право:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Получать информацию о ваших персональных данных</li>
              <li>Требовать исправления неточных данных</li>
              <li>Требовать удаления данных</li>
              <li>Отозвать согласие на обработку данных</li>
              <li>Подать жалобу в надзорный орган</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">7. Cookies</h2>
            <p className="text-muted-foreground">
              Мы используем cookies для улучшения работы сайта и персонализации вашего опыта. 
              Вы можете отключить cookies в настройках браузера, но это может ограничить функциональность сайта.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">8. Контактная информация</h2>
            <p className="text-muted-foreground">
              По вопросам обработки персональных данных обращайтесь:<br />
              Email: privacy@polkaplus.ru<br />
              Телефон: +7 (846) 123-45-67
            </p>
          </section>
        </ModernCard>
      </section>
    </div>
  );
}
