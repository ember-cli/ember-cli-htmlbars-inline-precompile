# ember-cli-htmlbars-inline-precompile

[![Build Status](https://travis-ci.org/pangratz/ember-cli-htmlbars-inline-precompile.svg)](https://travis-ci.org/pangratz/ember-cli-htmlbars-inline-precompile)

Precompile HTMLBars template strings within the tests of an Ember-CLI project
via ES6 tagged template strings:

``` js
// ember-cli-project/test/unit/components/my-component-test.js
import precompile from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('my-component');

test('it renders', function(assert) {
  var component = this.subject({
    greeting: "hello ember testing",
    layout: precompile`greeting: {{greeting}}`
  });

  assert.equal(this.$().text().trim(), "greeting: hello ember testing");
});
```

where the addon is installed via `ember install ember-cli-htmlbars-precompile`.