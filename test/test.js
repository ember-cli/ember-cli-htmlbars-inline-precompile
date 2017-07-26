/* jshint node: true */
'use strict';

const expect = require('chai').expect;
const path = require('path');
const Registry = require('ember-cli-preprocess-registry');
const HTMLBarsInlinePrecompilePlugin = require('babel-plugin-htmlbars-inline-precompile');

// hack require.cache to mock hashForDep (and avoid multi-second initial run time)
require('hash-for-dep');
let hashForDepFullPath = require.resolve('hash-for-dep');
require.cache[hashForDepFullPath].exports = function hashForDep() { return 'mock hash'; };

const InlinePrecompile = require('../');


describe('canParallelize()', function() {
  it('returns true for 0 plugins', function() {
    const pluginWrappers = [];
    expect(InlinePrecompile.canParallelize(pluginWrappers)).to.eql(true);
  });

  it('returns true for 1+ plugins with "parallelBabel" property', function() {
    const pluginWrappers1 = [
      { parallelBabel: 'something' }
    ];
    const pluginWrappers2 = [
      { parallelBabel: 'something' },
      { parallelBabel: 'something else' },
    ];
    expect(InlinePrecompile.canParallelize(pluginWrappers1)).to.eql(true);
    expect(InlinePrecompile.canParallelize(pluginWrappers2)).to.eql(true);
  });

  it('returns false for 1+ plugins without "parallelBabel" property', function() {
    const pluginWrappers1 = [
      { name: 'something' }
    ];
    const pluginWrappers2 = [
      { name: 'something' },
      { name: 'something else' },
    ];
    expect(InlinePrecompile.canParallelize(pluginWrappers1)).to.eql(false);
    expect(InlinePrecompile.canParallelize(pluginWrappers2)).to.eql(false);
  });

  it('returns false for mix of plugins with & without "parallelBabel" property', function() {
    const pluginWrappersMix = [
      { name: 'something', parallelBabel: 'ok' },
      { name: 'something else' },
    ];
    expect(InlinePrecompile.canParallelize(pluginWrappersMix)).to.eql(false);
  });
});

describe('getParallelConfig()', function() {
  it('returns the "parallelBabel" property of the plugins', function() {
    const pluginWrappers = [
      { parallelBabel: { requireFile: 'some/file' } },
      { parallelBabel: { requireFile: 'another/file' } },
    ];
    const expected = [
      { requireFile: 'some/file'},
      { requireFile: 'another/file' },
    ];
    expect(InlinePrecompile.getParallelConfig(pluginWrappers)).to.eql(expected);
  });
});

