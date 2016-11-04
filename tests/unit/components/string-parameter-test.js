import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('string-parameter', {
  integration: true
});

test('using `hbs` tagged string places the precompiled template', function(assert) {
  this.render(hbs`{{string-parameter}}`);

  assert.equal(this.$().text().trim(), "hello");
});
