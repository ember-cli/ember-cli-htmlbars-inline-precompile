/* jshint node: true */
'use strict';

var path = require('path');
var fs = require('fs');
var hashForDep = require('hash-for-dep');
var HTMLBarsInlinePrecompilePlugin = require('babel-plugin-htmlbars-inline-precompile');

module.exports = {
  name: 'ember-cli-htmlbars-inline-precompile',

  setupPreprocessorRegistry: function(type, registry) {
    if (type === 'parent') {
      this.parentRegistry = registry;
    }
  },

  included: function(app) {
    this._super.included(app);

    var emberCLIHtmlBars = this.project.findAddonByName('ember-cli-htmlbars');

    if(emberCLIHtmlBars && emberCLIHtmlBars.inlinePrecompilerRegistered) {
      return;
    }

    app.options = app.options || {};
    app.options.babel = app.options.babel || {};
    app.options.babel.plugins = app.options.babel.plugins || [];

    // borrowed from ember-cli-htmlbars http://git.io/vJDrW
    var projectConfig = this.projectConfig() || {};
    var EmberENV = projectConfig.EmberENV || {};
    var templateCompilerPath = this.templateCompilerPath();

    // ensure we get a fresh templateCompilerModuleInstance per ember-addon
    // instance NOTE: this is a quick hack, and will only work as long as
    // templateCompilerPath is a single file bundle
    //
    // (╯°□°）╯︵ ɹǝqɯǝ
    //
    // we will also fix this in ember for future releases
    delete require.cache[templateCompilerPath];

    global.EmberENV = EmberENV;

    var pluginInfo = this.astPlugins();
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

    // add the HTMLBarsInlinePrecompilePlugin to the list of plugins used by
    // the `ember-cli-babel` addon
    if (!this._registeredWithBabel) {
      app.options.babel.plugins.push(PrecompileInlineHTMLBarsPlugin);
      this._registeredWithBabel = true;
    }
  },

  // from ember-cli-htmlbars :(
  astPlugins: function() {
    var pluginWrappers = this.parentRegistry.load('htmlbars-ast-plugin');
    var plugins = [];
    var cacheKeys = [];

    for (var i = 0; i < pluginWrappers.length; i++) {
      var wrapper = pluginWrappers[i];

      plugins.push(wrapper.plugin);

      if (typeof wrapper.baseDir === 'function') {
        var pluginHashForDep = hashForDep(wrapper.baseDir());
        cacheKeys.push(pluginHashForDep);
      } else {
        // support for ember-cli < 2.2.0
        var log = this.ui.writeDeprecateLine || this.ui.writeLine;

        log.call(this.ui, 'ember-cli-htmlbars-inline-precompile is opting out of caching due to an AST plugin that does not provide a caching strategy: `' + wrapper.name + '`.');
        cacheKeys.push((new Date()).getTime() + '|' + Math.random());
      }
    }

    return {
      plugins: plugins,
      cacheKeys: cacheKeys
    };
  },

  // borrowed from ember-cli-htmlbars http://git.io/vJDrW
  projectConfig: function () {
    return this.project.config(process.env.EMBER_ENV);
  },

  // borrowed from ember-cli-htmlbars http://git.io/vJDrw
  templateCompilerPath: function() {
    var config = this.projectConfig();
    var templateCompilerPath = config['ember-cli-htmlbars'] && config['ember-cli-htmlbars'].templateCompilerPath;

    var ember = this.project.findAddonByName('ember-source');
    if (ember) {
      return ember.absolutePaths.templateCompiler;
    } else if (!templateCompilerPath) {
      templateCompilerPath = this.project.bowerDirectory + '/ember/ember-template-compiler';
    }

    return path.resolve(this.project.root, templateCompilerPath);
  }
};
