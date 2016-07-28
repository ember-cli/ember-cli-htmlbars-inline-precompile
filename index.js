/* jshint node: true */
'use strict';

var path = require('path');
var HTMLBarsInlinePrecompilePlugin = require('babel-plugin-htmlbars-inline-precompile');

module.exports = {
  name: 'ember-cli-htmlbars-inline-precompile',

  included: function(app) {
    this._super.included(app);

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

    var Compiler = require(templateCompilerPath);
    var PrecompileInlineHTMLBarsPlugin = HTMLBarsInlinePrecompilePlugin(Compiler.precompile);

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

  // borrowed from ember-cli-htmlbars http://git.io/vJDrW
  projectConfig: function () {
    return this.project.config(process.env.EMBER_ENV);
  },

  // borrowed from ember-cli-htmlbars http://git.io/vJDrw
  templateCompilerPath: function() {
    var config = this.projectConfig();
    var templateCompilerPath = config['ember-cli-htmlbars'] && config['ember-cli-htmlbars'].templateCompilerPath;

    var ember = this.project.findAddonByName('ember-core');
    if (ember) {
      return ember.absolutePaths.templateCompiler;
    } else if (!templateCompilerPath) {
      templateCompilerPath = this.project.bowerDirectory + '/ember/ember-template-compiler';
    }

    return path.resolve(this.project.root, templateCompilerPath);
  }
};
