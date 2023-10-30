require('dotenv').config();

export default {
  expo: {
    extra: {
        SUPABASE_DB_URL: process.env.SUPABASE_DB_URL, 
        SUPABASE_DB_ANON_KEY: process.env.SUPABASE_DB_ANON_KEY, 
        SUPABASE_DB_SERVICE_ROLE_KEY: process.env.SUPABASE_DB_SERVICE_ROLE_KEY
    }
  },
};
