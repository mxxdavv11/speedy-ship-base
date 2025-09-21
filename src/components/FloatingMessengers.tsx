import { useState } from "react";
import { Send, MessageCircle, Mail, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

export const FloatingMessengers = () => {
  const [isOpen, setIsOpen] = useState(false);

  const messengers = [
    {
      name: "ВКонтакте",
      icon: MessageCircle,
      color: "#0077FF",
      action: () => alert('Переход в ВК (пока заглушка)')
    },
    {
      name: "Telegram", 
      icon: Send,
      color: "#0088cc",
      action: () => alert('Переход в Telegram (пока заглушка)')
    },
    {
      name: "MAX",
      icon: Mail, 
      color: "#00C853",
      action: () => alert('Переход в MAX (пока заглушка)')
    }
  ];

  const toggleMessengers = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col-reverse items-end gap-3 z-50">
      {/* Главная кнопка */}
      <button
        onClick={toggleMessengers}
        className={cn(
          "w-14 h-14 rounded-full shadow-elegant flex items-center justify-center transition-all duration-300 hover:scale-110 glass-card backdrop-blur-md",
          isOpen ? "bg-red-500/80" : "bg-gradient-primary"
        )}
        aria-label={isOpen ? "Закрыть мессенджеры" : "Открыть мессенджеры"}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Кнопки мессенджеров */}
      <div className={cn(
        "flex flex-col gap-2 transition-all duration-500 transform origin-bottom",
        isOpen 
          ? "opacity-100 scale-100 translate-y-0" 
          : "opacity-0 scale-75 translate-y-4 pointer-events-none"
      )}>
        {messengers.map((messenger, index) => (
          <button
            key={messenger.name}
            onClick={messenger.action}
            className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group relative animate-slide-up"
            style={{ 
              backgroundColor: messenger.color,
              animationDelay: `${index * 100}ms`
            }}
            aria-label={messenger.name}
          >
            <messenger.icon className="w-5 h-5 text-white" />
            
            {/* Tooltip */}
            <div className="absolute right-full mr-3 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {messenger.name}
              <div className="absolute top-1/2 -translate-y-1/2 left-full w-1.5 h-1.5 bg-gray-900 rotate-45"></div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};