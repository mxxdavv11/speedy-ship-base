import React, { useMemo, useState, useEffect } from "react";
import { Building2, ClipboardList, ScanBarcode, ShoppingBag, Truck, Home, Shield, ChevronUp, Star, Users, TrendingUp, Clock, Camera, Play, Maximize2, Send, MessageCircle, Mail } from "lucide-react";

// === Полка+ — лендинг с ЛК и ролями ===
const COLORS = { pink: "#FF2E92", purple: "#5A0B7A", dark: "#1E1B4B", lightBg: "#F9FAFB" };

const ROLES = {
  "Владелец": ["view_requests", "view_orders", "view_finance", "manage_users"],
  "Менеджер МП": ["view_requests", "view_orders"],
  "Сотрудник": ["view_requests"],
};

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.59a.75.75 0 1 0-1.22-.9l-3.3 4.47-1.57-1.57a.75.75 0 0 0-1.06 1.06l2.25 2.25c.32.32.83.28 1.1-.09l3.8-5.22Z" clipRule="evenodd"/></svg>
);

const Section = ({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) => (
  <section id={id} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</section>
);

// Тарифы Полка+ (для витрины)
const PRICES = {
  pickup: { pallet: 800, box: 80, palletBulk: 600 },
  count: { upTo1000: 1.5, over1000: 1 },
  mark: { lt100: 7, lt500: 5, gte500: 4 },
  pack: { boppSmall: 9, boppLarge: 12, zipSmall: 10, zipLarge: 14, bundle: 2 },
  storage: { boxPerDay: 40, palletPerDay: 60, freeDays: 3 },
  delivery: { perCube: 400, extraBox: 80, pallet: 900 },
  analytics: { extendedPerMonth: 3000, percent: 0.02 },
  photo: { perSku: 150, video: 500, spin: 300 },
  extras: { shipmentCreate: 150, honestSign: 2, auditPerMonth: 2000 },
};

const money = (x) => new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(x || 0);

function Modal({ open, onClose, children, title }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-2xl p-6 shadow-xl bg-white">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold" style={{ color: COLORS.dark }}>{title}</h3>
          <button onClick={onClose} className="text-sm" style={{ color: '#6B7280' }}>Закрыть</button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default function Index() {
  const [activePage, setActivePage] = useState('home'); // 'home' | 'account'
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [errors, setErrors] = useState({ inn: '' });
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const saved = localStorage.getItem('polka_user');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const validateContactForm = () => {
    const errors: Record<string, string> = {};
    if (!contactForm.name.trim()) errors.name = 'Имя обязательно';
    if (!contactForm.phone.trim()) errors.phone = 'Телефон обязателен';
    if (contactForm.email && !/\S+@\S+\.\S+/.test(contactForm.email)) errors.email = 'Неверный формат email';
    return errors;
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const errors = validateContactForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    // Здесь отправка формы
    alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
    setContactForm({ name: '', phone: '', email: '', message: '' });
    setFormErrors({});
  };

  const handleContactChange = (field) => (e) => {
    setContactForm(prev => ({ ...prev, [field]: e.target.value }));
    if (formErrors[field]) setFormErrors(prev => ({ ...prev, [field]: '' }));
  };

  function validateINN(inn) { return /^\d{10}(\d{2})?$/.test((inn || '').trim()); }

  function handleAuthSubmit(type, e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = (fd.get('name') || '').toString();
    const email = (fd.get('email') || '').toString();
    const inn = (fd.get('inn') || '').toString();
    const role = (fd.get('role') || '').toString();
    if (type === 'register' && !validateINN(inn)) { setErrors({ inn: 'ИНН должен содержать 10 или 12 цифр' }); return; }
    const newUser = { name: name || 'Клиент', email, inn, role: role || 'Сотрудник' };
    localStorage.setItem('polka_user', JSON.stringify(newUser));
    setUser(newUser); setShowLogin(false); setShowRegister(false); setActivePage('account'); setErrors({ inn: '' });
  }

  const logout = () => { localStorage.removeItem('polka_user'); setUser(null); setActivePage('home'); };

  // калькулятор (короткая версия)
  const [input, setInput] = useState({ palletsPickup: 0, boxesPickup: 0, unitsCount: 0, unitsMark: 0, packType: 'boppSmall', bundles: 0, storageBoxes: 0, storagePallets: 0, storageDays: 0, cubesDelivery: 0, extraBoxesDelivery: 0, palletsDelivery: 0, photoSkus: 0, videos: 0, spins: 0, shipments: 0, honestSignUnits: 0 });
  const handle = (k) => (e) => setInput(s => ({ ...s, [k]: e.target.type === 'number' ? Number(e.target.value) : e.target.value }));
  const total = useMemo(() => {
    const pickup = input.palletsPickup * PRICES.pickup.pallet + input.boxesPickup * PRICES.pickup.box;
    const count = input.unitsCount <= 1000 ? input.unitsCount * PRICES.count.upTo1000 : 1000 * PRICES.count.upTo1000 + (input.unitsCount - 1000) * PRICES.count.over1000;
    let markUnit = 0; if (input.unitsMark > 500) markUnit = PRICES.mark.gte500; else if (input.unitsMark > 100) markUnit = PRICES.mark.lt500; else if (input.unitsMark > 0) markUnit = PRICES.mark.lt100;
    const mark = input.unitsMark * markUnit;
    const pack = PRICES.pack[input.packType] * input.unitsMark + PRICES.pack.bundle * input.bundles;
    const billableDays = Math.max(0, input.storageDays - PRICES.storage.freeDays);
    const storage = billableDays * (input.storageBoxes * PRICES.storage.boxPerDay + input.storagePallets * PRICES.storage.palletPerDay);
    const delivery = input.cubesDelivery * PRICES.delivery.perCube + input.extraBoxesDelivery * PRICES.delivery.extraBox + input.palletsDelivery * PRICES.delivery.pallet;
    const photo = input.photoSkus * PRICES.photo.perSku + input.videos * PRICES.photo.video + input.spins * PRICES.photo.spin;
    const extras = input.shipments * PRICES.extras.shipmentCreate + input.honestSignUnits * PRICES.extras.honestSign;
    return { pickup, count, mark, pack, storage, delivery, photo, extras, sum: pickup + count + mark + pack + storage + delivery + photo + extras };
  }, [input]);

  const can = (perm) => user && ROLES[user.role]?.includes(perm);

  // Логотипы как текст (надёжный фолбэк без файлов)
  const BRANDS = ['Wildberries','Ozon','Яндекс.Маркет','Lamoda','Leroy Merlin','Avito','AliExpress','KazanExpress'];

  if (activePage === 'account') {
    return (
      <div className="min-h-screen" style={{ backgroundColor: COLORS.lightBg }}>
        {/* Header для кабинета */}
        <header className="bg-white shadow-sm">
          <Section className="flex items-center justify-between py-4">
            <button onClick={() => setActivePage('home')} className="text-xl font-bold" style={{ color: COLORS.dark }}>← Полка+</button>
            <div className="flex items-center gap-4">
              <span className="text-sm" style={{ color: '#6B7280' }}>Добро пожаловать, {user?.name}</span>
              <button onClick={logout} className="px-3 py-2 rounded-xl bg-red-100 text-red-700 text-sm">Выйти</button>
            </div>
          </Section>
        </header>

        {/* Кабинет */}
        <Section className="py-8">
          <h1 className="text-2xl font-bold mb-6" style={{ color: COLORS.dark }}>Личный кабинет</h1>
          
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Профиль */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold mb-4" style={{ color: COLORS.dark }}>Профиль</h3>
              <div className="space-y-2 text-sm">
                <p><span style={{ color: '#6B7280' }}>Имя:</span> {user?.name}</p>
                <p><span style={{ color: '#6B7280' }}>Email:</span> {user?.email}</p>
                <p><span style={{ color: '#6B7280' }}>ИНН:</span> {user?.inn}</p>
                <p><span style={{ color: '#6B7280' }}>Роль:</span> {user?.role}</p>
              </div>
            </div>

            {/* Быстрые действия */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold mb-4" style={{ color: COLORS.dark }}>Быстрые действия</h3>
              <div className="space-y-3">
                <button className="w-full p-3 rounded-xl border text-left text-sm hover:bg-gray-50" style={{ borderColor: '#E5E7EB' }}>
                  📦 Создать заявку на приёмку
                </button>
                <button className="w-full p-3 rounded-xl border text-left text-sm hover:bg-gray-50" style={{ borderColor: '#E5E7EB' }}>
                  📊 Посмотреть отчёты
                </button>
                <button className="w-full p-3 rounded-xl border text-left text-sm hover:bg-gray-50" style={{ borderColor: '#E5E7EB' }}>
                  💬 Связаться с менеджером
                </button>
              </div>
            </div>

            {/* Статистика */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold mb-4" style={{ color: COLORS.dark }}>Статистика</h3>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-3 rounded-xl" style={{ backgroundColor: COLORS.lightBg }}>
                  <div className="text-lg font-bold" style={{ color: COLORS.dark }}>12</div>
                  <div className="text-xs" style={{ color: '#6B7280' }}>Заявок</div>
                </div>
                <div className="p-3 rounded-xl" style={{ backgroundColor: COLORS.lightBg }}>
                  <div className="text-lg font-bold" style={{ color: COLORS.dark }}>5</div>
                  <div className="text-xs" style={{ color: '#6B7280' }}>В работе</div>
                </div>
              </div>
            </div>
          </div>

          {/* Разделы по ролям */}
          <div className="mt-8 space-y-6">
            {/* Видеонаблюдение - доступно всем ролям */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Camera className="w-5 h-5" style={{ color: COLORS.pink }} />
                <h3 className="font-semibold" style={{ color: COLORS.dark }}>Видеонаблюдение складов</h3>
              </div>
              <p className="text-sm mb-6" style={{ color: '#6B7280' }}>Онлайн-мониторинг ваших товаров на складских стеллажах</p>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { id: 'A1', name: 'Стеллаж A-1', status: 'online' },
                  { id: 'A2', name: 'Стеллаж A-2', status: 'online' },
                  { id: 'B1', name: 'Стеллаж B-1', status: 'offline' },
                  { id: 'B2', name: 'Стеллаж B-2', status: 'online' }
                ].map((camera) => (
                  <div key={camera.id} className="relative group">
                    <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden relative">
                      {/* Имитация видеопотока */}
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900">
                        <div className="absolute inset-0 opacity-30">
                          <div className="grid grid-cols-8 grid-rows-6 h-full">
                            {Array.from({ length: 48 }).map((_, i) => (
                              <div key={i} className="border border-gray-600/20"></div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Статус камеры */}
                        <div className="absolute top-2 left-2">
                          <div className={`w-2 h-2 rounded-full ${camera.status === 'online' ? 'bg-green-400' : 'bg-red-400'}`}></div>
                        </div>
                        
                        {/* Название камеры */}
                        <div className="absolute top-2 right-2 bg-black/50 px-2 py-1 rounded text-white text-xs">
                          {camera.id}
                        </div>
                        
                        {/* Время */}
                        <div className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 rounded text-white text-xs">
                          {new Date().toLocaleTimeString('ru-RU')}
                        </div>
                        
                        {camera.status === 'online' ? (
                          <>
                            {/* Имитация движения товаров */}
                            <div className="absolute top-1/2 left-1/3 w-4 h-6 bg-blue-400/60 rounded-sm animate-pulse"></div>
                            <div className="absolute top-2/3 right-1/4 w-6 h-4 bg-yellow-400/60 rounded-sm"></div>
                            
                            {/* Кнопки управления при наведении */}
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                              <button className="p-2 bg-white/20 rounded-full text-white hover:bg-white/30">
                                <Play className="w-4 h-4" />
                              </button>
                              <button className="p-2 bg-white/20 rounded-full text-white hover:bg-white/30">
                                <Maximize2 className="w-4 h-4" />
                              </button>
                            </div>
                          </>
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-white text-xs text-center">
                              <Camera className="w-6 h-6 mx-auto mb-1 opacity-50" />
                              <div>Нет сигнала</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-2 text-center">
                      <div className="text-sm font-medium" style={{ color: COLORS.dark }}>{camera.name}</div>
                      <div className={`text-xs ${camera.status === 'online' ? 'text-green-600' : 'text-red-600'}`}>
                        {camera.status === 'online' ? 'В сети' : 'Офлайн'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 rounded-xl border" style={{ borderColor: '#E5E7EB', backgroundColor: '#F9FAFB' }}>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span style={{ color: '#4B5563' }}>3 камеры онлайн</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <span style={{ color: '#4B5563' }}>1 камера офлайн</span>
                    </div>
                  </div>
                  <button className="text-sm font-medium hover:underline" style={{ color: COLORS.pink }}>
                    Все камеры →
                  </button>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {can('view_requests') && (
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h3 className="font-semibold mb-4" style={{ color: COLORS.dark }}>Заявки</h3>
                  <p className="text-sm" style={{ color: '#6B7280' }}>Список ваших заявок на приёмку и обработку товаров.</p>
                  <div className="mt-4 p-4 rounded-xl border" style={{ borderColor: '#E5E7EB' }}>
                    <p className="text-sm">Заявка #001 - В обработке</p>
                    <p className="text-xs mt-1" style={{ color: '#6B7280' }}>200 единиц товара, поступление завтра</p>
                  </div>
                </div>
              )}
              
              {can('view_orders') && (
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h3 className="font-semibold mb-4" style={{ color: COLORS.dark }}>Заказы</h3>
                  <p className="text-sm" style={{ color: '#6B7280' }}>Отправленные заказы и их статусы.</p>
                  <div className="mt-4 p-4 rounded-xl border" style={{ borderColor: '#E5E7EB' }}>
                    <p className="text-sm">Заказ #WB12345 - Доставлен</p>
                    <p className="text-xs mt-1" style={{ color: '#6B7280' }}>1 единица, доставка на РЦ Новосемейкино</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Section>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.lightBg, color: COLORS.dark }}>
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes fadeInUp { 0% { opacity: 0; transform: translateY(30px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes countUp { 0% { opacity: 0; } 100% { opacity: 1; } }
        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-count { animation: countUp 1.5s ease-out forwards; }
      `}</style>

      {/* Structured Data для SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Полка+",
          "description": "Фулфилмент услуги для интернет-магазинов",
          "url": window.location.origin,
          "telephone": "+7 (800) 123-45-67",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Самара",
            "addressCountry": "RU"
          },
          "sameAs": [],
          "service": {
            "@type": "Service",
            "serviceType": "Fulfillment services",
            "provider": {
              "@type": "Organization",
              "name": "Полка+"
            }
          }
        })
      }} />

      {/* Шапка */}
      <header className="relative">
        <div className="absolute inset-0" style={{
          backgroundImage: `url(${"/api/placeholder/1600/600"})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.18
        }} />
        {/* Градиент без tailwind-скобок/хешей */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to right, rgba(30,27,75,0.92), rgba(30,27,75,0.85))'
        }} />
        <Section className="relative flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold text-white">Полка+</span>
          </div>
          <nav className="hidden sm:flex gap-6 text-sm font-medium text-white/90">
            <a href="#services" onClick={() => setActivePage('home')}>Услуги</a>
            <a href="#pricing" onClick={() => setActivePage('home')}>Тарифы</a>
            <a href="#calculator" onClick={() => setActivePage('home')}>Калькулятор</a>
            <a href="#blog" onClick={() => setActivePage('home')}>Блог</a>
            <a href="#about" onClick={() => setActivePage('home')}>О нас</a>
            <a href="#contact" onClick={() => setActivePage('home')}>Контакты</a>
          </nav>
          <div className="flex items-center gap-2">
            {!user ? (
              <>
                <button onClick={() => setShowLogin(true)} className="px-3 py-2 rounded-xl bg-white/10 text-white border border-white/20">Войти</button>
                <button onClick={() => setShowRegister(true)} className="px-3 py-2 rounded-xl font-semibold" style={{ backgroundColor: COLORS.pink, color: 'white' }}>Регистрация</button>
              </>
            ) : (
              <>
                <button onClick={() => setActivePage('account')} className="px-3 py-2 rounded-xl font-semibold" style={{ backgroundColor: COLORS.pink, color: 'white' }}>Кабинет</button>
                <button onClick={logout} className="px-3 py-2 rounded-xl bg-white/10 text-white border border-white/20">Выйти</button>
              </>
            )}
          </div>
        </Section>
      </header>

      {/* Модалки авторизации */}
      <Modal open={showLogin} onClose={() => setShowLogin(false)} title="Вход">
        <form onSubmit={(e) => handleAuthSubmit('login', e)}>
          <div className="space-y-4">
            <input name="email" placeholder="Email или телефон" className="w-full rounded-xl border px-3 py-2" style={{ borderColor: '#D1D5DB' }} />
            <input name="password" type="password" placeholder="Пароль" className="w-full rounded-xl border px-3 py-2" style={{ borderColor: '#D1D5DB' }} />
            <button type="submit" className="w-full py-3 rounded-xl font-semibold" style={{ backgroundColor: COLORS.pink, color: 'white' }}>Войти</button>
          </div>
        </form>
      </Modal>

      <Modal open={showRegister} onClose={() => setShowRegister(false)} title="Регистрация">
        <form onSubmit={(e) => handleAuthSubmit('register', e)}>
          <div className="space-y-4">
            <input name="name" placeholder="Ваше имя" className="w-full rounded-xl border px-3 py-2" style={{ borderColor: '#D1D5DB' }} />
            <input name="email" placeholder="Email" className="w-full rounded-xl border px-3 py-2" style={{ borderColor: '#D1D5DB' }} />
            <div>
              <input name="inn" placeholder="ИНН компании" className="w-full rounded-xl border px-3 py-2" style={{ borderColor: '#D1D5DB' }} />
              {errors.inn && <p className="text-sm text-red-600 mt-1">{errors.inn}</p>}
            </div>
            <select name="role" className="w-full rounded-xl border px-3 py-2" style={{ borderColor: '#D1D5DB' }}>
              <option value="Сотрудник">Сотрудник</option>
              <option value="Менеджер МП">Менеджер МП</option>
              <option value="Владелец">Владелец</option>
            </select>
            <button type="submit" className="w-full py-3 rounded-xl font-semibold" style={{ backgroundColor: COLORS.pink, color: 'white' }}>Зарегистрироваться</button>
          </div>
        </form>
      </Modal>

      {/* HERO */}
      <div className="relative" style={{ backgroundColor: COLORS.dark, color: 'white' }}>
        <img src="/api/placeholder/1600/800" alt="Команда Полка+" className="pointer-events-none select-none absolute inset-0 w-full h-full object-cover opacity-25" />
        <div className="pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(30,27,75,0.95) 0%, rgba(30,27,75,0.85) 45%, rgba(30,27,75,0.78) 70%, rgba(30,27,75,0.70) 100%)' }} />
        <Section className="relative py-14 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-extrabold">Фулфилмент Полка+ — выгодно, честно, под ключ</h1>
              <p className="mt-4 text-lg text-neutral-200">Цены ниже рынка на 10–20% • Фото и базовая аналитика включены • Приёмка, маркировка, упаковка, доставка на WB/Ozon/Я.Маркет</p>
              <div className="mt-6 flex gap-3">
                <a href="#calculator" className="px-5 py-3 rounded-2xl font-semibold shadow" style={{ backgroundColor: 'white', color: COLORS.dark }} onClick={() => setActivePage('home')}>Рассчитать тариф</a>
                <a href="#contact" className="px-5 py-3 rounded-2xl font-semibold ring-2" style={{ borderColor: 'white' }} onClick={() => setActivePage('home')}>Оставить заявку</a>
              </div>
              <ul className="mt-6 space-y-2 text-sm text-neutral-200">
                {['Приёмка и проверка на брак','Адресное хранение: первые 3 дня бесплатно','Доставка до Новосемейкино и федеральных РЦ'].map(t => (
                  <li key={t} className="flex items-start gap-2"><CheckIcon/> <span>{t}</span></li>
                ))}
              </ul>
            </div>
            <div className="lg:justify-self-end">
              <div className="rounded-3xl p-6 shadow-lg" style={{ backgroundColor: COLORS.purple }}>
                <p className="text-sm text-neutral-200">Наше УТП</p>
                <p className="text-xl font-semibold">Гарантируем приёмку 99,5% поставок и фиксируем цены в договоре</p>
                <p className="mt-2 text-neutral-100">Персональный менеджер 24/7, прозрачные отчёты, интеграция с маркетплейсами.</p>
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* Услуги */}
      <Section id="services" className="py-20">
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight" style={{ color: COLORS.dark }}>Мы поможем вам<br/>повысить эффективность<br/>вашего бизнеса</h2>
            <p className="mt-5 text-base" style={{ color: '#4B5563' }}>Полная поддержка на каждом этапе — от приёмки до доставки на любой склад.</p>
          </div>
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-10">
            {[
              { icon: Building2, title: 'Приём товара в ТК', desc: 'Принимаем товары из любых ТК, проверяем состояние груза.' },
              { icon: ClipboardList, title: 'Создаём поставку', desc: 'Снижаем риск разворотов. Создание поставки с гарантией приёмки.' },
              { icon: ScanBarcode, title: 'Маркировка', desc: 'Этикетки под требования маркетплейсов. «Честный знак».' },
              { icon: ShoppingBag, title: 'Упаковка', desc: 'БОПП / Zip‑Lock, наборы, вкладыши, переклейка ШК.' },
              { icon: Truck, title: 'Доставка', desc: 'Собственный транспорт. Новосемейкино и федеральные РЦ.' },
              { icon: Home, title: 'Хранение', desc: 'Адресное хранение, CCTV. Первые 3 дня — бесплатно.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4">
                <div className="shrink-0 mt-1"><div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${COLORS.pink}1A`, color: COLORS.pink }}><Icon className="w-7 h-7" /></div></div>
                <div><h3 className="text-lg font-semibold" style={{ color: COLORS.dark }}>{title}</h3><p className="mt-1 text-sm" style={{ color: '#4B5563' }}>{desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Бренды (бегущая строка без файлов) */}
      <div className="py-6" style={{ backgroundColor: 'black', color: 'white' }}>
        <div className="overflow-hidden">
          <div className="flex items-center" style={{ width: '200%', animation: 'marquee 18s linear infinite' }}>
            {BRANDS.concat(BRANDS).map((name, i) => (
              <span key={i} className="mx-12 text-lg font-semibold whitespace-nowrap">{name}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Статистика */}
      <Section className="py-16">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-2xl md:text-3xl font-bold" style={{ color: COLORS.dark }}>Нам доверяют</h2>
          <p className="mt-3 text-lg" style={{ color: '#6B7280' }}>Цифры, которые говорят сами за себя</p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { icon: Users, number: '1000+', label: 'Довольных клиентов', color: COLORS.pink },
            { icon: TrendingUp, number: '2.5М', label: 'Обработано заказов', color: COLORS.purple },
            { icon: Clock, number: '24/7', label: 'Поддержка', color: COLORS.pink },
            { icon: Star, number: '99.5%', label: 'Успешных приёмок', color: COLORS.purple }
          ].map(({ icon: Icon, number, label, color }, i) => (
            <div key={i} className="text-center p-6 rounded-2xl bg-white shadow-sm animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: `${color}1A` }}>
                <Icon className="w-8 h-8" style={{ color }} />
              </div>
              <div className="text-3xl font-bold animate-count" style={{ color: COLORS.dark }}>{number}</div>
              <div className="mt-2 text-sm" style={{ color: '#6B7280' }}>{label}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Отзывы */}
      <div className="py-16" style={{ backgroundColor: 'white' }}>
        <Section>
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: COLORS.dark }}>Отзывы клиентов</h2>
            <p className="mt-3 text-lg" style={{ color: '#6B7280' }}>Что говорят о нас наши партнёры</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Анна Петрова',
                company: 'Магазин детских товаров',
                text: 'Полка+ помогла нам сократить расходы на логистику на 30%. Отличный сервис и профессиональная команда!',
                rating: 5
              },
              {
                name: 'Дмитрий Иванов',
                company: 'Интернет-магазин электроники',
                text: 'Работаем уже полгода. Никаких проблем с приёмкой, всё чётко и в срок. Персональный менеджер всегда на связи.',
                rating: 5
              },
              {
                name: 'Елена Смирнова',
                company: 'Бренд косметики',
                text: 'Особенно понравилось качество упаковки и фотосъёмки товаров. Конверсия выросла благодаря качественному контенту.',
                rating: 5
              }
            ].map((review, i) => (
              <div key={i} className="p-6 rounded-2xl shadow-sm ring-1 bg-white" style={{ borderColor: '#E5E7EB' }}>
                <div className="flex mb-3">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-current" style={{ color: '#FCD34D' }} />
                  ))}
                </div>
                <p className="text-sm mb-4 italic" style={{ color: '#4B5563' }}>"{review.text}"</p>
                <div>
                  <div className="font-semibold" style={{ color: COLORS.dark }}>{review.name}</div>
                  <div className="text-xs" style={{ color: '#6B7280' }}>{review.company}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* Тарифы */}
      <Section id="pricing" className="py-8">
        <div className="p-6 rounded-3xl shadow-sm ring-1 bg-white" style={{ borderColor: '#E5E7EB' }}>
          <h2 className="text-2xl md:text-3xl font-bold" style={{ color: COLORS.dark }}>Тарифы</h2>
          <div className="overflow-x-auto mt-6">
            <table className="w-full text-left text-sm">
              <thead><tr style={{ backgroundColor: '#F3F4F6' }}><th className="p-3 rounded-l-xl">Услуга</th><th className="p-3">Конкуренты</th><th className="p-3 rounded-r-xl">Полка+</th></tr></thead>
              <tbody>
                <tr className="border-t" style={{ borderColor: '#E5E7EB' }}><td className="p-3">Забор (город)</td><td className="p-3">≈1000 ₽/паллет; 100 ₽/короб</td><td className="p-3">{money(PRICES.pickup.pallet)} / паллет; {money(PRICES.pickup.box)} / короб; от 10 паллет — {money(PRICES.pickup.palletBulk)}</td></tr>
                <tr className="border-t" style={{ borderColor: '#E5E7EB' }}><td className="p-3">Пересчёт + брак</td><td className="p-3">≈2 ₽/шт.</td><td className="p-3">до 1000 — {money(PRICES.count.upTo1000)}/шт.; 1000+ — {money(PRICES.count.over1000)}/шт.</td></tr>
                <tr className="border-t" style={{ borderColor: '#E5E7EB' }}><td className="p-3">Маркировка</td><td className="p-3">5–12 ₽/шт.</td><td className="p-3">до 100 — {money(PRICES.mark.lt100)}/шт.; 100–500 — {money(PRICES.mark.lt500)}/шт.; 500+ — {money(PRICES.mark.gte500)}/шт.</td></tr>
                <tr className="border-t" style={{ borderColor: '#E5E7EB' }}><td className="p-3">Упаковка</td><td className="p-3">10–17 ₽/шт.</td><td className="p-3">БОПП малый {money(PRICES.pack.boppSmall)}, большой {money(PRICES.pack.boppLarge)}; Zip‑Lock малый {money(PRICES.pack.zipSmall)}, большой {money(PRICES.pack.zipLarge)}; комплектация {money(PRICES.pack.bundle)}/шт.</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* Калькулятор */}
      <Section id="calculator" className="py-16">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="p-6 rounded-3xl shadow-sm ring-1 bg-white" style={{ borderColor: '#E5E7EB' }}>
            <h3 className="text-xl font-bold" style={{ color: COLORS.dark }}>Калькулятор</h3>
            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              {[{k:'palletsPickup',label:'Паллет на забор'},{k:'boxesPickup',label:'Коробок на забор'},{k:'unitsCount',label:'Единиц на пересчёт',},{k:'unitsMark',label:'Единиц на маркировку/упаковку'},{k:'bundles',label:'Комплектация (шт)'},{k:'storageBoxes',label:'Коробов на хранение'},{k:'storagePallets',label:'Паллет на хранение'},{k:'storageDays',label:'Дней хранения'},{k:'cubesDelivery',label:'Кубов на доставку'},{k:'extraBoxesDelivery',label:'Доп. коробов (доставка)'},{k:'palletsDelivery',label:'Паллет на доставку'},{k:'photoSkus',label:'SKU на фото'},{k:'spins',label:'SKU 360°'},{k:'videos',label:'Видео (шт)'},{k:'shipments',label:'Создание поставок (шт)'},{k:'honestSignUnits',label:'Честный знак (шт)'}].map(i=> (
                <label key={i.k} className="text-sm"><span className="block mb-1" style={{ color: '#4B5563' }}>{i.label}</span><input type="number" min={0} value={input[i.k]} onChange={handle(i.k)} className="w-full rounded-xl border px-3 py-2" style={{ borderColor: '#D1D5DB' }} /></label>
              ))}
              <label className="text-sm"><span className="block mb-1" style={{ color: '#4B5563' }}>Тип упаковки</span><select value={input.packType} onChange={handle('packType')} className="w-full rounded-xl border px-3 py-2" style={{ borderColor: '#D1D5DB' }}><option value="boppSmall">БОПП малый</option><option value="boppLarge">БОПП большой</option><option value="zipSmall">Zip‑Lock малый</option><option value="zipLarge">Zip‑Lock большой</option></select></label>
            </div>
          </div>

          <div className="p-6 rounded-3xl shadow-sm ring-1 bg-white" style={{ borderColor: '#E5E7EB' }}>
            <h3 className="text-xl font-bold" style={{ color: COLORS.dark }}>Итог расчёта</h3>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span>Забор</span><span className="font-semibold">{money(total.pickup)}</span></div>
              <div className="flex justify-between"><span>Пересчёт/брак</span><span className="font-semibold">{money(total.count)}</span></div>
              <div className="flex justify-between"><span>Маркировка</span><span className="font-semibold">{money(total.mark)}</span></div>
              <div className="flex justify-between"><span>Упаковка</span><span className="font-semibold">{money(total.pack)}</span></div>
              <div className="flex justify-between"><span>Хранение</span><span className="font-semibold">{money(total.storage)}</span></div>
              <div className="flex justify-between"><span>Доставка</span><span className="font-semibold">{money(total.delivery)}</span></div>
              <div className="flex justify-between"><span>Контент</span><span className="font-semibold">{money(total.photo)}</span></div>
              <div className="flex justify-between"><span>Доп. услуги</span><span className="font-semibold">{money(total.extras)}</span></div>
              <div className="border-t pt-3 mt-3 flex justify-between text-lg font-bold" style={{ borderColor: '#E5E7EB' }}><span>Итого</span><span>{money(total.sum)}</span></div>
            </div>
            <a href="#contact" className="mt-6 inline-block px-5 py-3 rounded-2xl font-semibold" style={{ backgroundColor: COLORS.pink, color: 'white' }} onClick={() => setActivePage('home')}>Оставить заявку</a>
          </div>
        </div>
      </Section>

      {/* Блог/FAQ */}
      <Section id="blog" className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold" style={{ color: COLORS.dark }}>Блог и частые вопросы</h2>
          <p className="mt-3 text-lg" style={{ color: '#6B7280' }}>Отвечаем на популярные вопросы о фулфилменте</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {[
            {
              q: 'Сколько стоит фулфилмент для начинающих селлеров?',
              a: 'Для малых объёмов (до 1000 единиц в месяц) стоимость составит примерно 15-20 ₽ за единицу с учётом всех услуг. Первые 3 дня хранения бесплатно, что снижает общие затраты.'
            },
            {
              q: 'Как происходит приёмка товара?',
              a: 'Мы принимаем товар из любых транспортных компаний, проверяем количество и состояние. Гарантируем приёмку 99,5% поставок. При обнаружении брака сразу уведомляем клиента.'
            },
            {
              q: 'Работаете ли вы с «Честным знаком»?',
              a: 'Да, оказываем услуги маркировки товаров по системе «Честный знак». Стоимость — 2 ₽ за единицу. Полностью соблюдаем требования законодательства.'
            },
            {
              q: 'Какие маркетплейсы поддерживаете?',
              a: 'Работаем с Wildberries, Ozon, Яндекс.Маркет, Lamoda, Avito. Знаем специфику каждой площадки и требования к упаковке и маркировке.'
            },
            {
              q: 'Как быстро обрабатываете заказы?',
              a: 'Стандартное время обработки — 1-2 рабочих дня. При срочной необходимости можем обработать в день поступления. Отгружаем ежедневно кроме воскресенья.'
            },
            {
              q: 'Предоставляете ли отчётность?',
              a: 'Да, ведём подробную отчётность по всем операциям. Персональный менеджер предоставляет еженедельные отчёты и доступ к системе отслеживания в режиме 24/7.'
            },
            {
              q: 'Есть ли минимальный объём для работы?',
              a: 'Минимального объёма нет. Работаем как с крупными, так и с начинающими селлерами. Тарифы рассчитываются индивидуально в зависимости от объёмов.'
            },
            {
              q: 'Как происходит доставка на склады МП?',
              a: 'Используем собственный транспорт для доставки в Новосемейкино и федеральные распределительные центры. Стоимость доставки — 400 ₽ за кубометр.'
            }
          ].map(({ q, a }, index) => (
            <details key={index} className="rounded-2xl shadow-sm ring-1 bg-white" style={{ borderColor: '#E5E7EB' }}>
              <summary className="px-6 py-4 cursor-pointer select-none">
                <span className="text-lg font-semibold" style={{ color: COLORS.dark }}>{q}</span>
              </summary>
              <div className="px-6 pb-4 pt-0">
                <p className="text-sm leading-relaxed" style={{ color: '#4B5563' }}>{a}</p>
              </div>
            </details>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="p-6 rounded-2xl" style={{ backgroundColor: `${COLORS.pink}0D` }}>
            <h3 className="text-xl font-semibold mb-3" style={{ color: COLORS.dark }}>Не нашли ответ на свой вопрос?</h3>
            <p className="mb-4" style={{ color: '#6B7280' }}>Свяжитесь с нами, и наш менеджер ответит в течение 15 минут</p>
            <a href="#contact" className="inline-block px-6 py-3 rounded-2xl font-semibold" style={{ backgroundColor: COLORS.pink, color: 'white' }} onClick={() => setActivePage('home')}>
              Задать вопрос
            </a>
          </div>
        </div>
      </Section>

      {/* О компании */}
      <Section id="about" className="py-16">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: COLORS.dark }}>О компании</h2>
            <p className="mt-3" style={{ color: '#374151' }}>Мы — самарский фулфилмент‑центр Полка+. Помогаем селлерам Wildberries, Ozon, Яндекс.Маркет расти быстрее: берём на себя рутину и снижаем логистические косты. Работаем по FBO/FBS, кросс‑док, интеграция с РЦ, персональный менеджер 24/7.</p>
            <ul className="mt-4 space-y-2 text-sm" style={{ color: '#374151' }}>
              <li className="flex items-start gap-2"><CheckIcon/>Гарантия приёмки 99,5% поставок</li>
              <li className="flex items-start gap-2"><CheckIcon/>Склад класса А, видеонаблюдение, адресное хранение</li>
              <li className="flex items-start gap-2"><CheckIcon/>Первые 3 дня хранения — бесплатно</li>
            </ul>
          </div>
          <div className="rounded-3xl p-6 shadow-sm ring-1 bg-white" style={{ borderColor: '#E5E7EB' }}>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 rounded-2xl" style={{ backgroundColor: COLORS.lightBg }}>
                <div className="text-2xl font-extrabold" style={{ color: COLORS.dark }}>10–20%</div>
                <div className="text-xs mt-1" style={{ color: '#6B7280' }}>экономия к рынку</div>
              </div>
              <div className="p-4 rounded-2xl" style={{ backgroundColor: COLORS.lightBg }}>
                <div className="text-2xl font-extrabold" style={{ color: COLORS.dark }}>24/7</div>
                <div className="text-xs mt-1" style={{ color: '#6B7280' }}>поддержка</div>
              </div>
              <div className="p-4 rounded-2xl" style={{ backgroundColor: COLORS.lightBg }}>
                <div className="text-2xl font-extrabold" style={{ color: COLORS.dark }}>3 дня</div>
                <div className="text-xs mt-1" style={{ color: '#6B7280' }}>хранение бесплатно</div>
              </div>
              <div className="p-4 rounded-2xl" style={{ backgroundColor: COLORS.lightBg }}>
                <div className="text-2xl font-extrabold" style={{ color: COLORS.dark }}>99,5%</div>
                <div className="text-xs mt-1" style={{ color: '#6B7280' }}>приёмка поставок</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Контакты */}
      <div id="contact" style={{ backgroundColor: COLORS.dark, color: 'white' }}>
        <Section className="py-16">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Связаться с нами</h2>
              <p className="mt-2 text-neutral-300">Оставьте заявку — вышлем персональные условия и договор.</p>
              
              <div className="mt-8 space-y-4 text-neutral-300">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: COLORS.pink }}>
                    📞
                  </div>
                  <span>+7 (800) 123-45-67</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: COLORS.pink }}>
                    ✉️
                  </div>
                  <span>info@polka-plus.ru</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: COLORS.pink }}>
                    📍
                  </div>
                  <span>Самара, ул. Складская, 123</span>
                </div>
              </div>
            </div>

            <div>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <input 
                    placeholder="Имя *" 
                    value={contactForm.name}
                    onChange={handleContactChange('name')}
                    className="w-full rounded-xl px-4 py-3 text-neutral-900" 
                  />
                  {formErrors.name && <p className="text-red-400 text-sm mt-1">{formErrors.name}</p>}
                </div>
                
                <div>
                  <input 
                    placeholder="Телефон или Telegram *" 
                    value={contactForm.phone}
                    onChange={handleContactChange('phone')}
                    className="w-full rounded-xl px-4 py-3 text-neutral-900" 
                  />
                  {formErrors.phone && <p className="text-red-400 text-sm mt-1">{formErrors.phone}</p>}
                </div>
                
                <div>
                  <input 
                    placeholder="E‑mail" 
                    value={contactForm.email}
                    onChange={handleContactChange('email')}
                    className="w-full rounded-xl px-4 py-3 text-neutral-900" 
                  />
                  {formErrors.email && <p className="text-red-400 text-sm mt-1">{formErrors.email}</p>}
                </div>
                
                <textarea 
                  placeholder="Кратко опишите объёмы и задачи" 
                  value={contactForm.message}
                  onChange={handleContactChange('message')}
                  className="w-full rounded-xl px-4 py-3 text-neutral-900" 
                  rows={4} 
                />
                
                <button type="submit" className="w-full mt-4 px-5 py-3 rounded-2xl font-semibold" style={{ backgroundColor: COLORS.pink, color: 'white' }}>
                  Отправить заявку
                </button>
              </form>
            </div>
          </div>
        </Section>
      </div>

      <footer className="py-8 text-center text-sm" style={{ color: '#6B7280' }}>
        © {new Date().getFullYear()} Полка+. Фулфилмент в Самаре и области.
      </footer>

      {/* Плавающие кнопки */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        {/* Мессенджеры */}
        <div className="flex flex-col gap-2">
          {/* ВКонтакте */}
          <button
            onClick={() => alert('Переход в ВК (пока заглушка)')}
            className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group relative"
            style={{ backgroundColor: '#0077FF' }}
            aria-label="ВКонтакте"
          >
            <MessageCircle className="w-5 h-5 text-white" />
            
            {/* Tooltip */}
            <div className="absolute right-full mr-3 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              ВКонтакте
              <div className="absolute top-1/2 -translate-y-1/2 left-full w-1.5 h-1.5 bg-gray-900 rotate-45"></div>
            </div>
          </button>

          {/* Telegram */}
          <button
            onClick={() => alert('Переход в Telegram (пока заглушка)')}
            className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group relative"
            style={{ backgroundColor: '#0088cc' }}
            aria-label="Telegram"
          >
            <Send className="w-5 h-5 text-white" />
            
            {/* Tooltip */}
            <div className="absolute right-full mr-3 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Telegram
              <div className="absolute top-1/2 -translate-y-1/2 left-full w-1.5 h-1.5 bg-gray-900 rotate-45"></div>
            </div>
          </button>

          {/* MAX */}
          <button
            onClick={() => alert('Переход в MAX (пока заглушка)')}
            className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group relative"
            style={{ backgroundColor: '#00C853' }}
            aria-label="MAX"
          >
            <Mail className="w-5 h-5 text-white" />
            
            {/* Tooltip */}
            <div className="absolute right-full mr-3 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              MAX
              <div className="absolute top-1/2 -translate-y-1/2 left-full w-1.5 h-1.5 bg-gray-900 rotate-45"></div>
            </div>
          </button>
        </div>

        {/* Кнопка "Наверх" */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
            style={{ backgroundColor: COLORS.pink, color: 'white' }}
            aria-label="Наверх"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}