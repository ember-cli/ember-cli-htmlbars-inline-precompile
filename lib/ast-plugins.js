/* jshint node: true */
'use strict';

var fs = require('fs');

var HTMLBarsInlinePrecompilePlugin = require('babel-plugin-htmlbars-inline-precompile');

var pluginCache = {};

module.exports = {
  setup(pluginInfo, options) {
    // borrowed from ember-cli-htmlbars http://git.io/vJDrW
    var projectConfig = options.projectConfig || {};
    var templateCompilerPath = options.templateCompilerPath;
    var useCache = options.useCache;

    var EmberENV = projectConfig.EmberENV || {};

    // ensure we get a fresh templateCompilerModuleInstance per ember-addon
    // instance NOTE: this is a quick hack, and will only work as long as
    // templateCompilerPath is a single file bundle
    //
    // (╯°□°）╯︵ ɹǝqɯǝ
    //
    // we will also fix this in ember for future releases
    delete require.cache[templateCompilerPath];

    var clonedEmberENV = JSON.parse(JSON.stringify(EmberENV));
    global.EmberENV = clonedEmberENV;

    var Compiler = require(templateCompilerPath);
    var templateCompilerFullPath = require.resolve(templateCompilerPath);
    var templateCompilerCacheKey = fs.readFileSync(templateCompilerFullPath, { encoding: 'utf-8' });
    var cacheKey = [templateCompilerCacheKey].concat(pluginInfo.cacheKeys.sort()).join('|');

    var precompileInlineHTMLBarsPlugin;

    // babel memoizes every plugin it sees,
    // and creating a new plugin for every transpilation will eventually overflow the heap
    // so use a local cache to avoid that
    if (useCache && pluginCache[cacheKey] !== undefined) {
      precompileInlineHTMLBarsPlugin = pluginCache[cacheKey];
    } else {
      pluginInfo.plugins.forEach(function(plugin) {
        Compiler.registerPlugin('ast', plugin);
      });

      precompileInlineHTMLBarsPlugin = HTMLBarsInlinePrecompilePlugin(Compiler.precompile, {
        cacheKey: cacheKey
      });
      pluginCache[cacheKey] = precompileInlineHTMLBarsPlugin;
    }

    delete require.cache[templateCompilerPath];
    delete global.Ember;
    delete global.EmberENV;

    return precompileInlineHTMLBarsPlugin;
  }
};
