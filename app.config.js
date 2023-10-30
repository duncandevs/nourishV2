require('dotenv').config();

export default {
  expo: {
    extra: {
        SUPABASE_DB_URL: process.env.SUPABASE_DB_URL, 
        SUPABASE_DB_ANON_KEY: process.env.SUPABASE_DB_ANON_KEY, 
        SUPABASE_DB_SERVICE_ROLE_KEY: process.env.SUPABASE_DB_SERVICE_ROLE_KEY,
        eas: {
            projectId: "f4669a33-c3ab-47c6-8988-4952ccb8587c"
        }
    },
    ios: {
        version: "1.0.7",
        bundleIdentifier: "com.nourish.fit"
    }
  },
};
