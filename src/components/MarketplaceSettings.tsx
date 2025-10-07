import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ModernCard } from './ModernCard';
import { ShoppingBag, Key, Trash2, Save, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MarketplaceCredential {
  id: string;
  marketplace: 'wildberries' | 'ozon';
  api_key: string;
  api_secret?: string;
  is_active: boolean;
}

export const MarketplaceSettings: React.FC = () => {
  const [credentials, setCredentials] = useState<MarketplaceCredential[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [wbApiKey, setWbApiKey] = useState('');
  const [ozonClientId, setOzonClientId] = useState('');
  const [ozonApiKey, setOzonApiKey] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    loadCredentials();
  }, []);

  const loadCredentials = async () => {
    try {
      const { data, error } = await supabase
        .from('marketplace_credentials')
        .select('*')
        .order('marketplace');

      if (error) throw error;
      
      setCredentials((data || []) as MarketplaceCredential[]);
      
      // Заполнить поля существующими ключами
      const wb = data?.find(c => c.marketplace === 'wildberries');
      const oz = data?.find(c => c.marketplace === 'ozon');
      
      if (wb) setWbApiKey(wb.api_key);
      if (oz) {
        setOzonClientId(oz.api_key);
        setOzonApiKey(oz.api_secret || '');
      }
    } catch (error) {
      console.error('Error loading credentials:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить настройки API',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const saveCredentials = async (marketplace: 'wildberries' | 'ozon') => {
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Не авторизован');

      const credential = {
        user_id: user.id,
        marketplace,
        api_key: marketplace === 'wildberries' ? wbApiKey : ozonClientId,
        api_secret: marketplace === 'ozon' ? ozonApiKey : null,
        is_active: true,
      };

      const { error } = await supabase
        .from('marketplace_credentials')
        .upsert(credential, {
          onConflict: 'user_id,marketplace',
        });

      if (error) throw error;

      toast({
        title: 'Успешно',
        description: `API ключи ${marketplace === 'wildberries' ? 'Wildberries' : 'Ozon'} сохранены`,
      });

      await loadCredentials();
    } catch (error) {
      console.error('Error saving credentials:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось сохранить API ключи',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const deleteCredentials = async (marketplace: 'wildberries' | 'ozon') => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Не авторизован');

      const { error } = await supabase
        .from('marketplace_credentials')
        .delete()
        .eq('user_id', user.id)
        .eq('marketplace', marketplace);

      if (error) throw error;

      toast({
        title: 'Успешно',
        description: `API ключи ${marketplace === 'wildberries' ? 'Wildberries' : 'Ozon'} удалены`,
      });

      if (marketplace === 'wildberries') setWbApiKey('');
      if (marketplace === 'ozon') {
        setOzonClientId('');
        setOzonApiKey('');
      }

      await loadCredentials();
    } catch (error) {
      console.error('Error deleting credentials:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось удалить API ключи',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <ModernCard className="p-6">
        <div className="flex items-center gap-2">
          <RefreshCw className="w-5 h-5 animate-spin text-primary" />
          <span>Загрузка...</span>
        </div>
      </ModernCard>
    );
  }

  const hasWbKey = credentials.some(c => c.marketplace === 'wildberries');
  const hasOzonKey = credentials.some(c => c.marketplace === 'ozon');

  return (
    <div className="space-y-6">
      {/* Wildberries */}
      <ModernCard className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
            <ShoppingBag className="w-6 h-6 text-purple-500" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Wildberries</h3>
            <p className="text-sm text-muted-foreground">
              {hasWbKey ? 'API ключ настроен ✓' : 'API ключ не настроен'}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              <Key className="w-4 h-4 inline mr-1" />
              API Ключ
            </label>
            <input
              type="password"
              value={wbApiKey}
              onChange={(e) => setWbApiKey(e.target.value)}
              placeholder="Введите API ключ Wildberries"
              className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:outline-none"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Получить в личном кабинете WB → Настройки → Доступ к API
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => saveCredentials('wildberries')}
              disabled={!wbApiKey || saving}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Save className="w-4 h-4" />
              Сохранить
            </button>
            {hasWbKey && (
              <button
                onClick={() => deleteCredentials('wildberries')}
                className="flex items-center gap-2 px-4 py-2 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Удалить
              </button>
            )}
          </div>
        </div>
      </ModernCard>

      {/* Ozon */}
      <ModernCard className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
            <ShoppingBag className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Ozon</h3>
            <p className="text-sm text-muted-foreground">
              {hasOzonKey ? 'API ключи настроены ✓' : 'API ключи не настроены'}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              <Key className="w-4 h-4 inline mr-1" />
              Client ID
            </label>
            <input
              type="text"
              value={ozonClientId}
              onChange={(e) => setOzonClientId(e.target.value)}
              placeholder="Введите Client ID"
              className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              <Key className="w-4 h-4 inline mr-1" />
              API Key
            </label>
            <input
              type="password"
              value={ozonApiKey}
              onChange={(e) => setOzonApiKey(e.target.value)}
              placeholder="Введите API Key"
              className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:outline-none"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Получить в личном кабинете Ozon → Настройки → Seller API
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => saveCredentials('ozon')}
              disabled={!ozonClientId || !ozonApiKey || saving}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Save className="w-4 h-4" />
              Сохранить
            </button>
            {hasOzonKey && (
              <button
                onClick={() => deleteCredentials('ozon')}
                className="flex items-center gap-2 px-4 py-2 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Удалить
              </button>
            )}
          </div>
        </div>
      </ModernCard>

      {/* Инструкция */}
      <ModernCard glass className="p-6">
        <h4 className="font-semibold mb-3">📚 Как получить API ключи?</h4>
        <div className="space-y-3 text-sm text-muted-foreground">
          <div>
            <strong className="text-foreground">Wildberries:</strong>
            <ol className="list-decimal list-inside ml-2 mt-1 space-y-1">
              <li>Войдите в личный кабинет продавца</li>
              <li>Перейдите в Настройки → Доступ к API</li>
              <li>Создайте новый токен с правами на чтение заказов и остатков</li>
              <li>Скопируйте токен и вставьте выше</li>
            </ol>
          </div>
          <div>
            <strong className="text-foreground">Ozon:</strong>
            <ol className="list-decimal list-inside ml-2 mt-1 space-y-1">
              <li>Войдите в личный кабинет продавца</li>
              <li>Перейдите в Настройки → Seller API</li>
              <li>Сгенерируйте Client ID и API Key</li>
              <li>Скопируйте оба значения и вставьте выше</li>
            </ol>
          </div>
        </div>
      </ModernCard>
    </div>
  );
};
