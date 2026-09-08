import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  full_name: string;
  phone: string;
  address: string;
  created_at: string;
};

export type Order = {
  id: string;
  user_id: string;
  item_name: string;
  quantity: number;
  status: string;
  total_price: number;
  created_at: string;
};
