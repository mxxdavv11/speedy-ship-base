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
              <Button size="lg" variant="hero" className="text-lg">
                Начать сотрудничество
              </Button>
              <Button size="lg" variant="outline" className="text-lg">
                Узнать больше
              </Button>
            </div>
          </div>

          {/* Правая колонка - фото команды */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl">
              <img 
                src={teamPhoto} 
                alt="Команда Полка+ на складе" 
                className="w-full h-auto object-cover"
              />
              {/* Градиентный оверлей */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent"></div>
              {/* Декоративная рамка */}
              <div className="absolute inset-0 ring-1 ring-white/10 rounded-2xl"></div>
            </div>
            
            {/* Декоративные элементы */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-hero opacity-20 blur-2xl rounded-full animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-primary/30 to-secondary/30 opacity-30 blur-3xl rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;