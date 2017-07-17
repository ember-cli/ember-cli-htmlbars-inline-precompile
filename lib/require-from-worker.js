/* jshint node: true */
'use strict';

const hashForDep = require('hash-for-dep');

const AstPlugins = require('./ast-plugins');

module.exports = {
  build(options) {
    let pluginInfo = this.setupDependentPlugins(options.parallelConfig);

    return AstPlugins.setup(pluginInfo, {
      templateCompilerPath: options.templateCompilerPath,
    });
  },

  setupDependentPlugins(parallelConfig) {
    const plugins = [];
    const cacheKeys = [];

    parallelConfig.forEach((config) => {
      const plugin = require(config.requireFile);
      const buildInfo = plugin[config.buildUsing](config.params);

      plugins.push(buildInfo.plugin);

      if (typeof buildInfo.baseDir === 'function') {
        const pluginHashForDep = hashForDep(buildInfo.baseDir());
        cacheKeys.push(pluginHashForDep);
      } else {
        console.log('ember-cli-htmlbars-inline-precompile is opting out of caching due to an AST plugin that does not provide a caching strategy: `' + buildInfo.name + '`.');
        cacheKeys.push((new Date()).getTime() + '|' + Math.random());
      }
    });

    return {
      plugins,
      cacheKeys
    };
  },
};
