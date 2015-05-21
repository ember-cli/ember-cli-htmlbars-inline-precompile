/* jshint node: true */
'use strict';

var path = require('path');
var checker = require('ember-cli-version-checker');
var HTMLBarsInlinePrecompilePlugin = require('babel-plugin-htmlbars-inline-precompile');

module.exports = {
  name: 'ember-cli-htmlbars-inline-precompile',

  parentRegistry: null,

  init: function() {
    checker.assertAbove(this, '0.2.0');
  },

  setupPreprocessorRegistry: function(type, registry) {
    var self = this;

    registry.add('babel-plugin', {
      name: 'ember-cli-htmlbars-inline-precompile',
      plugin: function(babel) {
        var htmlbarsPlugin = self.parentRegistry.load('template').filter(function(addon) {
          return addon.name == 'ember-cli-htmlbars';
        })[0];

        var precompile = htmlbarsPlugin.precompile;

        return HTMLBarsInlinePrecompilePlugin(precompile)(babel);
      }
    });

    if (type === 'parent') {
      this.parentRegistry = registry;
    }
  }
};
