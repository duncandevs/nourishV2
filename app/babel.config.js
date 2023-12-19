module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            "@shared": '../shared',
          },
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'], // Add other extensions if needed
        },
      ],
    ],
  };
};

