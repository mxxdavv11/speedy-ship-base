import React from 'react';

interface StickerPerson {
  id: string;
  emoji: string;
  name: string;
  role: string;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  size: string;
  delay: string;
}

const PEOPLE: StickerPerson[] = [
  {
    id: '1',
    emoji: '👨‍💼',
    name: 'Менеджер',
    role: 'Всегда на связи',
    position: { top: '10%', left: '5%' },
    size: 'text-6xl',
    delay: '0s'
  },
  {
    id: '2',
    emoji: '👩‍💻',
    name: 'Оператор',
    role: 'Контролирует процесс',
    position: { top: '30%', right: '8%' },
    size: 'text-7xl',
    delay: '0.5s'
  },
  {
    id: '3',
    emoji: '🚚',
    name: 'Логист',
    role: 'Доставка точно в срок',
    position: { bottom: '20%', left: '10%' },
    size: 'text-5xl',
    delay: '1s'
  },
  {
    id: '4',
    emoji: '📦',
    name: 'Упаковщик',
    role: 'Бережная упаковка',
    position: { top: '60%', right: '15%' },
    size: 'text-6xl',
    delay: '1.5s'
  }
];

export const PeopleStickers: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {PEOPLE.map((person) => (
        <div
          key={person.id}
          className="absolute animate-float"
          style={{
            ...person.position,
            animationDelay: person.delay,
            animationDuration: '6s'
          }}
        >
          <div className="relative group">
            {/* Emoji стикер */}
            <div className={`${person.size} filter drop-shadow-lg transition-transform duration-300 group-hover:scale-110`}>
              {person.emoji}
            </div>
            
            {/* Tooltip при наведении */}
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto">
              <div className="bg-surface-light/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-elegant border border-border whitespace-nowrap">
                <p className="font-semibold text-sm">{person.name}</p>
                <p className="text-xs text-muted-foreground">{person.role}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
