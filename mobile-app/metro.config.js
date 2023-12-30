const { getDefaultConfig } = require("expo/metro-config");
const path = require('path');

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  // Add your shared directory to the watchFolders
  const extraNodeModules = {
    '@shared': path.resolve(__dirname, '../shared')
  };
  const watchFolders = [
    path.resolve(__dirname, '../shared')
  ];

  // Extend the existing transformer and resolver configurations
  config.transformer = {
    ...config.transformer,
    // your existing transformer configuration
    babelTransformerPath: require.resolve("react-native-svg-transformer")
  };

  config.resolver = {
    ...config.resolver,
    // your existing resolver configuration
    assetExts: config.resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...config.resolver.sourceExts, "svg"],
    // Additional resolver configuration for shared module
    extraNodeModules
  };

  // Add watchFolders to the configuration
  return {
    ...config,
    watchFolders
  };
})();
