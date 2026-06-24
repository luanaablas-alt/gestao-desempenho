import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL     = 'https://uafenvoiyltozzieechxg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhZmVudm9peWx0b3ppaWVjaHhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyODI2MzEsImV4cCI6MjA5Nzg1ODYzMX0.JfHu-8wZjpfnbXRbTFNWUyydN0fyxINBTbU5lGtBZTM';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export default supabase;
