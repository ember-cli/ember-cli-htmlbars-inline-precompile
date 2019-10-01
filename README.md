# ember-cli-htmlbars-inline-precompile

[![npm version](https://badge.fury.io/js/ember-cli-htmlbars-inline-precompile.svg)](https://badge.fury.io/js/ember-cli-htmlbars-inline-precompile)
<a href="https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile"><img alt="Build Status" src="https://github.com/ember-cli/ember-cli-htmlbars-inline-precompile/workflows/CI/badge.svg"></a>
[![Ember Observer Score](http://emberobserver.com/badges/ember-cli-htmlbars-inline-precompile.svg)](http://emberobserver.com/addons/ember-cli-htmlbars-inline-precompile)
[![Dependency Status](https://david-dm.org/ember-cli/ember-cli-htmlbars-inline-precompile.svg)](https://david-dm.org/ember-cli/ember-cli-htmlbars-inline-precompile)


## **Deprecated**

Usage of this project is deprecated, its functionality has been migrated into
[ember-cli-htmlbars](https://github.com/ember-cli/ember-cli-htmlbars) directly.
Please upgrade to `ember-cli-htmlbars@4.0.3` or higher.

## Usage

Precompile template strings within the tests of an Ember project via tagged
template strings:

``` js
// ember-cli-project/test/unit/components/my-component-test.js
import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('my-component', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`hello ember testing!`);

    assert.equal(this.element.innerText, 'hello ember testing!');
  });
});
```

### Requirements

* Ember 2.12+
* Node 8+
* Babel 7+

### Installation

Install the addon via `ember install ember-cli-htmlbars-inline-precompile`

### Caveats

Keep in mind that the source files are transformed, so the inline template
definitions are replaced with `Ember.HTMLBars.template(…)` statements. This
means that you can't do fancy stuff like string interpolation within the
templates:

``` js
test('string interpolation within templates is NOT supported', async function(assert) {
  let valuePath = 'greeting';

  await render(hbs`
    ${valuePath}: <span>{{value}}</span>
  `);

  // the template will be "${valuePath}: <span>{{value}}</span>"
});
```

If you need stuff like this, you need to include `ember-template-compiler.js`
in your test-build and use `Ember.HTMLBars.compile("…")` within your tests.
