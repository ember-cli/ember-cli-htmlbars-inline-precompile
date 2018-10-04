'use strict';

const fs = require('fs');
const path = require('path');

const HTMLBarsInlinePrecompilePlugin = require('babel-plugin-htmlbars-inline-precompile');

const pluginCache = {};

module.exports = {
  purgeModule(templateCompilerPath) {
    // ensure we get a fresh templateCompilerModuleInstance per ember-addon
    // instance NOTE: this is a quick hack, and will only work as long as
    // templateCompilerPath is a single file bundle
    //
    // (╯°□°）╯︵ ɹǝqɯǝ
    //
    // we will also fix this in ember for future releases

    // Module will be cached in .parent.children as well. So deleting from require.cache alone is not sufficient.
    let mod = require.cache[templateCompilerPath];
    if (mod && mod.parent) {
      let index = mod.parent.children.indexOf(mod);
      if (index >= 0) {
        mod.parent.children.splice(index, 1);
      } else {
        throw new TypeError(`ember-cli-htmlbars-inline-precompile attempted to purge '${templateCompilerPath}' but something went wrong.`);
      }
    }

    delete require.cache[templateCompilerPath];
  },

  setup(pluginInfo, options) {
    // borrowed from ember-cli-htmlbars http://git.io/vJDrW
    let projectConfig = options.projectConfig || {};
    let templateCompilerPath = options.templateCompilerPath;
    let useCache = options.useCache;

    let EmberENV = projectConfig.EmberENV || {};

    // ensure we get a fresh templateCompilerModuleInstance per ember-addon
    // instance NOTE: this is a quick hack, and will only work as long as
    // templateCompilerPath is a single file bundle
    //
    // (╯°□°）╯︵ ɹǝqɯǝ
    //
    // we will also fix this in ember for future releases
    this.purgeModule(templateCompilerPath);

    // do a full clone of the EmberENV (it is guaranteed to be structured
    // cloneable) to prevent ember-template-compiler.js from mutating
    // the shared global config
    let clonedEmberENV = JSON.parse(JSON.stringify(EmberENV));
    global.EmberENV = clonedEmberENV;

    let Compiler = require(templateCompilerPath);
    let cacheKey = this.makeCacheKey(templateCompilerPath, pluginInfo);

    let precompileInlineHTMLBarsPlugin;

    // babel memoizes every plugin it sees,
    // and creating a new plugin for every transpilation will eventually overflow the heap
    // so use a local cache to avoid that
    if (useCache && pluginCache[cacheKey] !== undefined) {
      precompileInlineHTMLBarsPlugin = pluginCache[cacheKey];
    } else {
      pluginInfo.plugins.forEach((plugin) => Compiler.registerPlugin('ast', plugin));

      let precompile = Compiler.precompile;
      precompile.baseDir = () => path.resolve(__dirname, '..');
      precompile.cacheKey = () => cacheKey;

      let modulePaths = ['ember-cli-htmlbars-inline-precompile', 'htmlbars-inline-precompile'];
      precompileInlineHTMLBarsPlugin = [HTMLBarsInlinePrecompilePlugin, { precompile, modulePaths }];
      pluginCache[cacheKey] = precompileInlineHTMLBarsPlugin;
    }

    this.purgeModule(templateCompilerPath);

    delete global.Ember;
    delete global.EmberENV;

    return precompileInlineHTMLBarsPlugin;
  },

  makeCacheKey(templateCompilerPath, pluginInfo, extra) {
    require(templateCompilerPath);
    let templateCompilerFullPath = require.resolve(templateCompilerPath);
    let templateCompilerCacheKey = fs.readFileSync(templateCompilerFullPath, { encoding: 'utf-8' });
    let cacheItems = [templateCompilerCacheKey, extra].concat(pluginInfo.cacheKeys.sort());
    // extra may be undefined
    return cacheItems.filter(Boolean).join('|');
  }
};
