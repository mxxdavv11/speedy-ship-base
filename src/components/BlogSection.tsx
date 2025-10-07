import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { ModernCard } from './ModernCard';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Что такое фулфилмент и как он работает?',
    excerpt: 'Фулфилмент — это ваш ключ к успешному бизнесу. Узнайте, как компания может взять на себя все логистические процессы...',
    date: '15.10.2024',
    category: 'Обучение',
    image: '📦'
  },
  {
    id: '2',
    title: 'FBO или FBS: что выбрать для вашего бизнеса?',
    excerpt: 'Разбираемся в различиях между FBO и FBS. Какая модель подойдет именно вам и как максимизировать прибыль...',
    date: '20.10.2024',
    category: 'Стратегия',
    image: '🎯'
  },
  {
    id: '3',
    title: 'Как выбрать транспортную компанию?',
    excerpt: 'Вы закупили товар и вам необходимо отгрузить его на склад. Советы по выбору надежного перевозчика...',
    date: '25.10.2024',
    category: 'Логистика',
    image: '🚚'
  }
];

export const BlogSection: React.FC = () => {
  return (
    <section id="blog" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок секции */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Блог
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Полезные статьи и советы по работе с маркетплейсами
          </p>
        </div>

        {/* Сетка статей */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <ModernCard
              key={post.id}
              className="group cursor-pointer overflow-hidden hover:shadow-glow transition-all duration-300 animate-fade-in"
            >
              {/* Иконка вместо изображения */}
              <div className="aspect-video bg-gradient-primary flex items-center justify-center text-8xl group-hover:scale-110 transition-transform duration-300">
                {post.image}
              </div>

              {/* Контент карточки */}
              <div className="p-6">
                {/* Категория и дата */}
                <div className="flex items-center gap-4 mb-3 text-sm">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                </div>

                {/* Заголовок */}
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>

                {/* Описание */}
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Кнопка "Читать" */}
                <button className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-4 transition-all">
                  Читать статью
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </ModernCard>
          ))}
        </div>

        {/* Кнопка "Все статьи" */}
        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-surface-light hover:bg-primary hover:text-white border border-border hover:border-primary rounded-xl font-semibold transition-all duration-300 hover:shadow-glow">
            Все статьи блога
          </button>
        </div>
      </div>
    </section>
  );
};
