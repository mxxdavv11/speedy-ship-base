const steps = [
  {
    number: "01",
    title: "Прием товара",
    description: "Доставляете товар на наш склад, мы проводим приемку и размещение"
  },
  {
    number: "02", 
    title: "Интеграция систем",
    description: "Подключаем ваш интернет-магазин к нашей системе управления"
  },
  {
    number: "03",
    title: "Обработка заказов",
    description: "Автоматически получаем заказы и проводим комплектацию"
  },
  {
    number: "04",
    title: "Упаковка и отправка",
    description: "Упаковываем товар и передаем курьерской службе для доставки"
  }
];

const Process = () => {
  return (
    <section id="process" className="py-24 bg-gradient-subtle">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Как мы работаем
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Простой и прозрачный процесс от первого заказа до доставки клиенту
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection line for larger screens */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary to-accent transform translate-x-1/2 z-0"></div>
              )}
              
              <div className="relative z-10 text-center">
                <div className="w-24 h-24 bg-gradient-hero rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;