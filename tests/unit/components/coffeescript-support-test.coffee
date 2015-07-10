`import hbs from 'htmlbars-inline-precompile';`
`import { moduleForComponent, test } from 'ember-qunit';`

moduleForComponent('days-ago', {
  integration: true
});

test 'Invocation within Cofeescript works using single string argument', (assert) ->
  @render hbs """
    {{#days-ago date=theDate as |date daysAgo| }}
      date='{{date}}' daysAgo={{daysAgo}}
    {{/days-ago}}
  """

  assert.equal this.$().text().trim(), "date='' daysAgo=42"

  @set 'theDate', "the date"

  assert.equal this.$().text().trim(), "date='the date' daysAgo=42"
