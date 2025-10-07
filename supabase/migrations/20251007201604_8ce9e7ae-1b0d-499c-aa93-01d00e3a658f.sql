-- Create marketplace credentials table for storing API keys
CREATE TABLE public.marketplace_credentials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  marketplace TEXT NOT NULL CHECK (marketplace IN ('wildberries', 'ozon')),
  api_key TEXT NOT NULL,
  api_secret TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, marketplace)
);

-- Enable RLS
ALTER TABLE public.marketplace_credentials ENABLE ROW LEVEL SECURITY;

-- Users can only view and manage their own credentials
CREATE POLICY "Users can view their own credentials"
ON public.marketplace_credentials
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own credentials"
ON public.marketplace_credentials
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own credentials"
ON public.marketplace_credentials
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own credentials"
ON public.marketplace_credentials
FOR DELETE
USING (auth.uid() = user_id);

-- Create orders table
CREATE TABLE public.marketplace_orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  marketplace TEXT NOT NULL CHECK (marketplace IN ('wildberries', 'ozon')),
  order_id TEXT NOT NULL,
  order_number TEXT,
  status TEXT NOT NULL,
  total_amount DECIMAL(10, 2),
  items_count INTEGER,
  customer_name TEXT,
  delivery_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  raw_data JSONB,
  UNIQUE(user_id, marketplace, order_id)
);

-- Enable RLS
ALTER TABLE public.marketplace_orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own orders"
ON public.marketplace_orders
FOR SELECT
USING (auth.uid() = user_id);

-- Create products/inventory table
CREATE TABLE public.marketplace_products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  marketplace TEXT NOT NULL CHECK (marketplace IN ('wildberries', 'ozon')),
  product_id TEXT NOT NULL,
  sku TEXT,
  name TEXT NOT NULL,
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  price DECIMAL(10, 2),
  warehouse TEXT,
  last_sync_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  raw_data JSONB,
  UNIQUE(user_id, marketplace, product_id)
);

-- Enable RLS
ALTER TABLE public.marketplace_products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own products"
ON public.marketplace_products
FOR SELECT
USING (auth.uid() = user_id);

-- Create sales analytics table
CREATE TABLE public.marketplace_sales (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  marketplace TEXT NOT NULL CHECK (marketplace IN ('wildberries', 'ozon')),
  date DATE NOT NULL,
  revenue DECIMAL(10, 2) NOT NULL DEFAULT 0,
  orders_count INTEGER NOT NULL DEFAULT 0,
  commission DECIMAL(10, 2) NOT NULL DEFAULT 0,
  net_revenue DECIMAL(10, 2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, marketplace, date)
);

-- Enable RLS
ALTER TABLE public.marketplace_sales ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own sales"
ON public.marketplace_sales
FOR SELECT
USING (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_marketplace_credentials_updated_at
BEFORE UPDATE ON public.marketplace_credentials
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_marketplace_orders_updated_at
BEFORE UPDATE ON public.marketplace_orders
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_marketplace_products_updated_at
BEFORE UPDATE ON public.marketplace_products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_marketplace_sales_updated_at
BEFORE UPDATE ON public.marketplace_sales
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();