/*jshint node:true*/
var os = require('os');
var path = require('path');
var username = require('username-sync')();
var broccoliDiskCache = path.join(os.tmpdir(), username);

module.exports = {
  // clear broccoli async disk cache between scenarios for better isolation
  command: 'rm -rf ' + broccoliDiskCache + '; ember test',
  scenarios: [
    {
      name: 'ember-1.13',
      bower: {
        dependencies: {
          'ember': '~1.13.0'
        },
        resolutions: {
          'ember': '~1.13.0'
        }
      }
    },
    {
      name: 'ember-lts-2.4',
      bower: {
        dependencies: {
          'ember': 'components/ember#lts-2-4'
        },
        resolutions: {
          'ember': 'lts-2-4'
        }
      }
    },
    {
      name: 'ember-lts-2.8',
      bower: {
        dependencies: {
          'ember': 'components/ember#lts-2-8'
        },
        resolutions: {
          'ember': 'lts-2-8'
        }
      }
    },
    {
      name: 'ember-release',
      bower: {
        dependencies: {
          'ember': 'components/ember#release'
        },
        resolutions: {
          'ember': 'release'
        }
      }
    },
    {
      name: 'ember-beta',
      bower: {
        dependencies: {
          'ember': 'components/ember#beta'
        },
        resolutions: {
          'ember': 'beta'
        }
      }
    },
    {
      name: 'ember-canary',
      bower: {
        dependencies: {
          'ember': 'components/ember#canary'
        },
        resolutions: {
          'ember': 'canary'
        }
      }
    },
    {
      name: 'ember-source',
      bower: {
        dependencies: {
          'ember': null,
          'ember-cli-shims': null
        }
      },
      npm: {
        dependencies: {
          'ember-source': 'latest',
          'ember-cli-shims': '^1.0.0'
        }
      }
    }
  ]
};
