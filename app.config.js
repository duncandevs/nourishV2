import 'dotenv/config';

export default {
  expo: {
    "name": "nourish",
    "slug": "nourish-fit",
    "version": "1.0.7",
    "orientation": "portrait",
    "icon": "./assets/nourish-app-icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.nourish.fit",
      "runtimeVersion": "nativeVersion"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.nourish.fit",
      "versionCode": 2
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "extra": {
      "eas": {
        SUPABASE_DB_URL: process.env.SUPABASE_DB_URL, 
        SUPABASE_DB_ANON_KEY: process.env.SUPABASE_DB_ANON_KEY, 
        SUPABASE_DB_SERVICE_ROLE_KEY: process.env.SUPABASE_DB_SERVICE_ROLE_KEY,
        "projectId": "53eedea4-a767-42a9-95de-35fadd75f38d"
      }
    },
    "owner": "theaifirstco",
    "updates": {
      "url": "https://u.expo.dev/53eedea4-a767-42a9-95de-35fadd75f38d"
    },
  },
};
