const benefits = [
  {
    number: "85%",
    title: "Снижение затрат",
    description: "на логистику в среднем"
  },
  {
    number: "2x",
    title: "Ускорение доставки",
    description: "благодаря оптимизации маршрутов"
  },
  {
    number: "99.5%",
    title: "Точность комплектации",
    description: "автоматизированные процессы"
  },
  {
    number: "24/7",
    title: "Мониторинг заказов",
    description: "в реальном времени"
  }
];

const Benefits = () => {
  return (
    <section id="benefits" className="py-24">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Почему выбирают нас
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Работаем с более чем 500 компаниями и обрабатываем миллионы заказов ежемесячно
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-2">
                {benefit.number}
              </div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-gradient-hero rounded-2xl p-8 md:p-12 text-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Готовы оптимизировать свою логистику?
          </h3>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Получите персональный расчет стоимости услуг фулфилмента для вашего бизнеса
          </p>
          <button className="bg-white text-primary hover:bg-white/90 transition-colors px-8 py-4 rounded-lg font-semibold text-lg">
            Получить расчет
          </button>
        </div>
      </div>
    </section>
  );
};

export default Benefits;