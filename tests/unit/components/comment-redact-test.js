import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('comment-redact', {
  integration: true
});

test('htmlbars-ast-plugin addon redacts comment contents', function(assert) {
  this.render(hbs`{{comment-redact}}`);

  assert.dom('#comment').isNotVisible();
});
