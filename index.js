/* jshint node: true */
'use strict';

const path = require('path');
const VersionChecker = require('ember-cli-version-checker');
const SilentError = require('silent-error');

module.exports = {
  name: 'ember-cli-htmlbars-inline-precompile',

  init() {
    this._super.init && this._super.init.apply(this, arguments);

    let checker = new VersionChecker(this);
    let hasIncorrectBabelVersion = checker.for('ember-cli-babel', 'npm').lt('6.0.0-alpha.1');

    if (hasIncorrectBabelVersion) {
      throw new SilentError(`ember-cli-htmlbars-inline-precompile@0.4 requires the host to use ember-cli-babel@6. To use ember-cli-babel@5 please downgrade ember-cli-htmlbars-inline-precompile to 0.3.`);
    }
  },

  setupPreprocessorRegistry(type, registry) {
    if (type === 'parent') {
      this.parentRegistry = registry;
    }
  },

  included() {
    this._super.included.apply(this, arguments);

    let emberCLIHtmlBars = this.project.findAddonByName('ember-cli-htmlbars');

    if(emberCLIHtmlBars && emberCLIHtmlBars.inlinePrecompilerRegistered) {
      return;
    }

    let checker = new VersionChecker(this);

    let emberCLIUsesSharedBabelPlugins = checker.for('ember-cli', 'npm').lt('2.13.0-alpha.1');
    let addonOptions = this._getAddonOptions();
    let isProjectDependency = this.parent === this.project;
    let babelPlugins;

    if (emberCLIUsesSharedBabelPlugins && isProjectDependency) {
      addonOptions.babel6 = addonOptions.babel6 || {};
      babelPlugins = addonOptions.babel6.plugins = addonOptions.babel6.plugins || [];
    } else {
      addonOptions.babel = addonOptions.babel || {};
      babelPlugins = addonOptions.babel.plugins = addonOptions.babel.plugins || [];
    }

    // borrowed from ember-cli-htmlbars http://git.io/vJDrW
    let projectConfig = this.projectConfig() || {};
    let EmberENV = projectConfig.EmberENV || {};
    let templateCompilerPath = this.templateCompilerPath();

    // do a full clone of the EmberENV (it is guaranteed to be structured
    // cloneable) to prevent ember-template-compiler.js from mutating
    // the shared global config
    let clonedEmberENV = JSON.parse(JSON.stringify(EmberENV));
    global.EmberENV = clonedEmberENV;

    let pluginParallelSpecs = this.pluginParallelSpecs();

    delete global.Ember;
    delete global.EmberENV;

    // add the HTMLBarsInlinePrecompilePlugin to the list of plugins used by
    // the `ember-cli-babel` addon
    if (!this._registeredWithBabel) {
      // TODO: check if all dependent plugins are parallelizable
      // use parallel API
      babelPlugins.push({
        _parallelBabel: {
          requireFile: path.resolve(__dirname, 'require-from-worker'),
          buildUsing: 'build',
          params: {
            templateCompilerPath,
            pluginParallelSpecs
          }
        }
      });
      this._registeredWithBabel = true;
    }
  },

  _getAddonOptions() {
    return (this.parent && this.parent.options) || (this.app && this.app.options) || {};
  },

  // return an array of the 'parallelBabel' property for each registered htmlbars-ast-plugin
  pluginParallelSpecs() {
    const pluginWrappers = this.parentRegistry.load('htmlbars-ast-plugin');
    return pluginWrappers.map((wrapper) => wrapper.parallelBabel);
  },

  // borrowed from ember-cli-htmlbars http://git.io/vJDrW
  projectConfig() {
    return this.project.config(process.env.EMBER_ENV);
  },

  // borrowed from ember-cli-htmlbars http://git.io/vJDrw
  templateCompilerPath() {
    let config = this.projectConfig();
    let templateCompilerPath = config['ember-cli-htmlbars'] && config['ember-cli-htmlbars'].templateCompilerPath;

    let ember = this.project.findAddonByName('ember-source');
    if (ember) {
      return ember.absolutePaths.templateCompiler;
    } else if (!templateCompilerPath) {
      templateCompilerPath = this.project.bowerDirectory + '/ember/ember-template-compiler';
    }

    return path.resolve(this.project.root, templateCompilerPath);
  }
};
