import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthFormsProps {
  onSuccess: () => void;
  onSwitchMode: () => void;
  mode: 'login' | 'register';
}

export const AuthForms: React.FC<AuthFormsProps> = ({ onSuccess, onSwitchMode, mode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'register') {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
            },
          },
        });

        if (error) throw error;

        toast({
          title: 'Успешно!',
          description: 'Аккаунт создан. Входим...',
        });

        onSuccess();
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        toast({
          title: 'Добро пожаловать!',
          description: 'Вы успешно вошли в систему',
        });

        onSuccess();
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      toast({
        title: 'Ошибка',
        description: error.message || 'Произошла ошибка при авторизации',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {mode === 'register' && (
        <div>
          <label className="block text-sm font-medium mb-2">Имя</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:outline-none"
            placeholder="Введите ваше имя"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:outline-none"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Пароль</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:outline-none"
          placeholder="••••••••"
        />
        {mode === 'register' && (
          <p className="text-xs text-muted-foreground mt-1">Минимум 6 символов</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? 'Загрузка...' : mode === 'register' ? 'Зарегистрироваться' : 'Войти'}
      </button>

      <div className="text-center text-sm text-muted-foreground">
        {mode === 'register' ? 'Уже есть аккаунт?' : 'Нет аккаунта?'}{' '}
        <button
          type="button"
          onClick={onSwitchMode}
          className="text-primary hover:underline font-medium"
        >
          {mode === 'register' ? 'Войти' : 'Зарегистрироваться'}
        </button>
      </div>
    </form>
  );
};
