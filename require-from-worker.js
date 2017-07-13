/* jshint node: true */
'use strict';

const fs = require('fs');
const hashForDep = require('hash-for-dep');
const HTMLBarsInlinePrecompilePlugin = require('babel-plugin-htmlbars-inline-precompile');

module.exports = {
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
    let templateCompilerFullPath = require.resolve(templateCompilerPath);

    let templateCompilerCacheKey = fs.readFileSync(templateCompilerFullPath, { encoding: 'utf-8' });

    const dependentPluginInfo = this.setupDependentPlugins(options.pluginParallelSpecs);

    dependentPluginInfo.plugins.forEach((plugin) => Compiler.registerPlugin('ast', plugin));

    let precompile = Compiler.precompile;
    precompile.baseDir = () => __dirname;
    precompile.cacheKey = () => [templateCompilerCacheKey].concat(dependentPluginInfo.cacheKeys).join('|');

    delete require.cache[templateCompilerPath];

    return [HTMLBarsInlinePrecompilePlugin, { precompile }];
  },

  setupDependentPlugins(pluginParallelSpecs) {
    const plugins = [];
    const cacheKeys = [];

    pluginParallelSpecs.forEach((pluginInfo) => {
      const plugin = require(pluginInfo.requireFile);
      const buildInfo = plugin[pluginInfo.buildUsing](pluginInfo.params);

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
