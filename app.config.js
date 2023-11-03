require('dotenv').config();

export default {
  expo: {
    "runtimeVersion": "<remove this key>",
    "name": "nourish",
    "slug": "nourish-fit",
    "version": "1.0.12",
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
      "runtimeVersion": "nativeVersion",
      "buildNumber": "1",
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff",
        "runtimeVersion": {
          "policy": "appVersion"
        }
      },
      "package": "com.nourish.fit",
      "versionCode": "1"
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "extra": {
      "eas": {
        "projectId": "53eedea4-a767-42a9-95de-35fadd75f38d"
      }
    },
    "owner": "theaifirstco",
    "updates": {
      "url": "https://u.expo.dev/53eedea4-a767-42a9-95de-35fadd75f38d"
    },
  },
};