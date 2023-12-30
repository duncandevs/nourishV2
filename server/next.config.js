/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        // Fixes npm packages that depend on `fs` module
        config.resolve.fallback = { fs: false };
      }
      // Setup the path alias
      config.resolve.alias['@shared'] = path.join(__dirname, '../shared');
  
      return config;
    },
  };

module.exports = nextConfig
