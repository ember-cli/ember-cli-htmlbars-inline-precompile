import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('days-ago', {
  integration: true
});

test('block params work', function(assert) {
  this.render(hbs`
    {{#days-ago date=theDate as |date daysAgo| }}
      date='{{date}}' daysAgo={{daysAgo}}
    {{/days-ago}}
  `);

  assert.dom().hasText("date='' daysAgo=42");

  this.set('theDate', "the date");

  assert.dom().hasText("date='the date' daysAgo=42");
});
