/* jshint node: true */
'use strict';

const debugGenerator = require('heimdalljs-logger');
const hashForDep = require('hash-for-dep');
const AstPlugins = require('./ast-plugins');

const _logger = debugGenerator('ember-cli-htmlbars-inline-precompile');

module.exports = {
  build(options) {
    let pluginInfo = this.setupDependentPlugins(options.parallelConfig);

    return AstPlugins.setup(pluginInfo, {
      templateCompilerPath: options.templateCompilerPath,
      useCache: true,
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
        _logger.debug('ember-cli-htmlbars-inline-precompile is opting out of caching due to an AST plugin that does not provide a caching strategy: `' + buildInfo.name + '`.');
        cacheKeys.push((new Date()).getTime() + '|' + Math.random());
      }
    });

    return {
      plugins,
      cacheKeys
    };
  },
};
