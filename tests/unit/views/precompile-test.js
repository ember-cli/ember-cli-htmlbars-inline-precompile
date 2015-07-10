import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('inline precompilation works', {
  afterEach: function() {
    Ember.run(function() {
      Ember.$("#ember-testing").empty();
    });
  }
});

test('using `hbs` tagged string places the precompiled template', function(assert) {
  var view = Ember.View.create({
    greeting: "hello from view",
    template: hbs`greeting: {{view.greeting}}`
  });

  Ember.run(function() {
    view.appendTo('#ember-testing');
  });

  assert.equal(view.$().html().trim(), "greeting: hello from view", "inline precompile of the HTMLBars template works");
});

test('multiline string', function(assert) {
  var view = Ember.View.create({
    greeting: "hello from view",
    template: hbs`
      greeting: <span>{{view.greeting}}</span>
    `
  });

  Ember.run(function() {
    view.appendTo('#ember-testing');
  });

  assert.equal(view.$().html().trim(), "greeting: <span>hello from view</span>", "multiline string works");
});

test('a single string parameter passed to `hbs` works', function(assert) {
  var view = Ember.View.create({
    greeting: "hello",
    template: hbs('<h1>{{view.greeting}}</h1>')
  });

  Ember.run(function() {
    view.appendTo('#ember-testing');
  });

  assert.equal(view.$().html().trim(), "<h1>hello</h1>", "single string parameter works");
});
