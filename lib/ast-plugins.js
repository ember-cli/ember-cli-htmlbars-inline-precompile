/* jshint node: true */
'use strict';

var fs = require('fs');
var path = require('path');

var HTMLBarsInlinePrecompilePlugin = require('babel-plugin-htmlbars-inline-precompile');

module.exports = {
  setup(pluginInfo, options) {
    // borrowed from ember-cli-htmlbars http://git.io/vJDrW
    var projectConfig = options.projectConfig || {};
    var EmberENV = projectConfig.EmberENV || {};

    var templateCompilerPath = options.templateCompilerPath;

    // ensure we get a fresh templateCompilerModuleInstance per ember-addon
    // instance NOTE: this is a quick hack, and will only work as long as
    // templateCompilerPath is a single file bundle
    //
    // (╯°□°）╯︵ ɹǝqɯǝ
    //
    // we will also fix this in ember for future releases
    delete require.cache[templateCompilerPath];

    global.EmberENV = EmberENV;

    var Compiler = require(templateCompilerPath);
    var templateCompilerFullPath = require.resolve(templateCompilerPath);
    var templateCompilerCacheKey = fs.readFileSync(templateCompilerFullPath, { encoding: 'utf-8' });

    pluginInfo.plugins.forEach(function(plugin) {
      Compiler.registerPlugin('ast', plugin);
    });

    var PrecompileInlineHTMLBarsPlugin = HTMLBarsInlinePrecompilePlugin(Compiler.precompile, {
      cacheKey: [templateCompilerCacheKey].concat(pluginInfo.cacheKeys).join('|')
    });

    delete require.cache[templateCompilerPath];
    delete global.Ember;
    delete global.EmberENV;

    return PrecompileInlineHTMLBarsPlugin;
  }
};
