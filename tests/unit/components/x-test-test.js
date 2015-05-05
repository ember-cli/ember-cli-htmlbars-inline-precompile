import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('x-test');

test('using `hbs` tagged string places the precompiled template', function(assert) {
  var component = this.subject({
    template: hbs`inline compiled template`
  });

  this.render();
  assert.equal(component.$().html().trim(), "inline compiled template", "inline precompile of the HTMLBars template works");
});
