import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-border">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            FulFillPro
          </h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#services" className="text-foreground hover:text-primary transition-colors">
            Услуги
          </a>
          <a href="#benefits" className="text-foreground hover:text-primary transition-colors">
            Преимущества
          </a>
          <a href="#process" className="text-foreground hover:text-primary transition-colors">
            Как работаем
          </a>
          <a href="#contact" className="text-foreground hover:text-primary transition-colors">
            Контакты
          </a>
        </nav>

        <Button variant="hero">
          Получить расчет
        </Button>
      </div>
    </header>
  );
};

export default Header;