const ImportTimingPlugin = require("./import-timing-plugin");

module.exports = {
  experimental: {
    instrumentationHook: true,
    appDir: true,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins.push(new ImportTimingPlugin());
    }
    return config;
  },
};
