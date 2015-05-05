# ember-cli-htmlbars-inline-precompile

[![Build Status](https://travis-ci.org/pangratz/ember-cli-htmlbars-inline-precompile.svg)](https://travis-ci.org/pangratz/ember-cli-htmlbars-inline-precompile)

Precompile HTMLBars template strings within the tests of an Ember-CLI project
via ES6 tagged template strings:

``` js
// ember-cli-project/test/unit/components/my-component-test.js
import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('my-component');

test('it renders', function(assert) {
  var component = this.subject({
    greeting: "hello ember testing",
    layout: hbs`
      greeting: <span>{{greeting}}</span>
    `
  });

  assert.equal(this.$().html().trim(), "greeting: <span>hello ember testing</span>");
});
```

where the addon is installed via `ember install ember-cli-htmlbars-inline-precompile`.
