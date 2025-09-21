import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Zap } from "lucide-react";
import { TechBadge } from "./TechBadge";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full border-b transition-spring ${
      isScrolled 
        ? "glass-card backdrop-blur-xl shadow-elegant border-white/20" 
        : "bg-background/95 backdrop-blur border-border"
    }`}>
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center pulse-glow">
              <Zap className="w-5 h-5 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Полка+
            </h1>
            <TechBadge variant="accent" className="text-xs px-2 py-0.5 -mt-1">
              AI-Powered
            </TechBadge>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#services" className="text-foreground hover:text-primary transition-spring font-medium hover:scale-105">
            Услуги
          </a>
          <a href="#benefits" className="text-foreground hover:text-primary transition-spring font-medium hover:scale-105">
            Преимущества
          </a>
          <a href="#process" className="text-foreground hover:text-primary transition-spring font-medium hover:scale-105">
            Как работаем
          </a>
          <a href="#contact" className="text-foreground hover:text-primary transition-spring font-medium hover:scale-105">
            Контакты
          </a>
        </nav>

        <Button variant="modern" size="lg" className="font-semibold">
          Получить расчет
        </Button>
      </div>
    </header>
  );
};

export default Header;