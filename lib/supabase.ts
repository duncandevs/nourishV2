import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

const SUPABASE_DB_URL = Constants.expoConfig?.extra?.SUPABASE_DB_URL;
const SUPABASE_DB_ANON_KEY = Constants.expoConfig?.extra?.SUPABASE_DB_ANON_KEY;
const SUPABASE_DB_SERVICE_ROLE_KEY = Constants.expoConfig?.extra?.SUPABASE_DB_SERVICE_ROLE_KEY;

// SUPABASE_DB_URL, SUPABASE_DB_ANON_KEY,
export const supabase = createClient(SUPABASE_DB_URL, SUPABASE_DB_ANON_KEY , {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// SUPABASE_DB_URL, SUPABASE_DB_SERVICE_ROLE_KEY, 
export const supabaseAdminClient = createClient(SUPABASE_DB_URL, SUPABASE_DB_SERVICE_ROLE_KEY , {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});