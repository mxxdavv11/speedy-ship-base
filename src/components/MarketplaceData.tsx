import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ModernCard } from './ModernCard';
import { RefreshCw, Package, ShoppingCart, TrendingUp, Warehouse } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MarketplaceStats {
  totalOrders: number;
  totalProducts: number;
  totalRevenue: number;
  wbOrders: number;
  ozonOrders: number;
}

export const MarketplaceData: React.FC = () => {
  const [stats, setStats] = useState<MarketplaceStats>({
    totalOrders: 0,
    totalProducts: 0,
    totalRevenue: 0,
    wbOrders: 0,
    ozonOrders: 0,
  });
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Загрузить статистику заказов
      const { data: orders } = await supabase
        .from('marketplace_orders')
        .select('marketplace, total_amount')
        .eq('user_id', user.id);

      // Загрузить статистику товаров
      const { data: products } = await supabase
        .from('marketplace_products')
        .select('marketplace, stock_quantity')
        .eq('user_id', user.id);

      const wbOrders = orders?.filter(o => o.marketplace === 'wildberries').length || 0;
      const ozonOrders = orders?.filter(o => o.marketplace === 'ozon').length || 0;
      const totalRevenue = orders?.reduce((sum, o) => sum + (Number(o.total_amount) || 0), 0) || 0;

      setStats({
        totalOrders: orders?.length || 0,
        totalProducts: products?.length || 0,
        totalRevenue,
        wbOrders,
        ozonOrders,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const syncMarketplace = async (marketplace: 'wildberries' | 'ozon') => {
    setSyncing(marketplace);
    try {
      const functionName = marketplace === 'wildberries' ? 'wildberries-sync' : 'ozon-sync';
      
      // Синхронизация заказов
      const { data: ordersData, error: ordersError } = await supabase.functions.invoke(functionName, {
        body: { action: 'sync_orders' },
      });

      if (ordersError) throw ordersError;

      // Синхронизация товаров
      const { data: productsData, error: productsError } = await supabase.functions.invoke(functionName, {
        body: { action: 'sync_products' },
      });

      if (productsError) throw productsError;

      toast({
        title: 'Успешно',
        description: `Данные ${marketplace === 'wildberries' ? 'Wildberries' : 'Ozon'} синхронизированы`,
      });

      await loadStats();
    } catch (error: any) {
      console.error('Sync error:', error);
      toast({
        title: 'Ошибка синхронизации',
        description: error.message || 'Не удалось синхронизировать данные',
        variant: 'destructive',
      });
    } finally {
      setSyncing(null);
    }
  };

  if (loading) {
    return (
      <ModernCard className="p-6">
        <div className="flex items-center gap-2">
          <RefreshCw className="w-5 h-5 animate-spin text-primary" />
          <span>Загрузка данных...</span>
        </div>
      </ModernCard>
    );
  }

  return (
    <div className="space-y-6">
      {/* Общая статистика */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ModernCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Всего заказов</p>
              <p className="text-3xl font-bold mt-1">{stats.totalOrders}</p>
              <div className="flex gap-2 mt-2 text-xs text-muted-foreground">
                <span>WB: {stats.wbOrders}</span>
                <span>•</span>
                <span>Ozon: {stats.ozonOrders}</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-primary" />
            </div>
          </div>
        </ModernCard>

        <ModernCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Товаров на складе</p>
              <p className="text-3xl font-bold mt-1">{stats.totalProducts}</p>
            </div>
            <div className="w-12 h-12 bg-accent-green/10 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-accent-green" />
            </div>
          </div>
        </ModernCard>

        <ModernCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Общая выручка</p>
              <p className="text-3xl font-bold mt-1">
                {new Intl.NumberFormat('ru-RU', {
                  style: 'currency',
                  currency: 'RUB',
                  maximumFractionDigits: 0,
                }).format(stats.totalRevenue)}
              </p>
            </div>
            <div className="w-12 h-12 bg-primary-violet/10 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary-violet" />
            </div>
          </div>
        </ModernCard>
      </div>

      {/* Кнопки синхронизации */}
      <ModernCard glass className="p-6">
        <h3 className="text-lg font-semibold mb-4">Синхронизация с маркетплейсами</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => syncMarketplace('wildberries')}
            disabled={syncing !== null}
            className="flex items-center justify-center gap-3 p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-surface-light/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {syncing === 'wildberries' ? (
              <RefreshCw className="w-5 h-5 animate-spin text-primary" />
            ) : (
              <Warehouse className="w-5 h-5 text-purple-500" />
            )}
            <div className="text-left">
              <p className="font-medium">Wildberries</p>
              <p className="text-sm text-muted-foreground">
                {syncing === 'wildberries' ? 'Синхронизация...' : 'Синхронизировать данные'}
              </p>
            </div>
          </button>

          <button
            onClick={() => syncMarketplace('ozon')}
            disabled={syncing !== null}
            className="flex items-center justify-center gap-3 p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-surface-light/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {syncing === 'ozon' ? (
              <RefreshCw className="w-5 h-5 animate-spin text-primary" />
            ) : (
              <Warehouse className="w-5 h-5 text-blue-500" />
            )}
            <div className="text-left">
              <p className="font-medium">Ozon</p>
              <p className="text-sm text-muted-foreground">
                {syncing === 'ozon' ? 'Синхронизация...' : 'Синхронизировать данные'}
              </p>
            </div>
          </button>
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          💡 Синхронизация загружает последние данные о заказах и остатках товаров с маркетплейсов
        </p>
      </ModernCard>
    </div>
  );
};
