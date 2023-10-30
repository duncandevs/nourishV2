import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';
console.log('Constants - ', Constants.expoConfig?.extra);
const SUPABASE_DB_URL = Constants.expoConfig?.extra?.SUPABASE_DB_URL;
const SUPABASE_DB_ANON_KEY = Constants.expoConfig?.extra?.SUPABASE_DB_ANON_KEY;
const SUPABASE_DB_SERVICE_ROLE_KEY = Constants.expoConfig?.extra?.SUPABASE_DB_SERVICE_ROLE_KEY;

// const SUPABASE_DB_URL="https://vxfwozbuuytymkppdusd.supabase.co"
// const SUPABASE_DB_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4ZndvemJ1dXl0eW1rcHBkdXNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYxOTA1NTksImV4cCI6MjAxMTc2NjU1OX0.AgzkBls8g_ohnKucg_XCluaz41zR2pniLk5IPGhPH9g"
// const SUPABASE_DB_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4ZndvemJ1dXl0eW1rcHBkdXNkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5NjE5MDU1OSwiZXhwIjoyMDExNzY2NTU5fQ.cqBl57ztaUE8F7cZkRT37TzN4kdBHY7Sc9YWDxw-QVA"

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