require('dotenv').config();

export default {
  expo: {
    "runtimeVersion": "exposdk:49.0.13",
    "name": "nourish",
    "slug": "nourish-fit",
    "version": "2.0.1",
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
      "buildNumber": "1",
      "infoPlist": {
        "NSCameraUsageDescription": "This app uses the camera to recognize food and beverages."
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff",
      },
      "package": "com.nourish.fit",
      "versionCode": 1,
      "icon": "./assets/nourish-app-icon.png",
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
    "plugins": [
      [
        "expo-updates",
        {
          "username": "theaifirstco"
        }
      ]
    ],
  },
};