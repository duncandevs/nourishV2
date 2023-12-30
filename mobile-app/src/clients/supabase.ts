import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';


const SUPABASE_DB_SERVICE_ROLE_KEY = process.env.EXPO_PUBLIC_SUPABASE_SERVICE_KEY;
const SUPABASE_DB_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
const SUPABASE_DB_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;


// SUPABASE_DB_URL, SUPABASE_DB_ANON_KEY,
export const supabase = SUPABASE_DB_URL && SUPABASE_DB_ANON_KEY ? createClient(SUPABASE_DB_URL, SUPABASE_DB_ANON_KEY , {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
}) : null;

// SUPABASE_DB_URL, SUPABASE_DB_SERVICE_ROLE_KEY, 
export const supabaseAdminClient = SUPABASE_DB_URL && SUPABASE_DB_SERVICE_ROLE_KEY ? createClient(SUPABASE_DB_URL, SUPABASE_DB_SERVICE_ROLE_KEY , {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
}): null;