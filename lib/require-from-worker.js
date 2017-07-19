/* jshint node: true */
'use strict';

var hashForDep = require('hash-for-dep');

var AstPlugins = require('./ast-plugins');

module.exports = {
  build: function(options) {
    var pluginInfo = this.setupDependentPlugins(options.parallelConfig);

    return AstPlugins.setup(pluginInfo, {
      templateCompilerPath: options.templateCompilerPath,
    });
  },

  setupDependentPlugins: function(parallelConfig) {
    var plugins = [];
    var cacheKeys = [];

    parallelConfig.forEach(function(config) {
      var plugin = require(config.requireFile);
      var buildInfo = plugin[config.buildUsing](config.params);

      plugins.push(buildInfo.plugin);

      if (typeof buildInfo.baseDir === 'function') {
        var pluginHashForDep = hashForDep(buildInfo.baseDir());
        cacheKeys.push(pluginHashForDep);
      } else {
        console.log('ember-cli-htmlbars-inline-precompile is opting out of caching due to an AST plugin that does not provide a caching strategy: `' + buildInfo.name + '`.');
        cacheKeys.push((new Date()).getTime() + '|' + Math.random());
      }
    });

    return {
      plugins: plugins,
      cacheKeys: cacheKeys
    };
  },
};
