import { Button } from "@/components/ui/button";
import warehouseHero from "@/assets/warehouse-hero.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${warehouseHero})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/70"></div>
      </div>
      
      <div className="relative container text-center md:text-left z-10">
        <div className="max-w-3xl">
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
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button size="lg" variant="hero" className="text-lg">
              Начать сотрудничество
            </Button>
            <Button size="lg" variant="outline" className="text-lg">
              Узнать больше
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;