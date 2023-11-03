require('dotenv').config();

export default {
  expo: {
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
      "runtimeVersion": "exposdk:49.0.13",
      "buildNumber": "1",
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff",
        "runtimeVersion": "exposdk:49.0.13"
      },
      "package": "com.nourish.fit",
      "versionCode": 1
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