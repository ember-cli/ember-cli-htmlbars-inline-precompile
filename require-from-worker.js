/* jshint node: true */
'use strict';

const fs = require('fs');
const hashForDep = require('hash-for-dep');
const HTMLBarsInlinePrecompilePlugin = require('babel-plugin-htmlbars-inline-precompile');
const Registry = require('ember-cli-preprocess-registry'); // TODO package.json

module.exports = {
  name: 'htmlbars-inline-precompile',

  build(options) {
    let templateCompilerPath = options.templateCompilerPath;

    // ensure we get a fresh templateCompilerModuleInstance per ember-addon
    // instance NOTE: this is a quick hack, and will only work as long as
    // templateCompilerPath is a single file bundle
    //
    // (╯°□°）╯︵ ɹǝqɯǝ
    //
    // we will also fix this in ember for future releases
    delete require.cache[templateCompilerPath];
    let Compiler = require(templateCompilerPath);
    let templateCompilerFullPath = require.resolve(options.templateCompilerPath);

    let templateCompilerCacheKey = fs.readFileSync(templateCompilerFullPath, { encoding: 'utf-8' });

    var pluginInfo = this.setupDependentPlugins(options.pluginPaths);
    pluginInfo.plugins.forEach(function(plugin) {
      Compiler.registerPlugin('ast', plugin);
    });

    let precompile = Compiler.precompile;

    precompile.baseDir = () => __dirname;
    precompile.cacheKey = () => [templateCompilerCacheKey].concat(pluginInfo.cacheKeys).join('|');

    delete require.cache[templateCompilerPath];

    return [HTMLBarsInlinePrecompilePlugin, { precompile }];
  },

  setupDependentPlugins: function(pluginPaths) {
    // arguments: plugins, app - don't need either one for this
    var registry = new Registry([], {});

    pluginPaths.forEach(function(pluginPath) {
      var plugin = require(pluginPath);
      plugin.setupPreprocessorRegistry('', registry);
    });

    var pluginWrappers = registry.load('htmlbars-ast-plugin');
    var plugins = [];
    var cacheKeys = [];

    for (var i = 0; i < pluginWrappers.length; i++) {
      var wrapper = pluginWrappers[i];

      plugins.push(wrapper.plugin);

      if (typeof wrapper.baseDir === 'function') {
        var pluginHashForDep = hashForDep(wrapper.baseDir());
        cacheKeys.push(pluginHashForDep);
      } else {
        console.log('ember-cli-htmlbars-inline-precompile is opting out of caching due to an AST plugin that does not provide a caching strategy: `' + wrapper.name + '`.');
        cacheKeys.push((new Date()).getTime() + '|' + Math.random());
      }
    }

    return {
      plugins: plugins,
      cacheKeys: cacheKeys
    };
  },
};
