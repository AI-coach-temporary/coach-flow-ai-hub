
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://gkkpjqomynsettdfsxow.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdra3BqcW9teW5zZXR0ZGZzeG93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxNzk2MTksImV4cCI6MjA2MTc1NTYxOX0.3p75E2-FwCnU58L62UGeggCdNN4hHEqkyCkvf1VhvZI";

// Validate that we have the required environment variables
if (!SUPABASE_URL) {
  throw new Error('Missing SUPABASE_URL');
}

if (!SUPABASE_PUBLISHABLE_KEY) {
  throw new Error('Missing SUPABASE_PUBLISHABLE_KEY');
}

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    persistSession: true,
    autoRefreshToken: true,
  }
});
