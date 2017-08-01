/* jshint node: true */
'use strict';

var path = require('path');
var hashForDep = require('hash-for-dep');
var AstPlugins = require('./lib/ast-plugins');
var SilentError = require('silent-error');
var resolve = require('resolve');
var semver = require('semver');
var debugGenerator = require('heimdalljs-logger');

var _logger = debugGenerator('ember-cli-htmlbars-inline-precompile');

module.exports = {
  name: 'ember-cli-htmlbars-inline-precompile',

  init() {
    this._super.init && this._super.init.apply(this, arguments);

    let babelPath = resolve.sync('ember-cli-babel/package.json', { basedir: this.parent.root });
    let babelVersion = require(babelPath).version;

    var hasCorrectBabelVersion = semver.lt(babelVersion, '6.0.0-alpha.1');

    if (!hasCorrectBabelVersion) {
      throw new SilentError('ember-cli-htmlbars-inline-precompile@0.3 requires the host to use ember-cli-babel@5. To use ember-cli-babel@6 please upgrade ember-cli-htmlbars-inline-precompile to 0.4.');
    }
  },

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

    var pluginWrappers = this.parentRegistry.load('htmlbars-ast-plugin');

    // add the HTMLBarsInlinePrecompilePlugin to the list of plugins used by
    // the `ember-cli-babel` addon
    if (!this._registeredWithBabel) {
      var templateCompilerPath = this.templateCompilerPath();
      var parallelConfig = this.getParallelConfig(pluginWrappers);
      if (this.canParallelize(pluginWrappers)) {
        _logger.debug('using parallel API with broccoli-babel-transpiler');
        app.options.babel.plugins.push({
          _parallelBabel: {
            requireFile: path.resolve(__dirname, 'lib/require-from-worker'),
            buildUsing: 'build',
            params: {
              templateCompilerPath: templateCompilerPath,
              parallelConfig: parallelConfig
            }
          },
          baseDir: function() {
            return __dirname;
          }
        });
      }
      else {
        _logger.debug('NOT using parallel API with broccoli-babel-transpiler');
        var blockingPlugins = pluginWrappers.map(function(wrapper) {
          if (wrapper.parallelBabel === undefined) {
            return wrapper.name;
          }
        }).filter(Boolean);
        _logger.debug('Prevented by these plugins: ' + blockingPlugins);

        var pluginInfo = this.astPlugins();
        var htmlBarsPlugin = AstPlugins.setup(pluginInfo, {
          projectConfig: this.projectConfig(),
          templateCompilerPath: this.templateCompilerPath(),
        });
        app.options.babel.plugins.push(htmlBarsPlugin);
      }
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

  // verify that each registered ast plugin can be parallelized
  canParallelize: function(pluginWrappers) {
    return pluginWrappers.every(function(wrapper) { return wrapper.parallelBabel !== undefined; });
  },

  // return an array of the 'parallelBabel' object for each registered htmlbars-ast-plugin
  getParallelConfig: function(pluginWrappers) {
    return pluginWrappers.map(function(wrapper) { return wrapper.parallelBabel; });
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
