import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    // Get user from auth header
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !user) {
      console.error('Auth error:', userError);
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { action } = await req.json();
    console.log('Wildberries sync action:', action, 'for user:', user.id);

    // Get user's Wildberries credentials
    const { data: credentials, error: credError } = await supabaseClient
      .from('marketplace_credentials')
      .select('*')
      .eq('user_id', user.id)
      .eq('marketplace', 'wildberries')
      .eq('is_active', true)
      .maybeSingle();

    if (credError || !credentials) {
      console.error('Credentials error:', credError);
      return new Response(
        JSON.stringify({ error: 'API ключи Wildberries не найдены. Добавьте их в настройках.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Wildberries API endpoints
    const WB_API_BASE = 'https://suppliers-api.wildberries.ru';

    switch (action) {
      case 'sync_orders': {
        // Get orders from Wildberries
        const ordersResponse = await fetch(`${WB_API_BASE}/api/v3/orders`, {
          headers: {
            'Authorization': credentials.api_key,
            'Content-Type': 'application/json',
          },
        });

        if (!ordersResponse.ok) {
          const errorText = await ordersResponse.text();
          console.error('WB API error:', ordersResponse.status, errorText);
          return new Response(
            JSON.stringify({ error: `Ошибка API Wildberries: ${ordersResponse.status}` }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const ordersData = await ordersResponse.json();
        console.log('Fetched orders:', ordersData.orders?.length || 0);

        // Save orders to database
        if (ordersData.orders && ordersData.orders.length > 0) {
          const ordersToInsert = ordersData.orders.map((order: any) => ({
            user_id: user.id,
            marketplace: 'wildberries',
            order_id: order.id.toString(),
            order_number: order.rid || order.id.toString(),
            status: order.orderUid ? 'delivered' : 'processing',
            total_amount: order.totalPrice || 0,
            items_count: 1,
            delivery_date: order.dateCreated || new Date().toISOString(),
            raw_data: order,
          }));

          const { error: insertError } = await supabaseClient
            .from('marketplace_orders')
            .upsert(ordersToInsert, {
              onConflict: 'user_id,marketplace,order_id',
            });

          if (insertError) {
            console.error('Insert error:', insertError);
            return new Response(
              JSON.stringify({ error: 'Ошибка сохранения заказов' }),
              { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
          }
        }

        return new Response(
          JSON.stringify({ 
            success: true, 
            message: `Синхронизировано заказов: ${ordersData.orders?.length || 0}` 
          }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'sync_products': {
        // Get products/stocks from Wildberries
        const stocksResponse = await fetch(`${WB_API_BASE}/api/v3/stocks`, {
          headers: {
            'Authorization': credentials.api_key,
            'Content-Type': 'application/json',
          },
        });

        if (!stocksResponse.ok) {
          const errorText = await stocksResponse.text();
          console.error('WB API error:', stocksResponse.status, errorText);
          return new Response(
            JSON.stringify({ error: `Ошибка API Wildberries: ${stocksResponse.status}` }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const stocksData = await stocksResponse.json();
        console.log('Fetched products:', stocksData.stocks?.length || 0);

        // Save products to database
        if (stocksData.stocks && stocksData.stocks.length > 0) {
          const productsToInsert = stocksData.stocks.map((stock: any) => ({
            user_id: user.id,
            marketplace: 'wildberries',
            product_id: stock.nmId?.toString() || stock.sku,
            sku: stock.sku,
            name: stock.subject || 'Товар',
            stock_quantity: stock.quantity || 0,
            price: stock.Price || 0,
            warehouse: stock.warehouseName || '',
            last_sync_at: new Date().toISOString(),
            raw_data: stock,
          }));

          const { error: insertError } = await supabaseClient
            .from('marketplace_products')
            .upsert(productsToInsert, {
              onConflict: 'user_id,marketplace,product_id',
            });

          if (insertError) {
            console.error('Insert error:', insertError);
            return new Response(
              JSON.stringify({ error: 'Ошибка сохранения товаров' }),
              { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
          }
        }

        return new Response(
          JSON.stringify({ 
            success: true, 
            message: `Синхронизировано товаров: ${stocksData.stocks?.length || 0}` 
          }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      default:
        return new Response(
          JSON.stringify({ error: 'Unknown action' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
  } catch (error) {
    console.error('Function error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
