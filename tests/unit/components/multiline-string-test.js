import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('multiline-string', {
  integration: true
});

test('using `hbs` tagged string places the precompiled template', function(assert) {
  this.render(hbs`{{multiline-string}}`);

  assert.equal(this.$().text().trim(), "greeting: hello from view", "multiline string works");
});
