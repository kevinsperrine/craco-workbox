const path = require('path');

module.exports = {
  overrideWebpackConfig: ({ webpackConfig, context: { env, paths } }) => {
    if (env === 'production') {
      try {
        const workboxConfig = require(path.join(
          paths.appPath,
          'workbox.config.js'
        ));

        webpackConfig.plugins.forEach(plugin => {
          if (plugin.constructor.name === 'GenerateSW') {
            plugin.config = workboxConfig(plugin.config);
            console.log(plugin);
          }
        });
      } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', `[craco-workbox]`);
        console.log('\x1b[31m%s\x1b[0m', error.stack);
        process.exit(1);
      }
    }

    // Always return the config object.
    return webpackConfig;
  }
};
