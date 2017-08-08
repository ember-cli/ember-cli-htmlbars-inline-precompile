/*jshint node:true*/
module.exports = {
  command: 'ember test',
  scenarios: [
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
      name: 'ember-lts-2.12',
      bower: {
        dependencies: {
          'ember': null,
          'ember-cli-shims': null
        }
      },
      npm: {
        dependencies: {
          'ember-source': '~2.12.0',
          'ember-cli-shims': '^1.0.0'
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
      allowedToFail: true,
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
