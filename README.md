# ember-cli-htmlbars-inline-precompile

[![Build Status](https://travis-ci.org/pangratz/ember-cli-htmlbars-inline-precompile.svg?branch=master)](https://travis-ci.org/pangratz/ember-cli-htmlbars-inline-precompile)
[![Ember Observer Score](http://emberobserver.com/badges/ember-cli-htmlbars-inline-precompile.svg)](http://emberobserver.com/addons/ember-cli-htmlbars-inline-precompile)

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

---


If you are using `ember-cli-qunit@0.3.12`, writing component integration tests
becomes as readable as:

``` js
import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('my-component', {
  integration: true
});

test('block params work', function(assert) {
  this.render(hbs`
    {{#my-component date=theDate as |daysAgo| }}
      This happened {{daysAgo}} days ago.
    {{/my-component}}
  `);

  this.set('theDate', new Date(2015, 2, 11));
  assert.equal(this.$().text().trim(), "This happened 123 days ago.");
});

```


### Installation

Install the addon via `ember install ember-cli-htmlbars-inline-precompile`

### Troubleshooting

If you get an error like `Plugin undefined didn't export a default Transformer
instance` this likely means that the installed version of `babel-core` is
outdated. You can check for the installed version via `npm ls babel-core`
within the root of your Ember-CLI application:

```
$ npm ls babel-core
your-app@0.0.0 ~/your-app
└─┬ ember-cli-babel@5.0.0
  └─┬ broccoli-babel-transpiler@5.0.0
    └── babel-core@5.1.13
```


Since this addon relies on a feature implemented in `babel@v5.2.10`, you need
to update your installed dependency of `ember-cli-babel` via:


```
rm -rf node_modules/ember-cli-babel
npm install
```

After that the version of `babel-core` should be at least `5.2.10`:

```
$ npm ls babel-core
your-app@0.0.0 ~/your-app
└─┬ ember-cli-babel@5.0.0
  └─┬ broccoli-babel-transpiler@5.0.0
    └── babel-core@5.2.10
```

Starting the development environment via `ember server` or `ember test
--server` should start as expected and your inline template strings are
compiled.

### Caveats

Keep in mind that the source files are transformed, so the inline template
definitions are replaced with `Ember.HTMLBars.template(…)` statements. This
means that you can't do fancy stuff like string interpolation within the
templates:

``` js
test('string interpolation within templates is NOT supported', function(assert) {
  var valuePath = 'greeting';
  var component = this.subject({
    greeting: "hello ember testing",
    layout: hbs`
      ${valuePath}: <span>{{value}}</span>
    `
  });

  // the template will be "${valuePath}: <span>{{value}}</span>"
```

If you need stuff like this, you need to include `ember-template-compiler.js`
in your test-build and use `Ember.HTMLBars.compile("…")` within your tests.

### Alternatives

- [broccoli-ember-inline-template-compiler](https://github.com/rwjblue/broccoli-ember-inline-template-compiler)
- Include `ember-handlebars-compiler.js` in your test-build and compile client side via `Ember.HTMLBars.compile(…)`

### Thanks

This addon wouldn't exist without the lightning fast response by open source hero [@sebmck](https://github.com/sebmck),
who implemented the [feature to replace a node with a source string](http://git.io/vJSrs) not
even an hour after I mentioned it in gitter :heart:.
