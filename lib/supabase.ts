import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl="https://vxfwozbuuytymkppdusd.supabase.co";
const supabaseAnonKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4ZndvemJ1dXl0eW1rcHBkdXNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYxOTA1NTksImV4cCI6MjAxMTc2NjU1OX0.AgzkBls8g_ohnKucg_XCluaz41zR2pniLk5IPGhPH9g";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});