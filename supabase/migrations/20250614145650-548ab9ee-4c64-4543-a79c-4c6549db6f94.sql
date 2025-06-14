
-- Drop existing policies if they exist and recreate them
DO $$ 
BEGIN
    -- Drop existing policies for leads table
    DROP POLICY IF EXISTS "Users can view their own leads" ON public.leads;
    DROP POLICY IF EXISTS "Users can create their own leads" ON public.leads;
    DROP POLICY IF EXISTS "Users can update their own leads" ON public.leads;
    DROP POLICY IF EXISTS "Users can delete their own leads" ON public.leads;
    
    -- Drop existing policies for events table
    DROP POLICY IF EXISTS "Users can view their own events" ON public.events;
    DROP POLICY IF EXISTS "Users can create their own events" ON public.events;
    DROP POLICY IF EXISTS "Users can update their own events" ON public.events;
    DROP POLICY IF EXISTS "Users can delete their own events" ON public.events;
    
    -- Drop existing policies for profiles table
    DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
    DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
END $$;

-- Enable Row Level Security on existing tables
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for leads table
CREATE POLICY "Users can view their own leads" 
  ON public.leads 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own leads" 
  ON public.leads 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own leads" 
  ON public.leads 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own leads" 
  ON public.leads 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create RLS policies for events table
CREATE POLICY "Users can view their own events" 
  ON public.events 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own events" 
  ON public.events 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own events" 
  ON public.events 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own events" 
  ON public.events 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create RLS policies for profiles table
CREATE POLICY "Users can view their own profile" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

-- Create user_content table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.user_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  content_type TEXT NOT NULL,
  caption TEXT,
  hashtags TEXT[],
  image_url TEXT,
  reel_script TEXT[],
  ideas TEXT[],
  image_prompt TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on user_content table
ALTER TABLE public.user_content ENABLE ROW LEVEL SECURITY;

-- Drop and recreate policies for user_content table
DROP POLICY IF EXISTS "Users can view their own content" ON public.user_content;
DROP POLICY IF EXISTS "Users can create their own content" ON public.user_content;
DROP POLICY IF EXISTS "Users can update their own content" ON public.user_content;
DROP POLICY IF EXISTS "Users can delete their own content" ON public.user_content;

CREATE POLICY "Users can view their own content" 
  ON public.user_content 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own content" 
  ON public.user_content 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own content" 
  ON public.user_content 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own content" 
  ON public.user_content 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create user_analytics table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.user_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  content_generated INTEGER DEFAULT 0,
  images_generated INTEGER DEFAULT 0,
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS on user_analytics table
ALTER TABLE public.user_analytics ENABLE ROW LEVEL SECURITY;

-- Drop and recreate policies for user_analytics table
DROP POLICY IF EXISTS "Users can view their own analytics" ON public.user_analytics;
DROP POLICY IF EXISTS "Users can update their own analytics" ON public.user_analytics;

CREATE POLICY "Users can view their own analytics" 
  ON public.user_analytics 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own analytics" 
  ON public.user_analytics 
  FOR ALL 
  USING (auth.uid() = user_id);

-- Update the handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name)
  VALUES (
    new.id, 
    new.raw_user_meta_data ->> 'first_name', 
    new.raw_user_meta_data ->> 'last_name'
  );
  
  INSERT INTO public.user_analytics (user_id)
  VALUES (new.id)
  ON CONFLICT (user_id) DO NOTHING;
  
  RETURN new;
END;
$$;
