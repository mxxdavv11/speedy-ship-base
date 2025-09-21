import { Button } from "@/components/ui/button";
import warehouseHero from "@/assets/warehouse-hero.jpg";
import teamPhoto from "@/assets/team-photo.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${warehouseHero})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/70"></div>
      </div>
      
      <div className="relative container z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Левая колонка - текст */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Полный цикл 
              <span className="bg-gradient-hero bg-clip-text text-transparent block">
                фулфилмента
              </span>
              для вашего бизнеса
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl">
              Склад, упаковка, доставка и возвраты. Мы берем на себя всю логистику, 
              чтобы вы сосредоточились на развитии бизнеса.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="xl" variant="hero" className="text-lg font-semibold">
                Начать сотрудничество
              </Button>
              <Button size="xl" variant="glass" className="text-lg">
                Узнать больше
              </Button>
            </div>
          </div>

          {/* Правая колонка - фото команды */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl group">
              <img 
                src={teamPhoto} 
                alt="Команда Полка+ на складе" 
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Современный градиентный оверлей */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-blue/30 via-primary-violet/20 to-accent-green/20"></div>
              {/* Стеклянная рамка */}
              <div className="absolute inset-0 ring-1 ring-white/20 rounded-2xl glass-card backdrop-blur-sm"></div>
              
              {/* Floating badge */}
              <div className="absolute top-4 right-4 glass-card px-4 py-2 rounded-full floating">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent-green rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium font-mono">24/7</span>
                </div>
              </div>
            </div>
            
            {/* Декоративные современные элементы */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-primary opacity-20 blur-3xl rounded-full pulse-glow"></div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-accent opacity-30 blur-2xl rounded-full floating"></div>
            
            {/* Статистика */}
            <div className="absolute -bottom-4 left-4 right-4 flex gap-4">
              <div className="glass-card px-4 py-3 rounded-xl flex-1 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="text-2xl font-bold font-mono bg-gradient-primary bg-clip-text text-transparent">99.9%</div>
                <div className="text-xs text-muted-foreground">Uptime</div>
              </div>
              <div className="glass-card px-4 py-3 rounded-xl flex-1 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <div className="text-2xl font-bold font-mono bg-gradient-accent bg-clip-text text-transparent">24h</div>
                <div className="text-xs text-muted-foreground">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;