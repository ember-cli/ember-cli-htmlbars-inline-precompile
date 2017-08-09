/* jshint node: true */
'use strict';

const expect = require('chai').expect;
const fs = require('fs');
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
  let parent;
  let registry;
  let expectedRequireFilePath = path.resolve(__dirname, '../lib/require-from-worker');
  let expectedTemplateCompilerPath = path.resolve(__dirname, '../bower_components/ember/ember-template-compiler');
  let templateCompilerContents = fs.readFileSync(`${expectedTemplateCompilerPath}.js`, { encoding: 'utf-8' });
  let testBaseDir = () => path.resolve(__dirname, '..');
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
  let parallelBabelInfo0Plugin = {
    requireFile: expectedRequireFilePath,
    buildUsing: 'build',
    params: {
      templateCompilerPath: expectedTemplateCompilerPath,
      parallelConfig: []
    }
  };
  let parallelBabelInfo1Plugin = {
    requireFile: expectedRequireFilePath,
    buildUsing: 'build',
    params: {
      templateCompilerPath: expectedTemplateCompilerPath,
      parallelConfig: [ dependentParallelInfo ]
    }
  };

  beforeEach(function() {
    // mocks and settings for testing
    registry = new Registry();
    parent = { options: { babel: { plugins: [] } } };
    InlinePrecompile.setupPreprocessorRegistry('parent', registry);
    InlinePrecompile._super = {
      included: { apply() {} }
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
    InlinePrecompile.parent = parent;
    InlinePrecompile._registeredWithBabel = false;
  });

  describe('0 plugins', function() {
    beforeEach(function() {
      // no plugins registered
      InlinePrecompile.included();
      configuredPlugins = parent.options.babel.plugins;
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

    it('should have cacheKey()', function() {
      let expectedCacheKey = [templateCompilerContents, JSON.stringify(parallelBabelInfo0Plugin)].join('|');
      expect(configuredPlugins.length).to.eql(1);
      expect(typeof configuredPlugins[0].cacheKey).to.eql('function');
      let cacheKey = configuredPlugins[0].cacheKey();
      expect(cacheKey.length).to.eql(expectedCacheKey.length, 'cacheKey is the correct length');
      expect(cacheKey).to.equal(expectedCacheKey);
    });
  });

  describe('1 parallel plugin', function() {
    beforeEach(function() {
      registry.add('htmlbars-ast-plugin', parallelPlugin);
      InlinePrecompile.included();
      configuredPlugins = parent.options.babel.plugins;
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

    it('should have cacheKey()', function() {
      let expectedCacheKey = [templateCompilerContents, JSON.stringify(parallelBabelInfo1Plugin)].concat('mock hash').join('|');
      expect(configuredPlugins.length).to.eql(1);
      expect(typeof configuredPlugins[0].cacheKey).to.eql('function');
      let cacheKey = configuredPlugins[0].cacheKey();
      expect(cacheKey.length).to.eql(expectedCacheKey.length, 'cacheKey is the correct length');
      expect(cacheKey).to.equal(expectedCacheKey);
    });
  });

  describe('1 non-parallel plugin', function() {
    beforeEach(function() {
      registry.add('htmlbars-ast-plugin', nonParallelPlugin);
      InlinePrecompile.included();
      configuredPlugins = parent.options.babel.plugins;
    });

    it('should not have _parallelBabel object', function() {
      expect(configuredPlugins.length).to.eql(1);
      expect(configuredPlugins[0]._parallelBabel).to.eql(undefined);
    });

    it('should have plugin object', function() {
      let expectedCacheKey = [templateCompilerContents].concat(['mock hash']).join('|');
      expect(Array.isArray(configuredPlugins[0])).to.eql(true);
      expect(configuredPlugins[0].length).to.eql(2);
      let pluginObject = configuredPlugins[0][0];
      expect(pluginObject).to.eql(HTMLBarsInlinePrecompilePlugin);
      let pluginParams = configuredPlugins[0][1];
      expect(typeof pluginParams.precompile).to.eql('function');
      expect(typeof pluginParams.precompile.baseDir).to.eql('function');
      expect(pluginParams.precompile.baseDir()).to.eql(testBaseDir());
      expect(typeof pluginParams.precompile.cacheKey).to.eql('function');
      let cacheKey = pluginParams.precompile.cacheKey();
      expect(cacheKey.length).to.equal(expectedCacheKey.length);
      expect(cacheKey).to.equal(expectedCacheKey);
    });
  });

  describe('mix of parallel & non-parallel plugins', function() {
    beforeEach(function() {
      registry.add('htmlbars-ast-plugin', parallelPlugin);
      registry.add('htmlbars-ast-plugin', nonParallelPlugin);
      InlinePrecompile.included();
      configuredPlugins = parent.options.babel.plugins;
    });

    it('should not have _parallelBabel object', function() {
      expect(configuredPlugins.length).to.eql(1);
      expect(configuredPlugins[0]._parallelBabel).to.eql(undefined);
    });

    it('should have plugin object', function() {
      let expectedCacheKey = [templateCompilerContents].concat(['mock hash', 'mock hash']).join('|');
      expect(Array.isArray(configuredPlugins[0])).to.eql(true);
      expect(configuredPlugins[0].length).to.eql(2);
      let pluginObject = configuredPlugins[0][0];
      expect(pluginObject).to.eql(HTMLBarsInlinePrecompilePlugin);
      let pluginParams = configuredPlugins[0][1];
      expect(typeof pluginParams.precompile).to.eql('function');
      expect(typeof pluginParams.precompile.baseDir).to.eql('function');
      expect(pluginParams.precompile.baseDir()).to.eql(testBaseDir());
      expect(typeof pluginParams.precompile.cacheKey).to.eql('function');
      let cacheKey = pluginParams.precompile.cacheKey();
      expect(cacheKey.length).to.equal(expectedCacheKey.length);
      expect(cacheKey).to.equal(expectedCacheKey);
    });
  });
});
