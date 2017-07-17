/* jshint node: true */
'use strict';

const fs = require('fs');
const path = require('path');

const HTMLBarsInlinePrecompilePlugin = require('babel-plugin-htmlbars-inline-precompile');

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

    pluginInfo.plugins.forEach((plugin) => Compiler.registerPlugin('ast', plugin));

    let precompile = Compiler.precompile;
    precompile.baseDir = () => path.resolve('..', __dirname);
    precompile.cacheKey = () => [templateCompilerCacheKey].concat(pluginInfo.cacheKeys).join('|');

    delete require.cache[templateCompilerPath];
    delete global.Ember;
    delete global.EmberENV;

    return [HTMLBarsInlinePrecompilePlugin, { precompile  }];
  }
};
