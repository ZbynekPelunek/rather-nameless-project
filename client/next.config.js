module.exports = {
    webpack5: true,
    webpack: (config) => {
      //config.resolve.fallback = { fs: false, process: false, util: false, path: false, buffer: false, os: false };
  
      return config;
    },
};