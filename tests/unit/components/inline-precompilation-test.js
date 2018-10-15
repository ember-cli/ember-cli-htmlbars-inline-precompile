import hbs from 'htmlbars-inline-precompile';
import hbs2 from 'ember-cli-htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('inline-precompilation', {
  integration: true
});

test('using `hbs` tagged string places the precompiled template', function(assert) {
  this.render(hbs`{{inline-precompilation}}`);

  assert.dom().hasText("greeting: hello from view", "inline precompile of the HTMLBars template works");
});

test('using `hbs` tagged string  from `ember-cli-htmlbars-inline-precompile` replaces the precompiled template', function(assert) {
  this.render(hbs2`{{inline-precompilation}}`);

  assert.dom().hasText("greeting: hello from view", "inline precompile of the HTMLBars template works");
});
