import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

export default Ember.Component.extend({
  greeting: "hello from view",
  layout: hbs`
    greeting: <span>{{greeting}}</span>
  `
});
