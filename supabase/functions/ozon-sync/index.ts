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
    console.log('Ozon sync action:', action, 'for user:', user.id);

    // Get user's Ozon credentials
    const { data: credentials, error: credError } = await supabaseClient
      .from('marketplace_credentials')
      .select('*')
      .eq('user_id', user.id)
      .eq('marketplace', 'ozon')
      .eq('is_active', true)
      .maybeSingle();

    if (credError || !credentials) {
      console.error('Credentials error:', credError);
      return new Response(
        JSON.stringify({ error: 'API ключи Ozon не найдены. Добавьте их в настройках.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Ozon API endpoints
    const OZON_API_BASE = 'https://api-seller.ozon.ru';

    switch (action) {
      case 'sync_orders': {
        // Get orders from Ozon
        const ordersResponse = await fetch(`${OZON_API_BASE}/v3/posting/fbs/list`, {
          method: 'POST',
          headers: {
            'Client-Id': credentials.api_key,
            'Api-Key': credentials.api_secret || '',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            dir: 'ASC',
            filter: {
              since: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
              to: new Date().toISOString(),
            },
            limit: 100,
            offset: 0,
            with: {
              analytics_data: true,
              financial_data: true,
            },
          }),
        });

        if (!ordersResponse.ok) {
          const errorText = await ordersResponse.text();
          console.error('Ozon API error:', ordersResponse.status, errorText);
          return new Response(
            JSON.stringify({ error: `Ошибка API Ozon: ${ordersResponse.status}` }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const ordersData = await ordersResponse.json();
        console.log('Fetched orders:', ordersData.result?.postings?.length || 0);

        // Save orders to database
        if (ordersData.result?.postings && ordersData.result.postings.length > 0) {
          const ordersToInsert = ordersData.result.postings.map((posting: any) => ({
            user_id: user.id,
            marketplace: 'ozon',
            order_id: posting.posting_number,
            order_number: posting.order_number,
            status: posting.status,
            total_amount: posting.financial_data?.products?.reduce((sum: number, p: any) => sum + (p.price || 0), 0) || 0,
            items_count: posting.products?.length || 0,
            delivery_date: posting.shipment_date || posting.in_process_at,
            raw_data: posting,
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
            message: `Синхронизировано заказов: ${ordersData.result?.postings?.length || 0}` 
          }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'sync_products': {
        // Get products from Ozon
        const productsResponse = await fetch(`${OZON_API_BASE}/v2/product/info/stocks`, {
          method: 'POST',
          headers: {
            'Client-Id': credentials.api_key,
            'Api-Key': credentials.api_secret || '',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            limit: 100,
            offset: 0,
          }),
        });

        if (!productsResponse.ok) {
          const errorText = await productsResponse.text();
          console.error('Ozon API error:', productsResponse.status, errorText);
          return new Response(
            JSON.stringify({ error: `Ошибка API Ozon: ${productsResponse.status}` }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const productsData = await productsResponse.json();
        console.log('Fetched products:', productsData.result?.items?.length || 0);

        // Save products to database
        if (productsData.result?.items && productsData.result.items.length > 0) {
          const productsToInsert = productsData.result.items.map((item: any) => ({
            user_id: user.id,
            marketplace: 'ozon',
            product_id: item.product_id?.toString(),
            sku: item.offer_id,
            name: item.name || 'Товар',
            stock_quantity: item.stocks?.reduce((sum: number, s: any) => sum + (s.present || 0), 0) || 0,
            warehouse: item.stocks?.[0]?.warehouse_name || '',
            last_sync_at: new Date().toISOString(),
            raw_data: item,
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
            message: `Синхронизировано товаров: ${productsData.result?.items?.length || 0}` 
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
