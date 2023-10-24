import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl="https://vxfwozbuuytymkppdusd.supabase.co";
const supabaseAnonKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4ZndvemJ1dXl0eW1rcHBkdXNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYxOTA1NTksImV4cCI6MjAxMTc2NjU1OX0.AgzkBls8g_ohnKucg_XCluaz41zR2pniLk5IPGhPH9g";
const supabaseServiceKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4ZndvemJ1dXl0eW1rcHBkdXNkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5NjE5MDU1OSwiZXhwIjoyMDExNzY2NTU5fQ.cqBl57ztaUE8F7cZkRT37TzN4kdBHY7Sc9YWDxw-QVA"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export const supabaseAdminClient = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});