describe('included()', function() {
  let app;
  let registry;
  let expectedRequireFilePath = path.resolve(__dirname, '../lib/require-from-worker');
  let expectedTemplateCompilerPath = path.resolve(__dirname, '../bower_components/ember/ember-template-compiler');
  let testBaseDir = () => path.resolve(__dirname, '..');
  let pluginBaseDir = () => path.resolve(__dirname, '../node_modules/babel-plugin-htmlbars-inline-precompile')
  let configuredPlugins;
  let dependentParallelInfo = {
    requireFile: 'some/file/path',
    buildUsing: 'whatever',
    params: {}
  };
  let parallelPlugin = {
    name: 'some-parallel-plugin',
    plugin: 'some object',
    baseDir: testBaseDir,
    parallelBabel: dependentParallelInfo,
  };
  let nonParallelPlugin = {
    name: 'some-regular-plugin',
    plugin: 'some object',
    baseDir: testBaseDir,
  };

  beforeEach(function() {
    // mocks and settings for testing
    registry = new Registry();
    app = { options: { babel: { plugins: [] } } };
    InlinePrecompile.setupPreprocessorRegistry('parent', registry);
    InlinePrecompile._super = {
      included: function() {}
    };
    InlinePrecompile.project = {
      findAddonByName(addon) {
        return {
          'ember-cli-htmlbars': { inlinePrecompilerRegistered: false },
          'ember-source': false,
        }[addon];
      },
      config() {
        return {
          'ember-cli-htmlbars': { templateCompilerPath: undefined }
        };
      },
      root: __dirname,
      bowerDirectory: '../bower_components',
    };
    InlinePrecompile.app = app;
    InlinePrecompile._registeredWithBabel = false;
  });

  describe('0 plugins', function() {
    beforeEach(function() {
      // no plugins registered
      InlinePrecompile.included(app);
      configuredPlugins = app.options.babel.plugins;
    });

    it('should have _parallelBabel object', function() {
      expect(configuredPlugins.length).to.eql(1);
      expect(typeof configuredPlugins[0]._parallelBabel).to.eql('object');
      let _parallelBabel = configuredPlugins[0]._parallelBabel;
      expect(_parallelBabel.requireFile).to.eql(expectedRequireFilePath);
      expect(_parallelBabel.buildUsing).to.eql('build');
      expect(typeof _parallelBabel.params).to.eql('object');
      expect(_parallelBabel.params.parallelConfig).to.eql([]);
      expect(_parallelBabel.params.templateCompilerPath).to.eql(expectedTemplateCompilerPath);
    });

    it('should have baseDir()', function() {
      expect(configuredPlugins.length).to.eql(1);
      expect(typeof configuredPlugins[0].baseDir).to.eql('function');
      expect(configuredPlugins[0].baseDir()).to.eql(testBaseDir());
    });
  });

  describe('1 parallel plugin', function() {
    beforeEach(function() {
      registry.add('htmlbars-ast-plugin', parallelPlugin);
      InlinePrecompile.included(app);
      configuredPlugins = app.options.babel.plugins;
    });

    it('should have _parallelBabel object', function() {
      expect(configuredPlugins.length).to.eql(1);
      expect(typeof configuredPlugins[0]._parallelBabel).to.eql('object');
      let _parallelBabel = configuredPlugins[0]._parallelBabel;
      expect(_parallelBabel.requireFile).to.eql(expectedRequireFilePath);
      expect(_parallelBabel.buildUsing).to.eql('build');
      expect(typeof _parallelBabel.params).to.eql('object');
      expect(_parallelBabel.params.parallelConfig).to.eql([ dependentParallelInfo ]);
      expect(_parallelBabel.params.templateCompilerPath).to.eql(expectedTemplateCompilerPath);
    });

    it('should have baseDir()', function() {
      expect(configuredPlugins.length).to.eql(1);
      expect(typeof configuredPlugins[0].baseDir).to.eql('function');
      expect(configuredPlugins[0].baseDir()).to.eql(testBaseDir());
    });
  });

  describe('1 non-parallel plugin', function() {
    beforeEach(function() {
      registry.add('htmlbars-ast-plugin', nonParallelPlugin);
      InlinePrecompile.included(app);
      configuredPlugins = app.options.babel.plugins;
    });

    it('should not have _parallelBabel object', function() {
      expect(configuredPlugins.length).to.eql(1);
      expect(configuredPlugins[0]._parallelBabel).to.eql(undefined);
    });

    it('should have plugin object', function() {
      expect(configuredPlugins.length).to.eql(1);
      let pluginObject = configuredPlugins[0];
      expect(typeof pluginObject).to.eql('function');
      expect(typeof pluginObject.baseDir).to.eql('function');
      expect(pluginObject.baseDir()).to.eql(pluginBaseDir());
      expect(typeof pluginObject.cacheKey).to.eql('function');
    });
  });

  describe('mix of parallel & non-parallel plugins', function() {
    beforeEach(function() {
      registry.add('htmlbars-ast-plugin', parallelPlugin);
      registry.add('htmlbars-ast-plugin', nonParallelPlugin);
      InlinePrecompile.included(app);
      configuredPlugins = app.options.babel.plugins;
    });

    it('should not have _parallelBabel object', function() {
      expect(configuredPlugins.length).to.eql(1);
      expect(configuredPlugins[0]._parallelBabel).to.eql(undefined);
    });

    it('should have plugin object', function() {
      expect(configuredPlugins.length).to.eql(1);
      let pluginObject = configuredPlugins[0];
      expect(typeof pluginObject).to.eql('function');
      expect(typeof pluginObject.baseDir).to.eql('function');
      expect(pluginObject.baseDir()).to.eql(pluginBaseDir());
      expect(typeof pluginObject.cacheKey).to.eql('function');
    });
  });
});
