import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('inline-precompilation', {
  integration: true
});

test('using `hbs` tagged string places the precompiled template', function(assert) {
  this.render(hbs`{{inline-precompilation}}`);

  assert.equal(this.$().text().trim(), "greeting: hello from view", "inline precompile of the HTMLBars template works");
});
