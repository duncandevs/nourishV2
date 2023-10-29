import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// @ts-ignore
import { SUPABASE_DB_URL, SUPABASE_DB_ANON_KEY, SUPABASE_DB_SERVICE_ROLE_KEY } from '@env'

export const supabase = createClient(SUPABASE_DB_URL, SUPABASE_DB_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export const supabaseAdminClient = createClient(SUPABASE_DB_URL, SUPABASE_DB_SERVICE_ROLE_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});