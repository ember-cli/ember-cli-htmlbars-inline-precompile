/* jshint node: true */
'use strict';

const fs = require('fs');
const path = require('path');

const HTMLBarsInlinePrecompilePlugin = require('babel-plugin-htmlbars-inline-precompile');

const pluginCache = {};

module.exports = {
  setup(pluginInfo, options) {
    // borrowed from ember-cli-htmlbars http://git.io/vJDrW
    let projectConfig = options.projectConfig || {};
    let EmberENV = projectConfig.EmberENV || {};

    let templateCompilerPath = options.templateCompilerPath;

    // ensure we get a fresh templateCompilerModuleInstance per ember-addon
    // instance NOTE: this is a quick hack, and will only work as long as
    // templateCompilerPath is a single file bundle
    //
    // (╯°□°）╯︵ ɹǝqɯǝ
    //
    // we will also fix this in ember for future releases
    delete require.cache[templateCompilerPath];

    global.EmberENV = EmberENV;

    let Compiler = require(templateCompilerPath);
    let templateCompilerFullPath = require.resolve(templateCompilerPath);
    let templateCompilerCacheKey = fs.readFileSync(templateCompilerFullPath, { encoding: 'utf-8' });
    let cacheKey = [templateCompilerCacheKey].concat(pluginInfo.cacheKeys.sort()).join('|');

    let precompileInlineHTMLBarsPlugin;

    // babel memoizes every plugin it sees,
    // and creating a new plugin for every transpilation will eventually overflow the heap
    // so use a local cache to avoid that
    if (pluginCache[cacheKey] !== undefined) {
      precompileInlineHTMLBarsPlugin = pluginCache[cacheKey];
    } else {
      pluginInfo.plugins.forEach((plugin) => Compiler.registerPlugin('ast', plugin));

      let precompile = Compiler.precompile;
      precompile.baseDir = () => path.resolve('..', __dirname);
      precompile.cacheKey = () => cacheKey;

      precompileInlineHTMLBarsPlugin = [HTMLBarsInlinePrecompilePlugin, { precompile  }];
      pluginCache[cacheKey] = precompileInlineHTMLBarsPlugin;
    }

    delete require.cache[templateCompilerPath];
    delete global.Ember;
    delete global.EmberENV;

    return precompileInlineHTMLBarsPlugin;
  }
};
